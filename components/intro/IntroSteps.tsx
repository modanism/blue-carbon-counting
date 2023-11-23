import Step from "./Step";
import StepCard from "./StepCard";

const stepData : StepData[] = [
  {
    title: "Diameter of breast height (D)",
    desc: "Aliquam erat volutpat. Integer malesuada turpis id fringilla suscipit. Maecenas ultrices, orci vitae convallis mattis.",
  },
  {
    title: "Wood Density (\u03C1)",
    desc: "Aliquam erat volutpat. Integer malesuada turpis id fringilla suscipit. Maecenas ultrices, orci vitae convallis mattis.",
  },
  {
    title: "Biomass (kg)",
    desc: "Aliquam erat volutpat. Integer malesuada turpis id fringilla suscipit. Maecenas ultrices, orci vitae convallis mattis.",
  },

];



const IntroSteps = () => {
  return (

    <div className="flex flex-row justify-center flex-wrap gap-y-[50px] gap-[78px] w-full">
      {stepData.map((item, index) => {
        return (
          // <Step
          //   key={index}
          //   index={index + 1}
          //   title={item.title}
          //   desc={item.desc}
          //   isFirst={index === 0}
          // />
          <StepCard id={index+1} title={item.title} content={item.desc} key={index} />
        );
      })}
    </div>
  );
};

export default IntroSteps;
