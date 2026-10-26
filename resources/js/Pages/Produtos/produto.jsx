import { usePage } from "@inertiajs/react";

import DefaultLayout from "@/Layouts/DefaultLayout";
import { BrandSignature } from "@/Components/Sections/BrandSignature";
import { ProductBanner } from "@/Components/Sections/ProductBanner";
import { ProductsFooter } from "@/Components/Sections/ProductsFooter";
import { ProductHistory } from "@/Components/Sections/ProductHistory";

const Page = () => {
    const { conteudos, produto } = usePage().props;
    return (
        <DefaultLayout>
            <ProductBanner product={produto} />
            <ProductHistory product={produto}/>
            <BrandSignature content={conteudos[1]}>
                <ProductsFooter content={conteudos[0]} />
            </BrandSignature>
        </DefaultLayout>
    );
};

export default Page;
