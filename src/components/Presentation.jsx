import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction > 0 ? '-100%' : '100%',
    opacity: 0,
  }),
};

const slideTransition = {
  x: { type: 'tween', duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  opacity: { duration: 0.3 },
};

export default function Presentation({ slides, darkSlides = [] }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const totalSlides = slides.length;

  const goToSlide = useCallback((index) => {
    if (index < 0 || index >= totalSlides || index === currentSlide) return;
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  }, [currentSlide, totalSlides]);

  const goNext = useCallback(() => goToSlide(currentSlide + 1), [currentSlide, goToSlide]);
  const goPrev = useCallback(() => goToSlide(currentSlide - 1), [currentSlide, goToSlide]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        goNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        goPrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goNext, goPrev]);

  const isDark = darkSlides.includes(currentSlide);
  const SlideComponent = slides[currentSlide];

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={slideTransition}
          className="absolute inset-0"
        >
          <SlideComponent isActive={true} />
        </motion.div>
      </AnimatePresence>

      {/* Slide counter — bottom left */}
      <div className={`fixed bottom-6 left-6 text-sm font-body z-50 ${isDark ? 'text-white/40' : 'text-brand-black/40'}`}>
        {currentSlide + 1}/{totalSlides}
      </div>

      {/* Dot navigation — bottom center */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-50">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              i === currentSlide
                ? 'bg-brand-orange scale-125'
                : isDark
                  ? 'bg-white/30 hover:bg-white/50'
                  : 'bg-brand-black/20 hover:bg-brand-black/40'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Next button — bottom right */}
      {currentSlide < totalSlides - 1 && (
        <button
          onClick={goNext}
          className={`fixed bottom-5 right-6 flex items-center gap-1 text-sm font-body z-50 transition-colors ${
            isDark ? 'text-white/50 hover:text-white' : 'text-brand-black/40 hover:text-brand-black'
          }`}
        >
          Next <ChevronRight size={16} />
        </button>
      )}

      {/* Prev button */}
      {currentSlide > 0 && (
        <button
          onClick={goPrev}
          className={`fixed bottom-5 left-20 flex items-center gap-1 text-sm font-body z-50 transition-colors ${
            isDark ? 'text-white/50 hover:text-white' : 'text-brand-black/40 hover:text-brand-black'
          }`}
        >
          <ChevronLeft size={16} /> Prev
        </button>
      )}
    </div>
  );
}
