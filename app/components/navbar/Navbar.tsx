'use client'

import Image from "next/image";
import Logo from "../../assets/img/logo.png";
import { usePathname } from "next/navigation";


const Navbar = () => {
    const pathname = usePathname()

  return (
    <nav className="bg-white flex flex-col gap-[20px] justify-center items-center py-[25px] shadow-lg fixed w-full">
      <Image alt="logo" src={Logo} />
      <div className="flex gap-[48px]">
        <a href="/" className={`text-neutral-10 text-[16px] cursor-pointer ${pathname == '/' ? "border-b-2 border-neutral-10" : ""}`}>Home</a>
        <a href="/calculator" className={`text-neutral-10 text-[16px] cursor-pointer ${pathname == '/calculator' ? "border-b-2 border-neutral-10" : ""}`}>Calculator</a>
        <a href="/articles" className={`text-neutral-10 text-[16px] cursor-pointer ${pathname == '/articles' ? "border-b-2 border-neutral-10" : ""}`}>Articles</a>
      </div>
    </nav>
  );
};

export default Navbar;
