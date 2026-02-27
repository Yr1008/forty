import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import Metrics from "@/components/Metrics";
import Founders from "@/components/Founders";
import Services from "@/components/Services";
import CaseStudies from "@/components/CaseStudies";
import Testimonials from "@/components/Testimonials";
import Process from "@/components/Process";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import { ScrollProgress } from "@/components/motion";

export default function Home() {
  return (
    <div className="grain">
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <Metrics />
        <Founders />
        <Services />
        <CaseStudies />
        <Testimonials />
        <Process />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
