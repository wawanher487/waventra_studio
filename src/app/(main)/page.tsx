import HeroSectioin from "@/components/sections/HeroSection";
import PackagesSection from "@/components/sections/PackagesSection";
import PortfolioSection from "@/components/sections/Portfolio/PortfolioSection";
import TeamSection from "@/components/sections/Team/TeamSection";

export default function Home() {
  return (
    <main>
      <HeroSectioin />
      <PortfolioSection />
      <PackagesSection />
      <TeamSection />
    </main>
  );
}
