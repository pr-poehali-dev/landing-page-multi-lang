import { useState, useRef, useEffect, useCallback } from "react";
import { Language, Translations } from "@/types/landing";
import LanguageSwitcher from "./LanguageSwitcher";

interface AgeGateProps {
  onVerified: () => void;
  lang: Language;
  onLangChange: (l: Language) => void;
  t: Translations;
}

const DAYS = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, "0"));
const MONTHS = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"));
const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 100 }, (_, i) => String(currentYear - i));

const ITEM_H = 44;
const VISIBLE = 5;

interface DrumProps {
  items: string[];
  selected: number;
  onChange: (i: number) => void;
  label: string;
}

const Drum = ({ items, selected, onChange, label }: DrumProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startY = useRef(0);
  const startOffset = useRef(0);
  const currentOffset = useRef(selected * ITEM_H);
  const [displayOffset, setDisplayOffset] = useState(selected * ITEM_H);
  const animRef = useRef<number>(0);

  const clamp = (val: number) => Math.max(0, Math.min(val, (items.length - 1) * ITEM_H));

  const snapTo = useCallback((offset: number) => {
    const snapped = clamp(Math.round(offset / ITEM_H) * ITEM_H);
    currentOffset.current = snapped;
    setDisplayOffset(snapped);
    onChange(Math.round(snapped / ITEM_H));
  }, [items.length, onChange]);

  useEffect(() => {
    const newOffset = selected * ITEM_H;
    currentOffset.current = newOffset;
    setDisplayOffset(newOffset);
  }, [selected]);

  const onPointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    startY.current = e.clientY;
    startOffset.current = currentOffset.current;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    cancelAnimationFrame(animRef.current);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const delta = startY.current - e.clientY;
    const newOffset = clamp(startOffset.current + delta);
    currentOffset.current = newOffset;
    setDisplayOffset(newOffset);
  };

  const onPointerUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    snapTo(currentOffset.current);
  };

  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const newOffset = clamp(currentOffset.current + e.deltaY * 0.5);
    currentOffset.current = newOffset;
    setDisplayOffset(newOffset);
    const el = containerRef.current as HTMLDivElement & { _wheelTimer?: ReturnType<typeof setTimeout> };
    if (el) { clearTimeout(el._wheelTimer); el._wheelTimer = setTimeout(() => snapTo(currentOffset.current), 150); }
  };

  const halfVisible = Math.floor(VISIBLE / 2);
  const translateY = -displayOffset + halfVisible * ITEM_H;

  return (
    <div className="flex flex-col items-center" style={{ width: 80 }}>
      <span className="text-xs uppercase tracking-widest mb-2 opacity-50" style={{ color: "hsl(48,100%,70%)" }}>{label}</span>
      <div
        ref={containerRef}
        style={{
          height: ITEM_H * VISIBLE,
          overflow: "hidden",
          cursor: "grab",
          userSelect: "none",
          position: "relative",
          borderRadius: 12,
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,200,0,0.15)",
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        onWheel={onWheel}
      >
        {/* Selection highlight */}
        <div style={{
          position: "absolute",
          top: halfVisible * ITEM_H,
          left: 0,
          right: 0,
          height: ITEM_H,
          background: "rgba(255,200,0,0.12)",
          borderTop: "1px solid rgba(255,200,0,0.35)",
          borderBottom: "1px solid rgba(255,200,0,0.35)",
          pointerEvents: "none",
          zIndex: 2,
        }} />
        {/* Top fade */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: ITEM_H * 1.5,
          background: "linear-gradient(to bottom, rgba(20,5,40,0.92), transparent)",
          pointerEvents: "none", zIndex: 3,
        }} />
        {/* Bottom fade */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: ITEM_H * 1.5,
          background: "linear-gradient(to top, rgba(20,5,40,0.92), transparent)",
          pointerEvents: "none", zIndex: 3,
        }} />

        <div style={{
          transform: `translateY(${translateY}px)`,
          transition: isDragging.current ? "none" : "transform 0.15s ease-out",
          willChange: "transform",
        }}>
          {items.map((item, i) => {
            const dist = Math.abs(i - displayOffset / ITEM_H);
            const opacity = Math.max(0.25, 1 - dist * 0.28);
            const scale = Math.max(0.78, 1 - dist * 0.065);
            return (
              <div
                key={item}
                style={{
                  height: ITEM_H,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "Oswald, sans-serif",
                  fontSize: 20,
                  fontWeight: 700,
                  color: i === Math.round(displayOffset / ITEM_H) ? "hsl(48,100%,65%)" : "hsl(48,100%,85%)",
                  opacity,
                  transform: `scaleY(${scale})`,
                  transition: "opacity 0.08s, transform 0.08s",
                }}
              >
                {item}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const AgeGate = ({ onVerified, lang, onLangChange, t }: AgeGateProps) => {
  const [day, setDay] = useState(0);
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(17);
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);

  const verify = () => {
    const d = parseInt(DAYS[day]);
    const m = parseInt(MONTHS[month]) - 1;
    const y = parseInt(YEARS[year]);

    const birth = new Date(y, m, d);
    if (isNaN(birth.getTime()) || birth.getDate() !== d) {
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

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 animate-pulse"
          style={{ background: "radial-gradient(circle, hsl(48,100%,50%), transparent)", filter: "blur(60px)" }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-15 animate-pulse"
          style={{ background: "radial-gradient(circle, hsl(270,80%,50%), transparent)", filter: "blur(80px)", animationDelay: "1s" }} />
      </div>

      <div className="absolute top-6 right-6 z-20">
        <LanguageSwitcher lang={lang} onLangChange={onLangChange} />
      </div>

      <div className={`relative z-10 w-full max-w-md mx-4 rounded-2xl p-8 border ${shake ? "animate-[shake_0.5s_ease-in-out]" : ""}`}
        style={{
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(20px)",
          borderColor: "rgba(255,200,0,0.3)",
          boxShadow: "0 0 60px rgba(255,200,0,0.1), inset 0 1px 0 rgba(255,255,255,0.1)"
        }}>

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

        <label className="block text-xs uppercase tracking-widest mb-4 opacity-60 text-center" style={{ color: "hsl(48,100%,70%)" }}>
          {t.ageLabel}
        </label>

        <div className="flex justify-center gap-3 mb-6">
          <Drum items={DAYS} selected={day} onChange={setDay} label="DD" />
          <Drum items={MONTHS} selected={month} onChange={setMonth} label="MM" />
          <Drum items={YEARS} selected={year} onChange={setYear} label="YYYY" />
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
      `}</style>
    </div>
  );
};

export default AgeGate;