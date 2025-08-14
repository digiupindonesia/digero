import React, { ReactNode } from "react";
import { Button } from "./ui/button";
import { IconType } from "react-icons";

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
  return (
    <div className="w-full flex justify-between items-center bg-white p-6">
      <h1 className="text-2xl font-bold">{title}</h1>
      {isButton && (
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
