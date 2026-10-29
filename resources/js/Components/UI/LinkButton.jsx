import { Link } from "@inertiajs/react";
import { forwardRef } from "react";
import { useLang } from "@/hooks/useLang";

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
        const lang = useLang();
        if (!href) {
            return <span ref={ref} role="link" aria-disabled="true" className={`${isButtonCA ? "button-primary" : "button-secondary"} w-fit opacity-60 ${className}`}>{children}</span>;
        }
        return (
            <Link
                ref={ref}
                href={href}
                className={`${isButtonCA ? "button-primary" : "button-secondary"} group w-fit focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary ${className}`}
                {...props}
            >
                {/* margens negativas compensam o gap do flex, mantendo a largura do botão fixa */}
                <div aria-hidden="true" className="h-px w-8 md:w-10 2xl:w-14 bg-white group-hover:bg-black transition-all duration-500 group-hover:w-0 group-hover:-mr-2 md:group-hover:-mr-4" />
                {children}
                {props.target === "_blank" && <span className="sr-only"> ({lang("novaAba")})</span>}
                <div className="h-px w-0 -ml-2 md:-ml-4 bg-white group-hover:bg-black transition-all duration-500 group-hover:w-8 md:group-hover:w-10 2xl:group-hover:w-14 group-hover:ml-0 md:group-hover:ml-0" />
            </Link>
        );
    },
);
