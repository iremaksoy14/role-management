import React, { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useTranslation } from "react-i18next";

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description?: string;

  tone?: "default" | "danger";
  busy?: boolean;
};

export default function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  description,

  tone = "default",
  busy = false,
}: Props) {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const { t } = useTranslation();
  const confirmClass =
    tone === "danger"
      ? "bg-red-600 hover:bg-red-700"
      : "bg-indigo-600 hover:bg-indigo-700";

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-30"
        onClose={(_) => onClose()}
        initialFocus={cancelRef}
      >
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

                <Dialog.Description className="mt-2 text-sm text-gray-600">
                  {description ?? t("common.approveQuestion")}
                </Dialog.Description>

                {busy && (
                  <div role="status" aria-live="polite" className="sr-only">
                    {t("common.continue")}
                  </div>
                )}

                <div className="mt-4 flex items-center justify-end gap-2">
                  <button
                    ref={cancelRef}
                    type="button"
                    className="rounded-lg border px-3 py-2 text-sm text-line"
                    onClick={onClose}
                    disabled={busy}
                  >
                    {t("common.cancel")}
                  </button>
                  <button
                    type="button"
                    className={`rounded-lg px-3 py-2 text-sm font-medium text-white disabled:opacity-50 ${confirmClass}`}
                    onClick={onConfirm}
                    disabled={busy}
                    aria-busy={busy}
                  >
                    {t("common.delete")}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
