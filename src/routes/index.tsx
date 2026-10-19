import { createFileRoute } from "@tanstack/react-router";
import { Portfolio } from "@/components/Portfolio";
import { content } from "@/content";

const { meta } = content.en;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: meta.title },
      { name: "description", content: meta.description },
      { property: "og:title", content: meta.title },
      { property: "og:description", content: meta.description },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [
      { rel: "alternate", hrefLang: "en", href: "https://kiraherk.github.io/" },
      { rel: "alternate", hrefLang: "ar", href: "https://kiraherk.github.io/ar" },
    ],
  }),
  component: () => <Portfolio lang="en" />,
});
