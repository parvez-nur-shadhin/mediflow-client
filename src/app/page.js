import FeaturedCategories from "./Components/Homepage/FeaturedCategories";
import HeroSection from "./Components/Homepage/Hero";
import HowItWorks from "./Components/Homepage/HowItWorks";
import TrustStats from "./Components/Homepage/Stats";
import Testimonials from "./Components/Homepage/Testimonial";

export default function Home() {
  return (
    <div>
        <HeroSection />
        <FeaturedCategories />
        <HowItWorks />
        <TrustStats />
        <Testimonials />
    </div>
  );
}
