import { useState, useEffect, useCallback } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

export default function Presentation({ slides, darkSlides = [] }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displaySlide, setDisplaySlide] = useState(0);
  const totalSlides = slides.length;

  const goToSlide = useCallback((index) => {
    if (index < 0 || index >= totalSlides || index === currentSlide || isTransitioning) return;
    setIsTransitioning(true);
    // Start fade out
    setTimeout(() => {
      setDisplaySlide(index);
      setCurrentSlide(index);
      // Start fade in
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 300);
  }, [currentSlide, totalSlides, isTransitioning]);

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
  const SlideComponent = slides[displaySlide];

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Slide content */}
      <div
        className={`absolute inset-0 overflow-y-auto transition-opacity duration-300 ease-in-out ${
          isTransitioning ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <SlideComponent key={displaySlide} isActive={!isTransitioning} />
      </div>

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
