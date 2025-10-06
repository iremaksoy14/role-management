import React, { useState, useEffect } from "react";
import "./App.css";

import { useAppDispatch, useAppSelector } from "./store/hooks";
import {
  fetchUsers,
  selectPagedUsers,
  selectTotalCount,
  selectStatus,
  selectError,
} from "./features/users/userSlice";

import Layout from "./components/Layout";
import SearchBar from "./components/SearchBar";
import RoleFilter from "./features/users/RoleFilter";
import Pagination from "./components/Pagination";
import UserFormDialog from "./features/users/UserFormDialog";
import Loader from "./components/Loader";
import ErrorAlert from "./components/ErrorAlert";
import EmptyState from "./components/EmptyState";
import UserTable from "./features/users/UserTable";
import TableSkeleton from "./components/TableSkeleton";

import { PlusIcon } from "@heroicons/react/24/outline";
import type { User } from "./types";
import ClearFilters from "./components/ClearFilters";

function App() {
  const [count, setCount] = useState(0);
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectPagedUsers);
  const total = useAppSelector(selectTotalCount);
  const status = useAppSelector(selectStatus);
  const error = useAppSelector(selectError);

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<User | null>(null);

  const onCreate = () => {
    setEditing(null);
    setOpen(true);
  };
  const onEdit = (u: User) => {
    setEditing(u);
    setOpen(true);
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <>
      <Layout>
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col sm:flex-row gap-2">
            <SearchBar />
            <RoleFilter />
          </div>
          <div className="flex items-center gap-3">
            {status === "loading" && <Loader />}
            <button
              type="button"
              onClick={onCreate}
              className="inline-flex items-center gap-2 rounded-lg bg-line px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700"
            >
              <PlusIcon className="h-4 w-4" aria-hidden="true" />
              Yeni Kullanıcı
            </button>
          </div>
        </div>

        <ErrorAlert message={error} />

        {status === "loading" && total === 0 ? (
          <TableSkeleton rows={8} />
        ) : total === 0 && status === "idle" ? (
          <>
            <EmptyState text="Kriterlere uygun kullanıcı bulunamadı." />
            <ClearFilters />
          </>
        ) : (
          <UserTable onEdit={onEdit} />
        )}

        <Pagination />
      </Layout>
      <UserFormDialog
        open={open}
        initial={editing}
        onClose={() => setOpen(false)}
      />
    </>
  );
}

export default App;
