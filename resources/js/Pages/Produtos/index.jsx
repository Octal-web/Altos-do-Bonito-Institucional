import { usePage } from "@inertiajs/react";

import DefaultLayout from "@/Layouts/DefaultLayout";
import { BrandSignature } from "@/Components/Sections/BrandSignature";
import { ProductsBanner } from "@/Components/Sections/ProductsBanner";

const Page = () => {
    const { slides, conteudos, imagensGaleria } = usePage().props;
    return (
        <DefaultLayout>
            <ProductsBanner content={conteudos[1]} />
            <BrandSignature content={conteudos[0]} />
        </DefaultLayout>
    );
};

export default Page;
