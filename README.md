Role Management – Case Çalışması

Sağlık kuruluşu için kullanıcı rol ve izin yönetim paneli geliştirilmesi üzerine hazırlanmıştır.
Amaç, modern frontend prensiplerini, state management yaklaşımını, erişilebilirlik (A11y) uygulamalarını ve kullanıcı deneyimi odaklı geliştirmeyi göstermektir.

🚀 Özellikler

👤 Kullanıcı Yönetimi

Kullanıcı listesi görüntüleme
Yeni kullanıcı ekleme
Kullanıcı rol güncelleme (Admin, Doctor, Patient)
Kullanıcı silme
İsim bazlı arama
Role göre filtreleme

🔑 İzin Yönetimi

Kullanıcıya bir veya birden fazla izin atanabilmesi (örn. read, write)

⚡ Performans & UX

Pagination ile uzun listelerde performans optimizasyonu
Boş / tekrar isim kontrolü ve doğrulama
Anlamlı hata/uyarı mesajları
Headless UI bileşenleri ile erişilebilir arayüz

🌍 Çok Dilli Destek (i18next)

react-i18next ile proje Türkçe ve İngilizce desteklemektedir.
Önemli başlıklar, buton metinleri ve hata mesajları çeviriye bağlandı.
Dinamik çeviri interpolasyonu:

🎁 Opsiyonel Ekstralar

Empty / Loading / Error durumlarına özel UI
Küçük test senaryoları (React Testing Library + jest-axe ile A11y testleri)
Memoization & selector optimizasyonları
Basit tema / Design System yaklaşımı

🛠 Kullanılan Teknolojiler

⚛️ React 18
📘 TypeScript
🗂 Redux Toolkit
🎨 Tailwind CSS
♿ Headless UI
⚡ Vite
🧪 Jest, React Testing Library, jest-axe (testler için)

📂 Proje Yapısı ve Kod Standartları

Component / Hook → PascalCase → UserTable.tsx, useUser.ts
Util / Helper → camelCase → formatDate.ts
Klasörler → kebab-case → user-profile/
Importlar → Alias (@/) kullanımı
Barrel → Uygun yerlerde index.ts export
State Yönetimi → features/users/userSlice.ts altında Redux slice’ları, selector’lar ve async thunk’lar
Stil → Tailwind CSS (özelleştirilmiş config ile utility-first)

Commit Mesajları → Anlamlı ve adım adım, tek commit değil süreci yansıtır şekilde

♿ Erişilebilirlik (A11y)

Form alanlarında label, aria-\* ve hata mesajları için role="alert" kullanımı
Headless UI bileşenleri (Dialog, Listbox) → klavye ve screen reader uyumlu
Boş liste / sonuç yok durumlarında anlamlı geri bildirim mesajları
jest-axe ile otomatik erişilebilirlik testleri

🏃‍♂️ Kurulum ve Çalıştırma
cd role-management
npm install
npx json-server --watch db.json --port 3001
npm run dev

NOT:
Case süresince temel gereksinimler tamamlandı. Bonus olarak:

Empty / Loading / Error state’leri
A11y düzenlemeleri
jest-axe tabanlı erişilebilirlik için paket
eklendi.
