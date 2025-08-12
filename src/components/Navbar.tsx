import React from "react";
import NavLink from "./NavLink";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { BiCartDownload } from "react-icons/bi";
import { BiCartAdd } from "react-icons/bi";
import { FaRegUserCircle } from "react-icons/fa";
import { IoExtensionPuzzleOutline } from "react-icons/io5";
import { MdOutlineLogout } from "react-icons/md";

const links = [
  {
    Icon: MdOutlineDashboardCustomize,
    text: "Dashboard",
    path: "/dashboard",
  },
  {
    Icon: BiCartDownload,
    text: "Order Topup",
    path: "/order-topup",
  },
  {
    Icon: BiCartAdd,
    text: "Request Akun",
    path: "/request-akun",
  },
  {
    Icon: FaRegUserCircle,
    text: "Data Member",
    path: "/data-member",
  },
  {
    Icon: IoExtensionPuzzleOutline,
    text: "Setting",
    path: "/setting",
  },
];

export const Navbar = () => {
  return (
    <>
      <div className="bg-black text-white w-full fixed xl:relative bottom-0 xl:w-72 xl:min-h-screen flex-col">
        <div
          className="hidden xl:flex w-full h-32 bg-center bg-no-repeat"
          style={{
            backgroundImage: "url(/icon/icon.png)",
          }}
        ></div>
        <nav className="flex xl:flex-col justify-between md:px-20 xl:p-5 2xl:p-10 h-full">
          <div className="flex xl:flex-col gap-2">
            {links.map(({ Icon, text, path }) => (
              <NavLink key={path} Icon={Icon} text={text} />
            ))}
          </div>
          <NavLink Icon={MdOutlineLogout} text="Logout" />
        </nav>
      </div>
    </>
  );
};
