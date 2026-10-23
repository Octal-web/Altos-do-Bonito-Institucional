const directions = {
    left: "",
    right: "rotate-180",
    mirrored: "-scale-x-100",
};

export const SectionBackground = ({
    children,
    direction = "left",
    className = "",
    wrapperClassName = "",
    backgroundClassName = "inset-0",
    overlayClassName = "",
}) => {
    const hasChildren = children !== undefined && children !== null;
    const image = (
        <img
            src="/site/backgrounds/5a0f2c3685fc45149e409e30a5b7a7c4.jpg"
            alt=""
            aria-hidden="true"
            loading="lazy"
            className={`pointer-events-none absolute object-fill ${hasChildren ? "inset-0 size-full" : ""} ${directions[direction] || ""} ${className}`}
        />
    );

    if (!hasChildren) return image;

    return (
        <div className={`relative isolate bg-black ${wrapperClassName}`}>
            <div
                aria-hidden="true"
                className={`pointer-events-none absolute z-0 overflow-hidden ${backgroundClassName}`}
            >
                {image}
                {overlayClassName && <div className={`absolute inset-0 ${overlayClassName}`} />}
            </div>
            <div className="relative z-10 [&>section]:bg-transparent">
                {children}
            </div>
        </div>
    );
};
