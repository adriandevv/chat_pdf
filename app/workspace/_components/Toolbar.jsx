import React from 'react';
import {
  Bold, Italic, Underline, Heading1, Heading2, Heading3,
  AlignLeft, AlignCenter, AlignRight, AlignJustify, Code, Highlighter
} from 'lucide-react';

const Toolbar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  // Clase de botón actualizada para mejor distinción visual del estado activo
  const buttonClass = (isActive) =>
    `p-2 rounded ${isActive ? 'bg-blue-500 text-white hover:bg-blue-600' : 'hover:bg-gray-200'}`;

  return (
    <div className="flex flex-wrap items-center gap-1 p-2 border-b border-gray-300 bg-gray-100 rounded-t-xl">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={buttonClass(editor.isActive('bold'))}
        title="Bold"
      >
        <Bold size={20} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={buttonClass(editor.isActive('italic'))}
        title="Italic"
      >
        <Italic size={20} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
        className={buttonClass(editor.isActive('underline'))}
        title="Underline"
      >
        <Underline size={20} />
      </button>
      <div className="h-5 w-px bg-gray-300 mx-1"></div> {/* Separador */}
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={buttonClass(editor.isActive('heading', { level: 1 }))}
        title="H1"
      >
        <Heading1 size={20} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={buttonClass(editor.isActive('heading', { level: 2 }))}
        title="H2"
      >
        <Heading2 size={20} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={buttonClass(editor.isActive('heading', { level: 3 }))}
        title="H3"
      >
        <Heading3 size={20} />
      </button>
      <div className="h-5 w-px bg-gray-300 mx-1"></div> {/* Separador */}
      <button
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        className={buttonClass(editor.isActive({ textAlign: 'left' }))}
        title="Align Left"
      >
        <AlignLeft size={20} />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        className={buttonClass(editor.isActive({ textAlign: 'center' }))}
        title="Align Center"
      >
        <AlignCenter size={20} />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        className={buttonClass(editor.isActive({ textAlign: 'right' }))}
        title="Align Right"
      >
        <AlignRight size={20} />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
        className={buttonClass(editor.isActive({ textAlign: 'justify' }))}
        title="Align Justify"
      >
        <AlignJustify size={20} />
      </button>
      <div className="h-5 w-px bg-gray-300 mx-1"></div> {/* Separador */}
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={buttonClass(editor.isActive('code'))}
        title="Code"
      >
        <Code size={20} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        className={buttonClass(editor.isActive('highlight'))}
        title="Highlight"
      >
        <Highlighter size={20} />
      </button>
      {/* Puedes agregar más botones aquí, como para 'codeBlock', 'blockquote', etc. */}
    </div>
  );
};

export default Toolbar;