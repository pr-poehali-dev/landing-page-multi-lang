import { useEffect } from "react";
import { Language } from "@/types/landing";
import { SUPPORTED_LANGS, OG_LOCALE, absoluteUrl, SITE_URL } from "@/lib/lang";

interface SeoParams {
  lang: Language;
  path: string;
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  type?: string;
}

const upsert = (selector: string, create: () => HTMLElement): HTMLElement => {
  let el = document.head.querySelector<HTMLElement>(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  return el;
};

const setMeta = (attr: "name" | "property", key: string, content: string) => {
  const el = upsert(`meta[${attr}="${key}"]`, () => {
    const m = document.createElement("meta");
    m.setAttribute(attr, key);
    return m;
  });
  el.setAttribute("content", content);
};

export const useSeo = ({ lang, path, title, description, keywords, image, type = "website" }: SeoParams) => {
  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = title;

    setMeta("name", "description", description);
    if (keywords) setMeta("name", "keywords", keywords);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", type);
    setMeta("property", "og:url", absoluteUrl(lang, path));
    setMeta("property", "og:locale", OG_LOCALE[lang]);
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    if (image) {
      setMeta("property", "og:image", image);
      setMeta("name", "twitter:image", image);
    }

    const canonical = upsert('link[rel="canonical"]', () => {
      const l = document.createElement("link");
      l.setAttribute("rel", "canonical");
      return l;
    });
    canonical.setAttribute("href", absoluteUrl(lang, path));

    document.head.querySelectorAll('link[data-seo-alt="1"]').forEach((n) => n.remove());
    const addAlt = (hreflang: string, href: string) => {
      const l = document.createElement("link");
      l.setAttribute("rel", "alternate");
      l.setAttribute("hreflang", hreflang);
      l.setAttribute("href", href);
      l.setAttribute("data-seo-alt", "1");
      document.head.appendChild(l);
    };
    SUPPORTED_LANGS.forEach((l) => addAlt(l, absoluteUrl(l, path)));
    addAlt("x-default", `${SITE_URL}${path === "/" ? "/" : path}`);
  }, [lang, path, title, description, keywords, image, type]);
};
