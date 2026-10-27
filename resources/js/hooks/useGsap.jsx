import { useLayoutEffect } from "react";
import { gsap, MOTION_OK } from "@/lib/gsap";

/**
 * Executa animações GSAP com escopo no elemento informado e as desfaz ao desmontar.
 * Só roda quando o usuário não pediu redução de movimento; o callback recebe
 * `{ mobile, desktop }` e um seletor `q` restrito ao escopo.
 */
export const useGsap = (scopeRef, setup, deps = []) => {
    useLayoutEffect(() => {
        if (!scopeRef.current) return;

        const q = gsap.utils.selector(scopeRef);
        const mm = gsap.matchMedia(scopeRef);

        mm.add(
            {
                mobile: `${MOTION_OK} and (max-width: 767px)`,
                desktop: `${MOTION_OK} and (min-width: 768px)`,
            },
            (context) => setup(context.conditions, q),
        );

        return () => mm.revert();
    }, deps);
};
