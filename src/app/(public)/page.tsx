import { Hero } from "@/features/brand/hero";
import { Experience } from "@/features/brand/experience";
import { MenuSection } from "@/features/brand/menu-section";
import { FlavorScene } from "@/features/brand/flavor-scene";
import { FinalInvitation } from "@/features/brand/final-invitation";
import { LandingMotion } from "@/components/motion/landing-motion";

export default function HomePage() {
  return (
    <LandingMotion>
      <Hero />
      <MenuSection />
      <Experience />
      <FlavorScene />
      <FinalInvitation />
    </LandingMotion>
  );
}
