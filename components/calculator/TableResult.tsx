"use client";

import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Spinner,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import Link from "next/link";
import { useState, useEffect } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type ResultProp = {
  tableData: TableData[];
  totalArea: number;
  averageArea: number;
  totalDensity: number;
  averageDensity: number;
  data: any;
};

// type ChartData = {
//   labels : string[];
//   datasets : {
//     label : string
//     data : number[]
//     backgroundColor : string
//   }
// }

export const options = {
  plugins: {
    
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

const TableResult = () => {
  const [tableData, setTableData] = useState<TableData[]>([]);
  const [chartData, setChartData] = useState({
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "AgBC",
        data: [1, 2, 2],
        backgroundColor: "rgb(255, 99, 132)",
      },
      {
        label: "BgBC",
        data: [],
        backgroundColor: "rgb(75, 192, 192)",
      },
      {
        label: "SoilC",
        data: [],
        backgroundColor: "rgb(53, 162, 235)",
      },
    ],
  });
  const [totalArea, setTotalArea] = useState(0);
  const [averageArea, setAverageArea] = useState(0);
  const [totalDensity, setTotalDensity] = useState(0);
  const [averageDensity, setAverageDensity] = useState(0);

  useEffect(() => {
    // Retrieve data from local storage
    const storedTableData = localStorage.getItem("tableData");
    const storedChartData = localStorage.getItem("chartData");
    const storedTotalArea = localStorage.getItem("totalArea");
    const storedAverageArea = localStorage.getItem("averageArea");
    const storedTotalDensity = localStorage.getItem("totalDensity");
    const storedAverageDensity = localStorage.getItem("averageDensity");

    console.log(`TABLAE DATA : ${storedTableData}`);

    if (
      storedTableData &&
      storedChartData &&
      storedTotalArea &&
      storedAverageArea &&
      storedTotalDensity &&
      storedAverageDensity
    ) {
      setTableData(JSON.parse(storedTableData));
      setChartData(JSON.parse(storedChartData));
      setTotalArea(JSON.parse(storedTotalArea));
      setAverageArea(JSON.parse(storedAverageArea));
      setTotalDensity(JSON.parse(storedTotalDensity));
      setAverageDensity(JSON.parse(storedAverageDensity));
    }
  }, []);

  return (
    <>
      <TableContainer
        w={"1000px"}
        bg={"#30514B"}
        marginBottom={"20px"}
        rounded={"12px"}
      >
        <Table variant="simple">
          <Thead>
            <Tr >
              <Th className="text-center text-[#FAFAFA] w-[333px]">Species</Th>
              <Th className="text-center text-[#FAFAFA] w-[333px]">
                Surface Area
              </Th>
              <Th className="text-center text-[#FAFAFA] w-[333px]">Density</Th>
            </Tr>
          </Thead>
          <Tbody className="bg-[#F3F2F1] text-black">
            {tableData.map((e, index) => (
              <>
                <Tr>
                  <Td key={index}>{e.speciesName}</Td>
                  <Td key={index} className="text-center">
                    {e.area}
                  </Td>
                  <Td key={index} className="text-center">
                    {e.density}
                  </Td>
                </Tr>
              </>
            ))}
            <Tr>
              <Td className="font-bold">Total</Td>
              <Td className="text-center">{totalArea}</Td>
              <Td className="text-center">{totalDensity}</Td>
            </Tr>
            <Tr>
              <Td className="font-bold">Average</Td>
              <Td className="text-center">{averageArea}</Td>
              <Td className="text-center">{averageDensity}</Td> 
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <TableContainer w={"1000px"} bg={"#30514B"} mb={"20px"} rounded={"12px"}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th className="text-[#FAFAFA]">Species</Th>
              <Th className="text-[#FAFAFA]">AgB</Th>
              <Th className="text-[#FAFAFA]">BgB</Th>
              <Th className="text-[#FAFAFA]">Soil</Th>
            </Tr>
          </Thead>
          <Tbody>
            {tableData.map((e, index) => (
              <>
                <Tr>
                  <Td key={index}>{e.speciesName}</Td>
                  <Td key={index}>{e.AGB}</Td>
                  <Td key={index}>{e.BGB}</Td>
                  <Td key={index}>{e.Soil}</Td>
                </Tr>
              </>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <TableContainer w={"1000px"} bg={"#30514B"} mb={"20px"} rounded={"12px"}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th className="text-[#FAFAFA]">Species</Th>
              <Th className="text-[#FAFAFA]">AgC</Th>
              <Th className="text-[#FAFAFA]">BgC</Th>
              <Th className="text-[#FAFAFA]">Soil C</Th>
              <Th className="text-[#FAFAFA]">Total</Th>
            </Tr>
          </Thead>
          <Tbody>
            {tableData.map((e, index) => (
              <>
                <Tr>
                  <Td key={index}>{e.speciesName}</Td>
                  <Td key={index}>{e.AGC}</Td>
                  <Td key={index}>{e.BGC}</Td>
                  <Td key={index}>{e.soilC}</Td>
                  <Td key={index}>{e.Total}</Td>
                </Tr>
              </>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      
      <Bar options={options} data={chartData} />
    </>
  );
};

export default TableResult;
