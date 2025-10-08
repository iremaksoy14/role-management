import type { TOptions } from "i18next";
export type Role = "Admin" | "Doctor" | "Patient";
export type Permission = "read" | "write";

export const ROLES: Role[] = ["Admin", "Doctor", "Patient"];
export const PERMISSIONS: Permission[] = ["read", "write"];

export interface User {
  id: string;
  name: string;
  role: Role;
  permissions: Permission[];
}

export type Status = "idle" | "loading" | "error";
export type RoleFilter = Role | "all";
export interface I18nError {
  key: string;
  params?: TOptions;
}
export interface UsersState {
  items: User[];
  status: Status;
  error: I18nError | null;
  search: string;
  roleFilter: RoleFilter;
  page: number;
  pageSize: number;
}
