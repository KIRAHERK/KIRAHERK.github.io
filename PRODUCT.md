# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Primary: employers.** Recruiters and hiring managers filling junior AI/ML or software roles, in Damascus or remote. They skim fast, often on a phone, and decide in under a minute whether to email.
- **Secondary: clients.** Businesses that want a system built, licensed or bought. For example, gyms and coaches who want Forge under their own brand (Forge's README sends them to this site). Clients are a bonus, not the main audience.

## Product Purpose

The personal portfolio of Hussein Al Herk, a junior AI engineer in Damascus, Syria. It exists to win interviews for junior AI/ML or software roles, and project inquiries from businesses. Success is an interview email or a project inquiry.

## Positioning

What a visitor should remember after 30 seconds, in this order:

1. **AI that runs on real hardware, with limited resources.** Real-time computer vision on school CCTV, and retrieval plus a local language model on a school server with no cloud.
2. **Ships complete products, end to end.** Android apps with real releases that update themselves, and a web shop, admin dashboard and driver app working as one system. Not just models in notebooks.

## Operating Context

- Bilingual: English at `/`, Arabic at `/ar`, with full right-to-left layout.
- Static site on GitHub Pages (React with TanStack Start, prerendered). No server and no form backend; contact is by email, GitHub and LinkedIn.
- Many visitors arrive on phones.

## Capabilities and Constraints

- All copy lives in `src/content.ts`, in both languages; layout in `src/components/`.
- Forge and Smart To-Do cards show their latest GitHub release live, with a stored fallback.
- Project status words in use: released, in progress, not adopted, paper in progress.
- Must work without JavaScript (prerendered) and respect reduced motion.

## Brand Commitments

- The name is always written "Hussein Al Herk" in Latin script, on the Arabic page too.
- **The olive-oil shop and delivery system:** the client's brand stays hidden for legal reasons, everywhere, including file names. It is described as a personal project that was never adopted, and its screens use demo data.
- **The financial reporting app stays private:** no product name and no screenshots.
- **The research paper is a work in progress:** no venue or co-author is named until confirmed.
- **The look stays professional and familiar:** the clean grammar of the best engineer portfolios (a clear identity column, real screenshots and diagrams, one typeface, neutral colours, one accent), executed at high craft. No themed or costume worlds: a wood-and-brass inlay and a Damascus street-sign look were both rejected as "goofy".

## Evidence on Hand

- Repositories and releases: Forge (Android, released), Smart To-Do (Android, in progress), fight detection, exam question generator, and the team's senior-project repository (class distributor).
- Numbers with sources: fight detection 81% on the held-out SCVD real-CCTV test split (87.9% when scored per video; the split has only 12 fight videos, so give context), 73% and 71% on RWF-2000 test and validation, 15,596 training sequences; exam generator 23+ indexed books, 5 question types, 6 Bloom levels. Forge (from its README): 85 gym and home exercises; 35 Syrian dishes with sourced nutrition values, 30 of them measured in an accredited lab (Hoteit et al., F1000Research 2021).
- Screenshots in `public/work/`: Forge, Smart To-Do, and the anonymised shop system.
- Absent, and not to be invented: testimonials, client logos, employment history beyond projects.

## Product Principles

1. **Prove, don't claim.** Every claim points to code, a release, a screenshot, or a number with its context.
2. **Show where it runs.** Cameras, offline servers and phones are part of the story, not footnotes.
3. **Finished work leads.** Shipped work comes first; in-progress and not-adopted work is labelled honestly.
4. **A 30-second skim on a phone** gives the role, the proof and the way to get in touch.
5. **Arabic and English are equals.**

## Accessibility & Inclusion

WCAG AA contrast, full keyboard access with visible focus, reduced motion respected, and right-to-left parity on the Arabic page.
