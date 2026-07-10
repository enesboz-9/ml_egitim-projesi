import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "ML Akademi — Python'dan YOLO'ya AI Engineer Yol Haritası",
  description:
    "Sıfırdan AI/Computer Vision mühendisliğine: 22 modüllük dallanan müfredat, interaktif yol haritası ve terim sözlüğü.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className="font-body bg-graphite-950 text-paper antialiased">
        <header className="sticky top-0 z-30 border-b border-graphite-700 bg-graphite-950/90 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <Link href="/" className="flex items-center gap-2 font-display text-lg font-semibold tracking-tight">
              <span className="inline-block h-2 w-2 rounded-full bg-signal-teal" />
              ML<span className="text-signal-teal">/</span>Akademi
            </Link>
            <nav className="flex items-center gap-6 font-mono text-xs uppercase tracking-wider text-muted">
              <Link href="/" className="transition-colors hover:text-signal-teal">
                Yol Haritası
              </Link>
              <Link href="/sozluk" className="transition-colors hover:text-signal-teal">
                Sözlük
              </Link>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="border-t border-graphite-700 py-10">
          <div className="mx-auto max-w-6xl px-6 font-mono text-xs text-muted">
            <p>ML Akademi — Python temellerinden YOLO tabanlı nesne tespitine, 22 modüllük müfredat.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
