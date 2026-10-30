import { Link, useForm, usePage } from "@inertiajs/react";

import {
    faArrowLeft,
    faImage,
    faSave,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Breadcrumb } from "@/Components/Manager/Breadcrumb";
import { FormGroup } from "@/Components/Manager/Inputs/FormGroup";
import AdminLayout from "@/Layouts/AdminLayout";

const Page = () => {
    const { produto, idioma, idiomas, categorias } = usePage().props;

    const { data, setData, post, processing, errors } = useForm(produto);

    const breadcrumbItems = [
        { label: "Produtos", link: "Manager.Produtos.index" },
    ];

    const inputItems = [
        [
            {
                titulo: "Subtítulo",
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
                titulo: "Nome",
                name: "nome",
                editor: true,
                tamanho: "col-span-12 lg:col-span-8",
                tipo: "texto",
                max: 200,
            },
        ],
        [
            {
                titulo: "Descrição",
                name: "descricao",
                tamanho: "col-span-12 lg:col-span-8",
                tipo: "texto_longo",
            },
        ],
        [
            {
                titulo: "Conteúdo",
                name: "conteudos",
                tamanho: "col-span-12",
                tipo: "texto_longo",
                editor: true,
                previewClass: "product-content",
                toolbar: [
                    "Heading",
                    "Bold",
                    "Italic",
                    "Underline",
                    "List",
                    "Link",
                    "Align",
                    "Image",
                    "Table",
                ],
            },
        ],
        [
            {
                titulo: "Imagem",
                name: "img",
                tamanho: "col-span-12 md:col-span-4",
                tipo: "imagem",
                crop: true,
                largura: 390,
                altura: 540,
                imagem: produto.imagem,
            },
            {
                titulo: "Imagem alternativa",
                name: "img_alternativa",
                tamanho: "col-span-12 md:col-span-4",
                tipo: "imagem",
                crop: true,
                largura: 390,
                altura: 540,
                imagem: produto.imagem_alternativa,
            },
            {
                titulo: "Imagem de destaque",
                name: "img_destaque",
                tamanho: "col-span-12 md:col-span-8",
                tipo: "imagem",
                crop: true,
                largura: 520,
                altura: 490,
                imagem: produto.imagem_destaque,
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

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("Manager.Produtos.atualizar", { id: produto.id }), {
            preserveScroll: true,
        });
        console.log(data);

        console.log(errors);
    };

    const onChange = (name, value) => {
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
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
                current="Editar"
                id={produto.id}
                idioma={idioma.codigo}
                idiomas={idiomas}
            />

            <div className="mb-6 rounded-sm border border-stroke bg-white px-5 py-5 shadow-md">
                <Link
                    href={route("Manager.Produtos.Imagens.index", {
                        id: produto.id,
                    })}
                    className="flex items-center border border-stroke bg-white px-3 py-2 float-right rounded-md transition-all hover:bg-slate-100 w-fit ml-auto"
                >
                    <FontAwesomeIcon
                        icon={faImage}
                        className="text-slate-700 mr-2"
                    />
                    Imagens
                </Link>
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
