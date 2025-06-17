"use client";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

export const FramerMagnet = ({ 
  children, 
  hoverColor = "#00FF9B",  // Default hover color matching the logo
  magnetStrength = 1.5     // Control the magnetic pull strength
}: { 
  children: React.ReactNode; 
  hoverColor?: string;
  magnetStrength?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  
  const mouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    if (!ref.current) return;
    
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    // Calculate distance from center and multiply by strength factor
    const x = (clientX - (left + width / 2)) * magnetStrength;
    const y = (clientY - (top + height / 2)) * magnetStrength;
    
    setPosition({ x, y });
  };

  const mouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const mouseEnter = () => {
    setIsHovered(true);
  };
  
  const { x, y } = position;
  
  return (
    <motion.div 
      onMouseMove={mouseMove} 
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave} 
      ref={ref} 
      animate={{ 
        x, 
        y,
        color: isHovered ? hoverColor : "inherit",
        scale: isHovered ? 1.1 : 1,
      }}
      transition={{
        type: "spring", // Fixed the typo from "string" to "spring"
        stiffness: 150,  
        damping: 15, 
        mass: 0.1
      }}
      whileHover={{
        textShadow: `0 0 8px ${hoverColor}`
      }}
    >
      {children}
    </motion.div>
  );
};