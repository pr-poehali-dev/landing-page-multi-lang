import { createFileRoute } from "@tanstack/react-router";
import Index from "@/pages/Index";
import { homeHead } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => homeHead(),
  component: Index,
});
