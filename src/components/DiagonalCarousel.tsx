"use client";

import * as React from "react";
import { motion, type Transition, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DiagonalCarouselItem {
  src?: string;
  image?: string;
  title: string;
  alt?: string;
  category?: string;
  date?: string;
  description?: string;
  button?: string;
  href?: string;
}

export interface DiagonalCarouselProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  items: DiagonalCarouselItem[];
  activeIndex?: number;
  defaultActiveIndex?: number;
  onActiveIndexChange?: (index: number) => void;
  loop?: boolean;
  slideSize?: number;
  rotationStep?: number;
  verticalStep?: number;
  inactiveScale?: number;
  transition?: Transition;
  showControls?: boolean;
  showDots?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  viewportClassName?: string;
  slideClassName?: string;
  imageClassName?: string;
  labelClassName?: string;
  controlsClassName?: string;
}

const DEFAULT_TRANSITION: Transition = {
  type: "spring",
  bounce: 0.16,
  duration: 0.85,
};

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export function DiagonalCarousel({
  items,
  activeIndex,
  defaultActiveIndex = 0,
  onActiveIndexChange,
  loop = true,
  slideSize = 340,
  rotationStep = 18,
  verticalStep = 60,
  inactiveScale = 0.75,
  transition = DEFAULT_TRANSITION,
  showControls = true,
  showDots = true,
  autoPlay = true,
  autoPlayInterval = 5000,
  viewportClassName,
  slideClassName,
  imageClassName,
  labelClassName,
  controlsClassName,
  className,
  onKeyDown,
  tabIndex,
  ...props
}: DiagonalCarouselProps) {
  const maxIndex = Math.max(0, items.length - 1);
  const [uncontrolledIndex, setUncontrolledIndex] = React.useState(() =>
    clamp(defaultActiveIndex, 0, maxIndex)
  );
  const currentIndex = clamp(activeIndex ?? uncontrolledIndex, 0, maxIndex);
  
  // Responsive slide size state
  const [effectiveSlideSize, setEffectiveSlideSize] = React.useState(slideSize);
  const [isMobile, setIsMobile] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);

  // Resize listener for mobile responsiveness
  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setIsMobile(true);
        setEffectiveSlideSize(Math.min(width - 48, 300));
      } else if (width < 1024) {
        setIsMobile(false);
        setEffectiveSlideSize(320);
      } else {
        setIsMobile(false);
        setEffectiveSlideSize(slideSize);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [slideSize]);

  const safeInactiveScale = clamp(inactiveScale, 0.4, 1);

  const selectSlide = React.useCallback(
    (nextIndex: number) => {
      if (!items.length) return;

      const resolvedIndex = loop
        ? (nextIndex + items.length) % items.length
        : clamp(nextIndex, 0, maxIndex);

      if (activeIndex === undefined) {
        setUncontrolledIndex(resolvedIndex);
      }

      onActiveIndexChange?.(resolvedIndex);
    },
    [activeIndex, items.length, loop, maxIndex, onActiveIndexChange]
  );

  // Autoplay functionality
  React.useEffect(() => {
    if (!autoPlay || isHovered || items.length <= 1) return;
    const timer = setInterval(() => {
      selectSlide(currentIndex + 1);
    }, autoPlayInterval);
    return () => clearInterval(timer);
  }, [autoPlay, autoPlayInterval, currentIndex, isHovered, items.length, selectSlide]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      selectSlide(currentIndex - 1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      selectSlide(currentIndex + 1);
    }
  };

  // Touch Swipe support
  const touchStartX = React.useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(deltaX) > 40) {
      if (deltaX < 0) {
        selectSlide(currentIndex + 1);
      } else {
        selectSlide(currentIndex - 1);
      }
    }
    touchStartX.current = null;
  };

  if (!items.length) return null;

  const isPreviousDisabled = !loop && currentIndex === 0;
  const isNextDisabled = !loop && currentIndex === maxIndex;

  const currentRotationStep = isMobile ? rotationStep * 0.5 : rotationStep;
  const currentVerticalStep = isMobile ? verticalStep * 0.4 : verticalStep;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Diagonal news carousel"
      tabIndex={tabIndex ?? 0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={cn("relative isolate h-[520px] sm:h-[580px] w-full overflow-hidden select-none", className)}
      {...props}
    >
      <div className={cn("absolute inset-0 overflow-hidden flex items-center justify-center", viewportClassName)}>
        <motion.div
          className="absolute left-1/2 top-[12%] sm:top-[15%] flex w-fit cursor-grab active:cursor-grabbing"
          animate={{ x: -(currentIndex * effectiveSlideSize + effectiveSlideSize / 2) }}
          transition={transition}
        >
          {items.map((item, index) => {
            const isActive = currentIndex === index;
            const distance = index - currentIndex;
            const imgSrc = item.image || item.src || "/images/news/save.jpg";

            return (
              <motion.div
                key={`${imgSrc}-${index}`}
                className={cn(
                  "flex shrink-0 flex-col items-center will-change-transform px-2 sm:px-3",
                  slideClassName
                )}
                style={{ width: effectiveSlideSize }}
                animate={{
                  rotate: distance * currentRotationStep,
                  scale: isActive ? 1 : safeInactiveScale,
                  y: distance * currentVerticalStep,
                  opacity: Math.abs(distance) > 2 ? 0.3 : isActive ? 1 : 0.75,
                }}
                transition={transition}
              >
                {/* News Card Container */}
                <div
                  onClick={() => selectSlide(index)}
                  className={cn(
                    "group relative w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-zinc-800/80 bg-zinc-950/90 backdrop-blur-xl shadow-2xl transition-all duration-500 cursor-pointer flex flex-col text-left",
                    isActive ? "border-red-500/60 shadow-red-950/30 shadow-2xl ring-1 ring-red-500/20" : "hover:border-zinc-700 opacity-90"
                  )}
                >
                  {/* Image Container with Dark Gradient Overlay */}
                  <div className="relative w-full aspect-[16/10] overflow-hidden bg-zinc-900">
                    <img
                      src={imgSrc}
                      alt={item.alt || item.title}
                      draggable={false}
                      className={cn(
                        "h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105",
                        imageClassName
                      )}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                    
                    {/* Category Badge & Date Header */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                      {item.category && (
                        <span className="px-2.5 py-1 text-[10px] sm:text-xs font-black uppercase tracking-widest text-white bg-red-600/90 backdrop-blur-md rounded-md shadow-md">
                          {item.category}
                        </span>
                      )}
                      {item.date && (
                        <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-zinc-300 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
                          {item.date}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 space-y-2 sm:space-y-3">
                    <div className="space-y-1.5 sm:space-y-2">
                      <h3 className="text-base sm:text-lg font-black text-white leading-tight uppercase tracking-tight group-hover:text-red-400 transition-colors line-clamp-2">
                        {item.title}
                      </h3>
                      {item.description && (
                        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed line-clamp-2">
                          {item.description}
                        </p>
                      )}
                    </div>

                    {/* Button / Action Footer */}
                    <div className="pt-2 flex items-center justify-between border-t border-zinc-900">
                      <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-red-500 group-hover:text-red-400 transition-colors">
                        {item.button || "Read More"}
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Control Navigation & Dots */}
      {showControls && (
        <div
          className={cn(
            "absolute inset-x-4 bottom-4 z-20 mx-auto flex w-fit items-center justify-center gap-3 rounded-full border border-zinc-800 bg-zinc-950/80 px-3 py-1.5 text-white shadow-2xl backdrop-blur-md",
            controlsClassName
          )}
        >
          <button
            type="button"
            aria-label="Show previous slide"
            disabled={isPreviousDisabled}
            className="inline-flex size-8 sm:size-9 items-center justify-center rounded-full transition-colors hover:bg-zinc-800 active:scale-95 disabled:cursor-not-allowed disabled:opacity-30"
            onClick={(e) => {
              e.stopPropagation();
              selectSlide(currentIndex - 1);
            }}
          >
            <ChevronLeft className="size-5 text-zinc-300" />
          </button>

          {showDots && (
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 px-1">
              {items.map((item, index) => (
                <button
                  key={`${item.title}-${index}`}
                  type="button"
                  aria-label={`Show slide ${index + 1}: ${item.title}`}
                  aria-current={currentIndex === index ? "true" : undefined}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300 cursor-pointer",
                    currentIndex === index ? "w-6 bg-red-600 shadow-md shadow-red-600/50" : "w-2 bg-zinc-700 hover:bg-zinc-500 opacity-60"
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    selectSlide(index);
                  }}
                />
              ))}
            </div>
          )}

          <button
            type="button"
            aria-label="Show next slide"
            disabled={isNextDisabled}
            className="inline-flex size-8 sm:size-9 items-center justify-center rounded-full transition-colors hover:bg-zinc-800 active:scale-95 disabled:cursor-not-allowed disabled:opacity-30"
            onClick={(e) => {
              e.stopPropagation();
              selectSlide(currentIndex + 1);
            }}
          >
            <ChevronRight className="size-5 text-zinc-300" />
          </button>
        </div>
      )}
    </div>
  );
}

export default DiagonalCarousel;
