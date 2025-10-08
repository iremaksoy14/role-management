Role Management Frontend Case

Bu proje, bir sağlık kuruluşu için kullanıcı yönetim paneli geliştirme senaryosu kapsamında hazırlanmıştır.
Panelde kullanıcılar listelenebilir, yeni kullanıcı eklenebilir, mevcut kullanıcıların rol ve izinleri güncellenebilir, ayrıca kullanıcılar silinebilir.

🚀 Kullanılan Teknolojiler

React (TypeScript) → Modern frontend geliştirme için.
Redux Toolkit → Global state yönetimi (slice & selector yapısı).
Headless UI → Erişilebilir, özelleştirilebilir UI bileşenleri.
Tailwind CSS → Hızlı ve ölçeklenebilir stil yönetimi.
i18next → Çoklu dil desteği.
json-server → Mock API için.

#Kurulum ve Çalıştırma
git clone <repo-url>
cd role-management

#Bağımlılıkları yükleyin:
npm install

#Mock API başlatın:
npx json-server --watch mock-api/db.json --port 3001

#Uygulamayı çalıştırın;
npm run dev



📌 Adlandırma Yaklaşımı

Component/Hook: PascalCase → UserFormDialog.tsx
Utils/Functions: camelCase → formatDate.ts
Klasörler: kebab-case → user-table
Redux Slice: Özelleştirilmiş slice dosyaları → userSlice.ts

📌 State Yönetimi

Redux Toolkit createSlice ile state ayrımı.
Selector kullanımı ile performans optimizasyonu.
Async işlemler için createAsyncThunk.

📌 Stil Yaklaşımı

Tailwind CSS kullanıldı.
Ortak utility class’lar @layer components ile özelleştirildi.
Arka plan renkleri ve tema destekleri tailwind.config.js üzerinden yönetildi.

Özellikler

Kullanıcı Listeleme
Yeni Kullanıcı Ekleme
Kullanıcı Rol ve İzin Güncelleme
Kullanıcı Silme
İsim Bazlı Arama
Role Göre Filtreleme
Pagination
Çoklu Dil Desteği
Hata ve Validasyon Kontrolleri
Accessible UI (aria-label, aria-live, boş liste mesajları vb.)

🎨 Bonus Özellikler

Empty/Loading/Error özel UI’lar
Performans: Memoization & Reselect Selector
Basit tema yaklaşımı (renk paleti & utility class’lar)

🕒 Harcanan Süre

Projenin geliştirilmesi yaklaşık 1.5 gün sürmüştür.
