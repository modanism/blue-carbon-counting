import Step from "./Step";

const stepData : StepData[] = [
  {
    title: "Lorem Ipsum Dolor Sit Amet",
    desc: "Aliquam erat volutpat. Integer malesuada turpis id fringilla suscipit. Maecenas ultrices, orci vitae convallis mattis.",
  },
  {
    title: "Lorem Ipsum Dolor Sit Amet",
    desc: "Aliquam erat volutpat. Integer malesuada turpis id fringilla suscipit. Maecenas ultrices, orci vitae convallis mattis.",
  },
  {
    title: "Lorem Ipsum Dolor Sit Amet",
    desc: "Aliquam erat volutpat. Integer malesuada turpis id fringilla suscipit. Maecenas ultrices, orci vitae convallis mattis.",
  },
  {
    title: "Lorem Ipsum Dolor Sit Amet",
    desc: "Aliquam erat volutpat. Integer malesuada turpis id fringilla suscipit. Maecenas ultrices, orci vitae convallis mattis.",
  },
  {
    title: "Lorem Ipsum Dolor Sit Amet",
    desc: "Aliquam erat volutpat. Integer malesuada turpis id fringilla suscipit. Maecenas ultrices, orci vitae convallis mattis.",
  },
  {
    title: "Lorem Ipsum Dolor Sit Amet",
    desc: "Aliquam erat volutpat. Integer malesuada turpis id fringilla suscipit. Maecenas ultrices, orci vitae convallis mattis.",
  },

];



const IntroSteps = () => {
  return (
    <div className="flex flex-row justify-center flex-wrap gap-y-[50px] gap-[20px] w-full">
      {stepData.map((item, index) => {
        return (
          <Step
            key={index}
            index={index + 1}
            title={item.title}
            desc={item.desc}
            isFirst={index === 0}
          />
        );
      })}
    </div>
  );
};

export default IntroSteps;
