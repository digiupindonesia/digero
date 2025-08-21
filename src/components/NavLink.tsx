import { AuthResponse } from "@/types/type";
import Link, { LinkProps } from "next/link";
import React from "react";
import { IconType } from "react-icons";

interface NavLinkProps extends LinkProps {
  text: string;
  active?: boolean;
  Icon?: IconType;
  className?: string;
  isAdmin?: boolean; // Tambahkan properti isAdmin
  role?: AuthResponse["user"]["role"]; // Tambahkan properti role
}

const NavLink: React.FC<NavLinkProps> = ({
  Icon,
  text,
  active,
  className,
  isAdmin = false, // Default ke false jika tidak diberikan
  role,
  ...linkProps
}) => {
  // Jika isAdmin true dan role bukan admin, hide component
  if (isAdmin && role !== "ADMIN") {
    return null;
  }

  return (
    <Link
      {...linkProps}
      className={[
        "px-4 py-3 flex items-center gap-2 cursor-pointer hover:bg-yellow-500 hover:text-black rounded transition-all",
        active ? "bg-yellow-500 text-black" : "",
        className ?? "",
      ].join(" ")}
    >
      {Icon && <Icon className="text-xl" />}
      <span className="hidden xl:flex">{text}</span>
    </Link>
  );
};

export default NavLink;
