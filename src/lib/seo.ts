import { Language, Translations } from "@/types/landing";
import { SUPPORTED_LANGS, OG_LOCALE, absoluteUrl, SITE_URL, DEFAULT_LANG, isLang } from "@/lib/lang";
import { homeSeo } from "@/data/seo";
import { translations } from "@/data/translations";
import { products } from "@/data/products";

interface SeoParams {
  lang: Language;
  path: string;
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  type?: string;
}

export const seoHead = ({ lang, path, title, description, keywords, image, type = "website" }: SeoParams) => {
  const url = absoluteUrl(lang, path);
  const meta: Array<Record<string, string>> = [
    { title },
    { name: "description", content: description },
    ...(keywords ? [{ name: "keywords", content: keywords }] : []),
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: type },
    { property: "og:url", content: url },
    { property: "og:locale", content: OG_LOCALE[lang] },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    ...(image
      ? [
          { property: "og:image", content: image },
          { name: "twitter:image", content: image },
        ]
      : []),
  ];
  const links = [
    { rel: "canonical", href: url },
    ...SUPPORTED_LANGS.map((l) => ({ rel: "alternate", hrefLang: l, href: absoluteUrl(l, path) })),
    { rel: "alternate", hrefLang: "x-default", href: `${SITE_URL}${path === "/" ? "/" : path}` },
  ];
  return { meta, links };
};

export const homeHead = (langParam?: string) => {
  const lang: Language = isLang(langParam) ? langParam : DEFAULT_LANG;
  const seo = homeSeo[lang];
  return seoHead({ lang, path: "/", title: seo.title, description: seo.description, keywords: seo.keywords });
};

export const productHead = (slug: string, langParam?: string) => {
  const lang: Language = isLang(langParam) ? langParam : DEFAULT_LANG;
  const product = products.find((p) => p.slug === slug);
  if (!product) return {};
  const t = translations[lang];
  return seoHead({
    lang,
    path: `/product/${slug}`,
    title: t[product.metaTitleKey as keyof Translations] as string,
    description: t[product.metaDescKey as keyof Translations] as string,
    keywords: t[product.metaKeywordsKey as keyof Translations] as string,
    image: product.image || undefined,
    type: "product",
  });
};

export const productExists = (slug: string) => products.some((p) => p.slug === slug);
