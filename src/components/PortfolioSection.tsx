import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import { optimizeImage } from "@/lib/image-optimizer";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
const categories = ["Documentary", "Corporate", "Commercial"];

import { portfolioItems, PortfolioItem } from "../data/portfolioVideos";

const PortfolioSection = () => {
    const [activeCategory, setActiveCategory] = useState("Documentary");
    const [activeMediaType, setActiveMediaType] = useState("Videos");
    const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
    const [visibleCount, setVisibleCount] = useState(6);
    const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});

    const handleImageLoad = (id: number) => {
        setLoadedImages(prev => ({ ...prev, [id]: true }));
    };

    const filteredItems = portfolioItems.filter(item => {
        if (activeMediaType === "Motion Graphics") {
            return item.category === "Motion Graphics";
        }
        const matchesCategory = item.category === activeCategory;
        const matchesMediaType = activeMediaType === "Videos" 
            ? (!item.isImage && item.category !== "Motion Graphics") 
            : item.isImage;
        return matchesCategory && matchesMediaType;
    });
    const visibleItems = filteredItems.slice(0, visibleCount);

    const handleNext = () => {
        if (!selectedItem) return;
        const currentIndex = filteredItems.findIndex(item => item.id === selectedItem.id);
        if (currentIndex === -1) return;
        const nextIndex = (currentIndex + 1) % filteredItems.length;
        setSelectedItem(filteredItems[nextIndex]);
    };

    const handlePrev = () => {
        if (!selectedItem) return;
        const currentIndex = filteredItems.findIndex(item => item.id === selectedItem.id);
        if (currentIndex === -1) return;
        const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
        setSelectedItem(filteredItems[prevIndex]);
    };

    useEffect(() => {
        if (!selectedItem) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") handleNext();
            if (e.key === "ArrowLeft") handlePrev();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [selectedItem, filteredItems]);

    return (
        <section id="portfolio" className="py-24 bg-background">
            <div className="container mx-auto px-4">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-6xl font-bold mb-4 text-[#0C3249] dark:text-foreground tracking-tight">
                        Our Work
                    </h2>
                    <div className="w-24 h-1.5 bg-gold mx-auto rounded-full mb-12" />

                    {/* Media Type Selector (Videos / Pictures / Motion Graphics) */}
                    <div className="flex flex-wrap justify-center gap-4 mb-8">
                        {["Videos", "Pictures", "Motion Graphics"].map((type) => (
                            <button
                                key={type}
                                onClick={() => {
                                    setActiveMediaType(type);
                                    setVisibleCount(6);
                                }}
                                className={cn(
                                    "px-6 py-2 rounded-full text-sm font-semibold tracking-wider transition-all duration-300 border cursor-pointer",
                                    activeMediaType === type
                                        ? "bg-gold text-black border-gold shadow-md"
                                        : "bg-transparent text-muted-foreground border-border hover:text-foreground"
                                )}
                            >
                                {type}
                            </button>
                        ))}
                    </div>

                    {/* Category Selector (Videos & Pictures) */}
                    {activeMediaType !== "Motion Graphics" && (
                        <div className="flex flex-wrap justify-center gap-4">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => {
                                        setActiveCategory(category);
                                        setVisibleCount(6);
                                    }}
                                    className={cn(
                                        "px-8 py-3 rounded-full text-sm font-bold tracking-wider transition-all duration-300 border cursor-pointer",
                                        activeCategory === category
                                            ? "bg-[#0C3249] text-white border-[#0C3249] shadow-lg shadow-[#0C3249]/20"
                                            : "bg-transparent text-muted-foreground border-border hover:border-foreground/30 hover:text-foreground"
                                    )}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Grid */}
                <motion.div
                    layout
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence mode="popLayout">
                        {visibleItems.map((item) => {
                            const isLoaded = loadedImages[item.id];
                            return (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                    key={item.id}
                                    className="group relative aspect-video rounded-2xl overflow-hidden cursor-pointer shadow-xl bg-[#0C3249]/10"
                                    onClick={() => setSelectedItem(item)}
                                >
                                    {/* Shimmer Placeholder */}
                                    {!isLoaded && (
                                        <div className="absolute inset-0 bg-[#0C3249]/10 dark:bg-zinc-800 animate-pulse z-0" />
                                    )}

                                    <img
                                        src={optimizeImage(item.thumbnail, { width: 600, quality: 75 })}
                                        alt={item.title}
                                        className={cn(
                                            "w-full h-full object-cover transition-all duration-1000 group-hover:scale-[1.03] z-10",
                                            isLoaded ? "opacity-100 animate-in fade-in duration-500" : "opacity-0"
                                        )}
                                        onLoad={() => handleImageLoad(item.id)}
                                        loading="lazy"
                                    />

                                    {/* Cinematic Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500 z-20" />

                                    {/* Center Play Icon */}
                                    {!item.isImage && (
                                        <div className="absolute inset-0 flex items-center justify-center z-30">
                                            <div className="w-16 h-16 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 shadow-2xl">
                                                <Play fill="white" size={32} className="ml-1" />
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </motion.div>

                {/* See More Button */}
                {visibleCount < filteredItems.length && (
                    <div className="mt-12 text-center">
                        <Button
                            variant="outline"
                            onClick={() => setVisibleCount(prev => prev + 6)}
                            className="rounded-full px-8 py-6 text-base font-semibold border-[#0C3249] text-[#0C3249] hover:bg-[#0C3249] hover:text-white transition-all duration-300"
                        >
                            See More
                        </Button>
                    </div>
                )}

                {/* Media Modal */}
                <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
                    <DialogContent className="max-w-5xl p-0 overflow-hidden bg-black border-none animate-in fade-in zoom-in duration-300">
                        <DialogHeader className="sr-only">
                            <DialogTitle>{selectedItem?.title}</DialogTitle>
                            <DialogDescription>{selectedItem?.description}</DialogDescription>
                        </DialogHeader>
                        <div className="flex flex-col">
                            {/* Video/Image Container */}
                            <div className="relative pt-[56.25%] bg-black group/modal overflow-hidden">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={selectedItem?.id}
                                        initial={{ opacity: 0, x: 30 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -30 }}
                                        transition={{ duration: 0.3, ease: "easeOut" }}
                                        className="absolute inset-0 w-full h-full"
                                    >
                                        {selectedItem && (
                                            selectedItem.isImage ? (
                                                <img
                                                    src={optimizeImage(selectedItem.thumbnail, { width: 1200, quality: 80 })}
                                                    alt={selectedItem.title}
                                                    className="w-full h-full object-contain"
                                                />
                                            ) : (
                                                <iframe
                                                    src={selectedItem.videoUrl}
                                                    title={selectedItem.title}
                                                    className="w-full h-full"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                    allowFullScreen
                                                />
                                            )
                                        )}
                                    </motion.div>
                                </AnimatePresence>

                                {/* Navigation Arrows */}
                                {filteredItems.length > 1 && (
                                    <>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handlePrev();
                                            }}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 hover:bg-black/80 text-white/80 hover:text-white border border-white/20 transition-all opacity-0 group-hover/modal:opacity-100 cursor-pointer z-50 flex items-center justify-center shadow-lg"
                                            aria-label="Previous item"
                                        >
                                            <ChevronLeft size={24} />
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleNext();
                                            }}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 hover:bg-black/80 text-white/80 hover:text-white border border-white/20 transition-all opacity-0 group-hover/modal:opacity-100 cursor-pointer z-50 flex items-center justify-center shadow-lg"
                                            aria-label="Next item"
                                        >
                                            <ChevronRight size={24} />
                                        </button>
                                    </>
                                )}
                            </div>

                            {/* Project Info Bar */}
                            {selectedItem && (selectedItem.title || selectedItem.description) && (
                                <div className="p-8 bg-zinc-950 text-white">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                        <div>
                                            <span className="inline-block bg-[#0C3249] text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-sm mb-2">
                                                {selectedItem.category}
                                            </span>
                                            {selectedItem.title && <h2 className="text-3xl font-bold">{selectedItem.title}</h2>}
                                        </div>
                                        {selectedItem.duration && (
                                            <div className="text-zinc-400 font-mono text-lg">
                                                Duration: {selectedItem.duration}
                                            </div>
                                        )}
                                    </div>
                                    {selectedItem.description && (
                                        <p className="text-zinc-300 text-lg leading-relaxed max-w-3xl border-l-2 border-[#0C3249] pl-6 italic">
                                            {selectedItem.description}
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Bottom CTA */}
            <div className="mt-24 py-20 bg-[#0C3249]">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">
                        Ready to Create Something Powerful?
                    </h2>
                    <Button
                        size="lg"
                        className="bg-white text-[#0C3249] hover:bg-zinc-100 rounded-full px-12 py-7 text-xl font-bold shadow-2xl transition-all hover:scale-105 active:scale-95"
                        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                        Request a Quote
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default PortfolioSection;
