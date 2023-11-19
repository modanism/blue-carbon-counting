import Image from "next/image";
import Logo from "../../assets/img/logo.png";

const Footer = () => {
  return (
    <footer className="bg-white flex flex-col justify-center items-center py-[25px] w-full">
      <Image alt="logo" src={Logo} className="mb-[10px]"/>
      <p className="text-[#7B95B7] text-[11px] font-[700] mb-[20px]">
        Copyright &#169; 2023 Blue Carbon
      </p>
      <div className="flex gap-[48px]">
        <a href="/" className={`text-neutral-10 text-[16px] cursor-pointer `}>
          Home
        </a>
        <a
          href="/calculator"
          className={`text-neutral-10 text-[16px] cursor-pointer `}
        >
          Calculator
        </a>
        <a
          href="/articles"
          className={`text-neutral-10 text-[16px] cursor-pointer`}
        >
          Articles
        </a>
      </div>
    </footer>
  );
};

export default Footer;
