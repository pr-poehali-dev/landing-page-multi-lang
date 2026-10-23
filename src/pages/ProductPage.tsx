import { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { products } from "@/data/products";
import { translations } from "@/data/translations";
import { Language, Translations } from "@/types/landing";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import Icon from "@/components/ui/icon";
import AgeGate from "@/components/AgeGate";
import { useAgeGate } from "@/hooks/useAgeGate";

const supported: Language[] = ["en", "zh", "hi", "es", "fr", "pt", "id", "de", "ja", "it"];

const detectLanguage = (): Language => {
  const urlLang = new URLSearchParams(window.location.search).get("lang");
  if (urlLang && supported.includes(urlLang as Language)) return urlLang as Language;
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
  const { ageVerified, handleVerified } = useAgeGate();

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

    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", `https://dickfon.xyz/product/${product.slug}`);

    return () => {
      document.title = "DICKFON";
    };
  }, [product, metaTitle, metaDesc, metaKeywords, navigate]);

  if (!product) return null;

  const handleLangChange = (newLang: Language) => {
    window.location.href = `/?lang=${newLang}`;
  };

  const handleGateLangChange = (newLang: Language) => {
    navigate({ search: `?lang=${newLang}` }, { replace: true });
  };

  const paragraphs = longDesc.split("\n\n").filter(Boolean);

  return (
    <div className="min-h-screen relative">
      <div className="liquid-bg">
        <div className="liquid-blob liquid-blob-1" />
        <div className="liquid-blob liquid-blob-2" />
        <div className="liquid-blob liquid-blob-3" />
        <div className="liquid-blob liquid-blob-4" />
        <div className="liquid-blob liquid-blob-5" />
      </div>
      <Navbar lang={lang} onLangChange={handleLangChange} t={t} />

      <main className="relative z-10 max-w-4xl mx-auto px-6 pt-28 pb-20">
        <Link
          to="/#products"
          className="btn-capsule btn-capsule-clear mb-8 text-xs">
          <Icon name="ArrowLeft" size={16} />
          {t.navProducts}
        </Link>

        <div className="product-card-inner mb-10" style={{ borderRadius: 32 }}>

          {product.image && (
            <div className="relative overflow-hidden" style={{ maxHeight: "480px" }}>
              <img
                src={product.image}
                alt={name}
                className="w-full object-cover"
                style={{ maxHeight: "480px" }}
              />
              <div className="absolute inset-0"
                style={{ background: "linear-gradient(180deg, transparent 60%, rgba(8,5,16,0.7) 100%)" }} />
              {product.badge && (
                <span className="badge-glass absolute top-6 right-6 z-10">{product.badge}</span>
              )}
            </div>
          )}

          <div className="px-8 py-8">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
              <h1 className="font-oswald text-3xl md:text-4xl uppercase tracking-tight text-white text-glow-white">
                {name}
              </h1>
              <span className="font-oswald text-3xl shrink-0 text-[#F5D060]"
                style={{ textShadow: "0 0 16px rgba(245,208,96,0.4)" }}>
                {product.price === "priceOnRequest" ? t.priceOnRequest : product.price}
              </span>
            </div>

            <hr className="section-sep mb-8" />

            <div className="space-y-4">
              {paragraphs.map((p, i) => (
                <p key={i} className="font-rubik text-base leading-relaxed text-white/60">
                  {p}
                </p>
              ))}
            </div>

            <div className="mt-10">
              <Link
                to="/#contact"
                className="btn-capsule btn-capsule-blue w-full py-4 text-base">
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
                className="product-card group">
                <div className="product-card-inner">
                {p.image && (
                  <div className="h-40 overflow-hidden">
                    <img src={p.image} alt={pName}
                      className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110" />
                  </div>
                )}
                <div className="p-4 relative z-10">
                  <div className="mb-2"><span className="product-name-tag">{pName}</span></div>
                  <p className="font-rubik text-xs leading-relaxed text-white/40">{pDesc}</p>
                </div>
                </div>
              </Link>
            );
          })}
        </div>
      </main>

      <ContactSection t={t} />
      <Footer t={t} />
      {!ageVerified && (
        <AgeGate onVerified={handleVerified} lang={lang} onLangChange={handleGateLangChange} t={t} />
      )}
    </div>
  );
};

export default ProductPage;