import { Link } from "@inertiajs/react";
import { Title } from "../UI/Title";
import { Text } from "../UI/Text";

export const ProductsKnowledge = ({ items = [], content }) => {
    return (
        <section className="relative overflow-hidden pt-40 md:pt-40 2xl:pt-60">
            <div className="container mx-auto max-w-medium text-center">
                <Title tag="p" variant="subtitle" html={content.subtitulo} />
                <Title
                    tag="h2"
                    variant="h2"
                    html={content.titulo}
                    className="mx-auto  mt-2 2xl:mt-6"
                />

                <div className="mx-auto mt-12 grid grid-cols-1 items-start gap-12 md:mt-20 md:grid-cols-3 md:gap-6 2xl:mt-28 2xl:gap-8 text-start">
                    {items.filter(Boolean).map((item, index) => (
                        <Link
                            // href={route("Produtos.produto", {
                            //     slug: item.slug,
                            // })}
                            key={item.id ?? index}
                            className={`mx-auto w-full max-w-sm md:max-w-none group ${index === 1 ? "" : "md:mt-20 2xl:mt-24"}`}
                        >
                            <img
                                src={item.imagem}
                                alt=""
                                loading="lazy"
                                className="aspect-[7/5] 2xl:aspect-[7/6] w-full rounded-xl object-cover hover-group"
                            />

                            <div className="md:pl-4 2xl:pl-8">
                                <Title
                                    tag="h4"
                                    variant="h4"
                                    html={content.titulo}
                                    className="hover-group [&_strong]:!text-white [&_em]:!not-italic pt-6 md:pt-10 2xl:pt-14 pb-4"
                                />

                                <Text variant="p" className="hover-group">
                                    {content.titulo}
                                </Text>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};
