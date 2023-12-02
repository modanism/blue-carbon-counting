import TableForecast from "@/components/forecast/TableForecast";

const ForecastPage = () => {
  return (
    <main className="flex min-h-screen flex-col gap-[50px] items-center justify-between px-[112px] bg-[#FFFFFF] pt-[150px]">
      <TableForecast />
    </main>
  );
};

export default ForecastPage;
