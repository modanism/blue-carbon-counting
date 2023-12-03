import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
} from "@chakra-ui/react";
import IntroSteps from "./IntroSteps";
import Button from "../button/Button";
import { poppins } from "@/app/layout";

const Intro = () => {
  return (
    <section className="flex flex-col justify-start items-center min-h-screen w-full relative">
      <Flex w="100%" justifyContent="center" position="relative" zIndex={5}>
        <div
          className="flex flex-col w-80% relative justify-start items-center bg-[#F8EFD9] rounded-[20px]"
          style={{ marginBottom: "-2rem" }}
        >
          <h1
            className={`text-black text-[44px] ${poppins.className} py-[11px] px-[70px] `}
          >
            Welcome to Carbove, A Tool For Your Positive Impact
          </h1>
        </div>
      </Flex>
      <div className="flex flex-col w-full relative justify-start items-center bg-[#30514B] pt-5">
        <p className="text-[#FFF] text-[20px] text-center max-w-[1068px] m-[25px]">
          Carbove is a blue carbon calculator that combines accuracy, historical
          data, and forecasting to unveil the sublime potential of blue carbon
          embraced by the sanctuary of mangroves.
        </p>
      </div>
      <div className="bg-[#EEEEEE]">
        <div className="grid w-full relative grid-cols-3 place-items-center ">
          <div className="col-span-1 px-[30px]">
            <h1 className="flex flex-col justify-center items-center text-black text-[24px] font-[poppins] font-semibold my-[12px]">
              Species
            </h1>
            <p className="flex text-center text-black h-[80px] font-[16px] justify-center items-start mb-[12px]">
              We provide you 5 species along with its complete variable data:
              Bruguiera gymnorhiza, Rhizophora apiculata, Rhizophora mucronata,
              Salix alba, Xylocarpus granatum
            </p>
          </div>
          <div className="col-span-1 px-[30px]">
            <h1 className="flex flex-col justify-center items-center text-black text-[24px] font-[poppins] font-semibold my-[12px]">
              Biomass
            </h1>
            <p className="flex text-center text-black h-[80px] font-[16px] justify-center items-start mb-[12px]">
              Carbon stocks are calculated by the amount of carbon in the
              biomass and soil. There are 2 main sections; above and below.
            </p>
          </div>
          <div className="col-span-1 px-[30px]">
            <h1 className="flex flex-col justify-center items-center text-black text-[24px] font-[poppins] font-semibold my-[12px]">
              Area Density
            </h1>
            <p className="flex text-center text-black h-[80px] font-[16px] justify-center items-start mb-[12px] ">
              The density of the mangrove area calculated consists of the number
              of trees and the area used for each species.
            </p>
          </div>
        </div>
        <div className="flex flex-col w-[100%] justify-center items-center">
          <h1 className="text-[#54706B] text-[20px] mb-[10px]">
            Biomass Variable Calculation
          </h1>{" "}
          <div className="w-[90%] border-b-2 border-color-[#90A3BF]"></div>
        </div>
        <div className="grid grid-cols-5 w-full relative place-items-center mb-[36px]">
          <div className="col-span-1 px-[30px]">
            <h1 className="flex flex-col h-[50px] justify-center items-center text-black text-[18px] text-center font-[poppins] font-semibold my-[12px]">
              Diameter at breast height (D)
            </h1>
            <p className="flex text-center text-black h-[100px] text-[14px] justify-center items-start">
              The diameter at breast height (DBH) is a standard measure of the
              size of a tree on a specific height above the ground.
            </p>
          </div>
          <div className="col-span-1 px-[30px]">
            <h1 className="flex flex-col h-[50px] justify-center items-center text-black text-[18px] text-center font-[poppins] font-semibold my-[12px]">
              Wood Density (ρ)
            </h1>
            <p className="flex text-center text-black h-[100px] text-[14px] justify-center items-start">
              Mangrove wood density influenced by soil conditions and the
              specific adaptations of each mangrove species to its habitat.
            </p>
          </div>
          <div className="col-span-1 px-[30px]">
            <h1 className="flex flex-col h-[50px] justify-center items-center text-black text-[18px] text-center font-[poppins] font-semibold my-[12px]">
              Soil Depth (cm)
            </h1>
            <p className="flex text-center text-black h-[100px] text-[14px] justify-center items-start">
              Mangroves store a significant amount of carbon, both aboveground
              and belowground, and the soil is a crucial component of this
              carbon storage.
            </p>
          </div>
          <div className="col-span-1 px-[30px]">
            <h1 className="flex flex-col h-[50px] justify-center items-center text-black text-[18px] text-center font-[poppins] font-semibold my-[12px]">
              Bulk Density (g.cm^-3)
            </h1>
            <p className="flex text-center text-black h-[100px] text-[14px] justify-center items-start">
              A measure of the mass of soil per unit volume. The dry mass of
              soil refers to the mass of the soil after removing water.
            </p>
          </div>
          <div className="col-span-1 px-[30px]">
            <h1 className="flex flex-col h-[50px] justify-center items-center text-black text-[18px] text-center font-[poppins] font-semibold my-[12px]">
              Organic Carbon Consentration (%)
            </h1>
            <p className="flex text-center text-black h-[100px] text-[14px] justify-center items-start">
              Mangroves store a significant amount of carbon, both aboveground
              and belowground, and the soil is a crucial component of this
              carbon storage.
            </p>
          </div>
        </div>
      </div>
      <Tabs mb={"50px"}>
        <TabList mb={"60px"}>
          <Tab
            width={"30vw"}
            color={"#1A202C"}
            textColor={"#1A202C"}
            fontSize={"24px"}
            fontWeight={"600"}
          >
            General
          </Tab>
          <Tab
            width={"30vw"}
            color={"#1A202C"}
            textColor={"#1A202C"}
            fontSize={"24px"}
            fontWeight={"600"}
          >
            Allometric
          </Tab>
          <Tab
            width={"30vw"}
            color={"#1A202C"}
            textColor={"#1A202C"}
            fontSize={"24px"}
            fontWeight={"600"}
          >
            Forecast
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel width={"100%"}>
            <IntroSteps tab={"General"} />
          </TabPanel>
          <TabPanel width={"100%"}>
            <IntroSteps tab={"Allometric"} />
          </TabPanel>
          <TabPanel width={"100%"}>
            <IntroSteps tab={"Forecast"} />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <div className="bottom-10 mb-[20px]">
        <Button
          isThin={false}
          dest="/calculator"
          text="Try Now"
          isAnimate={true}
          bgColor={"!bg-neutral-15"}
        />
      </div>
    </section>
  );
};

export default Intro;
