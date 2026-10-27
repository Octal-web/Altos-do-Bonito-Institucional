import { useRef } from "react";
import { usePage } from "@inertiajs/react";

import DefaultLayout from "@/Layouts/DefaultLayout";
import { useScrollReveal } from "@/hooks/useScrollReveal";

import { BrandSignature } from "@/Components/Sections/BrandSignature";
import { HomeExpressions } from "@/Components/Sections/HomeExpressions";
import { HomeFamily } from "@/Components/Sections/HomeFamily";
import { HomeLabels } from "@/Components/Sections/HomeLabels";
import { HomeNewsletter } from "@/Components/Sections/HomeNewsletter";
import { HomeSlides } from "@/Components/Sections/HomeSlides";
import { HomeTerroir } from "@/Components/Sections/HomeTerroir";
import { HomeTradition } from "@/Components/Sections/HomeTradition";
import { HomeWinery } from "@/Components/Sections/HomeWinery";

const Page = () => {
    const { slides, conteudos, imagensGaleria } = usePage().props;
    const pageRef = useRef(null);

    useScrollReveal(pageRef);

    return (
        <DefaultLayout>
            <div ref={pageRef}>
                <HomeSlides slides={slides} />
                <HomeTradition content={[conteudos[0], conteudos[1]]} />
                <HomeLabels
                    content={[conteudos[5], conteudos[4]]}
                    images={imagensGaleria[6]}
                />
                <HomeExpressions content={conteudos[2]} />
                <HomeFamily
                    content={[conteudos[13], conteudos[3], conteudos[14]]}
                />
                <HomeTerroir content={conteudos[7]} />
                <HomeWinery
                    content={[conteudos[10], conteudos[9], conteudos[8]]}
                />
                <BrandSignature content={conteudos[11]}>
                    <HomeNewsletter content={conteudos[12]} />
                </BrandSignature>
            </div>
        </DefaultLayout>
    );
};

export default Page;
