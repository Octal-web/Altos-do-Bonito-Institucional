import { forwardRef } from "react";

const variants = {
    default:
        "text-sm md:text-base lg:text-lg 2xl:text-xl text-white/60 font-light leading-[25px] md:leading-[30px] 2xl:leading-[36px] font-admin",
};

export const Text = forwardRef(
    ({ children, variant = "default", className = "", ...props }, ref) => {
        return (
            <p
                ref={ref}
                className={`${variants[variant] ?? ''} ${className}`}
                {...props}
            >
                {children}
            </p>
        );
    },
);