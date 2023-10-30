"use client";

import { InformationCircleIcon } from "@heroicons/react/solid";
import { AreaChart, Color, Flex, Icon, Tab, TabGroup, TabList, Text, Title } from "@tremor/react";
import { useEffect, useState } from "react";
import { lusitana } from "../fonts";
import { fetch1YDaysData, fetch30DaysData, fetch3MDaysData, fetch6MDaysData, fetch7DaysData } from "@/app/lib/actions";
import { useSearchParams } from "next/navigation";
import { GraphData } from "@/app/lib/definitions";

const inrNumberformatter = (number: number, decimals = 0) =>
  Intl.NumberFormat("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
    .format(Number(number))
    .toString();

const formatters: { [key: string]: any } = {
  Week: (number: number) => `Rs ${inrNumberformatter(number, 2)}`,
  Month: (number: number) => `Rs ${inrNumberformatter(number, 2)}`,
  Quarter: (number: number) => `Rs ${inrNumberformatter(number, 2)}`,
  HalfYear: (number: number) => `Rs ${inrNumberformatter(number, 2)}`,
  Year: (number: number) => `Rs ${inrNumberformatter(number, 2)}`,
};

const Kpis = {
  Week: "Week",
  Month: "Month",
  Quarter: "Quarter",
  HalfYear: "HalfYear",
  Year: "Year",
};

const kpiList = [Kpis.Week, Kpis.Month, Kpis.Quarter, Kpis.HalfYear, Kpis.Year];

export type DailyPerformance = {
  date: string;
  Sales: number;
  Profit: number;
  Customers: number;
};

// export const performance: DailyPerformance[] = [
//   {
//     date: "2023-05-01",
//     Sales: 900.73,
//     Profit: 173,
//     Customers: 73,
//   },
//   {
//     date: "2023-05-02",
//     Sales: 1000.74,
//     Profit: 174.6,
//     Customers: 74,
//   },
//   {
//     date: "2023-05-03",
//     Sales: 1100.93,
//     Profit: 293.1,
//     Customers: 293,
//   },
//   {
//     date: "2023-05-04",
//     Sales: 1200.9,
//     Profit: 290.2,
//     Customers: 29,
//   },
// ];

export default function ChartView() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [performance, setPerformance] = useState<GraphData[]>([]);
  const selectedKpi = kpiList[selectedIndex];
  const searchParams = useSearchParams();
  const companySymbol = searchParams.get('symbol');
  if(!companySymbol) return null;

  useEffect(()=>{
    const weekData = async() => {
      const res = await fetch7DaysData(companySymbol);
      setPerformance(res);
    };
    const monthData = async() => {
      const res = await fetch30DaysData(companySymbol);
      setPerformance(res);

    };
    const quarterData = async() => {
      const res = await fetch3MDaysData(companySymbol);
      console.log("<<<< quarter", res)
      setPerformance(res);

    };
    const halfyearData = async() => {
      const res = await fetch6MDaysData(companySymbol);
      setPerformance(res);

    };
    const yearData = async() => {
      const res = await fetch1YDaysData(companySymbol);
      setPerformance(res);

    };

    console.log("<<<< idx", selectedIndex);

    if(selectedIndex === 0) weekData();
    else if(selectedIndex === 1) monthData();
    else if(selectedIndex === 2) quarterData();
    else if(selectedIndex === 3) halfyearData();
    else if(selectedIndex === 4) yearData();
    else setPerformance([]);

  }, [selectedIndex]);

  const areaChartArgs = {
    className: "mt-5 h-72",
    data: performance,
    index: "date",
    categories: [selectedKpi],
    colors: ["blue"] as Color[],
    showLegend: false,
    valueFormatter: formatters[selectedKpi],
    yAxisWidth: 60,
  };

  return (
    <>
      <div className="flex w-full flex-col md:col-span-4 lg:col-span-4">
        <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
          {/* NOTE: comment in this code when you get to this point in the course */}

          <div className="md:flex justify-between">
            <div>
              <Flex className="space-x-0.5" justifyContent="start" alignItems="center">
                <Title> Stock Prices </Title>
                <Icon
                  icon={InformationCircleIcon}
                  variant="simple"
                  tooltip="Shows stock price fluctuations for a selected frequency type a.k.a 1W, 1M."
                />
              </Flex>
              <Text>Price Change Per Frequency Type</Text>
            </div>
            <div>
              <TabGroup index={selectedIndex} onIndexChange={setSelectedIndex}>
                <TabList color="gray" variant="solid">
                  <Tab>1W</Tab>
                  <Tab>1M</Tab>
                  <Tab>3M</Tab>
                  <Tab>6M</Tab>
                  <Tab>1Y</Tab>
                </TabList>
              </TabGroup>
            </div>
          </div>
          {/* web */}
          <div className="mt-8 hidden sm:block">
            <AreaChart {...areaChartArgs} />
          </div>
          {/* mobile */}
          <div className="mt-8 sm:hidden">
            <AreaChart {...areaChartArgs} startEndOnly={true} showGradient={false} showYAxis={false} />
          </div>
        </div>
      </div>
      
    </>
  );
}

// "use client";
// import { AreaChart, Card, Title, Text, Metric } from "@tremor/react";
// import { lusitana } from "../fonts";
// import { fetch30DaysData } from "@/app/lib/data";

// const chartdata3 = [
//   {
//     date: "Jan 23",
//     Running: 167,
//     Cycling: 145,
//   },
//   {
//     date: "Feb 23",
//     Running: 125,
//     Cycling: 110,
//   },
//   {
//     date: "Mar 23",
//     Running: 156,
//     Cycling: 149,
//   },
//   {
//     date: "Apr 23",
//     Running: 165,
//     Cycling: 112,
//   },
//   {
//     date: "May 23",
//     Running: 153,
//     Cycling: 138,
//   },
//   {
//     date: "Jun 23",
//     Running: 124,
//     Cycling: 145,
//   },
//   {
//     date: "Jul 23",
//     Running: 164,
//     Cycling: 134,
//   },
//   {
//     date: "Aug 23",
//     Running: 123,
//     Cycling: 110,
//   },
//   {
//     date: "Sep 23",
//     Running: 132,
//     Cycling: 113,
//   },
// ];

// export default function Graph() {
//     // await fetch30DaysData();
//     return (
  //     <div className="flex w-full flex-col md:col-span-4 lg:col-span-4">
  //       <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
  //         Stock Prices
  //       </h2>
  //       <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
  //         {/* NOTE: comment in this code when you get to this point in the course */}

  //         <Card className="max-w-xs mx-auto">
  //   <Text>Sales</Text>
  //   <Metric>$ 34,743</Metric>
  // </Card>
  //       </div>
  //     </div>
//     )
// }