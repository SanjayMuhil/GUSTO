"use client";

import { motion } from "framer-motion";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Shuffle from "../../components/Shuffle";
import StickerPeelLogo from "../../components/StickerPeelLogo";
import partnersData from "../../content/partners.json";

interface BrandPartnerItem {
  id: string;
  name: string;
  logo?: string;
  bgType: string;
  description: string;
}

// Render dynamic logo image or SVG / Styled typography fallback wrapped with StickerPeelLogo
function BrandLogoDisplay({ brand }: { brand: BrandPartnerItem }) {
  const containerBg =
    brand.bgType === "white"
      ? "bg-white"
      : brand.bgType === "red"
      ? "bg-[#c8102e]"
      : "bg-black border-b border-zinc-800";

  if (brand.logo && brand.logo.trim() !== "") {
    return (
      <div className={`w-full h-full ${containerBg} flex items-center justify-center p-6 text-center select-none overflow-hidden`}>
        <StickerPeelLogo src={brand.logo} alt={brand.name} />
      </div>
    );
  }

  // Styled typography fallbacks for missing image paths wrapped in StickerPeelLogo
  switch (brand.id) {
    case "sidvin":
      return (
        <div className="w-full h-full bg-white flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden">
          <StickerPeelLogo
            alt={brand.name}
            fallback={
              <div className="flex flex-col items-center justify-center">
                <span className="font-black text-2xl tracking-tight text-[#0066cc] uppercase font-sans">
                  SIDVIN
                </span>
                <span className="text-[10px] tracking-wider font-semibold text-[#0066cc] lowercase mt-0.5">
                  energy engineering
                </span>
              </div>
            }
          />
        </div>
      );

    case "honda":
      return (
        <div className="w-full h-full bg-[#c8102e] flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden">
          <StickerPeelLogo
            alt={brand.name}
            fallback={
              <div className="flex flex-col items-center justify-center">
                <span className="font-black text-xl sm:text-2xl tracking-tight text-white italic uppercase leading-none drop-shadow-md">
                  Honda Racing
                </span>
                <span className="font-bold text-lg tracking-widest text-white italic uppercase mt-1">
                  India
                </span>
              </div>
            }
          />
        </div>
      );

    case "kyt":
      return (
        <div className="w-full h-full bg-black flex flex-col items-center justify-center p-6 text-center select-none border-b border-zinc-800 overflow-hidden">
          <StickerPeelLogo
            alt={brand.name}
            fallback={
              <div className="flex flex-col items-center justify-center">
                <div className="border-2 border-white rounded-full px-6 py-2 bg-black flex items-center justify-center">
                  <span className="font-black text-2xl tracking-tighter text-white italic font-mono">
                    KYT
                  </span>
                </div>
                <span className="text-[10px] tracking-[0.4em] font-extrabold text-white uppercase mt-3">
                  OFFICIAL
                </span>
              </div>
            }
          />
        </div>
      );

    default:
      return (
        <div className={`w-full h-full ${containerBg} flex items-center justify-center p-6 text-center select-none overflow-hidden`}>
          <StickerPeelLogo
            alt={brand.name}
            fallback={
              <span className="font-black text-xl text-white tracking-widest uppercase">
                {brand.name}
              </span>
            }
          />
        </div>
      );
  }
}

export default function PartnersPage() {
  const fadeInVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 80, damping: 15 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, delay: i * 0.05 }
    })
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-red-600 selection:text-white overflow-x-hidden">
      <Header />

      {/* 1. Hero Section */}
      <section className="relative min-h-[45vh] sm:min-h-[55vh] flex items-center justify-center bg-gradient-to-b from-zinc-950 via-zinc-950 to-black py-16 lg:py-24 border-b border-zinc-900 overflow-hidden">
        {/* Ambient Light Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        <div className="container mx-auto px-4 max-w-5xl relative z-10 text-center space-y-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5 text-[10px] sm:text-xs font-black uppercase tracking-[0.25em] text-red-500">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              {partnersData.hero.badge}
            </div>

            <span className="text-zinc-500 font-extrabold text-xs sm:text-sm tracking-[0.3em] uppercase block">
              {partnersData.hero.eyebrow}
            </span>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter uppercase leading-none">
              {partnersData.hero.title.line1}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">
                {partnersData.hero.title.line2}
              </span>
            </h1>

            <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed pt-2">
              {partnersData.hero.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Brand Partners Cards Flow */}
      <section className="py-16 sm:py-24 bg-black relative border-b border-zinc-900">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16 space-y-2">
            <span className="text-red-500 text-xs tracking-[0.3em] font-bold uppercase">
              {partnersData.brandPartners.sectionLabel}
            </span>
            <Shuffle
              text={partnersData.brandPartners.sectionTitle}
              tag="h2"
              className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight"
              textAlign="center"
              duration={0.4}
            />
          </div>

          {/* 4-Column Grid Layout with Isolated Sticker Peel Effect on Logos Only */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
            {partnersData.brandPartners.items.map((brand: BrandPartnerItem, i: number) => (
              <motion.div
                key={brand.id}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={cardVariants}
                className="flex flex-col rounded-xl overflow-hidden bg-zinc-950 border border-zinc-900 shadow-xl group hover:border-red-600/50 transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Top Logo Container (Contains Isolated Sticker Peel Logo) */}
                <div className="h-44 sm:h-48 md:h-52 w-full relative flex items-center justify-center overflow-hidden">
                  <BrandLogoDisplay brand={brand} />
                </div>

                {/* Slanted Red Ribbon Banner Header */}
                <div className="relative z-10 -mt-2">
                  <div className="bg-gradient-to-r from-red-700 via-red-600 to-red-800 text-white font-black text-sm sm:text-base italic uppercase tracking-wider py-2.5 px-4 shadow-lg flex items-center [clip-path:polygon(0_0,100%_0,90%_100%,0%_100%)] pr-6 truncate">
                    {brand.name}
                  </div>
                </div>

                {/* Bottom Content Description Box */}
                <div className="flex-1 p-5 bg-[#181d24] border-t border-zinc-900/60 flex flex-col justify-start">
                  <p className="text-zinc-300 text-xs leading-relaxed font-sans">
                    {brand.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
