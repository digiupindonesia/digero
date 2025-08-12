import React from "react";
import { Button } from "./ui/button";
import { FaWhatsapp } from "react-icons/fa";
import { IconType } from "react-icons";

interface HeaderPageProps {
  title: string;
  Icon: IconType;
  isButton?: boolean;
}

const HeaderPage = ({ title, Icon, isButton }: HeaderPageProps) => {
  return (
    <div className="w-full flex justify-between items-center bg-white p-6">
      <h1 className="text-2xl font-bold">{title}</h1>
      {isButton && (
        <Button className="bg-black text-white p-2 rounded flex items-center gap-2">
          <Icon className="text-xl" />
          Hubungi CS
        </Button>
      )}
    </div>
  );
};

export default HeaderPage;
