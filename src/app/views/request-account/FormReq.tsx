import ContainerComponent from "@/components/ContainerComponent";
import Input from "@/components/Input";
import { Button } from "@/components/ui/button";
import React from "react";
import { FaRegAddressCard } from "react-icons/fa6";
import { HiOutlineBadgeCheck } from "react-icons/hi";
import { IoBagAddOutline } from "react-icons/io5";

export default function FormReq() {
  return (
    <ContainerComponent title="Form Request">
      <div className="md:bg-white md:rounded-lg md:py-20">
        <div className="flex flex-col gap-10 mx-auto max-w-md">
          <div className="w-full flex flex-col gap-2">
            <div className="flex gap-2">
              <p className="text-base font-normal">Nama Akun</p>
            </div>
            <div className="flex flex-col lg:flex-row gap-2 items-start lg:items-center w-full">
              <Input
                Icon={FaRegAddressCard}
                className="w-full"
                placeholder="Nama Akun"
              />
            </div>
          </div>
          <div className="w-full flex flex-col gap-2">
            <div className="flex gap-2">
              <p className="text-base font-normal">ID Business Center</p>
            </div>
            <div className="flex flex-col lg:flex-row gap-2 items-start lg:items-center w-full">
              <Input
                Icon={HiOutlineBadgeCheck}
                className="w-full"
                placeholder="ID Business Center"
              />
            </div>
          </div>
          <Button className="flex items-center gap-2 bg-black w-full py-5 text-white text-base rounded">
            <IoBagAddOutline />
            Request Akun
          </Button>
        </div>
      </div>
    </ContainerComponent>
  );
}
