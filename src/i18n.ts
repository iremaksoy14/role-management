// src/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  tr: {
    translation: {
      // Genel
      app: { title: "Case Çalışması - Role Yönetimi" },
      common: {
        save: "Kaydet",
        approve: "Onayla",
        cancel: "İptal",
        delete: "Sil",
        edit: "Düzenle",
        search: "Ara",
        clearFilters: "Filtreleri Temizle",
        loading: "Yükleniyor…",
        actions: "Aksiyonlar",
        approveQuestion: "Bu işlemi onaylamak istediğinizden emin misiniz?",
        continue: "İşlem devam ediyor",
        prev: "Önceki",
        next: "Sonraki",
        pageSize: "Sayfa Boyutu",
      },

      userForm: {
        newTitle: "Yeni Kullanıcı",
        editTitle: "Kullanıcı Düzenle",
        name: "Ad",
        desc: "Bu diyalogda kullanıcı adı, rol ve izinleri belirleyip kaydedebilirsiniz.",
        nameLabel: "Ad Soyad",
        nameRequired: "İsim zorunludur",
        nameMin: "İsim en az 2 karakter olmalı",
        duplicate: "Bu isimde bir kullanıcı zaten var.",
        noUser: "Kriterlere uygun kullanıcı bulunamadı",
        searchByName: "İsimle Ara",
        role: "Rol",
        actions: "İşlemler",
        permissions: "İzinler",
      },

      empty: {
        title: "Kayıt Yok",
      },
      // Tablolar
      table: {
        users: "Kullanıcı Listesi",
        name: "Ad",
        role: "Rol",
        permissions: "İzinler",
      },
      // Dialog
      confirm: {
        titleDelete: "Kullanıcıyı sil",
        descDelete: "“{{name}}” silinsin mi?",
        confirm: "Sil",
        cancel: "İptal",
        busy: "İşlem devam ediyor…",
      },
      // Filtreler
      filters: { role: "Rol Filtresi", all: "Tümü" },
      // Roller & İzinler
      role: { Admin: "Admin", Doctor: "Doktor", Patient: "Hasta" },
      perm: { read: "Okuma", write: "Yazma" },
      // Bildirimler (opsiyonel live region)
      live: {
        created: "Kullanıcı eklendi.",
        updated: "Kullanıcı güncellendi.",
        deleted: "Kullanıcı silindi.",
      },
    },
  },
  en: {
    translation: {
      app: { title: "Case Study - Role Management " },
      common: {
        save: "Save",
        cancel: "Cancel",
        delete: "Delete",
        edit: "Edit",
        approve: "Approve",
        search: "Search",
        clearFilters: "Clear Filters",
        loading: "Loading…",
        actions: "Actions",
        approveQuestion: "Are you sure you want to confirm this action?",
        continue: "The process continues…",
        prev: "Prev",
        next: "Next",
        pageSize: "Page Size",
      },
      empty: {
        title: "No records",
      },
      userForm: {
        newTitle: "New User",
        editTitle: "Edit User",
        desc: "You can set and save user's name, role and permissions in this dialog.",
        nameLabel: "Full Name",
        role: "Role",
        name: "Name",
        actions: "Actions",
        nameRequired: "Name is required",
        nameMin: "Name must be at least 2 characters",
        duplicate: "A user with this name already exists.",
        noUser: "User not found that meets the criteria",
        searchByName: "Search By name",
        permissions: "Permissions",
      },
      table: {
        users: "User List",
        name: "Name",
        role: "Role",
        permissions: "Permissions",
      },
      confirm: {
        titleDelete: "Delete user",
        descDelete: "Delete “{{name}}”?",
        confirm: "Delete",
        cancel: "Cancel",
        busy: "Processing…",
      },
      filters: { role: "Role Filter", all: "All" },
      role: { Admin: "Admin", Doctor: "Doctor", Patient: "Patient" },
      perm: { read: "Read", write: "Write" },
      live: {
        created: "User created.",
        updated: "User updated.",
        deleted: "User deleted.",
      },
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "tr",
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
    },
  });

export default i18n;
