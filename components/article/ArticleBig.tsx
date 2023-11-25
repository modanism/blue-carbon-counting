"use client";

import Image from "next/image";
import PlaceholderImg from "../../assets/img/placeholder.png";
import { useRouter } from "next/navigation";

const ArticleBig = ({title, short_desc, image, idx}: {title: string, short_desc: string, image: string, idx:number}) => {
  const router = useRouter();

  return (
    <div
      className="flex flex-col bg-[#FAFAFA] p-4 rounded-[10px] shadow-lg cursor-pointer"
      onClick={() => router.push(`/articles/${idx}`)}
    >
      <h1 className="text-black text-[28px] font-[500] mb-[16px]">
        {title}
      </h1>
      <p className="text-neutral-7 text-[16px] mb-[24px] max-w-[575px]">
        {short_desc}
      </p>
      <div className="w-[575px] h-[335px] rounded-[10px] overflow-hidden relative">
        <Image src={image} alt="news image" layout="fill" />
      </div>
    </div>
  );
};

export default ArticleBig;
