import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { galleryImages, GalleryImage } from "@/data/galleryImages";
import { cn } from "@/lib/utils";
import { optimizeImage } from "@/lib/image-optimizer";

interface GallerySectionProps {
    isFiltered?: boolean;
}

const GallerySection = ({ isFiltered = false }: GallerySectionProps) => {
    const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
    const [displayCount, setDisplayCount] = useState(12);
    const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});

    const handleImageLoad = (id: number) => {
        setLoadedImages(prev => ({ ...prev, [id]: true }));
    };

    const handleLoadMore = () => {
        setDisplayCount((prev) => prev + 12);
    };

    const handleNext = () => {
        if (!selectedImage) return;
        const currentIndex = galleryImages.findIndex(img => img.id === selectedImage.id);
        if (currentIndex === -1) return;
        const nextIndex = (currentIndex + 1) % galleryImages.length;
        setSelectedImage(galleryImages[nextIndex]);
    };

    const handlePrev = () => {
        if (!selectedImage) return;
        const currentIndex = galleryImages.findIndex(img => img.id === selectedImage.id);
        if (currentIndex === -1) return;
        const prevIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
        setSelectedImage(galleryImages[prevIndex]);
    };

    useEffect(() => {
        if (!selectedImage) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") handleNext();
            if (e.key === "ArrowLeft") handlePrev();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [selectedImage]);

    const visibleImages = isFiltered
        ? galleryImages.slice(0, 6)
        : galleryImages.slice(0, displayCount);

    const hasMore = !isFiltered && displayCount < galleryImages.length;

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <AnimatePresence>
                    {visibleImages.map((image) => {
                        const isLoaded = loadedImages[image.id];
                        return (
                            <motion.div
                                key={image.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4 }}
                                className="relative aspect-square group overflow-hidden rounded-xl cursor-pointer bg-zinc-900"
                                onClick={() => setSelectedImage(image)}
                            >
                                {/* Shimmer Placeholder */}
                                {!isLoaded && (
                                    <div className="absolute inset-0 bg-[#0C3249]/10 animate-pulse" />
                                )}

                                <img
                                    src={optimizeImage(image.url, { width: 500, quality: 70 })}
                                    alt={image.title}
                                    className={cn(
                                        "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105",
                                        isLoaded ? "opacity-100 animate-in fade-in duration-500" : "opacity-0"
                                    )}
                                    onLoad={() => handleImageLoad(image.id)}
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors duration-300 flex items-center justify-center z-20">
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center p-4">
                                        <p className="font-bold text-lg tracking-wide">{image.title}</p>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>

            {/* Load More */}
            {hasMore && (
                <div className="mt-16 text-center">
                    <Button
                        onClick={handleLoadMore}
                        variant="outline"
                        size="lg"
                        className="rounded-full px-12 py-6 text-lg border-[#0C3249] text-[#0C3249] hover:bg-[#0C3249] hover:text-white transition-all duration-300"
                    >
                        Load More Images
                    </Button>
                </div>
            )}

            {/* Lightbox */}
            <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
                <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 overflow-hidden bg-black/95 border-none animate-in fade-in zoom-in duration-300 group/lightbox">
                    <DialogHeader className="sr-only">
                        <DialogTitle>{selectedImage?.title}</DialogTitle>
                        <DialogDescription>Full view of {selectedImage?.title}</DialogDescription>
                    </DialogHeader>
                    <div className="relative w-full h-[85vh] flex items-center justify-center p-4">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedImage?.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.25 }}
                                className="w-full h-full flex items-center justify-center"
                            >
                                {selectedImage && (
                                    <img
                                        src={optimizeImage(selectedImage.url, { width: 1200, quality: 80 })}
                                        alt={selectedImage.title}
                                        className="max-w-full max-h-[75vh] object-contain shadow-2xl"
                                    />
                                )}
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation Arrows */}
                        {galleryImages.length > 1 && (
                            <>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handlePrev();
                                    }}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 hover:bg-black/80 text-white/80 hover:text-white border border-white/10 transition-all opacity-0 group-hover/lightbox:opacity-100 cursor-pointer z-50 flex items-center justify-center shadow-lg"
                                    aria-label="Previous image"
                                >
                                    <ChevronLeft size={24} />
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleNext();
                                    }}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 hover:bg-black/80 text-white/80 hover:text-white border border-white/10 transition-all opacity-0 group-hover/lightbox:opacity-100 cursor-pointer z-50 flex items-center justify-center shadow-lg"
                                    aria-label="Next image"
                                >
                                    <ChevronRight size={24} />
                                </button>
                            </>
                        )}
                    </div>
                    {selectedImage && (
                        <div className="absolute bottom-6 left-0 right-0 text-center text-white/90 text-sm font-medium tracking-widest uppercase">
                            {selectedImage.title}
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default GallerySection;
