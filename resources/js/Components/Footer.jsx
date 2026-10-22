import { Link, usePage } from "@inertiajs/react";

const linkClassName =
    "transition-colors hover:text-primary focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-primary";

export const Footer = ({ links = {} }) => {
    const { dadosGerais = {} } = usePage().props;
    const email = dadosGerais.email || "contato@altosdobonito.com.br";
    const address =
        dadosGerais.endereco || "Pinheiro Machado — RS Campanha Gaúcha";
    const whatsapp = dadosGerais.whatsapp || "+55 53 0000-0000";
    const whatsappNumber = String(whatsapp || "").replace(/\D/g, "");

    const privacyHref = route("Politicas.privacidade");

    return (
        <footer className="relative z-10 border-t border-white/10 bg-black font-admin text-xs font-light leading-relaxed text-white/50 md:text-sm">
            <div className="container mx-auto max-w-medium py-12 md:py-20 2xl:py-24">
                <div className="mx-auto grid max-w-[780px] grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-[1.4fr_1fr_1fr] md:gap-16">
                    <div className="col-span-2 md:col-span-1">
                        <h2 className="mb-4 text-xs font-normal text-primary/80 md:text-sm">
                            Contato
                        </h2>
                        <address className="space-y-1.5 not-italic">
                            <a
                                href={`mailto:${email}`}
                                className={`${linkClassName} block break-words`}
                            >
                                {email}
                            </a>
                            <p>{address}</p>
                            {whatsappNumber && (
                                <a
                                    href={`https://wa.me/${whatsappNumber.startsWith("55") ? whatsappNumber : `55${whatsappNumber}`}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`${linkClassName} block`}
                                >
                                    WhatsApp · {whatsapp}
                                </a>
                            )}
                        </address>
                    </div>

                    <FooterNav
                        title="Navegar"
                        items={[
                            {
                                label: "Nossa História",
                                href: route("Institucional.index"),
                            },
                            { label: "Vinhos", href: route("Produtos.index") },
                            { label: "Terroir", href: route("Produtos.index") },
                        ]}
                    />
                    <FooterNav
                        title="Visite"
                        items={[
                            { label: "Experiências", href: links.experiencias },
                            { label: "Hospedagem", href: links.hospedagem },
                            {
                                label: "Política de privacidade",
                                href: privacyHref,
                            },
                        ]}
                    />
                </div>
            </div>

            <div className="border-t border-white/10">
                <div className="container mx-auto flex max-w-medium flex-col items-center justify-between gap-5 py-6 text-center text-[10px] md:flex-row md:gap-8 md:text-left 2xl:text-xs">
                    <span>© {new Date().getFullYear()} Altos do Bonito</span>
                    <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
                        <Link href={privacyHref} className={linkClassName}>
                            Política de Privacidade (LGPD)
                        </Link>
                        <span aria-hidden="true" className="text-white/25">
                            |
                        </span>
                        <span>Beba com moderação</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/35">
                        <span>Desenvolvido por</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

const FooterNav = ({ title, items }) => (
    <nav aria-label={title}>
        <h2 className="mb-4 text-xs font-normal text-primary/80 md:text-sm">
            {title}
        </h2>
        <ul className="space-y-1.5">
            {items.map(({ label, href }) => (
                <li key={label}>
                    {href ? (
                        <Link href={href} className={linkClassName}>
                            {label}
                        </Link>
                    ) : (
                        <span>{label}</span>
                    )}
                </li>
            ))}
        </ul>
    </nav>
);
