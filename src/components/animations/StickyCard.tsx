"use client";

import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface StickyCardProps {
  children: ReactNode;
  index: number;
  totalCards: number;
  className?: string;
}

export default function StickyCard({
  children,
  index,
  totalCards,
  className = "",
}: StickyCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <motion.div
      ref={ref}
      style={{
        scale,
        top: `${index * 28}px`,
      }}
      className={`sticky ${className}`}
    >
      {children}
    </motion.div>
  );
}
