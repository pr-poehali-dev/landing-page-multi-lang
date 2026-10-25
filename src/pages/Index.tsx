import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NotFound from "@/pages/NotFound";
import { useSeo } from "@/hooks/useSeo";
import { homeSeo } from "@/data/seo";
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
  const { ageVerified, handleVerified } = useAgeGate();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const invalid = !!langParam && !isLang(langParam);
  const lang: Language = isLang(langParam) ? langParam : DEFAULT_LANG;
  const t = translations[lang];
  const seo = homeSeo[lang];

  useSeo({ lang, path: "/", title: seo.title, description: seo.description, keywords: seo.keywords });

  useEffect(() => {
    const legacy = new URLSearchParams(window.location.search).get("lang");
    if (isLang(legacy)) navigate(langPath(legacy), { replace: true });
  }, [navigate]);

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