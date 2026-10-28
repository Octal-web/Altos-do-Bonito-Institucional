import "swiper/swiper-bundle.css";

import { A11y, Keyboard, Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Text } from "../UI/Text";
import { Title } from "../UI/Title";

export const AboutTimeline = ({ events, content }) => {
    return (
        <section className="overflow-hidden pt-20 md:pt-32 2xl:pt-72">
            <div className="container mx-auto max-w-medium">
                <Title data-fade tag="p" variant="subtitle">
                    {content.subtitulo}
                </Title>
                <Title
                    tag="h2"
                    variant="h2"
                    html={content.titulo}
                    data-split
                    className="mt-2 2xl:mt-6"
                />

                <div className="relative mt-10 md:mt-16 2xl:mt-40">
                    <div
                        aria-hidden="true"
                        data-wipe
                        className="pointer-events-none absolute -left-[3vw] top-10 h-20 w-screen bg-[repeating-linear-gradient(to_right,transparent_0,transparent_16px,rgba(198,174,143,0.2)_17px,transparent_18px)] [mask-image:linear-gradient(to_bottom,black,transparent)] md:h-24 2xl:top-12 2xl:h-32"
                    />
                    <Swiper
                        modules={[A11y, Keyboard, Mousewheel]}
                        slidesPerView={1.25}
                        spaceBetween={24}
                        breakpoints={{
                            640: { slidesPerView: 2.2, spaceBetween: 32 },
                            1024: { slidesPerView: 3.2, spaceBetween: 40 },
                            1536: { slidesPerView: 3.5, spaceBetween: 56 },
                        }}
                        keyboard={{ enabled: true, onlyInViewport: true }}
                        mousewheel={{ forceToAxis: true, releaseOnEdges: true }}
                        a11y={{
                            containerMessage:
                                "Linha do tempo da nossa história",
                            itemRoleDescriptionMessage: "Acontecimento",
                            slideLabelMessage: "{{index}} de {{slidesLength}}",
                        }}
                        grabCursor
                        watchOverflow
                        speed={600}
                        className="!overflow-visible"
                    >
                        {events.map((item, index) => (
                            <SwiperSlide
                                key={item.id ?? index}
                                className="!h-auto"
                            >
                                <article
                                    data-fade
                                    data-delay={Math.min(index, 4) * 0.12}
                                    className="relative pl-4 md:pl-5"
                                >
                                    <div
                                        aria-hidden="true"
                                        className="pointer-events-none absolute left-0 top-0 h-48 border-l-2 border-primary/50 md:h-56 2xl:h-64"
                                    />
                                    <p className="font-primary text-xl leading-8 text-primary md:text-2xl 2xl:text-3xl">
                                        {item.ano}
                                    </p>
                                    <div className="mt-20 w-[90%] md:mt-24 2xl:mt-28">
                                        <img
                                            src={item.imagem}
                                            alt=""
                                            loading="lazy"
                                            className="aspect-[5/3] w-full border-custom object-cover"
                                        />
                                        <h3 className="mt-6 font-admin text-sm font-normal text-white md:text-base 2xl:text-lg">
                                            {item.titulo}
                                        </h3>
                                        <Text className="mt-3" variant="p">
                                            {item.descricao}
                                        </Text>
                                    </div>
                                </article>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
};
