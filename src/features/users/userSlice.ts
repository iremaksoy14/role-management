import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import type { User, RoleFilter, UsersState } from "../../types";
import { BASE_URL } from "@/api/config";

const initialState: UsersState = {
  items: [],
  status: "idle",
  mutating: false,
  error: null,
  search: "",
  roleFilter: "all",
  page: 1,
  pageSize: 10,
};

export type RootLike = { users: UsersState };

export const fetchUsers = createAsyncThunk<User[]>("users/fetch", async () => {
  const res = await fetch(`${BASE_URL}/users`);
  if (!res.ok) throw new Error("Yükleme hatası");
  const data = await res.json();

  return (data as any[]).map((u) => ({ ...u, id: String(u.id) })) as User[];
});

export const createUser = createAsyncThunk<
  User,
  Omit<User, "id">,
  { state: RootLike; rejectValue: string }
>("users/create", async (payload, { getState, rejectWithValue }) => {
  const lower = payload.name.trim().toLowerCase();
  const exists = (getState().users.items || []).some(
    (u) => u.name.trim().toLowerCase() === lower
  );
  if (exists) return rejectWithValue("errors.duplicate");

  const res = await fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) return rejectWithValue("errors.create");

  const created = await res.json();
  return { ...created, id: String(created.id) } as User;
});

export const updateUser = createAsyncThunk<
  User,
  User,
  { state: RootLike; rejectValue: string }
>("users/update", async (payload, { getState, rejectWithValue }) => {
  const lower = payload.name.trim().toLowerCase();
  const exists = (getState().users.items || []).some(
    (u) => u.id !== payload.id && u.name.trim().toLowerCase() === lower
  );
  if (exists) return rejectWithValue("errors.duplicate");

  const res = await fetch(`${BASE_URL}/users/${payload.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) return rejectWithValue("errors.update");

  const updated = await res.json();
  return { ...updated, id: String(updated.id) } as User;
});

export const deleteUser = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("users/delete", async (id, { rejectWithValue }) => {
  const res = await fetch(`${BASE_URL}/users/${id}`, { method: "DELETE" });
  if (!res.ok) return rejectWithValue("errors.delete");
  return id;
});

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
      s.error = { key: "errors.load" };
    });

    // create
    builder.addCase(createUser.pending, (s) => {
      s.mutating = true;
      s.error = null;
    });
    builder.addCase(createUser.fulfilled, (s, a) => {
      s.mutating = false;
      s.items.unshift(a.payload);
    });
    builder.addCase(createUser.rejected, (s, a) => {
      s.mutating = false;
      s.error =
        typeof a.payload === "string"
          ? { key: a.payload }
          : { key: "errors.create" };
    });

    // update
    builder.addCase(updateUser.pending, (s) => {
      s.mutating = true;
      s.error = null;
    });
    builder.addCase(updateUser.fulfilled, (s, a) => {
      s.mutating = false;
      const i = s.items.findIndex((u) => u.id === a.payload.id);
      if (i !== -1) s.items[i] = a.payload;
    });
    builder.addCase(updateUser.rejected, (s, a) => {
      s.mutating = false;
      s.error =
        typeof a.payload === "string"
          ? { key: a.payload }
          : { key: "errors.update" };
    });

    // delete
    builder.addCase(deleteUser.pending, (s) => {
      s.mutating = true;
      s.error = null;
    });
    builder.addCase(deleteUser.fulfilled, (s, a) => {
      s.mutating = false;
      s.items = s.items.filter((u) => u.id !== a.payload);
    });
    builder.addCase(deleteUser.rejected, (s, a) => {
      s.mutating = false;
      s.error = { key: "errors.delete" };
    });
  },
});

export const { setSearch, setRoleFilter, setPage, setPageSize } =
  usersSlice.actions;
export default usersSlice.reducer;

export const selectUsersState = (state: RootLike) => state.users;
export const selectItems = (state: RootLike) => state.users.items;
export const selectStatus = (state: RootLike) => state.users.status;
export const selectError = (state: RootLike) => state.users.error;
export const selectSearch = (state: RootLike) => state.users.search;
export const selectRole = (state: RootLike) => state.users.roleFilter;
export const selectPage = (state: RootLike) => state.users.page;
export const selectPageSize = (state: RootLike) => state.users.pageSize;
export const selectMutating = (state: RootLike) => state.users.mutating;

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
