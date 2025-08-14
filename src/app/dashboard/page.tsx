"use client";

import React from "react";
import ContainerPage from "@/components/ContainerPage";
import HeaderPage from "@/components/HeaderPage";
import ContainerComponent from "@/components/ContainerComponent";
import { FaRegCircleUser } from "react-icons/fa6";
import RangeDatePicker from "@/components/RangeDatePicker";
import { CardDashboard } from "@/components/CardDashboard";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import BarChartComponent from "@/components/BarChart";
import { CustomCardDashboard } from "@/components/CustomCardDashboard";

const dummyData = [
  {
    id: 0,
    name: "Bambang",
    topupFreq: 98,
    amount: 20000000,
    fee: 5, // in percentage
  },
  {
    id: 1,
    name: "Siti",
    topupFreq: 120,
    amount: 15000000,
    fee: 3,
  },
  {
    id: 2,
    name: "Andi",
    topupFreq: 75,
    amount: 25000000,
    fee: 4,
  },
  {
    id: 3,
    name: "Rina",
    topupFreq: 50,
    amount: 18000000,
    fee: 2.5,
  },
  {
    id: 4,
    name: "Dewi",
    topupFreq: 130,
    amount: 30000000,
    fee: 6,
  },
];

export default function Page() {
  const feeCalculator = (amount: number, fee: number) => {
    return (amount * fee) / 100;
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(value);
  }
  return (
    <ContainerPage title="Dashboard" isHeader={false}>
      <HeaderPage title="Dashboard" />
      <ContainerComponent title="Data view">
        <div className="md:bg-white md:rounded-lg flex flex-col gap-10">
          <div className="flex flex-wrap w-full items-center justify-between gap-3 md:border-b-2 border-[#E1E1E1] md:p-5">
            <div className="flex items-center gap-2">
              <FaRegCircleUser className="text-xl shrink-0" />
              <p className="text-sm md:text-base font-normal">All Member</p>
            </div>
            <RangeDatePicker />
          </div>
          <div className="md:p-5 lg:p-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            <CardDashboard
              title="Jumlah Member"
              value={98}
              isCurrency={false}
              icon={MdOutlineDashboardCustomize}
            />
            <CardDashboard
              title="Jumlah Freq Top Up"
              value={98}
              isCurrency={false}
              icon={MdOutlineDashboardCustomize}
            />
            <CardDashboard
              title="AVG Freq Top Up"
              value={98}
              isCurrency
              icon={MdOutlineDashboardCustomize}
            />
            <CardDashboard
              title="Total Nominal Top Up"
              value={20000000}
              isCurrency={true}
              icon={MdOutlineDashboardCustomize}
            />
            <CardDashboard
              title="Freq Top Up"
              value={98}
              isCurrency={false}
              icon={MdOutlineDashboardCustomize}
            />
            <CardDashboard
              title="AVG Nominal Topup"
              value={20000000}
              isCurrency
              icon={MdOutlineDashboardCustomize}
            />
          </div>
          <div className="md:p-5 lg:p-10 flex flex-col gap-5">
            <div className="col-span-3 w-full h-96 rounded-2xl bg-[#F7F7F7] shadow-none outline-none p-5 border">
              <div className="flex flex-col items-start gap-5 w-full h-full">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded flex bg-white items-center justify-center shrink-0">
                    <MdOutlineDashboardCustomize className="h-6 w-6" />
                  </div>
                  <p className="text-base leading-none">Tren Topup</p>
                </div>
                <BarChartComponent />
              </div>
            </div>

            <div className="col-span-3 w-full h-96 rounded-2xl bg-[#F7F7F7] shadow-none outline-none p-5 border">
              <div className="flex flex-col items-start gap-5 w-full h-full">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded flex bg-white items-center justify-center shrink-0">
                    <MdOutlineDashboardCustomize className="h-6 w-6" />
                  </div>
                  <p className="text-base leading-none">Topup Status</p>
                </div>
                <BarChartComponent />
              </div>
            </div>
            <CustomCardDashboard
              icon={MdOutlineDashboardCustomize}
              title="Best Member Total Topup"
            >
              {dummyData.map((item, index) => {
                return(
                  <div className="flex items-center gap-3" key={index}>
                    <p className="text-sm font-medium">
                      {index+1}
                    </p>
                    <p className="text-sm font-medium">
                      {item.name}
                    </p>
                    <p className="text-sm font-normal">
                      {item.topupFreq} kali topup
                    </p>
                    <p className="text-sm font-normal">
                      Rp {formatCurrency(item.amount)} 
                    </p>
                    <p className="text-sm font-normal">
                      Fee {item.fee}%
                    </p>
                    <p className="text-sm font-normal">
                      {feeCalculator(item.amount, item.fee)}
                    </p>
                  </div>
                )
              })}
            </CustomCardDashboard>
          </div>
        </div>
      </ContainerComponent>
    </ContainerPage>
  );
}
