"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Appear when user scrolls down more than 280px
      if (window.scrollY > 280) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          aria-label="Scroll back to top"
          initial={{ opacity: 0, scale: 0.7, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 20 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.1, y: -3 }}
          whileTap={{ scale: 0.92 }}
          className="group fixed bottom-6 left-6 z-[9990] w-12 h-12 sm:w-14 sm:h-14 rounded-2xl sm:rounded-3xl bg-gradient-to-tr from-[#F26522] via-[#EA580C] to-[#F97316] text-white flex items-center justify-center border border-white/35 shadow-[0_10px_30px_rgba(242,101,34,0.45)] hover:shadow-[0_15px_35px_rgba(242,101,34,0.65)] backdrop-blur-md cursor-pointer transition-shadow duration-300 select-none"
        >
          {/* Top specular shine */}
          <div className="absolute top-0 left-2 right-2 h-[1px] bg-white/60 rounded-full" />

          {/* Ambient ping pulse effect behind button */}
          <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-[#F26522] opacity-0 group-hover:opacity-40 animate-ping pointer-events-none transition-opacity duration-300" />

          {/* Upward Arrow Icon with hover elevation animation */}
          <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5] transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
