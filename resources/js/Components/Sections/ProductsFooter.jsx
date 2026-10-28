import { LinkButton } from "../UI/LinkButton";
import { Title } from "../UI/Title";

export const ProductsFooter = ({ content }) => {
    return (
        <div className="text-center text-white">
            <Title tag="p" variant="subtitle">
                {content.subtitulo}
            </Title>
            <Title
                tag="h2"
                variant="h3"
                className="mt-2 2xl:mt-6 md:max-w-[800px] 2xl:max-w-[1000px] mx-auto"
                html={content.titulo}/>

            <LinkButton
                href={route("Contato.index") }
                className="mx-auto mt-5 md:mt-10"
            >
                Conversar agora
            </LinkButton>
        </div>
    );
};
