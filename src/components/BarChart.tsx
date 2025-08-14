import React from "react";
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

const data = [
  {
    name: "Page A",
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    pv: 4300,
    amt: 2100,
  },
];

const BarChartComponent = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={100}
        height={500}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis dataKey="name" />
        {/* <YAxis /> */}
        <Tooltip />
        <Legend />
        {/* <Bar
          dataKey="pv"
          barSize={16}
          fill="#8884d8"
          activeBar={
            <Rectangle fill="pink" stroke="blue" className="w-[100px]" />
          }
        /> */}
        <Bar dataKey="pv" fill="#E8B923" radius={[5, 5, 5, 5]} barSize={48}>
          
          <LabelList
            dataKey="pv"
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
                  fontSize={22}
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

export default BarChartComponent;
