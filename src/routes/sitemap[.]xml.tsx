import { createFileRoute } from "@tanstack/react-router";
import { products } from "@/data/products";
import { SUPPORTED_LANGS, DEFAULT_LANG, absoluteUrl } from "@/lib/lang";

const buildSitemap = (): string => {
  const lastmod = new Date().toISOString().slice(0, 10);
  const paths = [
    { path: "/", changefreq: "weekly", priority: "1.0" },
    ...products.map((p) => ({ path: `/product/${p.slug}`, changefreq: "monthly", priority: "0.8" })),
  ];

  const urls = paths.flatMap(({ path, changefreq, priority }) =>
    SUPPORTED_LANGS.map((lang) => {
      const alternates = SUPPORTED_LANGS.map(
        (l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${absoluteUrl(l, path)}"/>`,
      );
      alternates.push(
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${absoluteUrl(DEFAULT_LANG, path)}"/>`,
      );
      return [
        "  <url>",
        `    <loc>${absoluteUrl(lang, path)}</loc>`,
        ...alternates,
        `    <lastmod>${lastmod}</lastmod>`,
        `    <changefreq>${changefreq}</changefreq>`,
        `    <priority>${priority}</priority>`,
        "  </url>",
      ].join("\n");
    }),
  );

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join("\n")}\n</urlset>\n`;
};

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () =>
        new Response(buildSitemap(), {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        }),
    },
  },
});
