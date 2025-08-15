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

const links = [
  {
    Icon: MdOutlineDashboardCustomize,
    text: "Dashboard",
    path: "/dashboard",
  },
  {
    Icon: BiCartDownload,
    text: "Order Topup",
    path: "/topup",
  },
  {
    Icon: BiCartAdd,
    text: "Request Akun",
    path: "/request-account",
  },
  {
    Icon: FaRegUserCircle,
    text: "Data Member",
    path: "/member",
  },
  {
    Icon: IoExtensionPuzzleOutline,
    text: "Settings",
    path: "/settings",
  },
];

export const Navbar = () => {
  const pathname = usePathname();
  console.log("Current Pathname:", pathname);
  // Buat array dari semua path yang valid (termasuk logout)
  const validPaths = [...links.map(link => link.path), "/logout"];
  
  // Cek apakah pathname saat ini ada dalam validPaths
  const isValidPath = validPaths.includes(pathname);
  
  // Jika path tidak valid, hide navbar
  if (!isValidPath) {
    return null;
  }

  return (
    <>
      <div className="bg-black text-white w-full fixed bottom-0 xl:fixed xl:top-0 xl:left-0 xl:w-72 xl:h-screen flex flex-col z-50">
        <div
          className="hidden xl:flex w-full h-32 bg-center bg-no-repeat"
          style={{ backgroundImage: "url(/icon/icon.png)" }}
        />
        <nav className="flex flex-1 flex-row xl:flex-col justify-between py-4 px-5 md:px-20 xl:p-5 2xl:p-10">
          <div className="flex xl:flex-col flex-row gap-2">
            {links.map(({ Icon, text, path }) => (
              <NavLink
                key={path}
                path={path}
                Icon={Icon}
                text={text}
                active={pathname === path}
              />
            ))}
          </div>
          <NavLink path={"/logout"} Icon={MdOutlineLogout} text="Logout" />
        </nav>
      </div>
    </>
  );
};
