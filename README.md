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

# Kurulum ve Çalıştırma
git clone <repo-url>
cd role-management

# Bağımlılıkları yükleyin:
npm install

# Mock API başlatın:
npx json-server --watch mock-api/db.json --port 3001

# Uygulamayı çalıştırın;
npm run dev

# Dosya yapısı
role-management/
├── mock-api/                 # Mock API dosyaları
│   └── db.json               # json-server için örnek veritabanı
├── public/                   # Static dosyalar
├── src/                      # Uygulama kaynak kodu
│   ├── __mocks__/            # Test mock dosyaları
│   │   └── react-i18next.js  # i18n için jest mock
│   ├── api/                  # API config ve servisler
│   ├── assets/               # Görseller, ikonlar vb.
│   ├── components/           # Ortak, tekrar kullanılabilir UI bileşenleri
│   ├── features/             # Feature bazlı modüller (örn: users)
│   │   └── users/            # UserSlice, UserTable, RoleFilter, FormDialog vb.
│   ├── helpers/              # Yardımcı fonksiyonlar
│   ├── store/                # Redux store ve custom hooks
│   ├── test-utils/           # Test yardımcıları (RTL setup vb.)
│   ├── App.css               # Global stiller
│   ├── App.tsx               # Ana uygulama bileşeni
│   ├── i18n.ts               # i18next ayarları
│   ├── index.css             # Tailwind giriş noktası
│   ├── main.tsx              # React giriş dosyası
│   └── types.ts              # Global TypeScript tipleri
├── .eslintrc.cjs             # ESLint ayarları
├── tailwind.config.js        # Tailwind konfigürasyonu
├── jest.config.cjs           # Jest test ayarları
├── setupTests.ts             # RTL setup dosyası
├── tsconfig.app.json         # TS app konfig
├── tsconfig.node.json        # TS node konfig
├── vite.config.ts            # Vite ayarları
└── package.json              # Proje bağımlılıkları ve scriptler



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
