import { Title } from "../UI/Title";

export const HomeTradition = ({ content }) => {
    return (
        <section className="relative overflow-hidden py-16 2xl:pt-24">
            <img
                src="/site/backgrounds/5a0f2c3685fc45149e409e30a5b7a7c4.jpg"
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute left-0 top-0 h-full md:w-[40vw] object-cover opacity-55"
            />

            <div className="container relative z-[1] mx-auto max-w-medium">
                {content.map((item, index) => {
                    const reverse = index % 2 !== 0;

                    return (
                        <div
                            key={item.id ?? index}
                            className="md:mb-16 grid grid-cols-1 items-center md:grid-cols-2 gap-5 md:gap-10 2xl:gap-20"
                        >
                            <div
                                className={
                                    reverse ? "md:order-2" : "order-2 md:order-1"
                                }
                            >
                                <Title
                                    tag="h2"
                                    variant="h2"
                                    html={item?.titulo}
                                    className="md:max-w-[400px] 2xl:max-w-[600px]"
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
                                    className="aspect-[72/61] border-custom object-cover"
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};
