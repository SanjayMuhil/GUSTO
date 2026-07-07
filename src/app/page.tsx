"use client";

import Link from "next/link";
import Image from "next/image";
import Header from "../components/Header";
import Shuffle from "../components/Shuffle";
import SeasonSchedule from "../components/SeasonSchedule";
import ChromaGrid from "../components/ChromaGrid";
import PixelCard from "../components/PixelCard";
import PixelTransition from "../components/PixelTransition";
import CardSwap, { Card } from "../components/CardSwap";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";

const champions = [
  {
    class: "ASB1000",
    name: "Yuki Kunii",
    team: "SDG MS Harc-Pro. Honda",
    country: "Japan",
    number: "92",
    image: "/2.jpeg",
    gradient: "from-purple-950 via-fuchsia-800 to-fuchsia-600",
    stats: { wins: "12", podiums: "18", lap: "1:35.244", role: "Team Leader" }
  },
  {
    class: "SS600",
    name: "Apiwath Wongthananon",
    team: "Yamaha Tekhne Racing Team Asean",
    country: "Thailand",
    number: "24",
    image: "/3.jpeg",
    gradient: "from-blue-950 via-cyan-800 to-cyan-600",
    stats: { wins: "8", podiums: "14", lap: "1:38.102", role: "Precision Expert" }
  },
  {
    class: "AP250",
    name: "Herjun Atna Firdaus",
    team: "Astra Honda Racing Team",
    country: "Indonesia",
    number: "46",
    image: "/4.jpeg",
    gradient: "from-emerald-950 via-green-850 to-emerald-600",
    stats: { wins: "6", podiums: "11", lap: "1:40.312", role: "Rising Star" }
  },
  {
    class: "UB150",
    name: "Md Akid Aziz",
    team: "UMA Racing YAMAHA Maju Motor Asia Team",
    country: "Malaysia",
    number: "13",
    image: "/5.jpeg",
    gradient: "from-indigo-950 via-indigo-850 to-blue-700",
    stats: { wins: "10", podiums: "16", lap: "1:45.922", role: "Underbone King" }
  },
  {
    class: "TVS ASIA OMC",
    name: "Hiroki Ono",
    team: "TVS Racing",
    country: "Japan",
    number: "1",
    image: "/6.jpeg",
    gradient: "from-red-950 via-red-800 to-orange-600",
    stats: { wins: "14", podiums: "20", lap: "1:42.155", role: "TVS Champion" }
  },
];

const categoriesData = [
  {
    id: 1,
    name: "ASB1000",
    desc: "The pinnacle of Asian motorsports. High-octane 1000cc superbikes showcasing peak rider precision and manufacturer engineering.",
    image: "/2.jpeg",
    championship: "Asia Road Racing Championship",
    years: "2025/2026"
  },
  {
    id: 2,
    name: "SS600",
    desc: "The ultimate proving ground for tactical skill and consistency. Mid-weight supersports demanding perfection.",
    image: "/3.jpeg",
    championship: "Qatar Superstock & ARRC",
    years: "2025/2026"
  },
  {
    id: 3,
    name: "AP250",
    desc: "The launchpad for Asia's next racing generation. Fast, competitive production-based racing.",
    image: "/4.jpeg",
    championship: "Asia Road Racing Championship",
    years: "2025/2026"
  },
  {
    id: 4,
    name: "UB150",
    desc: "Authentic regional passion and mass-market reach. Ground-level racing featuring highly modified underbone machines.",
    image: "/5.jpeg",
    championship: "Asia Road Racing Championship",
    years: "2025/2026"
  },
  {
    id: 5,
    name: "TVS ASIA OMC",
    desc: "A global showcase of mechanical reliability and emerging talent riding uniform race-tuned TVS Apache RR 310s.",
    image: "/6.jpeg",
    championship: "TVS Asia One Make Championship",
    years: "2025/2026"
  }
];

const newsItems = [
  {
    image: "/5.jpeg",
    title: "2026 KTM Cup Champion",
    subtitle: "Johann seals the title in a dominant season finale",
    handle: "#KTMCup2026",
    borderColor: "#EF4444",
    gradient: "linear-gradient(145deg, #EF4444, #000)",
    url: "/updates"
  },
  {
    image: "/3.jpeg",
    title: "Qatar Superstock 600 Champion",
    subtitle: "First Indian rider to win the title, 2025 season",
    handle: "#QatarSTK600",
    borderColor: "#F97316",
    gradient: "linear-gradient(160deg, #F97316, #000)",
    url: "/updates"
  },
  {
    image: "/5.jpeg",
    title: "ARRC AP250 Campaign",
    subtitle: "Backed by Honda Racing India on the Asian stage",
    handle: "#ARRC2025",
    borderColor: "#F59E0B",
    gradient: "linear-gradient(180deg, #F59E0B, #000)",
    url: "/updates"
  },
  {
    image: "/joh.png",
    title: "Lusail Lap Record",
    subtitle: "New SSP300 lap record set in Qatar",
    handle: "#LusailRecord",
    borderColor: "#DC2626",
    gradient: "linear-gradient(200deg, #DC2626, #000)",
    url: "/updates"
  },
  {
    image: "/5.jpeg",
    title: "Estoril Wet Race — P4",
    subtitle: "European Talent Cup standout finish in Portugal",
    handle: "#EuropeanTalentCup",
    borderColor: "#EA580C",
    gradient: "linear-gradient(220deg, #EA580C, #000)",
    url: "/updates"
  },
  {
    image: "/5.jpeg",
    title: "Thailand Talent Cup",
    subtitle: "Selected for the regional development series",
    handle: "#ThailandTalentCup",
    borderColor: "#FB923C",
    gradient: "linear-gradient(240deg, #FB923C, #000)",
    url: "/updates"
  }
];

const scheduleCategories = [
  {
    id: "rounds",
    label: "All Rounds",
    images: [
      { src: "/2.jpeg", alt: "Season Schedule", caption: "2026 CALENDAR" },
      { src: "/3.jpeg", alt: "Sepang International Circuit", caption: "ROUND 1 — SEPANG" },
      { src: "/4.jpeg", alt: "Chang International Circuit", caption: "ROUND 2 — CHANG" },
      { src: "/5.jpeg", alt: "Mobility Resort Motegi", caption: "ROUND 3 — MOTEGI" },
      { src: "/6.jpeg", alt: "Mandalika International Circuit", caption: "ROUND 4 — MANDALIKA" },
      { src: "/2.jpeg", alt: "Sepang International Circuit", caption: "ROUND 5 — SEPANG" },
      { src: "/3.jpeg", alt: "Chang International Circuit", caption: "ROUND 6 — CHANG" }
    ]
  },
  {
    id: "asb1000",
    label: "ASB1000",
    images: [
      { src: "/2.jpeg", alt: "ASB1000 Racer", caption: "YUKI KUNII — SDG MS HARC-PRO" },
    ]
  },
  {
    id: "ss600",
    label: "SS600",
    images: [
      { src: "/3.jpeg", alt: "SS600 Racer", caption: "APIWATH WONG — YAMAHA TEKHNE" }
    ]
  },
  {
    id: "ap250",
    label: "AP250",
    images: [
      { src: "/4.jpeg", alt: "AP250 Racer", caption: "HERJUN ATNA — ASTRa HONDA" }
    ]
  },
  {
    id: "ub150",
    label: "UB150",
    images: [
      { src: "/5.jpeg", alt: "UB150 Racer", caption: "MD AKID AZIZ — UMA RACING" }
    ]
  }
];

export default function Home() {
  const [sliderIndex, setSliderIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);
  const [activeCategory, setActiveCategory] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const preferredMotion = useReducedMotion();
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

  useEffect(() => {
    setShouldReduceMotion(preferredMotion ?? false);
  }, [preferredMotion]);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (window.innerWidth < 640) {
        setVisibleCards(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
      const w = window.innerWidth;
      if (w < 640) {
        setCardSwapWidth(Math.min(280, w - 48));
        setCardSwapHeight(200);
      } else if (w < 1024) {
        setCardSwapWidth(340);
        setCardSwapHeight(260);
      } else {
        setCardSwapWidth(420);
        setCardSwapHeight(320);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCategory((prev) => (prev + 1) % categoriesData.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const maxIndex = champions.length - visibleCards;

  const handlePrev = () => {
    setSliderIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  const handleNext = () => {
    setSliderIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  useEffect(() => {
    const maxIdx = champions.length - visibleCards;
    if (sliderIndex > maxIdx) {
      setSliderIndex(maxIdx);
    }
  }, [visibleCards, sliderIndex]);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Array<{ id: number; size: number; x: number; y: number; delay: number; duration: number; opacity: number }>>([]);
  const [cardSwapWidth, setCardSwapWidth] = useState(320);
  const [cardSwapHeight, setCardSwapHeight] = useState(260);

  useEffect(() => {
    // Generate 30 random particles
    const generated = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      size: Math.random() * 3 + 1.5, // 1.5px to 4.5px
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 6,
      duration: Math.random() * 10 + 8,
      opacity: Math.random() * 0.35 + 0.1,
    }));
    setParticles(generated);
  }, []);

  const handlePageMouseMove = (e: React.MouseEvent) => {
    const x = (e.clientX / (typeof window !== "undefined" ? window.innerWidth : 1920)) - 0.5;
    const y = (e.clientY / (typeof window !== "undefined" ? window.innerHeight : 1080)) - 0.5;
    setMousePos({ x, y });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 90,
        damping: 14,
      },
    },
  };

  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});
  const [glareStyle, setGlareStyle] = useState<React.CSSProperties>({ opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = x / rect.width - 0.5;
    const yc = y / rect.height - 0.5;
    const rotateY = xc * 16;
    const rotateX = -yc * 16;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`,
      transition: "transform 0.1s ease-out",
    });

    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    setGlareStyle({
      background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 80%)`,
      opacity: 1,
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      transition: "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
    });
    setGlareStyle({
      opacity: 0,
      transition: "opacity 0.5s ease",
    });
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-black text-white overflow-x-hidden relative"
      onMouseMove={handlePageMouseMove}
    >
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-b from-zinc-950 to-black flex items-center pt-24 pb-16 overflow-hidden">
        {/* Radial ambient glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-red-900/10 via-transparent to-transparent pointer-events-none z-0" />

        {/* Ambient moving glow lights */}
        <div
          className="absolute top-1/4 left-1/3 w-[450px] h-[450px] rounded-full bg-red-600/5 blur-[120px] pointer-events-none z-0"
          style={{
            transform: `translate3d(${mousePos.x * 60}px, ${mousePos.y * 60}px, 0)`,
            transition: "transform 0.2s ease-out",
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/3 w-[450px] h-[450px] rounded-full bg-orange-500/5 blur-[120px] pointer-events-none z-0"
          style={{
            transform: `translate3d(${mousePos.x * -60}px, ${mousePos.y * -60}px, 0)`,
            transition: "transform 0.2s ease-out",
          }}
        />


        {/* Particle System */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full bg-white/30"
              style={{
                width: p.size,
                height: p.size,
                left: `${p.x}%`,
                top: `${p.y}%`,
              }}
              animate={shouldReduceMotion ? {} : {
                y: [0, -180],
                x: [0, Math.random() * 60 - 30],
                opacity: [0, p.opacity, 0],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* 3D Floating Glass Shapes */}
        {/* Spinning 3D Cube */}
        <div className="absolute top-1/4 right-[12%] w-32 h-32 pointer-events-none z-0 hidden lg:block" style={{ perspective: 1000 }}>
          <motion.div
            className="w-full h-full relative"
            style={{
              transformStyle: "preserve-3d",
              rotateX: shouldReduceMotion ? 0 : mousePos.y * -45,
              rotateY: shouldReduceMotion ? 0 : mousePos.x * 45,
            }}
            animate={shouldReduceMotion ? {} : {
              rotateX: [0, 360],
              rotateY: [360, 0],
            }}
            transition={{
              duration: 28,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {/* Cube Faces */}
            <div className="absolute w-32 h-32 border border-red-500/10 bg-red-950/5 backdrop-blur-[2px] rounded-lg" style={{ transform: "rotateY(0deg) translateZ(64px)" }} />
            <div className="absolute w-32 h-32 border border-red-500/10 bg-red-950/5 backdrop-blur-[2px] rounded-lg" style={{ transform: "rotateY(180deg) translateZ(64px)" }} />
            <div className="absolute w-32 h-32 border border-red-500/10 bg-red-950/5 backdrop-blur-[2px] rounded-lg" style={{ transform: "rotateY(90deg) translateZ(64px)" }} />
            <div className="absolute w-32 h-32 border border-red-500/10 bg-red-950/5 backdrop-blur-[2px] rounded-lg" style={{ transform: "rotateY(-90deg) translateZ(64px)" }} />
            <div className="absolute w-32 h-32 border border-red-500/10 bg-red-950/5 backdrop-blur-[2px] rounded-lg" style={{ transform: "rotateX(90deg) translateZ(64px)" }} />
            <div className="absolute w-32 h-32 border border-red-500/10 bg-red-950/5 backdrop-blur-[2px] rounded-lg" style={{ transform: "rotateX(-90deg) translateZ(64px)" }} />
          </motion.div>
        </div>

        {/* Floating Glass Ring */}
        <motion.div
          className="absolute top-[20%] left-[8%] w-48 h-48 rounded-full border border-orange-500/10 bg-gradient-to-br from-orange-500/5 to-transparent backdrop-blur-[2px] pointer-events-none z-0 hidden md:block"
          style={{
            x: shouldReduceMotion ? 0 : mousePos.x * -40,
            y: shouldReduceMotion ? 0 : mousePos.y * -40,
          }}
          animate={shouldReduceMotion ? {} : {
            y: [0, -15, 0],
            rotate: [0, 360],
          }}
          transition={{
            y: { duration: 7, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 32, repeat: Infinity, ease: "linear" }
          }}
        />

        {/* Floating Glass Plate */}
        <motion.div
          className="absolute bottom-[18%] left-[4%] w-40 h-56 rounded-2xl border border-zinc-800/40 bg-zinc-950/10 backdrop-blur-md pointer-events-none z-0 hidden lg:block"
          style={{
            rotateX: shouldReduceMotion ? 0 : mousePos.y * 25,
            rotateY: shouldReduceMotion ? 0 : mousePos.x * -25,
            x: shouldReduceMotion ? 0 : mousePos.x * -25,
            y: shouldReduceMotion ? 0 : mousePos.y * -25,
          }}
          animate={shouldReduceMotion ? {} : {
            y: [0, 12, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            {/* Left Content Column */}
            <motion.div
              className="lg:col-span-7 space-y-4 sm:space-y-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.p
                variants={itemVariants}
                className="text-red-500 text-[10px] sm:text-xs tracking-[0.3em] uppercase font-bold"
              >
             
              </motion.p>

              <motion.h1
                variants={itemVariants}
                className="text-4xl sm:text-6xl lg:text-8xl font-black leading-none text-white tracking-tight uppercase"
              >
                JOHANN <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">
                  EMMANUEL
                </span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-sm sm:text-lg text-zinc-400 max-w-2xl leading-relaxed"
              >
                Born April 11, 2006 in Chennai, India; started motorsport at age six; only Indian rider trained across top European and Asian championships.
              </motion.p>

              {/* Highlight strip */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap gap-3 sm:gap-4 text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-red-500 border-t border-zinc-900 pt-4 sm:pt-6"
              >
                
              </motion.div>

              {/* Buttons */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-3 sm:pt-4"
              >
                <motion.div
                  whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                  className="w-full sm:w-auto"
                >
                  <Link href="/results" className="px-6 sm:px-8 py-3 sm:py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition transform hover:scale-105 text-center shadow-lg shadow-red-600/25 cursor-pointer block text-[10px] sm:text-xs tracking-widest uppercase">
                    Career Results
                  </Link>
                </motion.div>

                <motion.div
                  whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                  className="w-full sm:w-auto"
                >
                  <Link href="/about#contact" className="px-6 sm:px-8 py-3 sm:py-4 border border-zinc-800 hover:border-white text-white font-bold rounded-xl bg-zinc-950/50 hover:bg-white hover:text-black transition transform hover:scale-105 text-center cursor-pointer block text-[10px] sm:text-xs tracking-widest uppercase">
                    CONTACT
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Right Image Column */}
            <div
              className="lg:col-span-5 relative"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={tiltStyle}
            >
              {/* Outer glow overlay */}
              <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-red-600 to-orange-500 opacity-25 blur-lg transition duration-500" />

              <div className="relative overflow-hidden rounded-3xl border border-zinc-900 bg-zinc-950 aspect-square sm:aspect-[4/3] shadow-2xl select-none">
                <Image
                  src="/hero-racer.jpg"
                  alt="Asia Road Racing Championship Winner celebrating victory"
                  width={600}
                  height={450}
                  priority
                  className="w-full h-full object-cover"
                />

                {/* 3D Glare effect overlay */}
                <div
                  className="absolute inset-0 pointer-events-none z-20 mix-blend-screen transition-opacity duration-300"
                  style={glareStyle}
                />

                {/* Subtle border shine effect */}
                <div className="absolute inset-0 rounded-3xl border border-white/5 pointer-events-none z-10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Champions Section */}
      <section id="champions" className="py-16 sm:py-24 bg-black border-t border-zinc-900 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative">
          <div className="mb-8 sm:mb-12 text-center">
            <span className="text-red-500 text-[10px] sm:text-xs tracking-[0.3em] uppercase font-bold">LEGACY OF SPEED</span>
            <Shuffle
              text="2025 Champions"
              tag="h2"
              className="text-2xl sm:text-4xl font-black mt-2 text-white"
              textAlign="center"
              duration={0.4}
            />
          </div>

          <div className="relative group/slider px-2 sm:px-4 md:px-12">
            {/* Slider Track Container */}
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-out gap-4 sm:gap-6"
                style={{
                  transform: `translate3d(calc(-${sliderIndex} * (100% + ${visibleCards > 1 ? '24px' : '16px'}) / ${visibleCards}), 0, 0)`
                }}
              >
{champions.map((champion) => (
  <div
    key={champion.class}
    className="flex-shrink-0 max-w-[95vw]"
    style={{
      height: "clamp(260px, 50vw, 500px)",
      width: `calc((100% - ${visibleCards > 1 ? '24px' : '16px'} * (${visibleCards} - 1)) / ${visibleCards})`
    }}
  >
    <PixelTransition
      firstContent={
        <Image
          src={champion.image}
          alt={champion.name}
          fill
          className="object-cover"
          priority={false}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      }
      secondContent={
        <div className="flex flex-col justify-between h-full p-3 sm:p-4 md:p-6 bg-zinc-950">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.35em] text-red-200">Telemetry</p>
            <h3 className="mt-2 sm:mt-3 text-xl sm:text-2xl font-black uppercase tracking-tight text-white">{champion.name}</h3>
            <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-zinc-200">{champion.country} • {champion.team}</p>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm">
            <div className="rounded-2xl border border-white/10 bg-black/20 px-2 sm:px-3 py-2 sm:py-3">
              <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-300">Wins</p>
              <p className="mt-1 text-lg sm:text-xl font-black text-white">{champion.stats.wins}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 px-2 sm:px-3 py-2 sm:py-3">
              <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-300">Podiums</p>
              <p className="mt-1 text-lg sm:text-xl font-black text-white">{champion.stats.podiums}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 px-2 sm:px-3 py-2 sm:py-3 col-span-2">
              <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-300">Best Lap</p>
              <p className="mt-1 text-lg sm:text-xl font-black text-white">{champion.stats.lap}</p>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/20 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-zinc-200">
            <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-400">Role</span>
            <p className="mt-1 font-semibold">{champion.stats.role}</p>
          </div>
        </div>
      }
      gridSize={8}
      pixelColor="#ffffff"
      animationStepDuration={shouldReduceMotion ? 0 : 0.4}
      once={false}
      style={{ width: '100%', height: '100%' }}
      reducedMotion={shouldReduceMotion}
    />
  </div>
))}
              </div>
            </div>

            {/* Slider Controls */}
            {champions.length > visibleCards && (
              <>
                <motion.button
                  onClick={handlePrev}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-30 bg-black/60 hover:bg-black/95 text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center border border-zinc-800 focus:outline-none cursor-pointer"
                  aria-label="Previous card"
                  whileHover={shouldReduceMotion ? {} : { scale: 1.15, backgroundColor: "#000000" }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.92 }}
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                  </svg>
                </motion.button>
                <motion.button
                  onClick={handleNext}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-30 bg-black/60 hover:bg-black/95 text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center border border-zinc-800 focus:outline-none cursor-pointer"
                  aria-label="Next card"
                  whileHover={shouldReduceMotion ? {} : { scale: 1.15, backgroundColor: "#000000" }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.92 }}
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-16 sm:py-24 bg-black border-t border-zinc-900 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16 space-y-2">
            <p className="text-red-500 text-[10px] sm:text-xs tracking-[0.3em] font-bold uppercase">THE CATEGORIES</p>
            <Shuffle
              text="WHERE ASIANS DREAM."
              tag="h2"
              className="text-2xl sm:text-4xl md:text-5xl font-black text-white leading-tight"
              textAlign="center"
              duration={0.4}
            />
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 max-w-6xl mx-auto min-h-[320px] sm:min-h-[420px]">
            {/* Left Column: Category Description Details */}
            <div className="w-full lg:w-5/12 space-y-4 sm:space-y-6 flex flex-col justify-center text-left min-h-[200px] sm:min-h-[250px] lg:pr-8">
              <div className="inline-flex items-center gap-3">
                <span className="text-[10px] sm:text-xs bg-red-600/10 text-red-500 font-black px-2 py-1 sm:px-3 sm:py-1.5 rounded-full border border-red-500/20 uppercase tracking-widest">
                  Active Class
                </span>
                <span className="text-zinc-500 text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                  0{categoriesData[activeCategory].id} / 0{categoriesData.length}
                </span>
              </div>

              {/* Animating the active name */}
              <div className="h-[50px] sm:h-[60px] overflow-hidden flex items-center">
                <Shuffle
                  key={`cat-name-${activeCategory}`}
                  text={categoriesData[activeCategory].name}
                  tag="h3"
                  className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tighter"
                  duration={0.35}
                />
              </div>

              {/* Description box with subtle top red accent border */}
              <div className="border-l-2 border-red-600 pl-4 sm:pl-6 py-2 min-h-[80px] sm:min-h-[100px] flex items-center">
                <p className="text-zinc-400 text-sm sm:text-base leading-relaxed font-medium">
                  {categoriesData[activeCategory].desc}
                </p>
              </div>

              {/* Telemetry info for interest */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-3 sm:pt-4 border-t border-zinc-900">
                <div>
                  <span className="text-[10px] text-zinc-500 font-extrabold uppercase tracking-widest block">CHAMPIONSHIP</span>
                  <span className="text-xs sm:text-sm text-zinc-300 font-bold block mt-1">{categoriesData[activeCategory].championship}</span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 font-extrabold uppercase tracking-widest block">SEASON</span>
                  <span className="text-xs sm:text-sm text-zinc-300 font-bold block mt-1">{categoriesData[activeCategory].years}</span>
                </div>
              </div>
            </div>

            {/* Right Column: CardSwap */}
            <div className="w-full lg:w-7/12 flex justify-center items-center overflow-visible py-4 sm:py-6">
              <div style={{ height: cardSwapHeight + 80, position: 'relative', width: '100%', maxWidth: cardSwapWidth + 100 }}>
                <CardSwap
                  width={cardSwapWidth}
                  height={cardSwapHeight}
                  cardDistance={40}
                  verticalDistance={50}
                  delay={4000}
                  pauseOnHover={false}
                  onCardClick={() => {}}
                  skewAmount={4}
                  easing="elastic"
                >
                  {categoriesData.map((cat) => (
                    <Card key={cat.name} className="overflow-hidden rounded-2xl border border-zinc-900 bg-zinc-950">
                      <div className="relative w-full h-full">
                        <Image
                          src={cat.image}
                          alt={cat.name}
                          fill
                          className="object-cover"
                          priority={false}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 md:p-6 flex flex-col gap-1 sm:gap-2">
                          <span className="text-[10px] text-red-500 font-black uppercase tracking-[0.3em]">
                            {cat.championship}
                          </span>
                          <h3 className="text-lg sm:text-xl md:text-2xl font-black text-white uppercase tracking-tight leading-none">
                            {cat.name}
                          </h3>
                          <p className="text-[10px] sm:text-xs text-zinc-300 leading-relaxed line-clamp-2">
                            {cat.desc}
                          </p>
                          <div className="flex items-center gap-3 pt-1 sm:pt-2">
                            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                              Season {cat.years}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </CardSwap>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Season Schedule Section */}
      <SeasonSchedule
        title="2026 Calendar"
        subtitle="Season Schedule"
        categories={scheduleCategories}
        defaultCategory="rounds"
      />

      {/* Latest Updates Section (ChromaGrid) */}
      <section id="updates" className="py-16 sm:py-24 bg-gradient-to-b from-zinc-950 to-black text-white border-t border-zinc-900 overflow-hidden relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="mb-8 sm:mb-12 text-center space-y-2">
            <span className="text-red-600 text-[10px] sm:text-xs tracking-[0.3em] font-bold uppercase">LATEST STORIES</span>
            <Shuffle
              text="Latest Updates"
              tag="h2"
              className="text-2xl sm:text-3xl md:text-4xl font-black mt-2 text-white"
              textAlign="center"
              duration={0.4}
            />
          </div>
        </div>

        <div style={{ minHeight: "500px sm:min-height-[600px]", position: "relative" }}>
          <ChromaGrid
            items={newsItems}
            radius={300}
            damping={0.45}
            fadeOut={0.6}
            ease="power3.out"
          />
        </div>
      </section>

      {/* Bottom Navigation Hero Section */}
      <section
        className="relative py-20 sm:py-28 lg:py-36 bg-cover bg-center border-t border-zinc-900 overflow-hidden"
        style={{ backgroundImage: "url('/IMG_8541.JPG')" }}
      >
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/80 z-0" />

        {/* Ambient colored glows */}
        <div className="absolute top-0 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10 text-center">
          <span className="text-red-500 text-[10px] sm:text-xs md:text-sm tracking-[0.3em] font-extrabold uppercase drop-shadow-md">
            EXPERIENCE THE RACING LEGACY
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white mt-3 sm:mt-4 tracking-tighter uppercase drop-shadow-lg leading-none">
            <Shuffle text="BEYOND THE" tag="span" className="block text-white" textAlign="center" duration={0.4} />
            <Shuffle text="FINISH LINE" tag="span" className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400" textAlign="center" duration={0.4} />
          </h2>
          <p className="text-zinc-300 text-sm sm:text-base mt-4 sm:mt-6 max-w-2xl mx-auto leading-relaxed drop-shadow">
            Feel the raw adrenaline of the Asia Road Racing Championship. Access the latest paddock media highlights, stay up to date with official stories, and review season standings.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-8 sm:mt-10">
            <motion.div
              whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
              className="w-full sm:w-auto"
            >
                <a
                  href="/gallery"
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-red-600 hover:bg-red-700 text-white font-extrabold rounded-xl transition duration-300 transform hover:scale-105 active:scale-95 shadow-lg shadow-red-600/20 text-center block text-[10px] sm:text-xs tracking-widest uppercase"
                >
                  EXPLORE GALLERY
                </a>
              </motion.div>

              <motion.div
                whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                className="w-full sm:w-auto"
              >
                <a
                  href="/updates"
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-zinc-900 hover:bg-zinc-800 text-white font-extrabold rounded-xl transition duration-300 transform hover:scale-105 active:scale-95 border border-zinc-800 text-center block text-[10px] sm:text-xs tracking-widest uppercase"
                >
                  LATEST UPDATES
                </a>
              </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}