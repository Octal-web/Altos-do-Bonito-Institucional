import { Link } from "@inertiajs/react";
import { Title } from "../UI/Title";

export const ProductSuggestions = ({ suggestions, content }) => {
    return (
        <section className="relative overflow-hidden pt-40 md:pt-40 2xl:pt-72">
            <div className="container mx-auto max-w-medium text-center">
                <Title tag="p" variant="subtitle" html={content.subtitulo} />
                <Title
                    tag="h2"
                    variant="h2"
                    html={content.titulo}
                    className="mx-auto  mt-2 2xl:mt-6"
                />

                <div className="mx-auto mt-12 grid grid-cols-1 items-start gap-12 md:mt-20 md:grid-cols-3 md:gap-6 2xl:mt-28 2xl:gap-9 px-10 text-start">
                    {suggestions.filter(Boolean).map((item, index) => (
                        <Link
                            href={route("Produtos.produto", {
                                slug: item.slug,
                            })}
                            key={item.id ?? index}
                            className={`mx-auto w-full max-w-sm md:max-w-none group ${index === 1 ? "" : "md:mt-20 2xl:mt-24"}`}
                        >
                            <img
                                src={item.imagem}
                                alt=""
                                loading="lazy"
                                className="aspect-[500/268] 2xl:aspect-[500/468] w-full border-custom object-cover hover-group"
                            />
                            <Title
                                tag="p"
                                variant="subtitle_small"
                                html={item.subtitulo}
                                className="mb-0.5 mt-4 2xl:mt-8 hover-group"
                            />

                            <Title
                                tag="h4"
                                variant="h4"
                                html={item.nome}
                                className="hover-group [&_strong]:!text-white [&_em]:!not-italic"
                            />
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};
