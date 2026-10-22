import "swiper/swiper-bundle.css";

import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { LinkButton } from "../UI/LinkButton";
import { Title } from "../UI/Title";

export const HomeLabels = ({ content, images }) => {
    return (
        <section className="relative overflow-hidden xl:pt-12 2xl:pt-20 isolate">
            <img
                src="/site/backgrounds/5a0f2c3685fc45149e409e30a5b7a7c4.jpg"
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-[-2] object-cover rotate-180 top-[19%] aspect-[581/957] md:aspect-[581/507]"
            />

            <div className="container relative z-[1] max-w-medium text-center">
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
                    className="md:max-w-[900px] mx-auto mt-3 md:mt-7 mb-10 2xl:mb-15"
                />

                <LinkButton
                    // href="/acomodacoes"
                    className="mx-auto"
                >
                    Ver catálogo
                </LinkButton>
            </div>

            <Carousel images={images} />

            <HomeCampaign content={content} />
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
        <div className="mt-20 2xl:mt-28 overflow-hidden">
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
                                className="block h-full w-full object-cover"
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

const HomeCampaign = ({ content }) => {
    return (
        <div className="pt-32 xl:pt-80 2xl:pt-[473px] relative z-10">
            <div className="grid grid-cols-1 items-center md:grid-cols-2 gap-5 md:gap-0 container max-w-medium">
                <img
                    src={content[1].imagem}
                    alt={content[1].titulo || ""}
                    className="aspect-[820/683] 2xl:aspect-[820/783] border-custom object-cover order-2 md:order-1"
                />
                <Title
                    tag="h2"
                    variant="h2"
                    html={content[1].titulo}
                    className="md:max-w-[300px] 2xl:max-w-[460px] md:ml-10 2xl:ml-20 md:order-2"
                />
            </div>
        </div>
    );
};
