"use client";

import Header from "@/components/header";
import Image from "next/image";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import SmoothFollower from "@/components/SmoothFollower";
import Projects from "@/components/Projects";
import StatsBar from "@/components/StatsBar";

const ThreeHero = dynamic(() => import("@/components/HeroScene"), {
  ssr: false,
});

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Josiah Aideloje",
  url: "https://josiah-portfolio1.vercel.app",
  jobTitle: "Full-Stack Web Developer",
  description:
    "Full-stack web developer based in Nigeria, specialising in Next.js, React, and Node.js.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lagos",
    addressCountry: "NG",
  },
  email: "josiahaideloje2@gmail.com",
  telephone: "+2347042135699",
  sameAs: [
    "https://github.com/Eragbai2001",
    "https://www.linkedin.com/in/yourusername",
    "https://x.com/JAideloje47355",
  ],
  knowsAbout: [
    "Web Development",
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "Full-Stack Development",
  ],
};

const pills = ["18 y/o", "First Class", "400+ Users", "Landmark Uni"];

export default function HomePage() {
  const ref = useRef(null);
  const mainControls = useAnimation();
  const slideControls = useAnimation();
  const [mounted, setMounted] = useState(false);
  const IsInView = useInView(ref, { once: true });

  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    if (IsInView) {
      mainControls.start("visible");
      slideControls.start("visible");
    }
  }, [IsInView, mainControls, slideControls]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Subtle grain texture */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[999] opacity-[0.022]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
      />

      <div className="main-scroll-container">
        {/* ══════════ HERO ══════════ */}
        <div
          ref={ref}
          className="min-h-screen flex main-snap-section relative overflow-hidden bg-[#f5f4f0]">
          {/* ── LEFT: Text content ── */}
          <div className="w-[58%] max-md:w-full flex flex-col px-10 py-6 relative z-10 bg-[#f5f4f0]">
            <Header />

            {/* Mobile photo */}
            <div className="relative w-full max-w-[280px] h-[300px] md:hidden mx-auto mt-6 mb-8 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/Matric pic.jpg"
                alt="Josiah Aideloje"
                fill
                style={{ objectFit: "cover" }}
                priority
                className="grayscale"
              />
            </div>

            <div className="flex-grow flex flex-col justify-between">
              <div className="mt-6 lg:mt-20">
                <div className="space-y-2">
                  <div className="min-w-max w-[11rem] mx-0">
                    <RevealLine
                      delay={0.1}
                      slideDelay={0.05}
                      slideControls={slideControls}
                      mainControls={mainControls}>
                      <p className="text-xs tracking-[0.22em] uppercase text-gray-400 font-mono mb-1">
                        Hey, I&apos;m Josiah
                      </p>
                    </RevealLine>
                  </div>
                  <div className="min-w-max w-[16rem] mx-0">
                    <RevealLine
                      delay={0.28}
                      slideDelay={0.18}
                      slideControls={slideControls}
                      mainControls={mainControls}>
                      <h1 className="text-[clamp(3rem,6.5vw,5.8rem)] font-black leading-[0.9] tracking-[-0.04em] text-[#00FF9B]">
                        Full Stack
                      </h1>
                    </RevealLine>
                  </div>
                  <div className="min-w-max w-[22rem] mx-0">
                    <RevealLine
                      delay={0.42}
                      slideDelay={0.32}
                      slideControls={slideControls}
                      mainControls={mainControls}>
                      <h1 className="text-[clamp(3rem,6.5vw,5.8rem)] font-black leading-[0.9] tracking-[-0.04em] text-gray-900">
                        Web Dev<span className="animate-pulse">_</span>
                      </h1>
                    </RevealLine>
                  </div>
                  {/* Thin divider */}
                  <motion.div
                    initial={{ scaleX: 0, originX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{
                      duration: 1.1,
                      delay: 0.95,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="h-px bg-gray-200 mt-7 mb-6 max-w-[34rem]"
                  />
                  <div className="min-w-max w-[28rem] mx-0">
                    <RevealLine
                      delay={0.56}
                      slideDelay={0.48}
                      slideControls={slideControls}
                      mainControls={mainControls}>
                      <p className="text-[0.95rem] sm:text-base leading-relaxed text-gray-500 max-w-[36rem]">
                        I build fast, polished web apps with Next.js, React,
                        Node.js &amp; TypeScript — turning ideas into real
                        products people love to use.
                      </p>
                    </RevealLine>
                  </div>
                </div>
                {/* Pills */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.3 }}
                  className="flex flex-wrap gap-2 mt-6">
                  {pills.map((pill) => (
                    <span
                      key={pill}
                      className="text-[10px] font-mono tracking-widest bg-white text-gray-400 px-3 py-1.5 rounded-full border border-gray-200 shadow-sm uppercase">
                      {pill}
                    </span>
                  ))}
                </motion.div>
                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.55 }}
                  className="flex gap-3 mt-8 flex-wrap">
                  <a
                    href="#projects"
                    className="bg-gray-900 text-white px-6 py-3 rounded-full text-sm font-bold tracking-wide hover:bg-[#00FF9B] hover:text-black transition-all duration-300 shadow-sm">
                    View Projects →
                  </a>
                  <a
                    href="/Josiah cv.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-500 px-6 py-3 rounded-full text-sm font-bold tracking-wide border border-gray-300 hover:border-gray-900 hover:text-gray-900 transition-all duration-300">
                    Download CV
                  </a>
                </motion.div>
              </div>

              {/* Scroll arrow */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2 }}
                className="mb-14 relative">
                <div className="absolute bottom-0 left-0 w-8 h-8 text-gray-300 animate-bounce">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 4L12 20M12 20L6 14M12 20L18 14"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </motion.div>
            </div>
          </div>

          {/* ── RIGHT: Photo ONLY (clean, no 3D overlay) ── */}
          <div className="hidden md:flex w-[42%] relative z-10 overflow-hidden flex-col">
            {/* Bottom half — real photo, clean */}
            <div className="relative flex-1 overflow-hidden">
              <Image
                src="/Matric pic.jpg"
                alt="Josiah Aideloje"
                fill
                style={{ objectFit: "cover", objectPosition: "top center" }}
                priority
              />
              {/* Top fade to blend with dark section above */}
              <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#080808] to-transparent z-10" />
              {/* Name tag bottom-right */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2 }}
                className="absolute bottom-6 right-6 z-20 text-right">
                <p className="text-[9px] text-white/50 font-mono tracking-[0.2em] uppercase drop-shadow-md">
                  Josiah Aideloje
                </p>
                <p className="text-[9px] text-[#00FF9B]/60 font-mono tracking-[0.15em] drop-shadow-md">
                  Full Stack Dev
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* ── STATS BAR ── */}
        <StatsBar />

        {/* ── PROJECTS ── */}
        <Projects />
      </div>
    </>
  );
}

function RevealLine({
  children,
  delay,
  slideDelay,
  slideControls,
  mainControls,
}: {
  children: React.ReactNode;
  delay: number;
  slideDelay: number;
  slideControls: ReturnType<typeof useAnimation>;
  mainControls: ReturnType<typeof useAnimation>;
}) {
  return (
    <div className="relative overflow-hidden">
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.55, delay }}>
        {children}
      </motion.div>
      <motion.div
        variants={{ hidden: { left: 0 }, visible: { left: "100%" } }}
        initial="hidden"
        animate={slideControls}
        transition={{
          duration: 0.85,
          ease: [0.76, 0, 0.24, 1],
          delay: slideDelay,
        }}
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "#00FF9B",
          zIndex: 20,
        }}
      />
    </div>
  );
}
