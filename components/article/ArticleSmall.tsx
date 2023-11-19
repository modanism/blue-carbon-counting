"use client";

import Image from "next/image";
import PlaceholderImg from "../../assets/img/placeholder.png";
import { useRouter } from "next/navigation";

const ArticleSmall = () => {
  const router = useRouter();

  return (
    <div
      className="flex flex-col bg-[#FAFAFA] p-4 rounded-[10px] shadow-lg cursor-pointer"
      onClick={() => router.push("/articles/detail")}
    >
      <h1 className="text-neutral-10 text-[21px] font-[500] mb-[16px] max-w-[256px]">
        Lorem Ipsum is simply dummy
      </h1>
      <p className="text-neutral-7 text-[16px] mb-[24px] max-w-[256px]">
        Welcome to Burger Bliss, where we take your cravings to a whole new
        level! Our mouthwatering burgers are made from 100% beef and are served
        on freshly baked buns.
      </p>
      <div className="w-[256px] rounded-[10px] overflow-hidden">
        <Image alt="news image" src={PlaceholderImg} />
      </div>
    </div>
  );
};

export default ArticleSmall;
