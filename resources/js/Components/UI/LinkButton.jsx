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
                <div
                    aria-hidden="true"
                    className={`h-px w-8 md:w-10 bg-white ${isButtonCA ? "" : "group-hover:bg-black"}`}
                />
                {children}
                {props.target === "_blank" && <span className="sr-only"> ({lang("novaAba")})</span>}
            </Link>
        );
    },
);
