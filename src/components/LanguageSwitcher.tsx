import { Language } from "@/types/landing";

interface Props {
  lang: Language;
  onLangChange: (l: Language) => void;
}

const langs: { code: Language; flag: string; label: string }[] = [
  { code: "en", flag: "🇬🇧", label: "EN" },
  { code: "de", flag: "🇩🇪", label: "DE" },
  { code: "fr", flag: "🇫🇷", label: "FR" },
  { code: "es", flag: "🇪🇸", label: "ES" },
  { code: "ru", flag: "🇷🇺", label: "RU" },
  { code: "zh", flag: "🇨🇳", label: "中文" },
  { code: "ja", flag: "🇯🇵", label: "日本語" },
  { code: "pt", flag: "🇧🇷", label: "PT" },
];

const LanguageSwitcher = ({ lang, onLangChange }: Props) => {
  return (
    <div className="flex items-center gap-1 flex-wrap justify-end">
      {langs.map(l => (
        <button
          key={l.code}
          onClick={() => onLangChange(l.code)}
          title={l.label}
          className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 hover:scale-110"
          style={{
            background: l.code === lang ? "rgba(255,200,0,0.22)" : "rgba(255,255,255,0.05)",
            border: l.code === lang ? "1px solid rgba(255,200,0,0.55)" : "1px solid rgba(255,255,255,0.1)",
            color: l.code === lang ? "hsl(48,100%,65%)" : "rgba(255,255,255,0.55)",
            boxShadow: l.code === lang ? "0 0 8px rgba(255,200,0,0.2)" : "none",
          }}>
          <span className="text-base leading-none">{l.flag}</span>
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
