"use client";

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
import TableResult from "./TableResult";
import Link from "next/link";
import { useToast } from "@chakra-ui/react";

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
  const toast = useToast();

  const createNewCalculatorData = (): CalculatorData => {
    return {
      id: crypto.randomUUID(),
      area: {
        trees: 0,
        area: 0,
      },
      species: {
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
        constant: 0,
        ownConstant: false,
        density: "",
        ownDensity: false,
        diameter: "",
        ownDiameter: false,
        height: "",
      },
      belowFormula: {
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
        depth: 0,
        bulk: 0,
        ownBulk: false,
        carbon: 0,
        ownCarbon: false,
      },
    };
  };

  const [calculatorData, setCalculatorData] = useState<CalculatorData[]>([
    createNewCalculatorData(),
  ]);

  const router = useRouter();

  const removeCalculatorComponent = (id: string) => {
    setCalculatorData((currentData) =>
      currentData.filter((data) => data.id !== id)
    );
  };

  const handleCalculate = () => {
    let isEmptyOrZero = false;

    calculatorData.forEach((calcData) => {
      if (
        !calcData.area.trees ||
        !calcData.area.area ||
        !calcData.aboveFormula.constant ||
        !calcData.aboveFormula.density ||
        !calcData.aboveFormula.diameter ||
        !calcData.aboveFormula.height ||
        !calcData.belowFormula.constant ||
        !calcData.belowFormula.density ||
        !calcData.belowFormula.densityPower ||
        !calcData.belowFormula.diameter ||
        !calcData.belowFormula.height ||
        !calcData.soilFormula.depth ||
        !calcData.soilFormula.bulk ||
        !calcData.soilFormula.carbon
      ) {
        isEmptyOrZero = true;
      }
    });

    if (isEmptyOrZero) {
      toast({
        title: "Oops!",
        description: "Please make sure all fields are filled.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

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
        )*(calcData.area.trees / calcData.area.area)/1000;
      const BGB =
        calcData.belowFormula.constant *
        Math.pow(
          Number(calcData.belowFormula.density),
          Number(calcData.belowFormula.densityPower)
        )*
        Math.pow(
          Number(calcData.belowFormula.diameter),
          Number(calcData.belowFormula.height)
        )*(calcData.area.trees / calcData.area.area)/1000;
      const Soil =
        calcData.soilFormula.depth *
        calcData.soilFormula.bulk *
        (calcData.soilFormula.carbon);
      const Total = AGB + BGB + Soil;

      const AGC = AGB * (calcData.soilFormula.carbon / 100);
      const BGC = BGB * 0.39;
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
          backgroundColor: "#DEE5ED",
        },
        {
          label: "BgBC",
          data: speciesCalculations.map((e) => e.BGC * -1),
          backgroundColor: "#000000",
        },
        {
          label: "SoilC",
          data: speciesCalculations.map((e) => e.soilC * -1),
          backgroundColor: "#314C47",
        },
      ],
    };
    localStorage.setItem("tableData", JSON.stringify(speciesCalculations));
    localStorage.setItem("totalArea", JSON.stringify(totalArea));
    localStorage.setItem("averageArea", JSON.stringify(averageArea));
    localStorage.setItem("totalDensity", JSON.stringify(totalDensity));
    localStorage.setItem("averageDensity", JSON.stringify(averageDensity));
    localStorage.setItem("chartData", JSON.stringify(data));
    router.push("/calculator/result");
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
    setCalculatorData((currentData) => [
      ...currentData,
      createNewCalculatorData(),
    ]);
  };

  const handleTabsChange = (index: number) => {
    setTabIndex(index);
    setCurrentProject(projects[index]);
  };

  const fetchUserData = async () => {
    const db = getFirestore(app);
    const docRef = doc(db, "users", auth.currentUser?.uid ?? "");

    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists() && docSnap.data().projects) {
        setProjects(docSnap.data().projects);
        setCurrentProject(docSnap.data().projects[0]);
      } else {
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
      <section className="basis-4/5 grow min-h-screen pt-[150px] px-[120px]">
        <h1 className="text-[30px] text-[black]">
          {/* {currentProject ? currentProject.name : "Select a project"} */}
          Calculator
        </h1>
        <div className="flex flex-col">
          {calculatorData.map((data) => (
            <CalculatorComponent
              key={data.id}
              id={data.id}
              updateCalculatorData={updateCalculatorData}
              removeCalculatorComponent={removeCalculatorComponent}
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
      </section>
    </main>
  );
};

export default Calculator;
