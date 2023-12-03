import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  Divider,
  Select,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  Checkbox,
} from "@chakra-ui/react";

import { Field, Form, Formik, FormikHelpers } from "formik";

import CarbonStock from "@/assets/img/carbon-stocks.png";
import Image from "next/image";
import { useEffect, useState } from "react";

// 1. B. gymnorhiza
// 2. R. apiculata
// 3. R. mucronata
// 4. S. alba
// 5. X. Granatum

const speciesData = [
  // B. gymnorhiza
  {
    species: "B. gymnorhiza",
    aboveConstant: 0.0754,
    aboveDensity: 0.764,
    aboveDiameter: 5.506,
    aboveHeightPower: 2.505,
    belowConstant: 0.199,
    belowDensity: 0.764,
    belowDensityPower: 0.899,
    belowDiameter: 5.506,
    belowHeight: 2.22,
    carbonPercent: 51.39, // jadiin desimal
  },
  // R. apiculata
  {
    species: "R. apiculata",
    aboveConstant: 0.043,
    aboveDensity: 1,
    aboveDiameter: 6.657,
    aboveHeightPower: 2.63,
    belowConstant: 0.199,
    belowDensity: 0.843,
    belowDensityPower: 0.899,
    belowDiameter: 6.657,
    belowHeight: 2.22,
    carbonPercent: 52.51,
  },
  // R. mucronata
  {
    species: "R. mucronata",
    aboveConstant: 0.1282,
    aboveDensity: 1,
    aboveDiameter: 7.021,
    aboveHeightPower: 2.6,
    belowConstant: 0.199,
    belowDensity: 0.814,
    belowDensityPower: 0.899,
    belowDiameter: 7.021,
    belowHeight: 2.22,
    carbonPercent: 51.36,
  },
  // S. alba
  {
    species: "S. alba",
    aboveConstant: 0.3841,
    aboveDensity: 0.509,
    aboveDiameter: 12.395,
    aboveHeightPower: 2.101,
    belowConstant: 0.199,
    belowDensity: 0.509,
    belowDensityPower: 0.899,
    belowDiameter: 12.395,
    belowHeight: 2.22,
    carbonPercent: 55.27,
  },
  // X. granatum
  {
    species: "X. granatum",
    aboveConstant: 0.1832,
    aboveDensity: 1,
    aboveDiameter: 2.5,
    aboveHeightPower: 2.21,
    belowConstant: 0.199,
    belowDensity: 0.851,
    belowDensityPower: 0.899,
    belowDiameter: 2.5,
    belowHeight: 2.22,
    carbonPercent: 45.99,
  },
];

const CalculatorComponent = ({
  id,
  updateCalculatorData,
  removeCalculatorComponent,
}: CalculatorComponentProps) => {
  const [isOwnSpecies, setIsOwnSpecies] = useState(false);
  const [selectedSpeciesName, setSelectedSpeciesName] = useState("");
  const [area, setArea] = useState<AreaData>({ area: 0, trees: 0 });

  const [species, setSpecies] = useState(speciesData[0]);
  const [aboveFormula, setAboveFormula] = useState<AboveFormula>({
    constant: 0.251,
    ownConstant: false,
    density: 0.764,
    ownDensity: false,
    diameter: 10,
    ownDiameter: false,
    height: 2.53,
  });

  const [belowFormula, setBelowFormula] = useState<BelowFormula>({
    constant: 0.199,
    ownConstant: false,
    density: 0.843,
    densityPower: 0.899,
    ownDensity: false,
    diameter: 10,
    ownDiameter: false,
    height: 2.32,
  });

  const [soilFormula, setSoilFormula] = useState<SoilFormula>({
    depth: 0,
    bulk: 0,
    ownBulk: false,
    carbon: 0,
    ownCarbon: false,
  });

  function getCorrespondingValue(x: number): number {
    console.log(`X : ${x}`);

    if (x < 0) {
      return 0.685;
    } else if (x >= 0 && x < 15) {
      return 0.685;
    } else if (x >= 15 && x < 30) {
      return 0.863;
    } else if (x >= 30 && x < 60) {
      return 0.836;
    } else if (x >= 60 && x <= 90) {
      return 0.842;
    } else {
      return 0.842;
    }
  }

  const findSpeciesData = (speciesName: string) => {
    return speciesData.find((species) => species.species === speciesName);
  };

  const updateParentData = () => {
    updateCalculatorData(id, {
      species,
      area,
      aboveFormula,
      belowFormula,
      soilFormula,
    });
  };
  useEffect(() => {
    updateParentData();
  }, [species, area, aboveFormula, belowFormula, soilFormula]);

  return (
    <div className="mb-[20px] flex flex-col">
      <span className="h-[2px] w-full bg-[#30514B] my-[20px] rounded-full" />
      <div className="flex flex-col w-full mb-[30px]">
        <div className="flex w-full justify-between">
          <div className="bg-[#314C47] w-[40%] py-[12px] px-[20px] rounded-[25px]">
            <div className="mb-[5px] flex justify-between items-center w-full">
              <div className=" flex">
                <h1 className="text-[24px] text-[white]">Species</h1>
                <h1 className="text-[16px] text-[red]">*</h1>
              </div>
              <Popover>
                <PopoverTrigger>
                  <div className="select-none bg-[#FFF0CA] cursor-pointer flex justify-center items-center w-[24px] h-[24px] rounded-full text-[black] text-[16px] font-semibold">
                    ?
                  </div>
                </PopoverTrigger>
                <PopoverContent w={"200px"} borderRadius={"15px"}>
                  <PopoverArrow bgColor={"#FFF0CA"} />
                  <PopoverBody bgColor={"#FFF0CA"} borderRadius={"15px"}>
                    <h1 className="text-[16px] text-[black] font-bold w-[170px] mb-[10px]">
                      Species{" "}
                    </h1>
                    <p className="text-[14px] text-[black] w-[170px]">
                      We provide 5 different species, complete with detailed
                      data. If you have another species, you have the
                      flexibility to add as much species as you need.
                    </p>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </div>
            <Divider orientation="horizontal" marginBottom={"10px"} />
            <div>
              {isOwnSpecies ? (
                <Input
                  onChange={(e) => {
                    setSpecies((prev) => ({
                      ...prev,
                      species: e.target.value,
                    }));
                  }}
                  placeholder="Your own species"
                  className="bg-[#FAFAFA] rounded-[12px] text-[#585656] mb-[10px] mt-[8px]"
                />
              ) : (
                <Select
                  value={selectedSpeciesName}
                  placeholder="Select a species"
                  className="bg-[#FAFAFA] rounded-[12px] text-[#585656] mb-[10px] mt-[8px]"
                  onChange={(e) => {
                    const newSpeciesName = e.target.value;
                    setSelectedSpeciesName(newSpeciesName);
                    const selectedSpecies = findSpeciesData(e.target.value);
                    if (selectedSpecies) {
                      setSpecies(selectedSpecies);
                      setAboveFormula({
                        constant: selectedSpecies.aboveConstant,
                        ownConstant: false,
                        density: selectedSpecies.aboveDensity,
                        ownDensity: false,
                        diameter: selectedSpecies.aboveDiameter,
                        ownDiameter: false,
                        height: selectedSpecies.aboveHeightPower,
                      });
                      setBelowFormula({
                        constant: selectedSpecies.belowConstant,
                        ownConstant: false,
                        density: selectedSpecies.belowDensity,
                        densityPower: selectedSpecies.belowDensityPower,
                        ownDensity: false,
                        diameter: selectedSpecies.belowDiameter,
                        ownDiameter: false,
                        height: selectedSpecies.belowHeight,
                      });
                      setSoilFormula({
                        depth: 0, // Keep the existing depth
                        bulk: getCorrespondingValue(0), // Calculate bulk density based on the depth
                        ownBulk: false,
                        carbon: selectedSpecies.carbonPercent,
                        ownCarbon: false,
                      });
                    }
                  }}
                >
                  <option value="B. gymnorhiza">B. gymnorhiza</option>
                  <option value="R. apiculata">R. apiculata</option>
                  <option value="R. mucronata">R. mucronata</option>
                  <option value="S. alba">S. alba</option>
                  <option value="X. granatum">X. Granatum</option>
                </Select>
              )}

              <Checkbox
                onChange={(e) => {
                  setIsOwnSpecies(e.target.checked);
                  setAboveFormula((prev) => ({
                    ...prev,
                    density: "\u03C1",
                    diameter: "D",
                  }));
                  setBelowFormula((prev) => ({
                    ...prev,
                    density: "\u03C1",
                    diameter: "D",
                  }));

                  if (!e.target.checked) {
                    setAboveFormula((prev) => ({
                      ...prev,
                      density: 0.764,
                      diameter: 10,
                    }));
                    setBelowFormula((prev) => ({
                      ...prev,
                      density: 0.843,
                      diameter: 10,
                    }));
                  }
                }}
              >
                Use your own species
              </Checkbox>
            </div>
          </div>

          <div className="bg-[#314C47] w-[55%] py-[12px] px-[20px] rounded-[25px]">
            <FormControl className="w-full" isRequired>
              <div className="mb-[5px] flex justify-between items-center w-full">
                <FormLabel className=" flex">
                  <h1 className="text-[24px] text-[white]">Area</h1>
                </FormLabel>
                <Popover>
                  <PopoverTrigger>
                    <div className="select-none bg-[#FFF0CA] cursor-pointer flex justify-center items-center w-[24px] h-[24px] rounded-full text-[black] text-[16px] font-semibold">
                      ?
                    </div>
                  </PopoverTrigger>
                  <PopoverContent w={"200px"} borderRadius={"15px"}>
                    <PopoverArrow bgColor={"#FFF0CA"} />
                    <PopoverBody bgColor={"#FFF0CA"} borderRadius={"15px"}>
                      <h1 className="text-[16px] text-[black] font-bold w-[170px] mb-[10px]">
                        Area Density
                      </h1>
                      <p className="text-[14px] text-[black] w-[170px]">
                        With assumption that the tree ages are same and the
                        surface area is cumulative.
                      </p>
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              </div>
              <Divider orientation="horizontal" marginBottom={"10px"} />
              <div className="flex w-full justify-between">
                <div className="flex gap-[10px] items-center w-[40%]">
                  <NumberInput
                    min={0}
                    className="basis-3/4 bg-[#FAFAFA] rounded-[12px] text-[#585656] mt-[8px] mb-[10px] w-[40%]"
                  >
                    <NumberInputField
                      value={area.trees}
                      onChange={(e) => {
                        setArea((prev) => ({
                          ...prev,
                          trees: Number(e.target.value),
                        }));
                      }}
                    />
                  </NumberInput>
                  <p className="basis-1/4 text-center">trees</p>
                </div>

                <div className="flex gap-[10px] items-center w-[40%]">
                  <NumberInput className="basis-3/4 bg-[#FAFAFA] rounded-[12px] text-[#585656] mt-[8px] mb-[10px] w-[40%]">
                    <NumberInputField
                      value={area.area}
                      onChange={(e) => {
                        setArea((prev) => ({
                          ...prev,
                          area: Number(e.target.value),
                        }));
                      }}
                    />
                  </NumberInput>
                  <p className="basis-1/4 w-fit text-center">ha</p>
                </div>
              </div>
            </FormControl>
          </div>
        </div>
      </div>

      <div className="w-full bg-[#314C47] rounded-[25px] p-[18px]">
        <h1 className="text-[24px] text-[white] font-bold">Biomass</h1>
        <Divider
          orientation="horizontal"
          color={"#314C47"}
          marginBottom={"10px"}
          marginTop={"10px"}
        />
        <div className="flex flex-col gap-[5px] mb-[20px]">
          <div className="w-full flex justify-between">
            <h1 className="text-[20px] text-[white] font-semibold">
              Aboveground Biomass Formula
            </h1>
            <Popover>
              <PopoverTrigger>
                <div className="select-none bg-[#FFF0CA] cursor-pointer flex justify-center items-center w-[24px] h-[24px] rounded-full text-[black] text-[16px] font-semibold">
                  ?
                </div>
              </PopoverTrigger>
              <PopoverContent borderRadius={"15px"} w={"220px"}>
                <PopoverArrow bgColor={"#FFF0CA"} />
                <PopoverBody bgColor={"#FFF0CA"} borderRadius={"15px"}>
                  <h1 className="text-[16px] text-[black] font-bold mb-[10px]">
                    Equations used (Above)
                  </h1>
                  <div className="px-[20px] mb-[10px]">
                    <ul className="list-disc list-outside text-[11px] text-[black]">
                      <li>
                        The equations of 5 species provided will be filled
                        automatically using the allometric equations.
                      </li>
                      <li>
                        Equations of the species added manually will be filled
                        automatically using the general equations.
                      </li>
                      <li>Check the box if you have your own equations.</li>
                    </ul>
                  </div>
                  <h2 className="text-[11px] text-[#8A8787] text-center">
                    Above Ground General Equation
                  </h2>
                  <div className="flex bg-[#FFFFFF] rounded-[50px] justify-center py-[5px] px-[18px] mb-[10px]">
                    <p className="text-[#1D1D1D] text-[11px] font-bold">
                      B = 0.251 x 0.764 x 10
                    </p>
                    <p className="text-[#1D1D1D] text-[8px] font-bold">2.63</p>
                  </div>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </div>

          <div className="w-full flex items-center justify-center">
            <div className="flex bg-[#FFFFFF] rounded-[50px] justify-center py-[5px] px-[18px] mb-[10px]">
              <p className="text-[#1D1D1D] text-[16px] font-bold">
                B = {aboveFormula.constant} x {aboveFormula.density} x{" "}
                {aboveFormula.diameter}
              </p>
              <p className="text-[#1D1D1D] text-[11px] font-bold">
                {aboveFormula.height}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-[60px]">
            <div className="flex flex-col gap-[5px] justify-center items-center w-[25%]">
              <h1>Constant Number</h1>
              {aboveFormula.ownConstant ? (
                <>
                  <NumberInput className="bg-[#54706B] rounded-[25px]  p-0 w-[50%] text-[#FAFAFA] mt-[8px] mb-[10px]">
                    <NumberInputField
                      onChange={(e) =>
                        setAboveFormula((prev) => ({
                          ...prev,
                          constant: Number(e.target.value),
                        }))
                      }
                      className="h-[28px] rounded-[25px] text-center px-[10px] py-[2px]"
                    />
                  </NumberInput>
                </>
              ) : (
                <>
                  <NumberInput
                    isDisabled
                    value={aboveFormula.constant}
                    className="bg-[#54706B] rounded-[25px]  p-0 w-[50%] text-[#FAFAFA] mt-[8px] mb-[10px]"
                  >
                    <NumberInputField className="h-[28px] rounded-[25px] text-center px-[10px] py-[2px]" />
                  </NumberInput>
                </>
              )}

              <Checkbox
                onChange={(e) => {
                  setAboveFormula((prev) => ({
                    ...prev,
                    ownConstant: e.target.checked,
                  }));
                  if (!e.target.checked) {
                    setAboveFormula((prev) => ({
                      ...prev,
                      constant: species.aboveConstant,
                    }));
                  }
                }}
              >
                <p className="text-[11px] text-[#FAFAFA]">
                  Fill your own number
                </p>
              </Checkbox>
            </div>
            <div className="flex flex-col gap-[5px] justify-center items-center w-[25%] border-x-2 border-[#5B6F6B]">
              <h1>Wood Density</h1>
              <div className="w-full flex justify-center items-center gap-[7px]">
                {isOwnSpecies ? (
                  <>
                    <NumberInput className="bg-[#54706B] rounded-[25px]  p-0 w-[30%] text-[#FAFAFA] mt-[8px] mb-[10px]">
                      <NumberInputField
                        onChange={(e) =>
                          setAboveFormula((prev) => ({
                            ...prev,
                            density: Number(e.target.value),
                          }))
                        }
                        className="h-[28px] rounded-[25px] text-center px-[10px] py-[2px]"
                      />
                    </NumberInput>
                  </>
                ) : aboveFormula.ownDensity ? (
                  <>
                    <NumberInput className="bg-[#54706B] rounded-[25px]  p-0 w-[30%] text-[#FAFAFA] mt-[8px] mb-[10px]">
                      <NumberInputField
                        onChange={(e) =>
                          setAboveFormula((prev) => ({
                            ...prev,
                            density: Number(e.target.value),
                          }))
                        }
                        className="h-[28px] rounded-[25px] text-center px-[10px] py-[2px]"
                      />
                    </NumberInput>
                  </>
                ) : (
                  <>
                    <NumberInput
                      isDisabled
                      value={aboveFormula.density}
                      className="bg-[#54706B] rounded-[25px]  p-0 w-[30%] text-[#FAFAFA] mt-[8px] mb-[10px]"
                    >
                      <NumberInputField className="h-[28px] rounded-[25px] text-center px-[10px] py-[2px]" />
                    </NumberInput>
                  </>
                )}
                <div className="flex font-bold">
                  <p className="text-[12px] text-[#FAFAFA]">g.cm</p>
                  <p className="text-[10px] text-[#FAFAFA]">-3</p>
                </div>
              </div>

              {isOwnSpecies ? (
                <></>
              ) : (
                <>
                  <Checkbox
                    onChange={(e) => {
                      setAboveFormula((prev) => ({
                        ...prev,
                        ownDensity: e.target.checked,
                      }));
                      if (!e.target.checked) {
                        setAboveFormula((prev) => ({
                          ...prev,
                          density: species.aboveDensity,
                        }));
                      }
                    }}
                  >
                    <p className="text-[11px] text-[#FAFAFA]">
                      Fill your own number
                    </p>
                  </Checkbox>
                </>
              )}
            </div>
            <div className="flex flex-col gap-[5px] justify-center items-center w-[25%]">
              <h1>Diameter at breast height</h1>
              <div className="w-full flex justify-center items-center gap-[7px]">
                {isOwnSpecies ? (
                  <>
                    <NumberInput className="bg-[#54706B] rounded-[25px]  p-0 w-[20%] text-[#FAFAFA] mt-[8px] mb-[10px]">
                      <NumberInputField
                        onChange={(e) =>
                          setAboveFormula((prev) => ({
                            ...prev,
                            diameter: Number(e.target.value),
                          }))
                        }
                        className="h-[28px] rounded-[25px] text-center px-[10px] py-[2px]"
                      />
                    </NumberInput>
                  </>
                ) : aboveFormula.ownDiameter ? (
                  <>
                    <NumberInput className="bg-[#54706B] rounded-[25px]  p-0 w-[20%] text-[#FAFAFA] mt-[8px] mb-[10px]">
                      <NumberInputField
                        onChange={(e) =>
                          setAboveFormula((prev) => ({
                            ...prev,
                            diameter: Number(e.target.value),
                          }))
                        }
                        className="h-[28px] rounded-[25px] text-center px-[10px] py-[2px]"
                      />
                    </NumberInput>
                  </>
                ) : (
                  <>
                    <NumberInput
                      isDisabled
                      value={aboveFormula.diameter}
                      className="bg-[#54706B] rounded-[25px]  p-0 w-[20%] text-[#FAFAFA] mt-[8px] mb-[10px]"
                    >
                      <NumberInputField className="h-[28px] rounded-[25px] text-center px-[10px] py-[2px]" />
                    </NumberInput>
                  </>
                )}
                <p className="text-[12px] text-[#FAFAFA] font-bold">cm</p>
                {isOwnSpecies ? (
                  <>
                    <NumberInput className="bg-[#54706B] rounded-[25px]  p-0 w-[25%] text-[#FAFAFA] mt-[8px] mb-[10px]">
                      <NumberInputField
                        onChange={(e) =>
                          setAboveFormula((prev) => ({
                            ...prev,
                            height: Number(e.target.value),
                          }))
                        }
                        className="h-[28px] rounded-[25px] text-center px-[10px] py-[2px]"
                      />
                    </NumberInput>
                  </>
                ) : aboveFormula.ownDiameter ? (
                  <>
                    <NumberInput className="bg-[#54706B] rounded-[25px]  p-0 w-[25%] text-[#FAFAFA] mt-[8px] mb-[10px]">
                      <NumberInputField
                        onChange={(e) =>
                          setAboveFormula((prev) => ({
                            ...prev,
                            height: Number(e.target.value),
                          }))
                        }
                        className="h-[28px] rounded-[25px] text-center px-[10px] py-[2px]"
                      />
                    </NumberInput>
                  </>
                ) : (
                  <>
                    <NumberInput
                      isDisabled
                      value={aboveFormula.height}
                      className="bg-[#54706B] rounded-[25px]  p-0 w-[25%] text-[#FAFAFA] mt-[8px] mb-[10px]"
                    >
                      <NumberInputField className="h-[28px] rounded-[25px] text-center px-[10px] py-[2px]" />
                    </NumberInput>
                  </>
                )}
              </div>

              {isOwnSpecies ? (
                <></>
              ) : (
                <>
                  <Checkbox
                    onChange={(e) => {
                      //   setIsOwnDiameterNumber(e.target.checked);
                      setAboveFormula((prev) => ({
                        ...prev,
                        ownDiameter: e.target.checked,
                      }));
                      if (!e.target.checked) {
                        setAboveFormula((prev) => ({
                          ...prev,
                          diameter: species.aboveDiameter,
                          height: species.aboveHeightPower,
                        }));
                      }
                    }}
                  >
                    <p className="text-[11px] text-[#FAFAFA]">
                      Fill your own number
                    </p>
                  </Checkbox>
                </>
              )}
            </div>
          </div>
        </div>
        <Divider
          orientation="horizontal"
          color={"#314C47"}
          marginBottom={"20px"}
        />
        <div className="flex flex-col gap-[5px] mb-[20px]">
          <div className="w-full flex justify-between">
            <h1 className="text-[20px] text-[white] font-semibold">
              Belowground Biomass Formula
            </h1>
            <Popover>
              <PopoverTrigger>
                <div className="select-none bg-[#FFF0CA] cursor-pointer flex justify-center items-center w-[24px] h-[24px] rounded-full text-[black] text-[16px] font-semibold">
                  ?
                </div>
              </PopoverTrigger>
              <PopoverContent borderRadius={"15px"} w={"220px"}>
                <PopoverArrow bgColor={"#FFF0CA"} />
                <PopoverBody bgColor={"#FFF0CA"} borderRadius={"15px"}>
                  <h1 className="text-[16px] text-[black] font-bold mb-[10px]">
                    Equations used (Below)
                  </h1>
                  <div className="px-[20px] mb-[10px]">
                    <ul className="list-disc list-outside text-[11px] text-[black]">
                      <li>
                        The equations of the 5 species given or added manually
                        will be filled automatically using the general
                        equations.
                      </li>
                      <li>Check the box if you have your own equations.</li>
                    </ul>
                  </div>
                  <h2 className="text-[11px] text-[#8A8787] text-center">
                    Below Ground General Equation
                  </h2>
                  <div className="flex bg-[#FFFFFF] rounded-[50px] justify-center py-[5px] px-[18px] mb-[10px]">
                    <p className="text-[#1D1D1D] text-[11px] font-bold">
                      B = 0.199 x {"\u03C1"}
                    </p>
                    <p className="text-[#1D1D1D] text-[8px] font-bold">0.899</p>
                    <p className="text-[#1D1D1D] text-[11px] font-bold">D</p>
                    <p className="text-[#1D1D1D] text-[8px] font-bold">2.22</p>
                  </div>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </div>

          <div className="w-full flex items-center justify-center">
            <div className="flex bg-[#FFFFFF] rounded-[50px] justify-center py-[5px] px-[18px] mb-[10px]">
              <p className="text-[#1D1D1D] text-[16px] font-bold">
                B = {belowFormula.constant} x {belowFormula.density}
              </p>
              <p className="text-[#1D1D1D] text-[11px] font-bold">
                {belowFormula.densityPower}
              </p>
              <p className="text-[#1D1D1D] text-[16px] font-bold">
                x {belowFormula.diameter}
              </p>
              <p className="text-[#1D1D1D] text-[11px] font-bold">
                {belowFormula.height}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-[60px]">
            <div className="flex flex-col gap-[5px] justify-center items-center w-[25%]">
              <h1>Constant Number</h1>
              {belowFormula.ownConstant ? (
                <>
                  <NumberInput className="bg-[#54706B] rounded-[25px]  p-0 w-[50%] text-[#FAFAFA] mt-[8px] mb-[10px]">
                    <NumberInputField
                      onChange={(e) =>
                        setBelowFormula((prev) => ({
                          ...prev,
                          constant: Number(e.target.value),
                        }))
                      }
                      className="h-[28px] rounded-[25px] text-center px-[10px] py-[2px]"
                    />
                  </NumberInput>
                </>
              ) : (
                <>
                  <NumberInput
                    isDisabled
                    value={belowFormula.constant}
                    className="bg-[#54706B] rounded-[25px]  p-0 w-[50%] text-[#FAFAFA] mt-[8px] mb-[10px]"
                  >
                    <NumberInputField className="h-[28px] rounded-[25px] text-center px-[10px] py-[2px]" />
                  </NumberInput>
                </>
              )}

              <Checkbox
                onChange={(e) => {
                  setBelowFormula((prev) => ({
                    ...prev,
                    ownConstant: e.target.checked,
                  }));
                  if (!e.target.checked) {
                    setBelowFormula((prev) => ({
                      ...prev,
                      constant: species.belowConstant,
                    }));
                  }
                }}
              >
                <p className="text-[11px] text-[#FAFAFA]">
                  Fill your own number
                </p>
              </Checkbox>
            </div>
            <div className="flex flex-col gap-[5px] justify-center items-center w-[25%] border-x-2 border-[#5B6F6B]">
              <h1>Wood Density</h1>
              <div className="w-full flex justify-center items-center gap-[7px]">
                {isOwnSpecies ? (
                  <>
                    <NumberInput className="bg-[#54706B] rounded-[25px]  p-0 w-[30%] text-[#FAFAFA] mt-[8px] mb-[10px]">
                      <NumberInputField
                        onChange={(e) =>
                          setBelowFormula((prev) => ({
                            ...prev,
                            density: Number(e.target.value),
                          }))
                        }
                        className="h-[28px] rounded-[25px] text-center px-[10px] py-[2px]"
                      />
                    </NumberInput>
                  </>
                ) : belowFormula.ownDensity ? (
                  <>
                    <NumberInput className="bg-[#54706B] rounded-[25px]  p-0 w-[30%] text-[#FAFAFA] mt-[8px] mb-[10px]">
                      <NumberInputField
                        onChange={(e) =>
                          setBelowFormula((prev) => ({
                            ...prev,
                            density: Number(e.target.value),
                          }))
                        }
                        className="h-[28px] rounded-[25px] text-center px-[10px] py-[2px]"
                      />
                    </NumberInput>
                  </>
                ) : (
                  <>
                    <NumberInput
                      isDisabled
                      value={belowFormula.density}
                      className="bg-[#54706B] rounded-[25px]  p-0 w-[30%] text-[#FAFAFA] mt-[8px] mb-[10px]"
                    >
                      <NumberInputField className="h-[28px] rounded-[25px] text-center px-[10px] py-[2px]" />
                    </NumberInput>
                  </>
                )}
                <div className="flex font-bold">
                  <p className="text-[12px] text-[#FAFAFA]">g.cm</p>
                  <p className="text-[10px] text-[#FAFAFA]">-3</p>
                </div>
                {isOwnSpecies ? (
                  <>
                    <NumberInput className="bg-[#54706B] rounded-[25px]  p-0 w-[25%] text-[#FAFAFA] mt-[8px] mb-[10px]">
                      <NumberInputField
                        onChange={(e) =>
                          setBelowFormula((prev) => ({
                            ...prev,
                            densityPower: Number(e.target.value),
                          }))
                        }
                        className="h-[28px] rounded-[25px] text-center px-[10px] py-[2px]"
                      />
                    </NumberInput>
                  </>
                ) : belowFormula.ownDensity ? (
                  <>
                    <NumberInput className="bg-[#54706B] rounded-[25px]  p-0 w-[25%] text-[#FAFAFA] mt-[8px] mb-[10px]">
                      <NumberInputField
                        onChange={(e) =>
                          setBelowFormula((prev) => ({
                            ...prev,
                            densityPower: Number(e.target.value),
                          }))
                        }
                        className="h-[28px] rounded-[25px] text-center px-[10px] py-[2px]"
                      />
                    </NumberInput>
                  </>
                ) : (
                  <>
                    <NumberInput
                      isDisabled
                      value={belowFormula.densityPower}
                      className="bg-[#54706B] rounded-[25px]  p-0 w-[25%] text-[#FAFAFA] mt-[8px] mb-[10px]"
                    >
                      <NumberInputField className="h-[28px] rounded-[25px] text-center px-[10px] py-[2px]" />
                    </NumberInput>
                  </>
                )}
              </div>

              {isOwnSpecies ? (
                <></>
              ) : (
                <>
                  <Checkbox
                    onChange={(e) => {
                      setBelowFormula((prev) => ({
                        ...prev,
                        ownDensity: e.target.checked,
                      }));
                      if (!e.target.checked) {
                        setBelowFormula((prev) => ({
                          ...prev,
                          density: species.belowDensity,
                        }));
                      }
                    }}
                  >
                    <p className="text-[11px] text-[#FAFAFA]">
                      Fill your own number
                    </p>
                  </Checkbox>
                </>
              )}
            </div>
            <div className="flex flex-col gap-[5px] justify-center items-center w-[25%]">
              <h1>Diameter at breast height</h1>
              <div className="w-full flex justify-center items-center gap-[7px]">
                {isOwnSpecies ? (
                  <>
                    <NumberInput className="bg-[#54706B] rounded-[25px]  p-0 w-[20%] text-[#FAFAFA] mt-[8px] mb-[10px]">
                      <NumberInputField
                        onChange={(e) =>
                          setBelowFormula((prev) => ({
                            ...prev,
                            diameter: Number(e.target.value),
                          }))
                        }
                        className="h-[28px] rounded-[25px] text-center px-[10px] py-[2px]"
                      />
                    </NumberInput>
                  </>
                ) : belowFormula.ownDiameter ? (
                  <>
                    <NumberInput className="bg-[#54706B] rounded-[25px]  p-0 w-[20%] text-[#FAFAFA] mt-[8px] mb-[10px]">
                      <NumberInputField
                        onChange={(e) =>
                          setBelowFormula((prev) => ({
                            ...prev,
                            diameter: Number(e.target.value),
                          }))
                        }
                        className="h-[28px] rounded-[25px] text-center px-[10px] py-[2px]"
                      />
                    </NumberInput>
                  </>
                ) : (
                  <>
                    <NumberInput
                      isDisabled
                      value={belowFormula.diameter}
                      className="bg-[#54706B] rounded-[25px]  p-0 w-[20%] text-[#FAFAFA] mt-[8px] mb-[10px]"
                    >
                      <NumberInputField className="h-[28px] rounded-[25px] text-center px-[10px] py-[2px]" />
                    </NumberInput>
                  </>
                )}
                <p className="text-[12px] text-[#FAFAFA] font-bold">cm</p>
                {isOwnSpecies ? (
                  <>
                    <NumberInput className="bg-[#54706B] rounded-[25px]  p-0 w-[25%] text-[#FAFAFA] mt-[8px] mb-[10px]">
                      <NumberInputField
                        onChange={(e) =>
                          setBelowFormula((prev) => ({
                            ...prev,
                            height: Number(e.target.value),
                          }))
                        }
                        className="h-[28px] rounded-[25px] text-center px-[10px] py-[2px]"
                      />
                    </NumberInput>
                  </>
                ) : belowFormula.ownDiameter ? (
                  <>
                    <NumberInput className="bg-[#54706B] rounded-[25px]  p-0 w-[25%] text-[#FAFAFA] mt-[8px] mb-[10px]">
                      <NumberInputField
                        onChange={(e) =>
                          setBelowFormula((prev) => ({
                            ...prev,
                            height: Number(e.target.value),
                          }))
                        }
                        className="h-[28px] rounded-[25px] text-center px-[10px] py-[2px]"
                      />
                    </NumberInput>
                  </>
                ) : (
                  <>
                    <NumberInput
                      isDisabled
                      value={belowFormula.height}
                      className="bg-[#54706B] rounded-[25px]  p-0 w-[25%] text-[#FAFAFA] mt-[8px] mb-[10px]"
                    >
                      <NumberInputField className="h-[28px] rounded-[25px] text-center px-[10px] py-[2px]" />
                    </NumberInput>
                  </>
                )}
              </div>

              {isOwnSpecies ? (
                <></>
              ) : (
                <>
                  <Checkbox
                    onChange={(e) => {
                      //   setIsOwnDiameterNumber(e.target.checked);
                      setBelowFormula((prev) => ({
                        ...prev,
                        ownDiameter: e.target.checked,
                      }));
                      if (!e.target.checked) {
                        setBelowFormula((prev) => ({
                          ...prev,
                          diameter: species.belowDiameter,
                          height: species.belowHeight,
                        }));
                      }
                    }}
                  >
                    <p className="text-[11px] text-[#FAFAFA]">
                      Fill your own number
                    </p>
                  </Checkbox>
                </>
              )}
            </div>
          </div>
        </div>
        <Divider
          orientation="horizontal"
          color={"#314C47"}
          marginBottom={"20px"}
        />
        <div className="flex flex-col gap-[5px] mb-[20px]">
          <h1 className="text-[20px] text-[white] font-semibold">
            Soil Carbon Stocks
          </h1>
          <div className="flex items-center justify-center gap-[60px]">
            <div className="flex flex-col gap-[5px] justify-center items-center w-[25%]">
              <h1>Soil Depth</h1>

              <>
                <div className="flex items-center gap-[5px] w-full justify-center">
                  <NumberInput
                    max={90}
                    className="bg-[#54706B] rounded-[25px]  p-0 w-[40%] text-[#FAFAFA] mt-[8px] mb-[10px]"
                  >
                    <NumberInputField
                      onChange={(e) =>
                        setSoilFormula((prev) => ({
                          ...prev,
                          depth: Number(e.target.value),
                          bulk: getCorrespondingValue(Number(e.target.value)),
                        }))
                      }
                      className="h-[28px] rounded-[25px] text-center px-[10px] py-[2px]"
                    />
                  </NumberInput>
                  <p className="text-[12px] text-[#FAFAFA] font-bold">cm</p>
                </div>

                <span className="h-[20px]" />
              </>
            </div>
            <div className="flex flex-col gap-[5px] justify-center items-center w-[25%] border-x-2 border-[#5B6F6B]">
              <h1>Bulk Density</h1>
              <div className="w-full flex justify-center items-center gap-[7px]">
                {isOwnSpecies ? (
                  <>
                    <NumberInput className="bg-[#54706B] rounded-[25px]  p-0 w-[30%] text-[#FAFAFA] mt-[8px] mb-[10px]">
                      <NumberInputField
                        onChange={(e) =>
                          setSoilFormula((prev) => ({
                            ...prev,
                            bulk: Number(e.target.value),
                          }))
                        }
                        className="h-[28px] rounded-[25px] text-center px-[10px] py-[2px]"
                      />
                    </NumberInput>
                  </>
                ) : soilFormula.ownBulk ? (
                  <>
                    <NumberInput className="bg-[#54706B] rounded-[25px]  p-0 w-[30%] text-[#FAFAFA] mt-[8px] mb-[10px]">
                      <NumberInputField
                        onChange={(e) =>
                          setSoilFormula((prev) => ({
                            ...prev,
                            bulk: Number(e.target.value),
                          }))
                        }
                        className="h-[28px] rounded-[25px] text-center px-[10px] py-[2px]"
                      />
                    </NumberInput>
                  </>
                ) : (
                  <>
                    <NumberInput
                      isDisabled
                      value={soilFormula.bulk}
                      className="bg-[#54706B] rounded-[25px]  p-0 w-[30%] text-[#FAFAFA] mt-[8px] mb-[10px]"
                    >
                      <NumberInputField className="h-[28px] rounded-[25px] text-center px-[10px] py-[2px]" />
                    </NumberInput>
                  </>
                )}
                <div className="flex font-bold">
                  <p className="text-[12px] text-[#FAFAFA]">g.cm</p>
                  <p className="text-[10px] text-[#FAFAFA]">-3</p>
                </div>
              </div>

              {isOwnSpecies ? (
                <></>
              ) : (
                <>
                  <Checkbox
                    onChange={(e) => {
                      setSoilFormula((prev) => ({
                        ...prev,
                        ownBulk: e.target.checked,
                      }));
                      if (!e.target.checked) {
                        setSoilFormula((prev) => ({
                          ...prev,
                          bulk: getCorrespondingValue(soilFormula.depth),
                        }));
                      }
                    }}
                  >
                    <p className="text-[11px] text-[#FAFAFA]">
                      Fill your own number
                    </p>
                  </Checkbox>
                </>
              )}
            </div>
            <div className="flex flex-col gap-[5px] justify-center items-center w-[25%]">
              <h1 className="text-[14px] text-[#FAFAFA] font-semibold ">
                Organic Carbon Consentration
              </h1>
              <div className="w-full flex justify-center items-center gap-[7px]">
                <>
                  <div className="flex items-center gap-[5px] w-full justify-center">
                    <NumberInput className="bg-[#54706B] rounded-[25px]  p-0 w-[25%] text-[#FAFAFA] mt-[8px] mb-[10px]">
                      <NumberInputField
                        onChange={(e) =>
                          setSoilFormula((prev) => ({
                            ...prev,
                            carbon: Number(e.target.value),
                          }))
                        }
                        className="h-[28px] rounded-[25px] text-center px-[10px] py-[2px]"
                      />
                    </NumberInput>
                    <p className="text-[12px] text-[#FAFAFA] font-bold">%</p>
                  </div>

                  <span className="h-[20px]" />
                </>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full justify-end">
        <button
          onClick={() => removeCalculatorComponent(id)}
          className="bg-[red] text-[white] px-[20px] py-[12px] font-bold rounded-[25px] mt-[20px] mr-[20px]"
        >
          Delete
        </button>
      </div>
      {/* <button type="submit" className="bg-[red]">
            Submit
          </button> */}
    </div>
  );
};

export default CalculatorComponent;
