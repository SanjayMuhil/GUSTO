"use client";

import { useState, useEffect, useRef } from "react";
import Header from "../../components/Header";
import Shuffle from "../../components/Shuffle";
import Image from "next/image";
import { motion, useReducedMotion, useInView } from "framer-motion";
import CircularGallery from "../../components/CircularGallery";
import Footer from "../../components/Footer";

// High-performance count-up stat counter
function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      if (start === end) return;

      const duration = 2; // seconds
      const totalMiliseconds = duration * 1000;
      const stepTime = Math.abs(Math.floor(totalMiliseconds / end));

      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) {
          clearInterval(timer);
        }
      }, Math.max(stepTime, 16));

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="font-black text-5xl sm:text-7xl text-white tracking-tighter block">
      {count}
      {suffix}
    </span>
  );
}

// 3D Parallax/Tilt Image Frame
function TiltImage({ src, alt }: { src: string; alt: string }) {
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});
  const shouldReduceMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = x / rect.width - 0.5;
    const yc = y / rect.height - 0.5;

    // Tilt angle up to 10 degrees
    const rotateY = xc * 12;
    const rotateX = -yc * 12;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: "transform 0.1s ease-out",
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      transition: "transform 0.5s ease-out",
    });
  };

  return (
    <div className="relative w-full group">
      {/* Dynamic ambient backglow */}
      <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-red-600 to-orange-500 opacity-20 blur-xl group-hover:opacity-30 transition duration-500 pointer-events-none" />

      <div
        className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 aspect-[4/3] w-full cursor-grab active:cursor-grabbing select-none"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={tiltStyle}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Subtle grid pattern overlay for racing vibe */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:16px_16px]" />
        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />
      </div>
    </div>
  );
}

// 3D floating animation wrapper for hero scene
function FloatingDecorations() {
  const shouldReduceMotion = useReducedMotion();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {mounted && !shouldReduceMotion && (
        <>
          {/* Parallax ambient red glow */}
          <div
            className="absolute top-1/4 left-1/3 w-96 h-96 bg-red-600/10 rounded-full blur-[100px]"
            style={{ transform: `translate3d(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px, 0)` }}
          />
          <div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-600/5 rounded-full blur-[120px]"
            style={{ transform: `translate3d(${-mousePos.x * 0.8}px, ${-mousePos.y * 0.8}px, 0)` }}
          />

          {/* Floating 3D-like carbon rings */}
          <div
            className="absolute top-[15%] right-[10%] w-72 h-72 rounded-full border border-red-500/10 border-t-red-500/30 animate-[spin_40s_linear_infinite]"
            style={{ transform: `translate3d(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px, 0) rotateX(45deg)` }}
          />
          <div
            className="absolute bottom-[20%] left-[5%] w-60 h-60 rounded-full border border-zinc-800 border-b-zinc-700/50 animate-[spin_25s_linear_infinite]"
            style={{ transform: `translate3d(${-mousePos.x * 0.4}px, ${-mousePos.y * 0.4}px, 0) rotateY(30deg)` }}
          />
        </>
      )}
    </div>
  );
}

export default function AboutPage() {
  const shouldReduceMotion = useReducedMotion();

  // Scroll animations variants
  const fadeInVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 80, damping: 15 }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-red-600 selection:text-white overflow-x-hidden">
      <Header />

      {/* 1. Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-b from-zinc-950 via-zinc-950 to-black py-20 lg:py-28 overflow-hidden border-b border-zinc-900">
        <FloatingDecorations />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center">
          {/* Left Column - Interactive Helmet Image */}
          <motion.div
            className="lg:col-span-5 relative flex justify-center items-center order-2 lg:order-1"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
                <div className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px] lg:max-w-[420px] aspect-square flex items-center justify-center">
                {/* Neon Red Target Circle backdrop */}
                <div className="absolute inset-0 rounded-full border border-red-500/10 scale-95" />
                <div className="absolute inset-4 rounded-full border border-dashed border-red-500/5 scale-90 animate-[spin_50s_linear_infinite]" />

                {/* 3D Floating/Swinging Helmet Image */}
                <motion.div
                  className="relative w-full h-full z-10 cursor-grab active:cursor-grabbing"
                  animate={shouldReduceMotion ? {} : {
                    y: [0, -12, 0],
                    rotateY: [-5, 5, -5]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Image
                    src="/joh.png"
                    alt="Johann Emmanuel 3D Helmet"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-contain drop-shadow-[0_20px_50px_rgba(220,38,38,0.25)] select-none pointer-events-none"
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Right Content Column */}
            <motion.div
              className="lg:col-span-7 space-y-4 sm:space-y-6 md:space-y-8 order-1 lg:order-2"
              initial="hidden"
              animate="visible"
              variants={fadeInVariants}
              suppressHydrationWarning
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/5 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-red-500">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                About Johann
              </div>

              <div className="space-y-3">
                <span className="text-zinc-500 font-extrabold text-sm sm:text-base tracking-[0.25em] uppercase block">OFFICIAL PROGRAMME</span>
                <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter uppercase leading-none">
                  JOHANN <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">
                    EMMANUEL
                  </span>
                </h1>
              </div>

              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-xl">
                Join a legacy of high-performance speed. Witness the journey of India's premier racing talent as he campaigns across the European and Asian championships.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 pt-3 sm:pt-4">
                <a
                  href="#contact"
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-red-600 hover:bg-red-700 text-white font-extrabold rounded-xl transition duration-300 transform hover:scale-105 active:scale-95 shadow-lg shadow-red-600/25 text-center text-[10px] sm:text-xs tracking-widest uppercase cursor-pointer"
                >
                  Get In Touch
                </a>
                <a
                  href="#profile"
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-extrabold rounded-xl transition duration-300 transform hover:scale-105 active:scale-95 border border-zinc-800 text-center text-[10px] sm:text-xs tracking-widest uppercase cursor-pointer"
                >
                  Read Proposal
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Profile Section */}
      <section id="profile" className="py-20 sm:py-28 bg-zinc-950 border-b border-zinc-900 relative">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column - Text */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8 order-2 lg:order-1">
              <div className="space-y-3">
                <span className="text-red-500 text-xs sm:text-sm tracking-[0.3em] font-extrabold uppercase block">RIDER PROFILE</span>
                <h2 className="text-4xl sm:text-5xl font-black tracking-tighter text-white uppercase leading-none">
                  <Shuffle text="THE CHAMPION'S" tag="span" className="block text-white" textAlign="left" duration={0.4} />
                  <Shuffle text="FOUNDATION" tag="span" className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400" textAlign="left" duration={0.4} />
                </h2>
              </div>

              <div className="space-y-4 text-zinc-400 leading-relaxed text-sm sm:text-base">
                <p>
                  Born <strong className="text-white">April 11, 2006</strong>, in Chennai, India. Johann's affinity for motorsport was ignited at the age of six, raised in the fast-paced atmosphere of trackside paddocks.
                </p>
                <p>
                  His passion was nurtured by his father, <strong className="text-white">Mr. Emmanuel Jebaraj</strong>, a multiple-time Indian national champion, laying the blueprint for technical discipline and racing IQ.
                </p>
                <p>
                  Today, Johann represents a rare breed of Indian racers competing on the demanding circuits of Europe and Asia. His path is built on consistency, year-round physical training, and a focus on podium results.
                </p>
              </div>

              {/* Quick Details Grid */}
              <div className="grid grid-cols-2 gap-4 border-t border-zinc-900 pt-6">
                <div>
                  <span className="text-[10px] text-zinc-600 uppercase tracking-widest font-black block">HOMETOWN</span>
                  <span className="text-white font-extrabold text-sm sm:text-base uppercase mt-1 block">Chennai, India</span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-600 uppercase tracking-widest font-black block">AGE</span>
                  <span className="text-white font-extrabold text-sm sm:text-base uppercase mt-1 block">19 Years</span>
                </div>
              </div>
            </div>

            {/* Right Column - Image */}
            <div className="lg:col-span-5 order-1 lg:order-2">
              <TiltImage src="/save.jpg" alt="Johann Emmanuel Portrait" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Career Overview Section */}
      <section className="py-20 sm:py-28 bg-black border-b border-zinc-900">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column - Image */}
            <div className="lg:col-span-5 order-1">
              <TiltImage src="/IMG_8541.JPG" alt="Johann Emmanuel Action Racetrack" />
            </div>

            {/* Right Column - Text */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8 order-2">
              <div className="space-y-3">
                <span className="text-red-500 text-xs sm:text-sm tracking-[0.3em] font-extrabold uppercase block">CAREER PATH</span>
                <h2 className="text-4xl sm:text-5xl font-black tracking-tighter text-white uppercase leading-none">
                  <Shuffle text="BUILDING TO" tag="span" className="block text-white" textAlign="left" duration={0.4} />
                  <Shuffle text="THE WORLD STAGE" tag="span" className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400" textAlign="left" duration={0.4} />
                </h2>
              </div>

              <div className="space-y-4 text-zinc-400 leading-relaxed text-sm sm:text-base">
                <p>
                  Johann entered competitive motorsport in <strong className="text-white">2019 at age 13</strong>. His debut race ended with a fractured left humerus, a test of resolve that only deepened his commitment.
                </p>
                <p>
                  Returning in 2020, he secured a <strong className="text-white">podium finish</strong> in the first race he completed. By 2022, his progress earned him a promotion to the highly competitive NSF250R category.
                </p>
                <p>
                  Between 2023 and 2024, he competed in the prestigious <strong className="text-white">European Talent Cup</strong>, standing out as the only Indian rider on the grid. In 2024, he secured a remarkable 4th place in wet weather at Estoril, Portugal, alongside selection for the Thailand Talent Cup.
                </p>
                <p>
                  His breakout moment arrived in late 2024 with a clean sweep debut hat-trick at the <strong className="text-white">Qatar Superbike Championship (Lusail)</strong>, winning all three races in the SSP300 category. In 2025, supported by Honda Racing India, he advanced to the Asia Road Racing Championship (ARRC) AP250 class.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Achievements Section */}
      <section className="py-20 sm:py-28 bg-zinc-950 border-b border-zinc-900 overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16 space-y-2">
            <span className="text-red-500 text-xs tracking-[0.3em] font-bold uppercase">RECORDS & ACCOLADES</span>
            <Shuffle
              text="Key Milestones"
              tag="h2"
              className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight"
              textAlign="center"
              duration={0.4}
            />
          </div>

          <div className="relative w-full h-[550px] overflow-hidden select-none">
            <CircularGallery
              items={[
                { image: "/1.JPG", text: "2026 KTM CUP CHAMPION" },
                { image: "/2.jpeg", text: "2025 QATAR 600CC CHAMPION" },
                { image: "/3.jpeg", text: "LUSAIL SSP300 RECORD HOLDER" },
                { image: "/4.jpeg", text: "QATAR DEBUT SWEEP WINNER" },
                { image: "/5.jpeg", text: "EUROPE TALENT CUP TOP 10" }
              ]}
              bend={3}
              textColor="#ffffff"
              borderRadius={0.05}
              scrollEase={0.03}
              font="bold 24px Figtree"
            />
          </div>
        </div>
      </section>

      {/* 5. Career Highlights Timeline */}
      <section className="py-16 sm:py-20 md:py-28 bg-black border-b border-zinc-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="text-center mb-10 sm:mb-16 space-y-2">
            <span className="text-red-500 text-[10px] sm:text-xs tracking-[0.3em] font-bold uppercase">HISTORICAL TRACK</span>
            <Shuffle
              text="Timeline"
              tag="h2"
              className="text-2xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight"
              textAlign="center"
              duration={0.4}
            />
          </div>

          <div className="relative border-l border-zinc-900 ml-3 sm:ml-4 md:ml-32 space-y-10 sm:space-y-12">
            {[
              { year: "2021", event: "—" },
              { year: "2022", event: "Honda India Talent Cup (CBR150)" },
              { year: "2023", event: "Honda India Talent Cup (NSF250R), European Talent Cup" },
              { year: "2024", event: "Thailand Talent Cup, European Talent Cup" },
              { year: "2025", event: "ARRC AP250, Qatar STK-600, Indian Superstock" },
              { year: "2026", event: "(see 2026 Programme section)" }
            ].map((item, idx) => (
              <div key={idx} className="relative pl-6 sm:pl-8 md:pl-12 group">
                {/* Timeline node */}
                <div className="absolute left-[-5px] top-1 sm:top-1.5 w-[8px] h-[8px] sm:w-[9px] sm:h-[9px] rounded-full bg-zinc-900 group-hover:bg-red-500 border border-zinc-800 transition-colors duration-300" />

                {/* Timeline Year left block */}
                <div className="absolute left-[-12px] sm:left-[-16px] md:left-[-120px] top-0 text-red-600 font-black text-xs sm:text-sm md:text-lg tracking-wider">
                  {item.year}
                </div>

                <div className="bg-zinc-950/40 border border-zinc-900 rounded-2xl p-4 sm:p-6 hover:border-zinc-800 transition-colors">
                  <p className="text-zinc-300 font-extrabold text-xs sm:text-sm md:text-base leading-snug">{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. 2026 Racing Programme */}
      <section className="py-20 sm:py-28 bg-zinc-950 border-b border-zinc-900">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left text column */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-red-500 text-xs sm:text-sm tracking-[0.3em] font-extrabold uppercase block">2026 CAMPAIGN</span>
              <h2 className="text-4xl sm:text-5xl font-black tracking-tighter text-white uppercase leading-none">
                <Shuffle text="RACING" tag="span" className="block text-white" textAlign="left" duration={0.4} />
                <Shuffle text="PROGRAMME" tag="span" className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400" textAlign="left" duration={0.4} />
              </h2>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                The 2026 calendar targets elite competitiveness across key international and regional grids, designed to build track time and prepare for the ultimate championship progression.
              </p>
              <div className="border-t border-zinc-900 pt-6">
                <span className="text-xs text-zinc-500 tracking-wider font-extrabold uppercase">LONG-TERM TARGET</span>
                <span className="text-white font-black text-lg block mt-1 uppercase">Full-time World Championship by 2028</span>
              </div>
            </div>

            {/* Right lists column */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "Yamaha R7 Cup", subtitle: "European Superbike Championship Support" },
                { title: "JuniorGP (600cc)", subtitle: "Junior World Championship Series" },
                { title: "Qatar Supersport 600", subtitle: "Defending Regional Title" },
                { title: "Indian National Championship", subtitle: "National Superstock 600 Title Campaign" },
                { title: "ARRC 600cc Rounds", subtitle: "Selected Asia Road Racing Championship wildcard entry" }
              ].map((prog, idx) => (
                <div key={idx} className="border border-zinc-900 bg-zinc-900/10 p-6 rounded-2xl flex flex-col justify-center">
                  <h3 className="text-lg font-black text-white tracking-tight uppercase">{prog.title}</h3>
                  <p className="text-zinc-500 text-xs sm:text-sm mt-1">{prog.subtitle}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. Media Coverage & Viewership */}
      <section className="py-24 sm:py-32 bg-black border-b border-zinc-900 relative overflow-hidden">
        {/* Decorative Grid Lines backdrop */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

        <div className="container mx-auto px-4 max-w-5xl relative z-10 text-center space-y-12">
          <div className="space-y-3">
            <span className="text-red-500 text-xs sm:text-sm tracking-[0.3em] font-extrabold uppercase block">GLOBAL VIEWERSHIP</span>
            <Shuffle
              text="Media & Broadcast Coverage"
              tag="h2"
              className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight"
              textAlign="center"
              duration={0.4}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-zinc-950/60 border border-zinc-900 rounded-3xl p-8 hover:border-zinc-800 transition-colors">
              <Counter value={22} suffix="+" />
              <span className="text-zinc-500 text-xs sm:text-sm font-extrabold uppercase tracking-widest block mt-3">Race Weekends</span>
            </div>
            <div className="bg-zinc-950/60 border border-zinc-900 rounded-3xl p-8 hover:border-zinc-800 transition-colors">
              <Counter value={27} />
              <span className="text-zinc-500 text-xs sm:text-sm font-extrabold uppercase tracking-widest block mt-3">Countries Broadcasted</span>
            </div>
            <div className="bg-zinc-950/60 border border-zinc-900 rounded-3xl p-8 hover:border-zinc-800 transition-colors">
              <Counter value={30} suffix="+" />
              <span className="text-zinc-500 text-xs sm:text-sm font-extrabold uppercase tracking-widest block mt-3">Broadcasting Channels</span>
            </div>
          </div>

          <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed pt-4">
            In addition to international TV channels, all races are streamed live globally on official YouTube motorsport networks, securing active viewer reach across mobile audiences.
          </p>
        </div>
      </section>

      {/* 8. Why Johann? */}
      <section className="py-20 sm:py-28 bg-zinc-950 border-b border-zinc-900">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16 space-y-2">
            <span className="text-red-500 text-xs tracking-[0.3em] font-bold uppercase">THE ADVANTAGE</span>
            <Shuffle
              text="Why Johann?"
              tag="h2"
              className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight"
              textAlign="center"
              duration={0.4}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              { title: "Spain-Based Training", desc: "Based in Spain since 2023, training year-round in high-performance environments alongside Moto3/Moto2 stars." },
              { title: "Proven Track Record", desc: "Winner of the Qatar Supersport 600 Championship and competitive runs in the highly technical Asia Road Racing grids." },
              { title: "Elite Co-Training", desc: "Trains alongside World Championship GP riders, ensuring constant technical adaptation and mental sharpness." },
              { title: "Structured Roadmap", desc: "Clear step-by-step career path moving from Junior GP towards a target World Championship seat by 2028." }
            ].map((adv, i) => (
              <div key={i} className="border border-zinc-900 bg-zinc-900/10 p-8 rounded-2xl hover:border-zinc-800 transition-all">
                <span className="text-red-500 font-extrabold text-sm uppercase block tracking-wider">{adv.title}</span>
                <p className="text-zinc-400 text-sm sm:text-base mt-3 leading-relaxed">{adv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Brand Partners */}
      <section className="py-20 sm:py-28 bg-black border-b border-zinc-900">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16 space-y-2">
            <span className="text-red-500 text-xs tracking-[0.3em] font-bold uppercase">CURRENT SPONSORS</span>
            <Shuffle
              text="Sponsors"
              tag="h2"
              className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight"
              textAlign="center"
              duration={0.4}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
            {[
              { name: "KYT Helmets", info: "Designed/developed in Italy, manufactured in Indonesia (PT Tara Citra Kusuma)" },
              { name: "Honda Racing India", info: "Motorsports participation, developing next-gen Indian riders" },
              { name: "Sidvin Energy", info: "Czech-based, oil & gas / petrochemical / process industries" },
              { name: "4SR Moto Suits", info: "Engineering & design for international competition riding gear" },
              { name: "Voyage Eyewear", info: "Venture of SS Enterprises — stylish, functional sunglasses" }
            ].map((brand, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center p-4 sm:p-6 border border-zinc-900 bg-zinc-950/80 rounded-2xl text-center min-h-[100px] sm:min-h-[120px] hover:border-zinc-800 transition duration-300 select-none"
              >
                <span className="font-black text-lg tracking-wider text-white uppercase block">{brand.name}</span>
                <span className="text-[10px] text-zinc-500 font-semibold tracking-wide mt-1 sm:mt-2 block text-[10px] sm:text-xs">{brand.info}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Return on Investment / Brand Value */}
      <section className="py-20 sm:py-28 bg-zinc-950 border-b border-zinc-900">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16 space-y-2">
            <span className="text-red-500 text-xs tracking-[0.3em] font-bold uppercase">COMMERCIAL REACH</span>
            <Shuffle
              text="ROI & Brand Value"
              tag="h2"
              className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight"
              textAlign="center"
              duration={0.4}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
            {[
              { cat: "Brand Visibility", details: ["Racing bike decals", "Rider leathers & helmet", "Grid bottles & gear bags", "Paddock apparel branding"] },
              { cat: "Personal Endorsements", details: ["Video testimonials", "Social media partnerships", "Joint PR releases", "Advertorial integrations"] },
              { cat: "Community Engagement", details: ["Safety awareness programs", "Community message amplification", "Influencing target customer purchasing"] },
              { cat: "Event Participation", details: ["Dealer launches & exhibits", "Corporate guest interactions", "Product demonstration activations"] },
              { cat: "Media Exposure", details: ["Global live broadcast audiences", "Paddock press conferences", "Racetrack podcaster reviews", "Magazine features"] },
              { cat: "Social Media Reach", details: ["Instagram: 9.4K followers", "Annual reach of 9 Million users", "Active link referral conversions"] }
            ].map((val, idx) => (
              <div key={idx} className="border border-zinc-900 bg-zinc-900/10 p-8 rounded-2xl">
                <span className="text-white font-extrabold text-lg uppercase block tracking-tight pb-3 border-b border-zinc-900">{val.cat}</span>
                <ul className="mt-4 space-y-2 text-zinc-400 text-xs sm:text-sm">
                  {val.details.map((det, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      <span>{det}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. ROI Summary */}
      <section className="py-20 sm:py-28 bg-black border-b border-zinc-900">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16 space-y-2">
            <span className="text-red-500 text-xs tracking-[0.3em] font-bold uppercase">BUSINESS OBJECTIVES</span>
            <Shuffle
              text="Value Structure"
              tag="h2"
              className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight"
              textAlign="center"
              duration={0.4}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {/* Column 1 */}
            <div className="space-y-3 sm:space-y-4">
              <div className="h-1 bg-red-600 w-10 sm:w-12" />
              <h3 className="text-xl sm:text-2xl font-black uppercase text-white tracking-tight">Providing Value</h3>
              <ul className="space-y-3 text-zinc-400 text-sm sm:text-base">
                <li>• Exclusivity in category</li>
                <li>• On-site signage & branding</li>
                <li>• Rights to license logo & property content</li>
                <li>• Presence in digital, social & mobile media</li>
                <li>• Access to audience & fanbase</li>
                <li>• Tickets & hospitality</li>
                <li>• Right to promote co-branded products/services</li>
                <li>• Access to Johann's IP materials & mailing list</li>
              </ul>
            </div>

            {/* Column 2 */}
            <div className="space-y-4">
              <div className="h-1 bg-orange-500 w-12" />
              <h3 className="text-2xl font-black uppercase text-white tracking-tight">Reaching Objectives</h3>
              <ul className="space-y-3 text-zinc-400 text-sm sm:text-base">
                <li>• Create brand awareness & visibility</li>
                <li>• Increase brand loyalty</li>
                <li>• Showcase community & social responsibility</li>
                <li>• Change / reinforce brand image</li>
                <li>• Entertain clients & prospects</li>
                <li>• Access experiential branding platform</li>
                <li>• Obtain content for digital, social & other media</li>
                <li>• Capture database / lead generation</li>
                <li>• Stimulate sales, trial & usage</li>
              </ul>
            </div>

            {/* Column 3 */}
            <div className="space-y-4">
              <div className="h-1 bg-zinc-700 w-12" />
              <h3 className="text-2xl font-black uppercase text-white tracking-tight">Brand Impact</h3>
              <ul className="space-y-3 text-zinc-400 text-sm sm:text-base">
                <li>• Social media amplification</li>
                <li>• On-site interactions</li>
                <li>• PR & press coverage</li>
                <li>• Internal communications</li>
                <li>• Hospitality activations</li>
                <li>• Digital & mobile promotions</li>
                <li>• Traditional advertising (magazines)</li>
                <li>• B2B networking</li>
                <li>• Sales promotion offers</li>
                <li>• Direct marketing</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 12. Get In Touch */}
      <section id="contact" className="py-24 sm:py-32 bg-zinc-950 relative overflow-hidden">
        {/* Glow corner backgrounds */}
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <div className="text-center mb-12 space-y-2">
            <span className="text-red-500 text-xs sm:text-sm tracking-[0.3em] font-extrabold uppercase block">CONNECT WITH US</span>
            <Shuffle
              text="Get In Touch"
              tag="h2"
              className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tighter leading-none"
              textAlign="center"
              duration={0.4}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start">
            {/* Contact Details Column */}
            <div className="md:col-span-5 space-y-4 sm:space-y-6">
              <div className="p-6 bg-zinc-900/40 border border-zinc-900 rounded-2xl">
                <span className="text-zinc-500 text-[10px] tracking-widest font-black uppercase block">EMAIL</span>
                <a href="mailto:johannemmanuel.partnerships@gmail.com" className="text-white hover:text-red-500 font-extrabold text-sm sm:text-base mt-1 block break-all">
                  johannemmanuel.partnerships@gmail.com
                </a>
              </div>

              <div className="p-6 bg-zinc-900/40 border border-zinc-900 rounded-2xl">
                <span className="text-zinc-500 text-[10px] tracking-widest font-black uppercase block">PHONE</span>
                <a href="tel:+919840911406" className="text-white hover:text-red-500 font-extrabold text-sm sm:text-base mt-1 block">
                  +91 9840911406
                </a>
              </div>

              <div className="p-6 bg-zinc-900/40 border border-zinc-900 rounded-2xl">
                <span className="text-zinc-500 text-[10px] tracking-widest font-black uppercase block">INSTAGRAM</span>
                <a href="https://instagram.com/johann_emmanuel11" target="_blank" rel="noreferrer" className="text-white hover:text-red-500 font-extrabold text-sm sm:text-base mt-1 block">
                  @johann_emmanuel11
                </a>
              </div>
            </div>

            {/* Simple Contact Form Column */}
            <div className="md:col-span-7 bg-zinc-900/20 border border-zinc-900 rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 space-y-3 sm:space-y-4">
              <div>
                <label className="text-[10px] text-zinc-500 font-extrabold tracking-wider uppercase block mb-1">Company / Brand Name</label>
                <input
                  type="text"
                  placeholder="e.g. Red Bull Racing"
                  className="w-full bg-zinc-950 border border-zinc-900 focus:border-red-500 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-white placeholder-zinc-700 outline-none transition"
                  suppressHydrationWarning
                />
              </div>

              <div>
                <label className="text-[10px] text-zinc-500 font-extrabold tracking-wider uppercase block mb-1">Contact Person</label>
                <input
                  type="text"
                  placeholder="e.g. John Doe"
                  className="w-full bg-zinc-950 border border-zinc-900 focus:border-red-500 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-white placeholder-zinc-700 outline-none transition"
                  suppressHydrationWarning
                />
              </div>

              <div>
                <label className="text-[10px] text-zinc-500 font-extrabold tracking-wider uppercase block mb-1">Sponsorship Interest / Message</label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your campaign goals..."
                  className="w-full bg-zinc-950 border border-zinc-900 focus:border-red-500 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-white placeholder-zinc-700 outline-none transition resize-none"
                  suppressHydrationWarning
                />
              </div>

              <button
                type="button"
                onClick={() => alert("Thank you for your interest! We will get in touch with you shortly.")}
                className="w-full py-3 sm:py-4 bg-red-600 hover:bg-red-700 text-white font-extrabold rounded-xl transition duration-300 text-[10px] sm:text-xs tracking-widest uppercase cursor-pointer"
              >
                Send Proposal Inquiry
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
