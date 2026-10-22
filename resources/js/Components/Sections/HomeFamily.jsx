import { LinkButton } from "../UI/LinkButton";
import { Text } from "../UI/Text";
import { Title } from "../UI/Title";

export const HomeFamily = ({ content }) => {
    return (
        <section className="relative overflow-hidden md:pt-28 pb-20 xl:pb-36 2xl:pb-56">
            <Backgrounds />

            <div className="container relative mx-auto max-w-medium z-30">
                <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 md:gap-16">
                    <img
                        src={content[0].imagem}
                        alt=""
                        className="md:aspect-[70/80] 2xl:aspect-[78/100] w-full border-custom object-cover mt-40 2xl:mt-56"
                    />

                    <div>
                        <img
                            src={content[0].imagem_mobile}
                            alt=""
                            className="aspect-[72/55] w-full border-custom object-cover"
                        />
                        <Title
                            tag="h2"
                            variant="h2"
                            html={content[0].titulo}
                            className="text-center md:text-start pt-2 md:pt-0 md:max-w-48 2xl:max-w-[400px] mx-auto 2xl:ml-auto 2xl:mr-0 md:mt-40 2xl:mt-56"
                        />
                    </div>
                </div>

                <Wine content={content[1]} />
            </div>
        </section>
    );
};

const Wine = ({ content }) => {
    return (
        <div className="grid grid-cols-1 items-center md:grid-cols-2 gap-5 md:gap-10 2xl:gap-20 xl:mt-80 mt-20 2xl:mt-96">
            <div>
                <Title
                    tag="h3"
                    variant="h3"
                    html={content.titulo}
                    className="md:max-w-[550px]"
                />
                <Text className="py-5 md:py-10 md:max-w-[490px]">
                    {content.texto}
                </Text>

                <LinkButton
                // href="/acomodacoes"
                >
                    Nossa história
                </LinkButton>
            </div>

            <div className="aspect-[193/175]">
                <img
                    src={content.imagem}
                    alt={content.titulo || ""}
                    className="size-full border-custom object-cover"
                />
            </div>
        </div>
    );
};

const Backgrounds = () => {
    return (
        <>
            <img
                src="/site/backgrounds/e86e071f45674b1f92edd625da4a22d3.jpg"
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 h-full w-full object-cover"
            />

            <img
                src="/site/backgrounds/7f8392a21dce45a283290e735d3157f3.png"
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute right-[46%] top-0 2xl:top-16 aspect-[1/1] object-cover z-20 opacity-30"
            />

            <div className="pointer-events-none absolute inset-0 z-10 bg-black/70" />

            <div className="pointer-events-none absolute inset-x-0 top-0 z-[3] h-[450px] bg-gradient-to-b from-black via-black/60 to-transparent" />

            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-[500px] bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
        </>
    );
};
