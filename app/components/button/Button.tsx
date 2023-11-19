'use client'

import { useRouter } from "next/navigation";

function Button(props: ButtonProps) {

    const router = useRouter();


  return (
      <button className="pt-[14px] pb-[17px] px-[22px] transition bg-neutral-10 rounded-[30px] hover:animate-bounce hover:shadow-xl" onClick={() => router.push('/calculator')} >
        <p className="text-[16px] text-[#FAFAFA]">{props.text}</p>
      </button>
  );
}

export default Button;
