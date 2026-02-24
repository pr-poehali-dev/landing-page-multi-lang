import { useState } from "react";
import { Language, Translations } from "@/types/landing";
import LanguageSwitcher from "./LanguageSwitcher";

interface AgeGateProps {
  onVerified: () => void;
  lang: Language;
  onLangChange: (l: Language) => void;
  t: Translations;
}

const AgeGate = ({ onVerified, lang, onLangChange, t }: AgeGateProps) => {
  const [dob, setDob] = useState("");
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);

  const verify = () => {
    if (!dob) {
      setError(t.ageError);
      triggerShake();
      return;
    }

    const birth = new Date(dob);
    if (isNaN(birth.getTime())) {
      setError(t.ageError);
      triggerShake();
      return;
    }

    const now = new Date();
    const ageDiff = now.getFullYear() - birth.getFullYear();
    const hasBirthdayPassed =
      now.getMonth() > birth.getMonth() ||
      (now.getMonth() === birth.getMonth() && now.getDate() >= birth.getDate());
    const age = hasBirthdayPassed ? ageDiff : ageDiff - 1;

    if (age < 18) {
      setError(t.ageUnder);
      triggerShake();
      return;
    }
    onVerified();
  };

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 600);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, hsl(270,70%,6%) 0%, hsl(270,60%,14%) 50%, hsl(270,70%,6%) 100%)" }}>
      
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 animate-pulse"
          style={{ background: "radial-gradient(circle, hsl(48,100%,50%), transparent)", filter: "blur(60px)" }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-15 animate-pulse"
          style={{ background: "radial-gradient(circle, hsl(270,80%,50%), transparent)", filter: "blur(80px)", animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full opacity-10 animate-pulse"
          style={{ background: "radial-gradient(circle, hsl(48,100%,70%), transparent)", filter: "blur(40px)", animationDelay: "2s", transform: "translate(-50%,-50%)" }} />
      </div>

      {/* Language switcher top right */}
      <div className="absolute top-6 right-6 z-20">
        <LanguageSwitcher lang={lang} onLangChange={onLangChange} />
      </div>

      {/* Card */}
      <div className={`relative z-10 w-full max-w-md mx-4 rounded-2xl p-8 border ${shake ? "animate-[shake_0.5s_ease-in-out]" : ""}`}
        style={{
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(20px)",
          borderColor: "rgba(255,200,0,0.3)",
          boxShadow: "0 0 60px rgba(255,200,0,0.1), inset 0 1px 0 rgba(255,255,255,0.1)"
        }}>
        
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl"
            style={{ background: "linear-gradient(135deg, hsl(48,100%,50%), hsl(48,100%,35%))", boxShadow: "0 0 30px rgba(255,200,0,0.4)" }}>
            🔞
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center mb-2 font-oswald tracking-wide"
          style={{ color: "hsl(48,100%,60%)" }}>
          {t.ageTitle}
        </h1>
        <p className="text-center text-sm mb-8 opacity-70" style={{ color: "hsl(48,100%,85%)" }}>
          {t.ageSubtitle}
        </p>

        <label className="block text-xs uppercase tracking-widest mb-3 opacity-60" style={{ color: "hsl(48,100%,70%)" }}>
          {t.ageLabel}
        </label>

        <div className="mb-6">
          <input
            type="date"
            value={dob}
            onChange={e => { setDob(e.target.value); setError(""); }}
            onKeyDown={e => e.key === "Enter" && verify()}
            max={new Date().toISOString().split("T")[0]}
            className="w-full rounded-xl px-5 py-4 text-lg font-bold outline-none transition-all duration-200"
            style={{
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,200,0,0.25)",
              color: "hsl(48,100%,85%)",
              colorScheme: "dark",
            }}
          />
        </div>

        {error && (
          <p className="text-center text-sm mb-4 rounded-lg px-4 py-2" style={{ background: "rgba(255,50,50,0.15)", color: "#ff8888", border: "1px solid rgba(255,50,50,0.3)" }}>
            {error}
          </p>
        )}

        <button
          onClick={verify}
          className="w-full py-4 rounded-xl font-bold text-lg uppercase tracking-widest transition-all duration-200 hover:scale-[1.02] active:scale-95"
          style={{
            background: "linear-gradient(135deg, hsl(48,100%,50%), hsl(48,100%,38%))",
            color: "hsl(270,70%,10%)",
            boxShadow: "0 4px 30px rgba(255,200,0,0.35)",
            fontFamily: "Oswald, sans-serif",
          }}>
          {t.ageButton}
        </button>
      </div>

      <style>{`
        @keyframes shake {
          0%,100%{transform:translateX(0)}
          15%{transform:translateX(-10px)}
          30%{transform:translateX(10px)}
          45%{transform:translateX(-8px)}
          60%{transform:translateX(8px)}
          75%{transform:translateX(-4px)}
          90%{transform:translateX(4px)}
        }
        input[type=date]::-webkit-calendar-picker-indicator { filter: invert(1) sepia(1) saturate(3) hue-rotate(5deg); cursor: pointer; opacity: 0.7; }
      `}</style>
    </div>
  );
};

export default AgeGate;