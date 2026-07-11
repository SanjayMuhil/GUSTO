"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";

export interface SeasonImage {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

export interface SeasonCategory {
  id: string;
  label: string;
  images: SeasonImage[];
}

interface SeasonScheduleProps {
  categories: SeasonCategory[];
  title?: string;
  subtitle?: string;
  defaultCategory?: string;
  className?: string;
}

function useParallaxTilt(limit = 12) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("");
  const [glare, setGlare] = useState("");

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const px = x / rect.width - 0.5;
      const py = y / rect.height - 0.5;
      const rotateY = px * limit;
      const rotateX = -py * limit;

      setTransform(
        `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.04,1.04,1.04)`
      );
      const gx = (x / rect.width) * 100;
      const gy = (y / rect.height) * 100;
      setGlare(
        `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 75%)`
      );
    },
    [limit]
  );

  const reset = useCallback(() => {
    setTransform(
      "perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)"
    );
    setGlare("");
  }, []);

  return { ref, transform, glare, handlers: { onMouseMove: handleMouseMove, onMouseLeave: reset } };
}

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.08,
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
  exit: (i: number) => ({
    opacity: 0,
    y: -30,
    scale: 0.95,
    transition: {
      delay: i * 0.04,
      duration: 0.45,
      ease: [0.7, 0, 0.84, 0] as [number, number, number, number],
    },
  }),
};

function ScheduleImageCard({
  img,
  index,
}: {
  img: SeasonImage;
  index: number;
}) {
  const { ref, transform, glare, handlers } = useParallaxTilt(10);

  return (
    <motion.div
      custom={index}
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      ref={ref}
      {...handlers}
      className="group relative overflow-hidden rounded-3xl border border-zinc-900 bg-zinc-950 aspect-[4/3] cursor-pointer select-none"
      style={{ transform, transition: "transform 0.1s ease-out" }}
    >
      {/* Soft glow on hover */}
      <div className="absolute -inset-0.5 bg-gradient-to-br from-red-600/10 via-transparent to-orange-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-700 pointer-events-none blur-sm" />

      <Image
        src={img.src}
        alt={img.alt}
        fill
        priority={index < 3}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        loading={index < 3 ? "eager" : "lazy"}
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />

      {/* Glassmorphism caption */}
      {img.caption && (
        <div className="absolute bottom-5 left-5 right-5 z-10">
          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl px-4 py-3">
            <p className="text-white text-xs sm:text-sm font-extrabold tracking-wide uppercase">
              {img.caption}
            </p>
          </div>
        </div>
      )}

      {/* Glare */}
      <div
        className="absolute inset-0 pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition duration-300"
        style={{ background: glare }}
      />

      {/* Soft border shine */}
      <div className="absolute inset-0 rounded-3xl border border-white/5 pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition duration-500" />
    </motion.div>
  );
}

const SeasonSchedule: React.FC<SeasonScheduleProps> = ({
  categories,
  title = "2026 Calendar",
  subtitle = "SEASON SCHEDULE",
  defaultCategory,
  className = "",
}) => {
  const initial = defaultCategory ?? categories[0]?.id ?? "";
  const [active, setActive] = useState(initial);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-120px" });
  const cat = categories.find((c) => c.id === active) ?? categories[0];

  return (
    <section
      ref={sectionRef}
      className={`relative w-full py-20 sm:py-24 md:py-28 lg:py-36 bg-[#050505] border-t border-zinc-900 overflow-hidden ${className}`}
    >
      {/* Background ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.03)_0%,transparent_55%)]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14 md:mb-16 lg:mb-20 space-y-2 sm:space-y-3">
          <motion.p
            initial={isInView ? {} : { opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-red-500 text-[10px] sm:text-xs tracking-[0.35em] font-black uppercase"
          >
            {subtitle}
          </motion.p>
          <motion.h2
            initial={isInView ? {} : { opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white uppercase leading-none"
          >
            {title}
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.35, duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="w-16 sm:w-24 h-1 bg-gradient-to-r from-red-600 to-orange-500 rounded-full mx-auto origin-center"
          />
        </div>

        {/* Category Tabs */}
        <motion.div
          initial={isInView ? {} : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-12 sm:mb-16 md:mb-20 overflow-x-auto pb-2"
        >
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              className={`relative px-4 sm:px-6 py-2 sm:py-2.5 md:py-3 rounded-full text-xs sm:text-sm font-black tracking-widest uppercase transition-all duration-500 outline-none focus-visible:ring-2 focus-visible:ring-red-500/60 whitespace-nowrap min-h-[40px] sm:min-h-[44px] ${
                active === c.id
                  ? "text-white"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {active === c.id && (
                <motion.span
                  layoutId="active-pill"
                  className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 rounded-full shadow-[0_0_30px_rgba(220,38,38,0.35)]"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10">{c.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Animated Image Grid */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.55, ease: [0.7, 0, 0.84, 0] as [number, number, number, number] }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {cat?.images.map((img, i) => (
              <ScheduleImageCard
                key={`${active}-${i}`}
                img={img}
                index={i}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Parallax decorative line */}
        <motion.div
          initial={isInView ? {} : { opacity: 0, scaleY: 0 }}
          animate={isInView ? { opacity: 1, scaleY: 1 } : {}}
          transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="mt-20 sm:mt-28 h-px w-full bg-gradient-to-r from-transparent via-zinc-800 to-transparent origin-center"
        />
      </div>
    </section>
  );
};

export default SeasonSchedule;
export { useParallaxTilt };
