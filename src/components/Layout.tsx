import React from "react";
import { PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Layout({ children }: PropsWithChildren) {
  const { t } = useTranslation();

  return (
    <main className="mx-auto  p-6">
      <h1 className="text-2xl font-bold tracking-tight mb-4 text-line">
        {t("app.title")}
      </h1>
      <LanguageSwitcher />
      {children}
    </main>
  );
}
