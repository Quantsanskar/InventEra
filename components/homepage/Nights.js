import { CTASection } from "../ui/cta-with-rectangle";


export function Nights() {
  return (
    <CTASection
      badge={{
        text: "Get started",
      }}
      title="Start building with Launch UI"
      description="Get started with Launch UI and build your landing page in no time"
      action={{
        text: "Get Started",
        href: "/docs",
        variant: "default",
      }}
    />
  );
}
