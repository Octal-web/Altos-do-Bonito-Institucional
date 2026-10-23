import { forwardRef } from "react";

const variants = {
    default:
        "text-sm md:text-base lg:text-lg 2xl:text-xl text-white/60 font-light leading-[25px] md:leading-[28px] 2xl:leading-[30px] font-admin whitespace-pre-line",
    p: "text-xs md:text-sm 2xl:text-base text-white/60 font-light leading-[25px] md:leading-[28px] 2xl:leading-[30px] font-admin whitespace-pre-line",
};

export const Text = forwardRef(
    ({ children, variant = "default", className = "", ...props }, ref) => {
        return (
            <p
                ref={ref}
                className={`${variants[variant] ?? ""} ${className}`}
                {...props}
            >
                {children}
            </p>
        );
    },
);
