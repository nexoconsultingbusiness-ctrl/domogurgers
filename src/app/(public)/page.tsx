import { Hero } from "@/features/brand/hero";
import { Experience } from "@/features/brand/experience";
import { Testimonials } from "@/features/brand/testimonials";
import { MenuSection } from "@/features/brand/menu-section";
import { Location } from "@/features/brand/location";
import { Feedback } from "@/features/brand/feedback";
import { LandingMotion } from "@/components/motion/landing-motion";

export default function HomePage() {
  return (
    <LandingMotion>
      <Hero />
      <MenuSection />
      <Experience />
      <Testimonials />
      <Location />
      <Feedback />
    </LandingMotion>
  );
}
