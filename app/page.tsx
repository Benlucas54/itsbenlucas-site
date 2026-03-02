import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import PromptTerminal from "@/components/PromptTerminal";
import SocialProof from "@/components/SocialProof";
import BookingEmbed from "@/components/BookingEmbed";
import PromptPackSignup from "@/components/PromptPackSignup";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import MotionSection from "@/components/motion/MotionSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <MotionSection>
        <ProblemSection />
      </MotionSection>
      <MotionSection>
        <SolutionSection />
      </MotionSection>
      <MotionSection>
        <PromptTerminal />
      </MotionSection>
      <MotionSection>
        <SocialProof />
      </MotionSection>
      <MotionSection>
        <BookingEmbed />
      </MotionSection>
      <MotionSection>
        <PromptPackSignup />
      </MotionSection>
      <MotionSection>
        <AboutSection />
      </MotionSection>
      <Footer />
    </>
  );
}
