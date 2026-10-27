import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/styles.css";

import { Lightbox } from "yet-another-react-lightbox";
import {
    Fullscreen,
    Thumbnails,
    Zoom,
} from "yet-another-react-lightbox/plugins";

import { useState } from "react";
import { SectionBackground } from "../UI/SectionBackground";
import { Text } from "../UI/Text";
import { Title } from "../UI/Title";
import { LinkButton } from "../UI/LinkButton";

export const ProductBanner = ({ product, tastingHref }) => {
    return (
        <SectionBackground
            className="object-left opacity-55"
            backgroundClassName="inset-y-0 left-0 right-0 md:right-1/3 bottom-40 md:-bottom-64"
            overlayClassName="bg-gradient-to-r from-transparent via-transparent to-black"
        >
            <section className="py-5 md:py-8 2xl:py-10">
                <div className="container mx-auto max-w-medium">
                    <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-2 md:gap-16 2xl:gap-20">
                        <ProductGallery key={product.id} product={product} />

                        <div className="md:pt-6 2xl:pt-10">
                            <Title
                                tag="p"
                                variant="subtitle"
                                html={product.subtitulo}
                            />
                            <Title
                                tag="h1"
                                variant="h2"
                                html={product.nome}
                                className="mt-3 md:mt-6 [&_strong]:md:block"
                            />
                            <Text className="mt-8 md:mt-12 2xl:mt-16">
                                {product.descricao}
                            </Text>
                            <div className="mt-6 md:mt-8 flex flex-wrap gap-1.5 2xl:mt-10">
                                <LinkButton href={route("Contato.index")}>
                                    Onde encontrar
                                </LinkButton>

                                <a
                                    href={product.link_loja}
                                    className="button-secondary group"
                                >
                                    <div className="h-px w-8 md:w-10 bg-white group-hover:bg-black" />
                                    Agendar degustação
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </SectionBackground>
    );
};

const ProductGallery = ({ product }) => {
    const [index, setIndex] = useState(0);
    const [open, setOpen] = useState(false);
    const slides = (product.galeria ?? [])
        .filter((item) => item.imagem)
        .map((item, position) => ({
            src: item.imagem,
            alt: `Foto ${position + 1} do vinho`,
        }));

    if (!slides.length) return <div className="aspect-[7/6] border-custom" />;

    const selected = Math.min(index, slides.length - 1);
    const navigate = (step) =>
        setIndex((selected + step + slides.length) % slides.length);

    return (
        <div className="min-w-0">
            <div className="relative">
                <button
                    type="button"
                    onClick={() => setOpen(true)}
                    aria-label="Ampliar imagem do vinho"
                    className="block aspect-[7/4] md:aspect-[7/6] w-full cursor-zoom-in overflow-hidden border-custom focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                >
                    <img
                        src={slides[selected].src}
                        alt={slides[selected].alt}
                        className="size-full object-cover"
                    />
                </button>

                {slides.length > 1 &&
                    [-1, 1].map((step) => (
                        <button
                            key={step}
                            type="button"
                            onClick={() => navigate(step)}
                            aria-label={
                                step === -1
                                    ? "Imagem anterior"
                                    : "Próxima imagem"
                            }
                            className={`absolute top-1/2 flex aspect-square w-[9%] -translate-y-1/2 items-center justify-center rounded-full transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary ${step === -1 ? "left-0 -translate-x-1/2 bg-white text-black" : "right-0 translate-x-1/2 bg-primary text-white"}`}
                        >
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1"
                                aria-hidden="true"
                                className={`aspect-square w-1/2 ${step === -1 ? "rotate-180" : ""}`}
                            >
                                <path d="M3 12h18m-6-6 6 6-6 6" />
                            </svg>
                        </button>
                    ))}
            </div>

            {slides.length > 1 && (
                <div
                    role="group"
                    aria-label="Fotos do vinho"
                    className="mt-3 flex gap-[2%] overflow-x-auto pb-2"
                >
                    {slides.map((slide, position) => (
                        <button
                            key={`${slide.src}-${position}`}
                            type="button"
                            onClick={() => setIndex(position)}
                            aria-label={`Selecionar foto ${position + 1}`}
                            aria-pressed={selected === position}
                            className={`aspect-[2/1] basis-[32%] shrink-0 overflow-hidden border-custom focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary ${selected === position ? "!border-primary" : "opacity-60 hover:opacity-100"}`}
                        >
                            <img
                                src={slide.src}
                                alt=""
                                loading="lazy"
                                className="size-full object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}

            <Lightbox
                open={open}
                close={() => setOpen(false)}
                index={selected}
                slides={slides}
                plugins={[Fullscreen, Thumbnails, Zoom]}
                on={{ view: ({ index: nextIndex }) => setIndex(nextIndex) }}
                labels={{
                    Close: "Fechar",
                    Next: "Próxima imagem",
                    Previous: "Imagem anterior",
                    "Zoom in": "Ampliar",
                    "Zoom out": "Reduzir",
                }}
                carousel={{ finite: slides.length === 1 }}
                render={
                    slides.length === 1
                        ? { buttonPrev: () => null, buttonNext: () => null }
                        : undefined
                }
            />
        </div>
    );
};
