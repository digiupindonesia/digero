import React, { ReactNode } from "react";
import { Button } from "./ui/button";
import { IconType } from "react-icons";
import { useAuthStore } from "@/stores/useAuthStore";

interface HeaderPageProps {
  title: string;
  Icon?: IconType;
  isButton?: boolean;
  customComponent?: ReactNode;
}

const HeaderPage = ({
  title,
  Icon,
  isButton,
  customComponent,
}: HeaderPageProps) => {
  const {auth} = useAuthStore()
  return (
    <div className="w-full flex justify-between items-center bg-white p-6">
      <h1 className="text-2xl font-bold">{title}</h1>
      {isButton && auth?.user.role === "USER" && (
        <Button className="bg-black text-white p-2 rounded flex items-center gap-2">
          {Icon && <Icon className="text-xl" />}
          Hubungi CS
        </Button>
      )}
      {customComponent}
    </div>
  );
};

export default HeaderPage;
