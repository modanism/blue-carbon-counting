import Image from "next/image";
import AboutImg from "../../assets/img/about.png";
import AboutPoint from "./AboutPoint";

const aboutPoints = [
  {
    title: "Lorem ipsum",
    desc: "Aliquam erat volutpat. Integer malesuada turpis id fringilla suscipit. Maecenas ultrices.",
    icon: "phone",
  },
  {
    title: "Lorem ipsum",
    desc: "Aliquam erat volutpat. Integer malesuada turpis id fringilla suscipit. Maecenas ultrices.",
    icon: "rocket",
  },
  {
    title: "Lorem ipsum",
    desc: "Aliquam erat volutpat. Integer malesuada turpis id fringilla suscipit. Maecenas ultrices.",
    icon: "location-dot",
  },
];

const About = () => {
  return (
    <>
      <section className="flex justify-center items-start min-h-screen bg-[#FAFAFA] w-full gap-[93px] py-[130px]">
        <Image alt="About" src={AboutImg} />
        <div className="flex flex-col">
          <h1 className="text-[48px] font-[500] text-neutral-10 mb-[50px]">
            Lorem Ipsum passage
          </h1>
          <div className="flex flex-col gap-[40px]">
            {aboutPoints.map((item, index) => (
              <AboutPoint
                key={index}
                title={item.title}
                desc={item.desc}
                iconName={item.icon}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
