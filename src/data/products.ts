import { Product } from "@/types/landing";

const IMG1 = "https://cdn.poehali.dev/projects/ddbb85d8-7b82-4154-9714-085bdb6c3887/bucket/6ece2cfc-03c4-4a65-bdd6-c9177dcb99a7.jpg";
const IMG2 = "https://cdn.poehali.dev/projects/6bc9d105-e88c-4eff-9fd4-6f1e815bb78c/files/9110167d-d05d-4136-9c82-fcd1127e165e.jpg";
const IMG3 = "https://cdn.poehali.dev/projects/ddbb85d8-7b82-4154-9714-085bdb6c3887/bucket/6ece2cfc-03c4-4a65-bdd6-c9177dcb99a7.jpg";

export const products: Product[] = [
  {
    id: 1,
    image: IMG1,
    gallery: [IMG1],
    nameKey: "product1Name",
    descKey: "product1Desc",
    longDescKey: "product1Long",
    price: "₽ 3 990",
    badge: "HIT",
  },
  {
    id: 2,
    image: IMG2,
    gallery: [IMG2],
    nameKey: "product2Name",
    descKey: "product2Desc",
    longDescKey: "product2Long",
    price: "₽ 2 490",
    badge: "NEW",
  },
  {
    id: 3,
    image: IMG3,
    gallery: [IMG3],
    nameKey: "product3Name",
    descKey: "product3Desc",
    longDescKey: "product3Long",
    price: "₽ от 9 990",
    badge: "EXCLUSIVE",
  },
];
