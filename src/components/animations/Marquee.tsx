"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type MarqueeProps = {
  images: string[];
  rowOffset?: number;
  direction?: "left" | "right";
  speed?: number;
};

export function Marquee({
  images,
  rowOffset = 0,
  direction = "left",
  speed = 0.3,
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sectionTop, setSectionTop] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      setSectionTop(containerRef.current.offsetTop);
    }
    const handleResize = () => {
      if (containerRef.current) {
        setSectionTop(containerRef.current.offsetTop);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { scrollY } = useScroll();
  const offset = useTransform(scrollY, (y) => {
    const windowHeight = typeof window !== "undefined" ? window.innerHeight : 0;
    return (y - sectionTop + windowHeight) * speed;
  });

  const x = useTransform(offset, (v) => {
    const base = v - 200;
    return direction === "left" ? -base : base;
  });

  const repeatedImages = [...images, ...images, ...images];

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden py-4 sm:py-6"
      style={{ willChange: "transform" }}
    >
      <motion.div
        className="flex gap-3 sm:gap-4"
        style={{ x }}
      >
        {repeatedImages.map((src, i) => (
          <div
            key={i}
            className="relative flex-shrink-0 w-[200px] sm:w-[280px] md:w-[320px] aspect-[16/9] rounded-xl sm:rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt=""
              className="w-full h-full object-cover opacity-80"
              loading="lazy"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
