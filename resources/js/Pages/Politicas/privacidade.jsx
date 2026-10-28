import React from "react";
import { usePage } from "@inertiajs/react";

import DefaultLayout from "@/Layouts/DefaultLayout";
import { PolicyContent } from "@/Components/Sections/PolicyContent";

const Page = () => {
    const { conteudos } = usePage().props;

    return (
        <DefaultLayout>
            <PolicyContent content={conteudos[0]} />
        </DefaultLayout>
    );
};

export default Page;