# ML Akademi

Python temellerinden YOLO tabanlı nesne tespitine, 22 modüllük dallanan bir AI/Computer
Vision müfredatını anlatan içerik sitesi. Next.js 14 (App Router) + TypeScript + Tailwind CSS
ile yazıldı; harici bir veritabanı veya backend gerektirmez, tamamen statik olarak üretilir.

## Hızlı başlangıç

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # production build (statik sayfalar üretir)
npm run start     # production build'i lokal çalıştırma
```

## Klasör yapısı

```
src/
  app/
    layout.tsx             kök layout, header/footer, font ve metadata tanımları
    page.tsx                ana sayfa: hero + interaktif roadmap + tüm modül listesi
    not-found.tsx           özel 404 sayfası
    icon.svg                favicon (devre şeması teması)
    sitemap.ts              /sitemap.xml üretimi
    robots.ts               /robots.txt üretimi
    modul/[slug]/page.tsx   her modül/alt-modül için dinamik detay sayfası
    sozluk/page.tsx         TR-EN terim sözlüğü (arama/filtreleme ile)
  components/
    Roadmap.tsx             ana sayfadaki interaktif "devre şeması" (SVG + tıklanabilir düğümler)
    BranchCard.tsx          yan dal (opsiyonel derinlik) kartı
    ScopeFrame.tsx          görsel/interaktif alan yer tutucusu ("yakında")
    TermChip.tsx            TR-EN terim etiketi
    GlossarySearch.tsx      sözlük arama input'u (client component)
  lib/
    curriculum.ts           TÜM müfredat verisi: 22 modül, alt modüller, ana yol adımları,
                            yan dallar, terimler, örnek görevler, köprüler (cross-link)
```

## İçeriği güncellemek

Tüm müfredat içeriği tek bir dosyada, tipli (TypeScript) veri olarak tutulur:
**`src/lib/curriculum.ts`**. Yeni bir modül eklemek, bir açıklamayı güncellemek veya bir
yan dal eklemek istediğinde sadece bu dosyayı düzenlemen yeterli — sayfalar bu veriden
otomatik olarak üretilir (`generateStaticParams` ile).

- `mainPath`: modülün zorunlu/sıralı "ana yol" adımları (her biri `{ title, desc }`)
- `branches`: opsiyonel derinlik sunan "yan dallar"
- `bridges`: başka bir modüle kavramsal köprü (roadmap'te kesikli amber ok olarak görünür)
- `terms`: modüle özel TR-EN terimler (otomatik olarak `/sozluk` sayfasında da toplanır)

## Tasarım dili

- Renkler: grafit tonları zemin, **teal** = ana yol, **amber** = yan dal/köprü
- Tipografi: Space Grotesk (başlık), Inter (gövde), JetBrains Mono (terim/kod/numaralandırma)
- Fontlar `@fontsource` paketleriyle yerel olarak paketlenir (Google Fonts'a network
  bağımlılığı yoktur)

## Henüz yapılmayanlar (bilinçli olarak ertelenen)

- Görsel/interaktif alanlar (`ScopeFrame`) şu an yer tutucu; gerçek interaktif demolar
  (IoU hesaplayıcı, gradient descent simülasyonu, augmentation önizlemesi vb.) ayrı
  bileşenler olarak eklenmeyi bekliyor.
- Bölüm 22'deki ilerleme takip checklist'i henüz fonksiyonel değil (state/kalıcılık
  gerektirir — örn. tarayıcı state'i veya bir backend).

## Deploy

Proje tamamen statik olduğu için Vercel'e GitHub reposunu bağlamak yeterli;
ekstra ortam değişkeni veya build ayarı gerekmez.
