"use client";

import { useState, useEffect } from "react";
import { 
  Bot, 
  User, 
  Send, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  BarChart3, 
  X,
  Coffee,
  ShoppingBag,
  Navigation,
  Utensils,
  Shirt,
  Hotel,
  Stethoscope,
  Plane,
  Briefcase,
  Users,
  Building,
  GraduationCap,
  Calendar,
  Compass,
  Laptop,
  HelpCircle,
  TrendingUp,
  FileSpreadsheet,
  Handshake,
  Flame,
  Award,
  Globe2,
  Megaphone,
  Workflow,
  Target,
  Gavel,
  ShieldCheck,
  Scale,
  BrainCircuit,
  Cpu,
  Layers,
  Flag,
  Check,
  ListTodo,
  BookOpen,
  MessageSquare,
  PartyPopper,
  Mail,
  LogOut,
  Dumbbell,
  PlaySquare,
  Play,
  Volume2
} from "lucide-react";

const API_BASE_URL = typeof window !== "undefined" 
  ? `http://${window.location.hostname}:8000` 
  : "[http://127.0.0.1:8000](http://127.0.0.1:8000)";

interface Correction {
  error_type: string;
  original: string;
  suggested: string;
  explanation: string;
}

interface Message {
  role: "user" | "ai";
  content: string;
}

interface Scenario {
  id: string;
  title: string;
  desc: string;
  icon: any;
  initialMessage: string;
}

interface VideoLesson {
  id: string;
  youtubeId: string;
  title: string;
  topic: string;
  duration: string;
  transcript: string[];
}

const LEVEL_VIDEOS: Record<string, VideoLesson[]> = {
  A1: [
    {
      id: "a1_v1",
      youtubeId: "Efi9tB75cZs",
      title: "The Story Behind Coffee",
      topic: "BBC 6 Minute English",
      duration: "6:23",
      transcript: [
        "Hello! The programme you're about to listen to was first broadcast in April 2015 on the BBC Learning English website.",
        "For more English language learning programmes and podcasts, search for BBC Learning English.",
        "6 Minute English from BBC Learning English.",
        "Hello, I'm Rob. Welcome to 6 Minute English. With me today is Neil. Hello, Neil. Hello, Rob!",
        "In this programme, we're going to be talking about coffee. Mm, coffee. I've actually got one here in front of me, Rob.",
        "Oh, right! What kind of coffee are you drinking?",
        "It's a skinny latte. And what's that that you've got?",
        "Well, I've gone for a flat white today. Mm, that tastes good. Mm, looks good too!",
        "The market for the world's most popular drink has come a long way since the days of instant coffee, when we just added boiling water to some brown powder.",
        "Yes, that's very true, Neil. After that came the giants like Starbucks and Costa Coffee who made coffee drinking trendy and a lifestyle statement.",
        "People are far more aware of what they're drinking these days.",
        "Mm, but, Rob, I don't think we should forget what lies behind the coffee we enjoy every day. It's a hugely complicated business.",
        "Yes, it's the second biggest commodity in the world, after oil.",
        "That means the price of coffee is changing every day, every hour even, as traders speculate about the price.",
        "And it means farmers in countries like Ethiopia, Costa Rica and Brazil are dependent on the deals that are made in commodity markets thousands of miles from their farms.",
        "It makes them extremely vulnerable. Let's listen to food journalist Sheila Dillon as she explains the impact of coffee markets on local growers.",
        "She uses an expression that means 'has a big effect'. Can you tell me what it is?",
        "What happens in the coffee market makes waves around the globe. Entire national economies depend on the price of coffee.",
        "It's the key to whether individual farmers can provide for their families, face unemployment and ultimately whether whole communities stay on the land or trek to the cities.",
        "She said 'makes waves'. This means 'have a big effect'.",
        "She also used the expression 'provide for' their families. This means the farmer's family have enough income to live comfortably.",
        "Good. Right. So, what about our quiz question today?",
        "Neil, do you know how many cups of coffee are drunk worldwide each year? Is it a) 38 billion? b) 400 billion? Or c) 950 billion?",
        "Well, it's going to be a huge number, of course, but I still think I'll go for the lowest figure, which is 38 billion.",
        "OK, well, we'll see if you've got the answer right at the end of the programme.",
        "Now, the price of coffee has 'soared' - that means 'gone up quickly' - in recent years, Rob. Surely that's good for everyone involved in the business?",
        "I believe the profit margins for coffee are amongst the highest in the world. I can't see what all the fuss is about.",
        "Well, Neil, just because the price is high, it doesn't mean that everyone benefits. It all depends on how the profits are distributed.",
        "You see, there are countless transactions between the grower and the drinker. A grower can have a really good crop, but the amount he makes stays the same, or can even fall.",
        "Mm, I see the problem. I expect most of the profits go to the commodity traders and very little to the individual growers of the bean. It sounds like the growers have no control.",
        "That's what happens in other agricultural sectors. I'm afraid so. Of course, some people are trying to distribute the profits more widely and they have been having some success.",
        "Yes, I heard about some small-scale projects where the company takes charge of the whole process from field to shop.",
        "Yes, these organisations tend to farm organically. This is very 'labour intensive' — that means a lot of people are employed — and it creates a lot of jobs for people within the local community.",
        "In this way, they are not victims of market fluctuations. Let's listen to Leo Virmani, who runs a small plantation like this in Costa Rica.",
        "What's the verb he uses for putting the coffee in a box before selling it?",
        "For our plantation, the approach we have is to go through every step of the way, every step of the process, so that we grow it, we pick it, we process it in the mill.",
        "Then eventually, we'll roast it, we'll package it, and we sell it as the small plantation we are. And that would allow us to stay, or be, profitable at the end of the day.",
        "So, he used the verb 'package', which means put a product in a packet or box before selling it.",
        "And he said his community can stay 'profitable' — this means they can always maintain profits or make money.",
        "Well, it's good to know that small growers can live reasonably comfortably, despite what the world markets are doing.",
        "The next time I grab a takeaway coffee, I'll try to remember all the politics involved in the production process.",
        "Yes, me too. So, shall we have the answer to the quiz question now?",
        "Yes. You asked me how many cups of coffee are drunk worldwide each year: 38 billion, 400 billion or 950 billion? And I guessed 38 billion.",
        "Mm, I'm afraid you're wrong. The answer is actually 400 billion. No way. That's incredible. Yes, it's an extraordinary statistic.",
        "Well, we're almost out of time, so let's remind ourselves of some of the words we've said today. Neil: Commodity, speculate, fluctuations, vulnerable, make waves, provides for, labour intensive, package, profitable.",
        "Well, that's it for today. Do visit BBC Learning English dot com to find more 6 Minute English programmes. Until next time, goodbye! Bye!"
      ]
    }
  ],
  A2: [
    {
      id: "a2_v1",
      youtubeId: "Efi9tB75cZs",
      title: "The Coffee Economy & Fair Trade",
      topic: "BBC 6 Minute English - Global Trade",
      duration: "6:23",
      transcript: [
        "Welcome to 6 Minute English. In this programme we focus on the global supply chain of coffee beans.",
        "The market for the world's most popular drink has expanded massively with global coffeehouse chains.",
        "Behind everyday coffee lies a multi-billion dollar trade network that links consumers directly with equatorial farms.",
        "Coffee ranks as the second largest traded commodity globally, surpassed only by petroleum crude oil.",
        "Because prices fluctuate daily based on financial market speculation, farmers face intense economic vulnerability.",
        "Major cultivating nations include Ethiopia, Costa Rica, and Brazil, where local livelihoods depend on overseas markets.",
        "When market volatility strikes, whole agrarian communities must decide whether to remain on farms or migrate to urban areas.",
        "Despite retail coffee price surges and high commercial profit margins, smallholder growers rarely reap equal benefits.",
        "Middlemen and international commodities brokers secure the vast majority of consumer spending margins.",
        "Sustainable direct-trade cooperatives empower growers by managing the entire process: cultivation, harvesting, milling, roasting, and packaging.",
        "This labor-intensive organic approach stabilizes farmer revenue and generates local employment resilient to global market swings.",
        "With over 400 billion cups consumed each year, ethical sourcing remains critical to sustaining farming families worldwide."
      ]
    }
  ],
  B1: [
    {
      id: "b1_v1",
      youtubeId: "lEXBxijQREo",
      title: "How Sugar Affects the Brain",
      topic: "TED-Ed - Nicole Avena",
      duration: "5:03",
      transcript: [
        "Picture warm gooey cookies, crunchy candies, velvety cakes, waffle cones piled high with ice cream. Is your mouth watering? Are you craving dessert?",
        "Why? What happens in the brain that makes sugary foods so hard to resist?",
        "Sugar is a general term used to describe a class of molecules called carbohydrates, and it's found in a wide variety of food and drink.",
        "Just check the labels on sweet products you buy: glucose, fructose, sucrose, maltose, lactose, dextrose, and starch are all forms of sugar.",
        "So are high fructose corn syrup, fruit juice, raw sugar, and honey.",
        "And sugar isn't just in candies and desserts; it's also added to tomato sauce, yogurt, dried fruit, flavored waters, or granola bars.",
        "Since sugar is everywhere, it's important to understand how it affects the brain.",
        "What happens when sugar hits your tongue? And does eating a little bit of sugar make you crave more?",
        "You take a bite of cereal. The sugars it contains activate the sweet taste receptors, part of the taste buds on the tongue.",
        "These receptors send a signal up to the brain stem, and from there it forks off into many areas of the forebrain, one of which is the cerebral cortex.",
        "Different sections of the cerebral cortex process different tastes: bitter, salty, umami, and in our case, sweet.",
        "From here, the signal activates the brain's reward system. This reward system is a series of electrical and chemical pathways across several different regions of the brain.",
        "It's a complicated network, but it helps answer a single subconscious question: 'Should I do that again?'",
        "That warm fuzzy feeling you get when you taste grandma's chocolate cake? That's your reward system saying, 'Mmm, yes!'",
        "And it's not just activated by food. Socializing, sexual behavior, and drugs are just a few examples of things and experiences that also activate the reward system.",
        "But overactivating this reward system kick-starts a series of unfortunate events: loss of control, craving, and increased tolerance to sugar.",
        "Let's get back to our bite of cereal. It travels down into your stomach and eventually into your gut.",
        "And guess what? There are sugar receptors here too. They're not taste buds, but they do send signals telling your brain that you're full or that your body should produce more insulin to deal with the extra sugar you're eating.",
        "The major currency of our reward system is dopamine, an important chemical or neurotransmitter.",
        "There are many dopamine receptors in the forebrain, but they're not evenly distributed. Certain areas contain dense clusters of receptors, and these dopamine hotspots are part of our reward system.",
        "Drugs like alcohol, nicotine, or heroin send dopamine into overdrive, leading some people to constantly seek that high — in other words, to be addicted.",
        "Sugar also causes dopamine to be released, though not as violently as drugs. And sugar is rare among dopamine-inducing foods.",
        "Broccoli, for example, has no effect, which probably explains why it's so hard to get kids to eat their veggies.",
        "Speaking of healthy foods, let's say you're hungry and decide to eat a balanced meal. You do, and dopamine levels spike in the reward system hotspots.",
        "But if you eat that same dish many days in a row, dopamine levels will spike less and less, eventually leveling out.",
        "That's because when it comes to food, the brain evolved to pay special attention to new or different tastes.",
        "Why? Two reasons: first, to detect food that's gone bad; and second, because the more variety we have in our diet, the more likely we are to get all the nutrients we need.",
        "To keep that variety up, we need to be able to recognize a new food, and more importantly, we need to want to keep eating new foods. And that's why the dopamine levels off when a food becomes boring.",
        "Now back to that meal. What happens if, in place of the healthy balanced dish, you eat sugar-rich food instead?",
        "If you rarely eat sugar or don't eat much at a time, the effect is similar to that of the balanced meal.",
        "But if you eat too much, the dopamine response does not level out. In other words, eating lots of sugar will continue to feel rewarding. In this way, sugar behaves a little bit like a drug. It's one reason people seem to be hooked on sugary foods.",
        "So think back to all those different kinds of sugar. Each one is unique, but every time any sugar is consumed, it kick-starts a domino effect in the brain that sparks a rewarding feeling.",
        "Too much, too often, and things can go into overdrive.",
        "So yes, overconsumption of sugar can have addictive effects on the brain, but a wedge of cake once in a while won't hurt you."
      ]
    }
  ],
  B2: [
    {
      id: "b2_v1",
      youtubeId: "h6fcK_fRYaI",
      title: "The Egg - A Short Story",
      topic: "Kurzgesagt – In a Nutshell",
      duration: "8:06",
      transcript: [
        "You were on your way home when you died. It was a car accident. Nothing particularly remarkable, but fatal nonetheless.[cite: 3]",
        "It was a painless death. The medics tried their best to save you, but to no avail.[cite: 3] Your body was so utterly shattered you were better off, trust me.[cite: 3]",
        "And that's when you met me.[cite: 3] 'What happened? Where am I?'[cite: 3]",
        "'You died,' I said matter-of-factly.[cite: 3] 'No point in mincing words.'[cite: 3]",
        "'There was... there was a truck and it was skidding...' 'Yes.' 'I... I died?' 'Yes, but don't feel bad about it. Everyone dies.'[cite: 3]",
        "You looked around.[cite: 3] There was nothingness, just you and me.[cite: 3] 'What is this place? Is this the afterlife?' 'More or less.' 'Are you God?' 'Yes, I'm God.'[cite: 3]",
        "'My kids... my wife... What about them? Will they be all right?'[cite: 3]",
        "'That's what I like to see,' I said.[cite: 3] 'You just died and your main concern is for your family.[cite: 3] That's good stuff right there.'[cite: 3]",
        "You looked at me with fascination.[cite: 3] To you, I didn't look like God.[cite: 3] I just looked like some man, or possibly a woman.[cite: 3] Some vague authority figure maybe.[cite: 3]",
        "'Don't worry,' I said.[cite: 3] 'They'll be fine.[cite: 3] Your kids will remember you as perfect in every way.[cite: 3] They didn't have time to grow contemptuous of you.[cite: 3] Your wife will cry on the outside, but will be secretly relieved.[cite: 3] To be fair, your marriage was falling apart.[cite: 3] If it's any consolation, she'll feel very guilty for feeling relieved.'[cite: 3]",
        "'Oh. So what happens now? Do I go to heaven or hell or something?' 'Neither. You'll be reincarnated.'[cite: 3]",
        "'Ah, so the Hindus were right?' 'All religions are right in their own way. Walk with me.'[cite: 3]",
        "You followed along as we strode through the void.[cite: 3] 'Where are we going?' 'Nowhere in particular. It's just nice to walk while we talk.'[cite: 3]",
        "'So what's the point then? When I get reborn, I'll just be a blank slate, right? A baby. So all my experiences and everything I did in this life won't matter.'[cite: 3]",
        "'Not so! You have within you all the knowledge and experiences of all your past lives. You just don't remember them right now.'[cite: 3]",
        "I stopped walking and took you by the shoulders.[cite: 3] 'Your soul is more magnificent, beautiful, and gigantic than you can possibly imagine.[cite: 3] A human mind can only contain a tiny fraction of what you are.'[cite: 3]",
        "'It's like sticking your finger in a glass of water to see if it's hot or cold. You put a tiny part of yourself into the vessel, and when you bring it back out, you've gained all the experiences it had.'[cite: 3]",
        "'You've been in a human for the last 48 years, so you haven't stretched out yet and felt the rest of your immense consciousness.'[cite: 3]",
        "'How many times have I been reincarnated then?' 'Oh, lots. Lots and lots, and into lots of different lives. This time around, you'll be a Chinese peasant girl in 540 AD.'[cite: 3]",
        "'Wait, what? You're sending me back in time?' 'Well, I guess technically time as you know it only exists in your universe. Things are different where I come from.'[cite: 3]",
        "'Where you come from?' 'Oh sure, I come from somewhere... somewhere else. And there are others like me.'[cite: 3]",
        "'Wait, if I get reincarnated to other places in time, I could have interacted with myself at some point?' 'Sure, happens all the time. And with both lives only aware of their own lifespan, you don't even know it's happening.'[cite: 3]",
        "'So what's the point of it all?' I looked you in the eye. 'The meaning of life, the reason I made this whole universe, is for you to mature.'[cite: 3]",
        "'You mean mankind? You want us to mature?' 'No, just you. I made this whole universe for you. With each new life you grow and mature and become a larger and greater intellect.'[cite: 3]",
        "'Just me? What about everyone else?' 'There is no one else in this universe. There's just you and me.'[cite: 3]",
        "You stared blankly at me. 'But all the people on Earth...' 'All you. Different incarnations of you.'[cite: 3]",
        "'Wait... I'm everyone?' 'Now you're getting it.' 'I'm every human being who ever lived, or who will ever live?' 'Yes.'[cite: 3]",
        "'I'm Abraham Lincoln?' 'And you're John Wilkes Booth, too.' 'I'm Hitler?' you said, appalled. 'And you're the millions he killed. I'm Jesus?' 'And you're everyone who followed him.'[cite: 3]",
        "You fell silent. 'Every time you victimized someone, you were victimizing yourself.[cite: 3] Every act of kindness you've done, you've done to yourself.[cite: 3] Every happy and sad moment ever experienced by any human was, or will be, experienced by you.'[cite: 3]",
        "You thought for a long time. 'Why? Why do all this?'[cite: 3]",
        "'Because someday, you will become like me. Because that's what you are. You're one of my kind. You're my child.'[cite: 3]",
        "'Wow,' you said incredulous. 'You mean I'm a god?' 'No. Not yet. You're a fetus. You're still growing. Once you've lived every human life throughout all time, you will have grown enough to be born.'[cite: 3]",
        "'So the whole universe...' 'It's just an egg.' I answered. 'Now it's time for you to move on to your next life.' And I sent you on your way.[cite: 3]"
      ]
    }
  ],
  C1: [
    {
      id: "c1_v1",
      youtubeId: "arj7oStGLkU",
      title: "Inside the Mind of a Master Procrastinator",
      topic: "TED Talk - Tim Urban",
      duration: "14:04",
      transcript: [
        "So in college I was a government major, which means I had to write a lot of papers.",
        "Now when a normal student writes a paper, they might spread the work out a little like this.",
        "You get started maybe a little slowly, but you get enough done in the first week that with some heavier days later on, everything gets done and things stay civil.",
        "And I would want to do that. That would be the plan. I would have it all ready to go, but then actually the paper would come along, and then I would kind of do this. And that would happen every single paper.",
        "But then came my 90-page senior thesis, a paper you're supposed to spend a year on. I knew for a paper like that, my normal workflow was not an option. It was way too big a project.",
        "So I planned things out and I decided I kind of had to go something like this: start off light, bump it up in the middle months, and at the end kick it up into high gear. Just like a little staircase.",
        "Those middle months actually went by, and I didn't really write words. Two months turned into one month, which turned into two weeks. One day I woke up with three days until the deadline, still not having written a word.",
        "And so I wrote 90 pages over 72 hours, pulling not one but two all-nighters. Sprinted across campus, dove in slow motion, and got it in just at the deadline.",
        "Today I write the blog 'Wait But Why', and a couple years ago I decided to write about procrastination.",
        "I had a hypothesis that the brains of procrastinators were actually different than the brains of other people.",
        "Both brains have a Rational Decision-Maker in them, but the procrastinator's brain also has an Instant Gratification Monkey.",
        "The Rational Decision-Maker will make the rational decision to do something productive, but the monkey doesn't like that plan, so he takes the wheel.",
        "The Instant Gratification Monkey lives entirely in the present moment. He has no memory of the past, no knowledge of the future, and he only cares about two things: easy and fun.",
        "In our brain, the Rational Decision-Maker gives us the ability to visualize the future, see the big picture, and make long-term plans.",
        "When there is a conflict between easy/fun and hard/important, the procrastinator spends a lot of time in an orange zone called the Dark Playground.",
        "The Dark Playground is where leisure activities happen at times when they are not supposed to be happening. The air is filled with guilt, dread, anxiety, and self-hatred.",
        "How does the procrastinator ever get over to the productive zone? Turns out the procrastinator has a guardian angel called the Panic Monster.",
        "The Panic Monster is dormant most of the time, but he suddenly wakes up anytime a deadline gets too close or there's danger of public embarrassment or career disaster.",
        "The monkey is terrified of the Panic Monster. When the Panic Monster wakes up, the monkey flees up a tree, and finally the Rational Decision-Maker can take the wheel.",
        "When deadlines exist, the effects of procrastination are contained to the short term because the Panic Monster gets involved.",
        "But there is a second kind of procrastination that happens in situations when there is no deadline — like entrepreneurial dreams, health, relationships, or creative passions.",
        "In non-deadline situations, the Panic Monster doesn't show up. He has nothing to wake up for, so the effects of procrastination extend outward forever.",
        "This long-term procrastination makes people feel like spectators in their own lives. The frustration is that they weren't even able to start chasing their dreams.",
        "Remember, everyone is procrastinating on something in life. We need to stay aware of the Instant Gratification Monkey."
      ]
    }
  ]
};

const LEVEL_SCENARIOS: Record<string, Scenario[]> = {
  A1: [
    { id: "a1_meet", title: "Tanışma & Selamlaşma", desc: "Ad, yaş, ülke ve meslek söyleme", icon: Users, initialMessage: "Hello! Nice to meet you. What is your name and where are you from?" },
    { id: "a1_market", title: "Temel Alışveriş", desc: "Meyve, su isteme ve basit fiyat sorma", icon: ShoppingBag, initialMessage: "Hello! Welcome to the corner shop. What would you like to buy?" },
    { id: "a1_cafe", title: "Basit Kafe Siparişi", desc: "Çay, kahve isteme ve teşekkür etme", icon: Coffee, initialMessage: "Hi there! What can I get for you today? Coffee or tea?" },
    { id: "a1_family", title: "Aileni Tanıtma", desc: "Kardeş, anne, baba hakkında 2 cümle", icon: Users, initialMessage: "Tell me about your family. Do you have any brothers or sisters?" },
    { id: "a1_time", title: "Saat ve Günler", desc: "Buluşma saati ve gün kararlaştırma", icon: Calendar, initialMessage: "Hi! What day is good for our English study? What time are you free?" },
    { id: "a1_hobbies", title: "Hobiler ve Spor", desc: "Sevdiğin müzik, yemek ve aktiviteler", icon: Sparkles, initialMessage: "What do you like doing in your free time? Do you like sports or music?" },
    { id: "a1_hotel", title: "Otelde Basit Check-in", desc: "İsim söyleme ve oda anahtarı alma", icon: Hotel, initialMessage: "Good evening! Welcome. Do you have a room reservation for tonight?" },
    { id: "a1_weather", title: "Hava Durumu & Kıyafet", desc: "Güneşli, yağmurlu hava ve kıyafetler", icon: Compass, initialMessage: "Good morning! How is the weather outside in your city today?" }
  ],
  A2: [
    { id: "cafe", title: "Kahve Siparişi", desc: "Sipariş verme, boyut ve süt tercihi", icon: Coffee, initialMessage: "Hello! Welcome to Central Cafe. What can I get started for you today?" },
    { id: "market", title: "Süpermarket Alışverişi", desc: "Reyon sorma ve fiyat öğrenme", icon: ShoppingBag, initialMessage: "Hi there! Looking for something specific in our grocery store?" },
    { id: "directions", title: "Yol Tarifi Sorma", desc: "Metro, otobüs veya müze adresi", icon: Navigation, initialMessage: "Excuse me! You look a bit lost. Can I help you find somewhere in the city?" },
    { id: "restaurant", title: "Restoranda Yemek Siparişi", desc: "Menüden yemek seçme ve hesap isteme", icon: Utensils, initialMessage: "Good evening! Welcome to Bistro Bella. Table for one? Here is our menu." },
    { id: "clothes", title: "Kıyafet Mağazası", desc: "Beden, renk sorma ve deneme kabini", icon: Shirt, initialMessage: "Hello! Can I help you find a different size or color for that jacket?" },
    { id: "hotel_checkin", title: "Otel Rezervasyonu & Check-in", desc: "Giriş yapma, oda anahtarı ve wifi", icon: Hotel, initialMessage: "Welcome to Grand Hotel! Do you have a reservation under your name?" },
    { id: "pharmacy", title: "Eczanede İlaç Alma", desc: "Ağrı, soğuk algınlığı şikayeti", icon: Stethoscope, initialMessage: "Hello! How can I assist you today? What symptoms do you have?" },
    { id: "airport", title: "Havalimanı Pasaport Kontrolü", desc: "Uçuş amacı, bagaj ve biniş kartı", icon: Plane, initialMessage: "Passport and boarding pass, please. What is the purpose of your trip?" }
  ],
  B1: [
    { id: "job_interview", title: "İş Görüşmesi", desc: "Güçlü yönler ve geçmiş deneyimler", icon: Briefcase, initialMessage: "Thanks for coming in today. Could you tell me a little about yourself and your background?" },
    { id: "apartment", title: "Ev Kiralama & Emlakçı", desc: "Kira şartları, depozito ve faturalar", icon: Building, initialMessage: "Hi! Welcome to the apartment viewing. It's a sunny 2-bedroom place. Any questions?" },
    { id: "doctor", title: "Doktor Randevusu", desc: "Detaylı hastalık şikayetleri ve tavsiye", icon: Stethoscope, initialMessage: "Good morning. What brings you to the clinic today? When did these symptoms start?" },
    { id: "tech_support", title: "Müşteri Hizmetleri Şikayeti", desc: "Bozuk ürün iadesi ve garanti desteği", icon: HelpCircle, initialMessage: "TechSupport helpline, my name is Alex. How can I resolve your product issue today?" },
    { id: "travel_agency", title: "Seyahat & Tatil Planı", desc: "Tur programı ve bütçe planlama", icon: Compass, initialMessage: "Hello traveler! Where are you planning to go for your next vacation?" },
    { id: "bank", title: "Banka Hesabı Açma", desc: "Hesap türleri, kart başvurusu ve faiz", icon: Briefcase, initialMessage: "Welcome to Metro Bank. Are you looking to open a checking or savings account?" },
    { id: "university", title: "Üniversite Danışmanı", desc: "Ders seçimi ve staj planlama", icon: GraduationCap, initialMessage: "Come on in! Let's review your course credits and discuss your internship options." },
    { id: "meeting_colleague", title: "İş Arkadaşıyla Tanışma", desc: "İlk iş günü sohbeti ve ofis düzeni", icon: Users, initialMessage: "Hey! Welcome to the team! I'm Sarah from the design unit. How is your first day going?" }
  ],
  B2: [
    { id: "salary_negotiation", title: "Maaş & Terfi Pazarlığı", desc: "Performans sunumu ve zam talebi", icon: Handshake, initialMessage: "Thanks for meeting with me to discuss your annual performance review. How do you assess your progress?" },
    { id: "startup_pitch", title: "Startup & Yatırımcı Sunumu", desc: "İş modeli, pazar payı ve fonlama", icon: TrendingUp, initialMessage: "You have 5 minutes to pitch your product. What problem are you solving and what's your traction?" },
    { id: "crisis_management", title: "Kriz Yönetimi Toplantısı", desc: "Sistem çökmesi veya müşteri kaybı", icon: Flame, initialMessage: "Team, our main server went down for 2 hours today. What is our post-mortem and mitigation plan?" },
    { id: "academic_debate", title: "Akademik Tez Savunması", desc: "Araştırma metodolojisi ve veri analizi", icon: Award, initialMessage: "Candidate, please summarize the core methodology and primary hypothesis of your thesis." },
    { id: "remote_sprint", title: "Yazılım Sprint Planlama", desc: "Jira taskları, backlog ve timeline", icon: Laptop, initialMessage: "Alright team, let's look at the sprint backlog. What are our blockers for the upcoming release?" },
    { id: "marketing_strategy", title: "Pazarlama Stratejisi", desc: "Hedef kitle, bütçe ve büyüme", icon: Megaphone, initialMessage: "Our customer acquisition cost is rising. What changes should we make to our campaign funnels?" },
    { id: "supplier_deal", title: "Tedarikçi Sözleşmesi", desc: "İndirim oranları ve teslimat koşulları", icon: FileSpreadsheet, initialMessage: "We are reviewing your supply proposal, but the per-unit cost seems higher than market average." },
    { id: "cross_culture", title: "Uluslararası Ekip Yönetimi", desc: "Farklı saat dilimleri ve iletişim", icon: Globe2, initialMessage: "Managing teams across Tokyo, Berlin, and San Francisco is challenging. How do you align workflows?" }
  ],
  C1: [
    { id: "boardroom", title: "Yönetim Kurulu Müzakeresi", desc: "Şirket birleşmesi ve kurumsal riskler", icon: Gavel, initialMessage: "Members of the board, we are evaluating the proposed $50M acquisition. What is your strategic appraisal?" },
    { id: "ai_ethics", title: "Yapay Zeka Etiği Tartışması", desc: "Otonom kararlar ve telif hakları", icon: BrainCircuit, initialMessage: "Should generative AI models be granted fair-use exemptions, or do they infringe on moral intellectual property?" },
    { id: "sys_architecture", title: "Büyük Ölçekli Sistem Mimarisi", desc: "Mikroservisler, CAP teoremi ve sharding", icon: Cpu, initialMessage: "How would you design a fault-tolerant, globally distributed transactional database handling 100k writes/sec?" },
    { id: "legal_compliance", title: "Hukuk & Regülasyon Uyumu", desc: "GDPR, antitröst ve veri egemenliği", icon: Scale, initialMessage: "Counsel, assess our liability under the newest EU AI Act regarding high-risk algorithmic assessments." },
    { id: "venture_capital", title: "Risk Sermayesi Due-Diligence", desc: "Finansal tablolar ve risk modellemesi", icon: Layers, initialMessage: "We noticed inconsistent retention metrics in cohort 3. Walk me through your underlying churn dynamics." },
    { id: "cyber_breach", title: "Siber Güvenlik İhlal Krizi", desc: "Zero-day açığı ve kamuoyu açıklaması", icon: ShieldCheck, initialMessage: "A zero-day exploit compromised user tokens 30 minutes ago. What is our containment and public disclosure protocol?" },
    { id: "macro_economics", title: "Makroekonomik Politika", desc: "Enflasyon, faiz kararları ve resesyon", icon: Workflow, initialMessage: "With stubborn inflation and softening labor metrics, how should the central bank calibrate its terminal rate?" },
    { id: "product_vision", title: "10 Yıllık Ürün Vizyonu", desc: "Pazar dönüşümü ve paradigma değişimi", icon: Target, initialMessage: "Synthesize how spatial computing and ambient AI will fundamentally redefine human-computer interfaces by 2035." }
  ]
};

const FREE_TALK_SCENARIO: Scenario = {
  id: "free_talk",
  title: "✨ Serbest Sohbet (Free Talk)",
  desc: "İstediğin konuda sohbet et veya soru sor",
  icon: MessageSquare,
  initialMessage: "Hey! We can talk about anything you want today. What's on your mind?"
};

const NEXT_LEVEL_MAP: Record<string, string> = {
  A1: "A2",
  A2: "B1",
  B1: "B2",
  B2: "C1",
  C1: "C1 (Master)"
};

export default function Home() {
  const [currentUser, setCurrentUser] = useState<{ id: string; email: string; full_name: string } | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginName, setLoginName] = useState("");

  const [activeTab, setActiveTab] = useState<"chat" | "journal" | "practice" | "video" | "dictation">("chat");
  const [selectedLevel, setSelectedLevel] = useState<string>("A1");
  const [currentScenario, setCurrentScenario] = useState<Scenario>(LEVEL_SCENARIOS["A1"][0]);
  
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", content: LEVEL_SCENARIOS["A1"][0].initialMessage }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [corrections, setCorrections] = useState<Correction[]>([]);
  const [betterAlternative, setBetterAlternative] = useState<string>("");

  // Seviye İlerleme
  const [completedScenarios, setCompletedScenarios] = useState<Record<string, number>>({});
  const [totalCompleted, setTotalCompleted] = useState(0);
  const [avgLevelScore, setAvgLevelScore] = useState(0);

  // Günlük
  const [journalText, setJournalText] = useState("");
  const [journalLoading, setJournalLoading] = useState(false);
  const [journalResult, setJournalResult] = useState<any>(null);

  // Pratik
  const [practiceQuestions, setPracticeQuestions] = useState<any[]>([]);
  const [practiceLoading, setPracticeLoading] = useState(false);
  const [userPracticeAnswers, setUserPracticeAnswers] = useState<Record<number, string>>({});
  const [practiceFeedbacks, setPracticeFeedbacks] = useState<Record<number, any>>({});
  const [checkingQuestionId, setCheckingQuestionId] = useState<number | null>(null);

  // Video & Dinleme (Listening) & Kelime Sözlüğü
  const [currentVideo, setCurrentVideo] = useState<VideoLesson>(LEVEL_VIDEOS["A1"][0]);
  const [videoQuizQuestions, setVideoQuizQuestions] = useState<any[]>([]);
  const [videoQuizLoading, setVideoQuizLoading] = useState(false);
  const [userVideoAnswers, setUserVideoAnswers] = useState<Record<number, string>>({});
  const [videoQuizSubmitted, setVideoQuizSubmitted] = useState(false);
  const [videoQuizScore, setVideoQuizScore] = useState(0);
  const [selectedWordData, setSelectedWordData] = useState<any>(null);
  const [wordLookupLoading, setWordLookupLoading] = useState(false);

  // Sesli Dikte (Audio Dictation)
  const [dictationPrompts, setDictationPrompts] = useState<any[]>([]);
  const [activeDictationIdx, setActiveDictationIdx] = useState(0);
  const [dictationInput, setDictationInput] = useState("");
  const [dictationFeedback, setDictationFeedback] = useState<any>(null);
  const [dictationLoading, setDictationLoading] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Seviye Atlama Sınavı (Listening + Reading + Writing)
  const [showExamModal, setShowExamModal] = useState(false);
  const [examData, setExamData] = useState<any>(null);
  const [examStep, setExamStep] = useState<"listening" | "reading" | "writing">("listening");
  const [examListeningInput, setExamListeningInput] = useState("");
  const [examReadingInput, setExamReadingInput] = useState("");
  const [examWritingInput, setExamWritingInput] = useState("");
  const [examLoading, setExamLoading] = useState(false);
  const [examReport, setExamReport] = useState<any>(null);

  // Dashboard & Modallar
  const [showDashboard, setShowDashboard] = useState(false);
  const [mistakesList, setMistakesList] = useState<any[]>([]);
  const [mistakesStats, setMistakesStats] = useState<Record<string, number>>({});
  const [dailyTaskData, setDailyTaskData] = useState<any>(null);
  const [dashboardLoading, setDashboardLoading] = useState(false);
  const [emailStatus, setEmailStatus] = useState<string | null>(null);

  const [showReportModal, setShowReportModal] = useState(false);
  const [reportData, setReportData] = useState<any>(null);
  const [reportLoading, setReportLoading] = useState(false);

  const [showPlacementModal, setShowPlacementModal] = useState(false);
  const [placementQuestions, setPlacementQuestions] = useState<any[]>([]);
  const [placementAnswers, setPlacementAnswers] = useState<Record<number, string>>({});
  const [placementLoading, setPlacementLoading] = useState(false);
  const [placementResult, setPlacementResult] = useState<any>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("language_coach_user");
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    } else {
      setShowAuthModal(true);
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      fetchLevelProgress(selectedLevel);
    }
    if (activeTab === "practice") {
      fetchPracticeQuestions(selectedLevel);
    }
    if (activeTab === "video") {
      const firstVid = LEVEL_VIDEOS[selectedLevel]?.[0] || LEVEL_VIDEOS["A1"][0];
      setCurrentVideo(firstVid);
      fetchVideoQuiz(firstVid);
      setSelectedWordData(null);
    }
    if (activeTab === "dictation") {
      fetchDictationPrompts(selectedLevel);
    }
  }, [selectedLevel, currentUser, activeTab]);

  const playSpeechAudio = (text: string, rate: number = 0.9) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      alert("Tarayıcınız ses motorunu desteklemiyor.");
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = rate;
    setIsPlayingAudio(true);
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);
    window.speechSynthesis.speak(utterance);
  };

  const fetchDictationPrompts = async (lvl: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/dictation/prompts?level=${lvl}`);
      const data = await res.json();
      setDictationPrompts(data.prompts || []);
      setActiveDictationIdx(0);
      setDictationInput("");
      setDictationFeedback(null);
    } catch (err) {
      console.error("Dikte yüklenemedi:", err);
    }
  };

  const handleCheckDictation = async () => {
    const currentPrompt = dictationPrompts[activeDictationIdx];
    if (!currentPrompt || !dictationInput.trim()) return;

    setDictationLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/dictation/check`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          level: selectedLevel,
          original_text: currentPrompt.text,
          user_transcript: dictationInput.trim()
        })
      });
      const result = await res.json();
      setDictationFeedback(result);
    } catch (err) {
      console.error(err);
    } finally {
      setDictationLoading(false);
    }
  };

  const handleWordClick = async (word: string, sentence: string) => {
    const cleanWord = word.replace(/[.,/#!$%^&*;:{}=\-_`~()?"']/g, "").trim();
    if (!cleanWord) return;

    setWordLookupLoading(true);
    setSelectedWordData({ word: cleanWord, loading: true });

    try {
      const res = await fetch(`${API_BASE_URL}/api/video/lookup-word`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          word: cleanWord,
          sentence_context: sentence,
          level: selectedLevel
        })
      });
      const data = await res.json();
      setSelectedWordData(data);
    } catch (err) {
      console.error("Kelime sorgulama hatası:", err);
      setSelectedWordData(null);
    } finally {
      setWordLookupLoading(false);
    }
  };

  const startComprehensiveExam = async () => {
    setExamLoading(true);
    setShowExamModal(true);
    setExamStep("listening");
    setExamListeningInput("");
    setExamReadingInput("");
    setExamWritingInput("");
    setExamReport(null);

    try {
      const res = await fetch(`${API_BASE_URL}/api/level-up/comprehensive-exam?level=${selectedLevel}`);
      const data = await res.json();
      setExamData(data);
    } catch (err) {
      console.error("Sınav verisi çekilemedi:", err);
    } finally {
      setExamLoading(false);
    }
  };

  const handleEvaluateExam = async () => {
    if (!examData) return;
    setExamLoading(true);
    const uid = currentUser?.id || "demo_user";
    const targetLvl = NEXT_LEVEL_MAP[selectedLevel] || "A2";

    try {
      const res = await fetch(`${API_BASE_URL}/api/level-up/evaluate-comprehensive`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: uid,
          current_level: selectedLevel,
          target_level: targetLvl,
          listening_audio_text: examData.listening.text,
          user_listening_transcript: examListeningInput.trim(),
          reading_source_text: examData.reading.source_text,
          user_reading_translation: examReadingInput.trim(),
          writing_topic: examData.writing.topic,
          user_writing_essay: examWritingInput.trim()
        })
      });
      const report = await res.json();
      setExamReport(report);

      if (report.passed && targetLvl !== selectedLevel) {
        handleLevelChange(targetLvl);
      }
    } catch (err) {
      console.error("Sınav değerlendirme hatası:", err);
    } finally {
      setExamLoading(false);
    }
  };

  const fetchPracticeQuestions = async (lvl: string) => {
    setPracticeLoading(true);
    setUserPracticeAnswers({});
    setPracticeFeedbacks({});
    try {
      const res = await fetch(`${API_BASE_URL}/api/practice/questions?level=${lvl}`);
      const data = await res.json();
      setPracticeQuestions(data.questions || []);
    } catch (e) {
      console.error(e);
    } finally {
      setPracticeLoading(false);
    }
  };

  const fetchVideoQuiz = async (vid: VideoLesson) => {
  setVideoQuizLoading(true);
  setUserVideoAnswers({});
  setVideoQuizSubmitted(false);
  setVideoQuizScore(0);
  try {
    const rawTranscript = Array.isArray(vid.transcript) ? vid.transcript.join(" ") : "";
    const res = await fetch(`${API_BASE_URL}/api/video/quiz`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        video_id: vid.id,
        video_title: vid.title,
        video_topic: vid.topic,
        level: selectedLevel,
        transcript_text: rawTranscript
      })
    });
    
    if (!res.ok) {
      throw new Error(`Soru oluşturulamadı: ${res.status}`);
    }
    
    const data = await res.json();
    setVideoQuizQuestions(data.questions || []);
  } catch (err) {
    console.error("Video quiz hatası:", err);
  } finally {
    setVideoQuizLoading(false);
  }
};

  const handleSelectVideo = (vid: VideoLesson) => {
    setCurrentVideo(vid);
    fetchVideoQuiz(vid);
    setSelectedWordData(null);
  };

  const handleCheckVideoQuiz = () => {
    let scoreCount = 0;
    videoQuizQuestions.forEach((q) => {
      if (userVideoAnswers[q.id] === q.correct_answer) {
        scoreCount += 1;
      }
    });
    setVideoQuizScore(scoreCount);
    setVideoQuizSubmitted(true);
  };

  const handleCheckAnswer = async (q: any) => {
    const ans = userPracticeAnswers[q.id];
    if (!ans) return;

    setCheckingQuestionId(q.id);
    try {
      const res = await fetch(`${API_BASE_URL}/api/practice/check`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          level: selectedLevel,
          question_type: q.type,
          question: q.prompt,
          target_rule_or_phrase: q.correct_answer || q.expected_answer || "",
          user_answer: ans
        })
      });
      const result = await res.json();
      setPracticeFeedbacks((prev) => ({ ...prev, [q.id]: result }));
    } catch (e) {
      console.error(e);
    } finally {
      setCheckingQuestionId(null);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail.trim() || !loginName.trim()) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail.trim().toLowerCase(), full_name: loginName.trim() })
      });
      const data = await res.json();
      const userData = { id: data.id || data.email, email: data.email, full_name: data.full_name };
      setCurrentUser(userData);
      localStorage.setItem("language_coach_user", JSON.stringify(userData));
      setShowAuthModal(false);
      if (data.current_level) setSelectedLevel(data.current_level);
    } catch (err) {
      const fallback = { id: loginEmail, email: loginEmail, full_name: loginName };
      setCurrentUser(fallback);
      localStorage.setItem("language_coach_user", JSON.stringify(fallback));
      setShowAuthModal(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("language_coach_user");
    setCurrentUser(null);
    setShowAuthModal(true);
  };

  const fetchLevelProgress = async (lvl: string) => {
    const uid = currentUser?.id || "demo_user";
    try {
      const res = await fetch(`${API_BASE_URL}/api/level-progress?level=${lvl}&user_id=${uid}`);
      if (!res.ok) throw new Error("Ağ hatası");
      const data = await res.json();
      setCompletedScenarios(data.completed_scenarios || {});
      setTotalCompleted(data.total_completed || 0);
      setAvgLevelScore(data.avg_level_score || 0);
    } catch (e) {
      setCompletedScenarios({});
      setTotalCompleted(0);
      setAvgLevelScore(0);
    }
  };

  const handleLevelChange = (level: string) => {
    setSelectedLevel(level);
    const firstScen = LEVEL_SCENARIOS[level][0];
    setCurrentScenario(firstScen);
    setMessages([{ role: "ai", content: firstScen.initialMessage }]);
    setCorrections([]);
    setBetterAlternative("");
  };

  const handleScenarioChange = (scen: Scenario) => {
    setCurrentScenario(scen);
    setMessages([{ role: "ai", content: scen.initialMessage }]);
    setCorrections([]);
    setBetterAlternative("");
  };

  const handleResetChat = () => {
    setMessages([{ role: "ai", content: currentScenario.initialMessage }]);
    setCorrections([]);
    setBetterAlternative("");
  };

  const openDashboard = async () => {
    setShowDashboard(true);
    setDashboardLoading(true);
    setEmailStatus(null);
    const uid = currentUser?.id || "demo_user";
    try {
      const [mistakesRes, taskRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/mistakes?user_id=${uid}`),
        fetch(`${API_BASE_URL}/api/daily-task?user_id=${uid}`)
      ]);
      const mData = await mistakesRes.json();
      const tData = await taskRes.json();
      setMistakesList(mData.mistakes || []);
      setMistakesStats(mData.stats || {});
      setDailyTaskData(tData);
    } catch (e) {
      console.error(e);
    } finally {
      setDashboardLoading(false);
    }
  };

  const handleSendReportEmail = async () => {
    if (!currentUser?.email) return;
    setEmailStatus("Gönderiliyor...");
    try {
      const res = await fetch(`${API_BASE_URL}/api/email/send-report`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: currentUser.id, email: currentUser.email })
      });
      const data = await res.json();
      setEmailStatus(data.message || "Rapor e-postanıza iletildi!");
    } catch (e) {
      setEmailStatus("E-posta gönderilirken hata oluştu.");
    }
  };

  const handleEndSession = async () => {
    if (messages.length < 2) {
      alert("Rapor alabilmek için en az 1-2 mesajlaşmanız gerekir.");
      return;
    }
    setShowReportModal(true);
    setReportLoading(true);
    const uid = currentUser?.id || "demo_user";
    try {
      const res = await fetch(`${API_BASE_URL}/api/end-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: uid,
          scenario_id: currentScenario.id,
          scenario: currentScenario.title,
          level: selectedLevel,
          conversation_history: messages
        })
      });
      const data = await res.json();
      setReportData(data);
      fetchLevelProgress(selectedLevel);
    } catch (err) {
      console.error(err);
    } finally {
      setReportLoading(false);
    }
  };

  const handleAnalyzeJournal = async () => {
    if (!journalText.trim() || journalLoading) return;
    setJournalLoading(true);
    const uid = currentUser?.id || "demo_user";
    try {
      const res = await fetch(`${API_BASE_URL}/api/journal/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: uid,
          journal_text: journalText,
          level: selectedLevel
        })
      });
      const data = await res.json();
      setJournalResult(data);
    } catch (e) {
      console.error(e);
    } finally {
      setJournalLoading(false);
    }
  };

  const handleSend = async () => {
    if (!inputMessage.trim() || loading) return;

    const userText = inputMessage.trim();
    setInputMessage("");
    setMessages((prev) => [...prev, { role: "user", content: userText }]);
    setLoading(true);

    const uid = currentUser?.id || "demo_user";
    try {
      const res = await fetch(`${API_BASE_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: uid,
          scenario: `${currentScenario.title} - ${currentScenario.desc}`,
          user_message: userText,
          level: selectedLevel,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.detail || `Sunucu hatası: ${res.status}`);
      }

      const data = await res.json();
      const reply = data.ai_reply || "Yanıt alınamadı.";
      setMessages((prev) => [...prev, { role: "ai", content: reply }]);
      setCorrections(data.corrections || []);
      setBetterAlternative(data.better_alternative || "");
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: `Hata: ${err.message || "Sunucuya bağlanılamadı."}` },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const ScenarioIcon = currentScenario.icon;
  const progressPercent = Math.round((totalCompleted / 8) * 100);

  return (
    <div className="flex h-screen w-screen bg-[#070b19] text-slate-100 font-sans overflow-hidden">
      
      {/* SOL PANEL */}
      <div className="w-84 border-r border-slate-800/80 bg-[#0b112c]/60 backdrop-blur flex flex-col p-4 shrink-0 justify-between">
        <div className="flex flex-col overflow-hidden">
          {/* Logo */}
          <div className="flex items-center gap-3 px-2 py-3 mb-2 border-b border-slate-800/80">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Bot className="h-6 w-6 text-white"/>
            </div>
            <div>
              <h1 className="font-bold text-base leading-tight">AI Language Coach</h1>
              <p className="text-xs text-slate-400">Akıllı İngilizce Koçluk</p>
            </div>
          </div>

          {/* 5 Ana Sekme: Sohbet, Pratik, Dikte, Video, Günlük */}
          <div className="grid grid-cols-5 gap-1 p-1 bg-slate-900/90 rounded-xl border border-slate-800 mb-3">
            <button
              onClick={() => setActiveTab("chat")}
              className={`py-1.5 text-[9px] font-semibold rounded-lg flex flex-col items-center justify-center gap-0.5 transition-all ${
                activeTab === "chat" ? "bg-indigo-600 text-white shadow" : "text-slate-400 hover:text-white"
              }`}
            >
              <MessageSquare className="h-3 w-3"/> Sohbet
            </button>
            <button
              onClick={() => setActiveTab("practice")}
              className={`py-1.5 text-[9px] font-semibold rounded-lg flex flex-col items-center justify-center gap-0.5 transition-all ${
                activeTab === "practice" ? "bg-indigo-600 text-white shadow" : "text-slate-400 hover:text-white"
              }`}
            >
              <Dumbbell className="h-3 w-3"/> Pratik
            </button>
            <button
              onClick={() => {
                setActiveTab("dictation");
                fetchDictationPrompts(selectedLevel);
              }}
              className={`py-1.5 text-[9px] font-semibold rounded-lg flex flex-col items-center justify-center gap-0.5 transition-all ${
                activeTab === "dictation" ? "bg-indigo-600 text-white shadow" : "text-slate-400 hover:text-white"
              }`}
            >
              <Volume2 className="h-3 w-3"/> Dikte
            </button>
            <button
              onClick={() => setActiveTab("video")}
              className={`py-1.5 text-[9px] font-semibold rounded-lg flex flex-col items-center justify-center gap-0.5 transition-all ${
                activeTab === "video" ? "bg-indigo-600 text-white shadow" : "text-slate-400 hover:text-white"
              }`}
            >
              <PlaySquare className="h-3 w-3"/> Video
            </button>
            <button
              onClick={() => setActiveTab("journal")}
              className={`py-1.5 text-[9px] font-semibold rounded-lg flex flex-col items-center justify-center gap-0.5 transition-all ${
                activeTab === "journal" ? "bg-indigo-600 text-white shadow" : "text-slate-400 hover:text-white"
              }`}
            >
              <BookOpen className="h-3 w-3"/> Günlük
            </button>
          </div>

          {/* Aksiyon Butonları */}
          <div className="space-y-1.5 mb-2.5">
            <button 
              onClick={() => setShowPlacementModal(true)}
              className="w-full py-1.5 px-3 rounded-xl bg-slate-800/60 hover:bg-slate-700/60 text-indigo-300 border border-indigo-500/30 font-medium text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Sparkles className="h-3.5 w-3.5 text-indigo-400"/>
              Seviyemi Belirle (3 Soru)
            </button>
            <button 
              onClick={openDashboard}
              className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-medium text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
            >
              <BarChart3 className="h-4 w-4"/>
              Gelişim Raporum & Görevler
            </button>
          </div>

          {/* Seviye Seçimi */}
          <div className="mb-2">
            <div className="flex justify-between items-center mb-1 px-1">
              <span className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase">Seviye</span>
              <span className="text-[11px] text-indigo-400 font-medium">Ort: {avgLevelScore}/100</span>
            </div>
            <div className="grid grid-cols-5 gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
              {["A1", "A2", "B1", "B2", "C1"].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => handleLevelChange(lvl)}
                  className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
                    selectedLevel === lvl
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/40"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* İlerleme Çubuğu & Seviye Bitirme Sınavı Alanı */}
          <div className="mb-2 p-2 rounded-xl bg-slate-900/70 border border-slate-800/80">
            <div className="flex justify-between items-center text-[10px] mb-1">
              <span className="text-slate-300 font-medium">{selectedLevel} Müfredatı</span>
              <span className="text-emerald-400 font-bold">{totalCompleted}/8 Konu (%{progressPercent})</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            {totalCompleted >= 8 && (
              <div className="mt-2 space-y-1.5">
                <div className="text-[10px] text-emerald-400 flex items-center gap-1 font-semibold">
                  <PartyPopper className="h-3 w-3"/> Tüm Senaryolar Tamamlandı!
                </div>
                <button
                  onClick={startComprehensiveExam}
                  className="w-full py-2 px-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
                >
                  <Award className="h-4 w-4"/>
                  {selectedLevel} ➔ {NEXT_LEVEL_MAP[selectedLevel]} Atlama Sınavı
                </button>
              </div>
            )}
          </div>

          {/* Serbest Sohbet Butonu */}
          <button
            onClick={() => {
              setActiveTab("chat");
              handleScenarioChange(FREE_TALK_SCENARIO);
            }}
            className={`w-full p-2 rounded-xl mb-1.5 text-left transition-all border flex items-center gap-2 ${
              currentScenario.id === "free_talk" && activeTab === "chat"
                ? "bg-indigo-950/80 border-indigo-400 shadow-md"
                : "bg-indigo-950/20 border-indigo-500/30 hover:bg-indigo-900/30"
            }`}
          >
            <div className="p-1.5 rounded-lg bg-indigo-600 text-white shrink-0">
              <MessageSquare className="h-3.5 w-3.5"/>
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-bold text-indigo-300">{FREE_TALK_SCENARIO.title}</div>
              <div className="text-[10px] text-slate-400 truncate">{FREE_TALK_SCENARIO.desc}</div>
            </div>
          </button>

          {/* 8 Konu Listesi */}
          <div className="flex-1 overflow-y-auto space-y-1 pr-1 custom-scrollbar max-h-[30vh]">
            {LEVEL_SCENARIOS[selectedLevel]?.map((scen) => {
              const Icon = scen.icon;
              const isSelected = currentScenario.id === scen.id && activeTab === "chat";
              const score = completedScenarios[scen.id];
              const isPassed = score !== undefined;

              return (
                <button
                  key={scen.id}
                  onClick={() => {
                    setActiveTab("chat");
                    handleScenarioChange(scen);
                  }}
                  className={`w-full p-2 rounded-xl text-left transition-all border flex items-start gap-2 ${
                    isSelected
                      ? "bg-indigo-950/60 border-indigo-500/50 shadow-sm"
                      : "bg-slate-900/40 border-slate-800/40 hover:bg-slate-800/40 hover:border-slate-700/60"
                  }`}
                >
                  <div className={`p-1.5 rounded-lg shrink-0 mt-0.5 relative ${isSelected ? "bg-indigo-600 text-white" : "bg-slate-800 text-slate-400"}`}>
                    <Icon className="h-3.5 w-3.5"/>
                    {isPassed && (
                      <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-emerald-500 flex items-center justify-center">
                        <Check className="h-2 w-2 text-white"/>
                      </span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-semibold truncate ${isSelected ? "text-white" : "text-slate-200"}`}>
                        {scen.title}
                      </span>
                      {isPassed && (
                        <span className="text-[10px] px-1 py-0.2 rounded bg-emerald-950/80 text-emerald-400 font-bold border border-emerald-500/30">
                          {score}p
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Profil Çubuğu */}
        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between mt-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="h-8 w-8 rounded-full bg-indigo-600/30 border border-indigo-500/50 flex items-center justify-center text-indigo-300 font-bold text-xs shrink-0">
              {currentUser?.full_name ? currentUser.full_name[0].toUpperCase() : "U"}
            </div>
            <div className="min-w-0">
              <div className="text-xs font-semibold text-white truncate">{currentUser?.full_name || "Giriş Yapılmadı"}</div>
              <div className="text-[10px] text-slate-400 truncate">{currentUser?.email || "Hesap Bağla"}</div>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            title="Profil Değiştir / Çıkış Yap"
            className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition-all cursor-pointer"
          >
            <LogOut className="h-4 w-4"/>
          </button>
        </div>
      </div>

      {/* ORTA PANEL */}
      <div className="flex-1 flex flex-col bg-[#070b19] border-r border-slate-800/80">
        
        {/* 1. SOHBET MODU */}
        {activeTab === "chat" && (
          <>
            <div className="h-16 border-b border-slate-800/80 flex items-center justify-between px-6 bg-[#0b112c]/40 backdrop-blur">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                  <ScenarioIcon className="h-5 w-5"/>
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-white">{currentScenario.title}</h2>
                  <p className="text-xs text-slate-400">{currentScenario.desc} • Seviye: {selectedLevel}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={handleEndSession}
                  className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 px-3 py-1.5 rounded-lg border border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20 transition-all cursor-pointer"
                >
                  <Flag className="h-3.5 w-3.5"/>
                  Sohbeti Bitir & Rapor Al
                </button>
                <button
                  onClick={handleResetChat}
                  className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded-lg border border-slate-800 hover:bg-slate-800/60 transition-all cursor-pointer"
                >
                  <RotateCcw className="h-3.5 w-3.5"/>
                  Sıfırla
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex items-start gap-3 max-w-[80%] ${
                    m.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                  }`}
                >
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 text-white ${
                      m.role === "user" ? "bg-indigo-600" : "bg-slate-800 border border-slate-700"
                    }`}
                  >
                    {m.role === "user" ? <User className="h-4 w-4"/> : <Bot className="h-4 w-4"/>}
                  </div>
                  <div
                    className={`p-3.5 rounded-2xl text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-indigo-600 text-white rounded-tr-none shadow-md shadow-indigo-600/10"
                        : "bg-slate-900/90 border border-slate-800 text-slate-200 rounded-tl-none"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400">
                    <Bot className="h-4 w-4"/>
                  </div>
                  <div className="bg-slate-900/90 border border-slate-800 text-slate-400 text-xs px-4 py-3 rounded-2xl rounded-tl-none flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-indigo-500 animate-ping"></span>
                    Koç düşünüyor...
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-slate-800/80 bg-[#0b112c]/40">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2 max-w-4xl mx-auto"
              >
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="İngilizce yanıt ver veya Türkçe soru sor..."
                  className="flex-1 bg-slate-900/90 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  disabled={loading || !inputMessage.trim()}
                  className="h-11 w-11 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white flex items-center justify-center transition-all shadow-lg shadow-indigo-600/20 cursor-pointer"
                >
                  <Send className="h-4 w-4"/>
                </button>
              </form>
            </div>
          </>
        )}

        {/* 2. PRATİK / ALIŞTIRMA MODU */}
        {activeTab === "practice" && (
          <div className="flex-1 flex flex-col p-6 overflow-y-auto custom-scrollbar space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Dumbbell className="h-5 w-5 text-indigo-400"/>
                  {selectedLevel} Seviyesi Mikro Alıştırmalar
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Boşluk doldurma ve cümle çevirme pratikleriyle gramer ve kelime reflekslerini geliştir.
                </p>
              </div>
              <button
                onClick={() => fetchPracticeQuestions(selectedLevel)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-indigo-300 font-medium flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5"/> Yeni Sorular Getir
              </button>
            </div>

            {practiceLoading ? (
              <div className="py-20 text-center text-xs text-slate-400 flex flex-col items-center gap-2">
                <span className="h-6 w-6 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin"></span>
                {selectedLevel} seviyesine uygun dinamik sorular hazırlanıyor...
              </div>
            ) : (
              <div className="space-y-4">
                {practiceQuestions.map((q, idx) => {
                  const fb = practiceFeedbacks[q.id];
                  const isChecking = checkingQuestionId === q.id;

                  return (
                    <div key={q.id} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                          {q.type === "fill_blank" ? "Boşluk Doldurma" : "Cümle Çevirisi"}
                        </span>
                        <span className="text-xs text-slate-500">Soru {idx + 1}/4</span>
                      </div>

                      <div className="text-sm font-semibold text-white">
                        {q.prompt}
                      </div>

                      {q.type === "fill_blank" && q.options && (
                        <div className="grid grid-cols-2 gap-2 pt-1">
                          {q.options.map((opt: string) => {
                            const isSelected = userPracticeAnswers[q.id] === opt;
                            return (
                              <button
                                key={opt}
                                onClick={() => setUserPracticeAnswers({ ...userPracticeAnswers, [q.id]: opt })}
                                className={`py-2 px-3 rounded-lg text-xs font-medium text-left border transition-all cursor-pointer ${
                                  isSelected
                                    ? "bg-indigo-600/30 border-indigo-400 text-indigo-200"
                                    : "bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700"
                                }`}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {q.type === "translate" && (
                        <div className="pt-1">
                          <input
                            type="text"
                            placeholder="İngilizce çevirisini buraya yazın..."
                            value={userPracticeAnswers[q.id] || ""}
                            onChange={(e) => setUserPracticeAnswers({ ...userPracticeAnswers, [q.id]: e.target.value })}
                            className="w-full bg-slate-950/80 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                          />
                          {q.hint && <div className="text-[10px] text-slate-500 mt-1 italic">İpucu: {q.hint}</div>}
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-2">
                        <button
                          onClick={() => handleCheckAnswer(q)}
                          disabled={!userPracticeAnswers[q.id] || isChecking}
                          className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-xs font-semibold text-white transition-all cursor-pointer"
                        >
                          {isChecking ? "Kontrol Ediliyor..." : "Cevabı Kontrol Et"}
                        </button>
                      </div>

                      {fb && (
                        <div className={`p-3 rounded-lg border text-xs mt-2 ${
                          fb.is_correct ? "bg-emerald-950/30 border-emerald-500/40 text-emerald-200" : "bg-rose-950/30 border-rose-500/40 text-rose-200"
                        }`}>
                          <div className="font-bold flex items-center gap-1.5 mb-1">
                            {fb.is_correct ? <CheckCircle2 className="h-4 w-4 text-emerald-400"/> : <AlertCircle className="h-4 w-4 text-rose-400"/>}
                            {fb.is_correct ? "Harika, Doğru Cevap!" : "Küçük Bir Hata Var"}
                          </div>
                          <div>{fb.feedback}</div>
                          {fb.ideal_sentence && (
                            <div className="text-[11px] text-slate-300 mt-1 italic font-mono">
                              Doğru Kalıp: "{fb.ideal_sentence}"
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* 3. SESLİ DİKTE (AUDIO DICTATION) SERBEST PRATİK MODU */}
        {activeTab === "dictation" && dictationPrompts.length > 0 && (
          <div className="flex-1 flex flex-col p-6 overflow-y-auto custom-scrollbar space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Volume2 className="h-5 w-5 text-indigo-400"/>
                  {selectedLevel} Seviyesi Dinle & Yaz (Audio Dictation)
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Sesi dinle, anladığın cümleyi yaz ve harf-kelime bazlı AI analizini al.
                </p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300">
                Cümle {activeDictationIdx + 1} / {dictationPrompts.length}
              </span>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 text-center space-y-4">
              <div className="text-xs font-semibold text-slate-400">
                Kategori: <span className="text-indigo-300">{dictationPrompts[activeDictationIdx].category}</span>
              </div>

              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => playSpeechAudio(dictationPrompts[activeDictationIdx].text, 0.95)}
                  disabled={isPlayingAudio}
                  className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/30 cursor-pointer transition-all"
                >
                  <Play className="h-4 w-4 fill-white"/> Normal Hızda Dinle
                </button>

                <button
                  onClick={() => playSpeechAudio(dictationPrompts[activeDictationIdx].text, 0.7)}
                  disabled={isPlayingAudio}
                  className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-200 text-xs font-medium flex items-center gap-2 border border-slate-700 cursor-pointer transition-all"
                >
                  <RotateCcw className="h-3.5 w-3.5"/> Yavaş Dinle (0.7x)
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-semibold text-slate-300 block">Duyduğun Cümleyi Buraya Yaz:</label>
              <textarea
                rows={3}
                value={dictationInput}
                onChange={(e) => setDictationInput(e.target.value)}
                placeholder="Type what you hear..."
                className="w-full bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />

              <div className="flex items-center justify-between">
                <button
                  onClick={handleCheckDictation}
                  disabled={dictationLoading || !dictationInput.trim()}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-semibold cursor-pointer shadow-lg shadow-emerald-600/20"
                >
                  {dictationLoading ? "Analiz Ediliyor..." : "Dikteyi Kontrol Et"}
                </button>

                {activeDictationIdx < dictationPrompts.length - 1 && (
                  <button
                    onClick={() => {
                      setActiveDictationIdx((prev) => prev + 1);
                      setDictationInput("");
                      setDictationFeedback(null);
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-indigo-300 cursor-pointer"
                  >
                    Sonraki Cümle ➔
                  </button>
                )}
              </div>
            </div>

            {dictationFeedback && (
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">Dinleme & Yazım Doğruluk Skoru</span>
                  <span className="text-sm font-black text-emerald-400">%{dictationFeedback.accuracy_score}</span>
                </div>
                
                <p className="text-xs text-slate-300">{dictationFeedback.feedback}</p>

                <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-xs space-y-1 font-mono">
                  <div className="text-slate-400 text-[11px]">Hedef Cümle:</div>
                  <div className="text-emerald-300">{dictationPrompts[activeDictationIdx].text}</div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 4. VİDEO & İNTERAKTİF DİNLEME (LISTENING) MODU */}
        {activeTab === "video" && (
          <div className="flex-1 flex flex-col p-6 overflow-y-auto custom-scrollbar space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <PlaySquare className="h-5 w-5 text-indigo-400"/>
                  {selectedLevel} İnteraktif Dinleme & Kelime Keşfi
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Videoyu izle, altyazıdaki herhangi bir <b>kelimeye tıklayarak</b> anında Türkçe anlamını ve kullanımını gör.
                </p>
              </div>
            </div>

            {/* Video Seçim Kartları */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {LEVEL_VIDEOS[selectedLevel]?.map((vid, idx) => {
                const isActive = currentVideo.id === vid.id;
                return (
                  <button
                    key={vid.id}
                    onClick={() => handleSelectVideo(vid)}
                    className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                      isActive 
                        ? "bg-indigo-950/80 border-indigo-400 shadow-md" 
                        : "bg-slate-900/50 border-slate-800 hover:bg-slate-800/50 text-slate-300"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300">
                        Ders {idx + 1}
                      </span>
                      <span className="text-[10px] text-slate-400">{vid.duration}</span>
                    </div>
                    <div className="text-xs font-semibold text-white truncate">{vid.title}</div>
                    <div className="text-[10px] text-slate-400 truncate mt-0.5">{vid.topic}</div>
                  </button>
                );
              })}
            </div>

            {/* YouTube Video Oynatıcı & İnteraktif Altyazı Düzeni */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              
              <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-red-600 text-white">
                      <Play className="h-3.5 w-3.5 fill-white"/>
                    </div>
                    <span className="text-sm font-bold text-white">{currentVideo.title}</span>
                  </div>
                  <span className="text-xs text-indigo-300 font-medium">{currentVideo.topic}</span>
                </div>

                <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-slate-800 bg-black">
  <iframe
    key={currentVideo.youtubeId}
    className="w-full h-full"
    src={"https://www.youtube.com/embed/" + currentVideo.youtubeId + "?rel=0&modestbranding=1"}
    title={currentVideo.title}
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  />
</div>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800">
                    <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                      <BookOpen className="h-3.5 w-3.5 text-indigo-400"/>
                      Tıklanabilir Altyazı
                    </span>
                    <span className="text-[10px] text-slate-400">Kelimeye Tıkla 👆</span>
                  </div>

                  <div className="space-y-2.5 max-h-[220px] overflow-y-auto custom-scrollbar pr-1">
                    {currentVideo.transcript?.map((sentence, sIdx) => (
                      <div key={sIdx} className="p-2 rounded-lg bg-slate-950/60 border border-slate-800/80 text-xs leading-relaxed">
                        {sentence.split(" ").map((word, wIdx) => (
                          <span
                            key={wIdx}
                            onClick={() => handleWordClick(word, sentence)}
                            className="inline-block cursor-pointer px-1 py-0.5 rounded hover:bg-indigo-600 hover:text-white transition-all text-slate-200"
                          >
                            {word}
                          </span>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                {selectedWordData && (
                  <div className="mt-3 p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/40 text-xs space-y-1 relative">
                    <button
                      onClick={() => setSelectedWordData(null)}
                      className="absolute top-2 right-2 text-slate-400 hover:text-white"
                    >
                      <X className="h-3.5 w-3.5"/>
                    </button>

                    {wordLookupLoading ? (
                      <div className="py-2 text-center text-[11px] text-indigo-300 flex items-center justify-center gap-1.5">
                        <span className="h-3 w-3 rounded-full border border-indigo-400 border-t-transparent animate-spin"></span>
                        Kelime anlamı getiriliyor...
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-sm">{selectedWordData.word}</span>
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-500/30 text-indigo-300">
                            {selectedWordData.part_of_speech}
                          </span>
                        </div>
                        <div className="text-emerald-400 font-semibold">{selectedWordData.turkish_meaning}</div>
                        {selectedWordData.simple_example && (
                          <div className="text-[10px] text-slate-300 italic pt-1 border-t border-indigo-500/20">
                            Örnek: "{selectedWordData.simple_example}"
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>

            </div>

            {/* Video Dinleme Quiz Bölümü */}
            <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-amber-400"/>
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Video Dinleme & Anlama Testi (3 Soru)
                  </span>
                </div>
                {videoQuizSubmitted && (
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400">
                    Skor: {videoQuizScore} / {videoQuizQuestions.length} Doğru
                  </span>
                )}
              </div>

              {videoQuizLoading ? (
                <div className="py-12 text-center text-xs text-slate-400 flex flex-col items-center gap-2">
                  <span className="h-6 w-6 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin"></span>
                  Yapay zeka videoya özel anlama sorularını hazırlıyor...
                </div>
              ) : (
                <div className="space-y-4">
                  {videoQuizQuestions.map((q, qIndex) => {
                    const isCorrect = userVideoAnswers[q.id] === q.correct_answer;

                    return (
                      <div key={q.id} className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2.5">
                        <div className="text-xs font-semibold text-white">
                          <span className="text-indigo-400 mr-1.5">{qIndex + 1}.</span>
                          {q.question}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {q.options?.map((opt: string) => {
                            const isSelected = userVideoAnswers[q.id] === opt;
                            let btnStyle = "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700";

                            if (isSelected) {
                              btnStyle = "bg-indigo-600/30 border-indigo-500 text-white font-medium";
                            }
                            if (videoQuizSubmitted) {
                              if (opt === q.correct_answer) {
                                btnStyle = "bg-emerald-950/60 border-emerald-500 text-emerald-200 font-bold";
                              } else if (isSelected && !isCorrect) {
                                btnStyle = "bg-rose-950/60 border-rose-500 text-rose-300 line-through";
                              }
                            }

                            return (
                              <button
                                key={opt}
                                disabled={videoQuizSubmitted}
                                onClick={() => setUserVideoAnswers({ ...userVideoAnswers, [q.id]: opt })}
                                className={`p-2 rounded-lg text-xs text-left border transition-all cursor-pointer ${btnStyle}`}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>

                        {videoQuizSubmitted && (
                          <div className={`p-2 rounded-lg text-[11px] ${isCorrect ? "bg-emerald-950/30 text-emerald-300" : "bg-rose-950/30 text-rose-300"}`}>
                            {isCorrect ? "✓ Doğru!" : `✗ Yanlış. Doğru cevap: ${q.correct_answer}`}
                            <div className="text-slate-400 mt-0.5">{q.explanation}</div>
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {!videoQuizSubmitted && videoQuizQuestions.length > 0 && (
                    <button
                      onClick={handleCheckVideoQuiz}
                      disabled={Object.keys(userVideoAnswers).length < videoQuizQuestions.length}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-40 font-semibold text-xs text-white shadow-lg shadow-emerald-600/20 cursor-pointer transition-all"
                    >
                      Cevapları Kontrol Et ve Puanla
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* 5. GÜNLÜK MODU */}
        {activeTab === "journal" && (
          <div className="flex-1 flex flex-col p-6 overflow-y-auto custom-scrollbar space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-indigo-400"/>
                  AI Daily Journal (İngilizce Günlük)
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Günün nasıl geçtiğini serbestçe İngilizce yaz. Yapay zeka gramerini düzeltsin ve ana dili gibi yeniden kaleme alsın.
                </p>
              </div>
            </div>

            <textarea
              rows={6}
              value={journalText}
              onChange={(e) => setJournalText(e.target.value)}
              placeholder="Today was a productive day. I worked on my software project and read documentation..."
              className="w-full bg-slate-900/90 border border-slate-800 rounded-xl p-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />

            <button
              onClick={handleAnalyzeJournal}
              disabled={journalLoading || !journalText.trim()}
              className="w-fit px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-semibold flex items-center gap-2 cursor-pointer shadow-lg shadow-indigo-600/30"
            >
              {journalLoading ? "Analiz Ediliyor..." : "Günlüğü Analiz Et & Geliştir"}
              <Sparkles className="h-4 w-4"/>
            </button>

            {journalResult && (
              <div className="mt-4 space-y-4">
                <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30">
                  <div className="text-xs font-bold text-emerald-400 mb-1 flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4"/> Doğal Versiyon (Native Rewrite)
                  </div>
                  <p className="text-xs text-emerald-100 leading-relaxed italic">
                    "{journalResult.native_rewrite}"
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="text-xs font-bold text-indigo-400 mb-1">Koçun Değerlendirmesi</div>
                  <p className="text-xs text-slate-300 leading-relaxed">{journalResult.feedback_notes}</p>
                </div>
              </div>
            )}
          </div>
        )}

      </div>

      {/* SAĞ PANEL */}
      <div className="w-88 border-l border-slate-800/80 bg-[#0b112c]/50 backdrop-blur flex flex-col p-5 shrink-0 overflow-y-auto custom-scrollbar">
        <div className="flex items-center gap-2 pb-4 mb-4 border-b border-slate-800/80">
          <Sparkles className="h-5 w-5 text-amber-400"/>
          <h3 className="font-semibold text-sm text-white">AI Koç Canlı Geri Bildirimi</h3>
        </div>

        {corrections.length === 0 && !betterAlternative && (
          <div className="flex-1 flex flex-col items-center justify-center text-center text-slate-500 px-4">
            <div className="h-12 w-12 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-center mb-3">
              <Bot className="h-6 w-6 text-slate-600"/>
            </div>
            <p className="text-xs font-medium text-slate-400">Koç hazır</p>
            <p className="text-[11px] text-slate-500 mt-1">
              İngilizce konuşurken dilbilgisi düzeltmeleri, Türkçe soru sorduğunda pratik kalıplar burada listelenir.
            </p>
          </div>
        )}

        {betterAlternative && (
          <div className="mb-4 p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold mb-2">
              <CheckCircle2 className="h-4 w-4"/>
              Doğal / İleri Seviye Alternatif
            </div>
            <p className="text-xs text-emerald-100 font-medium leading-relaxed italic">
              "{betterAlternative}"
            </p>
          </div>
        )}

        {corrections.length > 0 && (
          <div className="space-y-3">
            <div className="text-xs font-semibold text-rose-400 flex items-center gap-1.5">
              <AlertCircle className="h-4 w-4"/>
              Tespit Edilen Düzeltmeler
            </div>
            {corrections.map((corr, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                  {corr.error_type}
                </span>
                <div className="text-xs">
                  <div className="text-slate-400 line-through">{corr.original}</div>
                  <div className="text-indigo-300 font-medium mt-0.5">➔ {corr.suggested}</div>
                </div>
                <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-800/80 leading-relaxed">
                  {corr.explanation}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* GİRİŞ MODALI */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0b112c] border border-slate-800 w-full max-w-md rounded-2xl shadow-2xl p-6 text-center">
            <div className="h-12 w-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center mx-auto mb-3 text-indigo-400">
              <Mail className="h-6 w-6"/>
            </div>
            <h3 className="text-lg font-bold text-white">AI Language Coach'a Hoş Geldiniz!</h3>
            <p className="text-xs text-slate-400 mt-1 mb-6">
              İlerlemenizi kaydetmek ve haftalık gelişim hatırlatıcıları almak için profilinizi oluşturun.
            </p>

            <form onSubmit={handleLogin} className="space-y-3 text-left">
              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">Adınız / Takma Ad</label>
                <input
                  type="text"
                  required
                  placeholder="örn: İrem"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                  value={loginName}
                  onChange={(e) => setLoginName(e.target.value)}
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">E-posta Adresiniz</label>
                <input
                  type="email"
                  required
                  placeholder="örn: irem@example.com"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-semibold text-xs text-white mt-4 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
              >
                Giriş Yap & Başla
              </button>
            </form>
          </div>
        </div>
      )}

      {/* GELİŞİM DASHBOARD & E-POSTA MODALI */}
      {showDashboard && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0b112c] border border-slate-800 w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden">
            <div className="p-5 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <BarChart3 className="h-5 w-5 text-indigo-400"/>
                <h3 className="font-semibold text-base text-white">Gelişim Dashboard & AI Görevler</h3>
              </div>
              <button
                onClick={() => setShowDashboard(false)}
                className="h-8 w-8 rounded-lg bg-slate-800/60 hover:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="h-4 w-4"/>
              </button>
            </div>

            <div className="p-5 overflow-y-auto flex-1 custom-scrollbar space-y-6">
              {dashboardLoading ? (
                <div className="py-12 text-center text-xs text-slate-400">Veriler yükleniyor...</div>
              ) : (
                <>
                  <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                        <Mail className="h-4 w-4"/> Haftalık Koç Raporu & Hatırlatma
                      </div>
                      <p className="text-[11px] text-slate-300 mt-0.5">
                        Tüm hatalarını ve seviye karneni <span className="text-emerald-300 font-semibold">{currentUser?.email}</span> adresine gönder.
                      </p>
                    </div>
                    <button
                      onClick={handleSendReportEmail}
                      className="px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-all shadow-md cursor-pointer shrink-0 ml-3"
                    >
                      E-postama Gönder
                    </button>
                  </div>
                  {emailStatus && (
                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-indigo-300 text-center font-medium">
                      {emailStatus}
                    </div>
                  )}

                  {dailyTaskData && (
                    <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-950/40 to-purple-950/40 border border-indigo-500/30">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs">
                          <ListTodo className="h-4 w-4"/>
                          Günün AI Pratik Görevleri
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                          Odak: {dailyTaskData.focus_area}
                        </span>
                      </div>
                      
                      <div className="space-y-2 mt-2">
                        {dailyTaskData.tasks?.map((t: any) => (
                          <div key={t.id} className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800/80 text-xs">
                            <div className="font-semibold text-white">{t.title}</div>
                            <div className="text-slate-400 text-[11px] mt-0.5">{t.instruction}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Hata Dağılım İstatistikleri</h4>
                    {Object.keys(mistakesStats).length === 0 ? (
                      <p className="text-xs text-slate-500">Henüz kayıtlı bir hata bulunmuyor.</p>
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        {Object.entries(mistakesStats).map(([type, count]) => (
                          <div key={type} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
                            <div className="text-[11px] text-slate-400 truncate">{type}</div>
                            <div className="text-lg font-bold text-indigo-400 mt-1">{count} Kez</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* SOHBET RAPOR KARNESİ MODALI */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0b112c] border border-slate-800 w-full max-w-lg rounded-2xl shadow-2xl p-6">
            <div className="flex justify-between items-center pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-emerald-400"/>
                <h3 className="font-bold text-base text-white">Sohbet Değerlendirme Karnesi</h3>
              </div>
              <button onClick={() => setShowReportModal(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="h-5 w-5"/>
              </button>
            </div>

            {reportLoading ? (
              <div className="py-12 text-center text-xs text-slate-400 flex flex-col items-center gap-2">
                <span className="h-6 w-6 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin"></span>
                Diyalog analiz ediliyor...
              </div>
            ) : reportData && (
              <div className="space-y-4 mt-4 text-xs">
                <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-center">
                  <div className="text-[10px] text-emerald-400 uppercase font-semibold">Bu Konudan Alınan Puan</div>
                  <div className="text-2xl font-black text-white">{reportData.average_score}/100</div>
                  <div className="text-[11px] text-emerald-300 mt-0.5">
                    {reportData.passed ? "✓ Konu Başarıyla Tamamlandı!" : "Daha yüksek puan için tekrar deneyebilirsiniz."}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="p-2.5 rounded-xl bg-indigo-950/40 border border-indigo-500/20 text-center">
                    <div className="text-[10px] text-slate-400">Akıcılık</div>
                    <div className="text-lg font-bold text-indigo-400 mt-0.5">{reportData.fluency_score}/100</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-violet-950/40 border border-violet-500/20 text-center">
                    <div className="text-[10px] text-slate-400">Kelime Haznesi</div>
                    <div className="text-lg font-bold text-violet-400 mt-0.5">{reportData.vocabulary_score}/100</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/20 text-center">
                    <div className="text-[10px] text-slate-400">Gramer</div>
                    <div className="text-lg font-bold text-emerald-400 mt-0.5">{reportData.grammar_score}/100</div>
                  </div>
                </div>

                <button
                  onClick={() => setShowReportModal(false)}
                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-semibold text-white cursor-pointer"
                >
                  Tamamla ve Seviyeme Kaydet
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3 SORULUK SEVİYE TESPİT TESTİ MODALI */}
      {showPlacementModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0b112c] border border-slate-800 w-full max-w-xl rounded-2xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden">
            <div className="p-5 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Sparkles className="h-5 w-5 text-indigo-400"/>
                <h3 className="font-semibold text-base text-white">3 Soruluk Mini Seviye Belirleme</h3>
              </div>
              <button 
                onClick={() => setShowPlacementModal(false)}
                className="h-8 w-8 rounded-lg bg-slate-800/60 hover:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="h-4 w-4"/>
              </button>
            </div>

            <div className="p-5 overflow-y-auto flex-1 custom-scrollbar space-y-4">
              {placementLoading ? (
                <div className="py-16 text-center text-xs text-slate-400 flex flex-col items-center gap-3">
                  <span className="h-6 w-6 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin"></span>
                  AI cevaplarınızı inceliyor ve seviyenizi analiz ediyor...
                </div>
              ) : placementResult ? (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-center">
                    <div className="text-xs text-indigo-300 uppercase font-semibold">Tavsiye Edilen Seviye</div>
                    <div className="text-3xl font-extrabold text-white mt-1">{placementResult.recommended_level}</div>
                    <p className="text-xs text-slate-300 mt-2">{placementResult.summary}</p>
                  </div>
                  
                  <button
                    onClick={() => setShowPlacementModal(false)}
                    className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-semibold text-xs text-white cursor-pointer"
                  >
                    Seviyemi Uygula ve Başla
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {placementQuestions.length === 0 ? (
                    <button
                      onClick={async () => {
                        setPlacementLoading(true);
                        try {
                          const res = await fetch(`${API_BASE_URL}/api/placement-questions`);
                          const d = await res.json();
                          setPlacementQuestions(d.questions || []);
                        } finally {
                          setPlacementLoading(false);
                        }
                      }}
                      className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs cursor-pointer"
                    >
                      Soruları Getir
                    </button>
                  ) : (
                    <>
                      {placementQuestions.map((q) => (
                        <div key={q.id} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                          <label className="text-xs font-semibold text-indigo-300 block">
                            Soru {q.id}: <span className="text-slate-200 font-normal">{q.question}</span>
                          </label>
                          <textarea
                            rows={2}
                            placeholder="İngilizce yanıtınızı buraya yazın..."
                            className="w-full bg-slate-950/70 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                            value={placementAnswers[q.id] || ""}
                            onChange={(e) => setPlacementAnswers({ ...placementAnswers, [q.id]: e.target.value })}
                          />
                        </div>
                      ))}

                      <button
                        onClick={async () => {
                          setPlacementLoading(true);
                          try {
                            const formatted = placementQuestions.map((q) => ({
                              question: q.question,
                              answer: placementAnswers[q.id] || ""
                            }));
                            const res = await fetch(`${API_BASE_URL}/api/evaluate-placement`, {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({ user_id: currentUser?.id || "demo_user", answers: formatted })
                            });
                            const r = await res.json();
                            setPlacementResult(r);
                            if (r.recommended_level) handleLevelChange(r.recommended_level);
                          } finally {
                            setPlacementLoading(false);
                          }
                        }}
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 font-semibold text-xs text-white shadow-lg shadow-indigo-600/30 cursor-pointer"
                      >
                        Testi Tamamla ve Seviyemi Belirle
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 3 AŞAMALI KAPSAMLI SEVİYE ATLAMA SINAVI MODALI */}
      {showExamModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0b112c] border border-slate-800 w-full max-w-xl rounded-2xl shadow-2xl p-6 flex flex-col max-h-[90vh] overflow-hidden">
            
            <div className="flex justify-between items-center pb-3 border-b border-slate-800 mb-4 shrink-0">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-amber-400"/>
                <h3 className="font-bold text-base text-white">
                  {selectedLevel} Seviye Bitirme Sınavı (CEFR Gate)
                </h3>
              </div>
              <button onClick={() => setShowExamModal(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="h-5 w-5"/>
              </button>
            </div>

            <div className="overflow-y-auto custom-scrollbar flex-1 pr-1">
              {examLoading ? (
                <div className="py-20 text-center text-xs text-slate-400 flex flex-col items-center gap-3">
                  <span className="h-8 w-8 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin"></span>
                  Yapay zeka sınav yanıtlarını (Listening, Reading, Writing) değerlendiriyor ve karneni hazırlıyor...
                </div>
              ) : examReport ? (
                <div className="space-y-4">
                  <div className={`p-5 rounded-2xl text-center border ${
                    examReport.passed ? "bg-emerald-950/40 border-emerald-500/50" : "bg-rose-950/40 border-rose-500/50"
                  }`}>
                    <div className="text-xs font-semibold uppercase tracking-wider text-slate-300">Genel Sınav Notu</div>
                    <div className="text-3xl font-black text-white mt-1">%{examReport.overall_score}</div>
                    <div className={`text-xs font-bold mt-1.5 ${examReport.passed ? "text-emerald-400" : "text-rose-400"}`}>
                      {examReport.passed 
                        ? `🎉 Tebrikler! Başarıyla ${NEXT_LEVEL_MAP[selectedLevel]} Seviyesine Yükseldin!` 
                        : "Seviye atlamak için en az %70 gereklidir. Pratik yapıp tekrar deneyebilirsin."}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
                      <div className="text-[10px] text-slate-400">Listening</div>
                      <div className="text-base font-bold text-indigo-400 mt-0.5">%{examReport.listening_score}</div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
                      <div className="text-[10px] text-slate-400">Reading</div>
                      <div className="text-base font-bold text-violet-400 mt-0.5">%{examReport.reading_score}</div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
                      <div className="text-[10px] text-slate-400">Writing</div>
                      <div className="text-base font-bold text-emerald-400 mt-0.5">%{examReport.writing_score}</div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs">
                    <div className="font-bold text-indigo-300">Koçun Kapsamlı Değerlendirmesi:</div>
                    <p className="text-slate-300 leading-relaxed">{examReport.summary_feedback}</p>
                    
                    <div className="pt-2 border-t border-slate-800 space-y-1 text-[11px] text-slate-400">
                      <div>🎧 <b>Listening:</b> {examReport.listening_comment}</div>
                      <div>📖 <b>Reading:</b> {examReport.reading_comment}</div>
                      <div>✍️ <b>Writing:</b> {examReport.writing_comment}</div>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowExamModal(false)}
                    className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-semibold text-xs text-white cursor-pointer"
                  >
                    Tamamla ve Kapat
                  </button>
                </div>
              ) : examData && (
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-2 mb-2">
                    <div className={`p-2 rounded-lg text-center text-xs font-bold border transition-all ${
                      examStep === "listening" ? "bg-indigo-600/30 border-indigo-400 text-indigo-200" : "bg-slate-900 border-slate-800 text-slate-500"
                    }`}>
                      1. Listening
                    </div>
                    <div className={`p-2 rounded-lg text-center text-xs font-bold border transition-all ${
                      examStep === "reading" ? "bg-indigo-600/30 border-indigo-400 text-indigo-200" : "bg-slate-900 border-slate-800 text-slate-500"
                    }`}>
                      2. Reading
                    </div>
                    <div className={`p-2 rounded-lg text-center text-xs font-bold border transition-all ${
                      examStep === "writing" ? "bg-indigo-600/30 border-indigo-400 text-indigo-200" : "bg-slate-900 border-slate-800 text-slate-500"
                    }`}>
                      3. Writing
                    </div>
                  </div>

                  {examStep === "listening" && (
                    <div className="space-y-3">
                      <div className="text-xs font-semibold text-indigo-300">
                        Aşama 1: Ses Dinleme ve Dikte
                      </div>
                      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-center space-y-3">
                        <p className="text-xs text-slate-300">Cümleyi dinle ve duyduğun İngilizce ifadeyi aşağıya yaz:</p>
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => playSpeechAudio(examData.listening.text, 0.9)}
                            disabled={isPlayingAudio}
                            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
                          >
                            <Play className="h-3.5 w-3.5 fill-white"/> Dinle
                          </button>
                          <button
                            onClick={() => playSpeechAudio(examData.listening.text, 0.7)}
                            disabled={isPlayingAudio}
                            className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1.5 border border-slate-700 cursor-pointer"
                          >
                            <RotateCcw className="h-3 w-3"/> Yavaş Dinle
                          </button>
                        </div>
                      </div>

                      <textarea
                        rows={3}
                        value={examListeningInput}
                        onChange={(e) => setExamListeningInput(e.target.value)}
                        placeholder="Duyduğun cümleyi İngilizce olarak buraya yaz..."
                        className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-indigo-500"
                      />

                      <div className="flex justify-end pt-2">
                        <button
                          disabled={!examListeningInput.trim()}
                          onClick={() => setExamStep("reading")}
                          className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-xs font-semibold text-white cursor-pointer"
                        >
                          2. Aşamaya Geç (Reading) ➔
                        </button>
                      </div>
                    </div>
                  )}

                  {examStep === "reading" && (
                    <div className="space-y-3">
                      <div className="text-xs font-semibold text-indigo-300">
                        Aşama 2: Okuma & Türkçe Çeviri
                      </div>

                      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                        <div className="text-[11px] font-bold text-slate-400 uppercase">İngilizce Metin:</div>
                        <p className="text-xs text-indigo-100 italic leading-relaxed">
                          "{examData.reading.source_text}"
                        </p>
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                          {examData.reading.instruction}
                        </label>
                        <textarea
                          rows={4}
                          value={examReadingInput}
                          onChange={(e) => setExamReadingInput(e.target.value)}
                          placeholder="Türkçe çevirini buraya yaz..."
                          className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-indigo-500"
                        />
                      </div>

                      <div className="flex justify-between items-center pt-2">
                        <button
                          onClick={() => setExamStep("listening")}
                          className="px-4 py-2 rounded-xl bg-slate-800 text-xs text-slate-300 cursor-pointer"
                        >
                          Geri
                        </button>
                        <button
                          disabled={!examReadingInput.trim()}
                          onClick={() => setExamStep("writing")}
                          className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-xs font-semibold text-white cursor-pointer"
                        >
                          3. Aşamaya Geç (Writing) ➔
                        </button>
                      </div>
                    </div>
                  )}

                  {examStep === "writing" && (
                    <div className="space-y-3">
                      <div className="text-xs font-semibold text-indigo-300">
                        Aşama 3: Kompozisyon & Yazma
                      </div>

                      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
                        <div className="text-[11px] font-bold text-slate-400 uppercase">Soru / Görev:</div>
                        <div className="text-xs font-bold text-white">{examData.writing.topic}</div>
                        <div className="text-[11px] text-slate-400">{examData.writing.instruction}</div>
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                          İngilizce Metniniz:
                        </label>
                        <textarea
                          rows={5}
                          value={examWritingInput}
                          onChange={(e) => setExamWritingInput(e.target.value)}
                          placeholder="Write your response in English..."
                          className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-indigo-500"
                        />
                      </div>

                      <div className="flex justify-between items-center pt-2">
                        <button
                          onClick={() => setExamStep("reading")}
                          className="px-4 py-2 rounded-xl bg-slate-800 text-xs text-slate-300 cursor-pointer"
                        >
                          Geri
                        </button>
                        <button
                          disabled={!examWritingInput.trim()}
                          onClick={handleEvaluateExam}
                          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-40 text-xs font-bold text-white shadow-lg shadow-emerald-600/20 cursor-pointer"
                        >
                          Sınavı Tamamla & Karnemi Üret
                        </button>
                      </div>
                    </div>
                  )}

                </div>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}