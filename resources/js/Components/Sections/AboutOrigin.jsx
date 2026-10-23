import { Text } from "../UI/Text";
import { Title } from "../UI/Title";

export const AboutOrigin = ({ content }) => {
    return (
        <section className="py-16 2xl:pt-24">
            <div className="container mx-auto max-w-medium section-content">
                {content.map((item, index) => {
                    const reverse = index % 2 !== 0;

                    return (
                        <div
                            key={item.id ?? index}
                            className="md:mb-16 grid grid-cols-1 items-center md:grid-cols-2 gap-5 md:gap-10 2xl:gap-20"
                        >
                            <div
                                className={
                                    reverse
                                        ? "md:order-2"
                                        : "order-2 md:order-1"
                                }
                            >
                                {item.titulo && (
                                    <Title
                                        tag="h2"
                                        variant="h2"
                                        html={item?.titulo}
                                        className="md:max-w-[500px] 2xl:max-w-[600px]"
                                    />
                                )}

                                <Text
                                    className="md:max-w-[1390px] em-emphasis pt-8 2xl:pt-12"
                                    dangerouslySetInnerHTML={{
                                        __html: item.texto,
                                    }}
                                />
                            </div>

                            <div
                                className={
                                    reverse
                                        ? "flex justify-start md:order-1"
                                        : "flex justify-end md:order-2"
                                }
                            >
                                <img
                                    src={item?.imagem}
                                    alt={item?.titulo || ""}
                                    className="aspect-[36/43] border-custom object-cover"
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};
