"use client";

import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { usePathname } from "next/navigation";

const links = [
  { path: "/dashboard" },
  { path: "/topup" },
  { path: "/request-account" },
  { path: "/member" },
  { path: "/settings" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  // Buat array dari semua path yang valid (termasuk logout)
  const validPaths = [...links.map((link) => link.path), "/logout"];

  // Cek apakah pathname saat ini ada dalam validPaths
  const isValidPath = validPaths.includes(pathname);

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Albert+Sans:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={``}>
        <div className="layout flex min-h-screen">
          <Navbar />
          <main
            className={`w-full min-h-screen pb-20 xl:pb-0 ${
              isValidPath ? "xl:pl-72" : ""
            }`}
          >
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
