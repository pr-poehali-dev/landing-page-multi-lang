import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { langPath } from "@/lib/lang";
import { Language, Translations } from "@/types/landing";
import LanguageSwitcher from "./LanguageSwitcher";
import Icon from "@/components/ui/icon";

interface Props {
  lang: Language;
  onLangChange: (l: Language) => void;
  t: Translations;
}

const NAV_STYLES = ["btn-nav-blue", "btn-nav-orange", "btn-nav-ice"];

const HOME_LABEL: Record<Language, string> = {
  en: "Home", zh: "首页", hi: "होम", es: "Inicio", fr: "Accueil",
  pt: "Início", id: "Beranda", de: "Start", ja: "ホーム", it: "Home",
};

const Navbar = ({ lang, onLangChange, t }: Props) => {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const homePath = langPath(lang);
  const isHome = pathname.replace(/\/$/, "") === homePath.replace(/\/$/, "") || (homePath === "/" && pathname === "/");

  const scrollTo = (id: string) => {
    setOpen(false);
    if (id === "top") {
      if (isHome) window.scrollTo({ top: 0, behavior: "smooth" });
      else navigate(homePath);
      return;
    }
    const el = document.getElementById(id);
    if (isHome && el) {
      el.scrollIntoView({ behavior: "smooth" });
      return;
    }
    if (!isHome && id === "contact" && el) {
      el.scrollIntoView({ behavior: "smooth" });
      return;
    }
    navigate(`${homePath}#${id}`);
  };

  const items = [
    { label: HOME_LABEL[lang], id: "top" },
    { label: t.navProducts, id: "products" },
    { label: t.navContact, id: "contact" },
  ];

  return (
    <nav className="glass-nav fixed top-0 left-0 right-0 z-50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <button
          onClick={() => scrollTo("top")}
          className="font-oswald text-xl tracking-widest text-[#F5D060] uppercase hover:opacity-80 transition-opacity text-glow-gold"
        >
          DICKFON
        </button>

        <div className="hidden md:flex items-center gap-3">
          {items.map((item, i) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`btn-nav-capsule ${NAV_STYLES[i] ?? "btn-nav-ice"}`}
            >
              {item.label}
            </button>
          ))}
          <LanguageSwitcher lang={lang} onLangChange={onLangChange} />
        </div>

        <button
          className="md:hidden text-white/60 hover:text-white transition-colors"
          onClick={() => setOpen(!open)}
        >
          <Icon name={open ? "X" : "Menu"} size={22} />
        </button>
      </div>

      {open && (
        <div
          className="md:hidden border-t border-white/10 px-6 py-5 flex flex-col gap-3"
          style={{ background: "rgba(8,5,16,0.95)", backdropFilter: "blur(28px)" }}
        >
          {items.map((item, i) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`btn-nav-capsule ${NAV_STYLES[i] ?? "btn-nav-ice"} w-full`}
            >
              {item.label}
            </button>
          ))}
          <LanguageSwitcher lang={lang} onLangChange={onLangChange} />
        </div>
      )}
    </nav>
  );
};

export default Navbar;