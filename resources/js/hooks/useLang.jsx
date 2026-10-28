import { usePage } from "@inertiajs/react";

const translations = {
    pt: {
        home: "Home",
        sobre: "Sobre",

        503: "Desculpe, estamos em manutenção. Volte em breve.",
        500: "Ops, algo deu errado em nossos servidores.",
        404: (url) =>
            `Desculpe, a página que você está procurando "<strong>${url}</strong>" não foi encontrada.`,
        403: (url) =>
            `Você não tem permissão para acessar esta página: <strong>${url}</strong>.`,
        back: "Voltar",
    },
    en: {
        home: "Home",
        sobre: "About",

        503: "Sorry, we are doing some maintenance. Please check back soon.",
        500: "Oops, something went wrong on our servers.",
        404: (url) =>
            `Sorry, the page you are looking for "<strong>${url}</strong>" could not be found.`,
        403: (url) =>
            `Sorry, you are forbidden from accessing this page: <strong>${url}</strong>.`,
        back: "Back",
    },
};

export function useLang() {
    const { language, idioma } = usePage().props;

    return (key, value = null) => {
        const translation = translations[language ?? idioma]?.[String(key)];

        if (typeof translation === "function") {
            return translation(value);
        }

        return translation || key;
    };
}