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
                <div
                    className={`h-px w-8 md:w-10 bg-white ${isButtonCA ? "" : "group-hover:bg-black"}`}
                />
                {children}
            </Link>
        );
    },
);
