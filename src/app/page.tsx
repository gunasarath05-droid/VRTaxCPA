import Hero from "@/sections/Home/Hero";
import Marquee from "@/sections/Home/Marquee";
import About from "@/sections/Home/about";
import Services from "@/sections/Home/services";
import WhyChooseUs from "@/sections/Home/WhyChooseUs";
import Testimonials from "@/sections/Home/Testimonials";
import FAQHome from "@/sections/Home/FAQHome";
import Blog from "@/sections/Home/Blog";
import GallerySection from "@/sections/Home/GallerySection";
import Partner from "@/sections/Home/Partner";

export default function Home() {
  return (
    <div className="bg-white min-h-screen">
      <Hero />
      <Marquee />
      <About />
      <Partner/>
      <Services />
      <WhyChooseUs />
      <Testimonials />
      <FAQHome />
      <Blog />
      <GallerySection />
    </div>
  );
}
