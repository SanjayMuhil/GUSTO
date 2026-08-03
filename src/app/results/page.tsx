"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Shuffle from "../../components/Shuffle";
import resultsData from "../../content/results.json";

interface CategoryLink {
  name: string;
  link: string;
  hasLaptime?: boolean;
}

interface EventItem {
  id: string;
  round: string;
  title: string;
  circuit: string;
  location: string;
  country: string;
  flag: string;
  date: string;
  image: string;
  championship: string;
  championshipLogoText: string;
  result: string;
  position: string;
  points: string;
  badge: string;
  status: string;
  categories: CategoryLink[];
}

function StatusBadge({ status }: { status: string }) {
  const lower = status.toLowerCase();
  if (lower === "complete") {
    return (
      <span className="inline-flex items-center gap-1 bg-emerald-600/90 text-white font-extrabold text-[10px] sm:text-xs tracking-wider uppercase px-3 py-1 rounded-full shadow-md border border-emerald-400/30">
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
        Complete
      </span>
    );
  }
  if (lower === "finale") {
    return (
      <span className="inline-flex items-center gap-1 bg-gradient-to-r from-amber-500 to-red-600 text-white font-black text-[10px] sm:text-xs tracking-wider uppercase px-3 py-1 rounded-full shadow-md">
        <span>🏆</span>
        Finale
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 bg-orange-500/90 text-white font-extrabold text-[10px] sm:text-xs tracking-wider uppercase px-3 py-1 rounded-full shadow-md border border-orange-400/30">
      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      Upcoming
    </span>
  );
}

export default function ResultsPage() {
  const shouldReduceMotion = useReducedMotion();
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const events = resultsData.events as EventItem[];

  return (
    <div className="min-h-screen bg-black text-white selection:bg-red-600 selection:text-white overflow-x-hidden">
      <Header />

      <main className="relative z-10 pb-20">
        {/* 1. Hero Header */}
        <section className="relative py-16 sm:py-24 bg-gradient-to-b from-zinc-950 via-zinc-950 to-black border-b border-zinc-900 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-red-600/10 rounded-full blur-[150px] pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10 text-center space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5 text-[10px] sm:text-xs font-black uppercase tracking-[0.25em] text-red-500">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              {resultsData.hero.sectionLabel}
            </div>

            <div className="space-y-2">
              <Shuffle
                text={resultsData.hero.title.line1}
                tag="h1"
                className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white"
                textAlign="center"
                duration={0.4}
              />
              <Shuffle
                text={resultsData.hero.title.line2}
                tag="h2"
                className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500"
                textAlign="center"
                duration={0.4}
              />
            </div>

            <p className="text-zinc-400 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed pt-1">
              {resultsData.hero.subtitle}
            </p>
          </div>
        </section>

        {/* 2. Race Results Cards Grid */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pt-12 sm:pt-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 items-stretch"
          >
            {events.map((event) => (
              <motion.div
                key={event.id}
                variants={cardVariants}
                whileHover={shouldReduceMotion ? {} : { y: -6 }}
                className="bg-zinc-950 border border-zinc-900 rounded-[24px] overflow-hidden shadow-2xl hover:border-red-500/50 hover:shadow-red-950/30 transition-all duration-300 flex flex-col group h-full"
              >
                {/* Top Section: Fixed Image with Overlay */}
                <div className="relative w-full overflow-hidden bg-zinc-900 shrink-0" style={{ height: 220 }}>
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />

                  {/* Overlay Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
                    <span className="bg-black/80 backdrop-blur-md border border-zinc-800 text-zinc-300 text-[9px] font-extrabold uppercase px-2.5 py-1 rounded-full tracking-widest shadow-md">
                      {event.championship}
                    </span>
                    <StatusBadge status={event.status} />
                  </div>
                </div>

                {/* Middle Banner: Championship Logo & Date Badge */}
                <div className="p-4 bg-zinc-900/60 border-b border-zinc-900 flex items-center justify-between gap-3 shrink-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xl sm:text-2xl font-black italic tracking-tighter text-white uppercase font-mono group-hover:text-red-500 transition-colors">
                      {event.championshipLogoText}
                    </span>
                  </div>

                  <div className="bg-[#101b33] border border-blue-900/50 text-white font-extrabold text-xs sm:text-sm px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-md">
                    {event.date}
                  </div>
                </div>

                {/* Card Content & Details */}
                <div className="p-5 space-y-4 flex-1 flex flex-col justify-between min-h-0">
                  <div>
                    <span className="text-red-500 text-[10px] tracking-[0.25em] font-black uppercase block mb-1">
                      {event.round}
                    </span>
                    <h3 className="text-lg sm:text-xl font-black text-white uppercase tracking-tight leading-snug">
                      {event.title}
                    </h3>
                  </div>

                  {/* Circuit & Location */}
                  <div className="space-y-2 pt-2 border-t border-zinc-900/80">
                    <div className="flex items-start gap-2 text-zinc-300 text-xs font-medium">
                      <span className="text-red-500 text-sm mt-0.5">📍</span>
                      <span className="line-clamp-2 leading-tight">{event.circuit}</span>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1">
                      <div className="flex items-center gap-1.5 text-zinc-400 font-bold uppercase tracking-wider text-[11px]">
                        <span className="text-base">{event.flag}</span>
                        <span>{event.location}, {event.country}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="bg-zinc-900 text-zinc-300 px-2 py-0.5 rounded text-[10px] font-extrabold uppercase border border-zinc-800">
                          {event.position}
                        </span>
                        <span className="bg-red-500/10 border border-red-500/30 text-red-400 px-2 py-0.5 rounded text-[10px] font-extrabold uppercase">
                          {event.points}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Expandable Session Links */}
                  <div className="pt-3">
                    <button
                      onClick={() => setExpandedCardId(expandedCardId === event.id ? null : event.id)}
                      className="w-full py-2.5 px-3 bg-zinc-900/80 hover:bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-400 hover:text-white text-[11px] font-extrabold uppercase tracking-wider flex items-center justify-between transition-colors"
                    >
                      <span>Session Links & Data ({event.categories.length})</span>
                      <svg
                        className={`w-3.5 h-3.5 transition-transform duration-300 ${
                          expandedCardId === event.id ? "rotate-180 text-red-500" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Session Grid Drawer */}
                    {expandedCardId === event.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-3 grid grid-cols-2 gap-2 pt-2 border-t border-zinc-900"
                      >
                        {event.categories.map((cat: CategoryLink, idx: number) => (
                          <a
                            key={idx}
                            href={cat.link}
                            className="p-2 bg-zinc-950 border border-zinc-900 hover:border-red-500/40 rounded-lg text-[10px] font-bold text-zinc-300 hover:text-red-400 flex items-center justify-between transition-all"
                          >
                            <span className="truncate">{cat.name}</span>
                            <span className="text-zinc-600">→</span>
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* 3. Previous Results Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pt-16 sm:pt-20">
          <div className="text-center p-8 sm:p-12 bg-zinc-950 border border-zinc-900 rounded-3xl space-y-4 shadow-xl">
            <h3
              className="text-white text-xl sm:text-2xl font-black uppercase tracking-tight"
              style={{ fontFamily: "'Royal Tomato', sans-serif" }}
            >
              ARCHIVED CHAMPIONSHIP SEASONS
            </h3>
            <p className="text-zinc-400 text-xs sm:text-sm max-w-md mx-auto">
              {resultsData.previousResults.paragraph}
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-500 text-white font-extrabold rounded-xl transition duration-300 text-xs tracking-widest uppercase shadow-lg shadow-red-600/30 active:scale-98"
            >
              {resultsData.previousResults.buttonText}
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
