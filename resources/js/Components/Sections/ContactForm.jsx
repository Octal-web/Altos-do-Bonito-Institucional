import { useForm } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";

import { InputMask } from "@react-input/mask";
import Select, { components } from "react-select";

import { Text } from "../UI/Text";
import { Title } from "../UI/Title";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const assuntos = [
    "Informações gerais",
    "Vinhos",
    "Visitas e experiências",
    "Comercial",
    "Outros",
].map((assunto) => ({ value: assunto, label: assunto }));

const ContactMenuList = (props) => (
    <components.MenuList
        {...props}
        innerProps={{ ...props.innerProps, "data-lenis-prevent": true }}
    />
);

const selectComponents = { MenuList: ContactMenuList };

const selectClassNames = {
    control: ({ isFocused, isDisabled }) =>
        `rounded-lg border bg-[#302c24] px-5 py-3.5 transition-colors md:py-4 ${isFocused ? "border-primary ring-1 ring-primary" : "border-white/5"} ${isDisabled ? "opacity-60" : ""}`,
    placeholder: () => "text-white/75",
    singleValue: () => "text-white",
    dropdownIndicator: () => "ml-3 text-white/75",
    menu: () => "mt-2 overflow-hidden rounded-lg border border-white/10 bg-[#302c24] shadow-xl",
    menuList: () => "py-1",
    option: ({ isFocused, isSelected }) =>
        `cursor-pointer px-5 py-3 ${isSelected ? "bg-primary text-black" : isFocused ? "bg-white/10 text-white" : "text-white/75"}`,
};

export const ContactForm = () => {
    const sectionRef = useRef(null);
    const formWrapperRef = useRef(null);

    const [phoneMask, setPhoneMask] = useState("(__) ____-____");

    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [successVisible, setSuccessVisible] = useState(false);

    const {
        data,
        setData,
        post,
        processing,
        errors,
        clearErrors,
        reset,
        recentlySuccessful,
    } = useForm({
        nome: "",
        telefone: "",
        email: "",
        politica: false,
        assunto: "",
        mensagem: "",

        pacote: "",
        origem: "",
        campanha: "",
        grupo: "",
        anuncio: "",
        entrada: "",
        posicao_formulario: "Rodapé",
    });

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const now = new Date();
        now.setHours(now.getHours() - 3);
        const entrada = now.toISOString().slice(0, 19).replace("T", " ");

        setData((currentData) => ({
            ...currentData,
            pacote: params.get("pacote") || "",
            origem: params.get("origin") || params.get("utm_source") || "",
            campanha:
                params.get("campaign") || params.get("utm_campaign") || "",
            grupo:
                params.get("group") ||
                params.get("utm_group") ||
                params.get("utm_medium") ||
                "",
            anuncio: params.get("ad") || params.get("utm_content") || "",
            entrada,
        }));
    }, []);

    useEffect(() => {
        const numbers = data.telefone.replace(/\D/g, "");
        setPhoneMask(
            numbers.length >= 10 ? "(__) _____-____" : "(__) ____-____",
        );
    }, [data.telefone]);

    useEffect(() => {
        const context = gsap.context(() => {
            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 72%",
                    once: true,
                },
            });

            timeline.fromTo(
                formWrapperRef.current,
                { x: 35, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
                "-=0.55",
            );
        }, sectionRef);

        ScrollTrigger.refresh();

        return () => context.revert();
    }, []);

    useEffect(() => {
        let hideTimeout;

        if (recentlySuccessful) {
            setShowSuccessMessage(true);
            requestAnimationFrame(() => setSuccessVisible(true));
        } else {
            setSuccessVisible(false);
            hideTimeout = setTimeout(() => setShowSuccessMessage(false), 300);
        }

        return () => clearTimeout(hideTimeout);
    }, [recentlySuccessful]);

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setData(name, type === "checkbox" ? checked : value);
        clearErrors(name);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        post(route("Contato.enviar"), {
            preserveScroll: true,
            onSuccess: () => {
                reset(
                    "nome",
                    "telefone",
                    "email",
                    "mensagem",
                    "politica",
                    "assunto",
                );
            },
        });
    };

    const inputClassName =
        "block w-full rounded-lg border border-white/5 bg-[#302c24] px-5 py-3.5 font-admin text-sm font-light text-white placeholder:text-white/75 transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-60 md:py-4 2xl:text-base";

    const fieldProps = (name) => ({
        id: name,
        name,
        value: data[name],
        onChange: handleChange,
        "aria-required": true,
        "aria-invalid": Boolean(errors[name]),
        "aria-describedby": errors[name] ? `${name}-error` : undefined,
        className: inputClassName,
    });

    const ErrorMessage = ({ field }) =>
        errors[field] ? (
            <p
                id={`${field}-error`}
                role="alert"
                className="mt-2 font-admin text-xs text-red-300"
            >
                {errors[field]}
            </p>
        ) : null;

    return (
        <section
            ref={sectionRef}
            id="orcamento"
            aria-labelledby="contact-form-title"
            className="min-w-0"
        >
            <div ref={formWrapperRef}>
                <Title tag="p" variant="subtitle" className="mb-3">
                    Formulário
                </Title>
                <Title
                    tag="h2"
                    variant="h3"
                    id="contact-form-title"
                    className="mb-7 md:mb-9"
                >
                    Fale com a gente
                </Title>

                <form
                    onSubmit={handleSubmit}
                    noValidate
                    className="section-content"
                    aria-label="Formulário de contato"
                    aria-busy={processing}
                >
                    <div className="space-y-2.5">
                        <div>
                            <label htmlFor="nome" className="sr-only">
                                Nome
                            </label>
                            <input
                                {...fieldProps("nome")}
                                type="text"
                                placeholder="Nome"
                                autoComplete="name"
                                maxLength={255}
                            />
                            <ErrorMessage field="nome" />
                        </div>
                        <div>
                            <label htmlFor="email" className="sr-only">
                                E-mail
                            </label>
                            <input
                                {...fieldProps("email")}
                                type="email"
                                placeholder="E-mail"
                                autoComplete="email"
                                maxLength={255}
                            />
                            <ErrorMessage field="email" />
                        </div>
                        <div>
                            <label htmlFor="telefone" className="sr-only">
                                Telefone
                            </label>
                            <InputMask
                                {...fieldProps("telefone")}
                                type="tel"
                                mask={phoneMask}
                                replacement={{ _: /\d/ }}
                                placeholder="Telefone"
                                autoComplete="tel"
                            />
                            <ErrorMessage field="telefone" />
                        </div>
                        <div>
                            <label htmlFor="assunto" className="sr-only">
                                Assunto
                            </label>
                            <Select
                                inputId="assunto"
                                instanceId="contato-assunto"
                                name="assunto"
                                options={assuntos}
                                components={selectComponents}
                                value={assuntos.find((option) => option.value === data.assunto) || null}
                                onChange={(selected) => {
                                    setData("assunto", selected?.value || "");
                                    clearErrors("assunto");
                                }}
                                isDisabled={processing}
                                isSearchable={false}
                                placeholder="Assunto"
                                aria-required="true"
                                aria-invalid={Boolean(errors.assunto)}
                                aria-describedby={errors.assunto ? "assunto-error" : undefined}
                                unstyled
                                className="font-admin text-sm font-light 2xl:text-base"
                                classNamePrefix="contact-select"
                                classNames={selectClassNames}
                            />
                            <ErrorMessage field="assunto" />
                        </div>
                        <div>
                            <label htmlFor="mensagem" className="sr-only">
                                Mensagem
                            </label>
                            <textarea
                                {...fieldProps("mensagem")}
                                placeholder="Mensagem"
                                rows={5}
                                maxLength={1200}
                                className={`${inputClassName} min-h-[144px] resize-y`}
                            />
                            <ErrorMessage field="mensagem" />
                        </div>
                    </div>

                    <div className="mt-5">
                        <div className="flex items-start gap-2.5 font-admin text-xs font-light leading-5 text-white/50">
                            <input
                                id="politica"
                                name="politica"
                                type="checkbox"
                                checked={data.politica}
                                onChange={handleChange}
                                aria-required="true"
                                aria-invalid={Boolean(errors.politica)}
                                aria-describedby={
                                    errors.politica
                                        ? "politica-error"
                                        : undefined
                                }
                                className="mt-0.5 size-4 shrink-0 cursor-pointer rounded border-white/25 bg-white/20 text-primary focus:ring-primary focus:ring-offset-black"
                            />
                            <span>
                                <label
                                    htmlFor="politica"
                                    className="cursor-pointer"
                                >
                                    Aceito a{" "}
                                </label>
                                <a
                                    href={route("Politicas.privacidade")}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline-offset-4 transition-colors hover:text-primary hover:underline focus-visible:outline-primary"
                                >
                                    política de privacidade
                                </a>{" "}
                                (LGPD)
                            </span>
                        </div>
                        <ErrorMessage field="politica" />
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="button-primary mt-7 min-h-12 w-fit text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary disabled:cursor-wait disabled:opacity-60 md:mt-8"
                    >
                        <span
                            aria-hidden="true"
                            className="h-px w-9 bg-current"
                        />
                        {processing ? "Enviando..." : "Enviar mensagem"}
                    </button>

                    {showSuccessMessage && (
                        <Text
                            role="status"
                            aria-live="polite"
                            variant="p"
                            className={`mt-5 rounded-lg border border-primary/30 p-4 transition-opacity duration-300 ${successVisible ? "opacity-100" : "opacity-0"}`}
                        >
                            Seus dados foram enviados com sucesso. Nossa equipe
                            entrará em contato.
                        </Text>
                    )}
                </form>
            </div>
        </section>
    );
};
