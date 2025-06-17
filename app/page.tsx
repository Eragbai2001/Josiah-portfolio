"use client";

import Header from "@/components/header";
import Image from "next/image";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import Sidebar from "@/components/Sidebar";
import SmoothFollower from "@/components/SmoothFollower";
import Projects from "@/components/Projects";

export default function HomePage() {
  const ref = useRef(null);
  const mainControls = useAnimation();
  const slideControls = useAnimation();

  const IsInView = useInView(ref, { once: true });

  useEffect(() => {
    if (IsInView) {
      mainControls.start("visible");
      slideControls.start("visible"); // Add this line to trigger the slide animation
    }
  }, [IsInView, mainControls, slideControls]);
  return (
    <>
      <SmoothFollower />
      <div ref={ref} className="min-h-screen flex bg  ">
        {/* Left Section: Header + Content */}
        <div className="w-[60%] max-md:w-[100%] bg-white flex flex-col px-10 py-6 relative">
          <Sidebar />
          {/* Top: Header */}

          <Header />

          {/* Responsive Image - Visible only on smaller screens (≤1259px) */}
          <div className="relative w-72 h-72 sm:h-96 md:hidden pt-8">
            <Image
              src="/Matric pic.jpg"
              alt="Portfolio"
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
          {/* Main Content */}

          <div className="flex-grow flex flex-col justify-between">
            {/* Large Title Text */}
            <div className=" mt-5 lg:mt-20 relative">
              <div className="font-mono">
                {/* First line - "Hey, I'm Josiah" */}
                <div className="relative mb-2 overflow-hidden w-32 md:w-40 ">
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    initial="hidden"
                    animate={mainControls}
                    transition={{ duration: 0.5, delay: 0.25 }}>
                    <p className="text-sm md:text-base text-gray-700">
                      Hey, I'm Josiah
                    </p>
                  </motion.div>
                  <motion.div
                    variants={{
                      hidden: { left: 0 },
                      visible: { left: "100%" },
                    }}
                    initial="hidden "
                    animate={slideControls}
                    transition={{
                      duration: 0.8,
                      ease: "easeInOut",
                      delay: 0.1,
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

                {/* Second line - "Full Stack" */}
                <div className="relative mb-1 overflow-hidden w-72 md:w-96 ">
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    initial="hidden"
                    animate={mainControls}
                    transition={{ duration: 0.5, delay: 0.35 }}>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-[#00FF9B]">
                      Full Stack
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

                {/* Third line - "Web Developer" */}
                <div className="relative overflow-hidden w-80 md:w-[35rem] ">
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    initial="hidden"
                    animate={mainControls}
                    transition={{ duration: 0.5, delay: 0.45 }}>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-800">
                      Web Developer
                      <span className="animate-pulse text-gray-800">_</span>
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

                {/* Fourth line - Description */}
                <div className="relative mt-6 overflow-hidden w-64 md:w-96 lg:w-[32rem] xl:w-[40rem]">
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    initial="hidden"
                    animate={mainControls}
                    transition={{ duration: 0.5, delay: 0.55 }}>
                    <p className="text-sm md:text-base text-gray-600">
                      I specialize in Node.js, React, Next.js, and TypeScript,
                      and I enjoy solving tricky problems with creative
                      solutions. I’m passionate about turning ideas into
                      functional and engaging web applications.
                    </p>
                  </motion.div>
                  <motion.div
                    variants={{
                      hidden: { left: 0 },
                      visible: { left: "100%" },
                    }}
                    initial="hidden"
                    animate={slideControls}
                    transition={{
                      duration: 1.4,
                      ease: "easeInOut",
                      delay: 0.7,
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
            </div>

            {/* Bottom content */}

            <div className="mb-12">
              {/* Large name at bottom right */}

              {/* Down arrow indicator */}
              <div className="absolute bottom-0 lg:bottom-10 left-10">
                <div className="w-12 h-12 text-gray-800 animate-bounce">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 4L12 20M12 20L6 14M12 20L18 14"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section: Fullscreen Image */}
        <div className=" hidden md:block w-[40%] relative ">
          <Image
            src="/Matric pic.jpg"
            alt="Portfolio"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
      </div>
      <Projects />
    </>
  );
}
