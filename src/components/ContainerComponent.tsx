import React, { ReactNode } from "react";

interface ContainerComponentProps {
  title: string;
  children: ReactNode;
}

export default function ContainerComponent({
  title,
  children,
}: ContainerComponentProps) {
  return (
    <div className="p-6 flex flex-col gap-4 container mx-auto">
      <h2 className="text-xl font-bold ">{title}</h2>
      {children}
    </div>
  );
}
