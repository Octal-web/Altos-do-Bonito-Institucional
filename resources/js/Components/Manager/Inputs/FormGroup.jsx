
import { InputCheckbox } from "./InputCheckbox";
import { InputDatetime } from "./InputDatetime";
import { InputFileDropzone } from "./InputFileDropzone";
import { InputFileImage } from "./InputFileImage";
import { InputLink } from "./InputLink";
import { InputNumber } from "./InputNumber";
import { InputSelect } from "./InputSelect";
import { InputTag } from "./InputTag";
import { InputText } from "./InputText";
import { InputTextArea } from "./InputTextArea";
import { InputTipTapEditor } from "./InputTipTapEditor";
import { InputTitleTipTap } from "./InputTitleTipTap";

export const FormGroup = ({
    input,
    imagem,
    value,
    toolbar,
    idioma,
    onChange,
    handleImageCrop,
}) => {
    switch (input.tipo) {
        case "texto":
            return input.editor ? (
                <InputTitleTipTap
                    title={input.titulo}
                    name={input.name}
                    value={value}
                    max={input.max}
                    onChange={onChange}
                    idioma={idioma.codigo}
                />
            ) : (
                <InputText
                    title={input.titulo}
                    name={input.name}
                    max={input.max}
                    value={value}
                    onChange={onChange}
                    idioma={idioma.codigo}
                />
            );
        case "texto_longo":
            return input.editor ? (
                <InputTipTapEditor
                    title={input.titulo}
                    name={input.name}
                    value={value}
                    max={input.max}
                    toolbar={input.toolbar}
                    previewClass={input.previewClass}
                    onChange={onChange}
                    idioma={idioma.codigo}
                />
            ) : (
                <InputTextArea
                    title={input.titulo}
                    name={input.name}
                    value={value}
                    max={input.max}
                    onChange={onChange}
                    idioma={idioma.codigo}
                />
            );
        case "numero":
            return (
                <InputNumber
                    title={input.titulo}
                    name={input.name}
                    value={value}
                    min={input.min}
                    max={input.max}
                    onChange={onChange}
                    idioma={idioma.codigo}
                />
            );
        case "imagem":
            return (
                <InputFileImage
                    title={input.titulo}
                    name={input.name}
                    imagem={input.imagem ?? "/admin/img/others/select.png"}
                    size={{ largura: input.largura, altura: input.altura }}
                    allowCrop={input.crop ? true : false}
                    onImageCrop={handleImageCrop}
                    idioma={idioma.codigo}
                />
            );
        case "check":
            return (
                <InputCheckbox
                    title={input.titulo}
                    name={input.name}
                    checked={value}
                    onChange={onChange}
                    idioma={idioma.codigo}
                />
            );
        case "select":
            return (
                <InputSelect
                    title={input.titulo}
                    name={input.name}
                    value={value}
                    options={input.options}
                    onChange={onChange}
                    isMulti={input.isMulti}
                    idioma={idioma.codigo}
                />
            );
        case "video":
            return (
                <InputFileDropzone
                    title={input.titulo}
                    type="video"
                    name={input.name}
                    value={value}
                    onChange={onChange}
                    currentFile={input.arquivo}
                    onDelete={() => onChange(input.name, null)}
                    idioma={idioma.codigo}
                />
            );
        case "arquivo":
            return (
                <InputFileDropzone
                    title={input.titulo}
                    type="arquivo"
                    name={input.name}
                    value={value}
                    onChange={onChange}
                    currentFile={input.arquivo}
                    onDelete={() => onChange(input.name, null)}
                    idioma={idioma.codigo}
                />
            );
        case "data_hora":
            return (
                <InputDatetime
                    title={input.titulo}
                    name={input.name}
                    value={value}
                    max={input.max}
                    onChange={onChange}
                    idioma={idioma.codigo}
                />
            );
        case "link":
            return (
                <InputLink
                    title={input.titulo}
                    name={input.name}
                    value={value}
                    max={input.max}
                    onChange={onChange}
                    idioma={idioma.codigo}
                />
            );
        case "tag":
            return (
                <InputTag
                    title={input.titulo}
                    name={input.name}
                    value={value}
                    onChange={onChange}
                    max={input.max}
                    placeholder={input.placeholder}
                    idioma={idioma.codigo}
                />
            );
        default:
            return null;
    }
};