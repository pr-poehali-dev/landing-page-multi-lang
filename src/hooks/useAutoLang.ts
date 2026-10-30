import { useEffect } from "react";
import { useNavigate } from "@/lib/router-compat";
import { DEFAULT_LANG, detectLang, langPath } from "@/lib/lang";

export const useAutoLang = (langParam: string | undefined, path: string) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (langParam) return;
    if (/bot|crawl|spider|slurp|facebookexternalhit|twitterbot/i.test(navigator.userAgent)) return;
    const detected = detectLang();
    if (detected !== DEFAULT_LANG) navigate(langPath(detected, path), { replace: true });
  }, [langParam, path, navigate]);
};
