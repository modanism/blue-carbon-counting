import Image from "next/image";
import MangroveImg from "../../../assets/img/mangrove.png";
import Footer from "@/components/footer/Footer";
import article_data from './../data_artikel.json'

const DetailArticle = ({ params }: { params: { articleId: string } }) => {
  const DATA = article_data[parseInt(params.articleId)]

  return (
    <>
      <main className="flex min-h-screen flex-col items-start px-[112px] bg-[#FAFAFA] pt-[150px] gap-[21px]">
        <h1 className="text-neutral-10 text-[40px] font-[700] text-center">
          {DATA.title}
        </h1>
        <div className="w-full flex justify-center items-center">
          <div className="overflow-hidden rounded-[24px] relative">
            <Image src={DATA.img} alt="news image" width={400} height={200} />
          </div>
        </div>

        <h2 className="text-[16px] text-neutral-7">
          {DATA.author}
        </h2>
        <h2 className="text-[16px] text-neutral-7">
          {DATA.date}
        </h2>
        <div className="deskripsi-artikel" dangerouslySetInnerHTML={{__html:DATA.desc}}/>
        
      </main>
      <Footer />
    </>
  );
};

export default DetailArticle;
