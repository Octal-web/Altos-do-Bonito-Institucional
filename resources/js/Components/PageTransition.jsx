import { router } from "@inertiajs/react";
import { useEffect, useRef } from "react";
import { gsap, MOTION_OK, ScrollTrigger } from "@/lib/gsap";
import { BrandSeal } from "./UI/BrandSeal";

const MAX_IMAGE_WAIT = 2500;

// Só navegações de página inteira ganham transição (recargas parciais e
// visitas que preservam estado, como filtros e paginação, passam direto)
const isPageVisit = (visit) =>
    visit.method === "get" &&
    !visit.async &&
    !visit.preserveState &&
    !visit.only?.length;

const nextFrame = () =>
    new Promise((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(resolve)),
    );

// Espera as imagens da primeira dobra da nova página, com teto para não travar a navegação
const waitForVisibleImages = () => {
    const pending = [...document.querySelectorAll("main img")].filter(
        (img) =>
            !img.complete &&
            img.getBoundingClientRect().top < window.innerHeight,
    );

    const loaded = Promise.all(
        pending.map(
            (img) =>
                new Promise((resolve) => {
                    img.addEventListener("load", resolve, { once: true });
                    img.addEventListener("error", resolve, { once: true });
                }),
        ),
    );

    return Promise.race([
        loaded,
        new Promise((resolve) => setTimeout(resolve, MAX_IMAGE_WAIT)),
    ]);
};

export const PageTransition = () => {
    const dialogRef = useRef(null);

    useEffect(() => {
        const dialog = dialogRef.current;
        const q = gsap.utils.selector(dialog);

        let timeline = null;
        let entered = Promise.resolve();
        let covering = false;
        let token = 0;

        const play = (vars) => {
            timeline?.kill();
            timeline = gsap.timeline(vars);
            return timeline;
        };

        const removeStart = router.on("start", (event) => {
            if (!isPageVisit(event.detail.visit)) return;
            if (!window.matchMedia(MOTION_OK).matches) return;

            token += 1;
            if (covering) return;
            covering = true;

            const menu = document.getElementById("header-menu");
            const fromMenu = menu?.open;

            // Fica acima do menu: um modal aberto depois entra por cima na top layer
            if (!dialog.open) dialog.showModal();

            let done;
            entered = new Promise((resolve) => (done = resolve));

            if (fromMenu) {
                // Menu aberto: os itens sobem para as máscaras e uma camada da mesma
                // cor do menu cobre o restante, deixando só o selo da marca
                play({ onComplete: done })
                    .to(menu.querySelectorAll("[data-menu-item]"), {
                        yPercent: -110,
                        duration: 0.45,
                        ease: "power3.in",
                        stagger: 0.04,
                    })
                    .fromTo(
                        dialog,
                        { clipPath: "inset(0% 0% 0% 0%)", autoAlpha: 0 },
                        { autoAlpha: 1, duration: 0.4, ease: "power2.out" },
                        0.25,
                    )
                    .fromTo(
                        q("[data-transition-logo]"),
                        { autoAlpha: 0, scale: 0.85 },
                        {
                            autoAlpha: 1,
                            scale: 1,
                            duration: 0.8,
                            ease: "expo.out",
                        },
                        0.45,
                    );
                return;
            }

            // Menu fechado: a cortina sobe de baixo e o selo vem logo atrás
            play({ onComplete: done })
                .fromTo(
                    dialog,
                    { clipPath: "inset(100% 0% 0% 0%)", autoAlpha: 1 },
                    {
                        clipPath: "inset(0% 0% 0% 0%)",
                        duration: 0.8,
                        ease: "expo.inOut",
                    },
                )
                .fromTo(
                    q("[data-transition-logo]"),
                    { autoAlpha: 0, yPercent: 40 },
                    {
                        autoAlpha: 1,
                        yPercent: 0,
                        duration: 0.8,
                        ease: "expo.out",
                    },
                    0.35,
                );
        });

        const removeFinish = router.on("finish", async (event) => {
            if (!covering || event.detail.visit.interrupted) return;

            const current = token;
            await entered;
            await nextFrame();
            await waitForVisibleImages();
            if (current !== token) return;

            covering = false;
            ScrollTrigger.refresh();

            // Saída: o selo sobe e a cortina recolhe para cima, como o menu fechando
            play({ onComplete: () => dialog.close() })
                .to(q("[data-transition-logo]"), {
                    autoAlpha: 0,
                    yPercent: -40,
                    duration: 0.5,
                    ease: "power3.in",
                })
                .to(
                    dialog,
                    {
                        clipPath: "inset(0% 0% 100% 0%)",
                        duration: 0.9,
                        ease: "expo.inOut",
                    },
                    0.15,
                );
        });

        return () => {
            removeStart();
            removeFinish();
            timeline?.kill();
        };
    }, []);

    return (
        <dialog
            ref={dialogRef}
            aria-label="Carregando página"
            onCancel={(event) => event.preventDefault()}
            className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-hidden border-0 bg-[#4b4b49] p-0 backdrop:bg-transparent"
        >
            <div className="flex h-full items-center justify-center">
                <BrandSeal
                    aria-hidden="true"
                    data-transition-logo
                    className="relative w-24 md:w-32 2xl:w-40"
                />
            </div>
        </dialog>
    );
};
