import { useLang } from "@/hooks/useLang";
import { Title } from "../UI/Title";
import { SectionBackground } from "../UI/SectionBackground";

export const BrandSignature = ({ content, children, bgClassName = "" }) => {
    const lang = useLang();
    return (
        <section className="relative z-20 overflow-visible py-40 md:py-32 2xl:pt-80 2xl:pb-52">
            <div className="pointer-events-none absolute inset-0 -z-20 overflow-visible" aria-hidden="true">
                <SectionBackground
                    parallax="8"
                    direction="right"
                    className={`inset-0 opacity-45 md:opacity-70 max-sm:h-full md:left-96 md:top-40 ${bgClassName}`}
                />
            </div>
            <img
                src="/site/backgrounds/7f8392a21dce45a283290e735d3157f3.png"
                alt=""
                aria-hidden="true"
                loading="lazy"
                data-parallax="20"
                className="pointer-events-none absolute right-[85%] 2xl:right-[80%] -bottom-80 -z-10 opacity-25 md:-bottom-80 hidden lg:block"
            />

            <div className="container mx-auto max-w-medium text-center">
                {children && (
                    <div data-fade className="relative mx-auto">
                        {children}
                    </div>
                )}

                <div
                    className={`mx-auto ${children ? "mt-24 md:mt-52 2xl:mt-72" : ""}`}
                >
                    <img
                        src={content.imagem}
                        alt={lang("marca")}
                        loading="lazy"
                        data-wipe
                        className="mx-auto aspect-[823/58]"
                    />

                    <Title
                        tag="h3"
                        variant="h3"
                        html={content.titulo}
                        data-split
                        className="mx-auto [&_strong]:block mt-5 md:mt-10 2xl:mt-20"
                    />
                </div>
            </div>
        </section>
    );
};
