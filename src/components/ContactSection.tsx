import { useState } from "react";
import { Translations } from "@/types/landing";
import Icon from "@/components/ui/icon";

interface Props { t: Translations }

const SOCIALS = [
  { label: "Threads", icon: "AtSign", url: "https://www.threads.com/@dickfon_karaoke" },
  { label: "Instagram", icon: "Instagram", url: "https://www.instagram.com/dickfon_karaoke?igsh=MWdnb2xvaG9vdnN6YQ==" },
  { label: "YouTube", icon: "Youtube", url: "https://youtube.com/@dickfon?si=fszdzWTOssep__JG" },
  { label: "Facebook", icon: "Facebook", url: "https://www.facebook.com/share/1DZcs2GEn5/" },
  { label: "X / Twitter", icon: "Twitter", url: "https://x.com/Dickfon_karaoke" },
];

const ContactSection = ({ t }: Props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setName(""); setEmail(""); setMessage("");
  };

  const inputClass =
    "w-full px-5 py-4 rounded-2xl text-sm font-rubik text-white placeholder:text-white/30 outline-none transition-all duration-200 focus:border-[#F5D060]/50";
  const inputStyle: React.CSSProperties = {
    background: "linear-gradient(155deg, #ffffff14 0%, #ffffff06 50%, #00000020 100%)",
    border: "1px solid #ffffff1f",
    boxShadow: "inset 0 1px #ffffff26",
    backdropFilter: "blur(12px)",
  };

  const contacts = [
    { icon: "Phone", label: t.contactPhone, value: "+7 (993) 103-07-83", href: "tel:+79931030783" },
    { icon: "Send", label: t.contactTelegram, value: "@dickfon_karaoke", href: "https://t.me/+79931030783" },
    { icon: "MessageCircle", label: t.contactWhatsapp, value: "+7 (993) 103-07-83", href: "https://wa.me/79931030783" },
    { icon: "Mail", label: "Email", value: "dickfon88@gmail.com", href: "mailto:dickfon88@gmail.com" },
  ];

  return (
    <section id="contact" className="py-24 px-6 relative z-10">
      <hr className="section-sep mb-20" />
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-cormorant text-[#F5D060] italic text-lg mb-3 text-glow-gold">
            {t.contactSubtitle}
          </p>
          <h2 className="font-oswald text-5xl md:text-6xl uppercase tracking-tight text-white text-glow-white">
            {t.contactTitle}
          </h2>
          <div className="gold-divider" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contacts.map(({ icon, label, value, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="contact-card p-6 text-center block"
              style={{ textDecoration: "none" }}
            >
              <div className="icon-bubble w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <Icon name={icon} size={20} className="text-[#F5D060]" />
              </div>
              <p className="font-oswald text-xs uppercase tracking-widest text-white/30 mb-1">{label}</p>
              <p className="font-rubik text-white text-sm break-words">{value}</p>
            </a>
          ))}
        </div>

        <div className="flex justify-center gap-3 flex-wrap mb-14">
          {SOCIALS.map(({ label, icon, url }) => (
            <a
              key={label}
              href={url}
              target="_blank"
              rel="noreferrer"
              title={label}
              className="icon-bubble w-11 h-11 flex items-center justify-center transition-transform duration-200 hover:scale-110"
            >
              <Icon name={icon} size={18} className="text-[#F5D060]" />
            </a>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
          <input
            type="text"
            placeholder={t.contactName}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className={inputClass}
            style={inputStyle}
          />
          <input
            type="email"
            placeholder={t.contactEmail}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={inputClass}
            style={inputStyle}
          />
          <textarea
            placeholder={t.contactMessage}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={5}
            className={`${inputClass} resize-none`}
            style={inputStyle}
          />

          {sent && (
            <div
              className="flex items-center gap-3 px-5 py-4 rounded-2xl"
              style={{ background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.3)", color: "#86efac" }}
            >
              <Icon name="CheckCircle" size={18} />
              <span className="text-sm">{t.contactSuccess}</span>
            </div>
          )}

          <button type="submit" className="btn-capsule btn-capsule-blue w-full py-4 text-base">
            {t.contactSend}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
