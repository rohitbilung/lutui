import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  "/banners/banner-1.png",
  "/banners/banner-2.png",
  "/banners/banner-3.png",
  "/banners/banner-4.jpeg",
];

export default function HomeSlider() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="relative w-full h-64 md:h-[600px] overflow-hidden">
      <AnimatePresence>
        <motion.img
          key={slides[current]}
          src={slides[current]}
          onContextMenu={(e) => e.preventDefault()}
          draggable="false"
          onDragStart={(e) => e.preventDefault()}
          alt={`Slide ${current + 1}`}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
        />
      </AnimatePresence>

      {/* Navigation Buttons */}
      <Button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/75 p-2 text-black"
      >
        <ChevronLeft size={32} />
      </Button>
      <Button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/75 p-2 text-black"
      >
        <ChevronRight size={32} />
      </Button>
    </div>
  );
}
