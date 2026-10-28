import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, router } from "@inertiajs/react";
import { useEffect, useRef } from "react";
import { gsap, MOTION_OK } from "@/lib/gsap";
import { BrandSeal } from "./UI/BrandSeal";

export const Header = ({
    isOpen,
    onToggle,
    onClose,
    whatsappHref,
    links = {},
}) => {
    const dialogRef = useRef(null);
    const timelineRef = useRef(null);

    useEffect(() => () => timelineRef.current?.kill(), []);

    // Ao navegar (inclusive para a mesma página) o menu fecha sem animação:
    // a transição de página já está cobrindo a tela nesse momento
    useEffect(
        () =>
            router.on("navigate", () => {
                timelineRef.current?.kill();
                dialogRef.current?.close();
                onClose();
            }),
        [onClose],
    );

    useEffect(() => {
        const dialog = dialogRef.current;
        const q = gsap.utils.selector(dialog);
        const animate = window.matchMedia(MOTION_OK).matches;

        timelineRef.current?.kill();

        if (!isOpen) {
            if (!dialog.open) return;
            if (!animate) {
                dialog.close();
                return;
            }

            // Saída: os itens sobem para dentro das máscaras e a cortina recolhe para cima
            timelineRef.current = gsap
                .timeline({ onComplete: () => dialog.close() })
                .to(q("[data-menu-item]"), {
                    yPercent: -110,
                    duration: 0.45,
                    ease: "power3.in",
                    stagger: 0.04,
                })
                .to(
                    q("[data-menu-inner]"),
                    { yPercent: -20, duration: 0.8, ease: "expo.inOut" },
                    0.2,
                )
                .to(
                    dialog,
                    {
                        clipPath: "inset(0% 0% 100% 0%)",
                        duration: 0.8,
                        ease: "expo.inOut",
                    },
                    0.2,
                );
            return;
        }

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        if (!dialog.open) dialog.showModal();

        // Entrada: a cortina desce, o conteúdo vem atrás mais devagar e o selo
        // da marca numa camada mais rápida (profundidade); por fim os itens sobem das máscaras
        if (animate) {
            timelineRef.current = gsap
                .timeline()
                .fromTo(
                    dialog,
                    { clipPath: "inset(0% 0% 100% 0%)" },
                    {
                        clipPath: "inset(0% 0% 0% 0%)",
                        duration: 1.1,
                        ease: "expo.inOut",
                    },
                )
                .fromTo(
                    q("[data-menu-inner]"),
                    { yPercent: -30 },
                    { yPercent: 0, duration: 1.1, ease: "expo.inOut" },
                    0,
                )
                .fromTo(
                    q("[data-menu-deco]"),
                    { yPercent: -60, autoAlpha: 0 },
                    {
                        yPercent: 0,
                        autoAlpha: 1,
                        duration: 1.8,
                        ease: "expo.out",
                    },
                    0.2,
                )
                .fromTo(
                    q("[data-menu-bar]"),
                    { autoAlpha: 0 },
                    { autoAlpha: 1, duration: 0.6, ease: "power2.out" },
                    0.6,
                )
                .fromTo(
                    q("[data-menu-item]"),
                    { yPercent: 110 },
                    {
                        yPercent: 0,
                        duration: 1.2,
                        ease: "expo.out",
                        stagger: 0.07,
                    },
                    0.5,
                );
        }

        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [isOpen]);

    const items = [
        { label: "Nossa História", href: route("Institucional.index") },
        { label: "Vinhos", href: route("Produtos.index") },
        { label: "Experiências", href: links.experiencias },
        { label: "Hospedagem", href: links.hospedagem },
        { label: "Visite", href: links.visite || route("Contato.index") },
    ];

    const isHome = route().current("Home.index");

    const bar = (opened) => (
        <div className="container max-w-large">
            <div
                className={`grid items-center gap-3 py-8 xl:py-10 2xl:py-16 ${
                    isHome ? "grid-cols-[1fr_auto]" : "grid-cols-[1fr_auto_1fr]"
                }`}
            >
                <button
                    type="button"
                    onClick={opened ? onClose : onToggle}
                    aria-label={opened ? "Fechar menu" : "Abrir menu"}
                    aria-expanded={opened}
                    aria-controls="header-menu"
                    className={`button-secondary !border-white justify-self-start ${opened ? "!px-3" : ""}`}
                >
                    <FontAwesomeIcon icon={opened ? faXmark : faBars} />
                    {!opened && <span>Menu</span>}
                </button>

                {!isHome && (
                    <h1>
                        <Link
                            href={route("Home.index")}
                            className="flex items-center"
                        >
                            <img
                                src="/site/img/logo.png"
                                alt="Logo"
                                className="block w-80"
                            />
                        </Link>
                    </h1>
                )}

                <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="justify-self-end button-secondary !border-white"
                >
                    <span
                        aria-hidden="true"
                        className="hidden h-px w-5 bg-current sm:block"
                    />
                    WhatsApp
                </a>
            </div>
        </div>
    );

    return (
        <>
            <header className="header absolute inset-x-0 top-0 z-20 text-white">
                {bar(false)}
            </header>

            <dialog
                id="header-menu"
                ref={dialogRef}
                aria-label="Menu principal"
                onCancel={(event) => {
                    event.preventDefault();
                    onClose();
                }}
                className="fixed inset-0 m-0 h-screen max-h-screen w-full max-w-none overflow-y-auto md:overflow-y-hidden overflow-x-hidden border-0 bg-[#4b4b49] p-0 text-white backdrop:bg-transparent"
                data-lenis-prevent
            >
                <BrandSeal
                    spin
                    aria-hidden="true"
                    data-menu-deco
                    className="pointer-events-none absolute -right-40 -bottom-40 w-[480px] opacity-10 md:w-[640px] 2xl:w-[800px]"
                />
                <div data-menu-inner className="relative z-10">
                    <div data-menu-bar>{bar(true)}</div>
                    <nav
                        aria-label="Navegação principal"
                        className="container pb-16 pt-4 md:pt-6"
                    >
                        <ul className="flex flex-col items-center gap-[calc(1.25rem_-_0.15em)] text-center text-3xl md:gap-[calc(1.5rem_-_0.15em)] md:text-4xl 2xl:gap-[calc(2rem_-_0.15em)] 2xl:text-5xl">
                            {items.map(({ label, href }) => (
                                <li
                                    key={label}
                                    className="overflow-hidden font-primary font-normal leading-[1.4] section-content"
                                >
                                    {href ? (
                                        <Link
                                            href={href}
                                            data-menu-item
                                            className="inline-block py-[0.1em] transition-colors hover:text-primary focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-primary"
                                        >
                                            {label}
                                        </Link>
                                    ) : (
                                        <span
                                            aria-disabled="true"
                                            data-menu-item
                                            className="inline-block py-[0.1em]"
                                        >
                                            {label}
                                        </span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </dialog>
        </>
    );
};
