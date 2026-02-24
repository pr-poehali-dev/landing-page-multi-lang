import { Product } from "@/types/landing";

const IMG1 = "https://cdn.poehali.dev/projects/6bc9d105-e88c-4eff-9fd4-6f1e815bb78c/files/9b79bd22-ad48-4326-b344-7455523fa211.jpg";
const IMG2 = "https://cdn.poehali.dev/projects/6bc9d105-e88c-4eff-9fd4-6f1e815bb78c/files/9110167d-d05d-4136-9c82-fcd1127e165e.jpg";
const IMG3 = "https://cdn.poehali.dev/projects/6bc9d105-e88c-4eff-9fd4-6f1e815bb78c/files/30211154-c8a9-4b0e-b89d-57c703e9e434.jpg";

export const products: Product[] = [
  {
    id: 1,
    image: IMG1,
    gallery: [
      IMG1,
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80",
      "https://images.unsplash.com/photo-1594576722512-582bcd677da0?w=800&q=80",
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    nameKey: "product1Name",
    descKey: "product1Desc",
    longDescKey: "product1Long",
    price: "€ 299",
    badge: "NEW",
  },
  {
    id: 2,
    image: IMG2,
    gallery: [
      IMG2,
      "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=800&q=80",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80",
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    nameKey: "product2Name",
    descKey: "product2Desc",
    longDescKey: "product2Long",
    price: "€ 599",
    badge: "LIMITED",
  },
  {
    id: 3,
    image: IMG3,
    gallery: [
      IMG3,
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80",
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    nameKey: "product3Name",
    descKey: "product3Desc",
    longDescKey: "product3Long",
    price: "€ 449",
    badge: "SALE",
  },
];
