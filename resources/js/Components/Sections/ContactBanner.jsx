import { useLang } from "@/hooks/useLang";
import { Title } from "../UI/Title";

export const ContactBanner = ({ content, data }) => {
    const lang = useLang();
    const telefone = data.telefone;
    const whatsapp = data.whatsapp;
    const email = data.email;

    const contacts = [
        {
            label: lang("telefone"),
            valor: telefone,
            href: `tel:${telefone.replace(/\D/g, "")}`,
        },
        {
            label: lang("whatsapp"),
            valor: whatsapp,
            href: `https://wa.me/${whatsapp.replace(/\D/g, "")}`,
            external: true,
        },
        {
            label: lang("email"),
            valor: email,
            href: `mailto:${email}`,
        },
    ];

    return (
        <section className="relative z-40 overflow-hidden pt-20 md:pt-10">
            <div className="container max-w-medium">
                <div className="grid grid-cols-1 items-center gap-8 py-10 md:grid-cols-[3fr_1fr] md:gap-10 md:py-20 2xl:py-28">
                    <Title
                        tag="h2"
                        variant="h2"
                        html={content.titulo}
                        data-split
                        data-drift="0"
                        className="md:max-w-[700px] 2xl:max-w-[898px]"
                    />

                    <div className="w-full">
                        {contacts.filter(({ valor }) => valor?.trim()).map(({ label, valor, href, external }, index) => (
                            <div
                                key={label}
                                data-fade
                                data-delay={0.3 + index * 0.15}
                                className="grid grid-cols-[100px_1fr] items-center gap-4 border-b border-white/20 py-3 last:pb-0 first:pt-0 last:border-b-0"
                            >
                                <Title tag="h5" variant="h5">
                                    {label}
                                </Title>

                                <a
                                    href={href}
                                    target={external ? "_blank" : undefined}
                                    rel={
                                        external
                                            ? "noopener noreferrer"
                                            : undefined
                                    }
                                    className="break-words text-sm text-white transition-opacity hover:opacity-70 md:text-base 2xl:text-lg text-end"
                                >
                                    {valor || "-"}
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="relative aspect-[16/9] w-full overflow-hidden md:aspect-[4/1]">
                <img
                    src={content.imagem}
                    alt=""
                    data-parallax="10"
                    className="absolute -top-[15%] h-[130%] w-full object-cover object-bottom"
                />
            </div>
        </section>
    );
};
