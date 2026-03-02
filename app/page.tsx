import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import SocialProof from "@/components/SocialProof";
import ApplicationForm from "@/components/ApplicationForm";
import PromptPackSignup from "@/components/PromptPackSignup";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import FadeInOnScroll from "@/components/FadeInOnScroll";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <FadeInOnScroll>
        <ProblemSection />
      </FadeInOnScroll>
      <FadeInOnScroll>
        <SolutionSection />
      </FadeInOnScroll>
      <FadeInOnScroll>
        <SocialProof />
      </FadeInOnScroll>
      <FadeInOnScroll>
        <ApplicationForm />
      </FadeInOnScroll>
      <FadeInOnScroll>
        <PromptPackSignup />
      </FadeInOnScroll>
      <FadeInOnScroll>
        <AboutSection />
      </FadeInOnScroll>
      <Footer />
    </>
  );
}
