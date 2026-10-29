import { useLang } from "@/hooks/useLang";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, router } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";
import { gsap, MOTION_OK, ScrollTrigger } from "@/lib/gsap";
import { BrandSeal } from "./UI/BrandSeal";

// Fração da altura da tela rolada até o logo do banner da home virar o logo do header
export const HERO_LOGO_END = 0.55;

// Posição do logo do header no estado expandido (topo da página), mesmo que no
// momento ele esteja compacto: é para lá que o logo do banner da home voa
export const getHeaderLogoRect = () => {
    const header = document.querySelector("header[data-header]");
    const logo = header?.querySelector("[data-header-logo]");

    if (!logo) return null;

    // Expande só para medir e volta ao estado atual antes do próximo frame
    const compact = header.style.getPropertyValue("--compact");
    header.style.setProperty("--compact", "0");
    const rect = logo.getBoundingClientRect();
    header.style.setProperty("--compact", compact || "0");

    return rect;
};

export const Header = ({
    isOpen,
    onToggle,
    onClose,
    whatsappHref,
    links = {},
}) => {
    const headerRef = useRef(null);
    const lang = useLang();
    const dialogRef = useRef(null);
    const timelineRef = useRef(null);
    const [scrolled, setScrolled] = useState(false);

    const isHome = route().current("Home.index");

    useEffect(() => () => timelineRef.current?.kill(), []);

    // Ao rolar o header ganha fundo e fica compacto (--compact vai de 0 a 1 e
    // reduz o padding). Na home isso só começa depois que o logo do banner chega
    // ao header (fim da animação em HomeSlides), para não encobri-lo no caminho
    useEffect(() => {
        const header = headerRef.current;
        const start = () => (isHome ? window.innerHeight * HERO_LOGO_END : 1);

        // Na home a compactação acompanha o scroll em vez de ter duração própria:
        // na volta o header termina de expandir antes de o logo do banner reaparecer
        const compactOnScroll = !isHome
            ? null
            : gsap.fromTo(
                header,
                { "--compact": 0 },
                {
                    "--compact": 1,
                    ease: "none",
                    scrollTrigger: {
                        start,
                        end: () => `+=${window.innerHeight * 0.15}`,
                        scrub: true,
                    },
                },
            );

        const trigger = ScrollTrigger.create({
            start,
            end: "max",
            onToggle: (self) => {
                setScrolled(self.isActive);

                if (!isHome) {
                    gsap.to(header, {
                        "--compact": self.isActive ? 1 : 0,
                        duration: 0.5,
                        ease: "power2.out",
                        overwrite: true,
                    });
                }
            },
        });

        return () => {
            trigger.kill();
            compactOnScroll?.scrollTrigger?.kill();
            compactOnScroll?.kill();
            gsap.killTweensOf(header);
        };
    }, [isHome]);

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
        { label: lang("nossaHistoria"), href: route("Institucional.index"), current: route().current("Institucional.*") },
        { label: lang("vinhos"), href: route("Produtos.index"), current: route().current("Produtos.*") },
        { label: lang("experiencias"), href: links.experiencias },
        { label: lang("hospedagem"), href: links.hospedagem },
        { label: lang("visite"), href: route("Contato.index"), current: route().current("Contato.*") },
    ];

    // Na home o banner já tem o próprio h1
    const LogoTag = isHome ? "div" : "h1";

    const bar = (opened) => (
        <div className="container max-w-large">
            {/* Fechado vai de py-8/xl:py-10/2xl:py-16 até py-6/xl:py-8/2xl:py-10 conforme --compact */}
            <div
                className={`grid grid-cols-[1fr_auto_1fr] items-center gap-3 ${
                    opened
                        ? "py-8 xl:py-10 2xl:py-16"
                        : "py-[calc(2rem_-_0.5rem_*_var(--compact,0))] xl:py-[calc(2.5rem_-_0.5rem_*_var(--compact,0))] 2xl:py-[calc(4rem_-_1.5rem_*_var(--compact,0))]"
                }`}
            >
                <button
                    type="button"
                    onClick={opened ? onClose : onToggle}
                    aria-label={opened ? lang("fecharMenu") : lang("abrirMenu")}
                    aria-expanded={opened}
                    aria-controls="header-menu"
                    className={`button-secondary !border-white justify-self-start ${opened ? "!px-3" : ""}`}
                >
                    <FontAwesomeIcon icon={opened ? faXmark : faBars} />
                    {!opened && <span>{lang("menu")}</span>}
                </button>

                <LogoTag>
                    <Link
                        href={route("Home.index")}
                        aria-label="Página inicial"
                        className="flex items-center"
                    >
                        <img
                            src="/site/img/logo.png"
                            alt={lang("marca")}
                            data-header-logo={opened ? undefined : ""}
                            onLoad={() => ScrollTrigger.refresh()}
                            className="block w-80"
                        />
                    </Link>
                </LogoTag>

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
                    {lang("whatsapp")}
                </a>
            </div>
        </div>
    );

    return (
        <>
            <header
                ref={headerRef}
                data-header
                className={`header fixed inset-x-0 top-0 z-50 text-white transition-colors duration-500 ${
                    scrolled ? "bg-black/20" : ""
                }`}
            >
                {bar(false)}
            </header>

            <dialog
                id="header-menu"
                ref={dialogRef}
                aria-label={lang("menuPrincipal")}
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
                        aria-label={lang("navegacaoPrincipal")}
                        className="container pb-16 pt-4 md:pt-6"
                    >
                        <ul className="flex flex-col items-center gap-[calc(1.25rem_-_0.15em)] text-center text-3xl md:gap-[calc(1.5rem_-_0.15em)] md:text-4xl 2xl:gap-[calc(2rem_-_0.15em)] 2xl:text-5xl">
                            {items.map(({ label, href, current }) => (
                                <li
                                    key={label}
                                    className="overflow-hidden font-primary font-normal leading-[1.4] section-content"
                                >
                                    {href ? (
                                        <Link
                                            href={href}
                                            aria-current={current ? "page" : undefined}
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
