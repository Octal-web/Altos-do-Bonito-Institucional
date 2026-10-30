import { useRef } from "react";

import { useScrollReveal } from "@/hooks/useScrollReveal";

// Monta as animações dentro do layout: com o age gate aberto o conteúdo só entra
// na tela depois da confirmação, e um hook no nível da página não encontraria o escopo
export const ScrollReveal = ({ children }) => {
    const scopeRef = useRef(null);

    useScrollReveal(scopeRef);

    return <div ref={scopeRef}>{children}</div>;
};
