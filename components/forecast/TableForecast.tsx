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

type TForecastData = {
  densityX1: number;
  densityX2: number;
  densityX3: number;
  agcX1: number;
  agcX2: number;
  agcX3: number;
  bgcX1: number;
  bgcX2: number;
  bgcX3: number;
  soilcX1: number;
  soilcX2: number;
  soilcX3: number;
};

type TResultData = {
  speciesName: string;
  carbonX: number;
  carbonX1: number;
  carbonX2: number;
  carbonX3: number;
};

const initialForecast = {
  densityX1: 0,
  densityX2: 0,
  densityX3: 0,
  agcX1: 0,
  agcX2: 0,
  agcX3: 0,
  bgcX1: 0,
  bgcX2: 0,
  bgcX3: 0,
  soilcX1: 0,
  soilcX2: 0,
  soilcX3: 0,
};

const TableForecast = () => {
  const [tableData, setTableData] = useState<TableData[]>([]);
  const [forecastData, setForecastData] = useState<TForecastData[]>([]);
  const [resultData, setResultData] = useState<TResultData[]>([]);

  const allFieldsFilled = () => {
    return forecastData.every((data) =>
      Object.values(data).every((value) => value !== 0)
    );
  };

  useEffect(() => {
    const storedTableData = localStorage.getItem("tableData");

    if (storedTableData) {
      const parsedData = JSON.parse(storedTableData);
      setTableData(parsedData);
      setForecastData(parsedData.map(() => initialForecast));
    }
  }, []);

  return (
    <>
      <div className="flex flex-col">
        <div className="flex w-full justify-center gap-[10px] items-center mb-[25px]">
          <h1 className="text-[20px] font-bold text-[#020202] font-poppins">
            Forecasting
          </h1>
          <div className="px-[10px] border-[#314C47] border-[1px] rounded-full text-[16px] text-[#30514B]">
            BETA
          </div>
        </div>
        {tableData.map((data, index) => (
          <>
            <div className="flex flex-col">
              <h1 className="text-[black] text-[24px] font-poppins mb-[10px]">
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
                        X-1
                      </Th>
                      <Th className="text-center text-[#FAFAFA] w-[333px]">
                        X-2
                      </Th>
                      <Th className="text-center text-[#FAFAFA] w-[333px]">
                        X-3
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody className="bg-[#F3F2F1] text-black">
                    <Tr>
                      <Td className="font-bold">Trees Density</Td>
                      <Td className="text-center p-0 text-[black]">
                        {data.density.toFixed(3)}
                      </Td>
                      <Td className="text-center ">
                        <NumberInput className="w-full shadow-none border-[black]">
                          <NumberInputField
                            value={forecastData[index].densityX1}
                            onChange={(e) => {
                              const newValue = Number(e.target.value);
                              setForecastData(
                                forecastData.map((item, idx) =>
                                  idx === index
                                    ? {
                                        ...item,
                                        densityX1: newValue,
                                        agcX1:
                                          (data.AGC * newValue) / data.density,
                                        bgcX1:
                                          (data.BGC * newValue) / data.density,
                                        soilcX1:
                                          (data.soilC * newValue) /
                                          data.density,
                                      }
                                    : item
                                )
                              );
                            }}
                            className="text-center w-full shadow-none "
                          />
                        </NumberInput>
                      </Td>
                      <Td className="text-center">
                        <NumberInput className="w-full shadow-none border-[black]">
                          <NumberInputField
                            value={forecastData[index].densityX2}
                            onChange={(e) => {
                              const newValue = Number(e.target.value);
                              setForecastData(
                                forecastData.map((item, idx) =>
                                  idx === index
                                    ? {
                                        ...item,
                                        densityX2: newValue,
                                        agcX2:
                                          (data.AGC * newValue) / data.density,
                                        bgcX2:
                                          (data.BGC * newValue) / data.density,
                                        soilcX2:
                                          (data.soilC * newValue) /
                                          data.density,
                                      }
                                    : item
                                )
                              );
                            }}
                            className="text-center w-full shadow-none "
                          />
                        </NumberInput>
                      </Td>
                      <Td className="text-center">
                        <NumberInput className="w-full shadow-none border-[black]">
                          <NumberInputField
                            value={forecastData[index].densityX3}
                            onChange={(e) => {
                              const newValue = Number(e.target.value);
                              setForecastData(
                                forecastData.map((item, idx) =>
                                  idx === index
                                    ? {
                                        ...item,
                                        densityX3: newValue,
                                        agcX3:
                                          (data.AGC * newValue) / data.density,
                                        bgcX3:
                                          (data.BGC * newValue) / data.density,
                                        soilcX3:
                                          (data.soilC * newValue) /
                                          data.density,
                                      }
                                    : item
                                )
                              );
                            }}
                            className="text-center w-full shadow-none "
                          />
                        </NumberInput>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td className="font-bold">AgC</Td>
                      <Td className="text-center">{data.AGC.toFixed(3)}</Td>
                      <Td className="text-center">
                        {forecastData[index].agcX1.toFixed(3)}
                      </Td>
                      <Td className="text-center">
                        {forecastData[index].agcX2.toFixed(3)}
                      </Td>
                      <Td className="text-center">
                        {forecastData[index].agcX3.toFixed(3)}
                      </Td>
                    </Tr>
                    <Tr>
                      <Td className="font-bold">BgC</Td>
                      <Td className="text-center">{data.BGC.toFixed(3)}</Td>
                      <Td className="text-center">
                        {forecastData[index].bgcX1.toFixed(3)}
                      </Td>{" "}
                      <Td className="text-center">
                        {forecastData[index].bgcX2.toFixed(3)}
                      </Td>{" "}
                      <Td className="text-center">
                        {forecastData[index].bgcX3.toFixed(3)}
                      </Td>
                    </Tr>
                    <Tr>
                      <Td className="font-bold">Soil C</Td>
                      <Td className="text-center">{data.soilC.toFixed(3)}</Td>
                      <Td className="text-center">
                        {forecastData[index].soilcX1.toFixed(3)}
                      </Td>{" "}
                      <Td className="text-center">
                        {forecastData[index].soilcX2.toFixed(3)}
                      </Td>{" "}
                      <Td className="text-center">
                        {forecastData[index].soilcX3.toFixed(3)}
                      </Td>
                    </Tr>
                    <Tr className="bg-[#D9D9D9] font-bold">
                      <Td className="font-bold">Total Carbon Stock</Td>
                      <Td className="text-center">
                        {(data.AGC + data.BGC + data.soilC).toFixed(3)}
                      </Td>
                      <Td className="text-center">
                        {(
                          forecastData[index].agcX1 +
                          forecastData[index].bgcX1 +
                          forecastData[index].soilcX1
                        ).toFixed(3)}
                      </Td>{" "}
                      <Td className="text-center">
                        {(
                          forecastData[index].agcX2 +
                          forecastData[index].bgcX2 +
                          forecastData[index].soilcX2
                        ).toFixed(3)}
                      </Td>{" "}
                      <Td className="text-center">
                        {(
                          forecastData[index].agcX3 +
                          forecastData[index].bgcX3 +
                          forecastData[index].soilcX3
                        ).toFixed(3)}
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </div>
          </>
        ))}
        <div className="w-full flex justify-center items-center">
          <button
            onClick={() => {
              let newResultData: TResultData[] = [];
              forecastData.forEach((data, index) => {
                const carbonX =
                  tableData[index].AGC +
                  tableData[index].BGC +
                  tableData[index].soilC;
                const carbonX1 = data.agcX1 + data.bgcX1 + data.soilcX1;
                const carbonX2 = data.agcX2 + data.bgcX2 + data.soilcX2;
                const carbonX3 = data.agcX3 + data.bgcX3 + data.soilcX3;

                const Lt =
                  0.62 * carbonX +
                  (1 - 0.62) *
                    (0.62 * carbonX1 +
                      (1 - 0.62) * (carbonX2 + (carbonX2 - carbonX3)) +
                      (0.35 *
                        (0.62 * carbonX1 +
                          (1 - 0.62) * (carbonX2 + (carbonX2 - carbonX3)) -
                          carbonX2) +
                        (1 - 0.35) * (carbonX2 - carbonX3)));
                const Tt =
                  0.35 *
                    (0.62 * carbonX +
                      (1 - 0.62) *
                        (0.62 * carbonX1 +
                          (1 - 0.62) * (carbonX2 + (carbonX2 - carbonX3)) +
                          (0.35 *
                            (0.62 * carbonX1 +
                              (1 - 0.62) * (carbonX2 + (carbonX2 - carbonX3)) -
                              carbonX2) +
                            (1 - 0.35) * (carbonX2 - carbonX3))) -
                      (0.62 * carbonX1 +
                        (1 - 0.62) * (carbonX2 + (carbonX2 - carbonX3)))) +
                  (1 - 0.35) *
                    (0.35 *
                      (0.62 * carbonX1 +
                        (1 - 0.62) * (carbonX2 + (carbonX2 - carbonX3)) -
                        carbonX2) +
                      (1 - 0.35) * (carbonX2 - carbonX3));
                console.log(`RESULT X = ${carbonX}`);
                console.log(`RESULT X+1 = ${Lt + Tt}`);
                console.log(`RESULT X+2 = ${Lt + 2 * Tt}`);
                console.log(`RESULT X+3 = ${Lt + 3 * Tt}`);
                newResultData.push({
                  speciesName: tableData[index].speciesName,
                  carbonX: carbonX,
                  carbonX1: Lt + Tt,
                  carbonX2: Lt + 2 * Tt,
                  carbonX3: Lt + 3 * Tt,
                });
              });
              setResultData(newResultData);
            }}
            disabled={!allFieldsFilled()}
            className="bg-[#30514B] text-[white] px-[20px] py-[12px] font-bold rounded-[25px] mb-[50px]"
          >
            Forecast
          </button>
        </div>
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
                  Total Carbon Stock
                </Th>
                <Th className="text-center text-[#FAFAFA] w-[333px]">X</Th>
                <Th className="text-center text-[#FAFAFA] w-[333px]">X+1</Th>
                <Th className="text-center text-[#FAFAFA] w-[333px]">X+2</Th>
                <Th className="text-center text-[#FAFAFA] w-[333px]">X+3</Th>
              </Tr>
            </Thead>
            <Tbody className="bg-[#F3F2F1] text-black">
              {resultData.map((data, index) => (
                <Tr key={index}>
                  <Td className="font-bold">{data.speciesName}</Td>
                  <Td className="text-center p-0 text-[black]">
                    {data.carbonX.toFixed(3)}
                  </Td>
                  <Td className="text-center ">{data.carbonX1.toFixed(3)}</Td>
                  <Td className="text-center">{data.carbonX2.toFixed(3)}</Td>
                  <Td className="text-center">{data.carbonX3.toFixed(3)}</Td>
                </Tr>
              ))}
              <Tr className="bg-[#D9D9D9] font-bold">
                <Td className="font-bold">Total</Td>
                <Td className="text-center">
                  {resultData
                    .reduce((total, currentData) => {
                      return total + currentData.carbonX;
                    }, 0)
                    .toFixed(2)}
                </Td>
                <Td className="text-center">
                  {resultData
                    .reduce((total, currentData) => {
                      return total + currentData.carbonX1;
                    }, 0)
                    .toFixed(2)}
                </Td>
                <Td className="text-center">
                  {resultData
                    .reduce((total, currentData) => {
                      return total + currentData.carbonX2;
                    }, 0)
                    .toFixed(2)}
                </Td>
                <Td className="text-center">
                  {resultData
                    .reduce((total, currentData) => {
                      return total + currentData.carbonX3;
                    }, 0)
                    .toFixed(2)}
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default TableForecast;
