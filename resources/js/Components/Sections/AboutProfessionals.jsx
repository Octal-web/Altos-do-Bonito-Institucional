import { Text } from "../UI/Text";
import { Title } from "../UI/Title";

export const AboutProfessionals = ({ content, professionals }) => {
    return (
        <section className="relative overflow-hidden py-16 md:py-24 2xl:py-32">
            <div className="container mx-auto max-w-medium text-center">
                <Title data-fade tag="p" variant="subtitle" html={content.subtitulo} />
                <Title
                    tag="h2"
                    variant="h2"
                    html={content.titulo}
                    data-split
                    className="mx-auto mt-2 2xl:mt-6"
                />

                <Text data-fade data-delay="0.2" className="md:max-w-[800px] 2xl:max-w-[1000px] mx-auto mt-6 md:mt-10">
                    {content.texto}
                </Text>

                <div className="mx-auto mt-12 grid grid-cols-1 items-start gap-12 md:mt-16 md:grid-cols-5 md:gap-3 2xl:mt-28 2xl:gap-6 text-start">
                    {professionals.filter(Boolean).map((item, index) => (
                        <article
                            key={item.id ?? index}
                            data-reveal="up"
                            data-drift={index % 2 === 0 ? "40" : "70"}
                            className={`mx-auto w-full max-w-sm md:max-w-none ${index % 2 === 0 ? "md:mt-20 2xl:mt-24" : ""}`}
                        >
                            <img
                                src={item.imagem}
                                alt=""
                                loading="lazy"
                                className="aspect-[0.76] w-full border-custom object-cover"
                            />
                            <Text className="mt-5 md:mt-9  font-primary !text-xl xl:!text-2xl italic !text-primary">
                                {item.nome}
                            </Text>

                            <Text variant="p" className="md:max-w-[66%]">
                                {item.descricao}
                            </Text>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};
