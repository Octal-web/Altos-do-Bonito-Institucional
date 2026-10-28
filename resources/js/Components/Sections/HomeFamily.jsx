import { accessibleText } from "@/lib/accessibleText";
import { useLang } from "@/hooks/useLang";
import { useId, useRef, useState } from "react";
import { useSwapAnimation } from "@/hooks/useSwapAnimation";
import { Text } from "../UI/Text";
import { Title } from "../UI/Title";

export const HomeFamily = ({ content }) => {
    const lang = useLang();
    const panelId = useId();
    const [activeIndex, setActiveIndex] = useState(1);
    const selectedIndex = content[activeIndex]
        ? activeIndex
        : content.findIndex(Boolean);
    const selected = content[selectedIndex];

    const contentRef = useRef(null);
    useSwapAnimation(contentRef, selectedIndex);

    return (
        <section className="relative overflow-visible pt-5 md:pt-10 2xl:pt-16 pb-20 xl:pb-36 2xl:pb-96">
            <Backgrounds />

            <div className="container relative mx-auto max-w-medium z-30">
                <div className="flex flex-col items-center pb-20 md:pb-32 2xl:pb-40">
                    <div
                        role="group"
                        aria-label={lang("historiaFamilia")}
                        data-fade
                        className="winery-options"
                    >
                        {content.map(
                            (item, index) =>
                                item && (
                                    <button
                                        key={item.id ?? index}
                                        type="button"
                                        aria-controls={panelId}
                                        aria-pressed={selectedIndex === index}
                                        onClick={() => setActiveIndex(index)}
                                        className="winery-option mb-4 md:mb-0"
                                    >
                                        {item.subtitulo}
                                    </button>
                                ),
                        )}
                    </div>
                </div>

                <div
                    ref={contentRef}
                    className="grid grid-cols-1 items-end gap-8 md:grid-cols-2 md:gap-24 2xl:gap-16"
                >
                    <div
                        data-reveal="up"
                        data-drift="100"
                        className="md:aspect-[70/80] 2xl:aspect-[78/110] w-full overflow-hidden border-custom"
                    >
                        <img
                            src={selected.imagem}
                            alt={accessibleText(selected.imagem_alt || selected.subtitulo)}
                            data-swap-media
                            className="size-full object-cover"
                        />
                    </div>

                    <div>
                        <div
                            data-reveal="down"
                            data-drift="35"
                            className="aspect-[72/55] w-full overflow-hidden border-custom"
                        >
                            <img
                                src={selected.imagem_mobile}
                                alt={accessibleText(selected.imagem_alt || selected.subtitulo)}
                                data-swap-media
                                className="size-full object-cover"
                            />
                        </div>
                        <div data-fade className="ml-auto md:max-w-[534px]">
                            <div data-swap id={panelId} aria-live="polite" aria-atomic="true">
                                <Title
                                    tag="h2"
                                    variant="h2"
                                    html={selected.titulo}
                                    className="text-center md:text-start pt-2 md:pt-0 2xl:mr-0 mt-10 2xl:mt-20"
                                />
                                <Text className="mt-10">{selected.texto}</Text>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const Backgrounds = () => {
    return (
        <>
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 -top-48 -bottom-48 z-10 overflow-hidden md:-top-64 md:-bottom-[50vh] 2xl:-top-80 2xl:-bottom-[40vh]"
            >
                <img
                    src="/site/backgrounds/e86e071f45674b1f92edd625da4a22d3.jpg"
                    alt=""
                    data-parallax="8"
                    className="absolute inset-0 h-full w-full scale-125 object-cover"
                />
                <div className="absolute inset-0 bg-black/70" />
                <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black/80 via-black/30 to-transparent md:h-64 2xl:h-80" />
                <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/80 via-black/30 to-transparent md:h-64" />
            </div>

            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-60 -bottom-48 z-10 overflow-hidden md:-bottom-64 2xl:-bottom-80 hidden md:block aspect-[1/0.7]"
            >
                <img
                    src="/site/backgrounds/7f8392a21dce45a283290e735d3157f3.png"
                    alt=""
                    data-parallax="15"
                    className="absolute right-[47%] top-0 h-full w-auto max-w-none object-contain opacity-30"
                />
            </div>
        </>
    );
};
