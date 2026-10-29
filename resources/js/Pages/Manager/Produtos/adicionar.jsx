import { Link, useForm, usePage } from "@inertiajs/react";
import { useEffect } from "react";

import {
    faArrowLeft,
    faImage,
    faSave,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Breadcrumb } from "@/Components/Manager/Breadcrumb";
import AdminLayout from "@/Layouts/AdminLayout";
import { FormGroup } from "@/Components/Manager/Inputs/FormGroup";

const Page = () => {
    const { idioma, idiomas, categorias } = usePage().props;

    console.log(categorias);

    const { data, setData, post, processing, errors } = useForm();

    const breadcrumbItems = [
        { label: "Produtos", link: "Manager.Produtos.index" },
    ];

    const inputItems = [
        [
            {
                titulo: "Subtítulo do produto",
                name: "subtitulo",
                tamanho: "col-span-12 lg:col-span-4",
                tipo: "texto",
                max: 100,
            },
            {
                titulo: "Link da loja",
                name: "link_loja",
                tamanho: "col-span-12 lg:col-span-2",
                tipo: "texto",
                max: 2048,
            },
            {
                titulo: "Categoria",
                name: "categoria_id",
                tamanho: "col-span-12 lg:col-span-2",
                tipo: "select",
                options: categorias,
            },
        ],
        [
            {
                titulo: "Nome do produto",
                name: "nome",
                editor: true,
                tamanho: "col-span-12 lg:col-span-8",
                tipo: "texto",
                max: 200,
            },
        ],
        [
            {
                titulo: "Descrição do produto",
                name: "descricao",
                tamanho: "col-span-12 lg:col-span-8",
                tipo: "texto_longo",
            },
        ],
        [
            {
                titulo: "Conteúdos da páginas",
                name: "conteudos",
                tamanho: "col-span-12 lg:col-span-8",
                tipo: "texto_longo",
                editor: true,
                toolbar: ['Table', 'Heading', 'Image', 'Bold', 'Italic']
            },
        ],
        [
            {
                titulo: "Imagem do produto",
                name: "img",
                tamanho: "col-span-12 md:col-span-4",
                tipo: "imagem",
                crop: true,
                largura: 390,
                altura: 540,
            },
            {
                titulo: "Imagem alternativa do produto",
                name: "img_alternativa",
                tamanho: "col-span-12 md:col-span-4",
                tipo: "imagem",
                crop: true,
                largura: 390,
                altura: 540,
            },
            {
                titulo: "Imagem de destaque",
                name: "img_destaque",
                tamanho: "col-span-12 md:col-span-8",
                tipo: "imagem",
                crop: true,
                largura: 520,
                altura: 490,
            },
        ],
        [
            {
                titulo: "Título da página",
                name: "titulo_pagina",
                tamanho: "col-span-12 lg:col-span-8",
                tipo: "texto",
                max: 255,
            },
        ],
        [
            {
                titulo: "Descrição da página",
                name: "descricao_pagina",
                tamanho: "col-span-12 lg:col-span-8",
                tipo: "texto_longo",
                max: 500,
            },
        ],
    ];

    const initializeData = (inputItems) => {
        let initialData = {};

        inputItems.forEach((group) => {
            group.forEach((item) => {
                initialData[item.name] = item.tipo === "check" ? false : "";
            });
        });

        return initialData;
    };

    useEffect(() => {
        const initialData = initializeData(inputItems);
        setData(initialData);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("Manager.Produtos.novo"), {
            preserveScroll: true,
        });
    };

    const onChange = (name, value) => {
        setData(name, value);
    };

    const handleImageCrop = async (croppedImage, fileExtension, name) => {
        setData((prevData) => ({
            ...prevData,
            [name]: croppedImage,
        }));
    };

    return (
        <AdminLayout>
            <Breadcrumb
                icon={faImage}
                items={breadcrumbItems}
                current="Adicionar"
                idioma={idioma.codigo}
                idiomas={idiomas}
            />

            <div className="mb-6 rounded-sm border border-stroke bg-white px-5 py-5 shadow-md">
                <div className="mt-10">
                    <form onSubmit={handleSubmit}>
                        {inputItems.map((group, groupIndex) => (
                            <div
                                key={groupIndex}
                                className="grid grid-cols-12 gap-x-6"
                            >
                                {group.map((input, index) => (
                                    <div
                                        key={index}
                                        className={`w-full ${input.tamanho}`}
                                    >
                                        <FormGroup
                                            idioma={idioma}
                                            input={input}
                                            value={data[input.name]}
                                            onChange={onChange}
                                            handleImageCrop={handleImageCrop}
                                        />
                                        {errors[input.name] && (
                                            <p className="text-sm text-red-500 -mt-5 mb-3">
                                                {errors[input.name]}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ))}

                        <div className="flex items-center justify-end">
                            <Link
                                href={route("Manager.Produtos.index")}
                                className="flex items-center w-fit rounded-lg border border-red-700 text-red-700 px-3 py-2 mr-3 cursor-pointer transition-all hover:bg-red-100"
                            >
                                <FontAwesomeIcon
                                    icon={faArrowLeft}
                                    className="mr-2"
                                />
                                Voltar
                            </Link>

                            <button
                                type="submit"
                                disabled={processing}
                                className="block relative w-fit rounded-lg border border-gray-300 px-3 py-2 cursor-pointer transition-all hover:bg-slate-200"
                            >
                                <FontAwesomeIcon
                                    icon={faSave}
                                    className="text-slate-700 mr-2"
                                />
                                Salvar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Page;
