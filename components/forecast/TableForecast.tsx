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
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

const TableForecast = () => {
  const [tableData, setTableData] = useState<TableData[]>([]);
  useEffect(() => {
    const storedTableData = localStorage.getItem("tableData");

    if (storedTableData) {
      setTableData(JSON.parse(storedTableData));
    }
  }, []);

  const getValue = (index: number) => {
    return tableData[index] ? tableData[index].density : 100;
  };

  return (
    <>
      <div className="flex flex-col">
        {tableData.map((data, index) => (
          <>
            <div className="flex flex-col gap-[30px]">
              <h1 className="text-[black] text-[24px] font-poppins">
                {data.speciesName}
              </h1>
              <TableContainer
                w={"1000px"}
                bg={"#30514B"}
                marginBottom={"20px"}
                rounded={"12px"}
              >
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th className="text-center text-[#FAFAFA] w-[333px]">
                        Parameters
                      </Th>
                      <Th className="text-center text-[#FAFAFA] w-[333px]">
                        X
                      </Th>
                      <Th className="text-center text-[#FAFAFA] w-[333px]">
                        X+1
                      </Th>
                      <Th className="text-center text-[#FAFAFA] w-[333px]">
                        X+2
                      </Th>
                      <Th className="text-center text-[#FAFAFA] w-[333px]">
                        X+3
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody className="bg-[#F3F2F1] text-black">
                    <Tr>
                      <Td className="font-bold">Area Density</Td>
                      <Td className="text-center p-0 text-[black]">
                        {data.density}
                      </Td>
                      <Td className="text-center"></Td>
                      <Td className="text-center"></Td>
                      <Td className="text-center"></Td>
                    </Tr>
                    <Tr>
                      <Td className="font-bold">AgC</Td>
                      <Td className="text-center">
                        {data.AGC}
                        {/* <NumberInput className="w-full shadow-none border-none">
                          <NumberInputField
                            placeholder={String(data.AGC)}
                            value={data.AGC}
                            className="text-center w-full shadow-none border-none"
                          />
                        </NumberInput> */}
                      </Td>
                      <Td className="text-center"></Td>
                      <Td className="text-center"></Td>
                      <Td className="text-center"></Td>
                    </Tr>
                    <Tr>
                      <Td className="font-bold">BgC</Td>
                      <Td className="text-center">
                        {data.BGC}
                      </Td>
                      <Td className="text-center"></Td>{" "}
                      <Td className="text-center"></Td>{" "}
                      <Td className="text-center"></Td>
                    </Tr>
                    <Tr>
                      <Td className="font-bold">Soil C</Td>
                      <Td className="text-center">
                        {data.soilC}
                      </Td>
                      <Td className="text-center"></Td>{" "}
                      <Td className="text-center"></Td>{" "}
                      <Td className="text-center"></Td>
                    </Tr>
                    <Tr>
                      <Td className="font-bold">Total Carbon Stock</Td>
                      <Td className="text-center">{data.AGC + data.BGC + data.soilC}</Td>
                      <Td className="text-center"></Td>{" "}
                      <Td className="text-center"></Td>{" "}
                      <Td className="text-center"></Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default TableForecast;
