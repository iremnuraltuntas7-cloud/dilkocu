# 🌍 Dil Koçu (AI Language Coach)

Dil Koçu (AI Language Coach), Fırat Üniversitesi Bilgisayar Mühendisliği staj çalışmaları kapsamında geliştirilen, yapay zekâ destekli interaktif bir dil öğrenme ve koçluk platformudur.

Projenin amacı, kullanıcıların dil öğrenme süreçlerini daha kişiselleştirilmiş, etkileşimli ve erişilebilir hâle getirmektir. Platform, modern web teknolojilerini ve yapay zekâ servislerini bir araya getirerek dil öğrenimini destekleyen bir deneyim sunmayı hedefler.

## 🚀 Kullanılan Teknolojiler
- **Frontend:** Next.js, React, Tailwind CSS
- **Backend:** Python, FastAPI
- **Yapay Zekâ:** Groq API
- **Veritabanı ve Backend Servisleri:** Supabase
- **API Mimarisi:** RESTful API

## 📂 Proje Yapısı
```text
ai-language-coach/
├── frontend/       # Next.js ve React arayüzü
└── backend/        # FastAPI ve yapay zekâ servisleri
⚙️ Kurulum ve Çalıştırma
Projeyi yerel bilgisayarınızda çalıştırmak için aşağıdaki adımları izleyebilirsiniz.

Gereksinimler
Python

Node.js ve npm

Groq API anahtarı

Git

1. Backend Kurulumu
Backend klasörüne gidin:

Bash
cd backend
Sanal ortam oluşturun ve etkinleştirin:

Windows:

Bash
python -m venv venv
venv\Scripts\activate
macOS / Linux:

Bash
python -m venv venv
source venv/bin/activate
Gerekli Python kütüphanelerini yükleyin:

Bash
pip install -r requirements.txt
Ortam değişkenlerini yapılandırın:
backend/.env.example dosyasını .env adıyla kopyalayın ve gerekli API anahtarını ekleyin:

Kod snippet'i
GROQ_API_KEY=sizin_api_anahtariniz
(Güvenlik notu: API anahtarlarınızı ve .env dosyanızı GitHub üzerinde paylaşmayın.)

Backend sunucusunu başlatın:

Bash
uvicorn main:app --reload
FastAPI dokümantasyonuna varsayılan olarak http://127.0.0.1:8000/docs adresinden erişebilirsiniz.

2. Frontend Kurulumu
Yeni bir terminal açın ve proje kök dizininden frontend klasörüne gidin:

Bash
cd frontend
Gerekli bağımlılıkları yükleyin:

Bash
npm install
Geliştirme sunucusunu başlatın:

Bash
npm run dev
Uygulamayı tarayıcıda açın:
Varsayılan olarak http://localhost:3000 adresini ziyaret edin.

(Not: Frontend ve backend'in birbiriyle doğru iletişim kurabilmesi için API adresleri ve gerekli ortam değişkenleri proje yapılandırmasına uygun şekilde ayarlanmalıdır.)

🔑 Ortam Değişkenleri
Projenin çalışması için gerekli API anahtarları ve bağlantı bilgileri ortam değişkenleri üzerinden yapılandırılmalıdır:

GROQ_API_KEY: Groq API erişim anahtarı.

Supabase kullanılıyorsa gerekli proje URL'si ve erişim anahtarları.

Frontend ve backend arasındaki bağlantı için gereken API adresleri.

Gerçek anahtarlar yerine kendi yerel ortamınıza ait değerleri kullanın. Gizli bilgilerinizi kaynak koduna doğrudan eklemeyin.

🛠️ Geliştirme ve Katkı
Projeyi geliştirmek veya kendi ortamınızda denemek için:

Depoyu bilgisayarınıza klonlayın.

Backend ve frontend bağımlılıklarını yükleyin.

Gerekli ortam değişkenlerini yapılandırın.

İki sunucuyu ayrı terminallerde çalıştırın.

🎓 Proje Bilgileri
Proje Adı: Dil Koçu (AI Language Coach)

Proje Türü: Yapay Zekâ Destekli Web Uygulaması

Geliştirme Kapsamı: Fırat Üniversitesi Bilgisayar Mühendisliği staj çalışmaları

Bu proje, modern web teknolojileri ve yapay zekâ entegrasyonu kullanılarak geliştirilmiştir.
