import { gsap, splitWords } from "@/lib/gsap";
import { useGsap } from "./useGsap";

// Deslocamento de entrada do bloco inteiro, conforme a direção pedida em data-reveal
const REVEAL_FROM = {
    up: { yPercent: 18 },
    down: { yPercent: -18 },
    left: { xPercent: -12 },
    right: { xPercent: 12 },
};

// Movimento contínuo padrão (px): imagens "correm" à frente do scroll,
// títulos ficam um pouco para trás, criando camadas de profundidade
const DEFAULT_DRIFT = {
    reveal: 70,
    split: -40,
};

/**
 * Animações de scroll declarativas, aplicadas a tudo que estiver dentro do escopo:
 *
 * - data-split              título surge palavra por palavra, de baixo de uma máscara
 * - data-fade               elemento sobe e aparece (data-delay opcional, em segundos)
 * - data-reveal[="up|down|left|right"]
 *                           o bloco inteiro (quadro + imagem) entra deslizando e aparecendo
 * - data-drift="70"         movimento contínuo em px enquanto o elemento cruza a tela;
 *                           positivo anda mais rápido que o scroll, negativo fica para trás.
 *                           Imagens com data-reveal e títulos com data-split já têm um padrão;
 *                           use data-drift="0" para desligar.
 *                           Não combinar com data-fade no mesmo elemento.
 * - data-parallax="10"      desloca o elemento em yPercent (-10 → 10) enquanto o pai cruza a tela
 * - data-wipe               revela o elemento da esquerda para a direita conforme o scroll
 */
export const useScrollReveal = (scopeRef) => {
    useGsap(scopeRef, ({ mobile }, q) => {
        q("[data-split]").forEach((element) => {
            const split = splitWords(element);

            gsap.from(split.words, {
                yPercent: 110,
                duration: 1.3,
                ease: "expo.out",
                stagger: 0.06,
                scrollTrigger: { trigger: element, start: "top 85%" },
            });
        });

        q("[data-fade]").forEach((element) => {
            gsap.from(element, {
                y: 50,
                autoAlpha: 0,
                duration: 1.2,
                ease: "power3.out",
                delay: parseFloat(element.dataset.delay) || 0,
                scrollTrigger: { trigger: element, start: "top 90%" },
            });
        });

        q("[data-reveal]").forEach((element) => {
            gsap.from(element, {
                ...(REVEAL_FROM[element.dataset.reveal] ?? REVEAL_FROM.up),
                scale: 0.94,
                autoAlpha: 0,
                duration: 1.6,
                ease: "expo.out",
                scrollTrigger: { trigger: element, start: "top 90%" },
            });
        });

        q("[data-drift], [data-reveal], [data-split]").forEach((element) => {
            const fallback =
                "reveal" in element.dataset
                    ? DEFAULT_DRIFT.reveal
                    : DEFAULT_DRIFT.split;
            const value = element.dataset.drift;
            const base = value === undefined ? fallback : parseFloat(value);

            if (!base) return;

            const drift = base * (mobile ? 0.5 : 1);

            gsap.fromTo(
                element,
                { y: drift },
                {
                    y: -drift,
                    ease: "none",
                    scrollTrigger: {
                        trigger: element,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true,
                    },
                },
            );
        });

        q("[data-parallax]").forEach((element) => {
            const distance = parseFloat(element.dataset.parallax) || 10;

            gsap.fromTo(
                element,
                { yPercent: -distance },
                {
                    yPercent: distance,
                    ease: "none",
                    scrollTrigger: {
                        trigger: element.parentElement,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true,
                    },
                },
            );
        });

        q("[data-wipe]").forEach((element) => {
            gsap.fromTo(
                element,
                { clipPath: "inset(0% 100% 0% 0%)" },
                {
                    clipPath: "inset(0% 0% 0% 0%)",
                    ease: "none",
                    scrollTrigger: {
                        trigger: element,
                        start: "top 90%",
                        end: "top 45%",
                        scrub: true,
                    },
                },
            );
        });
    });
};
