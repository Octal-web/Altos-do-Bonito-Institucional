import { WithContext as ReactTags } from "react-tag-input";
import { Label } from "./Label";

export const InputTag = ({
    title,
    name,
    value = [],
    idioma,
    onChange,
    max,
    placeholder,
}) => {
    const tags = Array.isArray(value)
        ? value.map((tag, index) => ({ id: index.toString(), text: tag }))
        : [];

    const handleDelete = (i) => {
        const newTags = tags
            .filter((tag, index) => index !== i)
            .map((tag) => tag.text);
        onChange(name, newTags);
    };

    const handleAddition = (tag) => {
        if (max && tags.length >= max) return;
        const newTags = [...tags.map((t) => t.text), tag.text];
        onChange(name, newTags);
    };

    const KeyCodes = {
        comma: 188,
        enter: 13,
        semicolon: 186,
    };

    return (
        <div className="mb-6">
            {title && <Label title={title} idioma={idioma} />}

            <ReactTags
                tags={tags}
                handleDelete={handleDelete}
                handleAddition={handleAddition}
                delimiters={[
                    KeyCodes.comma,
                    KeyCodes.enter,
                    KeyCodes.semicolon,
                ]}
                placeholder={placeholder || "Pressione enter para adicionar"}
                maxTags={max}
                allowUnique={true}
                autofocus={false}
                classNames={{
                    tagInput: "!ml-0",
                    tagInputField:
                        "w-full border-gray-300 bg-transparent p-3 font-normal text-sm text-black outline-none transition focus:border-black focus:ring-0 active:border-black disabled:cursor-default",
                    tag: "text-sm border border-gray-300 pt-0.5 pb-1 px-2 inline-block mb-2 ",
                    selected: "space-x-2",
                    remove: "ReactTags__remove ml-1 inline-block translate-y-px [&_svg]:fill-red-500",
                }}
                readOnly={max && tags.length >= max}
            />
        </div>
    );
};
