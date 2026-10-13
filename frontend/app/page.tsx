import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import {
  Features,
  FinalCta,
  Footer,
  HowItWorks,
} from "@/components/Sections";
import { TryItNow } from "@/components/TryItNow";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <HowItWorks />
        <Features />
        <TryItNow />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
