"use client";

import ContainerComponent from "@/components/ContainerComponent";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState, useMemo } from "react";
import { FaRegAddressCard } from "react-icons/fa6";
import { HiOutlineBadgeCheck } from "react-icons/hi";
import { IoBagAddOutline } from "react-icons/io5";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";
import IconBCA from "@/assets/img/bca.png";
import IconMandiri from "@/assets/img/mandiri.png";
import SelectWithIcon from "@/components/Select";
import { useAuthStore } from "@/stores/useAuthStore";
import axios from "axios";
import { ListReqAccount, TopUp } from "@/types/type";
import { produce } from "immer";
import formatCurrency from "@/utils/formatCurrency";
import { useRandomNumberStore } from "@/stores/randomNumber";
import { notify } from "@/utils/notify";
import { ToastContainer } from "react-toastify";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const GET_AKUN_IKLAN_GET = `${API_URL}/api/v1/account-requests/my`;
const TOPUP_POST = `${API_URL}/api/v1/payment`;

const BankOptions = [
  {
    title: "Mandiri",
    value: "MANDIRI",
    icon: IconMandiri,
  },
  {
    title: "BCA",
    value: "BCA",
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

type FormTopUpProps = {
  page: string;
  setPage: (page: string) => void;
  successTopUp: (data: TopUp) => void;
};

export default function FormTopUp({ page, setPage,successTopUp }: FormTopUpProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { auth, isHydrated } = useAuthStore();
  const [adsAccount, setAdsAccount] = useState<ListReqAccount[]>([]);
  const [topUp, setTopUp] = useState<{
    amount: number;
    accountRequestId: string;
    paymentMethod: string;
  }>({
    amount: 0,
    accountRequestId: "",
    paymentMethod: "",
  });
  const { number } = useRandomNumberStore();

  // Hitung total amount menggunakan useMemo untuk menghindari infinite loop
  const calculatedTotal = useMemo(() => {
    const fee = auth?.user?.feePercent ?? 0;
    const amount = topUp.amount;
    const uniqueCode = number;

    return (fee / 100) * amount + amount + uniqueCode;
  }, [auth?.user?.feePercent, topUp.amount, number]);

  // Hitung fee amount
  const feeAmount = useMemo(() => {
    const fee = auth?.user?.feePercent ?? 0;
    return (fee / 100) * topUp.amount;
  }, [auth?.user?.feePercent, topUp.amount]);

  const getAkunIklan = async () => {
    try {
      const response = await axios.get(GET_AKUN_IKLAN_GET, {
        headers: {
          Authorization: `Bearer ${auth?.accessToken}`,
        },
      });

      if (response.status === 200) {
        setAdsAccount(response.data.data);
      }
    } catch (error: any) {
      notify.error("Error fetching accounts");
      console.error("Error fetching accounts:", error);
    }
  };

  const submitTopUp = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(TOPUP_POST, {
        amount: calculatedTotal,
        accountRequestId: topUp.accountRequestId,
        paymentMethod: topUp.paymentMethod,
      },{
        headers:{
          "Authorization": `Bearer ${auth?.accessToken}`
        }
      });

      if (response.status === 200 || response.status === 201) {
        successTopUp(response.data.data);
        setIsLoading(false);
        setPage("thank-you");
        notify.success("Top-up successful");
      }
    } catch (error: any) {
      setIsLoading(false);
      notify.error(`Error submitting top-up: ${error?.response?.data?.message || ""}`);
      console.error("Error submitting top-up:", error);
    }
  };

  useEffect(() => {
    if (isHydrated && auth?.accessToken) {
      getAkunIklan();
    }
  }, [auth, isHydrated]);

  return (
    <>
      <ToastContainer />
      <ContainerComponent title="Form Order">
        <div className="md:bg-white md:rounded-lg py-10 md:py-20 flex flex-col xl:flex-row-reverse gap-10 xl:gap-0">
          <div className="flex flex-col gap-8 mx-auto max-w-sm w-full">
            <p className="text-base font-normal">Pilih Metode Pembayaran</p>
            <RadioGroup
              defaultValue="mandiri"
              onValueChange={(value) => {
                setTopUp(
                  produce(topUp, (draft) => {
                    draft.paymentMethod = value;
                  })
                );
              }}
            >
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
                <p className="text-base font-normal">
                  {formatCurrency(topUp.amount)}
                </p>
              </div>
              <div className="w-full flex justify-between items-center">
                <p className="text-base font-normal">
                  Fee {auth?.user.feePercent}%:
                </p>
                <p className="text-base font-normal">
                  {formatCurrency(feeAmount)}
                </p>
              </div>
              <div className="w-full flex justify-between items-center">
                <p className="text-base font-normal">Kode Unik:</p>
                <p className="text-base font-normal">
                  {formatCurrency(number)}
                </p>
              </div>
              <div className="w-full flex justify-between items-center">
                <p className="text-base font-bold">Total:</p>
                <p className="text-base font-bold">
                  {formatCurrency(calculatedTotal)}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-10 mx-auto max-w-sm w-full">
            <div className="w-full flex flex-col gap-2">
              <div className="flex gap-2">
                <p className="text-base font-normal">Jumlah Nominal</p>
              </div>
              <div className="flex flex-col lg:flex-row gap-2 items-start lg:items-center w-full">
                <SelectWithIcon
                  getOptionLabel={(option) => option.label}
                  getOptionValue={(option) => option.value}
                  Icon={FaRegAddressCard}
                  options={dummyNominal}
                  className="w-full font-semibold"
                  placeholder="Pilih Nominal Top Up"
                  onValueChange={(e) =>
                    setTopUp(
                      produce(topUp, (draft) => {
                        draft.amount = Number(e);
                      })
                    )
                  }
                />
              </div>
            </div>
            <div className="w-full flex flex-col gap-2">
              <div className="flex gap-2">
                <p className="text-base font-normal">Pilih Akun Iklan</p>
              </div>
              <div className="flex flex-col lg:flex-row gap-2 items-start lg:items-center w-full">
                <SelectWithIcon
                  Icon={HiOutlineBadgeCheck}
                  options={adsAccount.filter(
                    (account) => account.status === "APPROVED"
                  )}
                  getOptionLabel={(option) => option.accountName}
                  getOptionValue={(option) => option.id}
                  className="w-full font-semibold"
                  placeholder="Pilih Akun Iklan"
                  onValueChange={(e) =>
                    setTopUp(
                      produce(topUp, (draft) => {
                        draft.accountRequestId = e;
                      })
                    )
                  }
                />
              </div>
            </div>
            <Button
              onClick={() => submitTopUp()}
              disabled={
                !topUp.amount ||
                !topUp.accountRequestId ||
                !topUp.paymentMethod ||
                isLoading
              }
              className="flex items-center gap-2 bg-black w-full text-white py-5 text-base rounded"
            >
              <IoBagAddOutline />
              Top Up Sekarang
            </Button>
          </div>
        </div>
      </ContainerComponent>
    </>
  );
}
