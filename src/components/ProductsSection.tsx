import { Product, Translations, Language } from "@/types/landing";

interface Props {
  products: Product[];
  onSelect: (p: Product) => void;
  t: Translations;
  lang: Language;
}

const badgeColors: Record<string, string> = {
  NEW: "linear-gradient(135deg, #22c55e, #16a34a)",
  LIMITED: "linear-gradient(135deg, hsl(48,100%,50%), hsl(48,100%,35%))",
  SALE: "linear-gradient(135deg, #ef4444, #b91c1c)",
};

const ProductsSection = ({ products, onSelect, t, lang }: Props) => {
  return (
    <section id="products" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, hsl(270,70%,6%) 0%, hsl(270,60%,10%) 50%, hsl(270,70%,6%) 100%)" }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4"
            style={{ fontFamily: "Oswald, sans-serif", color: "hsl(48,100%,60%)" }}>
            {t.productsTitle}
          </h2>
          <p className="text-lg opacity-60" style={{ color: "hsl(48,100%,85%)" }}>
            {t.productsSubtitle}
          </p>
          <div className="w-24 h-1 mx-auto mt-6 rounded-full"
            style={{ background: "linear-gradient(90deg, hsl(48,100%,50%), transparent)" }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product, index) => {
            const name = t[product.nameKey as keyof Translations] as string;
            const desc = t[product.descKey as keyof Translations] as string;
            return (
              <div
                key={product.id}
                className="group rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:-translate-y-2"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,200,0,0.15)",
                  boxShadow: "0 4px 30px rgba(0,0,0,0.3)",
                  animationDelay: `${index * 0.1}s`,
                }}
                onClick={() => onSelect(product)}>

                {/* Image */}
                <div className="relative overflow-hidden h-64">
                  <img
                    src={product.image}
                    alt={name}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 transition-all duration-300 group-hover:opacity-60"
                    style={{ background: "linear-gradient(180deg, transparent 40%, hsl(270,70%,6%) 100%)" }} />

                  {product.badge && (
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest text-white"
                      style={{ background: badgeColors[product.badge] }}>
                      {product.badge}
                    </div>
                  )}

                  {/* Play icon hint */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
                      style={{ background: "rgba(255,200,0,0.2)", border: "2px solid rgba(255,200,0,0.5)", backdropFilter: "blur(4px)" }}>
                      ▶
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-black mb-2 tracking-wide"
                    style={{ fontFamily: "Oswald, sans-serif", color: "hsl(48,100%,65%)" }}>
                    {name}
                  </h3>
                  <p className="text-sm mb-4 opacity-65 leading-relaxed" style={{ color: "hsl(48,100%,85%)" }}>
                    {desc}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black" style={{ color: "hsl(48,100%,55%)" }}>
                      {product.price}
                    </span>
                    <button
                      className="px-4 py-2 rounded-xl text-sm font-bold uppercase tracking-wide transition-all duration-200 hover:scale-105"
                      style={{
                        background: "linear-gradient(135deg, hsl(48,100%,50%), hsl(48,100%,38%))",
                        color: "hsl(270,70%,10%)",
                      }}>
                      {t.viewDetails}
                    </button>
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
