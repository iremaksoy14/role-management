// src/components/LanguageSwitcher.tsx
import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const change = (lng: "tr" | "en") => i18n.changeLanguage(lng);

  return (
    <div className="flex gap-2 items-center justify-end mb-4">
      <button
        onClick={() => change("tr")}
        className={`px-2 py-1 rounded ${
          i18n.resolvedLanguage === "tr"
            ? "bg-line text-white"
            : "bg-white text-line"
        }`}
        aria-pressed={i18n.resolvedLanguage === "tr"}
      >
        TR
      </button>
      <button
        onClick={() => change("en")}
        className={`px-2 py-1 rounded ${
          i18n.resolvedLanguage === "en"
            ? "bg-line text-white"
            : "bg-white text-line"
        }`}
        aria-pressed={i18n.resolvedLanguage === "en"}
      >
        EN
      </button>
    </div>
  );
}
