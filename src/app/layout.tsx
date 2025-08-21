"use client";

import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { useAuthStore } from "@/stores/useAuthStore";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

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
  const { isHydrated, auth } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  // path valid untuk layout dengan sidebar
  const validPaths = [...links.map((link) => link.path), "/logout"];
  const isValidPath = validPaths.includes(pathname);

  useEffect(() => {
    if (!isHydrated) return;
    if (!auth && pathname !== "/") {
      router.replace("/");
    }
  }, [isHydrated, auth, pathname, router]);

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
      <body>
        {!isHydrated ? null : !auth && pathname !== "/" ? null : (
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
        )}
      </body>
    </html>
  );
}
