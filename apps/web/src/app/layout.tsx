import type { ReactNode } from "react";
import "./globals.css";
import { PWARegistrator } from "./pwa-registrator";

export const metadata = {
  title: "Mo-nut",
  description: "Mo-nut PWA — แอปพลิเคชันดูแลสุขภาพ",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Mo-nut",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0f172a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="th">
      <head>
        {/* Thai font preload */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@400;500;600;700&family=Sarabun:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />

        {/* iOS PWA meta tags */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Mo-nut" />
        <link rel="apple-touch-icon" href="/icons/icon-192.svg" />
        <link rel="mask-icon" href="/icons/icon-192.svg" color="#0f172a" />

        {/* Safe area viewport for notched devices */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body>
        {children}
        <PWARegistrator />
      </body>
    </html>
  );
}
