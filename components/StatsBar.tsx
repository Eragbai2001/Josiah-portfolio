"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  { value: "18", label: "Years Old" },
  { value: "1st", label: "Class Grade" },
  { value: "400+", label: "Coursify Users" },
  { value: "5", label: "Live Projects" },
  { value: "300L", label: "Landmark University" },
];

export default function StatsBar() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <section
      ref={ref}
      className="bg-black py-8 px-4 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-0 divide-x divide-gray-800">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center px-6 sm:px-10 py-2"
            >
              <span className="text-3xl sm:text-4xl font-black text-[#00FF9B] tracking-tight leading-none">
                {stat.value}
              </span>
              <span className="text-xs sm:text-sm text-gray-400 mt-1 whitespace-nowrap tracking-widest uppercase">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scrolling ticker below stats */}
      <div className="mt-6 overflow-hidden border-t border-gray-800 pt-4">
        <motion.div
          className="flex gap-12 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-12 items-center shrink-0">
              {[
                "React", "Next.js", "TypeScript", "Node.js",
                "Tailwind CSS", "Framer Motion", "MongoDB",
                "Three.js", "Full Stack", "Open to Work ✦"
              ].map((item, j) => (
                <span key={j} className="text-xs text-gray-600 tracking-widest uppercase font-medium">
                  {item}
                </span>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}