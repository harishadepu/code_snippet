import React, { useEffect, useRef } from "react";
import { EditorView, basicSetup } from "codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { xml } from "@codemirror/lang-xml";
import { python } from "@codemirror/lang-python";

export default function CodeEditor({ code, setCode, language }) {
  const editorRef = useRef(null);
  const viewRef = useRef(null);

  useEffect(() => {
    if (!editorRef.current) return;

    let langExtension = javascript();

    if (language === "xml") langExtension = xml();
    if (language === "python") langExtension = python();

    viewRef.current = new EditorView({
      doc: code,
      extensions: [
        basicSetup,
        langExtension,
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            setCode(update.state.doc.toString());
          }
        }),
      ],
      parent: editorRef.current,
    });

    return () => {
      if (viewRef.current) viewRef.current.destroy();
    };
  }, [language]);

  return (
    <div
      ref={editorRef}
      style={{
        border: "1px solid #333",
        height: "300px",
        marginTop: "10px",
      }}
  ></div>
);
}