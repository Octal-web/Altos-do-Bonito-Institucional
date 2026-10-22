import { Title } from "../UI/Title";

export const HomeExpressions = ({ content }) => {
    return (
        <section className="relative overflow-hidden 2xl:pt-20">
            <div className="container relative z-[1] mx-auto max-w-medium">
                <div className="aspect-[154/67] md:aspect-[154/47]">
                    <img
                        src={content.imagem}
                        alt={content.titulo || ""}
                        className="size-full border-custom object-cover"
                    />
                </div>
                <Title
                    tag="h2"
                    variant="h2"
                    html={content.titulo}
                    className="[&_strong]:block text-center mt-8 2xl:mt-16"
                />
            </div>
        </section>
    );
};
