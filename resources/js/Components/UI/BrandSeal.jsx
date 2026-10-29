// Selo da marca em duas camadas do mesmo tamanho: o anel de texto (que pode girar)
// e o monograma ATM no centro, sempre parado. O className precisa posicionar o
// container (relative, absolute...), pois o monograma se ancora nele
export const BrandSeal = ({
    spin = false,
    className = "relative",
    imgClassName = "block w-full",
    loading,
    ...props
}) => (
    <div className={className} {...props}>
        <img
            src="/site/backgrounds/7f8392a21dce45a283290e735d3157f3.png"
            alt=""
            aria-hidden="true"
            loading={loading}
            className={`${imgClassName} ${spin ? "motion-safe:animate-spin-slow" : ""}`}
        />
        <img
            src="/site/backgrounds/3314581faea4cc91ca49efbb4458418e.png"
            alt=""
            aria-hidden="true"
            loading={loading}
            className="absolute inset-0 size-full object-contain"
        />
    </div>
);
