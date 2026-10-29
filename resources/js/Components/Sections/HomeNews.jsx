import { useLang } from "@/hooks/useLang";
import { Text } from "../UI/Text";
import { Title } from "../UI/Title";

export const HomeNews = ({ content, news = [] }) => {
    const lang = useLang();
    return (
        <section className="relative overflow-hidden py-16 md:py-24 2xl:py-32">
            <div className="container mx-auto max-w-medium text-center">
                <Title
                    tag="h2"
                    variant="h2"
                    html={content.titulo}
                    className="mx-auto  mb-2 2xl:mb-6"
                />

                <Text className="md:max-w-[750px] mx-auto">
                    {content.texto}
                </Text>

                <div className="mx-auto mt-12 grid grid-cols-1 items-start gap-12 md:mt-20 md:grid-cols-4 md:gap-6 2xl:mt-28 2xl:gap-9 text-start">
                    {news.filter(Boolean).map((item, index) => (
                        <article
                            key={item.id ?? index}
                            className={`mx-auto w-full max-w-sm md:max-w-none ${index === 1 ? "md:mt-20 2xl:mt-24" : ""}`}
                        >
                            <img
                                src={item.imagem}
                                alt=""
                                loading="lazy"
                                className="aspect-[3/3] 2xl:aspect-[3/4] w-full border-custom object-cover"
                            />
                            <div
                                className="md:pl-6 2xl:pl-10 mt-6 md:mt-10 2xl:mt-14"
                            >
                                <Title
                                    tag="h5"
                                    variant="h5"
                                    html={item.titulo}
                                    className=""
                                />

                                <Text className="max-w-[85%] my-2 md:my-4 2xl:mt-7 2xl:mb-8">
                                    {item.texto}
                                </Text>

                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline"
                                    // href={links.link_mapa}
                                >
                                    {lang("verNoticia")}
                                </a>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};
