import Image from "next/image";
import DiameterIcon from "../../assets/img/diameter.svg";
import TrunkIcon from "../../assets/img/trunk.svg";
import BiomassIcon from "../../assets/img/biomass.svg";

type TriangleStyle = React.CSSProperties & {
  content?: string;
};

type StepCardProps = {
  id: number;
  title: string;
  content: string;
};

const StepCard = (props: StepCardProps) => {
  const triangleStyle: TriangleStyle = {
    content: '""',
    width: "0",
    height: "0",
    borderStyle: "solid",
    borderWidth: "30px 0 30px 40px", // Adjust the size of the triangle here
    borderColor: `transparent transparent transparent #30514B`, // The last value is the color of the triangle
    zIndex: "10",
  };

  return (
    <>
      <div className="hover:animate-smallBounce relative bg-[#30514B] px-[10px] rounded-[25px] w-[320px] h-[159px] flex items-center">
        <p className="text-[20px] font-bold text-[#FAFAFA]">{props.id}</p>
        <div style={triangleStyle} />

        <div className="bg-[#EFF3FD] shadow-md pl-[40px] py-[12px] rounded-[25px] w-[320px] h-[159px] flex flex-col absolute bottom-[10px] left-[30px] gap-[5px] z-[5]">
          <h1 className="text-[14px] text-[#000000] font-semibold">
            {props.title}
          </h1>
          <span className="h-[1px] bg-[#383838] w-[75%] mb-[5px]" />
          <div className="w-full flex gap-[20px]">
            <p className="text-[#1A202C] text-[13px] w-[75%]">
              {props.content}
            </p>
            {props.id === 1 ? (
              <Image src={DiameterIcon} alt="Diameter" />
            ) : (
              <></>
            )}
            {props.id === 2 ? (
              <Image src={TrunkIcon} alt="Diameter" />
            ) : (
              <></>
            )}
            {props.id === 3 ? (
              <Image src={BiomassIcon} alt="Diameter" />
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default StepCard;
