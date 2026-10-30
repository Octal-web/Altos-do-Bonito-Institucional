import { useLang } from "@/hooks/useLang";
import React, { useState, useEffect, useRef } from "react";
import { usePage, Head } from "@inertiajs/react";

import Lenis from "@studio-freight/lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

import { CookieModal } from "../Components/CookieModal";
import { Footer } from "../Components/Footer";
import { Header } from "../Components/Header";
import { AgeGate, hasAgeConfirmation } from "../Components/AgeGate";
import { AgeGateTransition } from "../Components/AgeGateTransition";
import { PageEntranceContext } from "@/hooks/PageEntrance";

const DefaultLayout = ({ children }) => {
    const lang = useLang();
    const {
        controller,
        action,
        pagina,
        notifyCookie,
        rejectCookie,
        idiomas,
        idioma,
        dadosGerais,
    } = usePage().props;

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [trackingEnabled, setTrackingEnabled] = useState(false);
    const [ageConfirmed, setAgeConfirmed] = useState(hasAgeConfirmation);
    const [pageReady, setPageReady] = useState(hasAgeConfirmation);
    const [ageTransition, setAgeTransition] = useState(false);
    const lenisRef = useRef(null);
    const mainRef = useRef(null);
    const focusAfterConfirmation = useRef(false);

    useEffect(() => {
        lenisRef.current = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: "vertical",
            smooth: true,
            smoothTouch: false,
        });

        // O Lenis passa a ser movido pelo ticker do GSAP e avisa o ScrollTrigger
        // a cada frame, mantendo pins e scrubs sincronizados com o scroll suave.
        lenisRef.current.on("scroll", ScrollTrigger.update);

        const raf = (time) => lenisRef.current.raf(time * 1000);

        gsap.ticker.add(raf);
        gsap.ticker.lagSmoothing(0);

        document.fonts?.ready.then(() => ScrollTrigger.refresh());

        return () => {
            gsap.ticker.remove(raf);
            lenisRef.current.destroy();
        };
    }, []);

    useEffect(() => {
        if (isMenuOpen || !pageReady) lenisRef.current?.stop();
        else lenisRef.current?.start();
    }, [isMenuOpen, pageReady]);

    useEffect(() => {
        if (pageReady && focusAfterConfirmation.current) {
            mainRef.current?.focus({ preventScroll: true });
            focusAfterConfirmation.current = false;
        }
    }, [pageReady]);

    const toggleMenu = () => {
        setIsMenuOpen((open) => !open);
    };

    const acceptCookies = () => {
        setTrackingEnabled(true);
    };

    useEffect(() => {
        // const timer = setTimeout(() => {
        //     if (notifyCookie || trackingEnabled) {
        //         if (!document.querySelector('script[src*="googletagmanager.com/gtm.js"]')) {
        //             window.dataLayer = window.dataLayer || [];
        //             window.dataLayer.push({
        //                 'gtm.start': new Date().getTime(),
        //                 event: 'gtm.js'
        //             });
        //             const firstScript = document.getElementsByTagName('script')[0];
        //             const gtmScript = document.createElement('script');
        //             gtmScript.async = true;
        //             gtmScript.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-5P3H4J8';
        //             firstScript.parentNode.insertBefore(gtmScript, firstScript);
        //             if (!document.querySelector('iframe[src*="googletagmanager.com/ns.html"]')) {
        //                 const noscript = document.createElement('noscript');
        //                 const iframe = document.createElement('iframe');
        //                 iframe.src = 'https://www.googletagmanager.com/ns.html?id=GTM-5P3H4J8';
        //                 iframe.height = '0';
        //                 iframe.width = '0';
        //                 iframe.style.display = 'none';
        //                 iframe.style.visibility = 'hidden';
        //                 noscript.appendChild(iframe);
        //                 document.body.insertBefore(noscript, document.body.firstChild);
        //             }
        //         }
        //         if (!document.querySelector('script[src*="86ee18b8-ca84-4bfe-b470-7a540f8a1d03-loader.js"]')) {
        //             const cloudScript = document.createElement('script');
        //             cloudScript.async = true;
        //             cloudScript.src = "https://d335luupugsy2.cloudfront.net/js/loader-scripts/86ee18b8-ca84-4bfe-b470-7a540f8a1d03-loader.js";
        //             document.head.appendChild(cloudScript);
        //         }
        //     }
        // }, 100);
        // return () => clearTimeout(timer);
    }, [notifyCookie, trackingEnabled]);

    const currentPath =
        typeof window !== "undefined" ? window.location.pathname : "";
    const canonicalUrl = `${dadosGerais?.siteUrl ?? ""}${currentPath}`;

    const organizationSchema = dadosGerais
        ? {
              "@context": "https://schema.org",
              "@type": "Winery",
              name: dadosGerais.name,
              url: dadosGerais.siteUrl,
              image: pagina?.imagem?.endereco,

              ...(dadosGerais.telefone && {
                  telephone: dadosGerais.telefone,
              }),

              ...(dadosGerais.email && {
                  email: dadosGerais.email,
              }),

              address: {
                  "@type": "PostalAddress",
                  streetAddress: dadosGerais.endereco,
                  postalCode: dadosGerais.cep,
                  addressCountry: "BR",
              },

              ...(dadosGerais.link_mapa && {
                  hasMap: dadosGerais.link_mapa,
              }),

              ...(dadosGerais.como_chegar && {
                  description: dadosGerais.como_chegar,
              }),

              ...(dadosGerais.horario_atendimento && {
                  openingHours: dadosGerais.horario_atendimento,
              }),

              ...(dadosGerais.latitude && dadosGerais.longitude
                  ? {
                        geo: {
                            "@type": "GeoCoordinates",
                            latitude: dadosGerais.latitude,
                            longitude: dadosGerais.longitude,
                        },
                    }
                  : {}),

              sameAs: [dadosGerais.instagram].filter(Boolean),

              contactPoint: [
                  ...(dadosGerais.whatsapp
                      ? [
                            {
                                "@type": "ContactPoint",
                                telephone: dadosGerais.whatsapp,
                                contactType: "customer service",
                            },
                        ]
                      : []),
              ],
          }
        : null;

    console.log(organizationSchema);

    const pageSchemas = pagina?.schemas ?? [];

    const whatsapp = dadosGerais.whatsapp;
    const whatsappNumber = String(whatsapp || "").replace(/\D/g, "");

    return (
        <>
            <Head>
                <title>{pagina.titulo}</title>
                <meta name="description" content={pagina.descricao} />

                <link rel="canonical" href={canonicalUrl} />

                {idiomas?.map((locale) => (
                    <link
                        key={locale.codigo}
                        rel="alternate"
                        hreflang={
                            locale.codigo === "pt" ? "pt-BR" : locale.codigo
                        }
                        href={locale.url}
                    />
                ))}
                {idiomas?.length > 0 && (
                    <link
                        rel="alternate"
                        hreflang="x-default"
                        href={
                            idiomas.find((l) => l.codigo === idioma)?.url ??
                            canonicalUrl
                        }
                    />
                )}

                <meta property="og:url" content={canonicalUrl} />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content={dadosGerais.name} />
                <meta
                    property="og:locale"
                    content={idioma === "pt" ? "pt_BR" : idioma}
                />
                <meta
                    property="og:title"
                    content={pagina.tituloCompartilhamento}
                />
                <meta
                    property="og:description"
                    content={pagina.descricaoCompartilhamento}
                />
                <meta property="og:image" content={pagina.imagem.endereco} />
                <meta property="og:image:type" content={pagina.imagem.tipo} />
                <meta
                    property="og:image:width"
                    content={pagina.imagem.largura}
                />
                <meta
                    property="og:image:height"
                    content={pagina.imagem.altura}
                />

                <meta name="twitter:card" content="summary_large_image" />
                <meta
                    name="twitter:title"
                    content={pagina.tituloCompartilhamento}
                />
                <meta
                    name="twitter:description"
                    content={pagina.descricaoCompartilhamento}
                />
                <meta name="twitter:image" content={pagina.imagem.endereco} />

                <meta name="robots" content="index, follow" />
                <meta name="author" content={lang("agencia")} />

                <link rel="icon" href={`/favicon.ico`} type="image/x-icon" />

                {/* {organizationSchema && (
                    <script type="application/ld+json">
                        {JSON.stringify(organizationSchema)}
                    </script>
                )}

                {pageSchemas.map((schema, i) => (
                    <script key={i} type="application/ld+json">
                        {JSON.stringify(schema)}
                    </script>
                ))} */}
            </Head>

            {ageTransition && (
                <AgeGateTransition
                    onCovered={() => setAgeConfirmed(true)}
                    onComplete={() => {
                        setPageReady(true);
                        setAgeTransition(false);
                    }}
                />
            )}
            {!ageConfirmed ? (
                <AgeGate
                    instagram={dadosGerais?.instagram}
                    onConfirm={() => {
                        focusAfterConfirmation.current = true;
                        setAgeTransition(true);
                    }}
                />
            ) : (
                <>
                    <a
                        href="#main-content"
                        onClick={() => mainRef.current?.focus()}
                        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[1000] focus:rounded focus:bg-white focus:px-5 focus:py-3 focus:text-black focus:outline focus:outline-2 focus:outline-primary"
                    >
                        {lang("pularConteudo")}
                    </a>
                    <Header
                        isOpen={isMenuOpen}
                        onToggle={toggleMenu}
                        onClose={() => setIsMenuOpen(false)}
                        whatsappHref={`https://wa.me/${whatsappNumber.startsWith("55") ? whatsappNumber : `55${whatsappNumber}`}`}
                    />

                    <main
                        id="main-content"
                        ref={mainRef}
                        tabIndex={-1}
                        className={`overflow-x-clip overflow-y-visible bg-black ${["Cases", "Politicas"].includes(controller) || ["produto"].includes(action) ? " pt-[85px] md:pt-[110px] min-[1441px]:pt-[160px]" : ""}`}
                    >
                        <PageEntranceContext.Provider value={pageReady}>
                            {children}
                        </PageEntranceContext.Provider>
                    </main>

                    <div className="bg-black">
                        <Footer />
                    </div>

                    {notifyCookie || !rejectCookie ? (
                        <CookieModal
                            acceptCookies={acceptCookies}
                            visible={notifyCookie ? false : true}
                        />
                    ) : null}
                </>
            )}
        </>
    );
};

export default DefaultLayout;
