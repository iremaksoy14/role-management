import React from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  setPage,
  setPageSize,
  selectPage,
  selectPageSize,
  selectTotalCount,
} from "../features/users/userSlice";

import { useTranslation } from "react-i18next";
export default function Pagination() {
  const dispatch = useAppDispatch();
  const page = useAppSelector(selectPage);
  const pageSize = useAppSelector(selectPageSize);
  const total = useAppSelector(selectTotalCount);
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const prev = () => dispatch(setPage(Math.max(1, page - 1)));
  const next = () => dispatch(setPage(Math.min(totalPages, page + 1)));
  const { t } = useTranslation();
  return (
    <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <div className="text-xs text-gray-600">
        Toplam {total} kayıt • Sayfa {page}/{totalPages}
      </div>
      <div className="flex items-center gap-2">
        <label htmlFor="pagesize" className="text-xs text-gray-600">
          {t("common.pageSize")}
        </label>
        <select
          id="pagesize"
          className="rounded-lg  text-line border p-1 text-sm"
          value={pageSize}
          onChange={(e) => dispatch(setPageSize(Number(e.target.value)))}
        >
          {[5, 10, 20, 50].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={prev}
          disabled={page <= 1}
          className="rounded-lg border px-3 py-1 text-line text-sm disabled:opacity-50"
        >
          {t("common.prev")}
        </button>
        <button
          type="button"
          onClick={next}
          disabled={page >= totalPages}
          className="rounded-lg border text-line  px-3 py-1 text-sm disabled:opacity-50"
        >
          {t("common.next")}
        </button>
      </div>
    </div>
  );
}
