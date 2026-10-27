import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useGsap } from "@/hooks/useGsap";
import { LinkButton } from "../UI/LinkButton";
import { Text } from "../UI/Text";
import { Title } from "../UI/Title";

export const HomeTerroir = ({ content }) => {
    const sectionRef = useRef(null);

    // O quadro inteiro cresce até o tamanho final acompanhando o scroll
    useGsap(sectionRef, ({ mobile }, q) => {
        const [frame] = q("[data-terroir-frame]");

        gsap.fromTo(
            frame,
            { scale: mobile ? 0.88 : 0.72 },
            {
                scale: 1,
                ease: "none",
                scrollTrigger: {
                    trigger: frame,
                    start: "top bottom",
                    end: "center 55%",
                    scrub: true,
                },
            },
        );
    });

    return (
        <section
            ref={sectionRef}
            className="relative overflow-hidden pt-20 md:pt-32 2xl:pt-52"
        >
            <div className="container relative z-30 mx-auto max-w-medium">
                <div
                    data-terroir-frame
                    className="aspect-[154/67] md:aspect-[3/1] 2xl:aspect-[2/1] overflow-hidden border-custom"
                >
                    <img
                        src={content.imagem}
                        alt={content.titulo || ""}
                        className="size-full object-cover"
                    />
                </div>
                <Title
                    tag="h3"
                    variant="h3"
                    html={content.titulo}
                    data-split
                    className="[&_strong]:block text-center mt-8 md:mt-16"
                />
                <Text
                    data-fade
                    data-delay="0.2"
                    className="md:max-w-[700px] text-center mx-auto py-5 md:py-10"
                >
                    {content.texto}
                </Text>

                <div data-fade data-delay="0.35">
                    <LinkButton
                        className="mx-auto"
                        // href="/acomodacoes"
                    >
                        Descobrir o terroir
                    </LinkButton>
                </div>
            </div>
        </section>
    );
};
