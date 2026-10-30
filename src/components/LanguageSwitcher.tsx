import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Icon from "@/components/ui/icon";
import { Language } from "@/types/landing";
import { saveLangChoice } from "@/lib/lang";

type LangCode = Language | "ru";

interface Props {
  lang: Language;
  onLangChange: (l: Language) => void;
}

const langs: { code: LangCode; flag: string; label: string }[] = [
  { code: "en", flag: "🇬🇧", label: "English" },
  { code: "zh", flag: "🇨🇳", label: "中文" },
  { code: "ja", flag: "🇯🇵", label: "日本語" },
  { code: "ko", flag: "🇰🇷", label: "한국어" },
  { code: "th", flag: "🇹🇭", label: "ไทย" },
  { code: "hi", flag: "🇮🇳", label: "हिन्दी" },
  { code: "id", flag: "🇮🇩", label: "Indonesia" },
  { code: "es", flag: "🇪🇸", label: "Español" },
  { code: "fr", flag: "🇫🇷", label: "Français" },
  { code: "pt", flag: "🇧🇷", label: "Português" },
  { code: "de", flag: "🇩🇪", label: "Deutsch" },
  { code: "it", flag: "🇮🇹", label: "Italiano" },
  { code: "pl", flag: "🇵🇱", label: "Polski" },
  { code: "cs", flag: "🇨🇿", label: "Čeština" },
  { code: "sv", flag: "🇸🇪", label: "Svenska" },
  { code: "da", flag: "🇩🇰", label: "Dansk" },
  { code: "fi", flag: "🇫🇮", label: "Suomi" },
  { code: "ru", flag: "🇷🇺", label: "Русский" },
];

const LanguageSwitcher = ({ lang, onLangChange }: Props) => {
  const [open, setOpen] = useState(false);
  const current = langs.find(l => l.code === lang) ?? langs[0];

  const handleClick = (code: LangCode) => {
    setOpen(false);
    if (code === "ru") {
      window.open("https://dickfon.ru", "_blank");
      return;
    }
    saveLangChoice(code as Language);
    onLangChange(code as Language);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          aria-label="Language"
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 hover:scale-105"
          style={{
            background: "rgba(255,200,0,0.22)",
            border: "1px solid rgba(255,200,0,0.55)",
            color: "hsl(48,100%,65%)",
            boxShadow: "0 0 8px rgba(255,200,0,0.2)",
          }}>
          <span className="text-base leading-none">{current.flag}</span>
          <span>{current.label}</span>
          <Icon name="ChevronDown" size={14} />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-56 p-2 max-h-80 overflow-y-auto border-white/10"
        style={{ background: "rgba(8,5,16,0.97)", backdropFilter: "blur(20px)" }}>
        <div className="flex flex-col gap-1">
          {langs.map(l => {
            const isActive = l.code === lang;
            return (
              <button
                key={l.code}
                onClick={() => handleClick(l.code)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-left transition-colors hover:bg-white/10"
                style={{
                  background: isActive ? "rgba(255,200,0,0.18)" : "transparent",
                  color: isActive ? "hsl(48,100%,65%)" : "rgba(255,255,255,0.8)",
                }}>
                <span className="text-base leading-none">{l.flag}</span>
                <span className="flex-1">{l.label}</span>
                {isActive && <Icon name="Check" size={14} />}
                {l.code === "ru" && <Icon name="ExternalLink" size={14} />}
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default LanguageSwitcher;
