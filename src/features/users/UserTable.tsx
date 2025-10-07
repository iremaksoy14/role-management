import React, { useState } from "react";
import type { User } from "../../types";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";
import PermissionsBadges from "./PermissionsBadges";
import { deleteUser, selectStatus, selectPagedUsers } from "../users/userSlice";
import ConfirmDialog from "../../components/ConfirmDialog";
import { useTranslation } from "react-i18next";
import { getInitials } from "@/helpers";
import { RoleBadge } from "@/components/common/RoleBadge";

type Props = { onEdit?: (u: User) => void };

export default function UserTable({ onEdit }: Props) {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectPagedUsers);
  const status = useAppSelector(selectStatus);
  const { t } = useTranslation();

  const [toDelete, setToDelete] = useState<User | null>(null);
  const [busy, setBusy] = useState(false);

  const actionDisabled = status === "loading" || busy;
  const isLoading = status === "loading";

  const handleDelete = async () => {
    if (!toDelete) return;
    try {
      setBusy(true);
      await dispatch(deleteUser(toDelete.id)).unwrap();
      setToDelete(null);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <div className="relative rounded-2xl bg-white shadow-ah ring-1 ring-slate-200/70">
        <div className="flex items-center justify-between px-5 py-4">
          <h2 className="text-line font-semibold tracking-tight text-ah-700">
            {t("table.users")}
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm" aria-label={t("table.users")}>
            <thead>
              <tr className="text-xs uppercase tracking-wide text-slate-500">
                <th className="px-5 pb-2 text-left">
                  {t("userForm.nameLabel")}
                </th>
                <th className="px-5 pb-2 text-center">{t("userForm.role")}</th>
                <th className="px-5 pb-2 text-right">
                  {t("userForm.permissions")}
                </th>
                <th className="px-5 pb-2 text-right">
                  {t("userForm.actions")}
                </th>
              </tr>
            </thead>

            <tbody>
              {users.map((u, i) => {
                const initials = getInitials(u.name);
                return (
                  <tr key={u.id}>
                    <td colSpan={4} className="px-3 py-1">
                      <div
                        className={`flex items-center gap-4 rounded-xl border border-slate-200/70 bg-white px-4 py-3 ${
                          i > 0 ? "mt-2" : ""
                        } transition-shadow hover:shadow-md hover:ring-1 hover:ring-ah-700/20`}
                      >
                        <div className="min-w-[220px] flex items-center gap-3">
                          <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-ah-100 text-ah-700 text-xs font-bold ring-1 text-line  ring-ah-700/15">
                            {initials || "?"}
                          </div>
                          <div className="font-medium text-slate-900">
                            {u.name}
                          </div>
                        </div>

                        <div className="flex-1">
                          <RoleBadge role={u.role} />
                        </div>

                        <div className="flex-1">
                          <PermissionsBadges value={u.permissions} />
                        </div>

                        <div className="ml-auto flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => onEdit?.(u)}
                            disabled={actionDisabled}
                            title={t("common.edit")}
                            aria-label={`${u.name} ${t("common.edit")}`}
                            className={`inline-flex items-center gap-1 rounded-lg border border-ah-700/20 bg-white px-3 py-1.5 text-xs font-semibold text-ah-700 transition-colors focus:outline-none focus:ring-2 focus:ring-ah-600/40 ${
                              actionDisabled
                                ? "opacity-50 cursor-not-allowed"
                                : "hover:bg-ah-100"
                            }`}
                          >
                            <PencilIcon className="h-4 w-4 text-line" />
                            <span className="hidden sm:inline text-line ">
                              {t("common.edit")}
                            </span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setToDelete(u)}
                            disabled={actionDisabled}
                            title={t("common.delete")}
                            aria-label={`${u.name} ${t("common.delete")}`}
                            className={`inline-flex items-center gap-1 rounded-lg border border-red-300 bg-white px-3 py-1.5 text-xs font-semibold text-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400 ${
                              actionDisabled
                                ? "opacity-50 cursor-not-allowed"
                                : "hover:bg-red-50"
                            }`}
                          >
                            <TrashIcon className="h-4 w-4" />
                            <span className="hidden sm:inline">
                              {t("common.delete")}
                            </span>
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {users.length === 0 && !isLoading && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-12 text-center text-sm text-slate-500"
                  >
                    {t("empty.title")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {isLoading && (
          <div
            className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-2xl bg-white/70"
            role="status"
            aria-live="polite"
          >
            <svg
              className="h-6 w-6 animate-spin text-ah-700"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-20"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-90"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
            <span className="ml-2 text-sm text-ah-700">
              {t("common.loading")}
            </span>
          </div>
        )}
      </div>

      <ConfirmDialog
        open={!!toDelete}
        onClose={() => (busy ? null : setToDelete(null))}
        onConfirm={handleDelete}
        title={t("confirm.titleDelete")}
        description={
          toDelete ? t("confirm.descDelete", { name: toDelete.name }) : ""
        }
        tone="danger"
        busy={busy}
      />
    </>
  );
}
