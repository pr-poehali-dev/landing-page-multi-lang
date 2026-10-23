import { Translations } from "@/types/landing";

interface Props { t: Translations }

const Footer = ({ t }: Props) => (
  <footer className="footer-glass relative z-10 py-8 px-6 text-center">
    <p className="font-rubik text-white/25 text-sm">{t.footerText}</p>
  </footer>
);

export default Footer;
