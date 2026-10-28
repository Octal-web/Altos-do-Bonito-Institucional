import { usePage } from "@inertiajs/react";

import { faHome } from "@fortawesome/free-solid-svg-icons";

import { BlockContent } from "@/Components/Manager/BlockContent";
import { Breadcrumb } from "@/Components/Manager/Breadcrumb";
import { FormContent } from "@/Components/Manager/FormContent";
import { PageSettings } from "@/Components/Manager/PageSettings";
import AdminLayout from "@/Layouts/AdminLayout";
import { GeneralData } from "@/Components/Manager/GeneralData";

const Page = () => {
    // Content
    const { pagina, conteudos, idioma, idiomas, slides } = usePage().props;

    const breadcrumbItems = [
        // { label: 'Home', link: 'Home.index' },
        // { label: 'Projects', link: 'Home.index' },
    ];

    const contentSlides = {
        nome: ["Slides", "slide"],
        controller: "Slides",
        imagens: false,
        imgClass: "",
        editavel: true,
        conteudos: slides,
        addParametros: ["imagem", "video"],
    };

    return (
        <AdminLayout>
            <Breadcrumb
                icon={faHome}
                items={breadcrumbItems}
                current="Home"
                idioma={idioma.codigo}
                idiomas={idiomas}
            />
            <PageSettings page={pagina} idioma={idioma.codigo} />

            <GeneralData />

            <BlockContent content={contentSlides} />

            <div className="grid grid-cols-1 gap-x-6 md:grid-cols-2">
                <FormContent
                    content={conteudos[0]}
                    full={true}
                    idioma={idioma.codigo}
                />
                <FormContent
                    content={conteudos[1]}
                    full={true}
                    idioma={idioma.codigo}
                />
            </div>

            <FormContent
                content={conteudos[4]}
                full={true}
                idioma={idioma.codigo}
            />

            <FormContent
                content={conteudos[5]}
                full={true}
                idioma={idioma.codigo}
            />

            <FormContent
                content={conteudos[2]}
                full={true}
                idioma={idioma.codigo}
            />

            <div className="grid grid-cols-1 gap-x-6 md:grid-cols-3">
                <FormContent
                    content={conteudos[3]}
                    full={true}
                    idioma={idioma.codigo}
                />
                <FormContent
                    content={conteudos[13]}
                    full={true}
                    idioma={idioma.codigo}
                />
                <FormContent
                    content={conteudos[14]}
                    full={true}
                    idioma={idioma.codigo}
                />
            </div>

            <FormContent
                content={conteudos[6]}
                full={true}
                idioma={idioma.codigo}
            />

            <div className="grid grid-cols-1 gap-x-6 md:grid-cols-3">
                <FormContent
                    content={conteudos[10]}
                    full={true}
                    idioma={idioma.codigo}
                />
                <FormContent
                    content={conteudos[9]}
                    full={true}
                    idioma={idioma.codigo}
                />
                <FormContent
                    content={conteudos[8]}
                    full={true}
                    idioma={idioma.codigo}
                />
            </div>

            <FormContent
                content={conteudos[15]}
                full={true}
                idioma={idioma.codigo}
            />

            <div className="grid grid-cols-1 gap-x-6 md:grid-cols-2">
                <FormContent
                    content={conteudos[12]}
                    full={true}
                    idioma={idioma.codigo}
                />
                <FormContent
                    content={conteudos[11]}
                    full={true}
                    idioma={idioma.codigo}
                />
            </div>
        </AdminLayout>
    );
};

export default Page;
