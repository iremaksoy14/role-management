import React, { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { ROLES, type Role } from "../../types";
import { useTranslation } from "react-i18next";

type Props = {
  value: Role;
  onChange: (v: Role) => void;
  label?: string;
  id?: string;
};

export default function RoleSelect({
  value,
  onChange,
  label,
  id = "role",
}: Props) {
  const { t } = useTranslation();
  const fieldLabel = label ?? t("userForm.role");
  const roleLabel = (r: Role) => t(`role.${r}`);
  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className="mb-1 block text-sm font-medium text-gray-700"
      >
        {fieldLabel}
      </label>
      <Listbox value={value} onChange={onChange}>
        <div className="relative">
          <Listbox.Button
            id={id}
            className="relative w-full cursor-default rounded-lg border bg-white py-2 pl-3 pr-10 text-left text-sm text-gray-700
                       focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label={t("userForm.role")}
          >
            <span className="block truncate">{roleLabel(value)}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-4 w-4 text-gray-500"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-white py-1 text-sm shadow-lg">
              {ROLES.map((opt) => (
                <Listbox.Option
                  key={opt}
                  value={opt}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-8 pr-3 ${
                      active ? "bg-indigo-50 text-indigo-700" : "text-gray-900"
                    }`
                  }
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {roleLabel(opt)}
                      </span>
                      {selected && (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-indigo-600">
                          <CheckIcon className="h-4 w-4" aria-hidden="true" />
                        </span>
                      )}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
