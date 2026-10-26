import { usePage } from "@inertiajs/react";

import DefaultLayout from "@/Layouts/DefaultLayout";
import { BrandSignature } from "@/Components/Sections/BrandSignature";
import { ProductsBanner } from "@/Components/Sections/ProductsBanner";
import { ProductsCatalog } from "@/Components/Sections/ProductsCatalog";
import { ProductsFooter } from "@/Components/Sections/ProductsFooter";

const Page = () => {
    const { conteudos, categoria, categoriasMenu } = usePage().props;
    return (
        <DefaultLayout>
            <ProductsBanner content={conteudos[1]} />
            <ProductsCatalog
                categoria={categoria}
                categoriasMenu={categoriasMenu}
            />
            <BrandSignature content={conteudos[0]}/>
        </DefaultLayout>
    );
};

export default Page;
