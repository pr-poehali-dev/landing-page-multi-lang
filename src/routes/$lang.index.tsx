import { createFileRoute, notFound } from "@tanstack/react-router";
import Index from "@/pages/Index";
import { homeHead } from "@/lib/seo";
import { isLang } from "@/lib/lang";

export const Route = createFileRoute("/$lang/")({
  beforeLoad: ({ params }) => {
    if (!isLang(params.lang)) throw notFound();
  },
  head: ({ params }) => homeHead(params.lang),
  component: Index,
});
