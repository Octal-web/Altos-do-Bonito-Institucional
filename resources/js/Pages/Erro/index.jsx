import { useLang } from "@/hooks/useLang";
import { Head } from "@inertiajs/react";
import { LinkButton } from "@/Components/UI/LinkButton";
import { SectionBackground } from "@/Components/UI/SectionBackground";

const Page = ({ status }) => {
    const lang = useLang();
    const pathname =
        typeof window !== "undefined" ? window.location.pathname : "";

    const handleRedirect = () => {
        const isManager = pathname.startsWith("/manager");

        if (isManager) return "Manager.Home.index";

        return "Home.index";
    };

    return (
        <>
            <Head title={`${status} | ${lang("marca")}`}>
                <link rel="icon" href="/favicon.ico" type="image/x-icon" />
            </Head>

            <main className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-black px-6 py-12 md:py-16">
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
                        src={`/site/img/logo.png`}
                        alt={lang("marca")}
                        className="mx-auto mb-8 block w-40 max-w-full md:mb-10 md:w-52"
                    />
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black blur-3xl md:h-72 w-[50vw]"
                    />
                    <h1 className="font-primary text-[120px] font-normal leading-none text-primary sm:text-[180px] md:text-[240px]">
                        {status}
                    </h1>

                    <p
                        className="mx-auto mb-8 mt-6 max-w-xl break-words font-admin text-sm font-light leading-relaxed text-white/60 md:mb-10 md:text-base"
                        dangerouslySetInnerHTML={{
                            __html: lang(status, pathname),
                        }}
                    />

                    <LinkButton
                        href={route(handleRedirect())}
                        className="mx-auto text-white"
                    >
                        {lang("back")}
                    </LinkButton>
                </div>
            </main>
        </>
    );
};

export default Page;
