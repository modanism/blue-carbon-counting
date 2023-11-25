import Footer from "@/components/footer/Footer";
import ArticleBig from "../../components/article/ArticleBig";
import ArticleSmall from "../../components/article/ArticleSmall";
import article_data from './data_artikel.json'

const Articles = () => {
  const DATA = article_data

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between px-[112px] bg-[#FFFFFF] pt-[150px]">
        <h1 className="text-[#30514B] text-[60px] font-[700] text-center mb-[96px]">
          Articles
        </h1>
        <section className="flex justify-center items-center gap-[64px] mb-[64px]">
          <ArticleBig title = {DATA[0].title} short_desc = {DATA[0].short_desc} image = {DATA[0].img} idx = {DATA[0].idx}/>
          <ArticleBig title = {DATA[1].title} short_desc = {DATA[1].short_desc} image = {DATA[1].img} idx = {DATA[1].idx}/>
        </section>
        <section className="flex justify-center items-center gap-[40px] flex-wrap mb-[64px]">
          <ArticleSmall title = {DATA[2].title} short_desc = {DATA[2].short_desc} image = {DATA[2].img} idx = {DATA[2].idx}/>
          <ArticleSmall title = {DATA[3].title} short_desc = {DATA[3].short_desc} image = {DATA[3].img} idx = {DATA[3].idx}/>
          <ArticleSmall title = {DATA[4].title} short_desc = {DATA[4].short_desc} image = {DATA[4].img} idx = {DATA[4].idx}/>
          <ArticleSmall title = {DATA[5].title} short_desc = {DATA[5].short_desc} image = {DATA[5].img} idx = {DATA[5].idx}/>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Articles;
