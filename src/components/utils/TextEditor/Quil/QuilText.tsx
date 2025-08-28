/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

// Font setup
const Font = Quill.import("formats/font") as any;
const Size = Quill.import("formats/size") as any;

Font.whitelist = [
  "sans-serif",
  "serif",
  "monospace",
  "Arial",
  "Roboto",
  '"Times New Roman"',
  '"Courier New"',
  "Georgia",
];
Quill.register(Font, true);

Size.whitelist = ["small", "normal", "large", "huge"];
Quill.register(Size, true);

type QuilTextProps = {
  placeholder?: string;
  height?: string;
  onChange?: (value: string) => void;
  defaultValue?: string;
  maxLength?: number;
};

const QuilText: React.FC<QuilTextProps> = ({
  placeholder = "Write something...",
  height = "200px",
  onChange,
  defaultValue = "",
  maxLength = 500,
}) => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const quillRef = useRef<Quill | null>(null);
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      const toolbarOptions = [
        // [{ font: Font.whitelist }],
        // [{ size: Size.whitelist }],
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ script: "sub" }, { script: "super" }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ align: [] }],
        ["link", "clean"],
      ];

      const q = new Quill(editorRef.current, {
        theme: "snow",
        placeholder,
        modules: { toolbar: toolbarOptions },
        formats: [
          // "font",
          "header",
          "bold",
          "italic",
          "underline",
          "strike",
          "script",
          "list",
          "align",
          "link",
          "color",
          "background",
        ],
      });

      if (defaultValue) {
        q.root.innerHTML = defaultValue;
        setCharCount(q.getText().trim().length);
      }

      q.on("text-change", () => {
        const text = q.getText().trim();
        let count = text.length;

        // ✂️ Limit to maxLength
        if (count > maxLength) {
          q.deleteText(maxLength, count); // remove extra
          count = maxLength;
        }

        setCharCount(count);
        onChange?.(q.root.innerHTML);
      });

      quillRef.current = q;
    }
  }, [placeholder, defaultValue, onChange, maxLength]);

  return (
    <div className="max-w-2xl mx-auto mt-2">
      <div
        ref={editorRef}
        style={{ minHeight: height }}
        className="border border-gray-300 rounded-lg bg-white"
      ></div>
      {/* ✅ Character counter */}
      <div className="text-right text-sm text-gray-500 mt-1">
        {maxLength - charCount} characters left
      </div>
    </div>
  );
};

export default QuilText;
