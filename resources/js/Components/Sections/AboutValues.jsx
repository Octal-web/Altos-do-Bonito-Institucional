import { Text } from "../UI/Text";
import { Title } from "../UI/Title";

export const AboutValues = ({ content, values = [] }) => {
    return (
        <section className="relative overflow-hidden py-16 md:py-24 2xl:py-32">
            <div className="container mx-auto max-w-medium text-center">
                <Title tag="p" variant="subtitle" html={content.subtitulo} />
                <Title
                    tag="h2"
                    variant="h2"
                    html={content.titulo}
                    className="mx-auto  mt-2 2xl:mt-6"
                />

                <div className="mx-auto mt-12 grid grid-cols-1 items-start gap-12 md:mt-20 md:grid-cols-3 md:gap-6 2xl:mt-28 2xl:gap-9 px-10">
                    {values.filter(Boolean).map((item, index) => (
                        <article
                            key={item.id ?? index}
                            className={`mx-auto w-full max-w-sm md:max-w-none ${index === 1 ? "md:mt-20 2xl:mt-24" : ""}`}
                        >
                            <img
                                src={item.imagem}
                                alt=""
                                loading="lazy"
                                className="aspect-[3/3.5] 2xl:aspect-[4/5] w-full border-custom object-cover"
                            />
                            <Title
                                tag="h3"
                                variant="h3"
                                html={item.titulo}
                                className="my-3 md:my-6 2xl:my-8"
                            />

                            <Text
                                className="mx-auto max-w-[85%]"
                            >
                                {item.texto}
                            </Text>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};
