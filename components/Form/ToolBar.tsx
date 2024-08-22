import React from "react";
import { type Editor } from "@tiptap/react";
import {
  Bold,
  Strikethrough,
  Italic,
  Heading2,
  Underline,
  Undo,
  Redo,
} from "lucide-react";

type Props = {
  editor: Editor | null;
  content: string;
};

export default function ToolBar({ editor, content }: Props) {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-3 items-center bg-gray-100 p-3 rounded-lg border border-gray-300">
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleBold().run();
        }}
        className={
          editor.isActive("bold")
            ? "bg-red-800 text-white p-2 rounded-lg"
            : "text-gray-700"
        }
      >
        <Bold className="w-5 h-5" />
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleUnderline().run();
        }}
        className={
          editor.isActive("underline")
            ? "bg-red-800 text-white p-2 rounded-lg"
            : "text-gray-700"
        }
      >
        <Underline className="w-5 h-5" />
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleItalic().run();
        }}
        className={
          editor.isActive("italic")
            ? "bg-red-800 text-white p-2 rounded-lg"
            : "text-gray-700"
        }
      >
        <Italic className="w-5 h-5" />
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleStrike().run();
        }}
        className={
          editor.isActive("strike")
            ? "bg-red-800 text-white p-2 rounded-lg"
            : "text-gray-700"
        }
      >
        <Strikethrough className="w-5 h-5" />
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleHeading({ level: 2 }).run();
        }}
        className={
          editor.isActive("heading", { level: 2 })
            ? "bg-red-800 text-white p-2 rounded-lg"
            : "text-gray-700"
        }
      >
        <Heading2 className="w-5 h-5" />
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().undo().run();
        }}
        className="text-gray-700 p-2 rounded-lg hover:bg-gray-200 transition-colors"
      >
        <Undo className="w-5 h-5" />
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().redo().run();
        }}
        className="text-gray-700 p-2 rounded-lg hover:bg-gray-200 transition-colors"
      >
        <Redo className="w-5 h-5" />
      </button>
    </div>
  );
}
