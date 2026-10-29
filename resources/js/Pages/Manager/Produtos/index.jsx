import { usePage } from "@inertiajs/react";

import { faWineBottle } from "@fortawesome/free-solid-svg-icons";

import { Breadcrumb } from "@/Components/Manager/Breadcrumb";
import { FormContent } from "@/Components/Manager/FormContent";
import { PageSettings } from "@/Components/Manager/PageSettings";
import AdminLayout from "@/Layouts/AdminLayout";
import { BlockContent } from "@/Components/Manager/BlockContent";

const Page = () => {
    // Content
    const { pagina, conteudos, idioma, idiomas, produtos, categorias } =
        usePage().props;

    const breadcrumbItems = [
        // { label: 'Home', link: 'Home.index' },
        // { label: 'Projects', link: 'Home.index' },
    ];

    const contentProducts = {
        nome: ["Produtos", "produto"],
        controller: "Produtos",
        imagens: true,
        imgClass: "h-52",
        editavel: true,
        conteudos: produtos,
    };

    const contentCategories = {
        nome: ["Categorias", "categoria"],
        controller: "Categorias",
        imagens: false,
        imgClass: "",
        editavel: true,
        conteudos: categorias,
    };

    return (
        <AdminLayout>
            <Breadcrumb
                icon={faWineBottle}
                items={breadcrumbItems}
                current="Produtos"
                idioma={idioma.codigo}
                idiomas={idiomas}
            />
            <PageSettings page={pagina} idioma={idioma.codigo} />

            <FormContent
                content={conteudos[1]}
                full={true}
                idioma={idioma.codigo}
            />

             <BlockContent content={contentCategories} />

              <BlockContent content={contentProducts} />

            <FormContent
                content={conteudos[2]}
                full={true}
                idioma={idioma.codigo}
            />

            <FormContent
                content={conteudos[0]}
                full={true}
                idioma={idioma.codigo}
            />
        </AdminLayout>
    );
};

export default Page;
