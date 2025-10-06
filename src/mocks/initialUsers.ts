import type { User } from "../types";

export const initialUsers: User[] = [
  { id: 'u-01', name: 'Ayşe Demir',     role: 'Admin',  permissions: ['read','write'] },
  { id: 'u-02', name: 'Mehmet Çelik',   role: 'Doctor', permissions: ['read','write'] },
  { id: 'u-03', name: 'Elif Yılmaz',    role: 'Patient',permissions: ['read'] },
  { id: 'u-04', name: 'Can Aydın',      role: 'Doctor', permissions: ['read'] },
  { id: 'u-05', name: 'Zeynep Koç',     role: 'Admin',  permissions: ['read','write'] },
  { id: 'u-06', name: 'Deniz Arslan',   role: 'Patient',permissions: ['read'] },
  { id: 'u-07', name: 'Selin Aksoy',    role: 'Doctor', permissions: ['read','write'] },
  { id: 'u-08', name: 'Okan Erdem',     role: 'Patient',permissions: ['read'] },
  { id: 'u-09', name: 'Ece Karaca',     role: 'Doctor', permissions: ['read'] },
  { id: 'u-10', name: 'Burak Yıldız',   role: 'Admin',  permissions: ['read','write'] },
  { id: 'u-11', name: 'Hakan Öz',       role: 'Patient',permissions: ['read'] },
  { id: 'u-12', name: 'İrem Akın',      role: 'Doctor', permissions: ['read','write'] },
  { id: 'u-13', name: 'Mert Güneş',     role: 'Doctor', permissions: ['read'] },
  { id: 'u-14', name: 'Gizem Uçar',     role: 'Patient',permissions: ['read'] },
  { id: 'u-15', name: 'Tolga Kurt',     role: 'Admin',  permissions: ['read','write'] },
  { id: 'u-16', name: 'Duygu Sarı',     role: 'Doctor', permissions: ['read','write'] },
  { id: 'u-17', name: 'Berk Ünal',      role: 'Patient',permissions: ['read'] },
  { id: 'u-18', name: 'Naz Kıran',      role: 'Doctor', permissions: ['read'] },
];
