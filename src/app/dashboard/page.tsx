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

export default function Page() {
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
            <div className="col-span-3 w-full h-96 rounded-2xl bg-[#F7F7F7] shadow-none outline-none p-5">
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

            <div className="col-span-3 w-full h-96 rounded-2xl bg-[#F7F7F7] shadow-none outline-none p-5">
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
          </div>
        </div>
      </ContainerComponent>
    </ContainerPage>
  );
}
