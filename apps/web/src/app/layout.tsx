import type { ReactNode } from "react";
import "./globals.css";
import { PWARegistrator } from "./pwa-registrator";

export const metadata = {
  title: "Mo-nut",
  description: "Mo-nut PWA foundation",
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
