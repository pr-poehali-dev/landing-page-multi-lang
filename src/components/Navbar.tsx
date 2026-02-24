import { useState, useEffect } from "react";
import { Language, Translations } from "@/types/landing";
import LanguageSwitcher from "./LanguageSwitcher";

interface Props {
  lang: Language;
  onLangChange: (l: Language) => void;
  t: Translations;
}

const Navbar = ({ lang, onLangChange, t }: Props) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(15,5,30,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,200,0,0.15)" : "none",
      }}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">✨</span>
          <span className="font-bold text-xl tracking-wider" style={{ color: "hsl(48,100%,60%)", fontFamily: "Oswald, sans-serif" }}>
            PREMIUM
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => scrollTo("products")}
            className="text-sm uppercase tracking-widest transition-all duration-200 hover:scale-105 font-semibold"
            style={{ color: "hsl(48,100%,75%)" }}>
            {t.navProducts}
          </button>
          <button onClick={() => scrollTo("contact")}
            className="text-sm uppercase tracking-widest transition-all duration-200 hover:scale-105 font-semibold"
            style={{ color: "hsl(48,100%,75%)" }}>
            {t.navContact}
          </button>
        </div>

        <LanguageSwitcher lang={lang} onLangChange={onLangChange} />
      </div>
    </nav>
  );
};

export default Navbar;
