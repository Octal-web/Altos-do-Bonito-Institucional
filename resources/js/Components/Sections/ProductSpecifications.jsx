import { Text } from "../UI/Text";
import { Title } from "../UI/Title";

export const ProductSpecifications = ({ product }) => {
    return (
        <section className="container max-w-medium mt-40 2xl:mt-72">
            <div className="grid grid-cols-1 items-start md:grid-cols-2 gap-8 md:gap-16 2xl:gap-24">
                <Text
                    dangerouslySetInnerHTML={{ __html: product.ficha_tecnica }}
                    className="
                        [&_h1]:font-primary
                        [&_h1]:text-white
                        [&_h1]:-mb-12
                        2xl:[&_h1]:mb-0

                        [&_h1]:text-2xl
                        [&_h1]:md:text-3xl
                        [&_h1]:lg:text-4xl
                        2xl:[&_h1]:text-5xl

                        [&_table]:w-full
                        [&_table]:border-collapse

                        [&_tbody_tr]:border-b
                        [&_tbody_tr]:border-primary/50

                        [&_tbody_td]:align-middle

                        [&_tbody_td]:text-sm
                        md:[&_tbody_td]:text-base
                        lg:[&_tbody_td]:text-lg
                        2xl:[&_tbody_td]:text-xl

                        [&_tbody_td]:font-admin
                        [&_tbody_td]:leading-relaxed
                        [&_tbody_td]:text-white/80

                        [&_tbody_td:first-child]:w-[58%]
                        [&_tbody_td:first-child]:pr-4
                        [&_tbody_td:first-child]:font-primary

                        [&_tbody_td:first-child]:text-lg
                        md:[&_tbody_td:first-child]:text-xl
                        lg:[&_tbody_td:first-child]:text-2xl
                        2xl:[&_tbody_td:first-child]:text-3xl

                        [&_tbody_td:first-child]:text-white

                        [&_tbody_td:last-child]:pl-2

                        [&_tbody_td]:pb-3
                        [&_tbody_td]:pt-7
                        2xl:[&_tbody_td]:pb-5
                        2xl:[&_tbody_td]:pt-11
                        
                    "
                />
                <div>
                    <Title
                        tag="h3"
                        variant="h3"
                        html={product.processo_titulo}
                        className="italic !text-primary 2xl:!text-[54px]"
                    />

                    <Text
                        className="md:max-w-[524px] em-emphasis pt-3 2xl:pt-5 pb-6 2xl:pb-12"
                        dangerouslySetInnerHTML={{
                            __html: product.processo_descricao,
                        }}
                    />

                    <div className="aspect-[72/35]">
                        <img
                            src={product.imagem_terciaria}
                            alt={product.processo_titulo || ""}
                            className="size-full rounded-md object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};
