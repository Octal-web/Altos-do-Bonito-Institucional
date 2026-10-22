import { useState } from "react";
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
        <section className="relative isolate overflow-hidden py-16 md:pt-24 md:pb-80 2xl:pt-50 2xl:pb-72">
            <img
                src="/site/backgrounds/5a0f2c3685fc45149e409e30a5b7a7c4.jpg"
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute left-0 top-0 md:top-16 h-full md:w-[70vw] object-cover opacity-35 md:opacity-55 -z-10"
            />
            <div className="container mx-auto max-w-medium">
                <div className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-2 md:gap-16 2xl:gap-26">
                    <img
                        src={selected.imagem}
                        alt=""
                        loading="lazy"
                        className="aspect-[363/359] 2xl:aspect-[363/459] w-full border-custom object-cover md:h-full"
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

                        <div className="w-full my-auto">
                            <div aria-live="polite" aria-atomic="true">
                                <Title
                                    tag="h2"
                                    variant="h3"
                                    html={selected.titulo}
                                    className="md:max-w-[535px] [&_strong]:md:block"
                                />
                                <Text className="md:whitespace-pre-line pt-6 md:pt-11 md:max-w-[585px]">
                                    {selected.texto}
                                </Text>
                            </div>

                            <div className="mt-6 md:mt-16 flex flex-wrap gap-1.5">
                                <LinkButton
                                // href="/acomodacoes"
                                >
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
