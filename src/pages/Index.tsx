import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "@/lib/router-compat";
import NotFound from "@/pages/NotFound";
import { DEFAULT_LANG, isLang, langPath } from "@/lib/lang";
import AgeGate from "@/components/AgeGate";
import { useAgeGate } from "@/hooks/useAgeGate";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductsSection from "@/components/ProductsSection";
import ProductModal from "@/components/ProductModal";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { Product, Language } from "@/types/landing";
import { translations } from "@/data/translations";
import { products } from "@/data/products";

const Index = () => {
  const { lang: langParam } = useParams<{ lang?: string }>();
  const navigate = useNavigate();
  const { hash } = useLocation();
  const { ageVerified, handleVerified } = useAgeGate();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const invalid = !!langParam && !isLang(langParam);
  const lang: Language = isLang(langParam) ? langParam : DEFAULT_LANG;
  const t = translations[lang];

  useEffect(() => {
    const legacy = new URLSearchParams(window.location.search).get("lang");
    if (isLang(legacy)) navigate(langPath(legacy), { replace: true });
  }, [navigate]);

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0 });
      return;
    }
    const timer = setTimeout(() => {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth" });
    }, 100);
    return () => clearTimeout(timer);
  }, [hash, langParam]);

  const handleLanguageChange = (newLang: Language) => {
    navigate(langPath(newLang));
  };

  if (invalid) return <NotFound />;

  return (
    <div className="min-h-screen relative">
      <div className="liquid-bg">
        <div className="liquid-blob liquid-blob-1" />
        <div className="liquid-blob liquid-blob-2" />
        <div className="liquid-blob liquid-blob-3" />
        <div className="liquid-blob liquid-blob-4" />
        <div className="liquid-blob liquid-blob-5" />
      </div>
      <Navbar lang={lang} onLangChange={handleLanguageChange} t={t} />
      <Hero t={t} />
      <ProductsSection products={products} onSelect={setSelectedProduct} t={t} lang={lang} />
      <ContactSection t={t} />
      <Footer t={t} />
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} t={t} lang={lang} />
      )}
      {!ageVerified && (
        <AgeGate onVerified={handleVerified} lang={lang} onLangChange={handleLanguageChange} t={t} />
      )}
    </div>
  );
};

export default Index;