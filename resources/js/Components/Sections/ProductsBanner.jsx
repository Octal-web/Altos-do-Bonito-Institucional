import { SectionBackground } from "../UI/SectionBackground";
import { Text } from "../UI/Text";
import { Title } from "../UI/Title";

export const ProductsBanner = ({ content }) => {
    return (
        <section className="section-overflow pt-20 md:pt-10">
            <SectionBackground className="section-background left-0 top-0 h-full md:w-[40vw] opacity-55" />
            <div className="container max-w-medium section-content">
                <div className="grid grid-cols-1 items-end py-10 md:grid-cols-[3fr_1fr] md:py-20 2xl:py-28 gap-5">
                    <Title
                        tag="h2"
                        variant="h2"
                        html={content.titulo}
                        className="md:[&_strong]:block"
                    />

                    <Text className="w-full min-w-0 md:max-w-[400px] md:justify-self-end">
                        {content.texto}
                    </Text>
                </div>
            </div>
            <div className="aspect-[16/9] w-full md:aspect-[4/1] section-content">
                <img
                    src={content.imagem}
                    alt=""
                    className="size-full object-cover object-bottom"
                />
            </div>
        </section>
    );
};
