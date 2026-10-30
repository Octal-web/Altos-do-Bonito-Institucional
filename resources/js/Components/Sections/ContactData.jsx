import { useLang } from "@/hooks/useLang";
import { ContactMap } from "../ContactMap";
import { Title } from "../UI/Title";
import { Text } from "../UI/Text";

export const ContactData = ({ content, apiKey, data = {} }) => {
    const lang = useLang();
    return (
        <section aria-label={lang("localizacaoAtendimento")} data-drift="30" className="min-w-0">
            <div
                data-reveal="right"
                data-drift="0"
                className="relative aspect-[4/3] overflow-hidden rounded-lg border border-white/15 bg-[#302c24]"
            >
                <ContactMap lat={data.latitude} lng={data.longitude} apiKey={apiKey} className="absolute inset-0 h-full w-full" />
            </div>

            <div className="mt-7 space-y-5 md:mt-8 md:space-y-6">
                <div data-fade>
                    <Title tag="h3" variant="h5" className="mb-2">{lang("comoChegar")}</Title>
                    <Text variant="p">
                        {content?.texto || data.endereco || lang("enderecoPadrao")}
                    </Text>
                </div>
                <div data-fade data-delay="0.15">
                    <Title tag="h3" variant="h5" className="mb-2">{lang("horariosAtendimento")}</Title>
                    <Text variant="p">
                        {data.horario_atendimento}
                    </Text>
                </div>
            </div>
        </section>
    );
};
