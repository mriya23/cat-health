import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroSection from '../components/Landing/HeroSection';
import TrustSection from '../components/Landing/TrustSection';
import FeaturesSection from '../components/Landing/FeaturesSection';
import HowItWorksSection from '../components/Landing/HowItWorksSection';
import PricingSection from '../components/Landing/PricingSection';
import FAQSection from '../components/Landing/FAQSection';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Navbar />
      <main>
        <HeroSection />
        <TrustSection />
        <FeaturesSection />
        <HowItWorksSection />
        <PricingSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
