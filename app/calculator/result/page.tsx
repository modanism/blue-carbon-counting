import TryForecastButton from "@/components/button/TryForecastButton";
import TableResult from "@/components/calculator/TableResult";
import Link from "next/link";

const Result = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-[112px] bg-[#FFFFFF] pt-[150px]">
      <TableResult />
      {/* <div className="w-full flex justify-center items-center">
        <Link
          target="_blank"
          href="https://docs.google.com/spreadsheets/d/1ekFVsk9lgbHkvzQ97lD4woA8K89EkGIzB9Jakber2-0/edit?usp=sharing"
          rel="noopener noreferrer"
          className="bg-[#30514B] text-[white] px-[20px] py-[12px] font-bold rounded-[25px] mb-[50px]"
        >
          Try Forecast
        </Link>
      </div> */}
      <TryForecastButton />
    </main>
  );
};

export default Result;
