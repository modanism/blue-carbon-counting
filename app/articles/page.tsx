import ArticleBig from "../components/article/ArticleBig";
import ArticleSmall from "../components/article/ArticleSmall";

const Articles = () => {
  return (
      <main className="flex min-h-screen flex-col items-center justify-between px-[112px] bg-[#EFF2F6] pt-[150px]">
        <h1 className="text-neutral-10 text-[60px] font-[700] text-center mb-[96px]">
          Lorem Ipsum is simply
        </h1>
        <section className="flex justify-center items-center gap-[64px] mb-[64px]">
          <ArticleBig />
          <ArticleBig />
        </section>
        <section className="flex justify-center items-center gap-[40px] flex-wrap mb-[64px]">
          <ArticleSmall />
          <ArticleSmall />
          <ArticleSmall />
          <ArticleSmall />
        </section>
      </main>
  );
};

export default Articles;
