import React from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setRoleFilter, selectRole } from "./userSlice";

import { ROLES, type Role } from "../../types";

type Option = Role | "all";
const OPTIONS: Option[] = ["all", ...ROLES];
const labelMap: Record<Option, string> = {
  all: "Tümü",
  Admin: "Admin",
  Doctor: "Doctor",
  Patient: "Patient",
};

export default function RoleFilter() {
  const dispatch = useAppDispatch();
  const value = useAppSelector(selectRole);

  return (
    <div className="w-full sm:w-48">
      <Listbox
        value={value}
        onChange={(v: Option) => dispatch(setRoleFilter(v))}
      >
        <div className="relative">
          <Listbox.Button
            className="relative w-full text-gray-700 cursor-default rounded-lg border bg-white py-2 pl-3 pr-10 text-left text-sm
                       focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Role göre filtrele"
          >
            <span className="block truncate">{labelMap[value as Option]}</span>
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
              {OPTIONS.map((opt) => (
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
                        {labelMap[opt]}
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
