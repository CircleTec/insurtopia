import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import Products from '../components/Products';
import TrustSection from '../components/TrustSection';
import AppTeaser from '../components/AppTeaser';
import Footer from '../components/Footer';

interface LandingPageProps {
  onLoginClick: () => void;
  onProductClick: () => void;
}

export default function LandingPage({ onLoginClick, onProductClick }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-white">
      <Navigation onLoginClick={onLoginClick} />
      <Hero />
      <Products onProductClick={onProductClick} />
      <TrustSection />
      <AppTeaser />
      <Footer />
    </div>
  );
}
