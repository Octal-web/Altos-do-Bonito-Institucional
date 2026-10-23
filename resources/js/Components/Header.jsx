import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "@inertiajs/react";
import { useEffect, useRef } from "react";

export const Header = ({
    isOpen,
    onToggle,
    onClose,
    whatsappHref,
    links = {},
}) => {
    const dialogRef = useRef(null);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!isOpen) {
            if (dialog.open) dialog.close();
            return;
        }

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        dialog.showModal();

        return () => {
            document.body.style.overflow = previousOverflow;
            if (dialog.open) dialog.close();
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
                    <FontAwesomeIcon icon={open ? faXmark : faBars} />
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
            <header className="header absolute inset-x-0 top-0 z-[99] text-white">
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
                className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-y-auto border-0 bg-[#4b4b49] p-0 text-white backdrop:bg-[#4b4b49]"
                data-lenis-prevent
            >
                {bar(true)}
                <nav
                    aria-label="Navegação principal"
                    className="container pb-16 pt-4 md:pt-6"
                >
                    <ul className="flex flex-col items-center gap-5 text-center md:gap-6 2xl:gap-8">
                        {items.map(({ label, href }) => (
                            <li
                                key={label}
                                className="font-primary text-3xl font-normal leading-tight md:text-4xl 2xl:text-5xl"
                            >
                                {href ? (
                                    <Link
                                        href={href}
                                        onClick={onClose}
                                        className="transition-colors hover:text-primary focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-primary"
                                    >
                                        {label}
                                    </Link>
                                ) : (
                                    <span aria-disabled="true">{label}</span>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>
            </dialog>
        </>
    );
};
