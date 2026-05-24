import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const PremiumEffects = () => {
  const [isMobile, setIsMobile] = useState(true);

  // Mouse Coordinates for the Background Spotlight
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Mouse Coordinates for the Background Spotlight (faster spring)
  const spotlightX = useSpring(mouseX, { damping: 45, stiffness: 180 });
  const spotlightY = useSpring(mouseY, { damping: 45, stiffness: 180 });

  useEffect(() => {
    // Detect Touchscreen/Mobile Devices - Disable Spotlight Glow on mobile to conserve battery and CPU
    const checkDevice = () => {
      const mobile = 
        window.matchMedia("(max-width: 768px)").matches || 
        ('ontouchstart' in window) || 
        (navigator.maxTouchPoints > 0);
      setIsMobile(mobile);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", checkDevice);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY, isMobile]);

  if (isMobile) {
    return null; // Render absolutely nothing on mobile
  }

  return (
    <>
      {/* 1. Global Background Dynamic Spotlight Glow */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-30"
        style={{
          background: `radial-gradient(circle 450px at ${spotlightX}px ${spotlightY}px, rgba(197, 168, 128, 0.04), transparent 80%)`,
        }}
      />
      
      {/* Dynamic secondary dark blue spotlight behind panels */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: `radial-gradient(circle 800px at ${spotlightX}px ${spotlightY}px, rgba(12, 50, 73, 0.08), transparent 70%)`,
        }}
      />
    </>
  );
};
