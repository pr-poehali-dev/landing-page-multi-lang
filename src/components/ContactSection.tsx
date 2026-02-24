import { useState } from "react";
import { Translations } from "@/types/landing";
import Icon from "@/components/ui/icon";

interface Props { t: Translations }

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

  const inputStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,200,0,0.2)",
    color: "hsl(48,100%,85%)",
    outline: "none",
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, hsl(270,70%,6%) 0%, hsl(270,65%,9%) 100%)" }} />
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(ellipse, hsl(48,100%,50%), transparent)", filter: "blur(60px)" }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4"
            style={{ fontFamily: "Oswald, sans-serif", color: "hsl(48,100%,60%)" }}>
            {t.contactTitle}
          </h2>
          <p className="text-lg opacity-60" style={{ color: "hsl(48,100%,85%)" }}>
            {t.contactSubtitle}
          </p>
          <div className="w-24 h-1 mx-auto mt-6 rounded-full"
            style={{ background: "linear-gradient(90deg, transparent, hsl(48,100%,50%), transparent)" }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Contact info */}
          <div className="space-y-6">
            {[
              { icon: "Phone", label: t.contactPhone, value: "+1 (800) 123-4567" },
              { icon: "Send", label: t.contactTelegram, value: "@premiumstore" },
              { icon: "MessageCircle", label: t.contactWhatsapp, value: "+1 (800) 123-4567" },
              { icon: "Mail", label: "Email", value: "hello@premiumstore.com" },
            ].map(({ icon, label, value }) => (
              <div key={label} className="flex items-center gap-5 p-5 rounded-2xl transition-all duration-200 hover:scale-[1.02] group"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,200,0,0.12)" }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all group-hover:scale-110"
                  style={{ background: "linear-gradient(135deg, hsl(48,100%,50%), hsl(48,100%,35%))", color: "hsl(270,70%,10%)" }}>
                  <Icon name={icon} size={20} />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest opacity-50 mb-1" style={{ color: "hsl(48,100%,70%)" }}>
                    {label}
                  </div>
                  <div className="font-semibold" style={{ color: "hsl(48,100%,85%)" }}>{value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder={t.contactName}
              value={name}
              onChange={e => setName(e.target.value)}
              required
              className="w-full px-5 py-4 rounded-xl text-sm transition-all duration-200 focus:ring-2 focus:ring-yellow-400/30"
              style={inputStyle}
            />
            <input
              type="email"
              placeholder={t.contactEmail}
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full px-5 py-4 rounded-xl text-sm transition-all duration-200 focus:ring-2 focus:ring-yellow-400/30"
              style={inputStyle}
            />
            <textarea
              placeholder={t.contactMessage}
              value={message}
              onChange={e => setMessage(e.target.value)}
              required
              rows={5}
              className="w-full px-5 py-4 rounded-xl text-sm resize-none transition-all duration-200 focus:ring-2 focus:ring-yellow-400/30"
              style={inputStyle}
            />

            {sent && (
              <div className="flex items-center gap-3 px-5 py-4 rounded-xl"
                style={{ background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.3)", color: "#86efac" }}>
                <Icon name="CheckCircle" size={18} />
                <span className="text-sm">{t.contactSuccess}</span>
              </div>
            )}

            <button type="submit"
              className="w-full py-4 rounded-xl font-bold text-lg uppercase tracking-widest transition-all duration-200 hover:scale-[1.02] active:scale-95"
              style={{
                background: "linear-gradient(135deg, hsl(48,100%,50%), hsl(48,100%,35%))",
                color: "hsl(270,70%,10%)",
                fontFamily: "Oswald, sans-serif",
                boxShadow: "0 8px 30px rgba(255,200,0,0.25)",
              }}>
              {t.contactSend}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
