import React from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setSearch, selectSearch } from "../features/users/userSlice";
import { useTranslation } from "react-i18next";

export default function SearchBar() {
  const dispatch = useAppDispatch();
  const value = useAppSelector(selectSearch);
  const { t } = useTranslation();
  return (
    <div className="w-full sm:w-64">
      <label htmlFor="search" className="sr-only text-gray-700">
        {t("userForm.searchByName")}
      </label>
      <input
        id="search"
        type="text"
        placeholder={t("userForm.searchByName")}
        className="w-full text-gray-700 rounded-lg border p-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
        value={value}
        onChange={(e) => dispatch(setSearch(e.target.value))}
      />
    </div>
  );
}
