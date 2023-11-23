import Image from "next/image";
import Hero from "../components/hero/Hero";
import About from "../components/about/About";
import Intro from "../components/intro/Intro";
import Footer from "../components/footer/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-[#FAFAFA] pt-[80px]">
      <Hero />
      <About />
      <Intro />
      <Footer />
    </main>
  );
}
