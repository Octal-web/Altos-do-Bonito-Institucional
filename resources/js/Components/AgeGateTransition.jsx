import { useLayoutEffect, useRef } from "react";
import { flushSync } from "react-dom";
import { gsap, MOTION_OK, ScrollTrigger } from "@/lib/gsap";
import { BrandSeal } from "./UI/BrandSeal";

export const AgeGateTransition = ({ onCovered, onComplete }) => {
    const dialogRef = useRef(null);

    useLayoutEffect(() => {
        const dialog = dialogRef.current;
        const logo = dialog.querySelector("[data-transition-logo]");
        const motion = window.matchMedia(MOTION_OK).matches;
        let active = true;
        let timeline;
        let timeout;
        dialog.showModal();

        const reveal = async () => {
            flushSync(onCovered);
            const images = [...document.querySelectorAll("#main-content img")]
                .filter((img) => img.getBoundingClientRect().top < window.innerHeight);
            await Promise.race([
                Promise.all(images.map((img) => img.decode().catch(() => {}))),
                new Promise((resolve) => { timeout = setTimeout(resolve, 2500); }),
            ]);
            if (!active) return;
            clearTimeout(timeout);
            ScrollTrigger.refresh();
            const finish = () => {
                dialog.close();
                onComplete();
            };
            if (!motion) { finish(); return; }
            timeline = gsap.timeline({ onComplete: finish })
                .to(logo, { autoAlpha: 0, yPercent: -40, duration: 0.5, ease: "power3.in" })
                .to(dialog, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.9, ease: "expo.inOut" }, 0.15);
        };

        if (motion) {
            timeline = gsap.timeline({ onComplete: reveal })
                .fromTo(dialog, { clipPath: "inset(100% 0% 0% 0%)" },
                    { clipPath: "inset(0% 0% 0% 0%)", duration: 0.8, ease: "expo.inOut" })
                .fromTo(logo, { autoAlpha: 0, yPercent: 40 },
                    { autoAlpha: 1, yPercent: 0, duration: 0.8, ease: "expo.out" }, 0.35);
        } else {
            // Defer the React update until this layout effect has completed.
            Promise.resolve().then(() => { if (active) reveal(); });
        }

        return () => {
            active = false;
            clearTimeout(timeout);
            timeline?.kill();
            dialog.close();
        };
    }, []);

    return (
        <dialog ref={dialogRef} aria-label="Carregando página"
            onCancel={(event) => event.preventDefault()}
            className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-hidden border-0 bg-[#4b4b49] p-0 backdrop:bg-transparent">
            <div className="flex h-full items-center justify-center">
                <BrandSeal aria-hidden="true" data-transition-logo className="relative w-24 md:w-32 2xl:w-40"
                    imgClassName="block w-full motion-safe:animate-spin-loading" />
            </div>
        </dialog>
    );
};
