import { createFileRoute, redirect } from "@tanstack/react-router";
import ProductPage from "@/pages/ProductPage";
import { productExists, productHead } from "@/lib/seo";

export const Route = createFileRoute("/product/$slug")({
  beforeLoad: ({ params }) => {
    if (!productExists(params.slug)) throw redirect({ to: "/", replace: true });
  },
  head: ({ params }) => productHead(params.slug),
  component: ProductPage,
});
