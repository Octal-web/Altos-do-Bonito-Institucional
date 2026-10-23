import { usePage } from "@inertiajs/react";

import DefaultLayout from "@/Layouts/DefaultLayout";

import { AboutBanner } from "@/Components/Sections/AboutBanner";
import { AboutOrigin } from "@/Components/Sections/AboutOrigin";
import { AboutProfessionals } from "@/Components/Sections/AboutProfessionals";
import { AboutTradition } from "@/Components/Sections/AboutTradition";
import { AboutValues } from "@/Components/Sections/AboutValues";
import { AboutVisit } from "@/Components/Sections/AboutVisit";
import { BrandSignature } from "@/Components/Sections/BrandSignature";
import { SectionBackground } from "@/Components/UI/SectionBackground";
import { AboutTimeline } from "@/Components/Sections/AboutTimeline";
import { AboutTerroirRegion } from "@/Components/Sections/AboutTerroirRegion";

const Page = () => {
    const { conteudos, acontecimentos, valores, profissionais } =
        usePage().props;
    return (
        <DefaultLayout>
            <AboutBanner content={conteudos[0]} />
            <SectionBackground
                className="object-left opacity-55"
                backgroundClassName="inset-y-0 left-0 right-0 md:right-[50%] bottom-[90%] md:bottom-[60%]"
                overlayClassName="bg-[linear-gradient(to_right,transparent,transparent,black),linear-gradient(to_top_right,transparent,transparent,black)]"
            >
                <AboutTradition content={conteudos[1]} />
                <AboutOrigin content={[conteudos[2], conteudos[3]]} />
            </SectionBackground>

            <AboutValues content={conteudos[6]} values={valores} />

            <AboutTerroirRegion content={[conteudos[9], conteudos[10]]}/>

            <SectionBackground
                className="object-left opacity-45"
                backgroundClassName="inset-y-0 left-0 right-0 top-[30%] hidden md:block bottom-[20%] scale-y-[-1]"
                overlayClassName="bg-[linear-gradient(to_right,transparent,transparent,black),linear-gradient(to_top_right,transparent,transparent,black)]"
            >
                <AboutProfessionals
                    content={conteudos[7]}
                    professionals={profissionais}
                />
                <AboutTimeline content={conteudos[8]} events={acontecimentos} />
            </SectionBackground>

            <BrandSignature content={conteudos[5]}>
                <AboutVisit content={conteudos[4]} />
            </BrandSignature>
        </DefaultLayout>
    );
};

export default Page;
