import { AiSection } from "@/components/landing/ai-section";
import { Converge } from "@/components/landing/converge";
import { Features } from "@/components/landing/features";
import { FinalCta } from "@/components/landing/final-cta";
import { Footer } from "@/components/landing/footer";
import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { MotionRoot } from "@/components/landing/motion-root";
import { Navbar } from "@/components/landing/navbar";
import { PipelineStory } from "@/components/landing/pipeline-story";
import { Security } from "@/components/landing/security";

export default function Home() {
  return (
    <>
      {/* Fixed UI lives outside the smooth-scroll content. */}
      <div
        id="scroll-progress"
        className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left scale-x-0 bg-gradient-to-r from-cyan-400 via-indigo-500 to-violet-500"
        aria-hidden="true"
      />
      <Navbar />

      <MotionRoot>
        <main>
          <Hero />
          <Converge />
          <Features />
          <PipelineStory />
          <AiSection />
          <HowItWorks />
          <Security />
          <FinalCta />
        </main>
        <Footer />
      </MotionRoot>
    </>
  );
}
