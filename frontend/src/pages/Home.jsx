import React from "react";
import HeroSection from "../components/HeroSection";
import ServicesSection from "../components/ServicesSection";
import WhyUsSection from "../components/WhyUsSection";
import FeacturesSection from "../components/FeaturesSection";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <HeroSection />
      <main id="main">
        <ServicesSection />
        <WhyUsSection />
        <FeacturesSection />
      </main>
      <Footer />
    </>
  );
}

export default Home;