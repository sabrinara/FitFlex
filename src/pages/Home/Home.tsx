import BenefitsSections from "@/components/HomePage/BenefitsSections";
import EasyStep from "@/components/HomePage/EasyStep";
import FeaturedProduct from "@/components/HomePage/FeaturedProduct";
import { HeroSection } from "@/components/HomePage/HeroSection";
import MosaicImageGallery from "@/components/HomePage/MosaicImageGallery";

export default function Home() {
  return (
    <div className="mx-auto container">
      <HeroSection />
      <EasyStep />
      <FeaturedProduct />
      <BenefitsSections />
      <MosaicImageGallery />

    </div>
  );
}
