import { Link } from "react-router-dom";
import { Product, Translations, Language } from "@/types/landing";
import Icon from "@/components/ui/icon";

interface Props {
  products: Product[];
  onSelect: (p: Product) => void;
  t: Translations;
  lang: Language;
}

const GLOW: Record<number, string> = {
  1: "rgba(220,160,40,0.7)",
  2: "rgba(40,160,220,0.65)",
  3: "rgba(200,80,20,0.65)",
};

const COLOR: Record<number, string> = {
  1: "#D4A843",
  2: "#28A0DC",
  3: "#C85014",
};

const ProductsSection = ({ products, onSelect, t }: Props) => {
  return (
    <section id="products" className="py-24 px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-cormorant text-[#F5D060] italic text-lg mb-3 text-glow-gold">
            {t.productsSubtitle}
          </p>
          <h2 className="font-oswald text-5xl md:text-6xl uppercase tracking-tight text-white text-glow-white">
            {t.productsTitle}
          </h2>
          <div className="gold-divider" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {products.map((product) => {
            const name = t[product.nameKey as keyof Translations] as string;
            const desc = t[product.descKey as keyof Translations] as string;
            const color = COLOR[product.id] ?? "#F5D060";
            return (
              <div
                key={product.id}
                className="product-card group"
                onClick={() => onSelect(product)}
              >
                <div className="product-card-glow" style={{ background: GLOW[product.id] }} />
                <div className="product-card-inner">
                  <div
                    className="relative overflow-hidden"
                    style={{
                      background: `radial-gradient(ellipse at 50% 55%, ${color}22 0%, transparent 72%)`,
                      height: "260px",
                      borderRadius: "28px 28px 0 0",
                    }}
                  >
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        style={{ display: "block" }}
                      />
                    ) : (
                      <div
                        className="w-full h-full flex items-center justify-center text-6xl"
                        style={{ background: `radial-gradient(circle, ${color}20, transparent)` }}
                      >
                        🎤
                      </div>
                    )}
                    {product.comingSoon && (
                      <div
                        className="absolute inset-0 flex items-center justify-center z-10"
                        style={{ background: "rgba(8,5,16,0.55)", backdropFilter: "blur(2px)" }}
                      >
                        <span className="btn-capsule btn-capsule-clear pointer-events-none">
                          {t.comingSoon}
                        </span>
                      </div>
                    )}
                    {product.badge && (
                      <span className="badge-glass absolute top-4 right-4 z-10">{product.badge}</span>
                    )}
                  </div>

                  <div className="p-5 relative z-10">
                    <div className="mb-3">
                      <span className="product-name-tag">{name}</span>
                    </div>
                    <p className="font-rubik text-white/40 text-sm mb-4 line-clamp-2">{desc}</p>
                    <div className="flex items-center justify-between gap-3">
                      <span
                        className="font-oswald text-2xl text-[#F5D060]"
                        style={{ textShadow: "0 0 16px rgba(245,208,96,0.4)" }}
                      >
                        {product.price === "priceOnRequest" ? t.priceOnRequest : product.price}
                      </span>
                      <Link
                        to={`/product/${product.slug}`}
                        onClick={(e) => e.stopPropagation()}
                        className="btn-capsule btn-capsule-clear text-xs py-2 px-3"
                        style={{ fontSize: "0.68rem" }}
                      >
                        {t.viewDetails}
                        <Icon name="ArrowRight" size={11} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
