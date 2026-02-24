import { Translations } from "@/types/landing";

interface Props { t: Translations }

const Hero = ({ t }: Props) => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, hsl(270,70%,6%) 0%, hsl(270,55%,13%) 50%, hsl(270,70%,6%) 100%)" }} />
        
        {/* Animated orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full opacity-25 animate-pulse"
          style={{ background: "radial-gradient(circle, hsl(48,100%,50%), transparent)", filter: "blur(50px)" }} />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, hsl(280,80%,40%), transparent)", filter: "blur(70px)", animation: "pulse 3s ease-in-out infinite 1s" }} />
        <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, hsl(48,100%,40%), transparent)", filter: "blur(100px)", transform: "translate(-50%,-50%)", animation: "pulse 4s ease-in-out infinite 0.5s" }} />

        {/* Grid lines */}
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "linear-gradient(hsl(48,100%,50%) 1px, transparent 1px), linear-gradient(90deg, hsl(48,100%,50%) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <div className="inline-block px-4 py-2 rounded-full text-xs uppercase tracking-widest font-bold mb-8 animate-fade-in"
          style={{
            background: "rgba(255,200,0,0.12)",
            border: "1px solid rgba(255,200,0,0.3)",
            color: "hsl(48,100%,65%)",
          }}>
          ⭐ Premium Collection 2026
        </div>

        <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight"
          style={{ fontFamily: "Oswald, sans-serif", color: "hsl(48,100%,60%)", textShadow: "0 0 60px rgba(255,200,0,0.3)" }}>
          {t.heroTitle}
        </h1>

        <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed opacity-80"
          style={{ color: "hsl(48,100%,85%)" }}>
          {t.heroSubtitle}
        </p>

        <button
          onClick={() => scrollTo("products")}
          className="px-10 py-5 rounded-2xl font-bold text-lg uppercase tracking-widest transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95"
          style={{
            background: "linear-gradient(135deg, hsl(48,100%,52%), hsl(48,100%,38%))",
            color: "hsl(270,70%,10%)",
            fontFamily: "Oswald, sans-serif",
            boxShadow: "0 8px 40px rgba(255,200,0,0.4)",
          }}>
          {t.heroButton} →
        </button>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <div className="w-px h-12 animate-pulse" style={{ background: "hsl(48,100%,60%)" }} />
          <span className="text-xs uppercase tracking-widest" style={{ color: "hsl(48,100%,60%)" }}>scroll</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
