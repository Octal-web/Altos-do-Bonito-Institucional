import { usePage } from "@inertiajs/react";

import { BrandSignature } from "@/Components/Sections/BrandSignature";
import { ProductsBanner } from "@/Components/Sections/ProductsBanner";
import { ProductsCatalog } from "@/Components/Sections/ProductsCatalog";
import { ScrollReveal } from "@/Components/UI/ScrollReveal";
import DefaultLayout from "@/Layouts/DefaultLayout";

const Page = () => {
    const { conteudos, categoria, categoriasMenu } = usePage().props;
    return (
        <DefaultLayout>
            <ScrollReveal>
                <ProductsBanner content={conteudos[1]} />
            </ScrollReveal>
            <ProductsCatalog
                categoria={categoria}
                categoriasMenu={categoriasMenu}
            />
            {/* <ProductsKnowledge content={conteudos[2]}/> */}
            <ScrollReveal>
                <BrandSignature content={conteudos[0]}/>
            </ScrollReveal>
        </DefaultLayout>
    );
};

export default Page;
