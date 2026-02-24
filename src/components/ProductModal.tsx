import { useState, useEffect } from "react";
import { Product, Translations, Language } from "@/types/landing";
import Icon from "@/components/ui/icon";

interface Props {
  product: Product;
  onClose: () => void;
  t: Translations;
  lang: Language;
}

const ProductModal = ({ product, onClose, t, lang }: Props) => {
  const [activeTab, setActiveTab] = useState<"gallery" | "video">("gallery");
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", handler); };
  }, [onClose]);

  const name = t[product.nameKey as keyof Translations] as string;
  const longDesc = t[product.longDescKey as keyof Translations] as string;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(5,0,15,0.88)", backdropFilter: "blur(12px)" }}
      onClick={e => e.target === e.currentTarget && onClose()}>

      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl"
        style={{
          background: "hsl(270,60%,10%)",
          border: "1px solid rgba(255,200,0,0.2)",
          boxShadow: "0 0 80px rgba(255,200,0,0.12), 0 40px 80px rgba(0,0,0,0.6)",
        }}>

        {/* Close button */}
        <button onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
          style={{ background: "rgba(255,200,0,0.12)", border: "1px solid rgba(255,200,0,0.25)", color: "hsl(48,100%,70%)" }}>
          <Icon name="X" size={18} />
        </button>

        {/* Tabs */}
        <div className="flex gap-1 p-4 pb-0">
          {(["gallery", "video"] as const).map(tab => (
            <button key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-5 py-2 rounded-xl text-sm font-bold uppercase tracking-wide transition-all duration-200"
              style={{
                background: activeTab === tab ? "linear-gradient(135deg, hsl(48,100%,50%), hsl(48,100%,35%))" : "rgba(255,255,255,0.05)",
                color: activeTab === tab ? "hsl(270,70%,10%)" : "hsl(48,100%,70%)",
              }}>
              {tab === "gallery" ? t.gallery : t.video}
            </button>
          ))}
        </div>

        {/* Gallery */}
        {activeTab === "gallery" && (
          <div className="p-4">
            <div className="relative rounded-2xl overflow-hidden mb-3" style={{ height: "320px" }}>
              <img src={product.gallery[activeImg]} alt={name}
                className="w-full h-full object-cover transition-all duration-500" />
              
              {/* Nav arrows */}
              {product.gallery.length > 1 && (
                <>
                  <button onClick={() => setActiveImg((activeImg - 1 + product.gallery.length) % product.gallery.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                    style={{ background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,200,0,0.3)", color: "hsl(48,100%,70%)" }}>
                    <Icon name="ChevronLeft" size={18} />
                  </button>
                  <button onClick={() => setActiveImg((activeImg + 1) % product.gallery.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                    style={{ background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,200,0,0.3)", color: "hsl(48,100%,70%)" }}>
                    <Icon name="ChevronRight" size={18} />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3">
              {product.gallery.map((img, i) => (
                <button key={i} onClick={() => setActiveImg(i)}
                  className="flex-1 rounded-xl overflow-hidden transition-all duration-200 hover:scale-105"
                  style={{ height: "70px", border: i === activeImg ? "2px solid hsl(48,100%,55%)" : "2px solid transparent" }}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Video */}
        {activeTab === "video" && product.videoUrl && (
          <div className="p-4">
            <div className="rounded-2xl overflow-hidden" style={{ paddingTop: "56.25%", position: "relative" }}>
              <iframe src={product.videoUrl} title="Product video"
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen />
            </div>
          </div>
        )}

        {/* Product info */}
        <div className="px-6 pb-8">
          <div className="flex items-start justify-between mb-4">
            <h2 className="text-3xl font-black" style={{ fontFamily: "Oswald, sans-serif", color: "hsl(48,100%,60%)" }}>
              {name}
            </h2>
            <span className="text-3xl font-black" style={{ color: "hsl(48,100%,55%)" }}>
              {product.price}
            </span>
          </div>

          <div className="w-full h-px mb-6 opacity-20" style={{ background: "hsl(48,100%,50%)" }} />

          <p className="text-base leading-relaxed opacity-75" style={{ color: "hsl(48,100%,85%)" }}>
            {longDesc}
          </p>

          <button onClick={onClose}
            className="mt-8 w-full py-4 rounded-2xl font-bold text-lg uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-95"
            style={{
              background: "linear-gradient(135deg, hsl(48,100%,50%), hsl(48,100%,35%))",
              color: "hsl(270,70%,10%)",
              fontFamily: "Oswald, sans-serif",
              boxShadow: "0 8px 30px rgba(255,200,0,0.3)",
            }}>
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
