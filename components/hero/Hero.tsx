import Button from "../button/Button";
import Image from "next/image";
import Background from "../../assets/img/background-hero.png";
import { usePathname } from "next/navigation";

const Hero = () => {
  return (
    <>
    <section 
      className="relative flex flex-col justify-center items-center min-h-screen w-full text-white px-4 bg-cover bg-center" 
      style={{ backgroundImage: `url(${Background.src})`, backgroundRepeat: 'no-repeat'}}
    >
        <h1 className="text-neutral-10 text-[48px] font-[600] text-center mb-[16px] text-white">
          Make Waves in The Fight Against Climate Change
        </h1>
        <p className="text-neutral-7 text-[20px] font-[400] text-center mb-[100px] text-white w-[1080px]">
        Be part of a transformative journey as we calculate carbon stocks in mangrove ecosystems and play a pivotal role in mitigating climate change.          {/* Mangroves can become sources of carbon emissions, posing a potential threat to our world. Join us in calculating mangroves hidden carbon emissions and mitigating their impact on our global climate.{" "} */}
        </p>
        <Button isThin={false} dest="/calculator" text="Explore" isAnimate={true} bgColor={"!bg-neutral-15"}/>
      </section>
    </>
  );
};

export default Hero;
