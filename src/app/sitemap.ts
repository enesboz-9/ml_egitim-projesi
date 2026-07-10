import type { MetadataRoute } from "next";
import { curriculum } from "@/lib/curriculum";

// Deploy sonrası gerçek domain'i buraya (veya NEXT_PUBLIC_SITE_URL ortam
// değişkenine) yazman yeterli — sitemap ve robots.txt otomatik güncellenir.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ml-egitim-projesi.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/sozluk`, changeFrequency: "monthly", priority: 0.6 },
  ];

  const moduleRoutes: MetadataRoute.Sitemap = [];
  for (const mod of curriculum) {
    moduleRoutes.push({
      url: `${SITE_URL}/modul/${mod.slug}`,
      changeFrequency: "monthly",
      priority: 0.8,
    });
    if (mod.subModules) {
      for (const sub of mod.subModules) {
        moduleRoutes.push({
          url: `${SITE_URL}/modul/${sub.slug}`,
          changeFrequency: "monthly",
          priority: 0.7,
        });
      }
    }
  }

  return [...staticRoutes, ...moduleRoutes];
}
