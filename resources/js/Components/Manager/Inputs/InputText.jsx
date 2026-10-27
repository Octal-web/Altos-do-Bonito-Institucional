import React from "react";
import { Label } from "./Label";

export const InputText = ({ title, name, value, idioma, onChange, max }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        onChange(name, value);
    };

    return (
        <div className="mb-6">
            <Label title={title} idioma={idioma} />
            <input
                type="text"
                name={name}
                value={value ?? ""}
                className="w-full border-gray-300 bg-transparent p-3 font-normal text-sm text-black outline-none transition focus:border-black focus:ring-0 active:border-black disabled:cursor-default"
                onChange={handleChange}
                {...(max ? { maxLength: max } : {})}
            />
        </div>
    );
};
