import { usePage } from "@inertiajs/react";

import { faHome, faInfoCircle } from "@fortawesome/free-solid-svg-icons";

import { BlockContent } from "@/Components/Manager/BlockContent";
import { Breadcrumb } from "@/Components/Manager/Breadcrumb";
import { FormContent } from "@/Components/Manager/FormContent";
import { PageSettings } from "@/Components/Manager/PageSettings";
import AdminLayout from "@/Layouts/AdminLayout";

const Page = () => {
    // Content
    const {
        pagina,
        conteudos,
        idioma,
        idiomas,
        valores,
        profissionais,
        acontecimentos,
    } = usePage().props;

    const breadcrumbItems = [
        // { label: 'Home', link: 'Home.index' },
        // { label: 'Projects', link: 'Home.index' },
    ];

    const contentValues = {
        nome: ["Valores", "valor"],
        controller: "Valores",
        imagens: true,
        imgClass: "h-52",
        editavel: true,
        conteudos: valores,
    };

    const contentProfessionals = {
        nome: ["Profissionais", "profissional"],
        controller: "Profissionais",
        imagens: true,
        imgClass: "h-52",
        editavel: true,
        conteudos: profissionais,
    };

    const contentEvents = {
        nome: ["Acontecimentos", "acontecimento"],
        controller: "Acontecimentos",
        imagens: false,
        imgClass: "",
        editavel: true,
        conteudos: acontecimentos,
    };

    return (
        <AdminLayout>
            <Breadcrumb
                icon={faInfoCircle}
                items={breadcrumbItems}
                current="Institucional"
                idioma={idioma.codigo}
                idiomas={idiomas}
            />
            <PageSettings page={pagina} idioma={idioma.codigo} />

            {/* <GeneralData /> */}

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

            <div className="grid grid-cols-1 gap-x-6 md:grid-cols-2">
                <FormContent
                    content={conteudos[2]}
                    full={true}
                    idioma={idioma.codigo}
                />

                <FormContent
                    content={conteudos[3]}
                    full={true}
                    idioma={idioma.codigo}
                />
            </div>

            <FormContent
                content={conteudos[6]}
                full={true}
                idioma={idioma.codigo}
            />
            <BlockContent content={contentValues} />

            <div className="grid grid-cols-1 gap-x-6 md:grid-cols-2">
                <FormContent
                    content={conteudos[9]}
                    full={true}
                    idioma={idioma.codigo}
                />
                <FormContent
                    content={conteudos[10]}
                    full={true}
                    idioma={idioma.codigo}
                />
            </div>

            <FormContent
                content={conteudos[7]}
                full={true}
                idioma={idioma.codigo}
            />

            <BlockContent content={contentProfessionals} />

            <FormContent
                content={conteudos[8]}
                full={true}
                idioma={idioma.codigo}
            />

            <BlockContent content={contentEvents} />

            <div className="grid grid-cols-1 gap-x-6 md:grid-cols-2">
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
            </div>
        </AdminLayout>
    );
};

export default Page;
