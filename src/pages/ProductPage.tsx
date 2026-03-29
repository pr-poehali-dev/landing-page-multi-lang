import { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { products } from "@/data/products";
import { translations } from "@/data/translations";
import { Language, Translations } from "@/types/landing";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import Icon from "@/components/ui/icon";

const detectLanguage = (): Language => {
  const supported: Language[] = ["en", "zh", "hi", "es", "fr", "pt", "id", "de", "ja"];
  const browserLangs = navigator.languages ?? [navigator.language];
  for (const bl of browserLangs) {
    const code = bl.split("-")[0].toLowerCase();
    if (supported.includes(code as Language)) return code as Language;
  }
  return "en";
};

const ProductPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const product = products.find((p) => p.slug === slug);
  const lang = detectLanguage();
  const t = translations[lang];

  const name = product ? (t[product.nameKey as keyof Translations] as string) : "";
  const longDesc = product ? (t[product.longDescKey as keyof Translations] as string) : "";
  const metaTitle = product ? (t[product.metaTitleKey as keyof Translations] as string) : "";
  const metaDesc = product ? (t[product.metaDescKey as keyof Translations] as string) : "";
  const metaKeywords = product ? (t[product.metaKeywordsKey as keyof Translations] as string) : "";

  useEffect(() => {
    if (!product) {
      navigate("/", { replace: true });
      return;
    }

    document.title = metaTitle;

    const setMeta = (name: string, content: string) => {
      let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    const setOgMeta = (property: string, content: string) => {
      let el = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("property", property);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("description", metaDesc);
    setMeta("keywords", metaKeywords);
    setOgMeta("og:title", metaTitle);
    setOgMeta("og:description", metaDesc);
    if (product.image) setOgMeta("og:image", product.image);
    setOgMeta("og:type", "product");

    return () => {
      document.title = "DICKFON";
    };
  }, [product, metaTitle, metaDesc, metaKeywords, navigate]);

  if (!product) return null;

  const handleLangChange = (newLang: Language) => {
    window.location.href = `/?lang=${newLang}`;
  };

  const paragraphs = longDesc.split("\n\n").filter(Boolean);

  return (
    <div className="min-h-screen" style={{ background: "hsl(270,70%,6%)" }}>
      <Navbar lang={lang} onLangChange={handleLangChange} t={t} />

      <main className="max-w-4xl mx-auto px-6 pt-32 pb-20">
        <Link
          to="/#products"
          className="inline-flex items-center gap-2 mb-8 text-sm font-semibold uppercase tracking-widest transition-opacity hover:opacity-70"
          style={{ color: "hsl(48,100%,60%)" }}>
          <Icon name="ArrowLeft" size={16} />
          {t.navProducts}
        </Link>

        <div className="rounded-3xl overflow-hidden mb-10"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,200,0,0.15)",
            boxShadow: "0 4px 60px rgba(0,0,0,0.4)",
          }}>

          {product.image && (
            <div className="relative overflow-hidden" style={{ maxHeight: "480px" }}>
              <img
                src={product.image}
                alt={name}
                className="w-full object-cover"
                style={{ maxHeight: "480px" }}
              />
              <div className="absolute inset-0"
                style={{ background: "linear-gradient(180deg, transparent 50%, hsl(270,70%,6%) 100%)" }} />
              {product.badge && (
                <div className="absolute top-6 right-6 px-4 py-1.5 rounded-full text-sm font-black uppercase tracking-widest text-white"
                  style={{ background: "linear-gradient(135deg, hsl(48,100%,50%), hsl(48,100%,35%))", color: "hsl(270,70%,10%)" }}>
                  {product.badge}
                </div>
              )}
            </div>
          )}

          <div className="px-8 py-8">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
              <h1 className="text-3xl md:text-4xl font-black"
                style={{ fontFamily: "Oswald, sans-serif", color: "hsl(48,100%,60%)" }}>
                {name}
              </h1>
              <span className="text-3xl font-black shrink-0"
                style={{ color: "hsl(48,100%,55%)" }}>
                {product.price === "priceOnRequest" ? t.priceOnRequest : product.price}
              </span>
            </div>

            <div className="w-full h-px mb-8 opacity-20" style={{ background: "hsl(48,100%,50%)" }} />

            <div className="space-y-4">
              {paragraphs.map((p, i) => (
                <p key={i} className="text-base leading-relaxed" style={{ color: "hsl(48,100%,82%)", opacity: 0.85 }}>
                  {p}
                </p>
              ))}
            </div>

            <div className="mt-10">
              <Link
                to="/#contact"
                className="inline-flex items-center justify-center w-full py-4 rounded-2xl font-bold text-lg uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-95"
                style={{
                  background: "linear-gradient(135deg, hsl(48,100%,50%), hsl(48,100%,35%))",
                  color: "hsl(270,70%,10%)",
                  fontFamily: "Oswald, sans-serif",
                  boxShadow: "0 8px 30px rgba(255,200,0,0.3)",
                }}>
                {t.contactTitle}
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products.filter((p) => p.slug !== slug).map((p) => {
            const pName = t[p.nameKey as keyof Translations] as string;
            const pDesc = t[p.descKey as keyof Translations] as string;
            return (
              <Link
                key={p.id}
                to={`/product/${p.slug}`}
                className="group rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,200,0,0.12)",
                }}>
                {p.image && (
                  <div className="h-40 overflow-hidden">
                    <img src={p.image} alt={pName}
                      className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110" />
                  </div>
                )}
                <div className="p-4">
                  <h3 className="text-base font-black mb-1"
                    style={{ fontFamily: "Oswald, sans-serif", color: "hsl(48,100%,65%)" }}>
                    {pName}
                  </h3>
                  <p className="text-xs leading-relaxed opacity-60" style={{ color: "hsl(48,100%,85%)" }}>
                    {pDesc}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </main>

      <ContactSection t={t} />
      <Footer t={t} />
    </div>
  );
};

export default ProductPage;
