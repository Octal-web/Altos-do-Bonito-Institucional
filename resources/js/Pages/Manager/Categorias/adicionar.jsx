import { Link, useForm, usePage } from "@inertiajs/react";
import { useEffect } from "react";

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
    const { idioma, idiomas } = usePage().props;

    const { data, setData, post, processing, errors } = useForm();

    const breadcrumbItems = [
        { label: "Produtos", link: "Manager.Produtos.index" },
        { label: "Categorias", link: "Manager.Produtos.index" },
    ];

    const inputItems = [
        [
            {
                titulo: "Nome",
                name: "nome",
                tamanho: "col-span-12 lg:col-span-6",
                tipo: "texto",
                max: 100,
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

        post(route("Manager.Categorias.novo"), {
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
