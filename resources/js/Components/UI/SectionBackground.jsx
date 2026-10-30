import { useEffect, useRef, useState } from "react";
import { gsap, MOTION_OK } from "@/lib/gsap";

const directions = {
    left: "",
    right: "rotate-180",
    mirrored: "-scale-x-100",
};

export const SectionBackground = ({
    children,
    direction = "left",
    className = "",
    wrapperClassName = "",
    backgroundClassName = "inset-0",
    overlayClassName = "",
    parallax,
}) => {
    const videoRef = useRef(null);
    const backgroundRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [useStaticFallback, setUseStaticFallback] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        const media = gsap.matchMedia();

        media.add(MOTION_OK, () => {
            let startTimer;
            let active = true;
            video.muted = true;
            setUseStaticFallback(false);

            // Aguarda o fundo entrar na tela antes de iniciar o efeito.
            const observer = new IntersectionObserver(([entry]) => {
                clearTimeout(startTimer);
                if (!entry.isIntersecting) return;

                startTimer = setTimeout(() => {
                    observer.disconnect();
                    video.currentTime = 0;
                    video.play().catch(() => {
                        if (!active) return;
                        setUseStaticFallback(true);
                        setIsPlaying(false);
                    });
                }, 800);
            }, { rootMargin: "0px 0px -20% 0px" });

            observer.observe(video);

            return () => {
                active = false;
                clearTimeout(startTimer);
                observer.disconnect();
                video.pause();
                setIsPlaying(false);
            };
        });

        media.add("(prefers-reduced-motion: reduce)", () => {
            setUseStaticFallback(true);
        });

        return () => media.revert();
    }, []);

    const hasChildren = children !== undefined && children !== null;
    // Com parallax a imagem precisa sobrar acima e abaixo, senão as bordas aparecem ao deslocar
    const fill = parallax
        ? "inset-x-0 -top-[10%] h-[120%] w-full"
        : "inset-0 size-full";
    const mediaClassName = `pointer-events-none absolute object-fill ${hasChildren ? fill : ""} ${directions[direction] || ""} ${className}`;
    const background = (
        <>
        <img
            src={useStaticFallback
                ? "/site/backgrounds/5a0f2c3685fc45149e409e30a5b7a7c4.webp"
                : "/site/backgrounds/a2d5b4dbc3b936ea42c219b7357d0167.webp"}
            alt=""
            aria-hidden="true"
            data-parallax={parallax}
            className={`${mediaClassName} transition-opacity duration-700`}
            style={{ opacity: isPlaying ? 0 : 1 }}
        />
        <video
            ref={videoRef}
            src="/site/backgrounds/b3a0244d176544cf516531806db9a701.mp4"
            poster="/site/backgrounds/a2d5b4dbc3b936ea42c219b7357d0167.webp"
            aria-hidden="true"
            muted
            playsInline
            preload="auto"
            onPlaying={() => setIsPlaying(true)}
            onError={() => {
                setUseStaticFallback(true);
                setIsPlaying(false);
            }}
            onPause={(event) => {
                if (!event.currentTarget.ended) {
                    setUseStaticFallback(true);
                    setIsPlaying(false);
                }
            }}
            data-parallax={parallax}
            className={`${mediaClassName} transition-opacity duration-700`}
            style={{ opacity: isPlaying ? 1 : 0 }}
        />
        </>
    );

    if (!hasChildren) return background;

    return (
        <div className={`relative ${wrapperClassName}`}>
            <div
                ref={backgroundRef}
                aria-hidden="true"
                className={`pointer-events-none absolute z-0 overflow-hidden ${backgroundClassName}`}
            >
                {background}
                {overlayClassName && <div className={`absolute inset-0 ${overlayClassName}`} />}
            </div>
            <div className="relative z-10 [&>section]:bg-transparent">
                {children}
            </div>
        </div>
    );
};

