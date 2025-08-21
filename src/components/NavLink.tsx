import Link, { LinkProps } from "next/link";
import React from "react";
import { IconType } from "react-icons";

interface NavLinkProps extends LinkProps {
  text: string;
  active?: boolean;
  Icon?: IconType;
  className?: string;
}

const NavLink: React.FC<NavLinkProps> = ({
  Icon,
  text,
  active,
  className,
  ...linkProps
}) => {
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
