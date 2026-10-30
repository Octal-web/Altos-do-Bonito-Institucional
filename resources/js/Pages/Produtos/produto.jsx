import { usePage } from "@inertiajs/react";

import DefaultLayout from "@/Layouts/DefaultLayout";
import { BrandSignature } from "@/Components/Sections/BrandSignature";
import { ProductBanner } from "@/Components/Sections/ProductBanner";
import { ProductsFooter } from "@/Components/Sections/ProductsFooter";
import { ProductContent } from "@/Components/Sections/ProductContent";
import { ProductSuggestions } from "@/Components/Sections/ProductSuggestions";
import { ScrollReveal } from "@/Components/UI/ScrollReveal";

const Page = () => {
    const { conteudos, produto, sugestoes } = usePage().props;
    return (
        <DefaultLayout>
            <ScrollReveal>
                <ProductBanner product={produto} />
                <ProductContent product={produto} />
                {sugestoes.length > 0 && (
                    <ProductSuggestions
                        suggestions={sugestoes}
                        content={conteudos[2]}
                    />
                )}
                <BrandSignature content={conteudos[1]}>
                    <ProductsFooter content={conteudos[0]} />
                </BrandSignature>
            </ScrollReveal>
        </DefaultLayout>
    );
};

export default Page;
