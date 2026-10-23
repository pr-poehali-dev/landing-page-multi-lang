import { Translations } from "@/types/landing";
import Icon from "@/components/ui/icon";

interface Props { t: Translations }

const Hero = ({ t }: Props) => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <p className="font-cormorant text-[#F5D060] text-lg italic tracking-widest mb-4 text-glow-gold">
          — {t.heroTitle} —
        </p>

        <h1 className="font-oswald text-6xl md:text-8xl lg:text-9xl uppercase tracking-tight leading-none mb-6 hero-gradient-text">
          DICK
          <br />
          <span style={{ WebkitTextFillColor: "white", filter: "drop-shadow(0 0 18px rgba(255,255,255,0.12))" }}>
            FON
          </span>
        </h1>

        <p className="font-rubik text-white/55 text-lg md:text-xl max-w-lg mx-auto mb-12">
          {t.heroSubtitle}
        </p>

        <button
          onClick={() => scrollTo("products")}
          className="btn-capsule btn-capsule-blue text-base px-8 py-4"
        >
          {t.heroButton}
          <Icon name="ArrowDown" size={18} />
        </button>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <Icon name="ChevronDown" size={24} className="text-white/25" />
      </div>
    </section>
  );
};

export default Hero;
