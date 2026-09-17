import { createFileRoute } from "@tanstack/react-router";
import visionImage from "@/assets/project-vision.jpg";
import neuralImage from "@/assets/project-neural.jpg";
import wirelessImage from "@/assets/project-wireless.jpg";
import defenseImage from "@/assets/project-defense.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hussein Al Herk — AI & Cybersecurity" },
      {
        name: "description",
        content:
          "Portfolio of Hussein Al Herk, an AI and cybersecurity specialist building computer vision, machine learning, and secure systems.",
      },
      { property: "og:title", content: "Hussein Al Herk — AI & Cybersecurity" },
      {
        property: "og:description",
        content:
          "Selected AI, computer vision, full-stack, and wireless security work by Hussein Al Herk.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});

const projects = [
  {
    number: "001",
    category: "Computer Vision / NLP",
    title: "AI-Powered School Management System",
    meta: "Senior Project — 2025",
    description:
      "A full-stack school platform with a fine-tuned YOLOv26 model for real-time fight detection and an AI exam-question generator, built collaboratively at Arab International University.",
    tags: ["YOLOv26", "Computer Vision", "NLP", "Python"],
    image: visionImage,
    width: 1280,
    height: 800,
  },
  {
    number: "002",
    category: "Machine Learning",
    title: "AI Hazard Prediction System for Syria",
    meta: "Junior Project — 2024",
    description:
      "Machine-learning models trained on real Syrian datasets to predict environmental and conflict-related hazards, from data cleaning through feature engineering and evaluation.",
    tags: ["scikit-learn", "Pandas", "Feature Engineering"],
    image: neuralImage,
    width: 1024,
    height: 768,
  },
  {
    number: "003",
    category: "Full-Stack Development",
    title: "Financial Reporting Web Application",
    meta: "Personal Project — 2024",
    description:
      "A full-stack application for generating balance sheets and income statements, with monthly and yearly reporting and period-over-period comparisons.",
    tags: ["ASP.NET", "C#", "SQL", "Full-Stack"],
    image: defenseImage,
    width: 1280,
    height: 800,
  },
  {
    number: "004",
    category: "Wireless Security",
    title: "Wireless Network Security — Home Lab",
    meta: "Personal Project — 2026",
    description:
      "A controlled Kali Linux lab for WPA2 testing: capturing and analysing four-way handshakes, then documenting the methodology and findings in a professional write-up.",
    tags: ["Kali Linux", "aircrack-ng", "WPA2", "Hashcat"],
    image: wirelessImage,
    width: 1024,
    height: 768,
  },
];

const toolkit = [
  ["AI / ML", "Python, scikit-learn, YOLOv26, XGBoost, OpenCV, Hugging Face, Pandas, NumPy"],
  ["Cyber", "Penetration testing, OSINT, dark web operations, Wireshark, TCPDump, digital forensics"],
  ["Wireless", "Kali Linux, aircrack-ng, airmon-ng, Hashcat, WPA2 analysis, packet inspection"],
  ["Development", "ASP.NET, C#, SQL, Git, Linux, Jupyter, full-stack development"],
];

function Portfolio() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-foreground">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
        <header className="flex items-center justify-between border-b border-border py-5">
          <a href="#top" className="flex items-center gap-3" aria-label="Hussein Al Herk, back to top">
            <span className="grid size-9 place-items-center rounded-full border border-primary/60 font-mono text-xs font-semibold text-primary">HA</span>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-foreground/70">H. Al Herk</span>
          </a>
          <div className="flex items-center gap-5 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/60">
            <span className="hidden sm:inline">Dossier No. 01</span>
            <span className="hidden md:inline">Rev. 2026</span>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-primary">
              <span className="size-1.5 rounded-full bg-primary" /> Available
            </span>
          </div>
        </header>

        <section id="top" className="grid grid-cols-12 gap-x-0 gap-y-8 border-b border-border py-12 md:gap-x-8 md:py-16 lg:py-20">
          <div className="col-span-12 md:col-span-8">
            <p className="rise mb-7 font-mono text-xs uppercase tracking-[0.35em] text-primary">AI &amp; Cybersecurity — Research Dossier</p>
            <h1 className="rise delay-1 font-mono text-[clamp(3.2rem,12vw,10.5rem)] font-extrabold uppercase leading-[0.86] text-foreground">
              Hussein<br />Al Herk
            </h1>
            <div className="draw mt-9 h-px w-full bg-foreground/20" />
            <p className="rise delay-2 mt-8 max-w-[42ch] text-pretty text-base leading-relaxed text-foreground/75 sm:text-lg">
              IT graduate specialising in machine learning, computer vision, and penetration testing. I build AI systems that work in the real world — and secure the ones that don&apos;t.
            </p>
          </div>
          <aside className="col-span-12 md:col-span-4">
            <div className="rise delay-3 flex h-full flex-col justify-between gap-8">
              <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border">
                {[["3+", "AI Projects"], ["15+", "Certificates"], ["2", "Specialisations"], ["2026", "B.Sc. IT"]].map(([value, label]) => (
                  <div className="bg-background p-5" key={label}>
                    <div className="font-mono text-3xl font-bold text-primary">{value}</div>
                    <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/50">{label}</div>
                  </div>
                ))}
              </div>
              <dl className="space-y-3 font-mono text-[11px] uppercase tracking-[0.15em]">
                <InfoRow label="Location" value="Damascus, Syria" />
                <InfoRow label="Languages" value="Arabic / English" />
                <InfoRow label="Degree" value="B.Sc. IT — AI" last />
              </dl>
            </div>
          </aside>
        </section>

        <section id="projects" className="py-14 md:py-20">
          <SectionHeading number="01" title="Selected Work" aside="4 entries" />
          <div className="grid grid-cols-12 gap-x-0 gap-y-14 md:gap-x-8">
            {projects.map((project, index) => (
              <article className={`group col-span-12 ${index % 3 === 0 ? "md:col-span-7" : index % 3 === 1 ? "md:col-span-5" : index % 3 === 2 ? "md:col-span-5" : "md:col-span-7"}`} key={project.title}>
                <div className={`relative overflow-hidden rounded-lg border border-border bg-secondary ${index % 3 === 0 || index === 3 ? "aspect-[16/10]" : "aspect-[4/3]"}`}>
                  <img src={project.image} alt="" loading="lazy" width={project.width} height={project.height} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]" />
                  <span className="absolute left-4 top-4 rounded-full border border-primary/50 bg-background/80 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-primary backdrop-blur-sm">{project.category}</span>
                </div>
                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/45">{project.meta}</p>
                    <h2 className="font-mono text-xl font-semibold text-foreground transition-colors group-hover:text-primary sm:text-2xl">{project.title}</h2>
                  </div>
                  <span className="font-mono text-xs text-foreground/40">{project.number}</span>
                </div>
                <p className="mt-3 max-w-[58ch] text-pretty text-sm leading-relaxed text-foreground/70">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => <span className="border border-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-foreground/55" key={tag}>{tag}</span>)}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="skills" className="grid grid-cols-12 gap-x-0 gap-y-12 border-t border-border py-14 md:gap-x-12 md:py-20">
          <div className="col-span-12 min-w-0 md:col-span-7">
            <SectionHeading number="02" title="Technical Toolkit" />
            <div className="space-y-6">
              {toolkit.map(([label, value]) => (
                <div className="flex flex-col gap-2 sm:flex-row sm:gap-5" key={label}>
                  <span className="w-28 shrink-0 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/40">{label}</span>
                  <span className="text-sm leading-relaxed text-foreground/80">{value}</span>
                </div>
              ))}
            </div>
          </div>
          <div id="certs" className="col-span-12 min-w-0 md:col-span-5">
            <SectionHeading number="03" title="Credentials" />
            <div className="space-y-4">
              <Credential title="B.Sc. Information Technology" text="AI Specialization — Arab International University, 2026" />
              <Credential title="15+ Certificates" text="Across AI/ML, cybersecurity, and wireless security tracks" />
              <Credential title="2 Specialisations" text="Applied machine learning and network security" />
            </div>
          </div>
        </section>

        <footer id="contact" className="border-t border-border py-14 md:py-20">
          <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.35em] text-primary">04 — Contact</p>
              <h2 className="mt-5 font-mono text-4xl font-semibold uppercase leading-none text-foreground md:text-6xl">Let&apos;s build<br />something secure.</h2>
            </div>
            <div className="flex flex-col gap-4 font-mono text-sm">
              <ContactLink href="mailto:hussenalherk@gmail.com" label="Email — hussenalherk@gmail.com" />
              <ContactLink href="https://github.com/KIRAHERK" label="GitHub — KIRAHERK" external />
              <ContactLink href="https://www.linkedin.com/in/hussein-alherk-7223a037b" label="LinkedIn — Hussein Al Herk" external />
            </div>
          </div>
          <div className="mt-14 flex flex-col gap-2 border-t border-border pt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/35 md:flex-row md:justify-between">
            <span>Hussein Al Herk — Damascus, Syria</span>
            <span>AI · Computer Vision · Cybersecurity</span>
          </div>
        </footer>
      </div>
    </main>
  );
}

function InfoRow({ label, value, last = false }: { label: string; value: string; last?: boolean }) {
  return <div className={`flex justify-between gap-4 pb-2 ${last ? "" : "border-b border-border"}`}><dt className="text-foreground/45">{label}</dt><dd className="text-right text-foreground/80">{value}</dd></div>;
}

function SectionHeading({ number, title, aside }: { number: string; title: string; aside?: string }) {
  return <div className="mb-9 flex items-end justify-between"><h2 className="font-mono text-sm font-semibold uppercase tracking-[0.25em] text-foreground/70"><span className="text-primary">{number}</span> — {title}</h2>{aside && <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/40">{aside}</span>}</div>;
}

function Credential({ title, text }: { title: string; text: string }) {
  return <div className="rounded-lg border border-border bg-secondary p-5"><h3 className="font-mono text-xs uppercase tracking-[0.2em] text-primary">{title}</h3><p className="mt-2 text-sm leading-relaxed text-foreground/75">{text}</p></div>;
}

function ContactLink({ href, label, external = false }: { href: string; label: string; external?: boolean }) {
  return <a href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined} className="group flex min-w-0 items-start gap-3 text-foreground/80 transition-colors hover:text-primary"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-foreground/40 transition-colors group-hover:bg-primary" /><span className="min-w-0 break-words uppercase tracking-[0.12em]">{label}</span></a>;
}