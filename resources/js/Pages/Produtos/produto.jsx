import { usePage } from "@inertiajs/react";

import DefaultLayout from "@/Layouts/DefaultLayout";
import { BrandSignature } from "@/Components/Sections/BrandSignature";
import { ProductBanner } from "@/Components/Sections/ProductBanner";
import { ProductsFooter } from "@/Components/Sections/ProductsFooter";
import { ProductHistory } from "@/Components/Sections/ProductHistory";
import { ProductSpecifications } from "@/Components/Sections/ProductSpecifications";
import { ProductSuggestions } from "@/Components/Sections/ProductSuggestions";

const Page = () => {
    const { conteudos, produto, sugestoes } = usePage().props;
    return (
        <DefaultLayout>
            <ProductBanner product={produto} />
            <ProductHistory product={produto} />
            <ProductSpecifications product={produto} />
            {sugestoes.length > 0 && (
                <ProductSuggestions
                    suggestions={sugestoes}
                    content={conteudos[2]}
                />
            )}
            <BrandSignature content={conteudos[1]}>
                <ProductsFooter content={conteudos[0]} />
            </BrandSignature>
        </DefaultLayout>
    );
};

export default Page;
