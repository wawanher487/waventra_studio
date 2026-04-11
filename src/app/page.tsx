import HeroSectioin from "@/components/sections/HeroSection";
import PackagesSection from "@/components/sections/PackagesSection";
import PortfolioSection from "@/components/sections/Portfolio/PortfolioSection";

export default function Home() {
  return (
    <main>
      <HeroSectioin />
      <PortfolioSection />
      <PackagesSection />
    </main>
  );
}
