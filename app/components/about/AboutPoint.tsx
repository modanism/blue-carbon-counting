import { IconName, library } from "@fortawesome/fontawesome-svg-core";
import { fas, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(fas);

type AboutPointProps = {
  title: string;
  desc: string;
  iconName: string;
};

function AboutPoint(props: AboutPointProps) {
  return (
    <>
      <div className="flex justify-between items-start gap-[25px]">
        <div className="bg-[#C4C4C4] rounded-[10px] py-[12px] px-[13px]">
          <FontAwesomeIcon icon={["fas", props.iconName as IconName]} size="lg" />
        </div>
        <div className="flex flex-col gap-[5px]">
          <h1 className="text-[#1A202C] text-[22px] font-semibold">
            {props.title}
          </h1>
          <p className="text-[#1A202C] text-[16px] font-[400] max-w-[430px]">
            {props.desc}
          </p>
        </div>
      </div>
    </>
  );
}

export default AboutPoint;
