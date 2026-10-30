import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
    Navigation,
    Pagination,
    Autoplay,
    EffectFade,
    A11y,
} from "swiper/modules";
import "swiper/swiper-bundle.css";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useGsap } from "@/hooks/useGsap";
import { getHeaderLogoRect, HERO_LOGO_END } from "@/Components/Header";
import { useLang } from "@/hooks/useLang";
import { usePageEntrance } from "@/hooks/PageEntrance";

export const HomeSlides = ({ slides = [] }) => {
    const lang = useLang();
    const pageReady = usePageEntrance();
    const sectionRef = useRef(null);
    const swiperRef = useRef(null);
    const prevButtonRef = useRef(null);
    const nextButtonRef = useRef(null);

    useEffect(() => {
        const swiper = swiperRef.current;
        if (pageReady) swiper?.autoplay?.start();
        else swiper?.autoplay?.stop();
        sectionRef.current?.querySelectorAll("video").forEach((video) => {
            if (pageReady) video.play().catch(() => {});
            else video.pause();
        });
    }, [pageReady]);

    useGsap(sectionRef, (_, q) => {
        if (!pageReady) return;
        // Entrada do logo: a ilustração se ergue de baixo, o nome sobe da máscara
        // e a localização aparece por último (anima as imagens internas para não
        // disputar propriedades com a animação de scroll, que move as camadas externas)
        gsap.timeline({ delay: 0.4 })
            .fromTo(
                q("[data-logo-illustration] img"),
                { clipPath: "inset(100% 0% 0% 0%)" },
                {
                    clipPath: "inset(0% 0% 0% 0%)",
                    duration: 1.6,
                    ease: "expo.inOut",
                },
            )
            .from(
                q("[data-logo-name] img"),
                { yPercent: 105, duration: 1.4, ease: "expo.out" },
                0.5,
            )
            .from(
                q("[data-logo-location] img"),
                { autoAlpha: 0, yPercent: 60, duration: 1.2, ease: "expo.out" },
                0.9,
            );

        // Saída do logo, presa ao scroll: ilustração e localização se desfazem e
        // o nome (mesma imagem do logo do header) voa até o header; ao chegar
        // as duas imagens coincidem e a troca entre elas fica invisível
        const name = q("[data-logo-name]")[0];
        const headerLogo = document.querySelector("header [data-header-logo]");

        if (name && headerLogo) {
            // Posição sem transforms (offset*), relativa à camada fixa em 0,0,
            // para continuar correta quando o ScrollTrigger recalcula no meio do scroll
            const flight = () => {
                const rect = getHeaderLogoRect();

                return {
                    x:
                        rect.left +
                        rect.width / 2 -
                        (name.offsetLeft + name.offsetWidth / 2),
                    y:
                        rect.top +
                        rect.height / 2 -
                        (name.offsetTop + name.offsetHeight / 2),
                    scale: rect.width / (name.offsetWidth || rect.width),
                };
            };

            gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: () => `+=${window.innerHeight * HERO_LOGO_END}`,
                    scrub: true,
                    invalidateOnRefresh: true,
                },
            })
                .to(
                    q("[data-logo-illustration]"),
                    {
                        yPercent: -35,
                        clipPath: "inset(0% 0% 100% 0%)",
                        autoAlpha: 0,
                        duration: 0.5,
                        ease: "power2.in",
                    },
                    0,
                )
                .to(
                    q("[data-logo-location]"),
                    {
                        yPercent: 80,
                        autoAlpha: 0,
                        duration: 0.4,
                        ease: "power2.in",
                    },
                    0,
                )
                .to(
                    name,
                    {
                        x: () => flight().x,
                        y: () => flight().y,
                        scale: () => flight().scale,
                        duration: 0.87,
                        ease: "power3.inOut",
                    },
                    0.1,
                )
                .to(name, { autoAlpha: 0, duration: 0.03 }, 0.97)
                .fromTo(
                    headerLogo,
                    { autoAlpha: 0 },
                    { autoAlpha: 1, duration: 0.03 },
                    0.97,
                );
        }

        // Entrada: a mídia desfaz um zoom lento ao carregar a página
        gsap.fromTo(q("picture img, video"), { scale: 1.25 }, {
            scale: 1,
            duration: 2.8,
            ease: "expo.out",
        });

        // Saída: a mídia desce mais devagar que o scroll (efeito cortina),
        // o indicador de scroll some e a tela escurece
        const scrollTrigger = {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
        };

        gsap.to(q("[data-hero-stage]"), {
            yPercent: 40,
            ease: "none",
            scrollTrigger,
        });
        gsap.to(q("[data-hero-scroll]"), {
            autoAlpha: 0,
            ease: "none",
            scrollTrigger: { ...scrollTrigger, end: "20% top" },
        });
        gsap.to(q("[data-hero-shade]"), {
            opacity: 1,
            ease: "none",
            scrollTrigger,
        });

        gsap.fromTo(
            q("[data-hero-line]"),
            { scaleY: 0, transformOrigin: "top" },
            {
                keyframes: [
                    { scaleY: 1, duration: 0.9, ease: "expo.inOut" },
                    {
                        scaleY: 0,
                        transformOrigin: "bottom",
                        duration: 0.9,
                        ease: "expo.inOut",
                    },
                ],
                repeat: -1,
                repeatDelay: 0.3,
            },
        );
    }, [pageReady]);

    if (!slides.length) return null;

    return (
        <section
            ref={sectionRef}
            className="relative z-40 overflow-hidden"
            aria-label={lang("destaques")}
        >
            {/* Os slides do gerenciador só trocam o fundo; o conteúdo é sempre o logo */}
            <div data-hero-stage>
            <Swiper
                ref={swiperRef}
                slidesPerView={1}
                allowTouchMove={false}
                watchOverflow
                effect="fade"
                navigation={{
                    prevEl: prevButtonRef.current,
                    nextEl: nextButtonRef.current,
                }}
                pagination={{ clickable: true }}
                autoplay={{ delay: 10000, disableOnInteraction: false }}
                loop
                onBeforeInit={(swiper) => {
                    swiper.params.navigation.prevEl = prevButtonRef.current;
                    swiper.params.navigation.nextEl = nextButtonRef.current;
                }}
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                    if (!pageReady) swiper.autoplay?.stop();
                }}
                modules={[Navigation, Pagination, Autoplay, EffectFade, A11y]}
                a11y={{
                    enabled: true,
                    prevSlideMessage: lang("slideAnterior"),
                    nextSlideMessage: lang("proximoSlide"),
                    firstSlideMessage: lang("primeiroSlide"),
                    lastSlideMessage: lang("ultimoSlide"),
                    paginationBulletMessage: lang("irSlide"),
                }}
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={slide.id}>
                        <article className="relative z-[1] flex h-screen items-center">
                            {slide.tipo === "imagem" && (
                                <picture className="absolute inset-0 block h-full w-full">
                                    {slide.imagem && (
                                        <source
                                            media="(min-width: 768px)"
                                            srcSet={slide.imagem}
                                        />
                                    )}

                                    <img
                                        src={
                                            slide.imagem_mobile || slide.imagem
                                        }
                                        alt={slide.titulo ?? ""}
                                        loading={index === 0 ? "eager" : "lazy"}
                                        decoding={
                                            index === 0 ? "sync" : "async"
                                        }
                                        fetchpriority={
                                            index === 0 ? "high" : "auto"
                                        }
                                        className="h-full w-full object-cover"
                                        style={!pageReady ? { transform: "scale(1.25)" } : undefined}
                                    />
                                </picture>
                            )}

                            {slide.tipo === "video" && (
                                <video
                                    className="absolute inset-0 h-full w-full object-cover"
                                    autoPlay={pageReady}
                                    style={!pageReady ? { transform: "scale(1.25)" } : undefined}
                                    muted
                                    loop
                                    playsInline
                                    preload={index === 0 ? "auto" : "metadata"}
                                    poster={
                                        slide.imagem_mobile ||
                                        slide.imagem ||
                                        undefined
                                    }
                                    aria-hidden="true"
                                >
                                    {slide.video && (
                                        <source
                                            media="(min-width: 768px)"
                                            src={slide.video}
                                            type="video/mp4"
                                        />
                                    )}
                                    <source
                                        src={slide.video_mobile || slide.video}
                                        type="video/mp4"
                                    />
                                </video>
                            )}

                            <div
                                className="absolute inset-0 bg-black/60"
                                aria-hidden="true"
                            />
                        </article>
                    </SwiperSlide>
                ))}
            </Swiper>
            </div>

            <div
                data-hero-shade
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-[2] bg-black opacity-0"
            />

            {/* Camada fixa (sem transforms nos ancestrais) para o nome poder voar até
                o header; com movimento reduzido ela só rola junto com o banner.
                Larguras e espaçamentos (em % da largura) seguem a arte original */}
            <div className="pointer-events-none absolute inset-0 z-[3] flex items-center justify-center motion-safe:fixed"
                style={{ visibility: pageReady ? "visible" : "hidden" }}>
                <div className="flex w-[90vw] max-w-[820px] flex-col items-center lg:w-[50vw]">
                    <div
                        data-logo-illustration
                        className="mb-[5.13%] w-[49.3%] will-change-transform"
                    >
                        <img
                            src="/site/img/logo-ilustracao.png"
                            alt=""
                            fetchpriority="high"
                            className="block h-auto w-full"
                        />
                    </div>

                    <h1
                        data-logo-name
                        className="w-full overflow-hidden will-change-transform"
                    >
                        <img
                            src="/site/img/logo.png"
                            alt="Altos do Bonito"
                            fetchpriority="high"
                            onLoad={() => ScrollTrigger.refresh()}
                            className="block h-auto w-full"
                        />
                    </h1>

                    <p
                        data-logo-location
                        className="mt-[3.3%] w-[49.1%] will-change-transform"
                    >
                        <img
                            src="/site/img/logo-localizacao.png"
                            alt="Nova Pádua, RS"
                            fetchpriority="high"
                            className="block h-auto w-full"
                        />
                    </p>
                </div>
            </div>

            <div
                data-hero-scroll
                className="absolute bottom-6 left-1/2 z-[3] flex -translate-x-1/2 flex-col items-center"
            >
                <span data-hero-line className="mb-3 h-16 w-px bg-white" />

                <span className="text-[10px] font-medium tracking-[5px] text-white">
                    SCROLL
                </span>
            </div>

            {/* <div className="absolute bottom-10 z-10 w-full">
                <div className="container max-w-large">
                    <div className="-mx-16 flex justify-between">
                        <button ref={prevButtonRef} type="button" aria-label="Slide anterior" className="relative h-7 w-7 cursor-pointer transition-all duration-200 ease-out before:absolute before:left-2 before:top-1.5 before:h-4 before:w-4 before:-rotate-45 before:border-l-2 before:border-t-2 before:content-[''] hover:opacity-80 disabled:pointer-events-none disabled:opacity-0" />

                        <button ref={nextButtonRef} type="button" aria-label="Próximo slide" className="relative h-7 w-7 cursor-pointer transition-all duration-200 ease-out before:absolute before:right-2 before:top-1.5 before:h-4 before:w-4 before:-rotate-45 before:border-b-2 before:border-r-2 before:content-[''] hover:opacity-80 disabled:pointer-events-none disabled:opacity-0" />
                    </div>
                </div>
            </div> */}
        </section>
    );
};
