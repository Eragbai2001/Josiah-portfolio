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

const Projects = () => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const mainControls = useAnimation();
  const slideControls = useAnimation();
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [screenSize, setScreenSize] = useState("lg");

  const isInView = useInView(ref, { amount: 0.3 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const totalCards = 3;
  const cardWidth = 450;
  const gapWidth = 32;
  const totalWidth = totalCards * cardWidth + (totalCards - 1) * gapWidth;

  useEffect(() => {
    const updateScreenSize = () => {
      if (window.innerWidth < 640) setScreenSize("sm");
      else if (window.innerWidth < 768) setScreenSize("md");
      else if (window.innerWidth < 1024) setScreenSize("lg");
      else if (window.innerWidth < 1280) setScreenSize("xl");
      else if (window.innerWidth < 1536) setScreenSize("2xl");
      else if (window.innerWidth > 1536) setScreenSize("3xl");
      else setScreenSize("3xl");
    };

    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  // Different transforms based on screen size
  const getTransformValues = () => {
    switch (screenSize) {
      case "sm":
        return { inputRange: [0.3, 0.65], outputRange: ["0%", "-80%"] }; // Mobile - more movement
      case "md":
        return { inputRange: [0.3, 0.65], outputRange: ["0%", "-78%"] }; // Tablet
      case "lg":
        return { inputRange: [0.3, 0.65], outputRange: ["0%", "-74.7%"] }; // Desktop - your current value
      case "xl":
        return { inputRange: [0.3, 0.65], outputRange: ["0%", "-77%"] };
      case "2xl":
        return { inputRange: [0.3, 0.65], outputRange: ["0%", "-75.5%"] };
      case "3xl":
        return { inputRange: [0.3, 0.65], outputRange: ["0%", "-74.5%"] }; // Large desktop - less movement
      default:
        return { inputRange: [0.3, 0.65], outputRange: ["0%", "-69.7%"] };
    }
  };

  const { inputRange, outputRange } = getTransformValues();
  const x = useTransform(scrollYProgress, inputRange, outputRange);

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
      icon: <MessageCircle className="w-8 h-8 text-white" />,
      title: "Exceptional Development",
      description:
        "Josiah delivered our React Native app ahead of schedule with outstanding quality and attention to detail.",
      author: "Sarah Chen",
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

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <section
        ref={containerRef}
        className={isSmallScreen ? "min-h-screen" : "h-[400vh]"}>
        <div
          ref={ref}
          className={`
          ${isSmallScreen ? "relative" : "sticky top-0"} 
          
          ${isSmallScreen ? "overflow-auto" : "overflow-hidden"} 
          px-4 sm:px-6 md:px-8 lg:px-10
        `}>
          {/* Mobile Layout - Simple Vertical */}
          {isSmallScreen ? (
            <div className="py-8 space-y-8">
              {/* Title Section */}
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4 max-w-[12ch] mx-auto">
                  Check out my client reviews
                </h2>
              </div>

              {/* Cards Section - Simple Vertical Stack */}
              <div className="space-y-6 max-w-md mx-auto">
                {cards.map((card) => (
                  <div key={card.id} className="w-full">
                    <div className="bg-black p-8 rounded-2xl">
                      <div className="space-y-6">
                        {/* Icon */}
                        <div className="text-white">{card.icon}</div>

                        {/* Content */}
                        <div className="space-y-4">
                          <h3 className="text-xl font-semibold text-white leading-tight">
                            {card.title}
                          </h3>
                          <p className="text-gray-400 text-sm leading-relaxed">
                            {card.description}
                          </p>
                        </div>

                        {/* Author */}
                        <div className="pt-4 border-t border-gray-800">
                          <p className="text-white font-medium text-sm">
                            {card.author}
                          </p>
                          <p className="text-gray-500 text-xs">{card.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <MoreInfo />
            </div>
          ) : (
            /* Desktop Layout - Keep existing animations */
            <div className="flex h-screen justify-between items-center">
              {/* Left side - Fixed title */}
              <div className="left-10 top-1/2 -translate-y-1/2">
                <div className="relative mb-1 overflow-hidden w-48 sm:w-56 md:w-72 lg:w-80 xl:w-96">
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    initial="hidden"
                    animate={mainControls}
                    transition={{ duration: 0.5, delay: 0.35 }}>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-[#00FF9B]">
                      Check out
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

                <div className="relative overflow-hidden w-56 sm:w-64 md:w-80 lg:w-[28rem] xl:w-[35rem]">
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    initial="hidden"
                    animate={mainControls}
                    transition={{ duration: 0.5, delay: 0.45 }}>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-gray-800">
                      My client reviews
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
              <div className="inset-0 flex items-center justify-center">
                <motion.div
                  className="flex gap-8"
                  style={{
                    x,
                    paddingLeft: "10vw",
                  }}>
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
            </div>
          )}

          {/* MoreInfo only shows on desktop */}
          {!isSmallScreen && showMoreInfo && (
            <div>
              <MoreInfo />
            </div>
          )}
        </div>
      </section>

      {/* Mobile MoreInfo - Separate section that comes after Projects */}
    </>
  );
};

export default Projects;
