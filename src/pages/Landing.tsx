import Navbar from "@/components/Navbar";
import HeroCarousel from "@/components/HeroCarousel";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import PortfolioSection from "@/components/PortfolioSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { PremiumEffects } from "@/components/PremiumEffects";
import { MessageCircle } from "lucide-react";

const Landing = () => {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-gold/30 overflow-hidden">
            <PremiumEffects />
            <Navbar />
            <main>
                <HeroCarousel />
                <AboutSection />
                <ServicesSection />
                <PortfolioSection />
                <ContactSection />
            </main>
            <Footer />

            {/* Floating WhatsApp Button */}
            <a
                href="https://wa.me/250789271885"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 flex items-center justify-center"
                aria-label="Chat on WhatsApp"
            >
                <MessageCircle size={32} fill="white" />
            </a>
        </div>
    );
};

export default Landing;
