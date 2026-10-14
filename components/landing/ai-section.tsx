import { Backdrop } from "./background-beams";
import { AiShowcase } from "./ai-showcase";
import { SectionHeading } from "./section-heading";

export function AiSection() {
  return (
    <section id="ai" className="relative isolate overflow-hidden bg-navy py-24 text-white sm:py-32">
      <Backdrop theme="dark" beamsClassName="opacity-50" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          tone="dark"
          index="04"
          eyebrow="AI assistant"
          title={
            <>
              An assistant that <span className="text-gradient">knows your work.</span>
            </>
          }
          description="Nexus AI reads the projects, deals and conversations in your workspace, so its answers are grounded in your business."
        />
        <div data-reveal className="mt-16">
          <AiShowcase />
        </div>
      </div>
    </section>
  );
}
