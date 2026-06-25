import type { ReactNode } from "react";
import "./globals.css";

export const metadata = {
  title: "Mo-nut",
  description: "Mo-nut PWA foundation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}
