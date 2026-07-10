"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface AnimatedTextProps {
  text: string;
  className?: string;
}

export default function AnimatedText({ text, className = "" }: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"],
  });

  const chars = text.split("");

  return (
    <p ref={ref} className={className}>
      {chars.map((char, i) => {
        const start = i / chars.length;
        const end = start + 1 / chars.length;
        
        const opacity = useTransform(
          scrollYProgress,
          [start, end],
          [0.2, 1]
        );

        return (
          <motion.span
            key={i}
            style={{ opacity }}
            className="inline-block"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        );
      })}
    </p>
  );
}
