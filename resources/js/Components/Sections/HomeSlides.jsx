import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
    Navigation,
    Pagination,
    Autoplay,
    EffectFade,
    A11y,
} from "swiper/modules";
import "swiper/swiper-bundle.css";
import { gsap } from "@/lib/gsap";
import { useGsap } from "@/hooks/useGsap";

export const HomeSlides = ({ slides = [] }) => {
    const sectionRef = useRef(null);
    const swiperRef = useRef(null);
    const prevButtonRef = useRef(null);
    const nextButtonRef = useRef(null);

    const [activeIndex, setActiveIndex] = useState(0);

    useGsap(sectionRef, (_, q) => {
        // Entrada: a mídia desfaz um zoom lento ao carregar a página
        gsap.from(q("picture img, video"), {
            scale: 1.25,
            duration: 2.8,
            ease: "expo.out",
        });

        // Saída: a mídia desce mais devagar que o scroll (efeito cortina),
        // o conteúdo sobe e some e a tela escurece
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
        gsap.to(q("[data-hero-content]"), {
            yPercent: -25,
            autoAlpha: 0,
            ease: "none",
            scrollTrigger: { ...scrollTrigger, end: "60% top" },
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
    });

    if (!slides.length) return null;

    return (
        <section
            ref={sectionRef}
            className="relative overflow-hidden z-[11]"
            aria-label="Destaques da Pizzato"
        >
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
                    setActiveIndex(swiper.realIndex);
                }}
                onSlideChange={(swiper) => {
                    setActiveIndex(swiper.realIndex);
                }}
                modules={[Navigation, Pagination, Autoplay, EffectFade, A11y]}
                a11y={{
                    enabled: true,
                    prevSlideMessage: "Slide anterior",
                    nextSlideMessage: "Próximo slide",
                    firstSlideMessage: "Este é o primeiro slide",
                    lastSlideMessage: "Este é o último slide",
                    paginationBulletMessage: "Ir para o slide {{index}}",
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
                                        alt={slide.titulo}
                                        loading={index === 0 ? "eager" : "lazy"}
                                        decoding={
                                            index === 0 ? "sync" : "async"
                                        }
                                        fetchpriority={
                                            index === 0 ? "high" : "auto"
                                        }
                                        className="h-full w-full object-cover"
                                    />
                                </picture>
                            )}

                            {slide.tipo === "video" && (
                                <video
                                    className="absolute inset-0 h-full w-full object-cover"
                                    autoPlay
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

                            <div className="container h-full max-w-large">
                                <div
                                    data-hero-content
                                    className="container relative z-[1] flex h-full max-w-large items-center justify-center"
                                >
                                    <div
                                        className={`flex flex-col justify-center py-16 md:py-20 m-auto relative w-full min-h-[calc(85vh_-_75px)] xl:min-h-[calc(100vh_-_90px)] 2xl:min-h-[calc(100vh_-_113px)] transition-opacity duration-1000 ease-in-out z-[1] ${activeIndex === index ? "animate-fade-in-down" : "opacity-0"}`}
                                    >
                                        {slide.titulo && (
                                            <Text text={slide.titulo} />
                                        )}

                                        {slide.descricao && (
                                            <div
                                                className="text-white text-center uppercase
                                                [&_img]:fixed
                                                [&_img]:top-1/2
                                                [&_img]:left-1/2
                                                [&_img]:-translate-x-1/2
                                                [&_img]:-translate-y-1/2
                                                [&_img]:max-w-[90vw]
                                                [&_img]:lg:max-w-[50vw]
                                                [&_img]:w-auto
                                                [&_img]:h-auto
                                                [&_img]:object-contain
                                                [&_img]:!cursor-default

                                                [&_h1]:mx-auto
                                                [&_h1]:font-secondary
                                                [&_h1]:leading-[40px]
                                                [&_h1]:text-[30px]
    
                                                [&_strong]:text-[54px]
                                                [&_strong]:my-2
                                                [&_strong]:text-[#D9D7BF]
                                                [&_strong]:font-tertiary
                                                [&_strong]:block 
                                                [&_strong]:uppercase 
                                                [&_strong]:font-normal 

                                                [&_ul]:flex
                                                [&_ul]:flex-wrap
                                                [&_ul]:justify-center
                                                [&_ul]:gap-2
                                                [&_ul]:mt-20
                                                [&_ul]:mb-5

                                                [&_li]:text-xs
                                                [&_li]:tracking-[4.8px]
                                                [&_li]:font-normal

                                                md:[&_h1]:text-[35px]
                                                md:[&_h1]:leading-[45px]
                                                md:[&_strong]:text-[77px]
                                                md:[&_ul]:my-20
                                                md:[&_li]:text-sm
                                                md:[&_img]:mb-7
                                                md:[&_li:not(:last-child)]:after:content-['·']
                                                md:[&_li:not(:last-child)]:after:ml-2
                                                
                                                2xl:[&_h1]:text-[40px]
                                                2xl:[&_strong]:text-[96px]
                                                2xl:[&_h1]:leading-[65px]
                                                2xl:[&_li]:text-base"
                                                dangerouslySetInnerHTML={{
                                                    __html: slide.descricao,
                                                }}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center">
                                <span
                                    data-hero-line
                                    className="mb-3 h-16 w-px bg-white"
                                />

                                <span className="text-[10px] font-medium tracking-[5px] text-white">
                                    SCROLL
                                </span>
                            </div>
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
