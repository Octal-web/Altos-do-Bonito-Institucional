import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { useState } from "react";

export const InputTitleTipTap = ({
    title,
    name,
    value,
    onChange,
    max = null,
}) => {
    const [contentLength, setContentLength] = useState(0);

    const editor = useEditor(
        {
            extensions: [StarterKit],
            content: value,
            onUpdate: ({ editor }) => {
                const content = editor.getHTML();

                const textLength = editor.getText().length;
                setContentLength(textLength);

                if (max !== null && textLength > max) {
                    editor.commands.undo();
                    return;
                }

                onChange(name, content);
            },
        },
        [name, max],
    );

    if (!editor) {
        return null;
    }

    return (
        <div className="mb-6">
            <div className="flex items-center mb-2">
                <label className="block font-bold text-gray-500">{title}</label>
            </div>

            <div className="border">
                <div className="flex flex-wrap items-center gap-1 p-2 bg-gray-50 border-b">
                    <div className="flex border-r pr-2 mr-1">
                        <button
                            onClick={() =>
                                editor.chain().focus().toggleBold().run()
                            }
                            className={`p-2 rounded hover:bg-gray-200 ${editor.isActive("bold") ? "bg-gray-200 text-blue-600" : ""}`}
                            title="Negrito"
                            type="button"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                            >
                                <path d="M8.21 13c2.106 0 3.412-1.087 3.412-2.823 0-1.306-.984-2.283-2.324-2.386v-.055a2.176 2.176 0 0 0 1.852-2.14c0-1.51-1.162-2.46-3.014-2.46H3.843V13H8.21zM5.908 4.674h1.696c.963 0 1.517.451 1.517 1.244 0 .834-.629 1.32-1.73 1.32H5.908V4.673zm0 6.788V8.598h1.73c1.217 0 1.88.492 1.88 1.415 0 .943-.643 1.449-1.832 1.449H5.907z" />
                            </svg>
                        </button>

                        <button
                            onClick={() =>
                                editor.chain().focus().toggleItalic().run()
                            }
                            className={`p-2 rounded hover:bg-gray-200 ${editor.isActive("italic") ? "bg-gray-200 text-blue-600" : ""}`}
                            title="Itálico"
                            type="button"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                            >
                                <path d="M7.991 11.674 9.53 4.455c.123-.595.246-.71 1.347-.807l.11-.52H7.211l-.11.52c1.06.096 1.128.212 1.005.807L6.57 11.674c-.123.595-.246.71-1.346.806l-.11.52h3.774l.11-.52c-1.06-.095-1.129-.211-1.006-.806z" />
                            </svg>
                        </button>
                    </div>

                    <div className="flex">
                        <button
                            onClick={() => editor.chain().focus().undo().run()}
                            disabled={!editor.can().undo()}
                            className="p-2 rounded hover:bg-gray-200 disabled:opacity-50"
                            title="Desfazer"
                            type="button"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"
                                />
                                <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z" />
                            </svg>
                        </button>

                        <button
                            onClick={() => editor.chain().focus().redo().run()}
                            disabled={!editor.can().redo()}
                            className="p-2 rounded hover:bg-gray-200 disabled:opacity-50"
                            title="Refazer"
                            type="button"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
                                />
                                <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="p-3 h-10 overflow-hidden">
                    <EditorContent
                        editor={editor}
                        className="[&_.ProseMirror]:min-h-30 [&_p]:text-sm [&_h1]:text-4xl [&_h2]:text-3xl [&_h3]:text-2xl [&_h4]:text-xl [&_h5]:text-base [&_th]:border [&_td]:border [&_ul]:list-inside [&_ul_li]:list-disc [&_ul>li>p]:inline [&_ul>li>p]:my-0 [&_ol]:list-inside [&_ol_li]:list-decimal [&_ol>li>p]:inline [&_ol>li>p]:my-0 [&_a]:underline [&_a]:text-blue-500 [&_.ProseMirror-focused]:outline-none"
                    />
                </div>
            </div>
        </div>
    );
};