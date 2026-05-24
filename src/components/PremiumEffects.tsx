import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export const PremiumEffects = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [isMobile, setIsMobile] = useState(true);

  // Mouse Coordinates for the Trailing Ring
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth Spring Physics for the Trailing Ring Cursor (lag effect)
  const springConfig = { damping: 30, stiffness: 250, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // Mouse Coordinates for the Background Spotlight (faster spring)
  const spotlightX = useSpring(mouseX, { damping: 45, stiffness: 180 });
  const spotlightY = useSpring(mouseY, { damping: 45, stiffness: 180 });

  useEffect(() => {
    // Detect Touchscreen/Mobile Devices - Disable Custom Cursor to avoid interference
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
      if (isHidden) setIsHidden(false);
    };

    const handleMouseLeave = () => {
      setIsHidden(true);
    };

    const handleMouseEnter = () => {
      setIsHidden(false);
    };

    // Global listener to check if mouse is hovering over interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Check if target or any parent is clickable/hoverable
      const isInteractive = 
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest(".cursor-pointer") ||
        target.classList.contains("cursor-pointer") ||
        target.closest("[role='button']");

      setIsHovered(!!isInteractive);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseover", handleMouseOver);

    // Inject styles to hide default cursor on desktop
    const style = document.createElement("style");
    style.id = "hide-default-cursor";
    style.innerHTML = `
      @media (min-width: 769px) {
        body, a, button, input, textarea, select, [role="button"], .cursor-pointer {
          cursor: none !important;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      window.removeEventListener("resize", checkDevice);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleMouseOver);
      
      const injectedStyle = document.getElementById("hide-default-cursor");
      if (injectedStyle) injectedStyle.remove();
    };
  }, [mouseX, mouseY, isHidden, isMobile]);

  if (isMobile) {
    return null; // Render absolutely nothing on mobile to conserve battery and CPU
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

      {/* 2. Custom Trailing Cursor Ring */}
      <motion.div
        className={cn(
          "pointer-events-none fixed left-0 top-0 rounded-full border border-gold/40 z-50 mix-blend-difference flex items-center justify-center transition-all duration-300",
          isHidden && "opacity-0 scale-50",
          isHovered 
            ? "w-14 h-14 bg-gold/10 border-gold/60 backdrop-blur-[2px] -ml-7 -mt-7 shadow-lg shadow-gold/20" 
            : "w-8 h-8 -ml-4 -mt-4"
        )}
        style={{
          x: cursorX,
          y: cursorY,
        }}
      >
        {/* Subtle inner focal lens ring when hovered */}
        {isHovered && (
          <motion.div 
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-10 h-10 rounded-full border border-gold/20 animate-ping absolute"
          />
        )}
      </motion.div>

      {/* 3. Custom Laser Center Dot */}
      <motion.div
        className={cn(
          "pointer-events-none fixed left-0 top-0 w-1.5 h-1.5 rounded-full bg-gold z-50 mix-blend-difference -ml-[3px] -mt-[3px] transition-all duration-300",
          isHidden && "opacity-0 scale-0",
          isHovered && "scale-[2] bg-white"
        )}
        style={{
          x: mouseX,
          y: mouseY,
        }}
      />
    </>
  );
};
