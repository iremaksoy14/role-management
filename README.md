Bu proje, bir sağlık kuruluşu için kullanıcı rol ve izin yönetim paneli geliştirilmesi üzerine hazırlanmıştır.
Amaç, modern frontend prensiplerini, state management yaklaşımını, erişilebilirlik (A11y) uygulamalarını ve kullanıcı deneyimi odaklı geliştirmeyi göstermektir.

-Özellikler
Kullanıcı Yönetimi
Kullanıcı listesi görüntüleme
Yeni kullanıcı ekleme
Kullanıcı rol güncelleme (Admin, Doctor, Patient)
Kullanıcı silme
İsim bazlı arama
Role göre filtreleme
İzin Yönetimi
Kullanıcıya bir veya birden fazla izin (read, write) atanabilmesi
Performans & UX
Pagination ile uzun listelerde performans optimizasyonu
Boş/tekrar isim kontrolü ve doğrulama
Anlamlı hata/uyarı mesajları
Headless UI bileşenleri ile erişilebilir arayüz
Opsiyonel Ekstralar
Empty/Loading/Error durumlarına özel UI
Küçük test senaryoları (React Testing Library)
Memoization & selector optimizasyonları
Basit tema/Design System yaklaşımı

-Kullanılan Teknolojiler
React 18
TypeScript
Redux Toolkit
Tailwind CSS
Headless UI
Vite

-Adlandırma Tercihleri
Component/Hook: PascalCase → UserCard.tsx, useUser.ts
Dosya/Utils: camelCase → formatDate.ts
Klasörler: kebab-case → user-profile/
Importlar: Alias (@/) kullanımı
Barrel: Kullanıldığı yerlerde index.ts ile export

-Stil Yönetimi
TailwindCSS kullanıldı, tailwind.config.js özelleştirildi.
Ortak stiller ve temalar utility-first mantığında yönetildi.
Erişilebilirlik için kontrast ve aria özelliklerine dikkat edildi.

-Erişilebilirlik (A11y)
Form alanlarında label ve aria-\* kullanımı
Headless UI ile klavye ve screen reader uyumlu bileşenler
Boş liste/sonuç yok durumlarında anlamlı geri bildirim mesajları

-Çalıştırma

# Klasöre gir

cd role-management

# Bağımlılıkları yükle

npm install

# Geliştirme sunucusu

npm run dev
