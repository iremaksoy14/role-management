import React from "react";
import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import type { Role, User } from "../../types";
import { initialUsers } from "../../mocks/initialUsers";

// ------------------------
// Helpers
// ------------------------
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
const genId = () =>
  globalThis.crypto && "randomUUID" in globalThis.crypto
    ? globalThis.crypto.randomUUID()
    : `u-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

// ------------------------
// State types
// ------------------------
type Status = "idle" | "loading" | "error";
type RoleFilter = Role | "all";

export interface UsersState {
  items: User[];
  status: Status;
  error: string | null;
  search: string;
  roleFilter: RoleFilter;
  page: number; // 1-indexed
  pageSize: number;
}

const initialState: UsersState = {
  items: [],
  status: "idle",
  error: null,
  search: "",
  roleFilter: "all",
  page: 1,
  pageSize: 10,
};

// RootState import etmeyelim; yapısal bir tip tanımlayalım
type RootLike = { users: UsersState };

// ------------------------
// Thunks (şimdilik mock üzerinden)
// ------------------------
export const fetchUsers = createAsyncThunk<User[]>("users/fetch", async () => {
  await delay(300);
  return initialUsers;
});

export const createUser = createAsyncThunk<User, Omit<User, "id">>(
  "users/create",
  async (data, { getState, rejectWithValue }) => {
    await delay(250);
    const state = getState() as RootLike;
    const exists = state.users.items.some(
      (u) => u.name.trim().toLowerCase() === data.name.trim().toLowerCase()
    );
    if (exists) return rejectWithValue("Aynı isim zaten mevcut") as any;
    return { ...data, id: genId() };
  }
);

export const updateUser = createAsyncThunk<User, User>(
  "users/update",
  async (data, { getState, rejectWithValue }) => {
    await delay(250);
    const state = getState() as RootLike;
    const exists = state.users.items.some(
      (u) =>
        u.id !== data.id &&
        u.name.trim().toLowerCase() === data.name.trim().toLowerCase()
    );
    if (exists) return rejectWithValue("Aynı isim zaten mevcut") as any;
    return data;
  }
);

export const deleteUser = createAsyncThunk<string, string>(
  "users/delete",
  async (id) => {
    await delay(200);
    return id;
  }
);

// ------------------------
// Slice
// ------------------------
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
      state.page = 1;
    },
    setRoleFilter(state, action: PayloadAction<RoleFilter>) {
      state.roleFilter = action.payload;
      state.page = 1;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = Math.max(1, action.payload);
    },
    setPageSize(state, action: PayloadAction<number>) {
      state.pageSize = Math.max(1, action.payload);
      state.page = 1;
    },
  },
  extraReducers: (builder) => {
    // fetch
    builder.addCase(fetchUsers.pending, (s) => {
      s.status = "loading";
      s.error = null;
    });
    builder.addCase(fetchUsers.fulfilled, (s, a) => {
      s.status = "idle";
      s.items = a.payload;
      s.error = null;
    });
    builder.addCase(fetchUsers.rejected, (s, a) => {
      s.status = "error";
      s.error = String(a.error.message || "Yükleme hatası");
    });

    // create
    builder.addCase(createUser.pending, (s) => {
      s.status = "loading";
      s.error = null;
    });
    builder.addCase(createUser.fulfilled, (s, a) => {
      s.status = "idle";
      s.items.unshift(a.payload);
    });
    builder.addCase(createUser.rejected, (s, a) => {
      s.status = "error";
      s.error = String(a.payload || a.error.message || "Oluşturma hatası");
    });

    // update
    builder.addCase(updateUser.pending, (s) => {
      s.status = "loading";
      s.error = null;
    });
    builder.addCase(updateUser.fulfilled, (s, a) => {
      s.status = "idle";
      const i = s.items.findIndex((u) => u.id === a.payload.id);
      if (i !== -1) s.items[i] = a.payload;
    });
    builder.addCase(updateUser.rejected, (s, a) => {
      s.status = "error";
      s.error = String(a.error.message || "Güncelleme hatası");
    });

    // delete
    builder.addCase(deleteUser.pending, (s) => {
      s.status = "loading";
      s.error = null;
    });
    builder.addCase(deleteUser.fulfilled, (s, a) => {
      s.status = "idle";
      s.items = s.items.filter((u) => u.id !== a.payload);
    });
    builder.addCase(deleteUser.rejected, (s, a) => {
      s.status = "error";
      s.error = String(a.error.message || "Silme hatası");
    });
  },
});

export const { setSearch, setRoleFilter, setPage, setPageSize } =
  usersSlice.actions;
export default usersSlice.reducer;

// ------------------------
// Selectors (RootState importu yok; RootLike kullanılıyor)
// ------------------------
export const selectUsersState = (state: RootLike) => state.users;
export const selectItems = (state: RootLike) => state.users.items;
export const selectStatus = (state: RootLike) => state.users.status;
export const selectError = (state: RootLike) => state.users.error;
export const selectSearch = (state: RootLike) => state.users.search;
export const selectRole = (state: RootLike) => state.users.roleFilter;
export const selectPage = (state: RootLike) => state.users.page;
export const selectPageSize = (state: RootLike) => state.users.pageSize;

export const selectFilteredUsers = createSelector(
  [selectItems, selectSearch, selectRole],
  (items, search, role) => {
    const q = search.trim().toLowerCase();
    return items.filter((u) => {
      const okName = q ? u.name.toLowerCase().includes(q) : true;
      const okRole = role === "all" ? true : u.role === role;
      return okName && okRole;
    });
  }
);

export const selectTotalCount = createSelector(
  [selectFilteredUsers],
  (list) => list.length
);

export const selectPagedUsers = createSelector(
  [selectFilteredUsers, selectPage, selectPageSize],
  (list, page, pageSize) => {
    const start = (page - 1) * pageSize;
    return list.slice(start, start + pageSize);
  }
);
