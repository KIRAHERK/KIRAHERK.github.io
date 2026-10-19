// All page text, in English and Arabic. Numbers stay in Western digits.

export type Lang = "en" | "ar";

export const LINKS = {
  email: "hussenalherk@gmail.com",
  github: "https://github.com/KIRAHERK",
  linkedin: "https://www.linkedin.com/in/husseinalherk",
  fightRepo: "https://github.com/KIRAHERK/fight-detection-mlstm",
  qgenRepo: "https://github.com/KIRAHERK/arabic-exam-question-generator",
};

type Stat = [value: string, label: string];
type Project = { title: string; meta: string; text: string; stats: Stat[]; tags: string[]; repo: string };
type Small = { year: string; title: string; text: string };

export type Content = {
  meta: { title: string; description: string };
  nav: { work: string; skills: string; about: string; contact: string; switchTo: "/" | "/ar"; switchLabel: string };
  hero: { role: string; name: string; intro: string; seeWork: string; emailMe: string; caption: string };
  work: { title: string; viewCode: string; projects: Project[]; moreTitle: string; more: Small[] };
  skills: { title: string; groups: Array<[string, string[]]> };
  about: { title: string; items: Array<[string, string]> };
  contact: { title: string; text: string; copy: string; copied: string; footer: string };
};

export const content: Record<Lang, Content> = {
  en: {
    meta: {
      title: "Hussein Al Herk — AI Engineer",
      description:
        "Hussein Al Herk, junior AI engineer in Damascus: real-time fight detection for CCTV, an offline Arabic exam generator, and network security.",
    },
    nav: { work: "Work", skills: "Skills", about: "About", contact: "Contact", switchTo: "/ar", switchLabel: "العربية" },
    hero: {
      role: "Junior AI engineer · Damascus, Syria",
      name: "Hussein Al Herk",
      intro:
        "I build computer-vision and AI systems that run on real hardware, and I know my way around networks and security. I'm looking for a junior AI or software role, in Damascus or remote.",
      seeWork: "See my work",
      emailMe: "Email me",
      caption: "My fight detector reads body keypoints like these, 30 frames at a time.",
    },
    work: {
      title: "Selected work",
      viewCode: "View the code",
      projects: [
        {
          title: "Fight detection for school cameras",
          meta: "Senior project · 2026",
          text:
            "Turns every camera frame into body keypoints with YOLO26-pose, then an mLSTM model decides fight or no fight from one second of movement. It runs as a FastAPI service that saves the clip and alerts the school dashboard.",
          stats: [
            ["81%", "accuracy on held-out real CCTV footage"],
            ["17", "body keypoints per person"],
            ["30", "frames per decision"],
          ],
          tags: ["PyTorch", "YOLO26-pose", "FastAPI", "OpenCV"],
          repo: LINKS.fightRepo,
        },
        {
          title: "Exam question generator (Arabic & English)",
          meta: "Senior project · 2026",
          text:
            "A teacher picks a book and chapters. The system finds the right textbook passages, a local AI model writes the questions, and it exports a Word exam with an answer key. It runs fully offline.",
          stats: [
            ["23+", "Syrian curriculum books indexed"],
            ["5", "question types"],
            ["0", "cloud services needed"],
          ],
          tags: ["RAG", "Ollama", "Qdrant", "FastAPI"],
          repo: LINKS.qgenRepo,
        },
      ],
      moreTitle: "More projects",
      more: [
        { year: "2026", title: "Wireless security home lab", text: "Tested WPA2 security in an isolated Kali Linux lab and wrote up the findings." },
        { year: "2025", title: "Hazard prediction for Syria", text: "Machine-learning models that predict environmental and conflict-related hazards from real Syrian data." },
        { year: "2024", title: "Financial reporting app", text: "ASP.NET app that builds monthly and yearly balance sheets and income statements." },
      ],
    },
    skills: {
      title: "Skills",
      groups: [
        ["AI & machine learning", ["PyTorch", "YOLO", "OpenCV", "scikit-learn", "pandas"]],
        ["LLMs & search", ["RAG", "Ollama", "Qdrant", "Hugging Face"]],
        ["Software", ["Python", "FastAPI", "C#", "ASP.NET", "SQL", "Git", "Linux"]],
        ["Security", ["Kali Linux", "Wireshark", "Hashcat", "OSINT"]],
      ],
    },
    about: {
      title: "About",
      items: [
        ["Education", "Bachelor of Information Technology, AI specialization. Arab International University, 2021–2026."],
        ["Languages", "Arabic (native) and English (excellent)."],
        ["Learning now", "Certifications in AI/ML and cybersecurity."],
      ],
    },
    contact: {
      title: "Let's talk",
      text: "I'm looking for a junior AI, ML or software role. Email is the fastest way to reach me.",
      copy: "Copy",
      copied: "Copied",
      footer: "Hussein Al Herk · Damascus, Syria",
    },
  },

  ar: {
    meta: {
      title: "Hussein Al Herk — مهندس ذكاء اصطناعي",
      description:
        "حسين، مهندس ذكاء اصطناعي مبتدئ في دمشق: كشف الشجار لحظياً في كاميرات المراقبة، ومولّد امتحانات عربي يعمل دون إنترنت، وأمن الشبكات.",
    },
    nav: { work: "الأعمال", skills: "المهارات", about: "نبذة", contact: "تواصل", switchTo: "/", switchLabel: "English" },
    hero: {
      role: "مهندس ذكاء اصطناعي مبتدئ · دمشق، سوريا",
      name: "Hussein Al Herk",
      intro:
        "أبني أنظمة رؤية حاسوبية وذكاء اصطناعي تعمل على أجهزة حقيقية، ولدي خبرة عملية في الشبكات وأمن المعلومات. أبحث عن وظيفة مبتدئة في الذكاء الاصطناعي أو البرمجيات، في دمشق أو عن بُعد.",
      seeWork: "شاهد أعمالي",
      emailMe: "راسلني",
      caption: "كاشف الشجار الذي بنيته يقرأ نقاط الجسم هذه، 30 إطاراً في كل مرة.",
    },
    work: {
      title: "أبرز الأعمال",
      viewCode: "عرض الكود",
      projects: [
        {
          title: "كشف الشجار في كاميرات المدارس",
          meta: "مشروع التخرج · 2026",
          text:
            "يحوّل كل إطار من الكاميرا إلى نقاط مفصلية للجسم باستخدام YOLO26-pose، ثم يقرر نموذج mLSTM إن كان هناك شجار خلال ثانية واحدة من الحركة. يعمل كخدمة FastAPI تحفظ المقطع وترسل تنبيهاً إلى لوحة إدارة المدرسة.",
          stats: [
            ["81%", "دقة على مجموعة اختبار منفصلة من تسجيلات كاميرات حقيقية"],
            ["17", "نقطة مفصلية لكل شخص"],
            ["30", "إطاراً لكل قرار"],
          ],
          tags: ["PyTorch", "YOLO26-pose", "FastAPI", "OpenCV"],
          repo: LINKS.fightRepo,
        },
        {
          title: "مولّد أسئلة امتحانات (عربي وإنجليزي)",
          meta: "مشروع التخرج · 2026",
          text:
            "يختار المعلّم الكتاب والفصول، فيجد النظام الفقرات المناسبة من الكتاب المدرسي ويكتب نموذج ذكاء اصطناعي محلي الأسئلة، ثم يصدّر امتحاناً بصيغة Word مع مفتاح الإجابات. يعمل بالكامل دون إنترنت.",
          stats: [
            ["23+", "كتاباً من المنهاج السوري"],
            ["5", "أنواع من الأسئلة"],
            ["0", "خدمات سحابية مطلوبة"],
          ],
          tags: ["RAG", "Ollama", "Qdrant", "FastAPI"],
          repo: LINKS.qgenRepo,
        },
      ],
      moreTitle: "مشاريع أخرى",
      more: [
        { year: "2026", title: "مختبر أمن الشبكات اللاسلكية", text: "اختبار أمان WPA2 في مختبر Kali Linux معزول وتوثيق النتائج." },
        { year: "2025", title: "التنبؤ بالمخاطر في سوريا", text: "نماذج تعلّم آلي تتنبأ بالمخاطر البيئية والمرتبطة بالنزاع من بيانات سورية حقيقية." },
        { year: "2024", title: "تطبيق التقارير المالية", text: "تطبيق ASP.NET يُنشئ الميزانيات وقوائم الدخل الشهرية والسنوية." },
      ],
    },
    skills: {
      title: "المهارات",
      groups: [
        ["الذكاء الاصطناعي وتعلّم الآلة", ["PyTorch", "YOLO", "OpenCV", "scikit-learn", "pandas"]],
        ["النماذج اللغوية والبحث", ["RAG", "Ollama", "Qdrant", "Hugging Face"]],
        ["البرمجيات", ["Python", "FastAPI", "C#", "ASP.NET", "SQL", "Git", "Linux"]],
        ["أمن المعلومات", ["Kali Linux", "Wireshark", "Hashcat", "OSINT"]],
      ],
    },
    about: {
      title: "نبذة",
      items: [
        ["التعليم", "إجازة في تقانة المعلومات، اختصاص الذكاء الاصطناعي. الجامعة العربية الدولية، 2021–2026."],
        ["اللغات", "العربية (اللغة الأم) والإنجليزية (ممتازة)."],
        ["أتعلّم حالياً", "شهادات في الذكاء الاصطناعي وأمن المعلومات."],
      ],
    },
    contact: {
      title: "لنتواصل",
      text: "أبحث عن وظيفة مبتدئة في الذكاء الاصطناعي أو تعلّم الآلة أو البرمجة. أسرع طريقة للتواصل معي هي البريد الإلكتروني.",
      copy: "نسخ",
      copied: "تم النسخ",
      footer: "Hussein Al Herk · دمشق، سوريا",
    },
  },
};
