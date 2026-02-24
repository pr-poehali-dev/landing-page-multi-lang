export type Language = "en" | "de" | "fr" | "es" | "ru";

export interface Product {
  id: number;
  image: string;
  gallery: string[];
  videoUrl?: string;
  nameKey: string;
  descKey: string;
  longDescKey: string;
  price: string;
  badge?: string;
}

export interface Translations {
  ageTitle: string;
  ageSubtitle: string;
  ageLabel: string;
  agePlaceholder: string;
  ageButton: string;
  ageError: string;
  ageUnder: string;
  navProducts: string;
  navContact: string;
  heroTitle: string;
  heroSubtitle: string;
  heroButton: string;
  productsTitle: string;
  productsSubtitle: string;
  viewDetails: string;
  contactTitle: string;
  contactSubtitle: string;
  contactName: string;
  contactEmail: string;
  contactMessage: string;
  contactSend: string;
  contactSuccess: string;
  contactPhone: string;
  contactTelegram: string;
  contactWhatsapp: string;
  footerText: string;
  close: string;
  gallery: string;
  video: string;
  product1Name: string;
  product1Desc: string;
  product1Long: string;
  product2Name: string;
  product2Desc: string;
  product2Long: string;
  product3Name: string;
  product3Desc: string;
  product3Long: string;
}
