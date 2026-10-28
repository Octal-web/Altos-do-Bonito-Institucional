import { ContactMap } from "../ContactMap";
import { Title } from "../UI/Title";
import { Text } from "../UI/Text";

export const ContactData = ({ content, apiKey, data = {} }) => {
    return (
        <section aria-label="Localização e atendimento" className="min-w-0">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-white/15 bg-[#302c24]">
                <ContactMap apiKey={apiKey} className="absolute inset-0 h-full w-full" />
            </div>

            <div className="mt-7 space-y-5 md:mt-8 md:space-y-6">
                <div>
                    <Title tag="h3" variant="h5" className="mb-2">Como chegar</Title>
                    <Text variant="p">
                        {content?.texto || data.endereco || "Pinheiro Machado — RS, Campanha Gaúcha."}
                    </Text>
                </div>
                <div>
                    <Title tag="h3" variant="h5" className="mb-2">Horários de atendimento</Title>
                    <Text variant="p">
                        {data.horario_atendimento}
                    </Text>
                </div>
            </div>
        </section>
    );
};
