import { useState } from "react";
import { SectionBackground } from "../UI/SectionBackground";
import { LinkButton } from "../UI/LinkButton";
import { Text } from "../UI/Text";
import { Title } from "../UI/Title";

export const HomeWinery = ({ content }) => {
    const [activeIndex, setActiveIndex] = useState(2);
    const selectedIndex = content[activeIndex]
        ? activeIndex
        : content.findIndex(Boolean);
    const selected = content[selectedIndex];

    return (
        <section className="section-overflow py-32 md:pt-52 md:pb-80 2xl:pt-64 2xl:pb-72">
            <SectionBackground className="section-background left-0 top-0 md:top-16 h-full md:w-[70vw] opacity-35 md:opacity-55" />
            <div className="container mx-auto max-w-medium section-content">
                <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-16 2xl:gap-26">
                    <img
                        src={selected.imagem}
                        alt=""
                        loading="lazy"
                        className="aspect-[363/359] md:aspect-[363/559] w-full border-custom object-cover object-center md:h-full"
                    />

                    <div className="flex flex-col items-start">
                        <div
                            role="group"
                            aria-label="Regiões da vinícola"
                            className="winery-options"
                        >
                            {content.map(
                                (item, index) =>
                                    item && (
                                        <button
                                            key={item.id ?? index}
                                            type="button"
                                            aria-pressed={
                                                selectedIndex === index
                                            }
                                            onClick={() =>
                                                setActiveIndex(index)
                                            }
                                            className="winery-option mb-4 md:mb-0"
                                        >
                                            {item.subtitulo}
                                        </button>
                                    ),
                            )}
                        </div>

                        <div className="w-full my-auto mt-6 md:mt-16">
                            <div aria-live="polite" aria-atomic="true">
                                <Title
                                    tag="h2"
                                    variant="h3"
                                    html={selected.titulo}
                                    className="md:max-w-[535px] [&_strong]:md:block"
                                />
                                <Text
                                    className="pt-6 md:pt-11 md:max-w-[585px] [&_strong]:text-primary [&_strong]:font-primary"
                                    dangerouslySetInnerHTML={{
                                        __html: selected.texto,
                                    }}
                                />
                            </div>

                            <div className="mt-6 md:mt-16 flex flex-wrap gap-1.5">
                                <LinkButton href={route("Contato.index")}>
                                    Agendar visita
                                </LinkButton>
                                <LinkButton
                                    href={selected.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    isButtonCA={false}
                                >
                                    Consultar estadia
                                </LinkButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
