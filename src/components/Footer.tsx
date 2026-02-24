import { Translations } from "@/types/landing";

interface Props { t: Translations }

const Footer = ({ t }: Props) => (
  <footer className="py-8 text-center border-t" style={{ borderColor: "rgba(255,200,0,0.1)", background: "hsl(270,70%,5%)" }}>
    <div className="flex items-center justify-center gap-2 mb-2">
      <span className="text-xl">✨</span>
      <span className="font-bold tracking-widest" style={{ color: "hsl(48,100%,60%)", fontFamily: "Oswald, sans-serif" }}>PREMIUM</span>
    </div>
    <p className="text-sm opacity-40" style={{ color: "hsl(48,100%,85%)" }}>{t.footerText}</p>
  </footer>
);

export default Footer;
