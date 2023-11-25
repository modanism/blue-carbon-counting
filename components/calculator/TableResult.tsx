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
              <Th className="text-[#FAFAFA]">Species</Th>
              <Th className="text-[#FAFAFA]">Surface Area</Th>
              <Th className="text-[#FAFAFA]">Density</Th>
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
              <Th className="text-[#FAFAFA]">Species</Th>
              <Th className="text-[#FAFAFA]">AgB</Th>
              <Th className="text-[#FAFAFA]">BgB</Th>
              <Th className="text-[#FAFAFA]">Soil</Th>
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
              <Th className="text-[#FAFAFA]">Species</Th>
              <Th className="text-[#FAFAFA]">AgC</Th>
              <Th className="text-[#FAFAFA]">BgC</Th>
              <Th className="text-[#FAFAFA]">Soil C</Th>
              <Th className="text-[#FAFAFA]">Total</Th>
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
      
    </>
  );
};

export default TableResult;
