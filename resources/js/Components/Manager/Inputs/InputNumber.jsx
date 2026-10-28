import React from "react";
import { Label } from "./Label";

export const InputNumber = ({
    title,
    name,
    value,
    idioma,
    onChange,
    min,
    max,
}) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        onChange(name, value);
    };

    return (
        <div className="mb-6">
            <Label title={title} idioma={idioma} />

            <input
                type="number"
                name={name}
                value={value}
                className="w-full border-gray-300 bg-transparent p-3 font-normal text-sm text-black outline-none transition focus:border-secondary focus:ring-0 active:border-secondary disabled:cursor-default disabled:bg-whiter"
                onChange={handleChange}
                max={max ? max : null}
                min={min ? min : null}
            />
        </div>
    );
};
