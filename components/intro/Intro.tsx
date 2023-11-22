import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import IntroSteps from "./IntroSteps";
import Button from "../button/Button";

const Intro = () => {
  return (
    <section className="flex flex-col justify-start items-center min-h-screen bg-[#EFF2F6] py-[100px] w-full relative">
      <h1 className="text-neutral-10 text-[48px] font-[500] mb-[18px]">
        Lorem ipsum dolor sit amet
      </h1>
      <p className="text-[#1A202C] text-[18px] text-center max-w-[650px] mb-[50px]">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et
      </p>
      <Tabs mb={'50px'}>
        <TabList>
          <Tab
            width={"25vw"}
            color={"#1A202C"}
            textColor={"#1A202C"}
            fontSize={"22px"}
            fontWeight={"600"}
          >
            General Equations
          </Tab>
          <Tab
            width={"25vw"}
            color={"#1A202C"}
            textColor={"#1A202C"}
            fontSize={"22px"}
            fontWeight={"600"}
          >
            Allometric
          </Tab>
          <Tab
            width={"25vw"}
            color={"#1A202C"}
            textColor={"#1A202C"}
            fontSize={"22px"}
            fontWeight={"600"}
          >
            Advanced Equations
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel width={"75vw"}>
            <IntroSteps key={"General Equations"} />
          </TabPanel>
          <TabPanel width={"75vw"}>
            <IntroSteps key={"Allometric"} />
          </TabPanel>
          <TabPanel width={"75vw"}>
            <IntroSteps key={"Advanced Equations"} />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <div className="absolute bottom-10">
        <Button isThin={false} dest="/calculator" text="Try Now" isAnimate={true} />
      </div>
    </section>
  );
};

export default Intro;
