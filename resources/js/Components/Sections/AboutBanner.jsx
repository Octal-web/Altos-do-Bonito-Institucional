import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useGsap } from "@/hooks/useGsap";
import { Text } from "../UI/Text";
import { Title } from "../UI/Title";

export const AboutBanner = ({ content }) => {
    const sectionRef = useRef(null);

    // Entrada: o quadro se abre a partir do centro enquanto a imagem desfaz um zoom lento
    useGsap(sectionRef, ({ mobile }, q) => {
        gsap.fromTo(
            q("[data-banner-frame]"),
            { clipPath: mobile ? "inset(8% 6% 8% 6%)" : "inset(18% 12% 18% 12%)" },
            {
                clipPath: "inset(0% 0% 0% 0%)",
                duration: 2,
                delay: 0.3,
                ease: "expo.inOut",
            },
        );
        gsap.from(q("[data-banner-frame] img"), {
            scale: 1.3,
            duration: 2.8,
            delay: 0.3,
            ease: "expo.out",
        });
    });

    return (
        <section ref={sectionRef} className="relative overflow-hidden pt-20 md:pt-10">
            <div className="container max-w-medium">
                <div className="grid grid-cols-1 items-end py-10 md:grid-cols-[3fr_1fr] md:py-20 2xl:py-28 gap-5">
                    <Title
                        tag="h2"
                        variant="h2"
                        html={content.titulo}
                        data-split
                        data-drift="0"
                        className="md:max-w-[700px] 2xl:max-w-[898px]"
                    />

                    <Text data-fade data-delay="0.4" className="w-full min-w-0 max-w-[340px] md:justify-self-end">
                        {content.texto}
                    </Text>
                </div>
            </div>
            <div
                data-banner-frame
                className="relative aspect-[16/9] w-full overflow-hidden md:aspect-[4/1]"
            >
                <img
                    src={content.imagem}
                    alt=""
                    data-parallax="10"
                    className="absolute -top-[15%] h-[130%] w-full object-cover object-bottom"
                />
            </div>
        </section>
    );
};
