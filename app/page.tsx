import Hero from "@/components/hero/Hero";
import InvitationSection from "@/components/invitation/InvitationSection";
import ScrollReveal from "@/components/shared/ScrollReveal";
import FamilySection from "@/sections/family/FamilySection";
import FestivalJourneySection from "@/components/festival/FestivalJourneySection";
import LocationSection from "@/components/location/LocationSection";
import BlessingsSection from "@/components/home/BlessingsSection";
import PhotoGallerySection from "@/sections/PhotoGallerySection";
import FooterSection from "@/sections/FooterSection";
import TempleDoor from "@/components/TempleDoor";
import OmSymbol from "@/components/symbols/OmSymbol";
import ElvatrixaAdSection from "@/sections/ElvatrixaAdSection";

export default function Home() {
  return (
    <>
    <TempleDoor/>
    
      <Hero />
    
      <ScrollReveal>
        <InvitationSection />
      </ScrollReveal>

      <ScrollReveal>
        <FamilySection />
      </ScrollReveal>

      <FestivalJourneySection />

<ScrollReveal>
  <LocationSection />
</ScrollReveal>


<ScrollReveal>
  <BlessingsSection />
</ScrollReveal>

<PhotoGallerySection />

<FooterSection/>

<ElvatrixaAdSection/>

    </>

  );
}