"use client";

import { useEffect, useRef, useState } from "react";
import { Star, ExternalLink, Github } from "lucide-react";
import { Button } from "./ui/button";
import { MotionValue, motion } from "framer-motion";

interface CardProps {
  id: number;
  title: string;
  image: string;
  gif: string;
  description: string;
  textOpacity?: MotionValue<number>;
}

export default function Card({
  title,
  image,
  gif,
  description,
  textOpacity,
}: CardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle video play/pause with debouncing
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (isHovered) {
      timeoutRef.current = setTimeout(() => {
        video.currentTime = 0;
        video.play().catch((error) => {
          console.log("Video play failed:", error);
        });
      }, 50);
    } else {
      video.pause();
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isHovered]);

  // Preload video when component mounts
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [gif]);

  return (
    <div
      className="w-[450px] h-[550px] bg-black border-0 rounded-3xl overflow-hidden group cursor-pointer transition-all duration-500 hover:scale-[1.03] relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      {/* Background Image */}

    

      <motion.div
        className="relative z-10 p-10 h-full flex flex-col"
        style={{
          opacity: textOpacity || 1, // Apply text dimming if provided
        }}>
        {/* Project Icon with glow */}
        <div className="mb-8 relative">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110"
            style={{
              backgroundColor: isHovered ? "#00FF9B" : "rgba(255,255,255,0.1)",
              boxShadow: isHovered ? "0 0 20px rgba(0, 255, 155, 0.5)" : "none",
            }}>
            <div
              className="w-6 h-6 rounded transition-all duration-500"
              style={{
                backgroundColor: isHovered ? "#000" : "rgba(255,255,255,0.8)",
              }}
            />
          </div>
        </div>

        {/* Project Title with animated underline */}
        <div className="mb-6 relative">
          <h3 className="text-3xl font-bold text-white group-hover:text-white transition-colors duration-300">
            {title}
          </h3>
          <div
            className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r transition-all duration-500"
            style={{
              background: `linear-gradient(90deg, #00FF9B, transparent)`,
              width: isHovered ? "100%" : "0%",
            }}
          />
        </div>

        {/* Project Stats */}

        {/* Project Description */}
        <p className="text-gray-400 text-base leading-relaxed mb-auto">
          {description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-8">
          {["React", "Node.js", "AI/ML"].map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs font-medium rounded-full border transition-all duration-300 hover:scale-105"
              style={{
                borderColor: isHovered ? "#00FF9B" : "rgba(255,255,255,0.2)",
                color: isHovered ? "#00FF9B" : "#9CA3AF",
                backgroundColor: isHovered
                  ? "rgba(0, 255, 155, 0.1)"
                  : "transparent",
              }}>
              {tech}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-8">
          <Button
            className="flex-1 bg-white text-black hover:bg-gray-100 border-0 rounded-xl font-medium transition-all duration-300 cursor-pointer"
            size="lg">
            View Project
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
          <button className="border border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white rounded-xl transition-all duration-300 hover:scale-105 px-4 py-3">
            <Github className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
      {/* Enhanced accent line with animation */}
    </div>
  );
}
