"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import DecayCard from "./DecayCard";

export interface SponsorGroup {
  title: string;
  logos: string[];
}

interface SponsorsSectionProps {
  groups?: SponsorGroup[];
  year?: number;
  className?: string;
}

const defaultGroups: SponsorGroup[] = [
  {
    title: "Series Sponsor",
    logos: ["/sponsor-series.png"],
  },
  {
    title: "Official Tyre Partner",
    logos: ["/sponsor-tyre.png"],
  },
  {
    title: "Official Fuel Partner",
    logos: ["/sponsor-fuel.png"],
  },
  {
    title: "Technology Partner",
    logos: ["/sponsor-tech.png"],
  },
  {
    title: "Official Entertainment Partner",
    logos: ["/sponsor-ent.png"],
  },
  {
    title: "Event Partners",
    logos: ["/sponsor-event-1.png", "/sponsor-event-2.png", "/sponsor-event-3.png", "/sponsor-event-4.png"],
  },
  {
    title: "Paddock Service Partners",
    logos: ["/sponsor-paddock-1.png", "/sponsor-paddock-2.png", "/sponsor-paddock-3.png"],
  },
];

function SafeSponsorImage({ src, alt, fallbackText }: { src: string; alt: string; fallbackText: string }) {
  const [isError, setIsError] = useState(false);

  if (isError) {
    return (
      <div className="flex items-center justify-center w-full h-full text-center px-4 select-none">
        <span className="text-[10px] sm:text-xs font-black tracking-wider text-zinc-500 uppercase group-hover:text-red-500 transition-colors duration-500">
          {fallbackText}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={140}
      height={50}
      className="w-auto h-8 sm:h-10 object-contain opacity-60 group-hover:opacity-100 transition duration-500"
      onError={() => setIsError(true)}
    />
  );
}

function SafeSponsorSingleImage({ src, alt, fallbackText }: { src: string; alt: string; fallbackText: string }) {
  const [isError, setIsError] = useState(false);

  if (isError) {
    return (
      <div className="flex items-center justify-center w-full h-full text-center px-6 py-4 select-none">
        <span className="text-sm sm:text-lg font-black tracking-widest text-red-600 uppercase">
          {fallbackText}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={200}
      height={80}
      className="w-auto h-10 sm:h-12 object-contain"
      onError={() => setIsError(true)}
    />
  );
}

export default function SponsorsSection({
  groups = defaultGroups,
  year = new Date().getFullYear(),
  className = "",
}: SponsorsSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-80px" });

  return (
    <section ref={sectionRef} className={`relative w-full bg-black border-t border-zinc-900 overflow-hidden ${className}`}>
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-red-600/5 rounded-full blur-[160px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="py-16 sm:py-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="text-red-500 text-[10px] sm:text-xs tracking-[0.35em] font-black uppercase block mb-3">
                Trusted Partners
              </span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white uppercase">
                Sponsors & Partners
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-orange-500 rounded-full mx-auto mt-4" />
            </motion.div>

            <div className="space-y-12 sm:space-y-16">
              {groups.map((group, gIdx) => {
                const logos = group?.logos || [];
                const isMulti = logos.length > 1;

                return (
                  <motion.div
                    key={group.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                      delay: gIdx * 0.12,
                      duration: 0.7,
                      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                    }}
                    className="space-y-6"
                  >
                    {/* Category label */}
                    <div className="text-center">
                      <span className="text-[10px] sm:text-xs tracking-[0.35em] text-zinc-500 font-black uppercase">
                        {group.title}
                      </span>
                    </div>

                    {/* Single logo - always visible on mobile, hover reveal on desktop */}
                    {!isMulti && logos.length > 0 && (
                      <div className="relative group overflow-hidden rounded-2xl border border-zinc-900 bg-zinc-950/80 backdrop-blur-sm h-24 sm:h-32 max-w-xl mx-auto">
                        {/* Default state: category name - visible on desktop, hidden on mobile */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-500 sm:opacity-100 opacity-0 group-hover:opacity-0">
                          <span className="text-sm sm:text-lg font-black tracking-widest text-zinc-600 uppercase transition-colors duration-500">
                            {group.title}
                          </span>
                        </div>

                        {/* Sponsor logo - always visible on mobile, revealed on hover on desktop */}
                        <div className="absolute inset-0 flex items-center justify-center transition duration-500 sm:opacity-0 opacity-100 group-hover:opacity-100 bg-zinc-900/10">
                          <div className="px-8 sm:px-12 py-4 flex items-center justify-center">
                            <SafeSponsorSingleImage
                              src={logos[0]}
                              alt={group.title}
                              fallbackText={group.title}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Multiple logos - responsive grid */}
                    {isMulti && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
                        {logos.map((logo, idx) => {
                          const isDecayGroup =
                            group.title === "Event Partners" ||
                            group.title === "Paddock Service Partners";

                          if (isDecayGroup) {
                            return (
                              <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{
                                  delay: gIdx * 0.12 + idx * 0.1,
                                  duration: 0.6,
                                }}
                                className="relative rounded-2xl border border-zinc-900 bg-zinc-950/80 backdrop-blur-sm aspect-[3/1] flex items-center justify-center hover:border-zinc-700 transition-colors duration-500 overflow-hidden"
                              >
                                <DecayCard image={logo} className="absolute inset-0">
                                  <SafeSponsorImage
                                    src={logo}
                                    alt={`${group.title} ${idx + 1}`}
                                    fallbackText={`${group.title.replace(" Partners", "").replace(" Service", "")} ${idx + 1}`}
                                  />
                                </DecayCard>
                              </motion.div>
                            );
                          }

                          return (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, y: 20 }}
                              animate={isInView ? { opacity: 1, y: 0 } : {}}
                              transition={{
                                delay: gIdx * 0.12 + idx * 0.1,
                                duration: 0.6,
                              }}
                              className="group relative overflow-hidden rounded-2xl border border-zinc-900 bg-zinc-950/80 backdrop-blur-sm aspect-[3/1] flex items-center justify-center hover:border-zinc-700 transition-colors duration-500"
                            >
                              <SafeSponsorImage
                                src={logo}
                                alt={`${group.title} ${idx + 1}`}
                                fallbackText={`${group.title.replace(" Partners", "").replace(" Service", "")} ${idx + 1}`}
                              />
                            </motion.div>
                          );
                        })}
                      </div>
                    )}

                    {/* Divider */}
                    {gIdx < groups.length - 1 && (
                      <div className="h-px w-full bg-gradient-to-r from-transparent via-zinc-900 to-transparent" />
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Copyright */}
            <div className="mt-16 sm:mt-20 pt-8 border-t border-zinc-900 text-center">
              <p className="text-[11px] sm:text-xs text-zinc-700 font-medium tracking-wide">
                &copy; Copyright {year} Two Wheels Motor Racing Sdn Bhd (TWMR). All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
