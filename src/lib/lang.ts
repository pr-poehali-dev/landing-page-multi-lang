import { Language } from "@/types/landing";

export const SITE_URL = "https://dickfon.xyz";
export const DEFAULT_LANG: Language = "en";
export const SUPPORTED_LANGS: Language[] = ["en", "zh", "hi", "es", "fr", "pt", "id", "de", "ja", "it"];

export const OG_LOCALE: Record<Language, string> = {
  en: "en_US", zh: "zh_CN", hi: "hi_IN", es: "es_ES", fr: "fr_FR",
  pt: "pt_BR", id: "id_ID", de: "de_DE", ja: "ja_JP", it: "it_IT",
};

export const isLang = (v: string | undefined | null): v is Language =>
  !!v && SUPPORTED_LANGS.includes(v as Language);

export const langPath = (lang: Language, path = "/"): string => {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (lang === DEFAULT_LANG) return clean;
  return clean === "/" ? `/${lang}` : `/${lang}${clean}`;
};

export const langFromPathname = (pathname: string): Language => {
  const first = pathname.split("/")[1];
  return isLang(first) ? first : DEFAULT_LANG;
};

export const absoluteUrl = (lang: Language, path = "/"): string => {
  const p = langPath(lang, path);
  return `${SITE_URL}${p === "/" ? "/" : p}`;
};
