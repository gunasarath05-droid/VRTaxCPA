import Hero from "@/sections/Home/Hero";
import Marquee from "@/sections/Home/Marquee";
import About from "@/sections/Home/about";
import Services from "@/sections/Home/services";
import WhyChooseUs from "@/sections/Home/WhyChooseUs";
import Testimonials from "@/sections/Home/Testimonials";
import CTABanner from "@/sections/Home/CTABanner";
import FAQHome from "@/sections/Home/FAQHome";
import Blog from "@/sections/Home/Blog";

export default function Home() {
  return (
    <main id="main-content" className="bg-white min-h-screen">
      <Hero />
      <Marquee />
      <About />
      <Services />
      <WhyChooseUs />
      <Testimonials />
      <CTABanner />
      <FAQHome />
      <Blog />
    </main>
  );
}
