import { Language } from "@/types/landing";

export const SITE_URL = "https://dickfon.xyz";
export const DEFAULT_LANG: Language = "en";
export const SUPPORTED_LANGS: Language[] = ["en", "zh", "hi", "es", "fr", "pt", "id", "de", "ja", "it", "ko", "th", "fi", "sv", "da", "pl", "cs"];

export const OG_LOCALE: Record<Language, string> = {
  en: "en_US", zh: "zh_CN", hi: "hi_IN", es: "es_ES", fr: "fr_FR",
  pt: "pt_BR", id: "id_ID", de: "de_DE", ja: "ja_JP", it: "it_IT",
  ko: "ko_KR", th: "th_TH", fi: "fi_FI", sv: "sv_SE", da: "da_DK", pl: "pl_PL", cs: "cs_CZ",
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

const LANG_KEY = "dickfon_lang";

export const saveLangChoice = (lang: Language) => {
  try {
    localStorage.setItem(LANG_KEY, lang);
  } catch {
    /* storage unavailable */
  }
};

export const detectLang = (): Language => {
  try {
    const saved = localStorage.getItem(LANG_KEY);
    if (isLang(saved)) return saved;
  } catch {
    /* storage unavailable */
  }
  const browserLangs = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const bl of browserLangs) {
    const code = (bl || "").split("-")[0].toLowerCase();
    const mapped = code === "nb" || code === "nn" ? "da" : code === "cz" ? "cs" : code;
    if (isLang(mapped)) return mapped;
  }
  return DEFAULT_LANG;
};
