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
  tagline: string;
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

/** One thing I can build, with the project that proves it. */
export type Ability = {
  icon: "vision" | "llm" | "android" | "system";
  title: string;
  text: string;
  proof: string;
  project: ProjectId;
  tools: string[];
};

export type Content = {
  meta: { title: string; description: string };
  skip: string;
  nav: {
    abilities: string;
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
  abilities: {
    title: string;
    intro: string;
    seeProject: string;
    items: Ability[];
  };
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
    /** Labels for the hold-to-talk demo (a gesture demo: nothing is recorded). */
    voice: {
      hold: string;
      holdAria: string;
      recording: string;
      slide: string;
      release: string;
      play: string;
      pause: string;
      discard: string;
      heard: string;
      demo: string;
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
    eyebrow: string;
    title: string;
    bio: string;
    facts: Array<[string, string]>;
    timelineTitle: string;
    /** Timeline entries whose "when" equals this get the pulsing "now" dot. */
    nowLabel: string;
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
      abilities: "What I do",
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
    abilities: {
      title: "What I can do",
      intro:
        "Four things I can build for your team, each one backed by a real project further down.",
      seeProject: "See the project",
      items: [
        {
          icon: "vision",
          title: "Computer vision on real cameras",
          text: "Real-time fight detection on school CCTV: pose keypoints, how fast they move, and an mLSTM that decides from one second of video.",
          proof: "81% on real CCTV footage (SCVD)",
          project: "fight",
          tools: ["PyTorch", "YOLO26-pose", "OpenCV", "FastAPI"],
        },
        {
          icon: "llm",
          title: "Offline AI that reads Arabic",
          text: "Retrieval and a local Arabic language model on a school server with no internet, turning textbooks into graded exam questions.",
          proof: "23+ curriculum books indexed",
          project: "qgen",
          tools: ["RAG", "Ollama", "Qdrant", "BM25"],
        },
        {
          icon: "android",
          title: "Android apps people install",
          text: "Kotlin and Jetpack Compose apps in Arabic and English, released on GitHub and updating themselves.",
          proof: "Forge is released; Smart To-Do is in progress",
          project: "forge",
          tools: ["Kotlin", "Jetpack Compose", "Room", "CameraX"],
        },
        {
          icon: "system",
          title: "Complete systems, end to end",
          text: "A web shop, an admin dashboard and a driver app that pass one order between them, live.",
          proof: "3 apps working as one system",
          project: "shop",
          tools: ["Next.js", "SQLite", "Capacitor", "Leaflet"],
        },
      ],
    },
    work: {
      eyebrow: "01 · Work",
      title: "Selected work",
      intro:
        "From real-time vision on school cameras to a full shop-and-delivery system and Android apps with regular releases. Version numbers come straight from GitHub.",
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
            ["35", "Syrian dishes with sourced nutrition values"],
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
          flag: "Paper in progress",
          flagTone: "amber",
          note: "I'm turning this into a research paper: mLSTM compared with LSTM, GRU and Transformer models on the same keypoints, with a leakage-aware test across datasets.",
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
          id: "shop",
          status: "live",
          meta: "Personal project · 2026",
          title: "Olive-oil shop and delivery system",
          tagline:
            "A 3D web shop, an admin dashboard and a driver app, working as one",
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
      voice: {
        hold: "Hold to talk",
        holdAria: "Hold to record a voice note",
        recording: "Recording. Release to keep, Escape to discard.",
        slide: "‹ Slide to cancel",
        release: "Release to cancel",
        play: "Play",
        pause: "Pause",
        discard: "Discard",
        heard: "What the app understood",
        demo: "A demo of the gesture: nothing is recorded.",
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
      eyebrow: "02 · About",
      title: "About",
      bio: "I graduated in Information Technology, AI specialization, from Arab International University in 2026. For our senior project, a team of five built an AI-powered school management system (Laravel backend, Flutter app, React dashboard), and I built its three AI services. Outside coursework I build Android apps and run a home lab for network security, and I'm now turning my fight detector into a research paper.",
      facts: [
        ["Languages", "Arabic (native), English (excellent)"],
        ["Learning now", "Certifications in AI/ML and cybersecurity"],
        ["Based in", "Damascus, Syria · open to remote"],
      ],
      timelineTitle: "Timeline",
      nowLabel: "Now",
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
          "Built a shop and delivery system",
          "A 3D web shop, an admin dashboard and a driver app for an olive-oil producer, on my own initiative. Not adopted.",
        ],
        [
          "2026",
          "Shipped Forge",
          "An Android app in Arabic and English that updates itself.",
        ],
        ["Now", "Building Smart To-Do", "A voice-first to-do app in Arabic."],
        [
          "Now",
          "Writing a research paper",
          "mLSTM for skeleton-based fight detection, with a leakage-aware evaluation.",
        ],
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
      abilities: "ما أقدّمه",
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
    abilities: {
      title: "ما الذي أستطيع بناءه",
      intro:
        "أربعة أمور أستطيع بناءها لفريقك، ولكل منها مشروع حقيقي يثبتها في الأسفل.",
      seeProject: "شاهد المشروع",
      items: [
        {
          icon: "vision",
          title: "رؤية حاسوبية على كاميرات حقيقية",
          text: "كشف الشجار لحظياً من كاميرات المراقبة في المدارس: نقاط الجسم المفصلية وسرعة حركتها، ونموذج mLSTM يقرّر من ثانية واحدة من الفيديو.",
          proof: "دقة 81% على تسجيلات كاميرات حقيقية (SCVD)",
          project: "fight",
          tools: ["PyTorch", "YOLO26-pose", "OpenCV", "FastAPI"],
        },
        {
          icon: "llm",
          title: "ذكاء اصطناعي يقرأ العربية دون إنترنت",
          text: "بحث واسترجاع ونموذج لغوي عربي محلي على خادم مدرسة دون إنترنت، يحوّل الكتب المدرسية إلى أسئلة امتحان مصنّفة.",
          proof: "أكثر من 23 كتاباً مدرسياً مفهرساً",
          project: "qgen",
          tools: ["RAG", "Ollama", "Qdrant", "BM25"],
        },
        {
          icon: "android",
          title: "تطبيقات أندرويد يثبّتها الناس",
          text: "تطبيقات بلغة Kotlin وJetpack Compose بالعربية والإنجليزية، تُنشر عبر GitHub وتحدّث نفسها بنفسها.",
          proof: "Forge منشور، ومهامي الذكية قيد التطوير",
          project: "forge",
          tools: ["Kotlin", "Jetpack Compose", "Room", "CameraX"],
        },
        {
          icon: "system",
          title: "أنظمة كاملة من البداية إلى النهاية",
          text: "متجر إلكتروني ولوحة إدارة وتطبيق مندوب تتناقل الطلب الواحد فيما بينها مباشرة.",
          proof: "ثلاثة تطبيقات تعمل كنظام واحد",
          project: "shop",
          tools: ["Next.js", "SQLite", "Capacitor", "Leaflet"],
        },
      ],
    },
    work: {
      eyebrow: "01 · الأعمال",
      title: "أبرز الأعمال",
      intro:
        "من الرؤية الحاسوبية اللحظية في كاميرات المدارس إلى نظام كامل للبيع والتوصيل وتطبيقات أندرويد بإصدارات منتظمة. أرقام الإصدارات تُجلب مباشرة من GitHub.",
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
            ["35", "طبقاً سورياً بقيم غذائية موثّقة المصدر"],
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
          flag: "ورقة بحثية قيد العمل",
          flagTone: "amber",
          note: "أعمل على تحويله إلى ورقة بحثية: مقارنة mLSTM بنماذج LSTM وGRU وTransformer على النقاط المفصلية نفسها، مع اختبار بين مجموعات البيانات يتجنّب تسرّب البيانات.",
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
          id: "shop",
          status: "live",
          meta: "مشروع شخصي · 2026",
          title: "متجر ونظام توصيل لشركة زيت زيتون",
          tagline:
            "متجر إلكتروني ثلاثي الأبعاد ولوحة إدارة وتطبيق مندوب، تعمل كنظام واحد",
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
      voice: {
        hold: "اضغط مطولاً وتحدث",
        holdAria: "اضغط مطولاً لتسجيل ملاحظة صوتية",
        recording: "جارٍ التسجيل. أفلت للحفظ، أو اضغط Escape للحذف.",
        slide: "‹ اسحب للإلغاء",
        release: "أفلت للإلغاء",
        play: "تشغيل",
        pause: "إيقاف مؤقت",
        discard: "حذف",
        heard: "ما فهمه التطبيق",
        demo: "عرض توضيحي للحركة: لا يُسجَّل أي صوت.",
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
      eyebrow: "02 · نبذة",
      title: "نبذة",
      bio: "تخرّجت في تقانة المعلومات، اختصاص الذكاء الاصطناعي، من الجامعة العربية الدولية عام 2026. في مشروع التخرج بنى فريق من خمسة طلاب نظاماً ذكياً لإدارة المدارس (خادم Laravel وتطبيق Flutter ولوحة تحكم React)، وبنيت أنا خدمات الذكاء الاصطناعي الثلاث فيه. وخارج الدراسة أبني تطبيقات أندرويد، ولدي مختبر منزلي لأمن الشبكات، وأعمل الآن على تحويل كاشف الشجار إلى ورقة بحثية.",
      facts: [
        ["اللغات", "العربية (اللغة الأم) والإنجليزية (ممتازة)"],
        ["أتعلّم حالياً", "شهادات في الذكاء الاصطناعي وأمن المعلومات"],
        ["المكان", "دمشق، سوريا · متاح للعمل عن بُعد"],
      ],
      timelineTitle: "المسيرة",
      nowLabel: "الآن",
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
          "بنيت متجراً ونظام توصيل",
          "متجر ثلاثي الأبعاد ولوحة إدارة وتطبيق مندوب لشركة زيت زيتون، بمبادرة شخصية. لم يُعتمد.",
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
        [
          "الآن",
          "أكتب ورقة بحثية",
          "نموذج mLSTM لكشف الشجار من الهياكل العظمية، مع تقييم يتجنّب تسرّب البيانات.",
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
