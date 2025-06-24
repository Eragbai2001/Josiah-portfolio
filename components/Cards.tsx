"use client";

import { useEffect, useRef, useState } from "react";
import { Star, ExternalLink, Github } from "lucide-react";
import { Card } from "./ui/card";
import { MotionValue, motion } from "framer-motion";

interface CardProps {
  id: number;
  title: string;
  description: string;
  textOpacity?: MotionValue<number>;
  role: string;
  author: string;
  icon: React.ReactNode;
}

export default function Cards({
  title,
  description,
  textOpacity,
  author,
  role,
  icon,
}: CardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  return (
    <Card
      className="
        w-[320px] sm:w-[380px] md:w-[420px] lg:w-[450px]
        h-[480px] sm:h-[520px] md:h-[540px] lg:h-[550px]
        bg-black border-0 
        rounded-2xl md:rounded-3xl 
        overflow-hidden group cursor-pointer 
        transition-all duration-300 
        hover:scale-[1.02] md:hover:scale-[1.02]
        mx-auto
      "
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <div className="flex flex-col h-full p-6 sm:p-8 md:p-10 lg:p-12">
        {/* Icon */}
        <motion.div
          className="mb-8 sm:mb-12 md:mb-16 lg:mb-20"
          style={{ opacity: textOpacity || 1 }}>
          <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white">
            {icon}
          </div>
        </motion.div>

        {/* Title */}
        <motion.h3
          className="
            text-white font-semibold mb-4 sm:mb-5 md:mb-6 leading-tight
            text-2xl sm:text-3xl md:text-3xl lg:text-4xl
          "
          style={{ opacity: textOpacity || 1 }}>
          {title}
        </motion.h3>

        {/* Description */}
        <motion.p
          className="
            text-gray-400 leading-relaxed mb-auto
            text-sm sm:text-base md:text-base lg:text-base
            line-clamp-4 sm:line-clamp-none
          "
          style={{ opacity: textOpacity || 1 }}>
          {description}
        </motion.p>

        {/* Author */}
        <motion.div
          className="
            mt-6 sm:mt-7 md:mt-8 
            pt-4 sm:pt-5 md:pt-6 
            border-t border-gray-800
          "
          style={{ opacity: textOpacity || 1 }}>
          <p
            className="
            text-white font-medium
            text-base sm:text-lg md:text-lg lg:text-lg
          ">
            {author}
          </p>
          <p
            className="
            text-gray-500 
            text-xs sm:text-sm md:text-sm lg:text-sm
          ">
            {role}
          </p>
        </motion.div>
      </div>
    </Card>
  );
}
