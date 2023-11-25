import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Step = (props: StepProps) => {
  return (
    <div className="flex hover:animate-smallBounce">
      {props.isFirst ? (
        <></>
      ) : (
        <div className="mt-[90px] mr-[20px]">
          <FontAwesomeIcon
            icon={["fas", "arrow-right"]}
            size="xl"
            color="black"
          />
        </div>
      )}
      <div className="flex flex-col ">
        <div className="flex flex-col justify-center items-start w-[220px] h-[196px] bg-[#DEE5ED] px-[25px] gap-[10px] rounded-[8px] relative mb-[18px]">
          <div className="rounded-full text-[#1A202C] font-semibold absolute top-[5px] right-[5px] bg-[#FAFAFA] w-[26px] h-[26px] flex justify-center items-center">
            {props.index}
          </div>
          <div className="bg-[black] rounded-[10px] p-[10px]">
            <FontAwesomeIcon icon={["fas", "pen"]} size="xl" />
          </div>
          <h1 className="text-[#1A202C] text-[16px]">{props.title}</h1>
        </div>
        <p className="text-[#1A202C] text-[14px] max-w-[220px] text-center">
          {props.desc}
        </p>
      </div>
    </div>
  );
};

export default Step;