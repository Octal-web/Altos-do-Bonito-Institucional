import { Link } from "@inertiajs/react";
import { forwardRef } from "react";

export const LinkButton = forwardRef(
    (
        {
            children,
            href,
            icon,
            iconClassName = "",
            className = "",
            isButtonCA = true,
            ...props
        },
        ref,
    ) => {
        return (
            <Link
                ref={ref}
                href={href}
                className={`${isButtonCA ? "button-primary" : "button-secondary"} group w-fit ${className}`}
                {...props}
            >
                {/* margens negativas compensam o gap do flex, mantendo a largura do botão fixa */}
                <div className="h-px w-8 md:w-10 2xl:w-14 bg-white group-hover:bg-black transition-all duration-500 group-hover:w-0 group-hover:-mr-2 md:group-hover:-mr-4" />
                {children}
                <div className="h-px w-0 -ml-2 md:-ml-4 bg-white group-hover:bg-black transition-all duration-500 group-hover:w-8 md:group-hover:w-10 2xl:group-hover:w-14 group-hover:ml-0 md:group-hover:ml-0" />
            </Link>
        );
    },
);
