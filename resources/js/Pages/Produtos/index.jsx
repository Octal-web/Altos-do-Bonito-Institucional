import { usePage } from "@inertiajs/react";

import { BrandSignature } from "@/Components/Sections/BrandSignature";
import { ProductsBanner } from "@/Components/Sections/ProductsBanner";
import { ProductsCatalog } from "@/Components/Sections/ProductsCatalog";
import DefaultLayout from "@/Layouts/DefaultLayout";

const Page = () => {
    const { conteudos, categoria, categoriasMenu } = usePage().props;
    return (
        <DefaultLayout>
            <ProductsBanner content={conteudos[1]} />
            <ProductsCatalog
                categoria={categoria}
                categoriasMenu={categoriasMenu}
            />
            {/* <ProductsKnowledge content={conteudos[2]}/> */}
            <BrandSignature content={conteudos[0]}/>
        </DefaultLayout>
    );
};

export default Page;
