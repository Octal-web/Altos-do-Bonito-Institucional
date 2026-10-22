import { LinkButton } from "../UI/LinkButton";
import { Text } from "../UI/Text";
import { Title } from "../UI/Title";

export const HomeTerroir = ({ content }) => {
    return (
        <section className="relative overflow-hidden py-16 md:py-24 2xl:py-32">
            <div className="container max-w-medium">
                <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-10">
                    <div>
                        <Title
                            tag="h3"
                            variant="h3"
                            html={content.titulo}
                        />
                        <Text className="py-5 md:py-8 2xl:py-10 md:max-w-[537px]">
                            {content.texto}
                        </Text>
                        <LinkButton
                            // href="/acomodacoes"
                        >
                            Descobrir o terroir
                        </LinkButton>
                    </div>

                    <img
                        src={content.imagem}
                        alt=""
                        loading="lazy"
                        className="aspect-[708/563] w-full border-custom object-cover"
                    />
                </div>
            </div>
        </section>
    );
};
