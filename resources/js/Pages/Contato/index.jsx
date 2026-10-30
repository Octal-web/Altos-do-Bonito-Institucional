import { usePage } from "@inertiajs/react";

import { ContactBanner } from "@/Components/Sections/ContactBanner";
import DefaultLayout from "@/Layouts/DefaultLayout";
import { ContactData } from "@/Components/Sections/ContactData";
import { ContactForm } from "@/Components/Sections/ContactForm";
import { ScrollReveal } from "@/Components/UI/ScrollReveal";
import { SectionBackground } from "@/Components/UI/SectionBackground";
import { BrandSignature } from "@/Components/Sections/BrandSignature";

const Page = () => {
    const { googleMapsKey, conteudos, dadosGerais } = usePage().props;

    return (
        <DefaultLayout>
            <ScrollReveal>
                <ContactBanner content={conteudos[0]} data={dadosGerais} />
                <section className="section-overflow isolate z-30 py-16 md:py-24 2xl:py-32">
                    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
                        <SectionBackground parallax="8" className="left-0 -top-40 h-[55%] w-full opacity-40 md:w-1/2" />

                    </div>
                    <div className="container max-w-medium">
                        <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-2 md:gap-12 lg:gap-20 2xl:gap-24">
                            <ContactForm />
                            <ContactData apiKey={googleMapsKey} data={dadosGerais} />
                        </div>
                    </div>
                </section>

                <BrandSignature bgClassName="!-top-96" content={conteudos[1]}/>
            </ScrollReveal>
        </DefaultLayout>
    );
};

export default Page;
