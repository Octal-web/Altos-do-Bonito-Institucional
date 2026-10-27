import { useRef } from "react";
import { gsap, splitWords } from "@/lib/gsap";
import { useGsap } from "@/hooks/useGsap";
import { Title } from "../UI/Title";

export const HomeExpressions = ({ content }) => {
    const sectionRef = useRef(null);

    // A seção fica presa na tela enquanto a imagem cresce do quadro recortado
    // até ocupar a tela inteira; o título surge sobre ela no final.
    useGsap(sectionRef, ({ mobile }, q) => {
        const [title] = q("[data-expressions-title]");
        const split = splitWords(title);

        gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: "+=180%",
                pin: true,
                scrub: true,
            },
        })
            .fromTo(
                q("[data-expressions-frame]"),
                {
                    clipPath: mobile
                        ? "inset(30% 5% 30% 5% round 12px)"
                        : "inset(22% 15% 22% 15% round 12px)",
                },
                { clipPath: "inset(0% 0% 0% 0% round 0px)", duration: 1 },
            )
            .fromTo(
                q("[data-expressions-frame] img"),
                { scale: 1.35 },
                { scale: 1, duration: 1 },
                0,
            )
            .to(q("[data-expressions-shade]"), { opacity: 0.55, duration: 0.5 }, 0.45)
            .from(
                split.words,
                {
                    yPercent: 110,
                    duration: 0.45,
                    stagger: 0.05,
                    ease: "power3.out",
                },
                0.6,
            )
            .to({}, { duration: 0.35 });
    });

    return (
        <section ref={sectionRef} className="relative">
            <div className="relative flex h-[100svh] items-center justify-center overflow-hidden">
                <div data-expressions-frame className="absolute inset-0">
                    <img
                        src={content.imagem}
                        alt=""
                        className="size-full object-cover"
                    />
                    <div
                        data-expressions-shade
                        aria-hidden="true"
                        className="absolute inset-0 bg-black opacity-55 motion-safe:opacity-0"
                    />
                </div>

                <Title
                    tag="h2"
                    variant="h2"
                    html={content.titulo}
                    data-expressions-title
                    className="container relative z-10 mx-auto max-w-medium text-center [&_strong]:block"
                />
            </div>
        </section>
    );
};
