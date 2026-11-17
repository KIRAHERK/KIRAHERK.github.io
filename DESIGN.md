---
name: Hussein Al Herk
description: A bilingual engineer portfolio in the category's own clean grammar, where the work and its numbers carry the page.
colors:
  bg: "#fbfbfa"
  surface: "#ffffff"
  sunken: "#f3f3f1"
  line: "#e6e5e2"
  line-strong: "#d3d2ce"
  text: "#18181b"
  text-2: "#52525b"
  text-3: "#63636b"
  accent: "#2550d6"
  ok: "#15803d"
  wip: "#b45309"
  alert: "#dc2626"
  fig-line: "#1f1f23"
  fig-joint: "#fbfbfa"
  fig-track: "#e2e1de"
  fig-label: "#5b5b63"
  fig-mark: "#d97706"
  device-bezel: "#161618"
  bg-dark: "#0b0b0d"
  surface-dark: "#141417"
  sunken-dark: "#111114"
  line-dark: "#25252b"
  line-strong-dark: "#34343b"
  text-dark: "#ececef"
  text-2-dark: "#a6a6ae"
  text-3-dark: "#92929a"
  accent-dark: "#8db0ff"
  ok-dark: "#4ade80"
  wip-dark: "#fbbf24"
  alert-dark: "#f87171"
  fig-line-dark: "#e6e6ea"
  fig-joint-dark: "#111114"
  fig-track-dark: "#2a2a30"
  fig-label-dark: "#a6a6ae"
  fig-mark-dark: "#fbbf24"
typography:
  display:
    fontFamily: "Schibsted Grotesk, Noto Sans Arabic, system-ui, sans-serif"
    fontSize: "3.2rem"
    fontWeight: 600
    lineHeight: 1.04
    letterSpacing: "-0.04em"
  display-phone:
    fontFamily: "Schibsted Grotesk, Noto Sans Arabic, system-ui, sans-serif"
    fontSize: "2.6rem"
    fontWeight: 600
    lineHeight: 1.04
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Schibsted Grotesk, Noto Sans Arabic, system-ui, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 600
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Schibsted Grotesk, Noto Sans Arabic, system-ui, sans-serif"
    fontSize: "1.2rem"
    fontWeight: 600
    lineHeight: 1.375
    letterSpacing: "-0.02em"
  subtitle:
    fontFamily: "Schibsted Grotesk, Noto Sans Arabic, system-ui, sans-serif"
    fontSize: "1.05rem"
    fontWeight: 600
    letterSpacing: "-0.01em"
  lead:
    fontFamily: "Schibsted Grotesk, Noto Sans Arabic, system-ui, sans-serif"
    fontSize: "1.12rem"
    fontWeight: 500
    letterSpacing: "-0.01em"
  body-large:
    fontFamily: "Schibsted Grotesk, Noto Sans Arabic, system-ui, sans-serif"
    fontSize: "16.5px"
    fontWeight: 400
    lineHeight: 1.75
  body:
    fontFamily: "Schibsted Grotesk, Noto Sans Arabic, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.7
  body-small:
    fontFamily: "Schibsted Grotesk, Noto Sans Arabic, system-ui, sans-serif"
    fontSize: "14.5px"
    fontWeight: 400
    lineHeight: 1.625
  meta:
    fontFamily: "Schibsted Grotesk, Noto Sans Arabic, system-ui, sans-serif"
    fontSize: "13.5px"
    fontWeight: 400
  caption:
    fontFamily: "Schibsted Grotesk, Noto Sans Arabic, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 500
  nav:
    fontFamily: "Schibsted Grotesk, Noto Sans Arabic, system-ui, sans-serif"
    fontSize: "12.5px"
    fontWeight: 600
    letterSpacing: "0.14em"
  button:
    fontFamily: "Schibsted Grotesk, Noto Sans Arabic, system-ui, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 500
  link:
    fontFamily: "Schibsted Grotesk, Noto Sans Arabic, system-ui, sans-serif"
    fontSize: "14.5px"
    fontWeight: 500
  pill:
    fontFamily: "Schibsted Grotesk, Noto Sans Arabic, system-ui, sans-serif"
    fontSize: "0.8rem"
    fontWeight: 500
  tag:
    fontFamily: "Schibsted Grotesk, Noto Sans Arabic, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 500
  data:
    fontFamily: "JetBrains Mono, ui-monospace, SFMono-Regular, monospace"
    fontSize: "15px"
    fontWeight: 500
  data-small:
    fontFamily: "JetBrains Mono, ui-monospace, SFMono-Regular, monospace"
    fontSize: "12.5px"
    fontWeight: 400
  arabic:
    fontFamily: "Noto Sans Arabic, Schibsted Grotesk, system-ui, sans-serif"
    fontWeight: 400
    letterSpacing: "0em"
rounded:
  full: "999px"
  panel: "14px"
  frame: "10px"
  node: "7px"
  focus: "6px"
  device: "1.9rem"
spacing:
  gutter-phone: "24px"
  gutter-tablet: "40px"
  gutter-desktop: "64px"
  column-gap: "64px"
  section: "80px"
  section-desktop: "112px"
  project: "64px"
  block: "32px"
components:
  button-primary:
    backgroundColor: "{colors.text}"
    textColor: "{colors.bg}"
    typography: "{typography.button}"
    rounded: "{rounded.full}"
    padding: "0 1.15rem"
    height: "2.75rem"
  button-quiet:
    backgroundColor: "transparent"
    textColor: "{colors.text}"
    typography: "{typography.button}"
    rounded: "{rounded.full}"
    padding: "0 1rem"
    height: "2.75rem"
  button-quiet-hover:
    backgroundColor: "{colors.sunken}"
  button-icon:
    textColor: "{colors.text}"
    rounded: "{rounded.full}"
    size: "2.75rem"
  status-pill:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-2}"
    typography: "{typography.pill}"
    rounded: "{rounded.full}"
    padding: "0 0.65rem"
    height: "1.65rem"
  tag:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-2}"
    typography: "{typography.tag}"
    rounded: "{rounded.full}"
    padding: "4px 10px"
  panel:
    backgroundColor: "{colors.sunken}"
    rounded: "{rounded.panel}"
    padding: "24px 20px"
  panel-wide:
    backgroundColor: "{colors.sunken}"
    rounded: "{rounded.panel}"
    padding: "24px 28px"
  figure-caption:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-2}"
    padding: "12px 16px"
  text-link:
    textColor: "{colors.text}"
    typography: "{typography.link}"
    height: "2.75rem"
  text-link-hover:
    textColor: "{colors.accent}"
  nav-item:
    textColor: "{colors.text-3}"
    typography: "{typography.nav}"
    height: "2.5rem"
  nav-item-active:
    textColor: "{colors.text}"
  section-bar:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.text}"
    typography: "{typography.headline}"
    padding: "12px 24px"
  diagram-node:
    textColor: "{colors.text}"
    rounded: "{rounded.node}"
    padding: "8px 12px"
  diagram-node-strong:
    backgroundColor: "{colors.text}"
    textColor: "{colors.bg}"
    rounded: "{rounded.node}"
    padding: "8px 12px"
  device-frame:
    backgroundColor: "{colors.device-bezel}"
    rounded: "{rounded.device}"
    padding: "5px"
  screenshot-frame:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.frame}"
---

# Design System: Hussein Al Herk

## Overview

**Creative North Star: "The Standard, Played Straight"**

This is the engineer-portfolio grammar every recruiter already knows: a pinned identity column beside a scrolling column of work. It is executed with restraint, not reinvented. There is no theme and no costume. The page is near-white, or near-black when the system is dark, with one grotesque typeface, neutral greys and a single blue. The interest comes from the work itself: real screenshots in device frames, small diagrams that show how each system decides, and numbers set in mono so they read as data.

Density is calm. Desktop has one reading column at about half the container. Sections are well apart (80 to 112px), hairlines separate rows instead of boxes, and soft sunken panels appear only where there is something to look at. Every surface flips with `prefers-color-scheme` through the same named tokens. The Arabic page at /ar mirrors the English one completely; it is not a translation dropped into a left-to-right layout.

One element is allowed to perform: the live pose figure at the top of the work column. It is a canvas skeleton that waves once, rests, reaches for the pointer, and trips a red alert when moved fast. Everything else is quiet and moves once at most. The look stays professional and familiar, as PRODUCT.md commits, and never becomes a themed or costume world.

**Key Characteristics:**
- Sticky identity column on desktop; a single column with sticky section bars on phones.
- Near-white or near-black ground, neutral greys, one blue accent, and an ink-coloured primary pill.
- Schibsted Grotesk for every Latin word, JetBrains Mono only for standalone data, and Noto Sans Arabic for Arabic.
- A flat page: tone and 1px hairlines make the depth, and only device frames cast shadows.
- Full pills for actions and chips; soft 14px panels for screenshots and diagrams.
- English and Arabic as equals, with logical properties and mirrored motion.
- One signature motion, the pose figure; everything else moves once or not at all.

## Colors

The palette is restrained: two neutral grounds that follow the system theme, a ladder of greys, one blue for links and highlights, and three status colours that appear only as dots or inside the figure. Every token has a light value and a `-dark` sibling that swaps in under `prefers-color-scheme: dark`. Components name the token, never the hex.

### Primary
- **Cobalt Link Blue** (`accent`, dark `accent-dark`): the only expressive hue. It is the hover colour for links and "How it works", the active screen dot in the Forge showcase, the headline result and its bar, the final "Alert + clip" pipeline step, and the voice-note mic disc and waveform. It also colours focus outlines, text selection, the caret and native control accents. It is never the background of a section, a panel or a button.

### Neutral
- **Off-White Ground** (`bg`) / **Near-Black Ground** (`bg-dark`): the page. It is also the label colour on the ink pill, so the button inverts with the theme. The `theme-color` meta matches it in both schemes.
- **Pure White Surface** (`surface`) / **Raised Charcoal** (`surface-dark`): the fill for elements that sit on or inside panels. That covers status pills, tags, the figure's caption strip, pipeline step circles, journey step icons and the browser-window frame.
- **Soft Stone** (`sunken`) / **Panel Charcoal** (`sunken-dark`): the panel ground behind every screenshot and diagram, and the quiet button's hover fill.
- **Hairline** (`line`): panel, pill and tag borders, row dividers, the separators between projects, and the empty track of result bars.
- **Firm Hairline** (`line-strong`): quiet-button borders, diagram connectors and node outlines, the inactive journey track, the footer link underline and the scrollbar thumb.
- **Ink** (`text`): headings, primary labels, data values, the primary pill's fill, the strong diagram node, and the active nav line.
- **Graphite** (`text-2`): body copy and captions. Most running text on the page is Graphite, not Ink.
- **Slate** (`text-3`): meta lines, list years, the inactive nav, secondary notes, row labels and the neutral status dot.

### Status
- **Release Green** (`ok`): the dot on "Released" pills.
- **Work Amber** (`wip`): the dot on "In progress" and "Paper in progress" pills, and the bullets of the About section's "Now" list.
- **Alert Red** (`alert`): the pose figure's alert state only. Past the speed threshold, the skeleton, wrists, meter fill and the "fast" label turn red. In light mode that label measures 4.35:1 on the sunken panel, under the 4.5:1 text floor. That is a defect to fix, not a precedent.

### Figure
The canvas reads its own tokens (`--fig-*`, plus `--alert`) at runtime and redraws when the colour scheme changes.
- **Skeleton Ink** (`fig-line`): bones, face points, joint outlines, and the meter fill below the threshold.
- **Joint Fill** (`fig-joint`): the inside of the hollow joints.
- **Meter Track** (`fig-track`): the speed strip's empty track.
- **Meter Label** (`fig-label`): the "Speed" label.
- **Threshold Amber** (`fig-mark`): the threshold tick and the wrist direction arrows.

### Device
- **Device Bezel** (`device-bezel`): the phone frame around app screenshots, with a pure black screen behind the image. It is the one fixed colour that does not flip, because it depicts a physical object.

The stylesheet also maps shadcn names (`primary`, `muted`, `border`, `destructive` and others) onto these tokens for the 404 and error screens. There, shadcn's `accent` is this solid blue, not a soft hover surface.

### Named Rules
**The One Blue Rule.** Blue is the only hue that is not a status colour. It marks links, highlights and focus, always as small marks. It never fills a section, a panel or a button.

**The Ink Pill Rule.** The primary action is ink on the ground: a `text` fill with a `bg` label. It inverts with the theme and is never blue.

**The Dots-Only Rule.** Green, amber and red appear as 6px status dots and inside the pose figure, and nowhere else. They are never text colour, fills or decoration on the page.

## Typography

**Display Font:** Schibsted Grotesk (with Noto Sans Arabic, system-ui, sans-serif)
**Body Font:** Schibsted Grotesk (same stack)
**Label/Mono Font:** JetBrains Mono (with ui-monospace, SFMono-Regular, monospace), for data only
**Arabic Font:** Noto Sans Arabic (with Schibsted Grotesk, system-ui, sans-serif)

The fonts load from Google Fonts: Schibsted Grotesk 400–700, JetBrains Mono 400–500 and Noto Sans Arabic 400–700. The page uses weights 400, 500 and 600.

**Character:** One sturdy grotesque does all the talking. It is tightened at display sizes so the name reads as a wordmark. A plain mono steps in only when a value is data, so numbers look measured rather than decorated.

### Hierarchy
- **Display** (600, 2.6rem on phones and 3.2rem from 640px, line-height 1.04, -0.04em): the name in the identity column, once per page.
- **Headline** (600, 1.75rem, -0.03em): section titles (Selected work, About, Skills, Let's talk).
- **Title** (600, 1.2rem, 1.375, -0.02em): project names.
- **Subtitle** (600, 1.05rem, -0.01em): sub-lists inside a section (More projects, Now).
- **Lead** (500, 1.12rem, -0.01em): the role line under the name, in Ink.
- **Body large** (400, 16.5px, 1.75): the intro, the bio and the contact text, in Graphite.
- **Body** (400, 16px, 1.7): each project's one-sentence summary. The hero line uses the same size, kept to a 32ch measure.
- **Body small** (400, 14.5–15px, 1.625): row text, notes, diagram copy, and the expanded "How it works" text (15px at 1.75).
- **Meta** (400, 13.5px): the line under a project title, in Slate.
- **Caption** (500, 13px): diagram titles. The figure's caption strip uses the same size at 400 with 1.625 line-height.
- **Nav** (600, 12.5px, 0.14em, uppercase): the desktop section nav, and nothing else.
- **Button and link** (500): 0.95rem for buttons, 14.5px for links.
- **Pill and tag** (500): 0.8rem for pills, 12px for tags.
- **Data** (JetBrains Mono 500, 15px): stat values and result percentages.
- **Data small** (JetBrains Mono 400–500, 11.5–13px): version tags, list years, ranks, step numbers and averages, with tabular numerals where values stack.

Measures: 32ch for the hero line, 52ch for section intros and chart notes, 46ch for the contact text, and 60ch for journey captions. Headings use `text-wrap: balance`; paragraphs, list items and captions use `pretty`.

### Named Rules
**The One Typeface Rule.** Every Latin word on both pages is set in Schibsted Grotesk. Hierarchy comes from size, weight (400, 500 or 600) and negative tracking, never from a second display face.

**The Mono Is Data Rule.** JetBrains Mono sets only standalone figures: versions, stat values, percentages, list years, ranks and step numbers. A number inside a sentence or a meta line ("Android app · 2026") stays in the sans. On /ar each mono value is wrapped in `dir="ltr"`.

**The No Tracking In Arabic Rule.** Letter-spacing breaks Arabic letter joining, so any tracked style resets to 0 on Arabic text. The stylesheet enforces this for every tracking class.

Known drift: the /ar build does not yet meet the One Typeface Rule. The Arabic stack puts Noto Sans Arabic first, and Noto Sans Arabic ships its own Latin glyphs. So the Latin runs on /ar (the name, tags, "English", GitHub and LinkedIn) currently render in Noto's Latin rather than Schibsted Grotesk. The rule stands.

## Layout

The page uses the category-standard two-column layout.

- **Container:** centred, max 76rem, with side gutters of 24px on phones, 40px from 640px and 64px from 1024px.
- **Desktop (1024px and up):** two columns set apart with a 64px gap. The identity column is 42% wide, `position: sticky; top: 0`, as tall as the viewport, with 80px vertical padding. It holds the language switch, the name, the role, the line, Email me with GitHub and LinkedIn icon buttons, and then the section nav 64px below. The work column is 52% wide, also with 80px vertical padding, and opens with the figure panel and the intro.
- **Phone and tablet (below 1024px):** one column. The language switch sits top-end, then the name, role, line and actions, then the figure panel 40px below, then the sections. The section nav is hidden. Instead, each section's title row is a sticky bar: at the top, ground-coloured, bleeding to the gutters, with 12px vertical padding and a 44px round mail button at its end. On desktop the bar is static and its mail button is hidden.
- **Vertical rhythm:** sections start 80px apart (112px on desktop), with 32px from a section title to its content. Projects sit 64px apart, and each after the first opens on a hairline with 40px above its title. Inside a project: the meta line sits 6px under the title, then the summary at 16px, the panel at 24px, the stats at 24px and the tags at 20px.
- **Rows, not cards:** facts, skills and "More projects" are definition lists with hairline dividers. From 640px they get a fixed label column: 3.5rem for years, 9.5rem for facts and 11rem for skill groups.
- **Anchors:** `scroll-padding-top: 4.5rem` keeps a jumped-to section clear of the sticky bar. Scrolling is smooth only when reduced motion is not requested.
- **Right-to-left:** /ar sets `dir="rtl"`, and the layout uses logical properties (start/end, inline-start/end). So the identity column moves to the right, bars fill from the right, the journey line grows leftward and outbound arrows flip. Diagrams with two branches are drawn symmetric so they read the same in both directions.

### Named Rules
**The Email In Reach Rule.** Every scroll position has a visible way to email: the Email me pill in the pinned identity column on desktop, or the mail button in the sticky section bar on phones.

**The Mirror Rule.** Anything with a direction, in layout or in motion, uses logical properties or flips under `dir="rtl"`. Nothing is pinned to left or right.

## Elevation & Depth

The page is flat by default, and depth is tonal. Sunken panels sit one step darker than the ground, and white surfaces (pills, caption strips, step circles) sit one step lighter inside them, with 1px hairlines drawing the edges. The only shadows belong to the physical objects shown inside panels: the phone frames and the browser-window screenshots. They are soft and lifted, and on the dark ground they all but disappear.

### Shadow Vocabulary
- **Device lift** (`box-shadow: 0 0 0 1px rgb(0 0 0 / 0.08), 0 22px 40px -24px rgb(0 0 0 / 0.45)`): phone frames around app screenshots.
- **Window lift** (`box-shadow: 0 18px 40px -28px rgb(0 0 0 / 0.35)`): the browser-window frame and the admin-dashboard screenshot in the order journey.

### Named Rules
**The Flat Page Rule.** The page, panels, pills, tags and buttons never cast shadows. A shadow means "this is a device or a window" and nothing else.

## Shapes

There are two shape families: fully round for anything you press or read as a token, and softly cornered rectangles for containers.

- **Fully round (999px):** buttons, icon buttons, status pills, tags, status dots, pipeline and journey step circles, the class distributor's rank tokens, result-bar tracks and fills, and waveform bars.
- **Panel (14px):** the sunken panels that hold every screenshot and diagram, the figure included.
- **Frame (10px):** the browser window and flat screenshot images inside panels.
- **Node (7px):** the boxes in the retrieval-flow diagram.
- **Device (1.9rem outer, 1.55rem screen):** phone frames, with a 5px bezel and a 9:19.5 aspect ratio.
- **Focus (6px):** the corner of the focus outline on elements that have no radius of their own.
- **Lines:** always 1px: borders, dividers, connectors, the nav marker line and the diagram trunk.

The stylesheet also declares a 6/8/12/16px radius scale (`--radius-sm` to `--radius-xl`), but only the 404 and error screens use it. The portfolio's shapes are the ones listed above.

## Components

### Buttons
The buttons are plain and certain; the solid pill is the one thing on the page that asks for something.
- **Shape:** a full pill (999px), at least 2.75rem tall, with a 16px icon and an 8px gap.
- **Primary:** an Ink fill with a ground-coloured label, weight 500 at 0.95rem, padded 0 1.15rem. It is used for Email me, the contact address and Forge's Download for Android, and nothing else.
- **Hover / Active / Focus:** on hover, opacity drops to 0.86 over 0.2s. A press nudges the button 1px down. Focus shows a 2px blue outline at a 3px offset.
- **Quiet:** a transparent pill with a 1px Firm Hairline border and an Ink label, padded 0 1rem. On hover it fills with Soft Stone and the border darkens to Slate. It is used for Copy.
- **Icon:** the quiet pill with no padding, making a 44px circle around an 18px icon. It is used for GitHub, LinkedIn and the mail button in the phone section bar, and each one carries an `aria-label`.

### Chips
- **Status pill:** 1.65rem tall, white surface, 1px hairline, with a Graphite 0.8rem label at weight 500. A 6px dot before the label carries the status: green for released, amber for in progress or paper in progress, and Slate for neutral flags such as "Not adopted". It sits at the end of a project's title row.
- **Tag:** the items of the "Built with" list. White surface, 1px hairline, 12px Graphite text at weight 500, padded 4px 10px, and always `dir="ltr"`. Tags are not interactive.

### Cards / Containers
- **Corner Style:** 14px.
- **Background:** Soft Stone (`sunken`).
- **Shadow Strategy:** none (see Elevation & Depth).
- **Border:** 1px Hairline.
- **Internal Padding:** 24px by 20px, widening to 24px by 28px from 640px. The figure panel runs edge to edge instead, with a white caption strip under a hairline (12px by 16px, 13px Graphite).
- There are no cards. Projects are open articles separated by hairlines, and a panel appears only when there is a screenshot or diagram to hold.

### Navigation
- **Section nav (desktop only):** four links (Work, About, Skills, Contact) in the identity column, in 40px rows. Each link is a 1px line followed by an uppercase 12.5px label. At rest the line is 32px of Slate and the label is Slate. On hover, and for the section in view, the line grows to 64px of Ink and the label turns Ink, over 0.3s. `aria-current` marks the active link.
- **Language switch:** a translate icon and the other language's name ("العربية" or "English"), 14px at weight 500, Graphite turning Ink on hover. It sits at the top of the identity column, top-end on phones.
- **Phone:** there is no nav. The sticky section bars (see Layout) do the wayfinding.

### Links and Disclosure
- **Outbound link:** 14.5px Ink at weight 500, followed by a 16px up-right arrow in Slate. On hover both turn blue and the arrow lifts 2px. The arrow mirrors on /ar, and the target is 44px tall.
- **"How it works":** a native details/summary in the same style, with a chevron that turns 180° when open.
- **Footer link:** 13px Slate, underlined in Firm Hairline. On hover the text and underline turn Ink.

### Diagrams
Diagrams are small, drawn in tokens, and always sit inside a panel with a 13px caption above.
- **Pipeline:** numbered 1.45rem circles (white surface, Firm Hairline ring, 11.5px mono numerals) on a 1px vertical trunk. The final step is blue.
- **Result bars:** the label and a mono percentage on one line, then a 6px round track in Hairline with a fill below. The headline result is blue and the rest are Slate. When scrolled into view, the bars fill from the reading start (1.1s, after a 0.3s delay).
- **Retrieval flow:** 7px-cornered nodes with Firm Hairline outlines, joined by 1px connectors. The output node is solid Ink with ground-coloured text.
- **Rank grid:** 32px round tokens with mono numerals. By rank, the fill steps from Ink through Graphite and Firm Hairline to white surface.
- **Order journey:** four 36px icon steps on a 1px track, above a stage of screenshots that crossfade. The active step is solid Ink, a done step has an Ink ring, and an upcoming step has a Firm Hairline ring with a Slate icon. The journey plays through once while on screen and stops on the last step; tapping a step holds it there.

### Device Frames
Phone screenshots sit in a 5px Device Bezel frame (1.9rem corners, 9:19.5) with the device lift shadow. Web screenshots sit in a white browser window with three Firm Hairline dots, 10px corners and the window lift. In the Forge showcase the visitor picks the screen from a list beside the phone; the active item is Ink with a 6px blue dot. Nothing rotates by itself.

### Pose Figure (signature)
The live canvas at the top of the work column, 250px tall (300px from 640px), inside an edge-to-edge panel. It draws a COCO-17 skeleton: hairline bones (2.2px and up), hollow joints, and five filled face points. Below the figure runs a speed strip: the "Speed" label, a 4px track, a fill in Skeleton Ink, and an amber threshold tick at 60%.

On arrival the figure waves once (2.4s), settles (0.9s) and rests. A pointer makes the nearest arm reach for it, and a tap makes it jab. Once wrist speed passes the threshold, the skeleton, wrists, fill and a "fast" label turn Alert Red. Amber direction arrows appear above 35% speed. Frames run only while something is moving, then stop. With reduced motion it draws one still frame and ignores the pointer. In RTL the strip fills from the right and the labels swap sides.

### Motion
Motion is quiet, plays once, and starts from a default that is already visible.
- On load, the identity column rises in: 8px up with a fade, 0.8s `cubic-bezier(0.16, 1, 0.3, 1)`, staggered at 0, 0.06, 0.12 and 0.2s.
- Colour hovers take 0.2s ease-out; the nav line and the chevron take 0.3s. The screen crossfade takes 0.3s and the journey stage crossfade 0.5s. The journey line fills linearly over 5.2s per step.
- All of it sits behind `prefers-reduced-motion: no-preference`, and nothing loops. Hidden reveal states are added only after the script has marked what is already on screen, so nothing visible flickers and nothing depends on JavaScript to appear.

## Do's and Don'ts

### Do:
- **Do** keep a single ink pill (`text` fill, `bg` label, 999px, 2.75rem) as the primary action, with a mail or download icon and a verb.
- **Do** put every screenshot and diagram in a panel: a `sunken` ground, a 1px `line` border and 14px corners.
- **Do** set standalone figures in JetBrains Mono next to a sans label, and wrap them in `dir="ltr"` on the Arabic page.
- **Do** reference colour tokens (`var(--text)`, `text-text-2`) so every component flips with the system theme. Keep literal colours for the device bezel and the frame shadows only.
- **Do** use logical properties (start/end, inline-start/end) and mirror any directional motion under `dir="rtl"`.
- **Do** give every interactive element a 44px target and the 2px `accent` focus outline at a 3px offset.
- **Do** keep motion to a single play, behind `prefers-reduced-motion: no-preference`, starting from a visible default.
- **Do** write the name "Hussein Al Herk" in Latin script, left to right, in Schibsted Grotesk on both pages.

### Don't:
- **Don't** introduce a themed or costume world: no material metaphor, period ornament, decorative texture or illustrative chrome. The look stays professional and familiar.
- **Don't** add a second accent hue, or use blue for the primary button, a panel or a section background.
- **Don't** use green, amber or red as text, fills or decoration outside status dots and the pose figure.
- **Don't** give panels, pills, tags or buttons a shadow; shadows belong to device and window frames.
- **Don't** set headings, prose or labels in JetBrains Mono.
- **Don't** reuse the nav's uppercase tracked label as an eyebrow above headings; uppercase belongs to the desktop section nav alone.
- **Don't** apply letter-spacing to Arabic text.
- **Don't** add looping or autoplaying motion beyond the figure's single wave and the order journey's single play-through.
- **Don't** show screens or brand marks that PRODUCT.md withholds (the private financial app, the shop client's brand).
