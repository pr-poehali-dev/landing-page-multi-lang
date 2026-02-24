import { useState } from "react";
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
];

const LanguageSwitcher = ({ lang, onLangChange }: Props) => {
  const [open, setOpen] = useState(false);
  const current = langs.find(l => l.code === lang)!;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl font-bold text-sm transition-all duration-200 hover:scale-105"
        style={{
          background: "rgba(255,200,0,0.12)",
          border: "1px solid rgba(255,200,0,0.3)",
          color: "hsl(48,100%,70%)",
        }}>
        <span className="text-lg">{current.flag}</span>
        <span>{current.label}</span>
        <span style={{ fontSize: "10px" }}>▼</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 rounded-xl overflow-hidden z-50 min-w-[120px]"
          style={{
            background: "hsl(270,60%,12%)",
            border: "1px solid rgba(255,200,0,0.25)",
            boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
          }}>
          {langs.map(l => (
            <button
              key={l.code}
              onClick={() => { onLangChange(l.code); setOpen(false); }}
              className="flex items-center gap-3 w-full px-4 py-3 text-sm transition-all duration-150 hover:bg-yellow-400/10"
              style={{
                color: l.code === lang ? "hsl(48,100%,60%)" : "hsl(48,100%,85%)",
                fontWeight: l.code === lang ? "700" : "400",
              }}>
              <span className="text-lg">{l.flag}</span>
              <span>{l.label}</span>
              {l.code === "ru" && <span className="text-xs opacity-50 ml-auto">↗</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
