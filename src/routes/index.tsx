import { createFileRoute } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { ArrowDown, ArrowUpRight, Check, Copy } from "lucide-react";
import { PoseFigure } from "@/components/PoseFigure";

const EMAIL = "hussenalherk@gmail.com";
const GITHUB = "https://github.com/KIRAHERK";
const LINKEDIN = "https://www.linkedin.com/in/husseinalherk";
const FIGHT_REPO = "https://github.com/KIRAHERK/fight-detection-mlstm";
const QGEN_REPO = "https://github.com/KIRAHERK/arabic-exam-question-generator";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hussein Al Herk — AI Engineer" },
      {
        name: "description",
        content:
          "Hussein Al Herk, junior AI engineer in Damascus: real-time fight detection from CCTV pose keypoints, a fully local Arabic RAG exam generator, and hands-on network security.",
      },
      { property: "og:title", content: "Hussein Al Herk — AI Engineer" },
      {
        property: "og:description",
        content: "Computer vision, RAG and security work by Hussein Al Herk, with real results on real data.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Portfolio,
});

const fightResults = [
  { set: "SCVD real CCTV", note: "held-out test split", n: "547", acc: 81, f1: ["0.78", "0.84"] },
  { set: "RWF-2000", note: "held-out test clips", n: "1,800", acc: 73, f1: ["0.74", "0.72"] },
  { set: "RWF-2000 validation", note: "", n: "3,600", acc: 71, f1: ["0.70", "0.71"] },
];

const pipeline = [
  ["CCTV stream", "RTSP / IP / USB cameras"],
  ["YOLO26-pose", "17 keypoints per person"],
  ["Velocity", "170 features per frame"],
  ["mLSTM", "3 layers × 384, 30-frame window"],
  ["Alert", "20 s clip + webhook to dashboard"],
];

const moreWork = [
  {
    year: "2026",
    kind: "Personal lab",
    title: "Wireless Network Security Home Lab",
    text: "Isolated Kali Linux lab on my own equipment for WPA2 testing: captured and analysed four-way handshakes, tested password strength, wrote up the method and findings.",
    tags: ["Kali Linux", "aircrack-ng", "Hashcat", "Wireshark"],
  },
  {
    year: "2025",
    kind: "Junior project",
    title: "AI Hazard Prediction System for Syria",
    text: "Machine-learning models trained on real Syrian datasets to predict environmental and conflict-related hazards, from data cleaning and feature engineering to evaluation.",
    tags: ["scikit-learn", "pandas", "Feature engineering"],
  },
  {
    year: "2024",
    kind: "Personal project",
    title: "Financial Reporting Web App",
    text: "Full-stack ASP.NET app that builds monthly and yearly balance sheets and income statements, with period-over-period comparison.",
    tags: ["ASP.NET", "C#", "SQL"],
  },
];

const toolkit = [
  ["Vision & ML", ["PyTorch", "Ultralytics YOLO", "OpenCV", "scikit-learn", "XGBoost", "pandas", "NumPy"]],
  ["LLMs & retrieval", ["RAG", "Ollama", "Qdrant", "BM25 hybrid search", "sentence-transformers", "Hugging Face", "Arabic NLP"]],
  ["Backend", ["Python", "FastAPI", "C#", "ASP.NET", "SQL", "REST APIs", "Git", "Linux"]],
  ["Security", ["Kali Linux", "Wireshark", "tcpdump", "aircrack-ng", "Hashcat", "OSINT"]],
] as const;

function Portfolio() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />
      <main>
        <Hero />
        <Work />
        <Toolkit />
        <Background />
        <Contact />
      </main>
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-rule bg-paper/95">
      <div className="mx-auto flex max-w-[1320px] items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
        <a href="#top" className="group flex items-center gap-3" aria-label="Hussein Al Herk, back to top">
          <span className="grid size-8 place-items-center border-[1.5px] border-ultra font-mono text-[11px] font-medium text-ultra transition-colors group-hover:bg-ultra group-hover:text-paper">
            HA
          </span>
          <span className="display-wide hidden text-[13px] font-semibold uppercase tracking-[0.06em] sm:inline">Hussein Al Herk</span>
        </a>
        <nav aria-label="Sections" className="flex items-center gap-1 sm:gap-2">
          {[["Work", "#work"], ["Toolkit", "#toolkit"], ["Background", "#background"]].map(([label, href]) => (
            <a key={href} href={href} className="label hidden px-2.5 py-2 text-ink-soft transition-colors hover:text-ultra md:inline-block">
              {label}
            </a>
          ))}
          <a href="#contact" className="label ml-1 inline-flex items-center gap-2 border-[1.5px] border-ink px-3 py-2 text-ink transition-colors hover:border-ultra hover:bg-ultra hover:text-paper">
            <span className="size-1.5 rounded-full bg-[oklch(0.62_0.15_150)]" aria-hidden="true" />
            Open to work
          </a>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="graph-paper border-b border-rule">
      <div className="mx-auto grid max-w-[1320px] grid-cols-12 gap-y-10 px-5 pb-14 pt-12 sm:px-8 md:gap-x-10 lg:pb-20 lg:pt-16">
        <div className="col-span-12 flex min-w-0 flex-col lg:col-span-7">
          <p className="label rise text-ultra">Junior AI engineer — Damascus, Syria · open to remote</p>

          <h1 className="rise d1 relative mt-14 w-fit pr-2">
            <span className="display-wide block text-[clamp(2.75rem,8.4vw,7.4rem)] font-extrabold uppercase leading-[0.86] tracking-[-0.01em]">
              Hussein
            </span>
            <span className="display-wide block text-[clamp(2.75rem,8.4vw,7.4rem)] font-extrabold uppercase leading-[0.86] tracking-[-0.01em]">
              Al Herk
            </span>
            <span aria-hidden="true" className="box-in pointer-events-none absolute -inset-x-3 -bottom-3 -top-3 border-[1.5px] border-ultra" />
            <span aria-hidden="true" className="label rise d3 pointer-events-none absolute -left-3 -top-[33px] bg-ultra px-2 py-[3px] tracking-[0.08em] text-paper normal-case">
              engineer 0.98
            </span>
          </h1>

          <p className="rise d2 mt-10 max-w-[34rem] text-[1.1875rem] leading-[1.6] text-ink sm:text-[1.3125rem]">
            I build computer-vision and retrieval systems that run on real hardware: a CCTV fight detector that holds up on
            footage it never trained on, and an Arabic exam generator that runs with no cloud at all. I also test the
            networks those systems sit on.
          </p>

          <div className="rise d3 mt-9 flex flex-wrap items-center gap-3">
            <a href="#work" className="label inline-flex min-h-11 items-center gap-2 bg-ultra px-5 text-paper transition-[filter] hover:brightness-110">
              See the work <ArrowDown className="size-3.5" aria-hidden="true" />
            </a>
            <a href={`mailto:${EMAIL}`} className="label inline-flex min-h-11 items-center gap-2 border-[1.5px] border-ink px-5 text-ink transition-colors hover:border-ultra hover:text-ultra">
              Email me
            </a>
            <span className="flex items-center gap-4 pl-1">
              <ExtLink href={GITHUB}>GitHub</ExtLink>
              <ExtLink href={LINKEDIN}>LinkedIn</ExtLink>
            </span>
          </div>
        </div>

        <figure className="rise d4 col-span-12 min-w-0 lg:col-span-5">
          <div className="border-[1.5px] border-ink bg-paper">
            <div className="flex items-center justify-between border-b border-rule px-4 py-2.5">
              <span className="label text-ink">cam-01 · live</span>
              <span className="label tnum text-ink-faint">15 fps</span>
            </div>
            <PoseFigure className="h-[380px] sm:h-[440px] lg:h-[470px]" />
          </div>
          <figcaption className="mt-3 max-w-[30rem] text-[0.9375rem] leading-relaxed text-ink-soft">
            <span className="label mr-2 text-ultra">Fig. 1</span>
            What my fight detector looks at: 17 keypoints per person, how fast each joint moves, and 30 frames per decision.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function Work() {
  return (
    <section id="work" className="mx-auto max-w-[1320px] px-5 pb-6 pt-16 sm:px-8 lg:pt-24">
      <SectionHead n="01" title="Selected work" aside="Senior project, Arab International University, 2026 · my part: the AI modules in a team of 4" />

      {/* Case study A: fight detection */}
      <article className="grid grid-cols-12 gap-y-10 border-t-[1.5px] border-ink pt-10 md:gap-x-10">
        <div className="col-span-12 min-w-0 lg:col-span-5">
          <p className="label text-ink-faint">Computer vision · real-time</p>
          <h3 className="display-wide mt-3 text-[clamp(1.75rem,3.2vw,2.6rem)] font-bold uppercase leading-[0.95]">Fight detection for school CCTV</h3>
          <p className="mt-6 text-[1.0625rem] leading-[1.7] text-ink">
            Instead of classifying raw pixels, the model reads skeletons. YOLO26-pose turns each frame into body keypoints, the
            system adds per-joint velocity, and an mLSTM (from the 2024 xLSTM paper) decides fight or no fight over a
            one-second window. Skeletons make it far less sensitive to camera angle and lighting.
          </p>
          <p className="mt-4 text-[1.0625rem] leading-[1.7] text-ink">
            It ships as a FastAPI service that watches several cameras at once, keeps a rolling buffer, saves 10 seconds
            before and after each incident, and pings the school dashboard.
          </p>
          <Tags items={["PyTorch", "YOLO26-pose", "mLSTM", "Focal loss", "FastAPI", "OpenCV"]} />
          <div className="mt-7 flex flex-wrap gap-5">
            <ExtLink href={FIGHT_REPO}>Code on GitHub</ExtLink>
          </div>
        </div>

        <div className="col-span-12 min-w-0 lg:col-span-7">
          <ol className="grid grid-cols-1 gap-px border border-rule bg-rule sm:grid-cols-5" aria-label="Detection pipeline">
            {pipeline.map(([step, detail], i) => (
              <li key={step} className="relative bg-paper px-4 py-4">
                <span className={`label tnum ${i === pipeline.length - 1 ? "text-alert" : "text-ultra"}`}>{String(i + 1).padStart(2, "0")}</span>
                <p className="display-tight mt-2 text-[1.05rem] font-bold uppercase leading-tight tracking-[0.02em]">{step}</p>
                <p className="mt-1 text-[0.875rem] leading-snug text-ink-soft">{detail}</p>
              </li>
            ))}
          </ol>

          <div className="mt-8">
            <div className="flex items-baseline justify-between gap-4">
              <p className="label text-ink">Accuracy on three evaluation sets</p>
              <p className="label hidden text-ink-faint sm:block">F1 fight / no-fight</p>
            </div>
            <ul className="mt-4 space-y-5">
              {fightResults.map((r) => (
                <li key={r.set}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <p className="text-[1rem]">
                      <span className="font-semibold">{r.set}</span>
                      {r.note && <span className="text-ink-soft"> — {r.note}</span>}
                    </p>
                    <p className="label tnum text-ink-soft">
                      n={r.n} · F1 {r.f1[0]} / {r.f1[1]}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center gap-3">
                    <div className="relative h-7 flex-1 bg-paper-deep" role="img" aria-label={`${r.acc}% accuracy`}>
                      <div className="draw-x absolute inset-y-0 left-0 bg-ultra" style={{ width: `${r.acc}%`, opacity: r.acc === 81 ? 1 : 0.45 }} />
                      <div className="absolute inset-y-0 left-1/2 w-px bg-ink/25" aria-hidden="true" />
                    </div>
                    <span className="display-wide tnum w-16 text-right text-[1.5rem] font-bold leading-none">{r.acc}%</span>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-5 max-w-[40rem] text-[0.9375rem] leading-relaxed text-ink-soft">
              Trained on 15,596 thirty-frame sequences. The 81% is on held-out real surveillance footage, the closest match to
              what a school camera actually sees. The thin line marks 50%.
            </p>
          </div>
        </div>
      </article>

      {/* Case study B: RAG question generator */}
      <article className="mt-20 grid grid-cols-12 gap-y-10 border-t-[1.5px] border-ink pt-10 md:gap-x-10 lg:mt-28">
        <div className="order-2 col-span-12 min-w-0 lg:order-1 lg:col-span-7">
          <RetrievalPanel />
        </div>
        <div className="order-1 col-span-12 min-w-0 lg:order-2 lg:col-span-5">
          <p className="label text-ink-faint">LLMs · retrieval · Arabic</p>
          <h3 className="display-wide mt-3 text-[clamp(1.75rem,3.2vw,2.6rem)] font-bold uppercase leading-[0.95]">Exam questions from the Syrian curriculum</h3>
          <p className="mt-6 text-[1.0625rem] leading-[1.7] text-ink">
            A teacher picks a grade, a subject and a few chapters. The service retrieves the right textbook passages and a local
            LLM writes questions grounded in them, then exports a ready-to-print Word exam with an answer key, right-to-left for Arabic.
          </p>
          <p className="mt-4 text-[1.0625rem] leading-[1.7] text-ink">
            Retrieval is hybrid: BM25 for exact terms, Qdrant vectors for meaning, merged with reciprocal rank fusion. Everything
            runs on one machine through Ollama, so no student or school data leaves the building.
          </p>
          <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-rule pt-5">
            {[
              ["23+", "curriculum books indexed"],
              ["~12k", "text chunks searchable"],
              ["5", "question types"],
              ["6", "Bloom's levels"],
            ].map(([v, l]) => (
              <div key={l}>
                <dt className="display-wide tnum text-[1.6rem] font-bold leading-none">{v}</dt>
                <dd className="mt-1 text-[0.9375rem] text-ink-soft">{l}</dd>
              </div>
            ))}
          </dl>
          <Tags items={["RAG", "Ollama", "command-r7b-arabic", "Qdrant", "BM25", "FastAPI", "python-docx"]} />
          <div className="mt-7 flex flex-wrap gap-5">
            <ExtLink href={QGEN_REPO}>Code on GitHub</ExtLink>
          </div>
        </div>
      </article>

      {/* Smaller work */}
      <div className="mt-20 lg:mt-28">
        <p className="label text-ink">More work</p>
        <ul className="mt-4 border-t-[1.5px] border-ink">
          {moreWork.map((w) => (
            <li key={w.title} className="grid grid-cols-12 gap-x-6 gap-y-2 border-b border-rule py-7">
              <div className="col-span-12 flex items-baseline gap-3 md:col-span-2 md:block">
                <p className="display-wide tnum text-[1.4rem] font-bold leading-none">{w.year}</p>
                <p className="label text-ink-faint md:mt-2">{w.kind}</p>
              </div>
              <div className="col-span-12 min-w-0 md:col-span-6">
                <h3 className="display-wide text-[1.15rem] font-semibold uppercase leading-tight">{w.title}</h3>
                <p className="mt-2 max-w-[38rem] text-[1rem] leading-[1.65] text-ink-soft">{w.text}</p>
              </div>
              <div className="col-span-12 flex flex-wrap content-start gap-1.5 md:col-span-4 md:justify-end">
                {w.tags.map((t) => (
                  <span key={t} className="label border border-rule px-2 py-1 text-ink-soft">{t}</span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// RRF with k = 60: score = Σ 1 / (60 + rank)
const bm25 = [["p. 11", 1], ["p. 14", 2], ["p. 21", 3]] as const;
const dense = [["p. 14", 1], ["p. 21", 2], ["p. 17", 3]] as const;
const fused = [["p. 14", "0.0325"], ["p. 21", "0.0320"], ["p. 11", "0.0164"], ["p. 17", "0.0159"]] as const;

function RetrievalPanel() {
  return (
    <div className="border-[1.5px] border-ink bg-paper">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rule px-4 py-2.5">
        <span className="label text-ink">POST /questions/generate</span>
        <span className="label text-ink-faint">illustrative run</span>
      </div>

      <div className="border-b border-rule px-4 py-4">
        <p className="label text-ink-faint">Request</p>
        <p className="mt-2 font-mono text-[0.8125rem] leading-relaxed text-ink">
          book <span className="text-ultra">12-science</span> · chapters <span className="text-ultra">1–2</span> · mcq{" "}
          <span className="text-ultra">6</span> · bloom <span className="text-ultra">remember, understand</span>
        </p>
        <p lang="ar" dir="rtl" className="font-arabic mt-2 text-[1rem] text-ink-soft">
          الفصل ١: الجهاز العصبي · الفصل ٢: النسيج العصبي
        </p>
      </div>

      <div className="grid grid-cols-1 gap-px bg-rule sm:grid-cols-3">
        <RankCol title="BM25 · keywords" rows={bm25.map(([p, r]) => [p, `#${r}`] as const)} />
        <RankCol title="Qdrant · meaning" rows={dense.map(([p, r]) => [p, `#${r}`] as const)} />
        <RankCol title="RRF fused (k=60)" rows={fused} strong />
      </div>

      <div className="border-t border-rule px-4 py-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="label text-ink-faint">Generated · MCQ · remember</p>
          <p className="label text-ink-faint">source p. 14</p>
        </div>
        <div lang="ar" dir="rtl" className="font-arabic mt-3">
          <p className="text-[1.125rem] leading-relaxed text-ink">الوحدة البنائية والوظيفية في الجهاز العصبي هي:</p>
          <ol className="mt-3 grid grid-cols-2 gap-2 text-[1rem]">
            {[
              ["أ", "العصبون", true],
              ["ب", "النفرون", false],
              ["ج", "الليف العضلي", false],
              ["د", "الخلية الدبقية", false],
            ].map(([k, t, ok]) => (
              <li key={k as string} className={`flex items-center gap-2 border px-3 py-2 ${ok ? "border-ultra bg-ultra-soft text-ink" : "border-rule text-ink-soft"}`}>
                <span className="font-mono text-[0.75rem]">{k}</span>
                <span>{t}</span>
                {ok && <Check className="ms-auto size-4 text-ultra" aria-label="correct answer" />}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

function RankCol({ title, rows, strong = false }: { title: string; rows: ReadonlyArray<readonly [string, string]>; strong?: boolean }) {
  return (
    <div className="bg-paper px-4 py-4">
      <p className={`label ${strong ? "text-ultra" : "text-ink-faint"}`}>{title}</p>
      <ul className="mt-3 space-y-1.5">
        {rows.map(([p, v], i) => (
          <li key={p} className={`flex items-center justify-between gap-3 px-2 py-1.5 font-mono text-[0.8125rem] ${strong && i < 2 ? "bg-ultra text-paper" : "bg-paper-deep text-ink"}`}>
            <span>{p}</span>
            <span className="tnum">{v}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Toolkit() {
  return (
    <section id="toolkit" className="mt-16 border-y border-rule bg-paper-deep lg:mt-24">
      <div className="mx-auto max-w-[1320px] px-5 py-16 sm:px-8 lg:py-20">
        <SectionHead n="02" title="Toolkit" aside="What I reach for, grouped by job" />
        <div className="grid grid-cols-1 gap-px border border-rule bg-rule md:grid-cols-2">
          {toolkit.map(([label, items]) => (
            <div key={label} className="bg-paper-deep px-5 py-6 sm:px-7">
              <h3 className="display-wide text-[1rem] font-bold uppercase">{label}</h3>
              <p className="mt-3 text-[1.0625rem] leading-[1.75] text-ink">
                {items.map((it, i) => (
                  <span key={it}>
                    <span className="whitespace-nowrap">{it}</span>
                    {i < items.length - 1 && <span className="px-2 text-ultra" aria-hidden="true">/</span>}{" "}
                  </span>
                ))}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Background() {
  return (
    <section id="background" className="mx-auto max-w-[1320px] px-5 py-16 sm:px-8 lg:py-24">
      <SectionHead n="03" title="Background" />
      <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
        <div className="min-w-0">
          <p className="label text-ink-faint">Education</p>
          <h3 className="display-wide mt-3 text-[1.15rem] font-bold uppercase leading-tight">Arab International University</h3>
          <p className="mt-2 text-[1rem] leading-[1.65] text-ink-soft">Bachelor of Information Technology, Artificial Intelligence specialization.</p>
          <p className="label tnum mt-3 text-ink">Oct 2021 – Aug 2026</p>
        </div>
        <div className="min-w-0">
          <p className="label text-ink-faint">In progress</p>
          <h3 className="display-wide mt-3 text-[1.15rem] font-bold uppercase leading-tight">Certification tracks</h3>
          <p className="mt-2 text-[1rem] leading-[1.65] text-ink-soft">
            Working through certifications in AI/ML, cybersecurity and wireless security, plus self-study on Coursera, fast.ai and Kaggle.
          </p>
        </div>
        <div className="min-w-0">
          <p className="label text-ink-faint">Languages</p>
          <h3 className="display-wide mt-3 text-[1.15rem] font-bold uppercase leading-tight">Arabic · English</h3>
          <p className="mt-2 text-[1rem] leading-[1.65] text-ink-soft">Arabic is my first language. My English is excellent for reading, writing and meetings.</p>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <footer id="contact" className="bg-ink text-paper">
      <div className="mx-auto max-w-[1320px] px-5 pb-10 pt-16 sm:px-8 lg:pt-24">
        <p className="label text-[oklch(0.8_0.08_268)]">04 — Contact</p>
        <h2 className="display-wide mt-6 max-w-[16ch] text-[clamp(2.4rem,6.4vw,5.4rem)] font-extrabold uppercase leading-[0.9]">
          Got a camera, a corpus or a network?
        </h2>
        <p className="mt-6 max-w-[34rem] text-[1.1875rem] leading-[1.6] text-paper/80">
          I'm looking for a junior AI or ML engineering role, in Damascus or remote. The fastest way to reach me is email.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a href={`mailto:${EMAIL}`} className="display-wide inline-flex min-h-12 items-center border-[1.5px] border-paper px-5 text-[clamp(0.95rem,2.4vw,1.25rem)] font-semibold transition-colors hover:bg-paper hover:text-ink">
            {EMAIL}
          </a>
          <button
            type="button"
            onClick={copy}
            className="label inline-flex min-h-12 cursor-pointer items-center gap-2 border-[1.5px] border-paper/40 px-4 text-paper transition-colors hover:border-paper"
          >
            {copied ? <Check className="size-3.5" aria-hidden="true" /> : <Copy className="size-3.5" aria-hidden="true" />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>

        <div className="mt-8 flex flex-wrap gap-6">
          <ExtLink href={GITHUB} dark>GitHub — KIRAHERK</ExtLink>
          <ExtLink href={LINKEDIN} dark>LinkedIn — husseinalherk</ExtLink>
        </div>

        <div className="label mt-16 flex flex-col gap-2 border-t border-paper/20 pt-6 text-paper/55 sm:flex-row sm:justify-between">
          <span>Hussein Al Herk · Damascus, Syria</span>
          <span>Computer vision · RAG · Security</span>
        </div>
      </div>
    </footer>
  );
}

function SectionHead({ n, title, aside }: { n: string; title: string; aside?: string }) {
  return (
    <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <h2 className="flex items-baseline gap-4">
        <span className="label tnum text-ultra">{n}</span>
        <span className="display-wide text-[clamp(1.5rem,3vw,2.1rem)] font-extrabold uppercase leading-none">{title}</span>
      </h2>
      {aside && <p className="max-w-[36rem] text-[0.9375rem] leading-snug text-ink-soft md:text-right">{aside}</p>}
    </div>
  );
}

function Tags({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Technologies">
      {items.map((t) => (
        <li key={t} className="label border border-rule px-2 py-1 text-ink-soft">{t}</li>
      ))}
    </ul>
  );
}

function ExtLink({ href, children, dark = false }: { href: string; children: ReactNode; dark?: boolean }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`label group inline-flex items-center gap-1 border-b-[1.5px] pb-1 transition-colors ${
        dark ? "border-paper/40 text-paper hover:border-paper" : "border-ink/30 text-ink hover:border-ultra hover:text-ultra"
      }`}
    >
      {children}
      <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
    </a>
  );
}
