"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  setDoc,
} from "firebase/firestore";
import { app, auth } from "../../lib/firebase/config"; // path to your Firebase configuration
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import CalculatorComponent from "@/components/calculator/CalculatorComponent";
import { useRouter } from "next/navigation";
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

export const options = {
  plugins: {
    title: {
      display: true,
      text: "Chart.js Bar Chart - Stacked",
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

let labels = ["January", "February", "March", "April", "May", "June", "July"];

export let data = {
  labels,
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
};

type ProjectEntity = {
  id?: string;
  name?: string;
  text?: string;
};

const Calculator = () => {
  const [projects, setProjects] = useState<ProjectEntity[]>([]);
  const [addButtonLoading, setAddButtonLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [currentProject, setCurrentProject] = useState(projects[0]);
  const [species, setSpecies] = useState([{ species: "species" }]);
  const [tableData, setTableData] = useState<TableData[]>([]);
  const [totalArea, setTotalArea] = useState(0);
  const [averageDensity, setAverageDensity] = useState(0);
  const [totalDensity, setTotalDensity] = useState(0);
  const [averageArea, setAverageArea] = useState(0);
  const [isCalc, setIsCalc] = useState(false);

  const [calculatorData, setCalculatorData] = useState<CalculatorData[]>([]);

  const router = useRouter();

  const handleCalculate = () => {
    console.log(calculatorData);
    const totalArea = calculatorData.reduce(
      (acc, curr) => acc + curr.area.area,
      0
    );
    setTotalArea(totalArea);
    const totalDensity = calculatorData.reduce((acc, curr) => {
      const density = curr.area.trees / curr.area.area;
      return acc + (isFinite(density) ? density : 0); // Avoid division by zero
    }, 0);
    const averageDensity = totalDensity / calculatorData.length;
    const averageArea = totalArea / calculatorData.length;
    setAverageDensity(averageDensity);
    setAverageArea(averageArea);
    setTotalDensity(totalDensity);

    console.log(`total Area : ${totalArea}`);
    console.log(`average density : ${averageDensity}`);

    const speciesCalculations = calculatorData.map((calcData) => {
      const AGB =
        calcData.aboveFormula.constant *
        Number(calcData.aboveFormula.density) *
        Math.pow(
          Number(calcData.aboveFormula.diameter),
          Number(calcData.aboveFormula.height)
        );
      const BGB =
        calcData.belowFormula.constant *
        Math.pow(
          Number(calcData.belowFormula.density),
          Number(calcData.belowFormula.densityPower)
        ) *
        Math.pow(
          Number(calcData.belowFormula.diameter),
          Number(calcData.belowFormula.height)
        );
      const Soil =
        calcData.soilFormula.depth *
        calcData.soilFormula.bulk *
        (calcData.soilFormula.carbon / 100);
      const Total = AGB + BGB + Soil;

      const AGC = AGB * (calcData.soilFormula.carbon / 100);
      const BGC = BGB * (calcData.soilFormula.carbon / 100);
      const soilC = Soil;

      return {
        speciesName: calcData.species.species,
        area: calcData.area.area,
        density: calcData.area.trees / calcData.area.area,
        AGB: AGB,
        BGB: BGB,
        Soil: Soil,
        Total: Total,
        AGC: AGC,
        BGC: BGC,
        soilC: soilC,
      };
    });

    console.log(speciesCalculations);
    setTableData(speciesCalculations);
    setIsCalc(true);
    labels = speciesCalculations.map((e) => e.speciesName);
    data = {
      labels,
      datasets: [
        {
          label: "AgBC",
          data: speciesCalculations.map((e) => e.AGC),
          backgroundColor: "rgb(255, 99, 132)",
        },
        {
          label: "BgBC",
          data: speciesCalculations.map((e) => e.BGC * -1),
          backgroundColor: "rgb(75, 192, 192)",
        },
        {
          label: "SoilC",
          data: speciesCalculations.map((e) => e.soilC),
          backgroundColor: "rgb(53, 162, 235)",
        },
      ],
    };
  };

  const updateCalculatorData = (
    id: string,
    newValues: Partial<CalculatorData>
  ) => {
    setCalculatorData((currentData) =>
      currentData.map((data) =>
        data.id === id ? { ...data, ...newValues } : data
      )
    );
  };

  const generateId = () => {
    return crypto.randomUUID();
  };

  const addCalculatorComponent = () => {
    const newCalculatorData: CalculatorData = {
      id: generateId(),
      area: {
        trees: 0,
        area: 0,
      },
      species: {
        // Provide initial values for the species data
        species: "",
        aboveConstant: 0,
        aboveDensity: 0,
        aboveDiameter: 0,
        aboveHeightPower: 0,
        belowConstant: 0,
        belowDensity: 0,
        belowDensityPower: 0,
        belowDiameter: 0,
        belowHeight: 0,
        carbonPercent: 0,
      },
      aboveFormula: {
        // Provide initial values for the above formula data
        constant: 0,
        ownConstant: false,
        density: "",
        ownDensity: false,
        diameter: "",
        ownDiameter: false,
        height: "",
      },
      belowFormula: {
        // Provide initial values for the below formula data
        constant: 0,
        ownConstant: false,
        density: "",
        densityPower: "",
        ownDensity: false,
        diameter: "",
        ownDiameter: false,
        height: "",
      },
      soilFormula: {
        // Provide initial values for the soil formula data
        depth: 0,
        bulk: 0,
        ownBulk: false,
        carbon: 0,
        ownCarbon: false,
      },
    };

    setCalculatorData((currentData) => [...currentData, newCalculatorData]);
  };

  const handleTabsChange = (index: number) => {
    setTabIndex(index);
    setCurrentProject(projects[index]);
  };

  // Function to fetch user data
  const fetchUserData = async () => {
    const db = getFirestore(app);
    const docRef = doc(db, "users", auth.currentUser?.uid ?? "");

    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists() && docSnap.data().projects) {
        setProjects(docSnap.data().projects);
        setCurrentProject(docSnap.data().projects[0]);
      } else {
        // Document doesn't exist or doesn't have projects, so create it with default data
        const defaultProjects = [
          {
            id: "project-1",
            name: "Project 1",
            text: "testing",
          },
        ];
        await setDoc(docRef, { projects: defaultProjects });
        setProjects(defaultProjects);
        setCurrentProject(defaultProjects[0]);
      }
    } catch (error) {
      console.error("Error fetching document: ", error);
    }
  };

  // Function to add a new project
  const addProjectToUser = async () => {
    setAddButtonLoading(true);
    const db = getFirestore(app);
    const userDocRef = doc(db, "users", auth.currentUser?.uid ?? "");

    // Create a new project object
    const newProject: ProjectEntity = {
      id: `project-${projects.length + 1}`,
      name: `Project ${projects.length + 1}`,
      text: "testing",
    };

    try {
      await updateDoc(userDocRef, {
        projects: arrayUnion(newProject),
      });
      setProjects((prevProjects) => [...prevProjects, newProject]);
    } catch (error) {
      console.error("Error adding project: ", error);
    }
    setAddButtonLoading(false);
  };

  // Handle click event for creating a new project
  const handleCreateProject = () => {
    addProjectToUser();
  };

  // Subscribe to auth state changes and fetch user data if logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        fetchUserData();
        if (projects.length > 0) {
          setCurrentProject(projects[0]);
        }
      } else {
        setIsLoggedIn(false);
      }
    });
    return unsubscribe; // Make sure to unsubscribe on component unmount
  }, []);

  return (
    <main className="flex min-h-screen w-full bg-[#FAFAFA]">
      {/* {isLoggedIn ? (
        <>
          <section className="basis-1/5"></section>
          <section className="flex flex-col items-start bg-[#EFF2F6] h-full pt-[150px] w-[20vw] fixed">
            <div className="w-full min-h-[50px] flex justify-center items-center">
              {addButtonLoading ? (
                <>
                  <Spinner color="#486284" />
                </>
              ) : (
                <>
                  <button
                    onClick={handleCreateProject}
                    className="shadow-md transition-all hover:shadow-none py-[12px] px-[20px] bg-white rounded-[50px] flex justify-center items-center gap-[10px]"
                  >
                    <p className="text-[#11156D] text-[16px] font-semibold">
                      New Project
                    </p>
                  </button>
                </>
              )}
            </div>
            <h1 className="text-[14px] text-neutral-7 mb-[10px] px-[15px]">
              Projects
            </h1>

            <Tabs
              orientation="vertical"
              variant="solid-rounded"
              colorScheme={"blue"}
              width={"100%"}
              index={tabIndex}
              onChange={handleTabsChange}
            >
              <TabList width={"100%"}>
                {projects.map((item, id) => {
                  return (
                    <Tab
                      key={id}
                      width={"100%"}
                      justifyContent={"start"}
                      _selected={{ color: "white", bg: "#486284" }}
                      rounded={"none"}
                    >
                      {item.name}
                    </Tab>
                  );
                })}
              </TabList>
            </Tabs>
          </section>
        </>
      ) : (
        <></>
      )} */}
      <section className="basis-4/5 grow min-h-screen pt-[150px] px-[120px]">
        <h1 className="text-[30px] text-[black]">
          {currentProject ? currentProject.name : "Select a project"}
        </h1>
        <div className="flex flex-col">
          {calculatorData.map((data) => (
            <CalculatorComponent
              key={data.id}
              id={data.id}
              updateCalculatorData={updateCalculatorData}
            />
          ))}
        </div>
        <button
          onClick={addCalculatorComponent}
          className="bg-[white] py-[6px] w-full border-2 border-[#314C47] text-[#314C47] font-bold rounded-[25px] mb-[50px]"
        >
          Add More Species
        </button>
        {isCalc ? (
          <></>
        ) : (
          <>
            <div className="w-full flex justify-center items-center">
              <button
                onClick={handleCalculate}
                className="bg-[#30514B] text-[white] px-[20px] py-[12px] font-bold rounded-[25px] mb-[50px]"
              >
                Calculate
              </button>
            </div>
          </>
        )}

        {isCalc ? (
          <>
            {" "}
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
                  {tableData.map((e) => (
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
                    <Td>{totalArea}</Td>
                    <Td>{averageArea}</Td>
                  </Tr>
                  <Tr>
                    <Td>Average</Td>
                    <Td>{totalDensity}</Td>
                    <Td>{averageDensity}</Td>
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
                  {tableData.map((e) => (
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
                  {tableData.map((e) => (
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
            <Bar options={options} data={data} />
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
        ) : (
          <></>
        )}
      </section>
    </main>
  );
};

export default Calculator;
