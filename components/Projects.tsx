"use client";

import {
  useAnimation,
  useInView,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import Card from "./Cards";
import MoreInfo from "./MoreInfo";
import { MessageCircle, Star, Users } from "lucide-react";

const cards = [
  {
    id: 1,
    icon: <MessageCircle className="w-8 h-8 text-white" />,
    title: "Exceptional Development",
    description:
      "Josiah delivered our Mobile app ahead of schedule with outstanding quality and attention to detail.",
    author: "Aideloje Joshua",
    role: "Product Manager",
  },
  {
    id: 2,
    icon: <Users className="w-8 h-8 text-white" />,
    title: "Team Collaboration",
    description:
      "Professional communication and seamless integration with our development team throughout the project.",
    author: "Mike Johnson",
    role: "CTO",
  },
  {
    id: 3,
    icon: <Star className="w-8 h-8 text-white" />,
    title: "Outstanding Results",
    description:
      "Exceeded expectations with clean code, modern architecture, and comprehensive documentation.",
    author: "Lisa Wang",
    role: "Tech Lead",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// MOBILE / TABLET  (< 1024px)  — clean vertical layout, no scroll tricks
// ─────────────────────────────────────────────────────────────────────────────
function MobileProjects() {
  return (
    <section className="bg-[#f5f4f0] py-20 px-5 sm:px-8">

      {/* Section header */}
      <div className="mb-12 max-w-xl">
        <p className="text-[10px] font-mono tracking-[0.25em] text-gray-400 uppercase mb-3">What clients say</p>
        <h2 className="text-4xl sm:text-5xl font-black text-gray-900 leading-[0.95] tracking-tight">
          Check out<br />
          <span className="text-[#00FF9B]">my reviews.</span>
        </h2>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl">
        {cards.map((card, i) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className={`bg-black rounded-2xl p-7 flex flex-col gap-5 ${
              i === 2 ? "sm:col-span-2" : ""
            }`}
          >
            <div className="text-[#00FF9B]">{card.icon}</div>
            <div>
              <h3 className="text-white font-bold text-lg leading-snug mb-2">{card.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{card.description}</p>
            </div>
            <div className="mt-auto pt-4 border-t border-white/[0.07]">
              <p className="text-white text-sm font-semibold">{card.author}</p>
              <p className="text-gray-600 text-xs font-mono tracking-wide">{card.role}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* MoreInfo section */}
      <div className="mt-16">
        <MoreInfo />
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DESKTOP  (≥ 1024px)  — original horizontal scroll with zoom transition
// ─────────────────────────────────────────────────────────────────────────────
function DesktopProjects() {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const mainControls = useAnimation();
  const slideControls = useAnimation();
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [screenSize, setScreenSize] = useState("xl");

  const isInView = useInView(ref, { amount: 0.3 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 1280) setScreenSize("lg");
      else if (w < 1560) setScreenSize("xl");
      else if (w < 1900) setScreenSize("2xl");
      else if (w < 1948) setScreenSize("3xl");
      else setScreenSize("4xl");
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const getTransformValues = () => {
    switch (screenSize) {
      case "lg":  return { inputRange: [0.3, 0.65], outputRange: ["0%", "-74.7%"] };
      case "xl":  return { inputRange: [0.3, 0.65], outputRange: ["0%", "-77%"] };
      case "2xl": return { inputRange: [0.3, 0.65], outputRange: ["0%", "-74.9%"] };
      case "3xl": return { inputRange: [0.3, 0.65], outputRange: ["0%", "-70.0%"] };
      case "4xl": return { inputRange: [0.3, 0.65], outputRange: ["0%", "-62.3%"] };
      default:    return { inputRange: [0.3, 0.65], outputRange: ["0%", "-74.7%"] };
    }
  };

  const { inputRange, outputRange } = getTransformValues();
  const x = useTransform(scrollYProgress, inputRange, outputRange);
  const finalScale = useTransform(scrollYProgress, [0.65, 0.8], [1, 4]);
  const lastCardOpacity = useTransform(scrollYProgress, [0.7, 0.9, 1], [1, 1, 0.8]);
  const textOpacity = useTransform(scrollYProgress, [0.65, 0.8], [1, 0]);
  const overlayOpacity = useTransform(scrollYProgress, [0.75, 0.9], [0, 1]);
  const transitionTextOpacity = useTransform(scrollYProgress, [0.8, 0.9], [0, 1]);

  useEffect(() => {
    const unsub = finalScale.on("change", (v) => {
      if (v >= 3.8) setShowMoreInfo(true);
      else if (v < 3.2) setShowMoreInfo(false);
    });
    return () => unsub();
  }, [finalScale]);

  useEffect(() => {
    if (showMoreInfo) {
      document.documentElement.classList.add("hide-scroll");
      document.body.classList.add("hide-scroll");
    } else {
      document.documentElement.classList.remove("hide-scroll");
      document.body.classList.remove("hide-scroll");
    }
    return () => {
      document.documentElement.classList.remove("hide-scroll");
      document.body.classList.remove("hide-scroll");
    };
  }, [showMoreInfo]);

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
      slideControls.start("visible");
    } else {
      mainControls.start("hidden");
      slideControls.start("hidden");
    }
  }, [isInView, mainControls, slideControls]);

  return (
    <>
      <section ref={containerRef} className="h-[400vh]">
        <div
          ref={ref}
          className="sticky top-0 overflow-hidden px-10"
        >
          <div className="flex h-screen justify-between items-center">

            {/* Left — title */}
            <div className="left-10 top-1/2 -translate-y-1/2">
              {/* "Check out" */}
              <div className="relative mb-1 overflow-hidden w-80 xl:w-96">
                <motion.div
                  variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                  initial="hidden" animate={mainControls}
                  transition={{ duration: 0.5, delay: 0.35 }}>
                  <h1 className="text-5xl xl:text-6xl font-black leading-tight tracking-tight text-[#00FF9B]">
                    Check out
                  </h1>
                </motion.div>
                <motion.div
                  variants={{ hidden: { left: 0 }, visible: { left: "100%" } }}
                  initial="hidden" animate={slideControls}
                  transition={{ duration: 1.0, ease: "easeInOut", delay: 0.3 }}
                  style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0, backgroundColor: "#00FF9B", zIndex: 20 }}
                />
              </div>

              {/* "My client reviews" */}
              <div className="relative overflow-hidden w-[32rem] xl:w-[38rem]">
                <motion.div
                  variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                  initial="hidden" animate={mainControls}
                  transition={{ duration: 0.5, delay: 0.45 }}>
                  <h1 className="text-5xl xl:text-6xl font-black leading-tight tracking-tight text-gray-900">
                    My client reviews
                  </h1>
                </motion.div>
                <motion.div
                  variants={{ hidden: { left: 0 }, visible: { left: "100%" } }}
                  initial="hidden" animate={slideControls}
                  transition={{ duration: 1.2, ease: "easeInOut", delay: 0.5 }}
                  style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0, backgroundColor: "#00FF9B", zIndex: 20 }}
                />
              </div>
            </div>

            {/* Right — scrolling cards */}
            <div className="inset-0 flex items-center justify-center">
              <motion.div className="flex gap-8" style={{ x, paddingLeft: "10vw" }}>
                {cards.map((card, index) => {
                  const isLastCard = index === cards.length - 1;
                  return (
                    <motion.div
                      key={card.id}
                      className="flex-shrink-0"
                      style={{
                        ...(isLastCard && {
                          scale: finalScale,
                          opacity: lastCardOpacity,
                          zIndex: 20,
                          transformOrigin: "center center",
                        }),
                      }}>
                      <Card {...card} textOpacity={isLastCard ? textOpacity : undefined} />
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </div>

          {showMoreInfo && (
            <div>
              <MoreInfo />
            </div>
          )}
        </div>
      </section>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ROOT — switches between layouts based on screen width
// ─────────────────────────────────────────────────────────────────────────────
const Projects = () => {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Avoid hydration mismatch — render nothing until mounted
  if (isDesktop === null) return null;

  return isDesktop ? <DesktopProjects /> : <MobileProjects />;
};

export default Projects;