import React from "react";
import { Label } from "./Label";

export const InputDatetime = ({
    title,
    name,
    value,
    idioma,
    onChange,
    max,
}) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        onChange(name, value);
    };

    return (
        <div className="mb-6">
            <Label idioma={idioma} title={title}/>
            <input
                type="datetime-local"
                name={name}
                value={value}
                className="w-full rounded-lg border-gray-300 bg-transparent p-3 font-normal text-sm text-black outline-none transition focus:border-primary focus:ring-0 active:border-primary disabled:cursor-default disabled:bg-whiter"
                onChange={handleChange}
                max={max || undefined}
            />
        </div>
    );
};
