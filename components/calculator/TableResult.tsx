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
    title: {
      display: true,
    },
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
      <div>
        <h1 className="text-black mb-[20px] text-poppins text-[20px] font-bold">
          Table of Tress/Land Density
        </h1>
      </div>
      <TableContainer
        w={"1000px"}
        bg={"#30514B"}
        marginBottom={"50px"}
        rounded={"12px"}
      >
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th className="text-center text-[#FAFAFA] w-[333px] text-[16px] font-medium normal-case">
                Species
              </Th>
              <Th className="text-center text-[#FAFAFA] w-[333px] text-[16px] font-medium normal-case">
                Surface Area
              </Th>
              <Th className="text-center text-[#FAFAFA] w-[333px] text-[16px] font-medium normal-case">
                Density
              </Th>
            </Tr>
          </Thead>
          <Tbody className="bg-[#F3F2F1] text-black font-semibold">
            {tableData.map((e, index) => (
              <>
                <Tr>
                  <Td key={index}>{e.speciesName}</Td>
                  <Td key={index} className="text-center">
                    {e.area}
                  </Td>
                  <Td key={index} className="text-center">
                    {e.density.toFixed(2)}
                  </Td>
                </Tr>
              </>
            ))}
            <Tr className="bg-[#D9D9D9]">
              <Td className="font-bold">Total</Td>
              <Td className="text-center">{totalArea}</Td>
              <Td className="text-center">{totalDensity.toFixed(2)}</Td>
            </Tr>
            <Tr className="bg-[#D9D9D9]">
              <Td className="font-bold">Average</Td>
              <Td className="text-center">{averageArea}</Td>
              <Td className="text-center">{averageDensity.toFixed(2)}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <div>
        <h1 className="text-black mb-[20px] text-poppins text-[20px] font-bold">
          Table of Biomass
        </h1>
      </div>
      <div className="mb-[50px]">
        <TableContainer
          w={"1000px"}
          bg={"#30514B"}
          mb={"15px"}
          rounded={"12px"}
        >
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th className="text-center text-[#FAFAFA] w-[250px] text-[16px] font-medium normal-case">
                  Species
                </Th>
                <Th className="text-center text-[#FAFAFA] w-[250px] text-[16px] font-medium normal-case">
                  AgB
                </Th>
                <Th className="text-center text-[#FAFAFA] w-[250px] text-[16px] font-medium normal-case">
                  BgB
                </Th>
                <Th className="text-center text-[#FAFAFA] w-[250px] text-[16px] font-medium">
                  Total
                </Th>
              </Tr>
            </Thead>
            <Tbody className="bg-[#F3F2F1] text-black font-semibold">
              {tableData.map((e, index) => (
                <>
                  <Tr>
                    <Td key={index}>{e.speciesName}</Td>
                    <Td key={index} className="text-center">
                      {e.AGB.toFixed(2)}
                    </Td>
                    <Td key={index} className="text-center">
                      {e.BGB.toFixed(2)}
                    </Td>
                    <Td className="text-center">
                      {(e.AGB + e.BGB).toFixed(2)}
                    </Td>
                  </Tr>
                </>
              ))}
              <Tr className="bg-[#D9D9D9]">
                <Td>Total</Td>
                <Td className="text-center">
                  {tableData
                    .reduce((total, currentData) => {
                      return total + currentData.AGB;
                    }, 0)
                    .toFixed(2)}
                </Td>
                <Td className="text-center">
                  {tableData
                    .reduce((total, currentData) => {
                      return total + currentData.BGB;
                    }, 0)
                    .toFixed(2)}
                </Td>
                <Td className="text-center">
                  {tableData
                    .reduce((total, currentData) => {
                      return total + currentData.AGB + currentData.BGB;
                    }, 0)
                    .toFixed(2)}
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
        <div>
          <h1 className="text-black text-[12px] font-light">
            *AgB = Aboveground Biomass
          </h1>
        </div>
        <div>
          <h1 className="text-black text-[12px] font-light">
            *BgB = Belowground Biomass
          </h1>
        </div>
      </div>
      <div>
        <h1 className="text-black mb-[20px] text-poppins text-[20px] font-bold">
          Table of Carbon Stock
        </h1>
      </div>
      <div>
        <TableContainer
          w={"1000px"}
          bg={"#30514B"}
          mb={"15px"}
          rounded={"12px"}
        >
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th className="text-center text-[#FAFAFA] w-[166.5px] text-[16px] font-medium normal-case">
                  Species
                </Th>
                <Th className="text-center text-[#FAFAFA] w-[166.5px] text-[16px] font-medium normal-case">
                  AgC
                </Th>
                <Th className="text-center text-[#FAFAFA] w-[166.5px] text-[16px] font-medium normal-case">
                  BgC
                </Th>
                <Th className="text-center text-[#FAFAFA] w-[166.5px] text-[16px] font-medium normal-case">
                  Soil Carbon
                </Th>
                <Th className="text-center text-[#FAFAFA] w-[166.5px] text-[16px] font-medium">
                  Total
                </Th>
              </Tr>
            </Thead>
            <Tbody className="bg-[#F3F2F1] text-black font-semibold">
              {tableData.map((e, index) => (
                <>
                  <Tr>
                    <Td key={index}>{e.speciesName}</Td>
                    <Td key={index} className="text-center">
                      {e.AGC.toFixed(2)}
                    </Td>
                    <Td key={index} className="text-center">
                      {e.BGC.toFixed(2)}
                    </Td>
                    <Td key={index} className="text-center">
                      {e.soilC.toFixed(2)}
                    </Td>
                    <Td key={index} className="text-center">
                      {e.Total.toFixed(2)}
                    </Td>
                  </Tr>
                </>
              ))}
              <Tr className="bg-[#D9D9D9]">
                <Td>Total</Td>
                <Td className="text-center">
                  {tableData
                    .reduce((total, currentData) => {
                      return total + currentData.AGC;
                    }, 0)
                    .toFixed(2)}
                </Td>
                <Td className="text-center">
                  {tableData
                    .reduce((total, currentData) => {
                      return total + currentData.BGC;
                    }, 0)
                    .toFixed(2)}
                </Td>
                <Td className="text-center">
                  {tableData
                    .reduce((total, currentData) => {
                      return total + currentData.soilC;
                    }, 0)
                    .toFixed(2)}
                </Td>
                <Td className="text-center">
                  {tableData
                    .reduce((total, currentData) => {
                      return total + currentData.Total;
                    }, 0)
                    .toFixed(2)}
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
        <div>
          <h1 className="text-black text-[12px] font-light">
            *AgB = Aboveground Carbon
          </h1>
        </div>
        <div>
          <h1 className="text-black text-[12px] font-light">
            *BgB = Belowground Carbon
          </h1>
        </div>
      </div>
      <div className="w-[1000px] h-[500px] mb-[50px]">
        <Bar options={options} data={chartData} />
      </div>
    </>
  );
};

export default TableResult;
