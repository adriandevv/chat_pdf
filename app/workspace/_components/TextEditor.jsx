import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import Underline from '@tiptap/extension-underline';
import Toolbar from "./Toolbar"; // Importa el Toolbar
import '../_css/texteditor.css';

const TextEditor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // Configura StarterKit según sea necesario, por ejemplo, para desactivar heading si lo manejas por separado
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Placeholder.configure({
        placeholder: 'Escribe aqui …',
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Highlight,
      Underline,
    ],
    editorProps: {
      attributes: {
        class:
          "focus:outline-none h-[calc(90vh-50px)] p-5 overflow-y-scroll shadow-xl rounded-b-xl bg-white text-gray-900", // Ajusta la altura y rounded
      },
    },
  });

  return (
    <div className="border border-gray-300 rounded-xl shadow-xl"> {/* Contenedor general con borde y sombra */}
      <Toolbar editor={editor} /> {/* Añade el Toolbar aquí */}
      <EditorContent editor={editor} />
    </div>
  );
};

export default TextEditor;
