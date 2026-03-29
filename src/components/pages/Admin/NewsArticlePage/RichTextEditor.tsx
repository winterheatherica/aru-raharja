"use client";

import { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";

type Props = {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
};

function normalizeHtml(html: string) {
  return html
    .replace(/<blockquote[^>]*>/gi, "<p>")
    .replace(/<\/blockquote>/gi, "</p>");
}

function Btn({ active, onClick, children }: { active?: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg border px-2 py-1 text-xs transition ${active ? "border-blue-500 ring-2 ring-blue-200 bg-blue-50 text-blue-700" : "border-bumnslate-10 bg-white text-black"}`}
    >
      {children}
    </button>
  );
}

export default function RichTextEditor({ value, onChange, placeholder }: Props) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [3] },
        blockquote: false,
      }),
      Underline,
      Link.configure({ openOnClick: false, autolink: true }),
    ],
    content: value || "",
    editorProps: {
      attributes: {
        class: "min-h-52 rounded-xl border border-bumnslate-10 bg-white px-3 py-2 focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(normalizeHtml(editor.getHTML()));
    },
  });

  useEffect(() => {
    if (!editor) return;
    const current = editor.getHTML();
    if ((value || "") !== current) {
      editor.commands.setContent(value || "", { emitUpdate: false });
    }
  }, [editor, value]);

  if (!editor) {
    return <div className="min-h-20 rounded-xl border border-bumnslate-10 bg-white px-3 py-2 text-sm text-bumnslate-6">Loading editor...</div>;
  }

  return (
    <div className="grid gap-2">
      <div className="flex flex-wrap items-center gap-2 rounded-xl border border-bumnslate-10 bg-white p-2">
        <Btn active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}><b>B</b></Btn>
        <Btn active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}><i>I</i></Btn>
        <Btn active={editor.isActive("underline")} onClick={() => editor.chain().focus().toggleUnderline().run()}><u>U</u></Btn>
        <Btn active={editor.isActive("heading", { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>H3</Btn>
        <Btn active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}>• List</Btn>
        <Btn active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}>1. List</Btn>
        <Btn
          active={editor.isActive("link")}
          onClick={() => {
            const prev = editor.getAttributes("link").href || "";
            const url = prompt("Masukkan URL", prev);
            if (url === null) return;
            if (url.trim() === "") {
              editor.chain().focus().unsetLink().run();
              return;
            }
            editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
          }}
        >
          Link
        </Btn>
      </div>

      <div className="grid gap-1">
        {!value && <p className="text-xs text-bumnslate-5 px-1">{placeholder || "Tulis konten di sini..."}</p>}
        <EditorContent editor={editor} />
      </div>

      <div className="grid gap-2 rounded-xl border border-bumnslate-10 bg-white p-3">
        <p className="text-xs font-semibold text-bumnslate-7">Preview HTML</p>
        <div className="rounded-lg border border-bumnslate-10 bg-white p-3 article-rich-content">
          <div dangerouslySetInnerHTML={{ __html: value || "<p class='text-black/40'>Belum ada konten.</p>" }} />
        </div>
      </div>
    </div>
  );
}

