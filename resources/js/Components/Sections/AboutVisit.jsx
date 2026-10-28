import { useLang } from "@/hooks/useLang";
import { LinkButton } from "../UI/LinkButton";
import { Text } from "../UI/Text";
import { Title } from "../UI/Title";

export const AboutVisit = ({ content }) => {
    const lang = useLang();
    return (
        <div className="text-center text-white">
            <Title tag="p" variant="subtitle">
                {content.subtitulo}
            </Title>
            <Title
                tag="h2"
                variant="h3"
                className="mt-2 2xl:mt-6 md:max-w-[800px] 2xl:max-w-[1000px] mx-auto"
            >
                {content.titulo}
            </Title>

            <Text className="py-5 md:py-10 md:max-w-[800px] 2xl:max-w-[600px] mx-auto">
                {content.texto}
            </Text>

            <LinkButton
                // href="/acomodacoes"
                className="mx-auto"
            >
                {lang("consultarVisita")}
            </LinkButton>
        </div>
    );
};
