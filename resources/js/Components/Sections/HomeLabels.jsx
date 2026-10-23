import "swiper/swiper-bundle.css";

import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { LinkButton } from "../UI/LinkButton";
import { Title } from "../UI/Title";
import { Text } from "../UI/Text";
import { SectionBackground } from "../UI/SectionBackground";

export const HomeLabels = ({ content, images }) => {
    return (
        <section className="section-overflown pt-20 xl:pt-12 2xl:pt-20 isolate">
            <SectionBackground
                direction="right"
                className="section-background inset-0 z-[-2] top-[4%] aspect-[581/957] md:aspect-[581/407] opacity-40"
            />

            <div className="container section-content max-w-medium text-center">
                <HomeWine content={content}/>
                <Title
                    tag="h3"
                    variant="subtitle"
                    html={content[0].subtitulo}
                    className=""
                />
                <Title
                    tag="h2"
                    variant="h2"
                    html={content[0].titulo}
                    className="md:max-w-[900px] mx-auto mt-2 2xl:mt-6 mb-5 md:mb-10 2xl:mb-15"
                />

                <Text className="mb-5 md:mb-10 2xl:mb-14 md:max-w-[840px] mx-auto">
                    {content[0].texto}
                </Text>

                <LinkButton
                    // href="/acomodacoes"
                    className="mx-auto"
                >
                    Ver catálogo
                </LinkButton>
            </div>

            <Carousel images={images} />
        </section>
    );
};

const Carousel = ({ images }) => {
    const MIN_SLIDES = 10;

    const repeat = images.length
        ? Math.max(1, Math.ceil(MIN_SLIDES / images.length))
        : 1;

    const carouselImages = Array.from({ length: repeat }, () => images).flat();

    return (
        <div className="mt-12 md:mt-20 2xl:mt-28 overflow-hidden">
            <Swiper
                modules={[Autoplay]}
                centeredSlides
                breakpoints={{
                    0: {
                        slidesPerView: 1.5,
                        spaceBetween: 16,
                    },
                    640: {
                        slidesPerView: 2.7,
                        spaceBetween: 20,
                    },
                    1024: {
                        slidesPerView: 5.7,
                        spaceBetween: 41,
                    },
                }}
                loop={carouselImages.length > 4}
                speed={3000}
                autoplay={{
                    delay: 1500,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                className="!overflow-visible"
            >
                {carouselImages.map((item, index) => (
                    <SwiperSlide key={`${item.id}-${index}`}>
                        <div
                            className={`w-full aspect-[319/468] overflow-hidden ${index % 2 === 0 ? "mt-8 2xl:mt-11" : ""}`}
                        >
                            <img
                                loading="lazy"
                                className="block h-full w-full object-cover border-custom"
                                src={item.imagem}
                                alt=""
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

const HomeWine = ({ content }) => {
    return (
            <div className="grid grid-cols-1 items-center md:grid-cols-2 gap-5 md:gap-10 2xl:gap-20 text-start pb-32 md:pb-44 2xl:pb-64">
                <div>
                    <Title
                        tag="h3"
                        variant="h3"
                        html={content[1].titulo}
                        className="md:max-w-[550px]"
                    />
                    <Text className="py-5 md:py-10 md:max-w-[490px]">
                        {content[1].texto}
                    </Text>

                    <LinkButton
                    // href="/acomodacoes"
                    >
                        Nossa história
                    </LinkButton>
                </div>

                <div className="aspect-[193/175]">
                    <img
                        src={content[1].imagem}
                        alt={content[1].titulo || ""}
                        className="size-full border-custom object-cover"
                    />
                </div>
            </div>
    );
};
