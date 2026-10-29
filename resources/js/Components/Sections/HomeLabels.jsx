import { accessibleText } from "@/lib/accessibleText";
import { useLang } from "@/hooks/useLang";
import "swiper/swiper-bundle.css";

import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { LinkButton } from "../UI/LinkButton";
import { Title } from "../UI/Title";
import { Text } from "../UI/Text";
import { SectionBackground } from "../UI/SectionBackground";

export const HomeLabels = ({ content, images }) => {
    const lang = useLang();
    return (
        <section className="section-overflown pt-20 xl:pt-12 2xl:pt-20 isolate">
            <SectionBackground
                direction="right"
                parallax="8"
                className="section-background inset-0 z-[-2] top-[4%] aspect-[581/957] md:aspect-[581/407] opacity-40"
            />

            <div className="container section-content max-w-medium text-center">
                <HomeWine content={content} />
                <Title
                    tag="h3"
                    variant="subtitle"
                    html={content[0].subtitulo}
                    data-fade
                    className=""
                />
                <Title
                    tag="h2"
                    variant="h2"
                    html={content[0].titulo}
                    data-split
                    data-drift="0"
                    className="md:max-w-[900px] mx-auto mt-2 2xl:mt-6 mb-5 md:mb-10 2xl:mb-15"
                />

                <Text
                    data-fade
                    data-delay="0.15"
                    className="mb-5 md:mb-10 2xl:mb-14 md:max-w-[840px] mx-auto"
                >
                    {content[0].texto}
                </Text>

                <div data-fade data-delay="0.3">
                    <LinkButton
                        href={route("Produtos.index") }
                        className="mx-auto"
                    >
                        {lang("verCatalogo")}
                    </LinkButton>
                </div>
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
        <div data-fade className="mt-12 md:mt-20 2xl:mt-28 overflow-x-clip">
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
                            data-parallax={index % 2 === 0 ? "-6" : "6"}
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
    const lang = useLang();
    return (
            <div className="grid grid-cols-1 items-center md:grid-cols-2 gap-5 md:gap-10 2xl:gap-20 text-start pb-32 md:pb-44 2xl:pb-64">
                <div>
                    <Title
                        tag="h3"
                        variant="h3"
                        html={content[1].titulo}
                        data-split
                        className="md:max-w-[550px]"
                    />
                    <Text
                        data-fade
                        data-delay="0.2"
                        className="py-5 md:py-10 md:max-w-[490px]"
                    >
                        {content[1].texto}
                    </Text>

                    <div data-fade data-delay="0.35">
                        <LinkButton
                        href={route("Institucional.index")}
                        >
                            {lang("nossaHistoria")}
                        </LinkButton>
                    </div>
                </div>

                <div
                    data-reveal="up"
                    className="aspect-[193/175] overflow-hidden border-custom"
                >
                    <img
                        src={content[1].imagem}
                        alt={accessibleText(content[1].titulo || "")}
                        className="size-full object-cover"
                    />
                </div>
            </div>
    );
};
