import { Text } from "../UI/Text";
import { Title } from "../UI/Title";

export const AboutTradition = ({ content }) => {
    return (
        <section className="section-overflow pt-12 2xl:pt-20">
            <div className="container section-content max-w-medium text-center">
                <Title
                    tag="h3"
                    variant="subtitle"
                    data-fade
                    html={content.subtitulo}
                    className=""
                />
                <Title
                    tag="h2"
                    variant="h2"
                    data-split
                    html={content.titulo}
                    className="md:max-w-[900px] mx-auto  mt-2 2xl:mt-6 mb-5 md:mb-10 2xl:mb-15"
                />

                <Text
                    data-fade
                    data-delay="0.2"
                    className="md:max-w-[890px] 2xl:max-w-[1090px] em-emphasis mx-auto"
                    dangerouslySetInnerHTML={{
                        __html: content.texto,
                    }}
                />
            </div>
        </section>
    );
};
