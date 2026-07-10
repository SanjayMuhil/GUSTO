"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type StickyStackingCardProps = {
  children: React.ReactNode;
  index: number;
  totalCards: number;
};

export function StickyStackingCard({
  children,
  index,
  totalCards,
}: StickyStackingCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const y = useTransform(
    scrollY,
    [0, 1],
    [index * 28, index * 28 - (totalCards - 1 - index) * 28]
  );

  return (
    <motion.div
      ref={ref}
      style={{
        position: "sticky",
        top: 96,
        scale: targetScale,
        y,
        zIndex: totalCards - index,
      }}
      className="rounded-2xl sm:rounded-3xl border border-zinc-800 bg-zinc-900/80 backdrop-blur-sm overflow-hidden"
    >
      {children}
    </motion.div>
  );
}
