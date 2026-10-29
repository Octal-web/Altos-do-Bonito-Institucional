import { Text } from "../UI/Text";
import { Title } from "../UI/Title";

const titleToAlt = (html) => {
    const document = new DOMParser().parseFromString(html || "", "text/html");

    document.querySelectorAll("br, p, div, li").forEach((element) => {
        element.append(" ");
    });

    return (document.body.textContent || "").replace(/\s+/g, " ").trim();
};

export const ProductHistory = ({ product }) => {
    return (
        <section className="container max-w-medium mt-20 2xl:mt-32">
            <History1 product={product} />
            <History2 product={product} />
        </section>
    );
};

const History1 = ({ product }) => (
    <div className="grid grid-cols-1 items-center md:grid-cols-2 gap-5 md:gap-10">
        <div>
            <Title
                tag="p"
                variant="subtitle"
                html={product.historia_subtitulo}
            />
            <Title
                tag="h2"
                variant="h2"
                html={product.historia_titulo}
                className="mt-2 2xl:mt-6 md:max-w-[500px]"
            />

            <Text
                className="md:max-w-[524px] em-emphasis pt-8 2xl:pt-12"
                dangerouslySetInnerHTML={{
                    __html: product.historia_descricao,
                }}
            />
        </div>

        <div className="aspect-[36/33] 2xl:aspect-[36/43]">
            <img
                src={product.imagem_primaria}
                alt={titleToAlt(product.historia_titulo)}
                className="size-full border-custom object-cover"
            />
        </div>
    </div>
);

const History2 = ({ product }) => (
    <div className="grid grid-cols-1 items-end md:grid-cols-2 gap-5 md:gap-10 mt-6 md:mt-8 2xl:mt-11">
        <div className="aspect-[36/10] md:aspect-[36/18]">
            <img
                src={product.imagem_primaria}
                alt={titleToAlt(product.origem_titulo)}
                className="size-full border-custom !border-black object-cover object-center"
            />
        </div>
        <div>
            <Title
                tag="h2"
                variant="h2"
                html={product.origem_titulo}
                className="mt-2 2xl:mt-6 md:max-w-[500px] 2xl:max-w-[600px]"
            />

            <Text
                className="md:max-w-[670px] em-emphasis pt-8 2xl:pt-12"
                dangerouslySetInnerHTML={{
                    __html: product.origem_descricao,
                }}
            />
        </div>
    </div>
);
