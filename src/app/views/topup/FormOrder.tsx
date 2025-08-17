"use client";

import ContainerComponent from "@/components/ContainerComponent";
import Input from "@/components/Input";
import { Button } from "@/components/ui/button";
import React from "react";
import { FaRegAddressCard } from "react-icons/fa6";
import { HiOutlineBadgeCheck } from "react-icons/hi";
import { IoBagAddOutline } from "react-icons/io5";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";
import IconBCA from "@/assets/img/bca.png";
import IconMandiri from "@/assets/img/mandiri.png";
import SelectWithIcon from "@/components/Select";

const BankOptions = [
  {
    title: "Mandiri",
    value: "mandiri",
    icon: IconMandiri,
  },
  {
    title: "BCA",
    value: "bca",
    icon: IconBCA,
  },
];

const dummyNominal = [
  { label: "Rp 1.000.000", value: 1000000 },
  { label: "Rp 2.000.000", value: 2000000 },
  { label: "Rp 3.000.000", value: 3000000 },
  { label: "Rp 4.000.000", value: 4000000 },
  { label: "Rp 5.000.000", value: 5000000 },
  { label: "Rp 6.000.000", value: 6000000 },
  { label: "Rp 7.000.000", value: 7000000 },
  { label: "Rp 8.000.000", value: 8000000 },
  { label: "Rp 9.000.000", value: 9000000 },
  { label: "Rp 10.000.000", value: 10000000 },
];

const dummyAccount = [
  { label: "Akun 1", value: "akun1" },
  { label: "Akun 2", value: "akun2" },
  { label: "Akun 3", value: "akun3" },
  { label: "Akun 4", value: "akun4" },
  { label: "Akun 5", value: "akun5" },
];

export default function FormOrder() {
  return (
    <ContainerComponent title="Form Order">
      <div className="md:bg-white md:rounded-lg py-10 md:py-20 flex flex-col xl:flex-row-reverse gap-10 xl:gap-0">
        <div className="flex flex-col gap-8 mx-auto max-w-sm w-full">
          <p className="text-base font-normal">Pilih Metode Pembayaran</p>
          <RadioGroup defaultValue="mandiri">
            {BankOptions.map((bank) => (
              <div key={bank.value} className="flex items-center space-x-2">
                <RadioGroupItem value={bank.value} id={bank.value} />
                <Label htmlFor={bank.value} className="w-full">
                  <div className="flex w-full items-center gap-10">
                    <p className="text-base font-normal">{bank.title}</p>
                    <Image src={bank.icon} alt={bank.title} />
                  </div>
                </Label>
              </div>
            ))}
          </RadioGroup>
          <div className="flex w-full flex-col gap-3">
            <div className="w-full flex justify-between items-center">
              <p className="text-base font-normal">Subtotal:</p>
              <p className="text-base font-normal">Rp. 100.000</p>
            </div>
            <div className="w-full flex justify-between items-center">
              <p className="text-base font-normal">Fee 5%:</p>
              <p className="text-base font-normal">Rp. 5.000</p>
            </div>
            <div className="w-full flex justify-between items-center">
              <p className="text-base font-normal">Kode Unik:</p>
              <p className="text-base font-normal">Rp. 21</p>
            </div>
            <div className="w-full flex justify-between items-center">
              <p className="text-base font-bold">Total:</p>
              <p className="text-base font-bold">Rp 10.050.021</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-10 mx-auto max-w-sm w-full">
          <div className="w-full flex flex-col gap-2">
            <div className="flex gap-2">
              <p className="text-base font-normal">Jumlah Nominal</p>
            </div>
            <div className="flex flex-col lg:flex-row gap-2 items-start lg:items-center w-full">
              <SelectWithIcon Icon={FaRegAddressCard} options={dummyNominal} className="w-full font-semibold" placeholder="Pilih Nominal Top Up" />
            </div>
          </div>
          <div className="w-full flex flex-col gap-2">
            <div className="flex gap-2">
              <p className="text-base font-normal">Pilih Akun Iklan</p>
            </div>
            <div className="flex flex-col lg:flex-row gap-2 items-start lg:items-center w-full">
              <SelectWithIcon Icon={HiOutlineBadgeCheck} options={dummyAccount} className="w-full font-semibold" placeholder="Pilih Akun Iklan" />
            </div>
          </div>
          <Button className="flex items-center gap-2 bg-black w-full text-white py-5 text-base rounded">
            <IoBagAddOutline />
            Top Up Sekarang
          </Button>
        </div>
      </div>
    </ContainerComponent>
  );
}
