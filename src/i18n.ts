// src/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  tr: {
    translation: {
      app: { title: "Hastane Yönetim Paneli" },
      common: {
        save: "Kaydet",
        approve: "Onayla",
        cancel: "İptal",
        delete: "Sil",
        select: "Seçiniz",
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
        notSave: "Kullanıcı kaydedilemedi",
        role: "Rol",
        actions: "İşlemler",
        saveOptions:
          "Bu diyalogda kullanıcı adı, rol ve izinleri belirleyip kaydedebilirsiniz.",
        permissions: "İzinler",
      },

      empty: {
        title: "Kayıt Yok",
      },

      table: {
        users: "KULLANICI LİSTESİ",
        name: "Ad",
        role: "Rol",
        permissions: "İzinler",
      },

      confirm: {
        titleDelete: "Kullanıcıyı sil",
        descDelete: "“{{name}}” silinsin mi?",
        confirm: "Sil",
        cancel: "İptal",
        busy: "İşlem devam ediyor…",
      },
      errors: {
        load: "Yükleme hatası",
        create: "Oluşturma hatası",
        update: "Güncelleme hatası",
        delete: "Silme hatası",
        duplicate: "Aynı isim zaten mevcut",
      },
      roleFilter: {
        all: "Tümü",
        Admin: "Admin",
        Doctor: "Doktor",
        Patient: "Hasta",
      },

      filters: { role: "Rol Filtresi", all: "Tümü" },

      role: { Admin: "Admin", Doctor: "Doktor", Patient: "Hasta" },
      perm: { read: "Okuma", write: "Yazma" },

      live: {
        created: "Kullanıcı eklendi.",
        updated: "Kullanıcı güncellendi.",
        deleted: "Kullanıcı silindi.",
      },
    },
  },
  en: {
    translation: {
      app: { title: "Hospital Management Panel " },
      common: {
        save: "Save",
        cancel: "Cancel",
        delete: "Delete",
        edit: "Edit",
        approve: "Approve",
        select: "Please select",
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
        notSave: "Failed to save user",
        saveOptions:
          "In this dialog you can specify and save the username, role and permissions.",
      },
      table: {
        users: "USER LIST",
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
      errors: {
        load: "Loading error",
        create: "Creation error",
        update: "Update error",
        delete: "Delete error",
        duplicate: "The same name already exists",
      },
      roleFilter: {
        all: "All",
        Admin: "Admin",
        Doctor: "Doctor",
        Patient: "Patient",
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
