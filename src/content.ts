// All page text, in English and Arabic. Numbers stay in Western digits.
//
// Editing tips
// - A project's `status` is "live" (released) or "building" (still in progress).
//   A "building" project gets an amber badge and shows its `note`.
// - `releaseRepo` makes the card fetch that repo's latest GitHub release and
//   show its version and date. `version` is shown if GitHub can't be reached.
// - Screenshots live in public/work/.

export type Lang = "en" | "ar";
export type Status = "live" | "building";
export type ProjectId = "forge" | "fight" | "qgen" | "todo" | "classes";

export const LINKS = {
  email: "hussenalherk@gmail.com",
  github: "https://github.com/KIRAHERK",
  linkedin: "https://www.linkedin.com/in/husseinalherk",
  source: "https://github.com/KIRAHERK/KIRAHERK.github.io",
  forgeApk:
    "https://github.com/KIRAHERK/Forge/releases/latest/download/Forge.apk",
  forgeSite: "https://kiraherk.github.io/Forge/",
  forgeRepo: "https://github.com/KIRAHERK/Forge",
  todoRepo: "https://github.com/KIRAHERK/Smart-To-Do",
  todoRelease: "https://github.com/KIRAHERK/Smart-To-Do/releases/latest",
  fightRepo: "https://github.com/KIRAHERK/fight-detection-mlstm",
  qgenRepo: "https://github.com/KIRAHERK/arabic-exam-question-generator",
  seniorRepo: "https://github.com/KIRAHERK/Senior-Project",
};

type Stat = [value: string, label: string];
type ProjectLink = {
  label: string;
  href: string;
  kind?: "download" | "site" | "code";
};

export type Project = {
  id: ProjectId;
  status: Status;
  meta: string;
  title: string;
  tagline: string;
  text: string;
  stats: Stat[];
  tags: string[];
  links: ProjectLink[];
  releaseRepo?: string;
  version?: string;
  note?: string;
};

type Small = {
  year: string;
  title: string;
  text: string;
  icon: "wifi" | "radar" | "receipt";
};

export type Content = {
  meta: { title: string; description: string };
  skip: string;
  nav: {
    work: string;
    about: string;
    skills: string;
    contact: string;
    switchTo: "/" | "/ar";
    switchLabel: string;
  };
  hero: {
    status: string;
    name: string;
    lead: string;
    buildPrefix: string;
    builds: string[];
    buildsSpoken: string;
    intro: string;
    seeWork: string;
    emailMe: string;
  };
  pose: { caption: string; label: string; motion: string; alert: string };
  stats: Stat[];
  work: {
    eyebrow: string;
    title: string;
    intro: string;
    released: string;
    building: string;
    latest: string;
    projects: Project[];
    moreTitle: string;
    more: Small[];
  };
  visuals: {
    forgeScreens: Array<[file: string, label: string]>;
    forgeScreensLabel: string;
    fightStepsTitle: string;
    fightSteps: string[];
    fightTitle: string;
    fightRows: Array<[label: string, value: number]>;
    qgenTitle: string;
    qgenSteps: {
      lexical: [string, string];
      dense: [string, string];
      fuse: [string, string];
      llm: [string, string];
      out: [string, string];
    };
    todoListening: string;
    todoSaid: string;
    todoMeaning?: string;
    classesCaption: string;
    classesNames: [string, string, string];
    classesAvg: string;
  };
  about: {
    eyebrow: string;
    title: string;
    bio: string;
    facts: Array<[string, string]>;
    timelineTitle: string;
    timeline: Array<[when: string, title: string, text: string]>;
  };
  skills: {
    eyebrow: string;
    title: string;
    intro: string;
    groups: Array<[string, string[]]>;
  };
  contact: {
    eyebrow: string;
    title: string;
    text: string;
    copy: string;
    copied: string;
    footer: string;
    built: string;
  };
};

const SKILL_TAGS = {
  ai: [
    "PyTorch",
    "Ultralytics YOLO",
    "OpenCV",
    "scikit-learn",
    "XGBoost",
    "pandas",
    "NumPy",
  ],
  llm: [
    "RAG",
    "Ollama",
    "Qdrant",
    "BM25",
    "sentence-transformers",
    "Hugging Face",
    "Gemini API",
  ],
  android: [
    "Kotlin",
    "Jetpack Compose",
    "Room",
    "CameraX",
    "ML Kit",
    "GitHub Actions",
  ],
  backend: ["Python", "FastAPI", "C#", "ASP.NET", "SQL", "Git", "Linux"],
  security: [
    "Kali Linux",
    "Wireshark",
    "tcpdump",
    "aircrack-ng",
    "Hashcat",
    "OSINT",
  ],
};

export const content: Record<Lang, Content> = {
  en: {
    meta: {
      title: "Hussein Al Herk — AI Engineer",
      description:
        "Hussein Al Herk, junior AI engineer in Damascus: real-time fight detection for CCTV, an offline Arabic exam generator, and Android apps in Arabic and English.",
    },
    skip: "Skip to content",
    nav: {
      work: "Work",
      about: "About",
      skills: "Skills",
      contact: "Contact",
      switchTo: "/ar",
      switchLabel: "العربية",
    },
    hero: {
      status: "Open to junior AI and software roles",
      name: "Hussein Al Herk",
      lead: "Junior AI engineer in Damascus, Syria.",
      buildPrefix: "I build",
      builds: [
        "real-time computer vision.",
        "offline AI that reads Arabic.",
        "Android apps, Arabic first.",
      ],
      buildsSpoken:
        "I build real-time computer vision, offline AI that reads Arabic, and Android apps.",
      intro:
        "My work runs on real hardware: CCTV cameras, school servers with no cloud, and phones. I also know my way around networks and security. I'm looking for a junior AI or software role, in Damascus or remote.",
      seeWork: "See my work",
      emailMe: "Email me",
    },
    pose: {
      caption:
        "What my fight detector reads: 17 body keypoints and how fast they move. Move your cursor over the figure, or tap it.",
      label:
        "Interactive stick figure made of 17 body keypoints inside a detection box. Its arm follows your cursor, and a meter shows how fast it moves.",
      motion: "motion",
      alert: "fast",
    },
    stats: [
      ["81%", "accuracy spotting fights on real CCTV"],
      ["3", "AI services I built for my senior project"],
      ["2", "Android apps in Arabic and English"],
      ["23+", "textbooks indexed for offline search"],
    ],
    work: {
      eyebrow: "01 · Work",
      title: "Selected work",
      intro:
        "From real-time vision on school cameras to Android apps with regular releases. Version numbers come straight from GitHub.",
      released: "Released",
      building: "In progress",
      latest: "Latest",
      projects: [
        {
          id: "forge",
          status: "live",
          meta: "Android app · 2026",
          title: "Forge",
          tagline: "A training app that holds you to your plan",
          text: "Logs every set with progression hints, tracks calories, protein and morning weight, and reads nutrition labels live with the camera, on the phone. Skip a session and the streak resets and a penalty lands, due in 24 hours. Works offline with no account, in full Arabic or English, and updates itself from GitHub Releases.",
          stats: [
            ["85", "exercises with form guides"],
            ["35", "Syrian dishes with lab-measured values"],
            ["0", "accounts, ads or analytics"],
          ],
          tags: ["Kotlin", "Jetpack Compose", "Room", "CameraX", "ML Kit"],
          links: [
            {
              label: "Download for Android",
              href: LINKS.forgeApk,
              kind: "download",
            },
            { label: "Download page", href: LINKS.forgeSite, kind: "site" },
            { label: "Code", href: LINKS.forgeRepo, kind: "code" },
          ],
          releaseRepo: "KIRAHERK/Forge",
          version: "v1.13.0",
        },
        {
          id: "fight",
          status: "live",
          meta: "Senior project · AI service · 2026",
          title: "Fight detection",
          tagline: "Real-time alerts from school CCTV",
          text: "It reads skeletons, not pixels. YOLO26-pose turns every frame into 17 keypoints per person, the service adds how fast each joint moves, and an mLSTM decides fight or no fight from one second of movement. When it fires, it keeps 10 seconds before and after and alerts the school dashboard.",
          stats: [
            ["15,596", "training sequences"],
            ["17", "keypoints per person"],
            ["30", "frames per decision"],
          ],
          tags: ["PyTorch", "YOLO26-pose", "mLSTM", "FastAPI", "OpenCV"],
          links: [{ label: "Code", href: LINKS.fightRepo, kind: "code" }],
        },
        {
          id: "qgen",
          status: "live",
          meta: "Senior project · AI service · 2026",
          title: "Exam question generator",
          tagline: "Offline RAG over Arabic and English textbooks",
          text: "A teacher picks a book and chapters. Hybrid search finds the right passages: BM25 for exact curriculum terms, dense vectors for paraphrases, merged with reciprocal rank fusion. A local Arabic LLM writes the questions, each one gets a 0–100 quality score, and it exports a Word exam with an answer key. Nothing leaves the machine.",
          stats: [
            ["23+", "curriculum books indexed"],
            ["5", "question types"],
            ["6", "Bloom levels"],
          ],
          tags: ["RAG", "Ollama", "Qdrant", "BM25", "FastAPI"],
          links: [{ label: "Code", href: LINKS.qgenRepo, kind: "code" }],
        },
        {
          id: "todo",
          status: "building",
          meta: "Android app · 2026",
          title: "Smart To-Do",
          tagline: "A to-do list you talk to in Arabic",
          text: "Built for a busy businessman who kept his lists on paper. He presses one button and speaks in any Arabic dialect. Gemini turns it into a task with a category, reminder and repeat rule, and the app reads it back before saving. Every change is kept, so he can ask things like “when did I last call Ahmed?”",
          stats: [],
          tags: [
            "Kotlin",
            "Jetpack Compose",
            "Gemini API",
            "Room",
            "Speech recognition",
          ],
          links: [
            {
              label: "Latest release",
              href: LINKS.todoRelease,
              kind: "download",
            },
            { label: "Code", href: LINKS.todoRepo, kind: "code" },
          ],
          releaseRepo: "KIRAHERK/Smart-To-Do",
          version: "v0.2.4",
          note: "Still in development: features and screens are changing.",
        },
        {
          id: "classes",
          status: "live",
          meta: "Senior project · 2026",
          title: "Class distributor",
          tagline: "Fair, balanced classes",
          text: "Ranks students by a weighted score of grades, behaviour and attendance, then deals them into classes in zigzag order, so every class gets the same mix. A small FastAPI service that also reports how balanced the result is.",
          stats: [],
          tags: ["Python", "FastAPI", "NumPy"],
          links: [{ label: "Team repo", href: LINKS.seniorRepo, kind: "code" }],
        },
      ],
      moreTitle: "More projects",
      more: [
        {
          year: "2026",
          title: "Wireless security home lab",
          text: "Tested WPA2 security in an isolated Kali Linux lab and wrote up the findings.",
          icon: "wifi",
        },
        {
          year: "2025",
          title: "Hazard prediction for Syria",
          text: "Machine-learning models that predict environmental and conflict-related hazards from real Syrian data.",
          icon: "radar",
        },
        {
          year: "2024",
          title: "Financial reporting app",
          text: "ASP.NET app that builds monthly and yearly balance sheets and income statements.",
          icon: "receipt",
        },
      ],
    },
    visuals: {
      forgeScreens: [
        ["forge-today", "Today"],
        ["forge-workout", "Workout"],
        ["forge-fuel", "Fuel"],
        ["forge-progress", "Progress"],
        ["forge-habits", "Habits"],
      ],
      forgeScreensLabel: "Forge screens",
      fightStepsTitle: "How it decides",
      fightSteps: [
        "Camera frame",
        "YOLO26-pose",
        "Keypoints + speed",
        "mLSTM · 30 frames",
        "Alert + clip",
      ],
      fightTitle: "Accuracy on held-out data",
      fightRows: [
        ["SCVD · real CCTV", 81],
        ["RWF-2000 · test", 73],
        ["RWF-2000 · validation", 71],
      ],
      qgenTitle: "How a question is grounded",
      qgenSteps: {
        lexical: ["BM25", "exact terms"],
        dense: ["Qdrant · bge-m3", "meaning"],
        fuse: ["Rank fusion", "RRF, k = 60"],
        llm: ["Local LLM", "command-r7b-arabic"],
        out: ["Word exam", ".docx + answer key"],
      },
      todoListening: "Listening…",
      todoSaid: "ذكرني كل أسبوعين يوم الاثنين الساعة عشرة أتصل بأحمد",
      todoMeaning: "“Remind me every two weeks, Monday at ten, to call Ahmed.”",
      classesCaption: "12 ranked students, dealt in a zigzag",
      classesNames: ["A", "B", "C"],
      classesAvg: "avg rank",
    },
    about: {
      eyebrow: "02 · About",
      title: "About",
      bio: "I graduated in Information Technology, AI specialization, from Arab International University in 2026. For our senior project, a team of five built an AI-powered school management system (Laravel backend, Flutter app, React dashboard), and I built its three AI services. Outside coursework I build Android apps and run a home lab for network security.",
      facts: [
        ["Languages", "Arabic (native), English (excellent)"],
        ["Learning now", "Certifications in AI/ML and cybersecurity"],
        ["Based in", "Damascus, Syria · open to remote"],
      ],
      timelineTitle: "Timeline",
      timeline: [
        [
          "2021",
          "Started university",
          "Bachelor of IT, AI specialization, Arab International University.",
        ],
        [
          "2024",
          "Financial reporting app",
          "Monthly and yearly statements in ASP.NET.",
        ],
        [
          "2025",
          "Hazard prediction",
          "Machine-learning models on real Syrian data.",
        ],
        [
          "2026",
          "Senior project",
          "Three AI services for a school system, in a team of five.",
        ],
        ["2026", "Graduated", "Bachelor of IT, AI specialization."],
        [
          "2026",
          "Shipped Forge",
          "An Android app in Arabic and English that updates itself.",
        ],
        ["Now", "Building Smart To-Do", "A voice-first to-do app in Arabic."],
      ],
    },
    skills: {
      eyebrow: "03 · Skills",
      title: "Skills",
      intro: "Tools I've used in finished, working projects.",
      groups: [
        ["AI & machine learning", SKILL_TAGS.ai],
        ["LLMs & retrieval", SKILL_TAGS.llm],
        ["Android", SKILL_TAGS.android],
        ["Backend", SKILL_TAGS.backend],
        ["Security", SKILL_TAGS.security],
      ],
    },
    contact: {
      eyebrow: "04 · Contact",
      title: "Let's build something",
      text: "I'm looking for a junior AI, ML or software role. Email is the fastest way to reach me.",
      copy: "Copy",
      copied: "Copied",
      footer: "Hussein Al Herk · Damascus, Syria",
      built: "Source on GitHub",
    },
  },

  ar: {
    meta: {
      title: "Hussein Al Herk — مهندس ذكاء اصطناعي",
      description:
        "حسين، مهندس ذكاء اصطناعي مبتدئ في دمشق: كشف الشجار لحظياً في كاميرات المراقبة، ومولّد امتحانات عربي يعمل دون إنترنت، وتطبيقات أندرويد بالعربية والإنجليزية.",
    },
    skip: "انتقل إلى المحتوى",
    nav: {
      work: "الأعمال",
      about: "نبذة",
      skills: "المهارات",
      contact: "تواصل",
      switchTo: "/",
      switchLabel: "English",
    },
    hero: {
      status: "متاح لوظيفة مبتدئة في الذكاء الاصطناعي أو البرمجيات",
      name: "Hussein Al Herk",
      lead: "مهندس ذكاء اصطناعي مبتدئ في دمشق، سوريا.",
      buildPrefix: "أبني",
      builds: [
        "رؤية حاسوبية تعمل لحظياً.",
        "ذكاءً اصطناعياً يقرأ العربية دون إنترنت.",
        "تطبيقات أندرويد، بالعربية أولاً.",
      ],
      buildsSpoken:
        "أبني رؤية حاسوبية تعمل لحظياً، وذكاءً اصطناعياً يقرأ العربية دون إنترنت، وتطبيقات أندرويد.",
      intro:
        "أعمالي تعمل على أجهزة حقيقية: كاميرات المراقبة، وخوادم مدارس دون خدمات سحابية، والهواتف. ولدي خبرة عملية في الشبكات وأمن المعلومات. أبحث عن وظيفة مبتدئة في الذكاء الاصطناعي أو البرمجيات، في دمشق أو عن بُعد.",
      seeWork: "شاهد أعمالي",
      emailMe: "راسلني",
    },
    pose: {
      caption:
        "ما يقرؤه كاشف الشجار الذي بنيته: 17 نقطة مفصلية للجسم وسرعة حركتها. حرّك المؤشر فوق الشكل أو المسه.",
      label:
        "شكل تفاعلي من 17 نقطة مفصلية داخل مربع كشف. تتبع ذراعه المؤشر، ويُظهر مقياس سرعة حركتها.",
      motion: "الحركة",
      alert: "سريعة",
    },
    stats: [
      ["81%", "دقة كشف الشجار في تسجيلات كاميرات حقيقية"],
      ["3", "خدمات ذكاء اصطناعي بنيتها لمشروع التخرج"],
      ["2", "تطبيقا أندرويد بالعربية والإنجليزية"],
      ["23+", "كتاباً مدرسياً مفهرساً للبحث دون إنترنت"],
    ],
    work: {
      eyebrow: "01 · الأعمال",
      title: "أبرز الأعمال",
      intro:
        "من الرؤية الحاسوبية اللحظية في كاميرات المدارس إلى تطبيقات أندرويد بإصدارات منتظمة. أرقام الإصدارات تُجلب مباشرة من GitHub.",
      released: "منشور",
      building: "قيد التطوير",
      latest: "آخر إصدار",
      projects: [
        {
          id: "forge",
          status: "live",
          meta: "تطبيق أندرويد · 2026",
          title: "Forge",
          tagline: "تطبيق تمارين يُلزمك بخطتك",
          text: "يسجّل كل مجموعة مع اقتراحات لزيادة الحِمل، ويتابع السعرات والبروتين ووزن الصباح، ويقرأ جداول القيم الغذائية مباشرة بالكاميرا على الهاتف نفسه. إن فاتك تمرين ينقطع تتابع الأيام وتُفرض عليك عقوبة خلال 24 ساعة. يعمل دون إنترنت ودون حساب، بالعربية أو الإنجليزية بالكامل، ويحدّث نفسه من GitHub Releases.",
          stats: [
            ["85", "تمريناً مع شرح الأداء الصحيح"],
            ["35", "طبقاً سورياً بقيم غذائية مقيسة مخبرياً"],
            ["0", "حسابات أو إعلانات أو تتبّع"],
          ],
          tags: ["Kotlin", "Jetpack Compose", "Room", "CameraX", "ML Kit"],
          links: [
            { label: "تحميل لأندرويد", href: LINKS.forgeApk, kind: "download" },
            { label: "صفحة التحميل", href: LINKS.forgeSite, kind: "site" },
            { label: "الكود", href: LINKS.forgeRepo, kind: "code" },
          ],
          releaseRepo: "KIRAHERK/Forge",
          version: "v1.13.0",
        },
        {
          id: "fight",
          status: "live",
          meta: "مشروع التخرج · خدمة ذكاء اصطناعي · 2026",
          title: "كشف الشجار",
          tagline: "تنبيهات لحظية من كاميرات المدارس",
          text: "يقرأ الهياكل لا البكسلات. يحوّل YOLO26-pose كل إطار إلى 17 نقطة مفصلية لكل شخص، وتضيف الخدمة سرعة حركة كل مفصل، ثم يقرر نموذج mLSTM إن كان هناك شجار من ثانية واحدة من الحركة. عند الكشف يحفظ 10 ثوانٍ قبل الحدث و10 بعده ويرسل تنبيهاً إلى لوحة إدارة المدرسة.",
          stats: [
            ["15,596", "سلسلة تدريب"],
            ["17", "نقطة مفصلية لكل شخص"],
            ["30", "إطاراً لكل قرار"],
          ],
          tags: ["PyTorch", "YOLO26-pose", "mLSTM", "FastAPI", "OpenCV"],
          links: [{ label: "الكود", href: LINKS.fightRepo, kind: "code" }],
        },
        {
          id: "qgen",
          status: "live",
          meta: "مشروع التخرج · خدمة ذكاء اصطناعي · 2026",
          title: "مولّد أسئلة الامتحانات",
          tagline: "بحث وتوليد (RAG) دون إنترنت في الكتب العربية والإنجليزية",
          text: "يختار المعلّم الكتاب والفصول، فيجد البحث الهجين الفقرات المناسبة: BM25 للمصطلحات المطابقة حرفياً، والمتجهات الدلالية للمعنى وإعادة الصياغة، ثم يُدمج الترتيبان بطريقة Reciprocal Rank Fusion. يكتب نموذج لغوي عربي محلي الأسئلة، ويحصل كل سؤال على درجة جودة من 0 إلى 100، ثم يُصدَّر امتحان Word مع مفتاح الإجابات. لا يغادر أي شيء الجهاز.",
          stats: [
            ["23+", "كتاباً من المنهاج مفهرساً"],
            ["5", "أنواع من الأسئلة"],
            ["6", "مستويات من تصنيف بلوم"],
          ],
          tags: ["RAG", "Ollama", "Qdrant", "BM25", "FastAPI"],
          links: [{ label: "الكود", href: LINKS.qgenRepo, kind: "code" }],
        },
        {
          id: "todo",
          status: "building",
          meta: "تطبيق أندرويد · 2026",
          title: "مهامي الذكية",
          tagline: "قائمة مهام تتحدث إليها بالعربية",
          text: "صمّمته لرجل أعمال مشغول كان يكتب مهامه على الورق. يضغط زراً واحداً ويتكلم بأي لهجة عربية، فيحوّل Gemini كلامه إلى مهمة مع تصنيف وتذكير وتكرار، ويقرأ التطبيق ما فهمه قبل الحفظ. كل تغيير محفوظ، فيستطيع أن يسأل: «متى اتصلت بأحمد آخر مرة؟»",
          stats: [],
          tags: [
            "Kotlin",
            "Jetpack Compose",
            "Gemini API",
            "Room",
            "Speech recognition",
          ],
          links: [
            { label: "آخر إصدار", href: LINKS.todoRelease, kind: "download" },
            { label: "الكود", href: LINKS.todoRepo, kind: "code" },
          ],
          releaseRepo: "KIRAHERK/Smart-To-Do",
          version: "v0.2.4",
          note: "ما زال قيد التطوير: الميزات والشاشات تتغير.",
        },
        {
          id: "classes",
          status: "live",
          meta: "مشروع التخرج · 2026",
          title: "توزيع الطلاب على الشُّعب",
          tagline: "شُعب متوازنة وعادلة",
          text: "يرتّب الطلاب حسب درجة مركّبة من العلامات والسلوك والحضور، ثم يوزّعهم على الشُّعب بترتيب متعرّج، فتحصل كل شعبة على المزيج نفسه. خدمة FastAPI صغيرة تقيس أيضاً مدى توازن النتيجة.",
          stats: [],
          tags: ["Python", "FastAPI", "NumPy"],
          links: [
            { label: "مستودع الفريق", href: LINKS.seniorRepo, kind: "code" },
          ],
        },
      ],
      moreTitle: "مشاريع أخرى",
      more: [
        {
          year: "2026",
          title: "مختبر أمن الشبكات اللاسلكية",
          text: "اختبار أمان WPA2 في مختبر Kali Linux معزول وتوثيق النتائج.",
          icon: "wifi",
        },
        {
          year: "2025",
          title: "التنبؤ بالمخاطر في سوريا",
          text: "نماذج تعلّم آلي تتنبأ بالمخاطر البيئية والمرتبطة بالنزاع من بيانات سورية حقيقية.",
          icon: "radar",
        },
        {
          year: "2024",
          title: "تطبيق التقارير المالية",
          text: "تطبيق ASP.NET يُنشئ الميزانيات وقوائم الدخل الشهرية والسنوية.",
          icon: "receipt",
        },
      ],
    },
    visuals: {
      forgeScreens: [
        ["forge-today", "اليوم"],
        ["forge-workout", "تمرين"],
        ["forge-fuel", "الطعام"],
        ["forge-progress", "الإنجاز"],
        ["forge-habits", "العادات"],
      ],
      forgeScreensLabel: "شاشات Forge",
      fightStepsTitle: "كيف يقرر",
      fightSteps: [
        "إطار الكاميرا",
        "YOLO26-pose",
        "النقاط + السرعة",
        "mLSTM · 30 إطاراً",
        "تنبيه + مقطع",
      ],
      fightTitle: "الدقة على بيانات اختبار منفصلة",
      fightRows: [
        ["SCVD · كاميرات حقيقية", 81],
        ["RWF-2000 · اختبار", 73],
        ["RWF-2000 · تحقق", 71],
      ],
      qgenTitle: "كيف يستند كل سؤال إلى الكتاب",
      qgenSteps: {
        lexical: ["BM25", "مطابقة حرفية"],
        dense: ["Qdrant · bge-m3", "المعنى"],
        fuse: ["دمج الترتيب", "RRF، k = 60"],
        llm: ["نموذج لغوي محلي", "command-r7b-arabic"],
        out: ["امتحان Word", "مع مفتاح الإجابات"],
      },
      todoListening: "أنا أسمعك…",
      todoSaid: "ذكرني كل أسبوعين يوم الاثنين الساعة عشرة أتصل بأحمد",
      classesCaption: "12 طالباً مرتّبين، موزّعين بترتيب متعرّج",
      classesNames: ["أ", "ب", "ج"],
      classesAvg: "متوسط الترتيب",
    },
    about: {
      eyebrow: "02 · نبذة",
      title: "نبذة",
      bio: "تخرّجت في تقانة المعلومات، اختصاص الذكاء الاصطناعي، من الجامعة العربية الدولية عام 2026. في مشروع التخرج بنى فريق من خمسة طلاب نظاماً ذكياً لإدارة المدارس (خادم Laravel وتطبيق Flutter ولوحة تحكم React)، وبنيت أنا خدمات الذكاء الاصطناعي الثلاث فيه. وخارج الدراسة أبني تطبيقات أندرويد، ولدي مختبر منزلي لأمن الشبكات.",
      facts: [
        ["اللغات", "العربية (اللغة الأم) والإنجليزية (ممتازة)"],
        ["أتعلّم حالياً", "شهادات في الذكاء الاصطناعي وأمن المعلومات"],
        ["المكان", "دمشق، سوريا · متاح للعمل عن بُعد"],
      ],
      timelineTitle: "المسيرة",
      timeline: [
        [
          "2021",
          "بداية الجامعة",
          "إجازة في تقانة المعلومات، اختصاص الذكاء الاصطناعي، الجامعة العربية الدولية.",
        ],
        [
          "2024",
          "تطبيق التقارير المالية",
          "قوائم مالية شهرية وسنوية بـ ASP.NET.",
        ],
        ["2025", "التنبؤ بالمخاطر", "نماذج تعلّم آلي على بيانات سورية حقيقية."],
        [
          "2026",
          "مشروع التخرج",
          "ثلاث خدمات ذكاء اصطناعي لنظام مدرسي، ضمن فريق من خمسة.",
        ],
        [
          "2026",
          "التخرّج",
          "إجازة في تقانة المعلومات، اختصاص الذكاء الاصطناعي.",
        ],
        [
          "2026",
          "إطلاق Forge",
          "تطبيق أندرويد بالعربية والإنجليزية يحدّث نفسه.",
        ],
        [
          "الآن",
          "أعمل على مهامي الذكية",
          "تطبيق مهام بالعربية يعتمد على الصوت.",
        ],
      ],
    },
    skills: {
      eyebrow: "03 · المهارات",
      title: "المهارات",
      intro: "أدوات استخدمتها في مشاريع منجزة تعمل فعلاً.",
      groups: [
        ["الذكاء الاصطناعي وتعلّم الآلة", SKILL_TAGS.ai],
        ["النماذج اللغوية والبحث", SKILL_TAGS.llm],
        ["أندرويد", SKILL_TAGS.android],
        ["الخوادم والبرمجيات", SKILL_TAGS.backend],
        ["أمن المعلومات", SKILL_TAGS.security],
      ],
    },
    contact: {
      eyebrow: "04 · تواصل",
      title: "لنبنِ شيئاً معاً",
      text: "أبحث عن وظيفة مبتدئة في الذكاء الاصطناعي أو تعلّم الآلة أو البرمجة. أسرع طريقة للتواصل معي هي البريد الإلكتروني.",
      copy: "نسخ",
      copied: "تم النسخ",
      footer: "Hussein Al Herk · دمشق، سوريا",
      built: "الكود المصدري على GitHub",
    },
  },
};
