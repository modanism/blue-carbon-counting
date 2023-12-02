"use client";

import { useRouter } from "next/navigation";

type ForecastProps = {
  areaDensity: number;
  agc: number;
  bgc: number;
  soilc: number;
};

const TryForecastButton = () => {
  const router = useRouter();
  return (
    <div className="w-full flex justify-center items-center">
      <button
        onClick={() => {
          
            router.push("/calculator/forecast");

        }}
        className="bg-[#30514B] text-[white] px-[20px] py-[12px] font-bold rounded-[25px] mb-[50px]"
      >
        Try Forecast
      </button>
    </div>
  );
};

export default TryForecastButton;
