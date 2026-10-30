import { useLang } from "@/hooks/useLang";
import { useEffect, useRef, useState } from "react";
import { SectionBackground } from "./UI/SectionBackground";
import { Text } from "./UI/Text";
import { Title } from "./UI/Title";

export const AGE_CONFIRMATION_KEY = "altos-do-bonito:age-confirmed";

export const hasAgeConfirmation = () => {
    try {
        return document.cookie.split(";").some(
            (cookie) => cookie.trim() === `${encodeURIComponent(AGE_CONFIRMATION_KEY)}=true`,
        );
    } catch {
        return false;
    }
};

const instagramUrl = (value) => {
    if (typeof value !== "string" || !value.trim()) return null;
    const profile = value.trim();

    if (
        /^@?[a-zA-Z0-9._]+$/.test(profile) &&
        !profile.includes("instagram.com")
    ) {
        return `https://www.instagram.com/${profile.replace(/^@/, "")}/`;
    }

    const url = new URL(
        /^https?:\/\//i.test(profile) ? profile : `https://${profile}`,
    );
    if (
        ["instagram.com", "www.instagram.com"].includes(url.hostname) &&
        url.pathname !== "/"
    ) {
        url.protocol = "https:";
        return url.href;
    }

    return null;
};

export const AgeGate = ({ instagram, onConfirm }) => {
    const lang = useLang();
    const [declined, setDeclined] = useState(false);
    const titleRef = useRef(null);
    const instagramHref = instagramUrl(instagram);

    useEffect(() => {
        titleRef.current?.focus({ preventScroll: true });
    }, []);

    const confirm = () => {
        document.cookie = `${encodeURIComponent(AGE_CONFIRMATION_KEY)}=true; Max-Age=31536000; Path=/; SameSite=Lax${window.location.protocol === "https:" ? "; Secure" : ""}`;

        onConfirm();
    };

    return (
        <main
            data-lenis-prevent
            aria-labelledby="age-gate-title"
            aria-describedby="age-gate-description"
            className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-black px-6 py-12 text-white md:py-16"
        >
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10"
            >
                <SectionBackground className="left-0 top-0 h-2/3 w-full opacity-35 md:w-2/3" />
                <SectionBackground
                    direction="right"
                    className="bottom-0 right-0 h-2/3 w-full opacity-50 md:w-2/3 hidden md:block"
                />
            </div>

            <div className="w-full max-w-2xl text-center relative">
                <img
                    src="/site/img/logo.png"
                    alt={lang("marca")}
                    className="mx-auto mb-12 w-40 md:w-52"
                />
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black blur-3xl md:h-72 w-[50vw]"
                />
                <Title tag="p" variant="subtitle" className="mb-5">
                    {lang("bemVindo")}
                </Title>
                <Title
                    ref={titleRef}
                    id="age-gate-title"
                    tabIndex={-1}
                    tag="h1"
                    variant="h3"
                    className="outline-none"
                >
                    {lang("idadePergunta")}
                </Title>
                <Text
                    id="age-gate-description"
                    variant="p"
                    className="mx-auto mt-6 max-w-md"
                >
                    {lang("idadeDescricao")}
                </Text>

                <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
                    <button
                        type="button"
                        onClick={confirm}
                        className="button-primary min-h-12 justify-center text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                    >
                        <span
                            aria-hidden="true"
                            className="h-px w-8 bg-current"
                        />
                        {lang("idadeConfirmar")}
                    </button>
                    <button
                        type="button"
                        onClick={() => setDeclined(true)}
                        className="button-secondary min-h-12 justify-center text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary group"
                    >
                        <div className="h-px w-8 md:w-10 bg-white group-hover:bg-black" />
                        {lang("idadeRecusar")}
                    </button>
                </div>

                {declined && (
                    <p
                        role="status"
                        className="mx-auto mt-6 max-w-md font-admin text-sm leading-relaxed text-primary"
                    >
                        {lang("idadeRestrita")}
                    </p>
                )}

                {instagramHref && (
                    <a
                        href={instagramHref}
                        className="mt-8 inline-block font-admin text-sm text-primary underline underline-offset-4 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                    >
                        {lang("visitarInstagram")}
                    </a>
                )}
                <p className="mt-10 font-admin text-xs font-light text-white/40">
                    {lang("aprecieModeracao")}
                </p>
            </div>
        </main>
    );
};
