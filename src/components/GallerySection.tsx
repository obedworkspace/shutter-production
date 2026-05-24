import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "./ui/dialog";
import { Button } from "./ui/button";
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

    const visibleImages = galleryImages.slice(0, displayCount);
    const hasMore = displayCount < galleryImages.length;

    return (
        <div className={cn("py-20", !isFiltered && "border-t border-[#0C3249]/10")}>
            {!isFiltered && (
                <div className="text-center mb-16">
                    <h3 className="text-3xl md:text-5xl font-bold mb-4 text-[#0C3249] dark:text-foreground">
                        Photography Gallery
                    </h3>
                    <div className="w-20 h-1 bg-gold mx-auto rounded-full" />
                    <p className="mt-6 text-muted-foreground max-w-2xl mx-auto text-lg italic">
                        Explore our diverse photography collection across various events and projects.
                    </p>
                </div>
            )}

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <AnimatePresence>
                    {visibleImages.map((image) => {
                        const isLoaded = loadedImages[image.id];
                        return (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                key={image.id}
                                className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 bg-[#0C3249]/10"
                                onClick={() => setSelectedImage(image)}
                            >
                                {/* Pulse skeleton placeholder */}
                                {!isLoaded && (
                                    <div className="absolute inset-0 bg-[#0C3249]/10 dark:bg-zinc-800 animate-pulse z-0" />
                                )}

                                <img
                                    src={optimizeImage(image.url, { width: 500, quality: 70 })}
                                    alt={image.title}
                                    className={cn(
                                        "w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 z-10",
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
                <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 overflow-hidden bg-black/95 border-none animate-in fade-in zoom-in duration-300">
                    <DialogHeader className="sr-only">
                        <DialogTitle>{selectedImage?.title}</DialogTitle>
                        <DialogDescription>Full view of {selectedImage?.title}</DialogDescription>
                    </DialogHeader>
                    <div className="relative w-full h-full flex items-center justify-center p-4">
                        {selectedImage && (
                            <img
                                src={optimizeImage(selectedImage.url, { width: 1200, quality: 80 })}
                                alt={selectedImage.title}
                                className="max-w-full max-h-[85vh] object-contain shadow-2xl"
                            />
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
