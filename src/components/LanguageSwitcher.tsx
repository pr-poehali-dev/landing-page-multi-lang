import { Language } from "@/types/landing";

type LangCode = Language | "ru";

interface Props {
  lang: Language;
  onLangChange: (l: Language) => void;
}

const langs: { code: LangCode; flag: string; label: string }[] = [
  { code: "en", flag: "🇬🇧", label: "EN" },
  { code: "zh", flag: "🇨🇳", label: "中文" },
  { code: "ja", flag: "🇯🇵", label: "日本語" },
  { code: "hi", flag: "🇮🇳", label: "HI" },
  { code: "es", flag: "🇪🇸", label: "ES" },
  { code: "fr", flag: "🇫🇷", label: "FR" },
  { code: "pt", flag: "🇧🇷", label: "PT" },
  { code: "id", flag: "🇮🇩", label: "ID" },
  { code: "de", flag: "🇩🇪", label: "DE" },
  { code: "ru", flag: "🇷🇺", label: "RU" },
];

const LanguageSwitcher = ({ lang, onLangChange }: Props) => {
  const handleClick = (code: LangCode) => {
    if (code === "ru") {
      window.open("https://dickfon.ru", "_blank");
      return;
    }
    onLangChange(code as Language);
  };

  return (
    <div className="flex items-center gap-1 flex-wrap justify-end">
      {langs.map(l => {
        const isActive = l.code === lang;
        return (
          <button
            key={l.code}
            onClick={() => handleClick(l.code)}
            title={l.label}
            className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 hover:scale-110"
            style={{
              background: isActive ? "rgba(255,200,0,0.22)" : "rgba(255,255,255,0.05)",
              border: isActive ? "1px solid rgba(255,200,0,0.55)" : "1px solid rgba(255,255,255,0.1)",
              color: isActive ? "hsl(48,100%,65%)" : "rgba(255,255,255,0.55)",
              boxShadow: isActive ? "0 0 8px rgba(255,200,0,0.2)" : "none",
            }}>
            <span className="text-base leading-none">{l.flag}</span>
            <span className="hidden sm:inline ml-0.5">{l.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default LanguageSwitcher;