import React, { ReactNode } from "react";
import HeaderPage from "./HeaderPage";
import { FaWhatsapp } from "react-icons/fa";

interface ContainerPageProps {
  title: string;
  children: ReactNode;
}

export default function ContainerPage({ title, children }: ContainerPageProps) {
  return (
    <div className=" bg-gray-100 h-full">
      <HeaderPage title={title} Icon={FaWhatsapp} isButton />
      {children}
    </div>
  );
}
