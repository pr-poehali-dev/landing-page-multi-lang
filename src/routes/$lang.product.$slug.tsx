import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import ProductPage from "@/pages/ProductPage";
import { productExists, productHead } from "@/lib/seo";
import { isLang, DEFAULT_LANG } from "@/lib/lang";

export const Route = createFileRoute("/$lang/product/$slug")({
  beforeLoad: ({ params }) => {
    if (!isLang(params.lang)) throw notFound();
    if (!productExists(params.slug)) {
      if (params.lang === DEFAULT_LANG) throw redirect({ to: "/", replace: true });
      throw redirect({ to: "/$lang", params: { lang: params.lang }, replace: true });
    }
  },
  head: ({ params }) => productHead(params.slug, params.lang),
  component: ProductPage,
});
