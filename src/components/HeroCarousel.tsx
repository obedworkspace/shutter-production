import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { optimizeImage } from "@/lib/image-optimizer";

const slides = [
    {
        id: 1,
        image: "https://i.ibb.co/5hPYTjvR/122-A9424-2.jpg",
        title: "Professional Production",
        description: "From concept to final cut, we deliver excellence.",
    },
    {
        id: 2,
        image: "https://i.ibb.co/JwQLjCXX/1O3A0067.jpg",
        title: "Cinematic Excellence",
        description: "Leading the industry with state-of-the-art equipment and a passion for storytelling.",
    },
    {
        id: 3,
        image: "https://i.ibb.co/spYdd1t4/UNDPXYouth-Konnect2024-214.jpg",
        title: "Professional Production",
        description: "From concept to final edit, we handle every aspect of your visual journey.",
    },
];

const HeroCarousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        // Defer preloading slide 2 and 3 so they do not compete with critical page load bandwidth
        const preloadTimeout = setTimeout(() => {
            slides.slice(1).forEach((slide) => {
                const img = new Image();
                img.src = optimizeImage(slide.image, { width: 1920, quality: 80 });
            });
        }, 3000); // 3 seconds delay after page mount

        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 6000);

        return () => {
            clearTimeout(preloadTimeout);
            clearInterval(timer);
        };
    }, []);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

    return (
        <section className="relative h-screen w-full overflow-hidden bg-black">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0"
                >
                    <div className="absolute inset-0">
                        {/* Premium dark shimmer placeholder backdrop */}
                        <div className="absolute inset-0 bg-[#0C3249]/20 animate-pulse" />
                        <img
                            src={optimizeImage(slides[currentSlide].image, { width: 1920, quality: 80 })}
                            alt={slides[currentSlide].title}
                            className="w-full h-full object-cover"
                            loading="eager"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/80" />
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Content Overlay */}
            <div className="relative h-full container mx-auto px-4 flex flex-col items-center justify-end pb-32 text-center text-white z-10">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0, scale: 0.95, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -30 }}
                        transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
                        className="max-w-4xl mx-auto"
                    >
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight leading-tight">
                            {slides[currentSlide].title}
                        </h1>
                        <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
                            {slides[currentSlide].description}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
                            <Button size="lg" className="bg-[#0C3249] text-white hover:bg-[#0C3249]/90 border-none text-base h-14 px-10 shadow-lg shadow-[#0C3249]/30 transition-all hover:-translate-y-1" onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}>
                                View Portfolio
                            </Button>
                            <Button size="lg" variant="outline" className="bg-transparent text-white border-white/50 hover:bg-white hover:text-[#0C3249] text-base h-14 px-10 backdrop-blur-sm transition-all hover:-translate-y-1" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                                Request a Quote
                            </Button>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={prevSlide}
                className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 p-3 rounded-full border border-white/20 text-white/70 hover:bg-white/10 hover:text-white transition-all z-20"
            >
                <ChevronLeft size={32} />
            </button>
            <button
                onClick={nextSlide}
                className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 p-3 rounded-full border border-white/20 text-white/70 hover:bg-white/10 hover:text-white transition-all z-20"
            >
                <ChevronRight size={32} />
            </button>

            {/* Dots */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={cn(
                            "w-2.5 h-2.5 rounded-full transition-all duration-300",
                            currentSlide === index ? "bg-white w-8" : "bg-white/40 hover:bg-white/60"
                        )}
                    />
                ))}
            </div>
        </section>
    );
};

export default HeroCarousel;
