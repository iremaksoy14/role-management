import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import RoleSelect from "./RoleSelect";
import PermissionsMultiSelect from "./PermissionsMultiSelect";
import type { Permission, Role, User } from "../../types";
import { useAppDispatch } from "../../store/hooks";
import { createUser, updateUser } from "./userSlice";

type Props = {
  open: boolean;
  onClose: () => void;
  initial?: User | null;
};

type FormState = {
  name: string;
  role: Role;
  permissions: Permission[];
};

export default function UserFormDialog({ open, onClose, initial }: Props) {
  const dispatch = useAppDispatch();
  const [form, setForm] = useState<FormState>({
    name: "",
    role: "Patient",
    permissions: [],
  });
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setError(null);
      setSubmitting(false);
      // initial varsa edit modudur
      if (initial) {
        setForm({
          name: initial.name,
          role: initial.role,
          permissions: initial.permissions,
        });
      } else {
        setForm({ name: "", role: "Patient", permissions: [] });
      }
      // odağı ilk inputa taşı
      setTimeout(() => firstInputRef.current?.focus(), 0);
    }
  }, [open, initial]);

  const onChange = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const validate = (): string | null => {
    if (!form.name.trim()) return "İsim zorunludur.";
    if (form.name.trim().length < 2) return "İsim en az 2 karakter olmalı.";
    return null;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const v = validate();
    if (v) {
      setError(v);
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      if (initial) {
        await dispatch(updateUser({ ...initial, ...form })).unwrap();
      } else {
        await dispatch(createUser({ ...form })).unwrap();
      }
      onClose();
    } catch (err: any) {
      setError(String(err || "İşlem hatası"));
    } finally {
      setSubmitting(false);
    }
  };

  const mode = initial ? "edit" : "create";
  const title = initial ? "Kullanıcıyı Düzenle" : "Yeni Kullanıcı Ekle";

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-20" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md rounded-2xl bg-white p-5 shadow-xl">
                <Dialog.Title className="text-lg font-semibold text-gray-700">
                  {title}
                </Dialog.Title>

                <form className="mt-4 space-y-3" onSubmit={onSubmit} noValidate>
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      İsim <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="name"
                      ref={firstInputRef}
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => onChange("name", e.target.value)}
                      aria-invalid={!!error && !form.name.trim()}
                      className="w-full rounded-lg border text-gray-700  p-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Örn. Ayşe Demir"
                    />
                  </div>

                  <RoleSelect
                    value={form.role}
                    onChange={(v) => onChange("role", v)}
                  />

                  <PermissionsMultiSelect
                    value={form.permissions}
                    onChange={(v) => onChange("permissions", v)}
                  />

                  {error && (
                    <p role="alert" className="text-sm text-red-700">
                      {error}
                    </p>
                  )}

                  <div className="mt-2 flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={onClose}
                      className="rounded-lg border px-3 py-2 text-sm text-gray-700 "
                      disabled={submitting}
                    >
                      İptal
                    </button>
                    <button
                      type="submit"
                      className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
                      disabled={submitting}
                      aria-busy={submitting}
                    >
                      {mode === "edit" ? "Kaydet" : "Ekle"}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
