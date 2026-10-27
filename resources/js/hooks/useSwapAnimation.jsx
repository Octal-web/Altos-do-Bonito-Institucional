import { useLayoutEffect, useRef } from "react";
import { gsap, MOTION_OK } from "@/lib/gsap";

/**
 * Anima a troca de conteúdo (ex.: abas) sempre que `key` mudar:
 * - [data-swap-media]  faz fade-in da nova imagem
 * - [data-swap]        o bloco sobe e aparece
 */
export const useSwapAnimation = (scopeRef, key) => {
    const isFirstRender = useRef(true);

    useLayoutEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        if (!scopeRef.current || !window.matchMedia(MOTION_OK).matches) return;

        const q = gsap.utils.selector(scopeRef);

        const ctx = gsap.context(() => {
            gsap.fromTo(
                q("[data-swap-media]"),
                { opacity: 0 },
                { opacity: 1, duration: 0.9, ease: "power2.out", stagger: 0.1 },
            );
            gsap.fromTo(
                q("[data-swap]"),
                { y: 24, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.08 },
            );
        }, scopeRef);

        return () => ctx.kill();
    }, [key]);
};
