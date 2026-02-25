import { useState } from "react";
import AgeGate from "@/components/AgeGate";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductsSection from "@/components/ProductsSection";
import ProductModal from "@/components/ProductModal";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { Product, Language } from "@/types/landing";
import { translations } from "@/data/translations";
import { products } from "@/data/products";

const detectLanguage = (): Language => {
  const supported: Language[] = ["en", "de", "fr", "es", "ru", "zh", "ja", "pt"];
  const browserLangs = navigator.languages ?? [navigator.language];
  for (const bl of browserLangs) {
    const code = bl.split("-")[0].toLowerCase();
    if (supported.includes(code as Language)) return code as Language;
  }
  return "en";
};

const Index = () => {
  const [ageVerified, setAgeVerified] = useState(false);
  const [lang, setLang] = useState<Language>(detectLanguage);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const t = translations[lang];

  const handleLanguageChange = (newLang: Language) => {
    if (newLang === "ru") {
      window.location.href = "https://dickfon.ru";
      return;
    }
    setLang(newLang);
  };

  if (!ageVerified) {
    return <AgeGate onVerified={() => setAgeVerified(true)} lang={lang} onLangChange={handleLanguageChange} t={t} />;
  }

  return (
    <div className="min-h-screen bg-[hsl(var(--background))]">
      <Navbar lang={lang} onLangChange={handleLanguageChange} t={t} />
      <Hero t={t} />
      <ProductsSection products={products} onSelect={setSelectedProduct} t={t} lang={lang} />
      <ContactSection t={t} />
      <Footer t={t} />
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} t={t} lang={lang} />
      )}
    </div>
  );
};

export default Index;