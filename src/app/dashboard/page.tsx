"use client";

import React, { useEffect, useState } from "react";
import ContainerPage from "@/components/ContainerPage";
import HeaderPage from "@/components/HeaderPage";
import ContainerComponent from "@/components/ContainerComponent";
import { FaRegCircleUser } from "react-icons/fa6";
import RangeDatePicker from "@/components/RangeDatePicker";
import { CardDashboard } from "@/components/CardDashboard";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { CustomCardDashboard } from "@/components/CustomCardDashboard";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Crown } from "lucide-react";
import feeCalculator from "@/utils/feeCalculator";
import formatCurrency from "@/utils/formatCurrency";
import { useAuthStore } from "@/stores/useAuthStore";
import axios from "axios";
import { DateRange } from "react-day-picker";
import formatDateToYMD from "@/utils/formatDateToYMD";
import { SummaryAdmin } from "@/types/type";
import { notify } from "@/utils/notify";

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

const dummyTrenData = [
  {
    name: "Jan",
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Feb",
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Mar",
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Apr",
    pv: 3908,
    amt: 2000,
  },
  {
    name: "May",
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Jun",
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Jul",
    pv: 4300,
    amt: 2100,
  },
];

const dummyStatusData = [
  {
    name: "Pending",
    pending: 20,
  },
  {
    name: "Processing",
    processing: 30,
  },
  {
    name: "Completed",
    completed: 50,
  },
];

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const SUMMARY_ADMIN_GET = `${API_URL}/api/v1/admin/analytics/summary`;
const SUMMARY_USER_GET = `${API_URL}/api/v1/analytics/summary`;
const TREND_ADMIN_GET = `${API_URL}/api/v1/admin/analytics/trends`;
const BEST_MEMBER_GET = `${API_URL}/api/v1/admin/analytics/top-members`;

export default function Page() {
  const { auth, isHydrated } = useAuthStore();
  const [date, setDate] = useState<DateRange | undefined>({
    from: (() => {
      const today = new Date();
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(today.getDate() - 7);
      return sevenDaysAgo;
    })(),
    to: new Date(),
  });

  const [summaryAdmin, setSummaryAdmin] = useState<SummaryAdmin>({
    dateRange: {
      from: "",
      to: "",
    },
    membersCount: 0,
    memberTopupCount: 0,
    avgTopupFreq: 0,
    totalNominalTopup: 0,
    totalFeeTopup: 0,
    avgNominalTopup: 0,
    totalTopups: 0,
    statusBreakdown: {
      PENDING: { count: 0, percent: 0 },
      PAID: { count: 0, percent: 0 },
      EXPIRED: { count: 0, percent: 0 },
      CANCELED: { count: 0, percent: 0 },
    },
  });

  const getSummaryAdmin = async () => {
    try {
      const response = await axios.get(
        `${SUMMARY_ADMIN_GET}?from=${formatDateToYMD(
          date?.from
        )}&to=${formatDateToYMD(date?.to)}&memberId=`,
        {
          headers: {
            Authorization: `Bearer ${auth?.accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        setSummaryAdmin(response.data.data);
      }
    } catch (error: any) {
      notify.error("Error fetching summary data");
      console.error("Error fetching summary data:", error);
    }
  };

  const getSummaryUser = async () => {
    try {
      const response = await axios.get(
        `${SUMMARY_USER_GET}?from=${formatDateToYMD(
          date?.from
        )}&to=${formatDateToYMD(date?.to)}&memberId=`,
        {
          headers: {
            Authorization: `Bearer ${auth?.accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        setSummaryAdmin(response.data.data);
      }
    } catch (error: any) {
      notify.error("Error fetching summary data");
      console.error("Error fetching summary data:", error);
    }
  };

  const getTrendAdmin = async () => {
    try {
      const response = await axios.get(
        `${TREND_ADMIN_GET}?from=${formatDateToYMD(
          date?.from
        )}&to=${formatDateToYMD(date?.to)}&granularity=month&memberId=`,
        {
          headers: {
            Authorization: `Bearer ${auth?.accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Trend data:", response.data);
      }
    } catch (error: any) {
      notify.error("Error fetching trend data");
      console.error("Error fetching trend data:", error);
    }
  };

  const getBestMember = async () => {
    try{
      const response = await axios.get(BEST_MEMBER_GET,{
        headers:{
          Authorization: `Bearer ${auth?.accessToken}`,
        }
      })

      if(response.status === 200){
        console.log("Best member data:", response.data);
      }
    }catch(error:any){
      notify.error("Error fetching best member data");
      console.error("Error fetching best member data:", error);
    }
  }

  useEffect(() => {
    if (isHydrated && auth?.accessToken) {
      if (auth?.user.role === "ADMIN") {
        getSummaryAdmin();
        getTrendAdmin();
        getBestMember();
      }

      // if(auth?.user.role === "USER"){
      // }
    }
  }, [auth, isHydrated]);

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
            <RangeDatePicker date={date} setDate={setDate} />
          </div>
          {auth?.user.role === "ADMIN" && (
            <div className="md:p-5 lg:p-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              <CardDashboard
                title="Jumlah Member"
                value={summaryAdmin.membersCount}
                isCurrency={false}
                icon={MdOutlineDashboardCustomize}
              />
              <CardDashboard
                title="Member Freq Top Up"
                value={summaryAdmin.memberTopupCount}
                isCurrency={false}
                icon={MdOutlineDashboardCustomize}
              />
              <CardDashboard
                title="AVG Freq Top Up"
                value={summaryAdmin.avgTopupFreq}
                isCurrency={false}
                icon={MdOutlineDashboardCustomize}
              />
              <CardDashboard
                title="Total Nominal Top Up"
                value={summaryAdmin.totalNominalTopup}
                isCurrency={true}
                icon={MdOutlineDashboardCustomize}
              />
              <CardDashboard
                title="Total Fee Top Up"
                value={summaryAdmin.totalFeeTopup}
                isCurrency={true}
                icon={MdOutlineDashboardCustomize}
              />
              <CardDashboard
                title="AVG Nominal Top Up"
                value={summaryAdmin.avgNominalTopup}
                isCurrency={true}
                icon={MdOutlineDashboardCustomize}
              />
            </div>
          )}
          <div className="md:p-5 lg:p-10 flex flex-col gap-5">
            <div className="flex flex-col gap-5 2xl:flex-row">
              <div className="col-span-3 w-full 2xl:w-8/12 h-96 rounded-2xl bg-[#F7F7F7] shadow-none outline-none p-5 border">
                <div className="flex flex-col items-start gap-5 w-full h-full">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded flex bg-white items-center justify-center shrink-0">
                      <MdOutlineDashboardCustomize className="h-6 w-6" />
                    </div>
                    <p className="text-base leading-none">Tren Topup</p>
                  </div>
                  <BarChartTrend />
                </div>
              </div>

              <div className="col-span-3 w-full 2xl:w-4/12 h-96 rounded-2xl bg-[#F7F7F7] shadow-none outline-none p-5 border">
                <div className="flex flex-col items-start gap-5 w-full h-full">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded flex bg-white items-center justify-center shrink-0">
                      <MdOutlineDashboardCustomize className="h-6 w-6" />
                    </div>
                    <p className="text-base leading-none">Topup Status</p>
                  </div>
                  <BarStatusComponent />
                </div>
              </div>
            </div>
            {auth?.user.role === "ADMIN" && (
              <CustomCardDashboard
                icon={MdOutlineDashboardCustomize}
                title="Best Member Total Topup"
              >
                <Table className="text-sm">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-10 text-center">#</TableHead>
                      <TableHead>Nama</TableHead>
                      <TableHead className="w-40">Freq Topup</TableHead>
                      <TableHead className="w-52">Total</TableHead>
                      <TableHead className="w-24">Fee</TableHead>
                      <TableHead className="w-40">Fee (Rp)</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody className="font-variant-numeric tabular-nums">
                    {dummyData.map((item, i) => (
                      <TableRow key={i}>
                        <TableCell className="text-center">
                          {i === 0 ? (
                            <Crown className="inline h-4 w-4" />
                          ) : (
                            i + 1
                          )}
                        </TableCell>
                        <TableCell className="font-medium">
                          {item.name}
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          {item.topupFreq} Kali Topup
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          Total Rp {formatCurrency(item.amount)}
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          Fee {item.fee}%
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          Rp{" "}
                          {formatCurrency(feeCalculator(item.amount, item.fee))}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CustomCardDashboard>
            )}
          </div>
        </div>
      </ContainerComponent>
    </ContainerPage>
  );
}

const BarChartTrend = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={100}
        height={500}
        data={dummyTrenData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="pv"
          barSize={16}
          fill="#E1B32A"
          activeBar={<Rectangle fill="#E1B32A" stroke="black" />}
        />
        <Bar
          dataKey="amt"
          barSize={16}
          fill="#E1822A"
          activeBar={<Rectangle fill="#E1822A" stroke="black" />}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

const BarStatusComponent = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        className="pb-5"
        width={100}
        height={500}
        data={dummyStatusData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        {/* <XAxis dataKey="name" /> */}
        {/* <YAxis /> */}
        <Tooltip />
        <Legend />
        <Bar
          dataKey="pending"
          fill="#E1582A"
          radius={[5, 5, 5, 5]}
          barSize={48}
        >
          <LabelList
            dataKey="pending"
            position="insideTop"
            formatter={(label: React.ReactNode) => `${label}%`}
            // gunakan content kustom agar warna & gaya sesuai
            content={(props) => {
              const { x = 0, y = 0, width = 0, value } = props as any;
              const cx = x + width / 2;
              const cy = y + 20; // padding dari atas bar
              return (
                <text
                  x={cx}
                  y={cy}
                  textAnchor="middle"
                  fontSize={15}
                  fontWeight={700}
                  fill="#fff"
                >
                  {value}%
                </text>
              );
            }}
          />
        </Bar>
        <Bar
          dataKey="processing"
          fill="#E1822A"
          radius={[5, 5, 5, 5]}
          barSize={48}
        >
          <LabelList
            dataKey="processing"
            position="insideTop"
            formatter={(label: React.ReactNode) => `${label}%`}
            // gunakan content kustom agar warna & gaya sesuai
            content={(props) => {
              const { x = 0, y = 0, width = 0, value } = props as any;
              const cx = x + width / 2;
              const cy = y + 20; // padding dari atas bar
              return (
                <text
                  x={cx}
                  y={cy}
                  textAnchor="middle"
                  fontSize={15}
                  fontWeight={700}
                  fill="#fff"
                >
                  {value}%
                </text>
              );
            }}
          />
        </Bar>
        <Bar
          dataKey="completed"
          fill="#E1B32A"
          radius={[5, 5, 5, 5]}
          barSize={48}
        >
          <LabelList
            dataKey="completed"
            position="insideTop"
            formatter={(label: React.ReactNode) => `${label}%`}
            // gunakan content kustom agar warna & gaya sesuai
            content={(props) => {
              const { x = 0, y = 0, width = 0, value } = props as any;
              const cx = x + width / 2;
              const cy = y + 20; // padding dari atas bar
              return (
                <text
                  x={cx}
                  y={cy}
                  textAnchor="middle"
                  fontSize={15}
                  fontWeight={700}
                  fill="#fff"
                >
                  {value}%
                </text>
              );
            }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};
