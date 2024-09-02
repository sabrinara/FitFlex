import BenefitsSections from "@/components/HomePage/BenefitsSections";
import CategorySection from "@/components/HomePage/CategorySection";
// import EasyStep from "@/components/HomePage/EasyStep";
import FeaturedProduct from "@/components/HomePage/FeaturedProduct";
import { HeroSection } from "@/components/HomePage/HeroSection";
import MosaicImageGallery from "@/components/HomePage/MosaicImageGallery";

export default function Home() {
  return (
    <div className="mx-auto container">
      <HeroSection />
      <CategorySection />
      {/* <EasyStep /> */}
      <FeaturedProduct />
      <BenefitsSections />
      <MosaicImageGallery />

    </div>
  );
}
