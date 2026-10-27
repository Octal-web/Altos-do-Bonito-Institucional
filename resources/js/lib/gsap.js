import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

// Evita recalcular tudo quando a barra de endereço do mobile aparece/some
ScrollTrigger.config({ ignoreMobileResize: true });

export const MOTION_OK = "(prefers-reduced-motion: no-preference)";

// Quebra o texto em palavras, cada uma dentro de uma máscara (overflow clip).
// O padding compensa as descendentes da fonte serifada para não cortá-las.
export const splitWords = (element) => {
    const split = SplitText.create(element, {
        type: "words",
        mask: "words",
    });

    split.masks.forEach((mask) => {
        mask.style.paddingBottom = "0.14em";
        mask.style.marginBottom = "-0.14em";
    });

    return split;
};

export { gsap, ScrollTrigger, SplitText };
