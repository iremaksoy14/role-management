import React, { useState, useRef, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { createUser, updateUser } from "./userSlice";
import RoleSelect from "./RoleSelect";
import PermissionsMultiSelect from "./PermissionsMultiSelect";
import { type Permission } from "@/types";
import { useTranslation } from "react-i18next";

type Props = {
  open: boolean;
  initial?: any;
  onClose: () => void;
};

export default function UserFormDialog({ open, initial, onClose }: Props) {
  const cancelButtonRef = useRef<HTMLButtonElement>(null);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const [name, setName] = useState(initial?.name ?? "");
  const [role, setRole] = useState(initial?.role ?? "Patient");
  const [permissions, setPermissions] = useState<Permission[]>(
    initial?.permissions ?? []
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string>("");

  useEffect(() => {
    if (open) {
      setName(initial?.name ?? "");
      setRole(initial?.role ?? "Patient");
      setPermissions(initial?.permissions ?? []);
      setErrors({});
      setFormError("");
    }
  }, [open, initial]);

  const users = useAppSelector(
    (state: any) =>
      state.users.items || state.users.list || state.users.data || []
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    const trimmed = name.trim();
    const nextErrors: Record<string, string> = {};
    if (!trimmed) nextErrors["name"] = "İsim zorunludur";
    if (trimmed.length < 2) nextErrors["name"] = "İsim en az 2 karakter olmalı";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const lower = trimmed.toLocaleLowerCase("tr-TR");
    const hasDuplicate = users.some(
      (u: any) =>
        u.name &&
        u.name.toLocaleLowerCase("tr-TR") === lower &&
        (!initial || u.id !== initial.id)
    );
    if (hasDuplicate) {
      setFormError("Bu isimde bir kullanıcı zaten var.");
      return;
    }

    try {
      if (initial) {
        await dispatch(
          updateUser({ ...initial, name: trimmed, role, permissions })
        ).unwrap();
      } else {
        await dispatch(
          createUser({ name: trimmed, role, permissions })
        ).unwrap();
      }
      onClose();
    } catch (err: any) {
      setFormError("Kullanıcı kaydedilemedi: " + err.message);
    }
  };

  return (
    <Transition appear show={open} as={React.Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={(_) => onClose()}
        initialFocus={cancelButtonRef}
      >
        <div className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel
            key={initial?.id ?? "new"}
            className="w-full max-w-md rounded bg-white p-6"
          >
            <Dialog.Title className="text-lg text-gray-700 font-medium mb-2">
              {initial ? t("userForm.editTitle") : t("userForm.newTitle")}
            </Dialog.Title>

            <Dialog.Description className="sr-only">
              Bu diyalogda kullanıcı adı, rol ve izinleri belirleyip
              kaydedebilirsiniz.
            </Dialog.Description>

            {formError && (
              <div
                id="form-error"
                role="alert"
                aria-live="assertive"
                className="mb-3 rounded-md bg-red-50 text-red-700 p-2"
              >
                {formError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t("userForm.name")}
                  <span className="text-red-600" aria-hidden="true">
                    *
                  </span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  aria-describedby="name-error"
                  aria-invalid={!!errors.name}
                  className="mt-1 bg-white block w-full rounded-md border border-gray-300 p-2 text-gray-700"
                />
                {errors.name && (
                  <p
                    id="name-error"
                    role="alert"
                    aria-live="polite"
                    className="mt-1 text-sm text-red-600"
                  >
                    {errors.name}
                  </p>
                )}
              </div>

              <RoleSelect value={role} onChange={setRole} />
              <PermissionsMultiSelect
                value={permissions}
                onChange={setPermissions}
              />

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  ref={cancelButtonRef}
                  onClick={onClose}
                  className="rounded bg-gray-200 px-4 py-2 text-gray-700"
                >
                  {t("common.cancel")}
                </button>
                <button
                  type="submit"
                  className="rounded bg-line px-4 py-2 text-white"
                >
                  {t("common.save")}
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
}
