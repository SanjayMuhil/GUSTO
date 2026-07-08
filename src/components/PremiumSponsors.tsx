"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import sponsorsData from "../content/sponsors.json";
import footerData from "../content/footer.json";

export interface SponsorGroup {
  title: string;
  logos: string[];
}

interface PremiumSponsorsProps {
  groups?: SponsorGroup[];
  year?: number;
  className?: string;
}

const defaultGroups: SponsorGroup[] = sponsorsData.groups;

const stampVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.85 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.75,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

const PremiumSponsors: React.FC<PremiumSponsorsProps> = ({
  groups = defaultGroups,
  year = new Date().getFullYear(),
  className = "",
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-120px" });
  const shouldReduceMotion = useReducedMotion();

  return (
    <footer
      ref={sectionRef}
      className={`relative w-full bg-gradient-to-b from-black via-zinc-950 to-black text-zinc-400 pt-24 sm:pt-32 pb-10 border-t border-zinc-900 overflow-hidden ${className}`}
    >
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-red-600/5 rounded-full blur-[160px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[140px]" />
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Main sponsors wrapper with stagger */}
        <div className="space-y-20 sm:space-y-28">
          {groups.map((group, gIdx) => (
            <motion.div
              key={group.title}
              custom={gIdx}
              variants={stampVariants}
              initial="hidden"
              animate={isInView ? "visible" : {}}
              className="space-y-6 sm:space-y-8"
            >
                {/* Category label */}
                <div className="flex items-center justify-center">
                  <span className="text-[10px] sm:text-xs tracking-[0.35em] text-zinc-600 font-black uppercase">
                    {group.title}
                  </span>
                </div>

                {/* Logo grid - responsive rows/columns */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 max-w-6xl mx-auto">
                  {group.logos.map((logo, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={shouldReduceMotion ? {} : { y: -6, scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="relative group/logo flex items-center justify-center"
                    >
                      {/* Thumbnail background glow */}
                      <div className="absolute -inset-2 bg-gradient-to-br from-white/5 to-transparent rounded-2xl opacity-0 group-hover/logo:opacity-100 transition duration-500 blur-md pointer-events-none" />

                      <div className="relative overflow-hidden rounded-2xl border border-zinc-900 bg-zinc-950/80 backdrop-blur-sm px-4 sm:px-6 py-4 sm:py-5 hover:border-zinc-700 transition-colors duration-500 w-full flex items-center justify-center">
                        <Image
                          src={logo}
                          alt={group.title}
                          width={140}
                          height={70}
                          className="w-auto h-8 sm:h-10 object-contain opacity-60 group-hover/logo:opacity-100 transition duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent opacity-0 group-hover/logo:opacity-100 transition duration-500 pointer-events-none" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

        {/* Divider line */}
        <motion.div
          initial={isInView ? {} : { scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="mt-20 sm:mt-28 mb-10 h-px w-full bg-gradient-to-r from-transparent via-zinc-800 to-transparent origin-center"
        />

        {/* Copyright */}
        <div className="text-center space-y-2">
          <p className="text-[11px] sm:text-xs text-zinc-700 font-medium tracking-wide">
            {footerData.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default PremiumSponsors;
