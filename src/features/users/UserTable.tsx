import React from "react";
import type { User } from "../../types";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";
import PermissionsBadges from "./PermissionsBadges";
import { deleteUser, selectStatus, selectPagedUsers } from "../users/userSlice";
import { useState } from "react";
import ConfirmDialog from "../../components/ConfirmDialog";

type Props = { onEdit?: (u: User) => void };

export default function UserTable({ onEdit }: Props) {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectPagedUsers);
  const status = useAppSelector(selectStatus);

  const [toDelete, setToDelete] = useState<User | null>(null);
  const [busy, setBusy] = useState(false);

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

  const actionDisabled = status === "loading" || busy;

  return (
    <>
      <div className="overflow-x-auto rounded-lg border">
        <table
          className="w-full border-collapse text-sm"
          aria-label="Kullanıcı listesi"
        >
          <thead className="bg-gray text-left text-line">
            <tr>
              <th className="px-3 py-2 font-medium ">Ad</th>
              <th className="px-3 py-2 font-medium">Rol</th>
              <th className="px-3 py-2 font-medium">İzinler</th>
              <th className="px-3 py-2 font-medium text-right">Aksiyonlar</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {users.map((u) => (
              <tr key={u.id} className="align-top">
                <td className="px-3 py-2">
                  <div className="font-medium text-line ">{u.name}</div>
                </td>
                <td className="px-3 py-2 text-line">{u.role}</td>
                <td className="px-3 py-2">
                  <PermissionsBadges value={u.permissions} />
                </td>
                <td className="px-3 py-2">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => onEdit?.(u)}
                      className="inline-flex items-center gap-1 rounded-lg border px-2 py-1  disabled:opacity-50 bg-line"
                      aria-label={`${u.name} kullanıcısını düzenle`}
                      title="Düzenle"
                      disabled={actionDisabled}
                    >
                      <PencilIcon className="h-4 w-4" aria-hidden="true" />
                      <span className="hidden sm:inline">Düzenle</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setToDelete(u)}
                      className="inline-flex items-center gap-1 rounded-lg border px-2 py-1 text-red-700 hover:bg-red-50 disabled:opacity-50"
                      aria-label={`${u.name} kullanıcısını sil`}
                      title="Sil"
                      disabled={actionDisabled}
                    >
                      <TrashIcon className="h-4 w-4" aria-hidden="true" />
                      <span className="hidden sm:inline">Sil</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmDialog
        open={!!toDelete}
        onClose={() => (busy ? null : setToDelete(null))}
        onConfirm={handleDelete}
        title="Kullanıcıyı sil"
        description={toDelete ? `“${toDelete.name}” silinsin mi?` : ""}
        confirmText="Sil"
        tone="danger"
        busy={busy}
      />
    </>
  );
}
