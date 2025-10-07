import React from "react";
import { PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";
export default function TableSkeleton({ rows = 8 }: { rows?: number }) {
  const { t } = useTranslation();
  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full border-collapse text-sm">
        <thead className="bg-gray-50 text-left text-gray-600">
          <tr>
            <th className="px-3 py-2 font-medium">{t("userForm.name")}</th>
            <th className="px-3 py-2 font-medium">{t("userForm.role")}</th>
            <th className="px-3 py-2 font-medium">
              {" "}
              {t("userForm.permissions")}
            </th>
            <th className="px-3 py-2 font-medium text-right">
              {t("userForm.actions")}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {Array.from({ length: rows }).map((_, i) => (
            <tr key={i} className="animate-pulse">
              <td className="px-3 py-2">
                <div className="h-4 w-40 rounded bg-gray-200" />
              </td>
              <td className="px-3 py-2">
                <div className="h-4 w-20 rounded bg-gray-200" />
              </td>
              <td className="px-3 py-2">
                <div className="h-4 w-28 rounded bg-gray-200" />
              </td>
              <td className="px-3 py-2">
                <div className="ml-auto h-8 w-28 rounded bg-gray-200" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
