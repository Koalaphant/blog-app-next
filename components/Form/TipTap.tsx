import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import HardBreak from "@tiptap/extension-hard-break";
import Underline from "@tiptap/extension-underline";
import ToolBar from "./ToolBar";

const TipTap = ({ onChange, content }: any) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        hardBreak: false,
      }),
      Underline,
      HardBreak.configure({
        // Allows line breaks with Enter key
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "border p-2 w-full text-[16px] rounded-md focus:outline-none focus:ring-2 focus:ring-red-800 text-gray-800",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Reset the editor content when the `content` prop changes
  useEffect(() => {
    if (editor && content === "") {
      editor.commands.setContent("");
    }
  }, [content, editor]);

  return (
    <div className="space-y-4">
      <ToolBar editor={editor} content={content} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default TipTap;
