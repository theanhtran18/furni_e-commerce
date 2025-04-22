import FiBrandsFacebook from "@/components/flations/fi-brands-facebook";
import Footer from "@/components/footer";
import ProductSection from "@/components/product-section";
import Feature from "@/components/ui/feature";
import HeroContainer from "@/components/ui/hero";
import WhyChooseSection from "@/components/why-choose-section";

export default function HomePage() {
  return (
    <>
      <HeroContainer />
      <ProductSection />

      <WhyChooseSection />

      <Footer />
    </>
  );
}
