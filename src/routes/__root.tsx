import type {ReactNode} from "react";
import {HeadContent, Outlet, Scripts, createRootRoute, useRouterState} from "@tanstack/react-router";
import {Toaster} from "@/components/ui/toaster";
import {Toaster as Sonner} from "@/components/ui/sonner";
import {TooltipProvider} from "@/components/ui/tooltip";
import {PLATFORM_META, PLATFORM_SCRIPTS} from "@/platform/scripts.gen";
import {HMR_CLIENT} from "@/platform/dev-hmr";
import NotFound from "@/pages/NotFound";
import {langFromPathname} from "@/lib/lang";
import appCss from "@/index.css?url";

const TITLE = "DICKFON — novelty penis-shaped microphone | karaoke & streaming";
const DESCRIPTION =
    "DICKFON — the world's most outrageous novelty microphone shaped like a penis. Perfect for karaoke parties, bachelorette nights, corporate fun & viral content. Shop Karaoke, Lavalier & Exclusive models.";
const OG_IMAGE = "https://cdn.poehali.dev/projects/***/files/og-image-1774286029030.jpg";

const METRIKA = `(function (m, e, t, r, i, k, a) {
    m[i] = m[i] || function () {
        (m[i].a = m[i].a || []).push(arguments)
    };
    m[i].l = 1 * new Date();
    for (var j = 0; j < document.scripts.length; j++) {
        if (document.scripts[j].src === r) {
            return;
        }
    }
    k = e.createElement(t), a = e.getElementsByTagName(t)[0], k.async = 1, k.src = r, a.parentNode.insertBefore(k, a)
})
(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

ym(101026698, "init", {
    trustedDomains: ["poehali.dev"],
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: true,
    trackHash: true
});`;

export const Route = createRootRoute({
    head: () => ({
        meta: [
            {charSet: "utf-8"},
            {name: "viewport", content: "width=device-width, initial-scale=1.0"},
            {title: TITLE},
            {name: "description", content: DESCRIPTION},
            {name: "keywords", content: "penis microphone, novelty microphone, funny mic, dickfon, karaoke gift, bachelorette party gift, penis shaped mic, phallic microphone, funny gift, lavalier penis mic"},
            {name: "author", content: "DICKFON"},
            {name: "robots", content: "index, follow"},
            {property: "og:type", content: "website"},
            {property: "og:url", content: "https://dickfon.xyz/"},
            {property: "og:title", content: TITLE},
            {property: "og:description", content: DESCRIPTION},
            {property: "og:image", content: OG_IMAGE},
            {property: "og:image:width", content: "4800"},
            {property: "og:image:height", content: "2520"},
            {property: "og:image:alt", content: "DICKFON — novelty penis-shaped microphone"},
            {property: "og:locale", content: "en_US"},
            {name: "twitter:card", content: "summary_large_image"},
            {name: "twitter:site", content: "@Dickfon_karaoke"},
            {name: "twitter:title", content: "DICKFON — the most outrageous novelty microphone"},
            {name: "twitter:description", content: "A fully functional penis-shaped microphone for karaoke, streaming and unforgettable parties."},
            {name: "twitter:image", content: OG_IMAGE},
            {name: "google-site-verification", content: "5AMk59cjeYrKSMlQDDo7On_YdGfUEyTv0tsRPPvm5uM"},
            {name: "yandex-verification", content: "7fa7772540c06616"},
            ...PLATFORM_META,
        ],
        links: [
            {rel: "stylesheet", href: appCss},
            {rel: "preconnect", href: "https://fonts.googleapis.com"},
            {rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous"},
            {
                rel: "stylesheet",
                href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800;900&family=Oswald:wght@300;400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Rubik:wght@300;400;500&display=swap",
            },
            {rel: "icon", type: "image/svg+xml", href: "/favicon.svg"},
            {rel: "apple-touch-icon", href: "/favicon.svg"},
        ],
        // IMPORTANT: DO NOT REMOVE PLATFORM SCRIPTS AND THE DEV HMR CLIENT!
        scripts: [
            ...(import.meta.env.DEV ? [{children: HMR_CLIENT}] : []),
            ...PLATFORM_SCRIPTS,
            {children: METRIKA},
        ],
    }),
    component: RootComponent,
    notFoundComponent: NotFound,
});

function RootComponent() {
    return (
        <RootDocument>
            <TooltipProvider>
                <Toaster/>
                <Sonner/>
                <Outlet/>
            </TooltipProvider>
        </RootDocument>
    );
}

function RootDocument({children}: { children: ReactNode }) {
    const pathname = useRouterState({select: (s) => s.location.pathname});
    return (
        <html lang={langFromPathname(pathname)}>
        <head>
            <HeadContent/>
        </head>
        <body>
        {children}
        <noscript>
            <div><img src="https://mc.yandex.ru/watch/101026698" style={{position: "absolute", left: "-9999px"}} alt=""/></div>
        </noscript>
        <Scripts/>
        </body>
        </html>
    );
}
