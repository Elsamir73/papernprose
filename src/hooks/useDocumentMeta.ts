import { useEffect } from "react";

export function useDocumentMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title === "PapernProse" ? title : `${title} | PapernProse`;
    const meta = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]',
    );
    if (meta) meta.content = description;
  }, [title, description]);
}
