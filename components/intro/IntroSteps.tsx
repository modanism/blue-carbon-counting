import Step from "./Step";
import StepCard from "./StepCard";

const stepData : StepData[] = [
  {
    title: "Choose your species",
    desc: "Choose the mangrove species you want to use!",
  },
  {
    title: "Wood Density (\u03C1)",
    desc: "Fill in the fields based on your data.",
  },
  {
    title: "Biomass (kg)",
    desc: "There you go! We already got you covered with all the other data.",
  },

];const stepData2 : StepData[] = [
  {
    title: "Fill your species",
    desc: "Write the name of the species you want to analyze!",
  },
  {
    title: "Complete the data",
    desc: "Fill all the fields. Or you can just use our general equation!",
  },
  {
    title: "Calculate",
    desc: "There you go! The accurate result based on your accurate data",
  },

];const stepData3 : StepData[] = [
  {
    title: "Try our forecasting",
    desc: "After you got the result, now you can get estimation for years ahead!",
  },
  {
    title: "Complete the data",
    desc: "Prepare historical data over the past years and fill it in.",
  },
  {
    title: "Forecast!",
    desc: "Boom! Now you have became a fortune teller!",
  },

];



const IntroSteps = ({tab}: {tab:string}) => {
  let step
  if (tab === "General") step = stepData
  if (tab === "Allometric") step = stepData2
  if (tab === "Forecast") step = stepData3
  return( <div className="flex flex-row justify-center flex-wrap gap-y-[50px] gap-[78px] w-full">
  
  {step && step.length >0 && step.map((item, index) => {
    
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
</div>)

   
  
  
};

export default IntroSteps;
