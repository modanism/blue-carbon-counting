// "use client";

import Image from "next/image";
import Logo from "../../assets/img/logo.png";
// import { usePathname } from "next/navigation";
// import { useEffect, useState } from "react";

const Footer = () => {
  // const pathname = usePathname();
  // const [showFooter, setShowFooter] = useState(false);

  // useEffect(() => {
  //   setShowFooter(pathname === "/calculator");
  // }, [pathname]);

  // if (!showFooter) return null;

  return (
    <footer className="bg-white flex flex-col justify-center items-center py-[25px] w-full">
      <Image alt="logo" src={Logo} className="mb-[10px]" />
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
