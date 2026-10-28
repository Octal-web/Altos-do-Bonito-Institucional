import { forwardRef } from "react";

const variants = {
    h1: "text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-tertiary leading-10 2xl:leading-[116px] uppercase",
    h2: "text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-tertiary font-primary font-normal text-white [&_strong]:text-primary [&_strong]:font-normal",
    h3: "text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-primary font-normal text-white [&_strong]:text-primary [&_strong]:font-normal",
    h4: "text-xl lg:text-2xl 2xl:text-3xl font-primary font-normal text-white [&_strong]:text-primary [&_strong]:font-normal",
    h5: "text-lg lg:text-xl 2xl:text-2xl font-primary text-primary italic",
    subtitle:
        "text-sm md:text-base lg:text-lg 2xl:text-xl font-tertiary font-admin font-light text-primary tracking-[5px] uppercase",
    subtitle_small:
        "text-xs md:text-sm lg:text-base 2xl:text-lg font-tertiary font-admin font-light text-primary tracking-[5px]",
};

export const Title = forwardRef(
    (
        {
            children,
            html,
            tag = "h2",
            variant = "h2",
            className = "",
            ...props
        },
        ref,
    ) => {
        const Tag = tag;

        return (
            <Tag
                ref={ref}
                className={`${variants[variant] || variants.h2} ${className}`}
                dangerouslySetInnerHTML={
                    html !== undefined ? { __html: html } : undefined
                }
                {...props}
            >
                {html === undefined ? children : undefined}
            </Tag>
        );
    },
);

Title.displayName = "Title";
