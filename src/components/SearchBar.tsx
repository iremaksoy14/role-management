import React from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setSearch, selectSearch } from "../features/users/userSlice";

export default function SearchBar() {
  const dispatch = useAppDispatch();
  const value = useAppSelector(selectSearch);

  return (
    <div className="w-full sm:w-64">
      <label htmlFor="search" className="sr-only">
        İsimle ara
      </label>
      <input
        id="search"
        type="search"
        placeholder="İsimle ara…"
        className="w-full rounded-lg border p-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
        value={value}
        onChange={(e) => dispatch(setSearch(e.target.value))}
      />
    </div>
  );
}
