import json
import os
import smtplib
import traceback
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from pathlib import Path
from typing import List, Optional
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from groq import Groq
from pydantic import BaseModel
from supabase import Client, create_client

env_path = Path(__file__).resolve().parent / ".env"
load_dotenv(dotenv_path=env_path)

groq_api_key = os.getenv("GROQ_API_KEY")
supabase_url = os.getenv("SUPABASE_URL")
supabase_key = os.getenv("SUPABASE_KEY")
smtp_email = os.getenv("SMTP_EMAIL", "")
smtp_password = os.getenv("SMTP_PASSWORD", "")

app = FastAPI(title="AI Language Coach Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

groq_client = Groq(api_key=groq_api_key) if groq_api_key else None
supabase: Optional[Client] = None
if supabase_url and supabase_key:
    try:
        supabase = create_client(supabase_url, supabase_key)
    except Exception as e:
        print("Supabase bağlantı hatası:", e)

# Hesabında aktif olan Groq modeli:
GROQ_MODEL = "openai/gpt-oss-120b"


def parse_llm_json(raw_text: str) -> dict:
    """Markdown kod bloklarını temizler ve JSON olarak parse eder."""
    text = raw_text.strip()
    if text.startswith("```json"):
        text = text[7:]
    elif text.startswith("```"):
        text = text[3:]
    if text.endswith("```"):
        text = text[:-3]
    return json.loads(text.strip())


# ----------------- VERİ MODELLERİ -----------------
class UserLoginRequest(BaseModel):
    email: str
    full_name: str

class ChatRequest(BaseModel):
    user_id: Optional[str] = "demo_user"
    scenario: str
    user_message: str
    level: str = "B1"

class PlacementAnswer(BaseModel):
    question: str
    answer: str

class PlacementRequest(BaseModel):
    user_id: Optional[str] = "demo_user"
    answers: List[PlacementAnswer]

class EndSessionRequest(BaseModel):
    user_id: Optional[str] = "demo_user"
    scenario_id: str
    scenario: str
    level: str
    conversation_history: List[dict]

class JournalRequest(BaseModel):
    user_id: Optional[str] = "demo_user"
    journal_text: str
    level: str = "A2"

class SendReportEmailRequest(BaseModel):
    user_id: str
    email: str

class PracticeRequest(BaseModel):
    level: str = "A1"
    practice_type: str = "mixed"

class CheckAnswerRequest(BaseModel):
    level: str = "A1"
    question_type: str
    question: str
    target_rule_or_phrase: str
    user_answer: str

class VideoQuizRequest(BaseModel):
    video_id: str
    video_title: str
    video_topic: str
    level: str
    transcript_text: Optional[str] = ""

class WordLookupRequest(BaseModel):
    word: str
    sentence_context: str
    level: str = "A1"

class DictationCheckRequest(BaseModel):
    level: str = "A1"
    original_text: str
    user_transcript: str

class ComprehensiveExamRequest(BaseModel):
    user_id: str
    current_level: str
    target_level: str
    listening_audio_text: str
    user_listening_transcript: str
    reading_source_text: str
    user_reading_translation: str
    writing_topic: str
    user_writing_essay: str


# ----------------- E-POSTA RAPOR GÖNDERME -----------------
def send_email_report(target_email: str, user_name: str, level: str, total_completed: int, mistakes: list):
    if not smtp_email or not smtp_password:
        print(f"[SIMULATION] E-posta simüle edildi: Kime -> {target_email}")
        return True

    try:
        msg = MIMEMultipart("alternative")
        msg["Subject"] = f"🎯 AI Language Coach - Haftalık Gelişim Karnen ({level})"
        msg["From"] = f"AI Language Coach <{smtp_email}>"
        msg["To"] = target_email

        mistakes_html = ""
        for m in mistakes[:5]:
            mistakes_html += f"""
            <li style="margin-bottom: 8px;">
                <span style="color: #ef4444; text-decoration: line-through;">{m.get('original_sentence', '')}</span><br/>
                <span style="color: #10b981; font-weight: bold;">➔ {m.get('corrected_sentence', '')}</span><br/>
                <small style="color: #64748b;">Açıklama: {m.get('explanation', '')}</small>
            </li>
            """
        if not mistakes_html:
            mistakes_html = "<li>Henüz kayıtlı bir hatan bulunmuyor, harika ilerliyorsun!</li>"

        html_content = f"""
        <html>
        <body style="font-family: Arial, sans-serif; background-color: #0b112c; color: #f8fafc; padding: 24px;">
            <div style="max-width: 500px; margin: auto; background-color: #1e293b; border-radius: 12px; padding: 24px; border: 1px solid #334155;">
                <h2 style="color: #818cf8; margin-top: 0;">Merhaba {user_name}! 👋</h2>
                <p style="color: #cbd5e1; font-size: 14px;">Dil koçun senin için haftalık gelişim özetini hazırladı:</p>
                <div style="background-color: #0f172a; padding: 12px; border-radius: 8px; margin: 16px 0;">
                    <p style="margin: 4px 0; font-size: 13px;"><b>Mevcut Seviye:</b> {level}</p>
                    <p style="margin: 4px 0; font-size: 13px;"><b>Tamamlanan Senaryo:</b> {total_completed} / 8 Konu</p>
                </div>
                <h3 style="color: #f59e0b; font-size: 14px; margin-top: 20px;">🔍 Son Odaklanman Gereken Düzeltmeler:</h3>
                <ul style="font-size: 13px; color: #e2e8f0; padding-left: 18px;">
                    {mistakes_html}
                </ul>
            </div>
        </body>
        </html>
        """
        msg.attach(MIMEText(html_content, "html"))

        clean_smtp_pwd = smtp_password.replace(" ", "")
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(smtp_email, clean_smtp_pwd)
            server.sendmail(smtp_email, target_email, msg.as_string())
        
        return True
    except Exception as e:
        print("E-posta gönderme hatası:", e)
        return False


# ----------------- ENDPOINT'LER -----------------
@app.get("/")
def home():
    return {"message": "AI Language Coach Backend Aktif!"}

# 0. KULLANICI GİRİŞİ / KAYIT
@app.post("/api/auth/login")
def login_or_register(req: UserLoginRequest):
    if not supabase:
        return {"id": req.email, "email": req.email, "full_name": req.full_name, "current_level": "A1"}

    try:
        res = supabase.table("user_profiles").select("*").eq("email", req.email).execute()
        if res.data and len(res.data) > 0:
            user = res.data[0]
            supabase.table("user_profiles").update({"last_active_at": "now()"}).eq("id", user["id"]).execute()
            return user
        else:
            new_user = {
                "id": req.email,
                "email": req.email,
                "full_name": req.full_name,
                "current_level": "A1"
            }
            inserted = supabase.table("user_profiles").insert(new_user).execute()
            return inserted.data[0] if inserted.data else new_user
    except Exception as e:
        print("Auth hatası:", e)
        return {"id": req.email, "email": req.email, "full_name": req.full_name, "current_level": "A1"}

# 1. RAPOR E-POSTASI GÖNDERME
@app.post("/api/email/send-report")
def trigger_email_report(req: SendReportEmailRequest):
    user_name = req.email.split("@")[0].capitalize()
    level = "A1"
    total_completed = 0
    recent_mistakes = []

    if supabase:
        try:
            prof = supabase.table("user_profiles").select("*").eq("id", req.user_id).execute()
            if prof.data:
                user_name = prof.data[0].get("full_name", user_name)
                level = prof.data[0].get("current_level", "A1")

            scen_res = supabase.table("completed_scenarios").select("id").eq("user_id", req.user_id).eq("level", level).execute()
            total_completed = len(scen_res.data) if scen_res.data else 0

            mistakes_res = supabase.table("user_mistakes").select("*").eq("user_id", req.user_id).order("created_at", desc=True).limit(5).execute()
            recent_mistakes = mistakes_res.data or []
        except Exception as e:
            print("Veri toplama hatası:", e)

    success = send_email_report(
        target_email=req.email,
        user_name=user_name,
        level=level,
        total_completed=total_completed,
        mistakes=recent_mistakes
    )

    if success:
        return {"status": "success", "message": f"Gelişim raporu {req.email} adresine iletildi!"}
    else:
        raise HTTPException(status_code=500, detail="E-posta gönderimi başarısız oldu. SMTP ayarlarını kontrol edin.")

# 2. CANLI SOHBET & HATA TESPİTİ
@app.post("/api/chat")
def chat_with_coach(req: ChatRequest):
    if not groq_client:
        raise HTTPException(status_code=500, detail="Groq API Key bulunamadı.")

    system_prompt = f"""
Sen akıllı, cana yakın ve son derece yetkin bir İngilizce Dil Koçusun.
Aktif Senaryo: {req.scenario}
Kullanıcı Seviyesi: {req.level}

KURALLAR:
1. Eğer Kullanıcı TÜRKÇE yazarsa veya soru sorarsa:
   - "ai_reply": Türkçe kibarca yanıt ver, öğrenmek istediği İngilizce ifadeyi öğret ve rol yapmaya motive et.
   - "corrections": []
   - "better_alternative": Aradığı cümlenin en doğal İngilizce karşılığı.
   - "detected_mistake": false

2. Eğer Kullanıcı İNGİLİZCE konuşuyorsa:
   - "ai_reply": Senaryoya ve hedef seviyeye ({req.level}) uygun doğal 1-2 cümlelik İngilizce yanıt ver.
   - "corrections": Gramer, kelime, edat veya zaman hatalarını listele. Açıklamalar Türkçe olmalı.
   - "better_alternative": Ana dili İngilizce olan birinin kuracağı daha akıcı alternatif.
   - "detected_mistake": Hata varsa true, yoksa false.

ÇIKTI SADECE ŞU JSON OLMALIDIR:
{{
  "ai_reply": "string",
  "corrections": [
    {{
      "error_type": "string",
      "original": "string",
      "suggested": "string",
      "explanation": "string"
    }}
  ],
  "better_alternative": "string",
  "detected_mistake": false
}}
"""
    try:
        completion = groq_client.chat.completions.create(
            model=GROQ_MODEL,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": req.user_message},
            ],
            response_format={"type": "json_object"},
            temperature=0.3,
        )
        data = parse_llm_json(completion.choices[0].message.content)

        if data.get("detected_mistake") and supabase and req.user_id:
            try:
                for corr in data.get("corrections", []):
                    supabase.table("user_mistakes").insert({
                        "user_id": req.user_id,
                        "error_type": corr.get("error_type", "General"),
                        "original_sentence": corr.get("original", req.user_message),
                        "corrected_sentence": corr.get("suggested", ""),
                        "explanation": corr.get("explanation", ""),
                    }).execute()
            except Exception as db_err:
                print("DB kayıt hatası:", db_err)

        return data
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

# 3. SEANS BİTİRME & SEVİYE PUANI KAYDI
@app.post("/api/end-session")
def end_conversation_session(req: EndSessionRequest):
    if not groq_client:
        raise HTTPException(status_code=500, detail="Groq API key eksik.")

    convo_text = "\n".join([f"{m.get('role', 'user').upper()}: {m.get('content', '')}" for m in req.conversation_history])
    prompt = f"""
Senaryo: {req.scenario}
Seviye: {req.level}

Diyaloğu tamamlayan öğrencinin İngilizce performansını analiz et:
{convo_text}

Puanlama yap (1-100) ve yapıcı bir karne üret. SADECE JSON DÖN:
{{
  "fluency_score": 85,
  "vocabulary_score": 80,
  "grammar_score": 78,
  "overall_comment": "Türkçe motive edici genel değerlendirme.",
  "highlight_positive": "Sohbette başarılı kullandığı bir ifade.",
  "key_takeaway": "Gelecek için en önemli ipucu."
}}
"""
    try:
        completion = groq_client.chat.completions.create(
            model=GROQ_MODEL,
            messages=[{"role": "user", "content": prompt}],
            response_format={"type": "json_object"},
            temperature=0.3,
        )
        report_data = parse_llm_json(completion.choices[0].message.content)

        fluency = int(report_data.get("fluency_score", 70))
        vocab = int(report_data.get("vocabulary_score", 70))
        grammar = int(report_data.get("grammar_score", 70))
        avg_score = round((fluency + vocab + grammar) / 3)
        passed = avg_score >= 60

        if supabase and req.user_id:
            try:
                supabase.table("chat_sessions").insert({
                    "user_id": req.user_id,
                    "scenario_title": req.scenario,
                    "target_level": req.level,
                    "fluency_score": fluency,
                    "vocabulary_score": vocab,
                    "grammar_score": grammar,
                    "overall_comment": report_data.get("overall_comment", ""),
                    "highlight_positive": report_data.get("highlight_positive", ""),
                    "key_takeaway": report_data.get("key_takeaway", "")
                }).execute()

                supabase.table("completed_scenarios").upsert({
                    "user_id": req.user_id,
                    "level": req.level,
                    "scenario_id": req.scenario_id,
                    "average_score": avg_score,
                    "passed": passed
                }, on_conflict="user_id, level, scenario_id").execute()
            except Exception as e:
                print("DB hatası:", e)

        report_data["average_score"] = avg_score
        report_data["passed"] = passed
        return report_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 4. KULLANICININ SEVİYE İLERLEMESİ
@app.get("/api/level-progress")
def get_level_progress(level: str, user_id: str = "demo_user"):
    if not supabase:
        return {"completed_scenarios": {}, "total_completed": 0, "avg_level_score": 0}

    try:
        res = (
            supabase.table("completed_scenarios")
            .select("scenario_id, average_score, passed")
            .eq("user_id", user_id)
            .eq("level", level)
            .execute()
        )
        data = res.data or []
        completed_dict = {item["scenario_id"]: item["average_score"] for item in data if item.get("passed")}
        scores = list(completed_dict.values())
        avg_score = round(sum(scores) / len(scores)) if scores else 0

        return {
            "completed_scenarios": completed_dict,
            "total_completed": len(completed_dict),
            "avg_level_score": avg_score
        }
    except Exception:
        return {"completed_scenarios": {}, "total_completed": 0, "avg_level_score": 0}

# 5. GÜNLÜK YAZMA & ANALİZ
@app.post("/api/journal/analyze")
def analyze_daily_journal(req: JournalRequest):
    if not groq_client:
        raise HTTPException(status_code=500, detail="Groq API key eksik.")

    prompt = f"""
Öğrenci Seviyesi: {req.level}
Öğrencinin yazdığı İngilizce günlük:
\"\"\"{req.journal_text}\"\"\"

GÖREV:
1. Paragrafı ana dili İngilizce olan biri gibi akıcı ve doğal şekilde yeniden kaleme al (native_rewrite).
2. Türkçe yapıcı bir geri bildirim notu yaz.
3. 2-3 zenginleştirici kelime tavsiyesi ekle.

SADECE ŞU JSON FORMATINDA DÖN:
{{
  "native_rewrite": "string",
  "feedback_notes": "string",
  "vocabulary_suggestions": [
    {{"original": "string", "suggested": "string", "meaning": "string"}}
  ]
}}
"""
    try:
        completion = groq_client.chat.completions.create(
            model=GROQ_MODEL,
            messages=[{"role": "user", "content": prompt}],
            response_format={"type": "json_object"},
            temperature=0.3,
        )
        data = parse_llm_json(completion.choices[0].message.content)

        if supabase and req.user_id:
            try:
                supabase.table("user_journals").insert({
                    "user_id": req.user_id,
                    "original_text": req.journal_text,
                    "native_rewrite": data.get("native_rewrite", ""),
                    "feedback_notes": data.get("feedback_notes", ""),
                    "vocabulary_suggestions": data.get("vocabulary_suggestions", [])
                }).execute()
            except Exception as e:
                print("Journal DB hatası:", e)

        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 6. DİNAMİK SEVİYE TESPİT TESTİ
@app.get("/api/placement-questions")
def get_placement_questions():
    return {
        "questions": [
            {"id": 1, "level": "A1-A2", "question": "Introduce yourself: What is your name, where do you live, and what do you like doing in your free time?"},
            {"id": 2, "level": "B1-B2", "question": "Describe a difficult situation you solved in your life or studies. What did you do?"},
            {"id": 3, "level": "B2-C1", "question": "Do you think remote work is more productive than office work? Explain your opinion with reasons."}
        ]
    }

@app.post("/api/evaluate-placement")
def evaluate_placement(req: PlacementRequest):
    if not groq_client:
        raise HTTPException(status_code=500, detail="Groq API key eksik.")

    answers_str = "\n".join([f"Soru: {a.question}\nCevap: {a.answer}" for a in req.answers])
    prompt = f"""
Öğrencinin cevapları:
{answers_str}

Öğrenciye en uygun seviyeyi belirle ('A1', 'A2', 'B1', 'B2', 'C1'). SADECE JSON DÖN:
{{
  "recommended_level": "A1 | A2 | B1 | B2 | C1",
  "score": 75,
  "summary": "Türkçe 2 cümlelik gerekçe.",
  "strengths": ["Güçlü yön 1"],
  "improvements": ["Gelişmesi gereken alan 1"]
}}
"""
    try:
        completion = groq_client.chat.completions.create(
            model=GROQ_MODEL,
            messages=[{"role": "user", "content": prompt}],
            response_format={"type": "json_object"},
            temperature=0.2,
        )
        res_data = parse_llm_json(completion.choices[0].message.content)

        if supabase and req.user_id:
            try:
                supabase.table("user_profiles").update({
                    "current_level": res_data.get("recommended_level", "B1")
                }).eq("id", req.user_id).execute()
            except Exception as e:
                print("Profil seviye güncelleme hatası:", e)

        return res_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 7. AI GÜNLÜK GÖREVLER
@app.get("/api/daily-task")
def get_daily_task(user_id: str = "demo_user"):
    if not groq_client:
        raise HTTPException(status_code=500, detail="Groq API key eksik.")

    recent_mistakes = []
    if supabase:
        try:
            res = (
                supabase.table("user_mistakes")
                .select("error_type, original_sentence, corrected_sentence")
                .eq("user_id", user_id)
                .order("created_at", desc=True)
                .limit(5)
                .execute()
            )
            recent_mistakes = res.data or []
        except Exception as e:
            print("Hata çekme hatası:", e)

    prompt = f"""
Öğrencinin son hataları:
{json.dumps(recent_mistakes, ensure_ascii=False)}

GÖREV:
Bu hatalara yönelik 3 mikro pratik görev üret. SADECE JSON DÖN:
{{
  "focus_area": "Örn: Zamanlar & Edatlar",
  "tasks": [
    {{"id": 1, "title": "Görev Başlığı", "instruction": "Açıklama", "challenge": "İngilizce örnek"}}
  ],
  "motivational_tip": "Türkçe motive edici tavsiye"
}}
"""
    try:
        completion = groq_client.chat.completions.create(
            model=GROQ_MODEL,
            messages=[{"role": "user", "content": prompt}],
            response_format={"type": "json_object"},
            temperature=0.4,
        )
        return parse_llm_json(completion.choices[0].message.content)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 8. MISTAKES (KULLANICI HATALARI)
@app.get("/api/mistakes")
def get_user_mistakes(user_id: str = "demo_user"):
    if not supabase:
        return {"mistakes": [], "stats": {}}

    try:
        res = (
            supabase.table("user_mistakes")
            .select("*")
            .eq("user_id", user_id)
            .order("created_at", desc=True)
            .execute()
        )
        mistakes = res.data or []

        stats = {}
        for m in mistakes:
            err = m.get("error_type", "General")
            stats[err] = stats.get(err, 0) + 1

        return {"mistakes": mistakes, "stats": stats}
    except Exception as e:
        return {"mistakes": [], "stats": {}, "error": str(e)}

# 9. PRATİK ENDPOINT'LERİ
@app.get("/api/practice/questions")
def get_practice_questions(level: str = "A1", practice_type: str = "mixed"):
    if not groq_client:
        raise HTTPException(status_code=500, detail="Groq API key eksik.")

    prompt = f"""
Hedef İngilizce Seviyesi: {level}
Alıştırma Tipi: Boşluk Doldurma ve Cümle Çevirme.

4 soru üret (2 fill_blank, 2 translate). SADECE JSON DÖN:
{{
  "questions": [
    {{
      "id": 1,
      "type": "fill_blank",
      "prompt": "She ____ to the cinema every Saturday.",
      "options": ["go", "goes", "going", "gone"],
      "correct_answer": "goes",
      "explanation": "Geniş zamanda (Simple Present) He/She/It için fiile -s takısı gelir."
    }},
    {{
      "id": 2,
      "type": "translate",
      "prompt": "Dün akşam arkadaşlarımla kahve içtim.",
      "expected_answer": "I drank coffee with my friends yesterday evening.",
      "hint": "drink -> drank (Past Simple)"
    }}
  ]
}}
"""
    try:
        completion = groq_client.chat.completions.create(
            model=GROQ_MODEL,
            messages=[{"role": "user", "content": prompt}],
            response_format={"type": "json_object"},
            temperature=0.3,
        )
        return parse_llm_json(completion.choices[0].message.content)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/practice/check")
def check_practice_answer(req: CheckAnswerRequest):
    if not groq_client:
        raise HTTPException(status_code=500, detail="Groq API key eksik.")

    prompt = f"""
Seviye: {req.level}
Soru Tipi: {req.question_type}
Soru: {req.question}
Referans/Beklenen: {req.target_rule_or_phrase}
Öğrencinin Cevabı: {req.user_answer}

Cevap doğru mu (is_correct: true/false)? SADECE JSON DÖN:
{{
  "is_correct": true,
  "score_out_of_100": 90,
  "feedback": "Türkçe 1-2 cümlelik açıklama ve yapıcı geri bildirim.",
  "ideal_sentence": "En kusursuz İngilizce karşılığı"
}}
"""
    try:
        completion = groq_client.chat.completions.create(
            model=GROQ_MODEL,
            messages=[{"role": "user", "content": prompt}],
            response_format={"type": "json_object"},
            temperature=0.2,
        )
        return parse_llm_json(completion.choices[0].message.content)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 10. VIDEO LISTENING & KELİME SÖZLÜĞÜ ENDPOINT'LERİ (TAM TRANSKRİPT DESTEKLİ)
@app.post("/api/video/quiz")
def generate_video_quiz(req: VideoQuizRequest):
    if not groq_client:
        raise HTTPException(status_code=500, detail="Groq API key eksik.")

    content_reference = req.transcript_text if req.transcript_text else req.video_topic

    prompt = f"""
Hedef İngilizce Seviyesi: {req.level}
Video: {req.video_title}

BU VİDEODA KONUŞULAN GERÇEK METİN:
\"\"\"{content_reference[:4000]}\"\"\"

GÖREV:
Yukarıdaki metne dayanarak doğrudan videoda geçen detaylardan tam 3 adet çoktan seçmeli Listening sorusu üret.
- Soru ve şıklar İngilizce olmalı.
- Açıklama (explanation) Türkçe olmalı.

SADECE ŞU GEÇERLİ JSON FORMATINDA DÖN:
{{
  "questions": [
    {{
      "id": 1,
      "question": "Metinden çıkarılacak İngilizce soru?",
      "options": ["A şıkkı", "B şıkkı", "C şıkkı", "D şıkkı"],
      "correct_answer": "Doğru olan şıkkın birebir metni",
      "explanation": "Metinde geçen şu ifadeye göre doğru cevap budur."
    }}
  ]
}}
"""
    try:
        completion = groq_client.chat.completions.create(
            model=GROQ_MODEL,
            messages=[{"role": "user", "content": prompt}],
            response_format={"type": "json_object"},
            temperature=0.2,
        )
        return parse_llm_json(completion.choices[0].message.content)
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/video/lookup-word")
def lookup_word_in_context(req: WordLookupRequest):
    if not groq_client:
        raise HTTPException(status_code=500, detail="Groq API key eksik.")

    prompt = f"""
Cümle Bağlamı: "{req.sentence_context}"
Hedef Kelime: "{req.word}"
Kullanıcı Seviyesi: {req.level}

GÖREV:
Bu kelimenin verilen cümle içindeki Türkçe anlamını açıkla.

SADECE ŞU JSON FORMATINDA DÖN:
{{
  "word": "{req.word}",
  "turkish_meaning": "Türkçe karşılığı",
  "part_of_speech": "İsim / Fiil / Sıfat / Zarf",
  "simple_example": "Kelimenin geçtiği çok basit 1 İngilizce örnek cümle"
}}
"""
    try:
        completion = groq_client.chat.completions.create(
            model=GROQ_MODEL,
            messages=[{"role": "user", "content": prompt}],
            response_format={"type": "json_object"},
            temperature=0.2,
        )
        return parse_llm_json(completion.choices[0].message.content)
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

# 11. AUDIO DICTATION (DİKTE PRATİĞİ) ENDPOINT'LERİ
@app.get("/api/dictation/prompts")
def get_dictation_prompts(level: str = "A1"):
    prompts_by_level = {
        "A1": [
            {"id": "d_a1_1", "text": "I would like a cup of hot coffee with milk, please.", "category": "Cafe"},
            {"id": "d_a1_2", "text": "Where is the nearest subway station in the city center?", "category": "Travel"},
            {"id": "d_a1_3", "text": "She usually reads an interesting book before going to sleep.", "category": "Daily Routine"}
        ],
        "A2": [
            {"id": "d_a2_1", "text": "Could you please tell me how much this blue jacket costs?", "category": "Shopping"},
            {"id": "d_a2_2", "text": "We booked a comfortable hotel room for three nights next week.", "category": "Hotel"},
            {"id": "d_a2_3", "text": "I could not join the meeting yesterday because my train was delayed.", "category": "Travel"}
        ],
        "B1": [
            {"id": "d_b1_1", "text": "I have been working on this web development project for two months.", "category": "Work"},
            {"id": "d_b1_2", "text": "Although the weather was terrible, we decided to continue our road trip.", "category": "General"},
            {"id": "d_b1_3", "text": "Could you provide more details regarding your previous engineering experience?", "category": "Interview"}
        ],
        "B2": [
            {"id": "d_b2_1", "text": "We need to thoroughly evaluate the potential risks before launching the campaign.", "category": "Business"},
            {"id": "d_b2_2", "text": "Effective cross-cultural leadership requires both active listening and mutual empathy.", "category": "Management"}
        ],
        "C1": [
            {"id": "d_c1_1", "text": "The implementation of distributed architectural patterns significantly mitigates unexpected latency spikes.", "category": "Architecture"},
            {"id": "d_c1_2", "text": "Unprecedented fluctuations in liquidity ratios necessitated immediate monetary policy interventions.", "category": "Economics"}
        ]
    }
    return {"prompts": prompts_by_level.get(level, prompts_by_level["A1"])}

@app.post("/api/dictation/check")
def check_dictation(req: DictationCheckRequest):
    if not groq_client:
        raise HTTPException(status_code=500, detail="Groq API key eksik.")

    prompt = f"""
Hedef Cümle: "{req.original_text}"
Öğrencinin Dinleyip Yazdığı: "{req.user_transcript}"
Seviye: {req.level}

Cümleyi karşılaştırıp 100 üzerinden doğruluk puanı ver. SADECE JSON DÖN:
{{
  "accuracy_score": 85,
  "missed_words": ["kelime1"],
  "feedback": "Türkçe yapıcı açıklama",
  "is_perfect": false
}}
"""
    try:
        completion = groq_client.chat.completions.create(
            model=GROQ_MODEL,
            messages=[{"role": "user", "content": prompt}],
            response_format={"type": "json_object"},
            temperature=0.2,
        )
        return parse_llm_json(completion.choices[0].message.content)
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

# 12. KAPSAMLI SEVİYE ATLAMA SINAVI (LISTENING + READING + WRITING)
@app.get("/api/level-up/comprehensive-exam")
def get_comprehensive_exam(level: str = "A1"):
    EXAM_DATA = {
        "A1": {
            "listening": {
                "title": "Dinleme & Dikte",
                "text": "I usually drink a cup of coffee and have breakfast with my family before going to school."
            },
            "reading": {
                "title": "Okuma & Çeviri",
                "source_text": "London is a large city with many beautiful parks and historical museums. People use buses and the underground train to travel every day.",
                "instruction": "Yukarıdaki İngilizce metni dikkatle oku ve en doğru şekilde Türkçeye çevir."
            },
            "writing": {
                "title": "Yazma & Kendini İfade Etme",
                "topic": "Describe your daily routine: What time do you wake up, what do you eat, and what do you do in the evening?",
                "instruction": "Günlük rutinin hakkında en az 2-3 cümlelik İngilizce bir paragraf yaz."
            }
        },
        "A2": {
            "listening": {
                "title": "Dinleme & Dikte",
                "text": "We booked a hotel room near the beach, but the flight was delayed due to heavy rain."
            },
            "reading": {
                "title": "Okuma & Çeviri",
                "source_text": "Last summer, Emily traveled across Europe by train. She met interesting travelers and tried various traditional dishes in each country she visited.",
                "instruction": "Yukarıdaki metni okuyarak akıcı bir Türkçe çevirisini yaz."
            },
            "writing": {
                "title": "Yazma & Deneyim Aktarımı",
                "topic": "Describe your last holiday or a weekend trip you enjoyed. Where did you go and what did you do?",
                "instruction": "Geçmiş bir tatilini anlatan en az 3-4 cümlelik geçmiş zamanlı (Past Simple) bir İngilizce metin yaz."
            }
        },
        "B1": {
            "listening": {
                "title": "Dinleme & Dikte",
                "text": "Although the team encountered unexpected software errors during deployment, they resolved them before the deadline."
            },
            "reading": {
                "title": "Okuma & Çeviri",
                "source_text": "Artificial intelligence tools are transforming workplace productivity by automating repetitive tasks. However, critical thinking and emotional intelligence remain distinctly human qualities that algorithms cannot fully replicate.",
                "instruction": "Metnin ana fikrini ve detaylarını koruyarak doğal bir Türkçe çeviri yap."
            },
            "writing": {
                "title": "Yazma & Fikir Savunması",
                "topic": "Do you believe working remotely from home is more effective than working in a traditional office? Give reasons.",
                "instruction": "Uzaktan çalışma hakkındaki görüşünü gerekçeleriyle savunan 4-5 cümlelik İngilizce bir paragraf yaz."
            }
        },
        "B2": {
            "listening": {
                "title": "Dinleme & Dikte",
                "text": "The executive board agreed that aggressive marketing campaigns without addressing technical debt would harm customer retention."
            },
            "reading": {
                "title": "Okuma & Çeviri",
                "source_text": "Sustainable corporate architecture prioritizes scalable infrastructure and operational redundancy. Organizations that neglect systemic risks often suffer from exponential recovery costs following critical outages.",
                "instruction": "Yukarıdaki teknik metni Türkçe profesyonel bir dille çevir."
            },
            "writing": {
                "title": "Yazma & Stratejik Görüş",
                "topic": "How can technology leaders manage burnout among engineering teams during tight project deadlines?",
                "instruction": "Mühendislik ekiplerindeki tükenmişliği önleme stratejilerini tartışan B2 düzeyinde profesyonel bir İngilizce analiz yaz."
            }
        }
    }
    return EXAM_DATA.get(level, EXAM_DATA["A1"])

@app.post("/api/level-up/evaluate-comprehensive")
def evaluate_comprehensive_exam(req: ComprehensiveExamRequest):
    if not groq_client:
        raise HTTPException(status_code=500, detail="Groq API key eksik.")

    prompt = f"""
Öğrenci {req.current_level} seviyesini tamamlamak ve {req.target_level} seviyesine geçmek için 3 temel alanda sınava girdi:

1. DİNLEME (LISTENING / DİKTE):
- Orijinal Metin: "{req.listening_audio_text}"
- Öğrencinin Yazdığı: "{req.user_listening_transcript}"

2. OKUMA & ANLAMA (READING / TÜRKÇE ÇEVİRİ):
- İngilizce Metin: "{req.reading_source_text}"
- Öğrencinin Türkçe Çevirisi: "{req.user_reading_translation}"

3. YAZMA (WRITING / İNGİLİZCE PARAGRAF):
- Verilen Konu: "{req.writing_topic}"
- Öğrencinin Yazdığı İngilizce Metin: "{req.user_writing_essay}"

GÖREV:
Her bir beceriyi (1-100) ayrı ayrı puanla:
- listening_score
- reading_score
- writing_score
Genel Ortalama: (listening_score + reading_score + writing_score) / 3
Geçme Notu: 70 ve üzeri (passed: true / false).

SADECE ŞU JSON FORMATINDA DÖN:
{{
  "listening_score": 85,
  "reading_score": 90,
  "writing_score": 80,
  "overall_score": 85,
  "passed": true,
  "summary_feedback": "Türkçe 2-3 cümlelik kapsamlı sınav sonucu ve seviye değerlendirmesi.",
  "listening_comment": "Dinleme performansı hakkında 1 cümle.",
  "reading_comment": "Okuma ve çeviri performansı hakkında 1 cümle.",
  "writing_comment": "Yazma performansı hakkında 1 cümle."
}}
"""
    try:
        completion = groq_client.chat.completions.create(
            model=GROQ_MODEL,
            messages=[{"role": "user", "content": prompt}],
            response_format={"type": "json_object"},
            temperature=0.2,
        )
        report = parse_llm_json(completion.choices[0].message.content)

        passed = report.get("passed", False)
        if passed and supabase and req.user_id:
            try:
                supabase.table("user_profiles").update({
                    "current_level": req.target_level
                }).eq("id", req.user_id).execute()
            except Exception as e:
                print("Seviye yükseltme veritabanı hatası:", e)

        return report
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))