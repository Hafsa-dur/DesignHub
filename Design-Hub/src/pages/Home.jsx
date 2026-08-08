import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeaturesSection from "../components/FeaturesSection";
import StatsSection from "../components/StatsSection";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <FeaturesSection />
      <StatsSection />
      <Footer />
    </>
  );
}

export default Home;