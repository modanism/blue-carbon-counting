'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";

type ButtonProps = {
  text: string;
};

function Button(props: ButtonProps) {

    const router = useRouter();


  return (
      <button className="pt-[14px] pb-[17px] px-[22px] transition bg-neutral-10 rounded-[30px] hover:animate-bounce hover:shadow-xl" onClick={() => router.push('/calculator')} >
        <p className="text-[16px]">{props.text}</p>
      </button>
  );
}

export default Button;
