import { useEffect, useLayoutEffect, useRef } from "react";

import { ScrollTrigger } from "@/lib/gsap";

// Colunas andam em sentidos opostos: o texto fica para trás e a imagem corre à frente
const COLUMN_DRIFT = { first: "-30", last: "50" };
const FADE_STAGGER = 0.12;

const markCell = (cell, isLast) => {
    let fades = 0;

    [...cell.children].forEach((element) => {
        if (element.matches("img, figure")) {
            element.dataset.reveal = isLast ? "right" : "left";
            element.dataset.drift = "0";
            return;
        }

        if (!element.textContent.trim()) return;

        if (element.matches("h1, h2, h3, h4")) {
            element.dataset.split = "";
            element.dataset.drift = "0";
            return;
        }

        element.dataset.fade = "";
        element.dataset.delay = String(fades++ * FADE_STAGGER);
    });
};

export const ProductContent = ({ product }) => {
    const contentRef = useRef(null);

    // O HTML vem do editor, então os data-* do useScrollReveal são marcados aqui.
    // Precisa ser layout effect: roda antes do ScrollReveal do pai, que lê esses atributos.
    useLayoutEffect(() => {
        contentRef.current
            ?.querySelectorAll(":scope > table > tbody > tr")
            .forEach((row) => {
                [...row.children].forEach((cell) => {
                    const isLast = cell === row.lastElementChild;

                    cell.dataset.drift = isLast
                        ? COLUMN_DRIFT.last
                        : COLUMN_DRIFT.first;
                    markCell(cell, isLast);
                });
            });
    }, [product.conteudos]);

    // As imagens do editor não têm altura reservada e empurram o restante ao carregar
    useEffect(() => {
        const content = contentRef.current;
        if (!content) return;

        const refresh = () => ScrollTrigger.refresh();

        content.addEventListener("load", refresh, true);
        return () => content.removeEventListener("load", refresh, true);
    }, []);

    if (!product.conteudos) return null;

    return (
        <section className="container max-w-medium mt-20 2xl:mt-32">
            <div
                ref={contentRef}
                className="product-content"
                dangerouslySetInnerHTML={{ __html: product.conteudos }}
            />
        </section>
    );
};
