"use client";

import Header from "../../components/Header";
import Shuffle from "../../components/Shuffle";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Footer from "../../components/Footer";

const roundsData = [
  {
    round: "ROUND 1",
    subtitle: "Sepang International Circuit",
    image: "/round-5-sepang.png",
    categories: [
      { name: "Test 1", link: "#" },
      { name: "Test 2", link: "#" },
      { name: "Test 3", link: "#" },
      { name: "Free Practice 1", link: "#" },
      { name: "Free Practice 2", link: "#" },
      { name: "Free Practice 3", link: "#" },
      { name: "Combined Practice", link: "#" },
      { name: "Qualifying", link: "#" },
      { name: "Grid", link: "#" },
      { name: "Race 1", link: "#" },
      { name: "Warm Up", link: "#" },
      { name: "Race 2", link: "#" },
      { name: "Rider Standing", link: "#" },
      { name: "Team Standing", link: "#" },
      { name: "Practice 1 Laptime", link: "#" },
      { name: "Practice 2 Laptime", link: "#" },
      { name: "Practice 3 Laptime", link: "#" },
      { name: "Qualifying Laptime", link: "#" },
      { name: "Race 1 Laptime", link: "#" },
      { name: "Warm Up Laptime", link: "#" },
      { name: "Race 2 Laptime", link: "#" },
    ],
  },
  {
    round: "ROUND 2",
    subtitle: "Chang International Circuit",
    image: "/partners-action.png",
    categories: [
      { name: "Practice 1", link: "#", hasLaptime: true },
      { name: "Practice 2", link: "#", hasLaptime: true },
      { name: "Practice 3", link: "#", hasLaptime: true },
      { name: "Combined Practice", link: "#" },
      { name: "Qualifying", link: "#", hasLaptime: true },
      { name: "Grid", link: "#" },
      { name: "Race 1", link: "#", hasLaptime: true },
      { name: "Warm Up", link: "#", hasLaptime: true },
      { name: "Race 2", link: "#", hasLaptime: true },
      { name: "Rider Standing", link: "#" },
      { name: "Team Standing", link: "#" },
    ],
  },
  {
    round: "ROUND 3",
    subtitle: "Mobility Resort Motegi",
    image: "/home-hero.png",
    categories: [
      { name: "Practice 1", link: "#", hasLaptime: true },
      { name: "Practice 2", link: "#", hasLaptime: true },
      { name: "Practice 3", link: "#", hasLaptime: true },
      { name: "Combined Practice", link: "#" },
      { name: "Qualifying", link: "#", hasLaptime: true },
      { name: "Grid 1", link: "#" },
      { name: "Race 1", link: "#", hasLaptime: true },
      { name: "Standings", link: "#" },
      { name: "Team Standing", link: "#" },
      { name: "Warm Up", link: "#", hasLaptime: true },
      { name: "Grid 2", link: "#" },
      { name: "Race 2", link: "#", hasLaptime: true },
      { name: "Standings", link: "#" },
      { name: "Team Standings", link: "#" },
    ],
  },
  {
    round: "ROUND 4",
    subtitle: "Mandalika International Circuit",
    image: "/victory-banner-bg.png",
    categories: [
      { name: "Practice 1", link: "#", hasLaptime: true },
      { name: "Practice 2", link: "#", hasLaptime: true },
      { name: "Practice 3", link: "#", hasLaptime: true },
      { name: "Combined Practice", link: "#" },
      { name: "Qualifying 1", link: "#", hasLaptime: true },
      { name: "Qualifying 2", link: "#", hasLaptime: true },
      { name: "Superpole", link: "#", hasLaptime: true },
      { name: "Grid 1", link: "#" },
      { name: "Race 1", link: "#", hasLaptime: true },
      { name: "Standings", link: "#" },
      { name: "Team Standings", link: "#" },
      { name: "Warm Up", link: "#", hasLaptime: true },
      { name: "Grid 2", link: "#" },
      { name: "Race 2", link: "#", hasLaptime: true },
      { name: "Standings", link: "#" },
      { name: "Team Standings", link: "#" },
    ],
  },
  {
    round: "ROUND 5",
    subtitle: "Sepang International Circuit",
    image: "/partners-hero.png",
    categories: [
      { name: "Practice 1", link: "#", hasLaptime: true },
      { name: "Practice 2", link: "#", hasLaptime: true },
      { name: "Practice 3", link: "#", hasLaptime: true },
      { name: "Combined Practice", link: "#" },
      { name: "Qualifying", link: "#", hasLaptime: true },
      { name: "Grid 1", link: "#" },
      { name: "Race 1", link: "#", hasLaptime: true },
      { name: "Standings", link: "#" },
      { name: "Team Standings", link: "#" },
      { name: "Warm Up", link: "#", hasLaptime: true },
      { name: "Grid 2", link: "#" },
      { name: "Race 2", link: "#", hasLaptime: true },
      { name: "Standings", link: "#" },
      { name: "Team Standings", link: "#" },
    ],
  },
  {
    round: "ROUND 6",
    subtitle: "Chang International Circuit",
    image: "/partners-profile.png",
    categories: [
      { name: "Practice 1", link: "#", hasLaptime: true },
      { name: "Practice 2", link: "#", hasLaptime: true },
      { name: "Practice 3", link: "#", hasLaptime: true },
      { name: "Combined Practice", link: "#" },
      { name: "Qualifying", link: "#", hasLaptime: true },
      { name: "Grid", link: "#" },
      { name: "Race 1", link: "#", hasLaptime: true },
      { name: "Standings", link: "#" },
      { name: "Team Standings", link: "#" },
      { name: "Warm Up", link: "#", hasLaptime: true },
      { name: "Grid 2", link: "#" },
      { name: "Race 2", link: "#", hasLaptime: true },
      { name: "Standings", link: "#" },
      { name: "Team Standings", link: "#" },
    ],
  },
];

export default function ResultsPage() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="min-h-screen bg-black text-white selection:bg-red-600 selection:text-white overflow-x-hidden">
      <Header />

      <main className="relative z-10">
        {/* Hero Header */}
        <section className="relative py-12 sm:py-16 md:py-24 bg-gradient-to-b from-zinc-950 to-black border-b border-zinc-900 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-red-900/10 via-transparent to-transparent pointer-events-none" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative">
            <div className="text-center space-y-3 sm:space-y-4">
              <span className="text-red-500 uppercase tracking-[0.35em] text-[10px] sm:text-xs font-black block">Season Results</span>
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-none">
                RESULT <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">2025</span>
              </h1>
              <p className="text-zinc-500 max-w-2xl mx-auto text-xs sm:text-sm md:text-base leading-relaxed">
                Official race results, practice sessions, qualifying times, and championship standings across all rounds.
              </p>
            </div>
          </div>
        </section>

        {/* Rounds Results */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-10 sm:py-12 md:py-16 space-y-12 sm:space-y-16 md:space-y-20 lg:space-y-24">
          {roundsData.map((round, rIdx) => (
            <motion.section
              key={round.round}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="relative"
            >
                {/* Round Header with Image */}
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-zinc-900 bg-zinc-950 mb-6 sm:mb-8 group">
                  <div className="absolute inset-0">
                    <Image
                      src={round.image}
                      alt={round.subtitle}
                      fill
                      className="object-cover opacity-30 group-hover:opacity-40 transition duration-700"
                      sizes="(max-width: 768px) 100vw, 80vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-zinc-950/60" />
                  </div>

                  <div className="relative z-10 p-4 sm:p-6 md:p-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 sm:gap-4">
                    <div>
                      <span className="text-red-500 text-[10px] sm:text-xs tracking-[0.3em] font-black uppercase block mb-1 sm:mb-2">
                        {round.round}
                      </span>
                      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white uppercase tracking-tighter leading-none">
                        {round.subtitle}
                      </h2>
                    </div>
                    <span className="text-zinc-500 text-[10px] sm:text-xs md:text-sm font-extrabold uppercase tracking-widest">
                      Idemitsu FIM Asia Road Racing Championship
                    </span>
                  </div>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 min-[380px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-4">
                  {round.categories.map((cat, idx) => (
                    <motion.a
                      key={idx}
                      href={cat.link}
                      className="group relative overflow-hidden rounded-xl border border-zinc-900 bg-zinc-950/80 p-3 sm:p-4 md:p-5 flex flex-col justify-between hover:border-red-600/30 transition-all duration-300 min-h-[60px] sm:min-h-[70px]"
                      whileHover={shouldReduceMotion ? {} : { y: -4, borderColor: "rgba(220, 38, 38, 0.3)" }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[10px] sm:text-xs font-black text-white uppercase tracking-wider leading-tight group-hover:text-red-500 transition-colors duration-300">
                        {cat.name}
                      </span>
                      {cat.hasLaptime && (
                        <span className="text-[9px] text-zinc-600 font-bold uppercase tracking-wider whitespace-nowrap">
                          Laptime
                        </span>
                      )}
                    </div>
                    <div className="mt-2 sm:mt-3 flex items-center gap-1 text-zinc-600 group-hover:text-red-500 transition-colors duration-300">
                      <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider">View</span>
                      <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.section>
          ))}
        </div>

        {/* Previous Results */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pb-16 sm:pb-20">
          <div className="text-center p-6 sm:p-8 md:p-12 bg-zinc-950 border border-zinc-900 rounded-2xl sm:rounded-3xl">
            <p className="text-zinc-400 text-sm sm:text-base mb-4">
              For previous results, please click here
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-red-600 hover:bg-red-700 text-white font-extrabold rounded-xl transition duration-300 text-[10px] sm:text-xs tracking-widest uppercase shadow-lg shadow-red-600/20"
            >
              Previous Results
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
