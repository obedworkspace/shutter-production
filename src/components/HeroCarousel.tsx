import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { optimizeImage } from "@/lib/image-optimizer";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "./ui/dialog";

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

const showreelVideos = [
    {
        id: 1,
        title: "Documentary Showreel I",
        url: "https://www.youtube.com/embed/OU8WlwmZt8Y",
    },
    {
        id: 2,
        title: "Documentary Showreel II",
        url: "https://www.youtube.com/embed/wQHgpZl3jPM",
    },
    {
        id: 3,
        title: "Documentary Showreel III",
        url: "https://www.youtube.com/embed/a9OXIPJvRVY",
    },
    {
        id: 4,
        title: "Documentary Showreel IV",
        url: "https://www.youtube.com/embed/ZiQGm-keQMk",
    },
    {
        id: 5,
        title: "Documentary Showreel V",
        url: "https://www.youtube.com/embed/ceFGBQ_Ae3Q",
    },
];

const HeroCarousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isReelOpen, setIsReelOpen] = useState(false);
    const [currentReelIndex, setCurrentReelIndex] = useState(0);

    const handleNextReel = () => {
        setCurrentReelIndex((prev) => (prev + 1) % showreelVideos.length);
    };

    const handlePrevReel = () => {
        setCurrentReelIndex((prev) => (prev - 1 + showreelVideos.length) % showreelVideos.length);
    };

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

    useEffect(() => {
        if (!isReelOpen) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") handleNextReel();
            if (e.key === "ArrowLeft") handlePrevReel();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isReelOpen]);

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
                    <div className="absolute inset-0 overflow-hidden">
                        {/* Premium dark shimmer placeholder backdrop */}
                        <div className="absolute inset-0 bg-[#0C3249]/20 animate-pulse" />
                        <motion.img
                            key={currentSlide}
                            initial={{ scale: 1 }}
                            animate={{ scale: 1.08 }}
                            transition={{ duration: 6, ease: "easeOut" }}
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
            <div className="relative h-full container mx-auto px-4 flex flex-col items-center justify-center text-center text-white z-10 pt-20">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0, scale: 0.95, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -30 }}
                        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                        className="max-w-4xl mx-auto flex flex-col items-center"
                    >
                        {/* Play Reel CTA Button */}
                        <motion.button
                            whileHover={{ scale: 1.05, borderColor: "rgba(197,168,128,0.8)" }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                                setCurrentReelIndex(0);
                                setIsReelOpen(true);
                            }}
                            className="group flex items-center gap-3 bg-black/40 backdrop-blur-md border border-white/20 hover:border-gold/50 px-6 py-3 rounded-full text-xs font-semibold tracking-widest uppercase transition-all duration-300 mb-8 cursor-pointer"
                        >
                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gold text-black group-hover:bg-[#0C3249] group-hover:text-white transition-colors duration-300">
                                <Play fill="currentColor" size={12} className="ml-0.5" />
                            </span>
                            Watch Showreel
                        </motion.button>

                        {/* Title Word-by-Word Reveal */}
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight leading-tight flex flex-wrap gap-x-4 gap-y-1 justify-center">
                            {slides[currentSlide].title.split(" ").map((word, i) => (
                                <span key={i} className="inline-block overflow-hidden py-1">
                                    <motion.span
                                        initial={{ y: "100%" }}
                                        animate={{ y: 0 }}
                                        transition={{ duration: 0.8, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                                        className="inline-block"
                                    >
                                        {word}
                                    </motion.span>
                                </span>
                            ))}
                        </h1>
                        <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
                            {slides[currentSlide].description}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
                            <Button size="lg" className="bg-[#0C3249] text-white hover:bg-[#0C3249]/90 border-none text-base h-14 px-10 shadow-lg shadow-[#0C3249]/30 transition-all hover:-translate-y-1 cursor-pointer" onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}>
                                View Portfolio
                            </Button>
                            <Button size="lg" variant="outline" className="bg-transparent text-white border-white/50 hover:bg-white hover:text-[#0C3249] text-base h-14 px-10 backdrop-blur-sm transition-all hover:-translate-y-1 cursor-pointer" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                                Request a Quote
                            </Button>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={prevSlide}
                className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 p-3 rounded-full border border-white/20 text-white/70 hover:bg-white/10 hover:text-white transition-all z-20 cursor-pointer"
            >
                <ChevronLeft size={32} />
            </button>
            <button
                onClick={nextSlide}
                className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 p-3 rounded-full border border-white/20 text-white/70 hover:bg-white/10 hover:text-white transition-all z-20 cursor-pointer"
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
                            "w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer",
                            currentSlide === index ? "bg-white w-8" : "bg-white/40 hover:bg-white/60"
                        )}
                    />
                ))}
            </div>

            {/* Showreel Modal */}
            <Dialog open={isReelOpen} onOpenChange={setIsReelOpen}>
                <DialogContent className="max-w-5xl p-0 overflow-hidden bg-black border-none animate-in fade-in zoom-in duration-300 group/reel">
                    <DialogHeader className="sr-only">
                        <DialogTitle>Shutter Production Showreels</DialogTitle>
                        <DialogDescription>Cinematic showreel videos.</DialogDescription>
                    </DialogHeader>
                    <div className="relative pt-[56.25%] bg-black overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentReelIndex}
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -30 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                                className="absolute inset-0 w-full h-full"
                            >
                                {isReelOpen && (
                                    <iframe
                                        src={`${showreelVideos[currentReelIndex].url}?autoplay=1`}
                                        title={showreelVideos[currentReelIndex].title}
                                        className="w-full h-full border-none"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen
                                    />
                                )}
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation Arrows for Showreel Carousel */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handlePrevReel();
                            }}
                            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 hover:bg-black/80 text-white/80 hover:text-white border border-white/20 transition-all opacity-0 group-hover/reel:opacity-100 cursor-pointer z-50 flex items-center justify-center shadow-lg"
                            aria-label="Previous showreel"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleNextReel();
                            }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 hover:bg-black/80 text-white/80 hover:text-white border border-white/20 transition-all opacity-0 group-hover/reel:opacity-100 cursor-pointer z-50 flex items-center justify-center shadow-lg"
                            aria-label="Next showreel"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>
                    {/* Active Reel Title Overlay */}
                    <div className="absolute bottom-4 left-6 text-white/90 text-sm font-semibold uppercase tracking-widest bg-black/60 px-4 py-1.5 rounded-full border border-white/10 z-50">
                        {showreelVideos[currentReelIndex].title} ({currentReelIndex + 1}/{showreelVideos.length})
                    </div>
                </DialogContent>
            </Dialog>
        </section>
    );
};

export default HeroCarousel;
