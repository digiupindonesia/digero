"use client";

import React from "react";
import NavLink from "./NavLink";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { BiCartDownload } from "react-icons/bi";
import { BiCartAdd } from "react-icons/bi";
import { FaRegUserCircle } from "react-icons/fa";
import { IoExtensionPuzzleOutline } from "react-icons/io5";
import { MdOutlineLogout } from "react-icons/md";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import { useRandomNumberStore } from "@/stores/randomNumber";

const links = [
  {
    Icon: MdOutlineDashboardCustomize,
    text: "Dashboard",
    path: "/dashboard",
    isAdmin: false,
  },
  {
    Icon: BiCartDownload,
    text: "Order Topup",
    path: "/topup",
    isAdmin: false,
  },
  {
    Icon: BiCartAdd,
    text: "Request Akun",
    path: "/request-account",
    isAdmin: false,
  },
  {
    Icon: FaRegUserCircle,
    text: "Data Member",
    path: "/member",
    isAdmin: true,
  },
  {
    Icon: IoExtensionPuzzleOutline,
    text: "Settings",
    path: "/settings",
    isAdmin: false,
  },
];

export const Navbar = () => {
  const pathname = usePathname();
  const { auth } = useAuthStore();
  const { clearAuth } = useAuthStore();
  const {clearNumber} = useRandomNumberStore()
  // Buat array dari semua path yang valid (termasuk logout)
  const validPaths = [...links.map((link) => link.path), "/logout"];

  // Cek apakah pathname saat ini ada dalam validPaths
  const isValidPath = validPaths.includes(pathname);

  // Jika path tidak valid, hide navbar
  if (!isValidPath) {
    return null;
  }

  return (
    <>
      <div className="bg-black text-white w-full fixed bottom-0 xl:fixed xl:top-0 xl:left-0 xl:w-72 xl:h-screen flex flex-col z-50 bg-[radial-gradient(circle_at_25%_25%,oklch(28.6%_0.066_53.813)_0%,transparent_40%),radial-gradient(circle_at_75%_75%,oklch(28.6%_0.066_53.813)_0%,transparent_40%)]">
        <div
          className="hidden xl:flex w-full h-32 bg-center bg-no-repeat"
          style={{ backgroundImage: "url(/icon/icon.png)" }}
        />
        <nav className="flex flex-1 flex-row xl:flex-col justify-between py-4 px-5 md:px-20 xl:p-5 2xl:p-10">
          <div className="flex xl:flex-col flex-row gap-2">
            {links.map(({ Icon, text, path, isAdmin }) => (
              <NavLink
                key={path}
                href={path}
                Icon={Icon}
                text={text}
                active={pathname === path}
                isAdmin={isAdmin} // Pass isAdmin prop
                role={auth?.user?.role} // Pass role prop
              />
            ))}
          </div>
          <NavLink
            href={"/"}
            onClick={() => {
              clearAuth();
              clearNumber();
            }}
            Icon={MdOutlineLogout}
            text="Logout"
          />
        </nav>
      </div>
    </>
  );
};
