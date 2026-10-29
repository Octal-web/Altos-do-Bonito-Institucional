import { useEffect, useId, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FormGroup } from "./Inputs/FormGroup";

const sections = [
    {
        id: "geral",
        title: "Informações gerais",
        description: "Nome, descrição, categoria e link da loja.",
    },
    {
        id: "imagens",
        title: "Imagens do produto",
        description: "Imagem principal e imagem de destaque.",
    },
    {
        id: "historia",
        title: "História",
        description: "Textos e imagem que contam a história do produto.",
    },
    {
        id: "origem",
        title: "Origem",
        description: "Informações sobre a origem e sua imagem.",
    },
    {
        id: "processo",
        title: "Processo e ficha técnica",
        description: "Detalhes de produção e características do produto.",
    },
    {
        id: "pagina",
        title: "Dados da página",
        description: "Título e descrição usados nos mecanismos de busca.",
    },
];

const sectionFor = (name) => {
    if (name.startsWith("historia_") || name === "img_primaria")
        return "historia";
    if (name.startsWith("origem_") || name === "img_secundaria")
        return "origem";
    if (
        name.startsWith("processo_") ||
        ["ficha_tecnica", "img_terciaria"].includes(name)
    )
        return "processo";
    if (["titulo_pagina", "descricao_pagina"].includes(name)) return "pagina";
    if (["img", "img_destaque"].includes(name)) return "imagens";
    return "geral";
};

export const ProductFormSections = ({
    inputItems,
    data,
    errors,
    idioma,
    onChange,
    handleImageCrop,
}) => {
    const id = useId();
    const [openSections, setOpenSections] = useState(["geral"]);
    const buttonsRef = useRef({});

    useEffect(() => {
        const fields = Object.keys(errors);
        if (!fields.length) return;

        const invalidSections = [...new Set(fields.map(sectionFor))];
        setOpenSections((current) => [
            ...new Set([...current, ...invalidSections]),
        ]);
        const firstInvalid = sections.find((section) =>
            invalidSections.includes(section.id),
        );
        const button = buttonsRef.current[firstInvalid?.id];
        button?.focus({ preventScroll: true });
        button?.scrollIntoView({ block: "nearest" });
    }, [errors]);

    return (
        <div className="my-3 space-y-2">
            <p className="mb-10 text-sm text-slate-500">
                Preencha os dados por seção. Ao finalizar, clique em Salvar para
                gravar todas as alterações.
            </p>
            {sections.map((section) => {
                const groups = inputItems
                    .map((group) =>
                        group.filter(
                            (input) => sectionFor(input.name) === section.id,
                        ),
                    )
                    .filter((group) => group.length);
                if (!groups.length) return null;

                const errorCount = groups
                    .flat()
                    .filter((input) => errors[input.name]).length;
                const isOpen = openSections.includes(section.id);
                const panelId = `${id}-${section.id}`;

                return (
                    <div
                        key={section.id}
                        className={`rounded-lg border ${errorCount ? "border-red-300" : "border-stroke"} bg-white`}
                    >
                        <h2>
                            <button
                                ref={(element) => {
                                    buttonsRef.current[section.id] = element;
                                }}
                                id={`${panelId}-title`}
                                type="button"
                                aria-expanded={isOpen}
                                aria-controls={panelId}
                                onClick={() =>
                                    setOpenSections((current) =>
                                        isOpen
                                            ? current.filter(
                                                  (item) => item !== section.id,
                                              )
                                            : [...current, section.id],
                                    )
                                }
                                className="flex w-full items-center justify-between gap-4 rounded-lg bg-slate-50 px-4 py-4 text-left transition-colors hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500 sm:px-5"
                            >
                                <span>
                                    <span className="block text-base font-semibold text-slate-700">
                                        {section.title}
                                    </span>
                                    <span className="mt-1 block text-sm font-normal text-slate-500">
                                        {section.description}
                                    </span>
                                </span>
                                <span className="flex shrink-0 items-center gap-3">
                                    {errorCount > 0 && (
                                        <span className="rounded-full bg-red-100 px-2.5 py-1 text-xs font-medium text-red-700">
                                            {errorCount}{" "}
                                            {errorCount === 1
                                                ? "erro"
                                                : "erros"}
                                        </span>
                                    )}
                                    <FontAwesomeIcon
                                        icon={faChevronDown}
                                        className={`text-sm text-slate-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
                                    />
                                </span>
                            </button>
                        </h2>
                        {/* Keep editors and uploads mounted when a section is collapsed. */}
                        <div
                            id={panelId}
                            role="region"
                            aria-labelledby={`${panelId}-title`}
                            hidden={!isOpen}
                            className="px-4 pt-6 sm:px-5"
                        >
                            {groups.map((group) => (
                                <div
                                    key={group
                                        .map((input) => input.name)
                                        .join("-")}
                                    className="grid grid-cols-12 gap-x-6"
                                >
                                    {group.map((input) => (
                                        <div
                                            key={input.name}
                                            className={`w-full ${input.tamanho}`}
                                        >
                                            <FormGroup
                                                idioma={idioma}
                                                input={input}
                                                value={data[input.name]}
                                                onChange={onChange}
                                                handleImageCrop={
                                                    handleImageCrop
                                                }
                                            />
                                            {errors[input.name] && (
                                                <p
                                                    role="alert"
                                                    className="-mt-5 mb-3 text-sm text-red-500"
                                                >
                                                    {errors[input.name]}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
