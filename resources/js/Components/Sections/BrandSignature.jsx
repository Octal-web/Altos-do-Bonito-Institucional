import { Title } from "../UI/Title";

export const BrandSignature = ({ content, children }) => {
    return (
        <section className="relative isolate z-20 overflow-visible py-20 md:py-32 2xl:pt-80 2xl:pb-52">
            <div className="pointer-events-none absolute inset-0 -z-20 overflow-hidden" aria-hidden="true">
                <img
                    src="/site/backgrounds/5a0f2c3685fc45149e409e30a5b7a7c4.jpg"
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="pointer-events-none absolute inset-0 rotate-180 object-cover opacity-45 md:opacity-70 max-sm:h-full md:left-96 md:top-40"
                />
            </div>
            <img
                src="/site/backgrounds/7f8392a21dce45a283290e735d3157f3.png"
                alt=""
                aria-hidden="true"
                loading="lazy"
                className="pointer-events-none absolute right-[85%] 2xl:right-[80%] -bottom-80 -z-10 opacity-25 md:-bottom-80 hidden lg:block"
            />

            <div className="container mx-auto max-w-medium text-center">
                {children && (
                    <div className="relative mx-auto max-w-[760px]">
                        {children}
                    </div>
                )}

                <div
                    className={`mx-auto ${children ? "mt-24 md:mt-52 2xl:mt-72" : ""}`}
                >
                    <img
                        src={content.imagem}
                        alt="Altos do Bonito"
                        loading="lazy"
                        className="mx-auto aspect-[823/58]"
                    />

                    <Title
                        tag="h3"
                        variant="h3"
                        html={content.titulo}
                        className="mx-auto [&_strong]:block mt-5 md:mt-10 2xl:mt-20"
                    />
                </div>
            </div>
        </section>
    );
};
