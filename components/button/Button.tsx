"use client";

import { useRouter } from "next/navigation";

function Button(props: ButtonProps) {
  const router = useRouter();
  return (
    <button
      className={`${props.bgColor} ${props.isThin ? "pb-[8px] pt-[5px] px-[22px]" : "pt-[14px] pb-[17px] px-[22px]"} min-w-[100px]  transition bg-neutral-10 rounded-[30px] ${
        props.isAnimate ? "hover:animate-bounce hover:shadow-xl" : ""
      } `}
      onClick={() => router.push(props.dest)}
    >
      <p className="text-[16px] text-[#FAFAFA]">{props.text}</p>
    </button>
  );
}

export default Button;
