// All page text, in English and Arabic. Numbers stay in Western digits.
//
// Editing tips
// - A project's `status` is "live" (released) or "building" (still in progress).
//   `summary` is the one sentence shown first; `text` sits behind "How it works".
// - `releaseRepo` makes the panel fetch that repo's latest GitHub release and
//   show its version and date. `version` is shown if GitHub can't be reached.
// - Screenshots live in public/work/.

export type Lang = "en" | "ar";
export type Status = "live" | "building";
export type ProjectId =
  "forge" | "fight" | "qgen" | "shop" | "todo" | "classes";

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
  /** One plain sentence: what it is and why it matters. Shown first. */
  summary: string;
  /** The longer explanation, behind "How it works". */
  text: string;
  stats: Stat[];
  tags: string[];
  links: ProjectLink[];
  releaseRepo?: string;
  version?: string;
  /** Extra badge next to the meta line, e.g. "Paper in progress" or "Not adopted". */
  flag?: string;
  /** "amber" for work in progress, "neutral" for plain facts. Also colours the note. */
  flagTone?: "amber" | "neutral";
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
    name: string;
    lead: string;
    line: string;
    intro: string;
    seeWork: string;
    emailMe: string;
  };
  pose: { caption: string; label: string; motion: string; alert: string };
  work: {
    title: string;
    intro: string;
    details: string;
    builtWith: string;
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
    /** Context for the first row, shown under the bars. */
    fightNote: string;
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
    journey: {
      title: string;
      steps: Array<{ label: string; title: string; text: string; alt: string }>;
    };
  };
  about: {
    title: string;
    bio: string;
    facts: Array<[string, string]>;
    nowTitle: string;
    now: Array<[what: string, detail: string]>;
  };
  skills: {
    title: string;
    intro: string;
    groups: Array<[string, string[]]>;
  };
  contact: {
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
      name: "Hussein Al Herk",
      lead: "Junior AI engineer in Damascus, Syria.",
      line: "I build AI that runs on real hardware, and ship it as finished products.",
      intro:
        "Computer vision on school cameras, AI on servers with no cloud, and Android apps people install. I'm looking for a junior AI or software role, in Damascus or remote.",
      seeWork: "See my work",
      emailMe: "Email me",
    },
    pose: {
      caption:
        "What my fight detector reads: 17 body keypoints and how fast they move. Move your cursor over the figure, or tap it.",
      label:
        "Interactive stick figure made of 17 body keypoints inside a detection box. Its arm follows your cursor, and a meter shows how fast it moves.",
      motion: "speed",
      alert: "fast",
    },
    work: {
      title: "Selected work",
      intro:
        "Six projects, each drawn as the system it is. Version numbers come straight from GitHub.",
      details: "How it works",
      builtWith: "Built with",
      released: "Released",
      building: "In progress",
      latest: "Latest",
      projects: [
        {
          id: "forge",
          status: "live",
          meta: "Android app · 2026",
          title: "Forge",
          summary:
            "An Android training app that logs every set, reads nutrition labels with the camera, and holds you to your plan with real penalties.",
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
          summary:
            "Spots fights on school CCTV in real time by reading body keypoints, not pixels, then saves the clip and alerts the school.",
          text: "It reads skeletons, not pixels. YOLO26-pose turns every frame into 17 keypoints per person, the service adds how fast each joint moves, and an mLSTM decides fight or no fight from one second of movement. When it fires, it keeps 10 seconds before and after and alerts the school dashboard.",
          stats: [
            ["15,596", "training sequences"],
            ["17", "keypoints per person"],
            ["30", "frames per decision"],
          ],
          tags: ["PyTorch", "YOLO26-pose", "mLSTM", "FastAPI", "OpenCV"],
          links: [{ label: "Code", href: LINKS.fightRepo, kind: "code" }],
          flag: "Paper in progress",
          flagTone: "amber",
          note: "I'm turning this into a research paper: mLSTM compared with LSTM, GRU and Transformer models on the same keypoints, with a leakage-aware test across datasets.",
        },
        {
          id: "qgen",
          status: "live",
          meta: "Senior project · AI service · 2026",
          title: "Exam question generator",
          summary:
            "Writes exam questions from the right textbook pages with a local Arabic model, fully offline, and exports a Word exam with answers.",
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
          id: "shop",
          status: "live",
          meta: "Personal project · 2026",
          title: "Olive-oil shop and delivery system",
          summary:
            "A 3D web shop, an admin dashboard and a driver app that pass one order between them, live.",
          text: "A bilingual online shop where olive-oil bottles, modelled in Blender, turn in 3D in the browser. Orders reach the admin dashboard in real time: the shop accepts them, checks payment and offers them to a driver. The driver's Android app has its own map with turn-by-turn directions, plans routes with several stops, and shows nearby supermarkets to sell to from the truck. As the driver moves, the customer's arrival time and the dashboard update live.",
          stats: [],
          tags: [
            "Next.js",
            "React Three Fiber",
            "Blender",
            "SQLite",
            "Capacitor",
            "Leaflet",
            "OSRM",
            "Docker",
          ],
          links: [],
          flag: "Not adopted",
          flagTone: "neutral",
          note: "I designed and built it on my own initiative for a Syrian olive-oil producer. It was never adopted, the brand is hidden for legal reasons, and the screens use demo data.",
        },
        {
          id: "todo",
          status: "building",
          meta: "Android app · 2026",
          title: "Smart To-Do",
          summary:
            "An Android to-do list you talk to in any Arabic dialect; it reads back what it understood before saving.",
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
          summary:
            "Splits students into fair, balanced classes: ranked by grades, behaviour and attendance, then dealt in a zigzag.",
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
      fightNote:
        "The SCVD test split has only 12 fight videos; scored per video instead of per clip, it reaches 87.9%.",
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
      journey: {
        title: "One order, through all three apps",
        steps: [
          {
            label: "Order",
            title: "The customer orders on the website",
            text: "A bilingual shop with 3D bottles rendered in Blender. Checkout takes cash on delivery or mobile payment.",
            alt: "The shop's home page: a 3D olive-oil bottle among floating olives and leaves, with the brand blurred.",
          },
          {
            label: "Dispatch",
            title: "The dashboard accepts and assigns it",
            text: "New orders, payments to check and drivers' distances update live. The shop accepts the order and offers it to a nearby driver.",
            alt: "Admin dashboard: orders to accept, payments to check, alerts and the week's sales.",
          },
          {
            label: "Deliver",
            title: "The driver app guides the delivery",
            text: "A built-in map with turn-by-turn directions and routes with several stops, plus nearby shops to sell to from the truck.",
            alt: "Driver app in Arabic: turn-by-turn directions on a map, and a list of nearby shops.",
          },
          {
            label: "Track",
            title: "Everyone follows it live",
            text: "The customer's arrival time follows the road as the driver moves, and the dashboard flags drivers who stop or run late.",
            alt: "Dashboard alerts: a driver stopped for 9 minutes, and deliveries completed in 24 to 38 minutes.",
          },
        ],
      },
    },
    about: {
      title: "About",
      bio: "I graduated in Information Technology, AI specialization, from Arab International University in 2026. In our five-person senior project, a school management system, I built the three AI services. I also build Android apps and run a home lab for network security.",
      facts: [
        ["Languages", "Arabic (native), English (excellent)"],
        ["Learning now", "Certifications in AI/ML and cybersecurity"],
        ["Based in", "Damascus, Syria · open to remote"],
      ],
      nowTitle: "Now",
      now: [
        ["Building", "Smart To-Do, an Arabic to-do app you talk to."],
        [
          "Writing",
          "A research paper on mLSTM for skeleton-based fight detection.",
        ],
      ],
    },
    skills: {
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
      title: "Let's talk",
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
      name: "Hussein Al Herk",
      lead: "مهندس ذكاء اصطناعي مبتدئ في دمشق، سوريا.",
      line: "أبني ذكاءً اصطناعياً يعمل على أجهزة حقيقية، وأسلّمه منتجات مكتملة.",
      intro:
        "رؤية حاسوبية على كاميرات المدارس، وذكاء اصطناعي على خوادم دون خدمات سحابية، وتطبيقات أندرويد يثبّتها الناس. أبحث عن وظيفة مبتدئة في الذكاء الاصطناعي أو البرمجيات، في دمشق أو عن بُعد.",
      seeWork: "شاهد أعمالي",
      emailMe: "راسلني",
    },
    pose: {
      caption:
        "ما يقرؤه كاشف الشجار الذي بنيته: 17 نقطة مفصلية للجسم وسرعة حركتها. حرّك المؤشر فوق الشكل أو المسه.",
      label:
        "شكل تفاعلي من 17 نقطة مفصلية داخل مربع كشف. تتبع ذراعه المؤشر، ويُظهر مقياس سرعة حركتها.",
      motion: "السرعة",
      alert: "سريعة",
    },
    work: {
      title: "أبرز الأعمال",
      intro:
        "ستة مشاريع، كلٌّ منها مرسوم كما يعمل فعلاً. أرقام الإصدارات تُجلب مباشرة من GitHub.",
      details: "كيف يعمل",
      builtWith: "التقنيات",
      released: "منشور",
      building: "قيد التطوير",
      latest: "آخر إصدار",
      projects: [
        {
          id: "forge",
          status: "live",
          meta: "تطبيق أندرويد · 2026",
          title: "Forge",
          summary:
            "تطبيق تمارين لأندرويد يسجّل كل مجموعة، ويقرأ جداول القيم الغذائية بالكاميرا، ويُلزمك بخطتك بعقوبات حقيقية.",
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
          summary:
            "يكشف الشجار في كاميرات المدارس لحظياً بقراءة النقاط المفصلية للجسم لا البكسلات، ثم يحفظ المقطع وينبّه إدارة المدرسة.",
          text: "يقرأ الهياكل لا البكسلات. يحوّل YOLO26-pose كل إطار إلى 17 نقطة مفصلية لكل شخص، وتضيف الخدمة سرعة حركة كل مفصل، ثم يقرر نموذج mLSTM إن كان هناك شجار من ثانية واحدة من الحركة. عند الكشف يحفظ 10 ثوانٍ قبل الحدث و10 بعده ويرسل تنبيهاً إلى لوحة إدارة المدرسة.",
          stats: [
            ["15,596", "سلسلة تدريب"],
            ["17", "نقطة مفصلية لكل شخص"],
            ["30", "إطاراً لكل قرار"],
          ],
          tags: ["PyTorch", "YOLO26-pose", "mLSTM", "FastAPI", "OpenCV"],
          links: [{ label: "الكود", href: LINKS.fightRepo, kind: "code" }],
          flag: "ورقة بحثية قيد العمل",
          flagTone: "amber",
          note: "أعمل على تحويله إلى ورقة بحثية: مقارنة mLSTM بنماذج LSTM وGRU وTransformer على النقاط المفصلية نفسها، مع اختبار بين مجموعات البيانات يتجنّب تسرّب البيانات.",
        },
        {
          id: "qgen",
          status: "live",
          meta: "مشروع التخرج · خدمة ذكاء اصطناعي · 2026",
          title: "مولّد أسئلة الامتحانات",
          summary:
            "يكتب أسئلة الامتحانات من صفحات الكتاب المناسبة بنموذج عربي محلي دون إنترنت، ويصدّر امتحان Word مع الإجابات.",
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
          id: "shop",
          status: "live",
          meta: "مشروع شخصي · 2026",
          title: "متجر ونظام توصيل لشركة زيت زيتون",
          summary:
            "متجر إلكتروني ثلاثي الأبعاد ولوحة إدارة وتطبيق مندوب يتناقلون الطلب الواحد مباشرة.",
          text: "متجر إلكتروني بلغتين تدور فيه عبوات زيت الزيتون بشكل ثلاثي الأبعاد في المتصفح، صمّمتها في Blender. تصل الطلبات إلى لوحة الإدارة مباشرة: يقبلها المتجر ويتحقق من الدفع ويعرضها على مندوب. لتطبيق المندوب على أندرويد خريطته الخاصة مع إرشادات منعطفاً بمنعطف، ويخطّط مسارات لعدة طلبات، ويعرض المحلات القريبة للبيع لها من السيارة. ومع تحرّك المندوب يتحدّث وقت وصول الطلب للزبون ولوحة الإدارة مباشرة.",
          stats: [],
          tags: [
            "Next.js",
            "React Three Fiber",
            "Blender",
            "SQLite",
            "Capacitor",
            "Leaflet",
            "OSRM",
            "Docker",
          ],
          links: [],
          flag: "لم يُعتمد",
          flagTone: "neutral",
          note: "صمّمته وطوّرته بمبادرة شخصية لشركة سورية لإنتاج زيت الزيتون، ولم يُعتمد. أخفيت العلامة التجارية لأسباب قانونية، والشاشات ببيانات تجريبية.",
        },
        {
          id: "todo",
          status: "building",
          meta: "تطبيق أندرويد · 2026",
          title: "مهامي الذكية",
          summary:
            "قائمة مهام لأندرويد تتحدث إليها بأي لهجة عربية، وتقرأ ما فهمته قبل الحفظ.",
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
          summary:
            "يوزّع الطلاب على شُعب متوازنة وعادلة: ترتيب حسب العلامات والسلوك والحضور، ثم توزيع متعرّج.",
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
      fightNote:
        "قسم الاختبار في SCVD يضم 12 مقطع شجار فقط؛ وعند التقييم لكل مقطع فيديو بدل كل جزء تصل الدقة إلى 87.9%.",
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
      journey: {
        title: "طلب واحد عبر التطبيقات الثلاثة",
        steps: [
          {
            label: "الطلب",
            title: "الزبون يطلب من الموقع",
            text: "متجر بلغتين مع عبوات ثلاثية الأبعاد مصمّمة في Blender. الدفع نقداً عند الاستلام أو عبر الدفع بالموبايل.",
            alt: "الصفحة الرئيسية للمتجر: عبوة زيت زيتون ثلاثية الأبعاد بين حبات زيتون وأوراق متطايرة، مع إخفاء العلامة التجارية.",
          },
          {
            label: "التوزيع",
            title: "لوحة الإدارة تقبل الطلب وتوزّعه",
            text: "الطلبات الجديدة والدفعات بانتظار التحقق وبُعد المندوبين تتحدّث مباشرة. يقبل المتجر الطلب ويعرضه على مندوب قريب.",
            alt: "لوحة الإدارة: طلبات بانتظار القبول ودفعات بانتظار التحقق وتنبيهات ومبيعات الأسبوع.",
          },
          {
            label: "التوصيل",
            title: "تطبيق المندوب يقود التوصيل",
            text: "خريطة مدمجة مع إرشادات منعطفاً بمنعطف ومسارات لعدة طلبات، والمحلات القريبة للبيع لها من السيارة.",
            alt: "تطبيق المندوب: إرشادات منعطفاً بمنعطف على الخريطة، وقائمة بالمحلات القريبة.",
          },
          {
            label: "المتابعة",
            title: "الجميع يتابع مباشرة",
            text: "يتبع وقت وصول الطلب للزبون الطريقَ مع تحرّك المندوب، وتنبّه لوحة الإدارة إلى المندوب المتوقف أو المتأخر.",
            alt: "تنبيهات لوحة الإدارة: مندوب متوقف منذ 9 دقائق، وطلبات وصلت خلال 24 إلى 38 دقيقة.",
          },
        ],
      },
    },
    about: {
      title: "نبذة",
      bio: "تخرّجت في تقانة المعلومات، اختصاص الذكاء الاصطناعي، من الجامعة العربية الدولية عام 2026. في مشروع التخرج، نظام لإدارة المدارس بنيناه فريقاً من خمسة، بنيت أنا خدمات الذكاء الاصطناعي الثلاث. وأبني أيضاً تطبيقات أندرويد، ولدي مختبر منزلي لأمن الشبكات.",
      facts: [
        ["اللغات", "العربية (اللغة الأم) والإنجليزية (ممتازة)"],
        ["أتعلّم حالياً", "شهادات في الذكاء الاصطناعي وأمن المعلومات"],
        ["المكان", "دمشق، سوريا · متاح للعمل عن بُعد"],
      ],
      nowTitle: "الآن",
      now: [
        ["أبني", "مهامي الذكية، تطبيق مهام بالعربية تتحدث إليه."],
        ["أكتب", "ورقة بحثية عن نموذج mLSTM لكشف الشجار من الهياكل العظمية."],
      ],
    },
    skills: {
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
      title: "لنتحدث",
      text: "أبحث عن وظيفة مبتدئة في الذكاء الاصطناعي أو تعلّم الآلة أو البرمجة. أسرع طريقة للتواصل معي هي البريد الإلكتروني.",
      copy: "نسخ",
      copied: "تم النسخ",
      footer: "Hussein Al Herk · دمشق، سوريا",
      built: "الكود المصدري على GitHub",
    },
  },
};
