type StepData = {
  title: string;
  desc: string;
};

type ButtonProps = {
  text: string;
  dest: string;
  isAnimate: boolean;
  isThin: boolean;
  bgColor: string;
};

type StepProps = {
  index: number;
  title: string;
  desc: string;
  isFirst: boolean;
};

type AboveFormula = {
  constant: number;
  ownConstant: boolean;
  density: number | string;
  ownDensity: boolean;
  diameter: number | string;
  ownDiameter: boolean;
  height: number | string;
};

type BelowFormula = {
  constant: number;
  ownConstant: boolean;
  density: number | string;
  densityPower: number | string;
  ownDensity: boolean;
  diameter: number | string;
  ownDiameter: boolean;
  height: number | string;
};

type SoilFormula = {
  depth: number;
  bulk: number;
  ownBulk: boolean;
  carbon: number;
  ownCarbon: boolean;
};

type SpeciesData = {
  species: string;
  aboveConstant: number;
  aboveDensity: number;
  aboveDiameter: number;
  aboveHeightPower: number;
  belowConstant: number;
  belowDensity: number;
  belowDensityPower: number;
  belowDiameter: number;
  belowHeight: number;
  carbonPercent: number;
};

type AreaData = {
  trees: number;
  area: number;
};

interface CalculatorData {
  id: string;
  species: SpeciesData;
  area: AreaData
  aboveFormula: AboveFormula;
  belowFormula: BelowFormula;
  soilFormula: SoilFormula;
}

interface CalculatorComponentProps {
  id: string;
  updateCalculatorData: (
    id: string,
    newValues: Partial<CalculatorData>
  ) => void;
}


interface TableData {
    speciesName: string;
    area: number;
    density: number;
    AGB: number;
    BGB: number;
    Soil: number;
    Total: number;
    AGC: number;
    BGC: number;
    soilC: number;
}