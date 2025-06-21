import { HeroSection } from '@/components/home/hero-section';
import { AboutUsSection } from '@/components/home/about-us-section';
import { ServiceAreaMap } from '@/components/home/service-area-map';
import { ServicesSection } from '@/components/home/services-section';
import { Testimonials } from '@/components/home/testimonials';
import { VisualShowcase } from '@/components/home/visual-showcase';

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <AboutUsSection />
      <ServicesSection />
      <VisualShowcase />
      <Testimonials />
      <ServiceAreaMap />
    </div>
  );
}
