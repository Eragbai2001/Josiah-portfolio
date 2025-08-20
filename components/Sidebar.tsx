"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState("About");

  const navItems = [
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 75 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.5, delay: 0.25 }}
      className="fixed left-0 top-0 bottom-0 w-16 bg-black text-white flex flex-col items-center py-6 max-md:hidden z-50">
      {/* Logo */}
      <Link href="/" className=" mb-14">
        <div className="text-2xl font-bold text-[#00FF9B]">J.</div>
      </Link>

      {/* Nav Items - Rotated text */}
      <div className="flex flex-col  justify-center ">
        {navItems.map((item, index) => (
          <Link
            key={item.name}
            href={item.href}
            className={`vertical-text cursor-pointer text-xs tracking-widest transition-colors duration-200 mb-6 ${
              activeItem === item.name
                ? "text-[#00FF9B]"
                : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setActiveItem(item.name)}>
            {item.name.toUpperCase()}
          </Link>
        ))}
      </div>
    </motion.div>
  );
}
