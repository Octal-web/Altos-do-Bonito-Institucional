import { SectionBackground } from "../UI/SectionBackground";
import { Text } from "../UI/Text";
import { Title } from "../UI/Title";

export const AboutTerroirRegion = ({ content = [] }) => {
    return (
        <SectionBackground
            className="object-left opacity-55"
            backgroundClassName="inset-x-0 top-[15%] bottom-[25%] md:right-[35%]"
            overlayClassName="bg-[linear-gradient(to_right,transparent,transparent,black),linear-gradient(to_bottom,black,transparent_20%,transparent_75%,black)]"
        >
            <section className="py-16 md:py-24 2xl:py-32">
                <div className="container mx-auto max-w-medium">
                    <div className="mx-auto text-center">
                        <Title
                            tag="p"
                            variant="subtitle"
                            html={content[0].subtitulo}
                        />
                        <Title
                            tag="h2"
                            variant="h2"
                            html={content[0].titulo}
                            className="mt-2 2xl:mt-6"
                        />
                        <RegionText
                            content={content[0]}
                            formatted
                            className="mx-auto mt-6 max-w-[800px] md:mt-10"
                        />
                    </div>

                    <div className="mt-16 grid grid-cols-1 items-end gap-10 md:mt-28 md:grid-cols-2 md:gap-16 2xl:mt-40 2xl:gap-20">
                        <img
                            src={content[1].imagem_mobile}
                            alt=""
                            loading="lazy"
                            className="aspect-[9/10] w-full border-custom object-cover md:mt-40 2xl:mt-56"
                        />

                        <div>
                            <img
                                src={content[1].imagem}
                                alt=""
                                loading="lazy"
                                className="aspect-square w-full border-custom object-cover"
                            />
                            <div className="mt-10 md:mt-16 md:pl-[12%] 2xl:mt-20">
                                <Title
                                    tag="p"
                                    variant="subtitle"
                                    html={content[1].subtitulo}
                                />
                                <Title
                                    tag="h3"
                                    variant="h2"
                                    html={content[1].titulo}
                                    className="mt-2 2xl:mt-6 md:[&_strong]:block "
                                />
                                <RegionText
                                    content={content[1]}
                                    className="mt-5 md:mt-8"
                                />
                            </div>
                        </div>
                    </div>

                    <img
                        src={content[0].imagem}
                        alt=""
                        loading="lazy"
                        className="mt-10 aspect-[2/1] w-full border-custom object-cover object-top md:mt-16 md:aspect-[4/1] 2xl:mt-20"
                    />
                </div>
            </section>
        </SectionBackground>
    );
};

const RegionText = ({ content, className = "" }) => (
    <Text
        className={`terroir-region-text ${className}`}
        dangerouslySetInnerHTML={{ __html: content.texto }}
    />
);
