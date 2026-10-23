import { LinkButton } from "../UI/LinkButton";
import { Text } from "../UI/Text";
import { Title } from "../UI/Title";

export const HomeTerroir = ({ content }) => {
    return (
        <section className="relative overflow-hidden pt-20 md:pt-32 2xl:pt-52">
            <div className="container relative z-30 mx-auto max-w-medium">
                <div className="aspect-[154/67] md:aspect-[3/1] 2xl:aspect-[2/1]">
                    <img
                        src={content.imagem}
                        alt={content.titulo || ""}
                        className="size-full border-custom object-cover"
                    />
                </div>
                <Title
                    tag="h3"
                    variant="h3"
                    html={content.titulo}
                    className="[&_strong]:block text-center mt-8 md:mt-16"
                />
                <Text className="md:max-w-[700px] text-center mx-auto py-5 md:py-10">
                    {content.texto}
                </Text>

                <LinkButton
                className="mx-auto"
                // href="/acomodacoes"
                >
                    Descobrir o terroir
                </LinkButton>
            </div>
        </section>
    );
};
