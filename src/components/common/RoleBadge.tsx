import type { User } from "@/types";
import { useTranslation } from "react-i18next";

export const RoleBadge = ({ role }: { role: User["role"] }) => {
  const { t } = useTranslation();
  const tone =
    role === "Admin"
      ? "bg-sky-50 text-sky-700 ring-sky-200"
      : role === "Doctor"
      ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
      : "bg-slate-50 text-slate-700 ring-slate-200";
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ${tone}`}
    >
      {t(`role.${role}`)}
    </span>
  );
};
