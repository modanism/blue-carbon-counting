"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Spinner,
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
import { useState, useEffect, SetStateAction } from "react";
import { onAuthStateChanged } from "firebase/auth";

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
      {isLoggedIn ? (
        <>
          <section className="flex flex-col items-start basis-1/5 bg-[#EFF2F6] h-[100vh] pt-[150px] relative">
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
      )}
      <section className="basis-4/5 grow min-h-screen pt-[150px]">
        <h1 className="text-[30px] text-[black]">
          {currentProject ? currentProject.name : "Select a project"}
        </h1>
      </section>
    </main>
  );
};

export default Calculator;
