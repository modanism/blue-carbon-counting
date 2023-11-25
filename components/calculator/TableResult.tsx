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
} from "chart.js";
import { Bar } from "react-chartjs-2";

import Link from "next/link";

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
  options: any;
  data: any;
};

const TableResult = (props: ResultProp) => {
  return (
    <>
      <TableContainer bg={"#30514B"} marginBottom={"20px"}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Species</Th>
              <Th>Surface Area</Th>
              <Th>Density</Th>
            </Tr>
          </Thead>
          <Tbody>
            {props.tableData.map((e) => (
              <>
                <Tr>
                  <Td>{e.speciesName}</Td>
                  <Td>{e.area}</Td>
                  <Td>{e.density}</Td>
                </Tr>
              </>
            ))}
            <Tr>
              <Td>Total</Td>
              <Td>{props.totalArea}</Td>
              <Td>{props.averageArea}</Td>
            </Tr>
            <Tr>
              <Td>Average</Td>
              <Td>{props.totalDensity}</Td>
              <Td>{props.averageDensity}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <TableContainer bg={"#30514B"} mb={"20px"}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Species</Th>
              <Th>AgB</Th>
              <Th>BgB</Th>
              <Th>Soil</Th>
            </Tr>
          </Thead>
          <Tbody>
            {props.tableData.map((e) => (
              <>
                <Tr>
                  <Td>{e.speciesName}</Td>
                  <Td>{e.AGB}</Td>
                  <Td>{e.BGB}</Td>
                  <Td>{e.Soil}</Td>
                </Tr>
              </>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <TableContainer bg={"#30514B"} mb={"20px"}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Species</Th>
              <Th>AgC</Th>
              <Th>BgC</Th>
              <Th>Soil C</Th>
              <Th>Total</Th>
            </Tr>
          </Thead>
          <Tbody>
            {props.tableData.map((e) => (
              <>
                <Tr>
                  <Td>{e.speciesName}</Td>
                  <Td>{e.AGC}</Td>
                  <Td>{e.BGC}</Td>
                  <Td>{e.soilC}</Td>
                  <Td>{e.Total}</Td>
                </Tr>
              </>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Bar options={props.options} data={props.data} />
      <div className="w-full flex justify-center items-center">
        <Link
          href={
            "https://docs.google.com/spreadsheets/d/1ekFVsk9lgbHkvzQ97lD4woA8K89EkGIzB9Jakber2-0/edit?usp=sharing"
          }
          className="bg-[#30514B] text-[white] px-[20px] py-[12px] font-bold rounded-[25px] mb-[50px]"
        >
          Try Forecast
        </Link>
      </div>
    </>
  );
};

export default TableResult
