"use client";

import Header from "../../components/Header";
import Shuffle from "../../components/Shuffle";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Footer from "../../components/Footer";
import resultsData from "../../content/results.json";

const roundsData = resultsData.rounds;

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
              <span className="text-red-500 uppercase tracking-[0.35em] text-[10px] sm:text-xs font-black block">{resultsData.hero.sectionLabel}</span>
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-none">
                {resultsData.hero.title.line1} <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">{resultsData.hero.title.line2}</span>
              </h1>
              <p className="text-zinc-500 max-w-2xl mx-auto text-xs sm:text-sm md:text-base leading-relaxed">
                {resultsData.hero.subtitle}
              </p>
            </div>
          </div>
        </section>

        {/* Rounds Results */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-10 sm:py-12 md:py-16 space-y-12 sm:space-y-16 md:space-y-20 lg:space-y-24">
          {roundsData.map((round: any, rIdx: number) => (
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
                       {resultsData.hero.championshipName}
                     </span>
                  </div>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 min-[380px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-4">
                  {round.categories.map((cat: any, idx: number) => (
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
              {resultsData.previousResults.paragraph}
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-red-600 hover:bg-red-700 text-white font-extrabold rounded-xl transition duration-300 text-[10px] sm:text-xs tracking-widest uppercase shadow-lg shadow-red-600/20"
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
