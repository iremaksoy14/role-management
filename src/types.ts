export type Role = 'Admin' | 'Doctor' | 'Patient';
export type Permission = 'read' | 'write';

export const ROLES: Role[] = ['Admin', 'Doctor', 'Patient'];
export const PERMISSIONS: Permission[] = ['read', 'write'];

export interface User {
  id: string;
  name: string;
  role: Role;
  permissions: Permission[];
}
