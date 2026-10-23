import { Text } from "../UI/Text";
import { Title } from "../UI/Title";

export const AboutBanner = ({ content }) => {
    return (
        <section className="relative overflow-hidden pt-20 md:pt-10">
            <div className="container max-w-medium">
                <div className="grid grid-cols-1 items-end py-10 md:grid-cols-[3fr_1fr] md:py-20 2xl:py-28 gap-5">
                    <Title
                        tag="h2"
                        variant="h2"
                        html={content.titulo}
                        className="md:max-w-[700px] 2xl:max-w-[898px]"
                    />

                    <Text className="w-full min-w-0 max-w-[340px] md:justify-self-end">
                        {content.texto}
                    </Text>
                </div>
            </div>
            <div className="aspect-[16/9] w-full md:aspect-[4/1]">
                <img
                    src={content.imagem}
                    alt=""
                    className="size-full object-cover object-bottom"
                />
            </div>
        </section>
    );
};
