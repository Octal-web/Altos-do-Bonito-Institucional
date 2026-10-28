import { useLang } from "@/hooks/useLang";
import { useId } from "react";
import { useForm } from "@inertiajs/react";
import { Title } from "../UI/Title";

export const HomeNewsletter = ({ content }) => {
    const lang = useLang();
    const emailId = useId();
    const {
        data,
        setData,
        post,
        processing,
        errors,
        recentlySuccessful,
        reset,
    } = useForm({ email: "" });

    const handleSubmit = (event) => {
        event.preventDefault();

        post(route("Newsletter.enviar"), {
            preserveScroll: true,
            onSuccess: () => reset("email"),
        });
    };

    return (
        <div className="text-center text-white max-w-[760px] mx-auto">
            <Title tag="p" variant="subtitle">
                {content.subtitulo}
            </Title>
            <Title tag="h2" variant="h3" className="mt-2 2xl:mt-6">
                {content.titulo}
            </Title>

            <form
                aria-busy={processing}
                onSubmit={handleSubmit}
                className="mx-auto mt-8 max-w-[720px] md:mt-10"
            >
                <div className="flex flex-col gap-3 sm:flex-row">
                    <label htmlFor={emailId} className="sr-only">
                        {lang("seuEmail")}
                    </label>
                    <input
                        id={emailId}
                        type="email"
                        name="email"
                        autoComplete="email"
                        placeholder={lang("emailExemplo")}
                        required
                        value={data.email}
                        onChange={(event) =>
                            setData("email", event.target.value)
                        }
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={
                            errors.email ? `${emailId}-error` : undefined
                        }
                        className="min-w-0 flex-1 rounded-full border border-secondary bg-[#473E33] px-6 py-3 font-admin text-sm text-white placeholder:text-white/40 focus:border-primary focus:ring-primary md:px-8 md:py-4"
                    />
                    <button
                        type="submit"
                        disabled={processing}
                        className="rounded-full bg-primary px-8 py-3 font-admin text-sm text-white transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary disabled:cursor-wait disabled:opacity-60 md:px-10 md:py-4 w-fit max-sm:mx-auto"
                    >
                        {processing ? lang("enviandoNewsletter") : lang("queroReceber")}
                    </button>
                </div>
                {errors.email && (
                    <p
                        id={`${emailId}-error`}
                        role="alert"
                        className="mt-3 text-sm text-red-300"
                    >
                        {errors.email}
                    </p>
                )}
                {recentlySuccessful && (
                    <p role="status" className="mt-3 text-sm text-primary">
                        {lang("newsletterSucesso")}
                    </p>
                )}
            </form>
        </div>
    );
};
