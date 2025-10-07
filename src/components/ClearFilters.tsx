import React from "react";
import { useAppDispatch } from "../store/hooks";
import { setRoleFilter, setSearch } from "../features/users/userSlice";

export default function ClearFilters() {
  const dispatch = useAppDispatch();
  const clearAll = () => {
    dispatch(setSearch(""));
    dispatch(setRoleFilter("all"));
  };
  return (
    <button
      type="button"
      className="mt-3 rounded-lg border px-3 py-2 text-sm text-gray-700"
      onClick={clearAll}
    >
      Filtreleri temizle
    </button>
  );
}
