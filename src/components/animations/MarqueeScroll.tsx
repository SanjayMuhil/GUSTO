"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

interface MarqueeScrollProps {
  images: string[];
  direction?: "left" | "right";
  speed?: number;
  className?: string;
}

export default function MarqueeScroll({
  images,
  direction = "left",
  speed = 0.3,
  className = "",
}: MarqueeScrollProps) {
  const [offset, setOffset] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      const scrollOffset =
        (window.scrollY - sectionTop + window.innerHeight) * speed;

      setOffset(scrollOffset);
    };

    handleScroll(); // Initial call
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  // Triple the images for seamless looping
  const tripledImages = [...images, ...images, ...images];

  const translateValue =
    direction === "left"
      ? `translateX(${offset - 200}px)`
      : `translateX(${-(offset - 200)}px)`;

  return (
    <div ref={sectionRef} className={`overflow-hidden ${className}`}>
      <div
        className="flex gap-3 sm:gap-4 md:gap-6"
        style={{
          transform: translateValue,
          willChange: "transform",
        }}
      >
        {tripledImages.map((image, i) => (
          <div
            key={i}
            className="relative flex-shrink-0 w-32 h-20 xs:w-40 xs:h-24 sm:w-48 sm:h-32 md:w-64 md:h-40 lg:w-80 lg:h-48 rounded-lg sm:rounded-xl overflow-hidden"
          >
            <Image
              src={image}
              alt={`Marquee item ${i}`}
              fill
              className="object-cover"
              sizes="(max-width: 375px) 128px, (max-width: 640px) 160px, (max-width: 768px) 192px, (max-width: 1024px) 256px, 320px"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
