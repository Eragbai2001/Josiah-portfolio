import {
  useAnimation,
  useInView,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import Card from "./Card";

import MoreInfo from "./MoreInfo";

const Projects = () => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const mainControls = useAnimation();
  const slideControls = useAnimation();
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  const isInView = useInView(ref, { amount: 0.3 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const totalCards = 3;
  const cardWidth = 450;
  const gapWidth = 32;
  const totalWidth = totalCards * cardWidth + (totalCards - 1) * gapWidth;

  const x = useTransform(scrollYProgress, [0.3, 0.65], ["0%", "-41%"]);

  const finalScale = useTransform(scrollYProgress, [0.65, 0.8], [1, 4]);
  const lastCardOpacity = useTransform(
    scrollYProgress,
    [0.7, 0.9, 1],
    [1, 1, 0.8]
  );

  // Text dimming for the last card
  const textOpacity = useTransform(scrollYProgress, [0.65, 0.8], [1, 0]);

  // Dark overlay transition
  const overlayOpacity = useTransform(scrollYProgress, [0.75, 0.9], [0, 1]);
  const overlayScale = useTransform(scrollYProgress, [0.75, 1.0], [0.8, 1.2]);

  // Move this useTransform outside JSX - THIS WAS THE PROBLEM!
  const transitionTextOpacity = useTransform(
    scrollYProgress,
    [0.8, 0.9],
    [0, 1]
  );
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

  // UPDATED: Monitor finalScale and make it reversible
  useEffect(() => {
    const unsubscribe = finalScale.on("change", (latest) => {
      // Show MoreInfo when scale reaches 80% of max (forward scroll)
      if (latest >= 3.8) {
        setShowMoreInfo(true);
      }
      // Hide MoreInfo when scale goes below 80% (backward scroll)
      else if (latest < 3.2) {
        setShowMoreInfo(false);
      }
    });

    return () => unsubscribe();
  }, [finalScale]);

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
      slideControls.start("visible");
    } else {
      mainControls.start("hidden");
      slideControls.start("hidden");
    }
  }, [isInView, mainControls, slideControls]);

  const cards = [
    {
      id: 1,
      title: "Unitest CBT",
      image: "/image.png",
      gif: "/api/placeholder/450/550",
      description:
        "A computer-based testing platform designed to help students prepare effectively for examinations through recent past questions and AI for generating tests from course notes.",
    },
    {
      id: 2,
      title: "Project Two",
      image: "/api/placeholder/450/550",
      gif: "/api/placeholder/450/550",
      description: "This is a description for project two.",
    },
    {
      id: 3,
      title: "Project Three",
      image: "/api/placeholder/450/550",
      gif: "/api/placeholder/450/550",
      description: "This is a description for project three.",
    },
  ];

  return (
    <section ref={containerRef} className="h-[400vh] relative">
      <div ref={ref} className="sticky top-0 h-screen overflow-hidden px-10">
        {/* Left side - Fixed title */}
        <div className="absolute left-10 top-1/2 -translate-y-1/2 z-10">
          <div className="relative mb-1 overflow-hidden w-72 md:w-96">
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              initial="hidden"
              animate={mainControls}
              transition={{ duration: 0.5, delay: 0.35 }}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-[#00FF9B]">
                Project I
              </h1>
            </motion.div>
            <motion.div
              variants={{
                hidden: { left: 0 },
                visible: { left: "100%" },
              }}
              initial="hidden"
              animate={slideControls}
              transition={{
                duration: 1.0,
                ease: "easeInOut",
                delay: 0.3,
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

          <div className="relative overflow-hidden w-80 md:w-[35rem]">
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              initial="hidden"
              animate={mainControls}
              transition={{ duration: 0.5, delay: 0.45 }}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-800">
                have worked on
              </h1>
            </motion.div>
            <motion.div
              variants={{
                hidden: { left: 0 },
                visible: { left: "100%" },
              }}
              initial="hidden"
              animate={slideControls}
              transition={{
                duration: 1.2,
                ease: "easeInOut",
                delay: 0.5,
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
        </div>
        {/* Right side - Scrolling cards */}
        <div className="absolute inset-0 flex items-center justify-center z-10 overflow-hidden">
          <motion.div className="flex gap-8" style={{ x, paddingLeft: "60vw" }}>
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
                  <Card
                    {...card}
                    textOpacity={isLastCard ? textOpacity : undefined}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Dark overlay transition - CONDITIONAL RENDERING ADDED */}
        {showMoreInfo && (
          <div
            className="fixed inset-0  flex items-center justify-center bg-black h-screen  "
            >
            <MoreInfo />
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
