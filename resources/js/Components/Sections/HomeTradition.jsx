import { Text } from "../UI/Text";
import { Title } from "../UI/Title";
import { SectionBackground } from "../UI/SectionBackground";

export const HomeTradition = ({ content }) => {
    return (
        <section className="section-overflow py-16 2xl:pt-24">
            <SectionBackground
                parallax="8"
                className="section-background left-0 top-0 h-full md:w-[40vw] opacity-55"
            />

            <div className="container section-content mx-auto max-w-medium">
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
                                <Title
                                    tag="h2"
                                    variant="h2"
                                    html={item?.titulo}
                                    data-split
                                    className="md:max-w-[400px] 2xl:max-w-[600px]"
                                />
                                {item?.texto && <Text data-fade data-delay="0.2" className="pt-5 md:pt-10 md:max-w-[500px]">{item?.texto}</Text>}
                            </div>

                            <div
                                className={
                                    reverse
                                        ? "flex justify-start md:order-1"
                                        : "flex justify-end md:order-2"
                                }
                            >
                                <div
                                    data-reveal={reverse ? "right" : "left"}
                                    className="aspect-[72/61] w-full overflow-hidden border-custom"
                                >
                                    <img
                                        src={item?.imagem}
                                        alt={item?.titulo || ""}
                                        className="size-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};
