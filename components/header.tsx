"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Linkedin,
  Github,
  Instagram,
  Twitter,
  FileText,
  X,
} from "lucide-react";
import { FramerMagnet } from "@/components/FramerMagnet";
import { RiTwitterXFill } from "react-icons/ri";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="relative w-full bg-white ">
      <div className=" flex items-center justify-between sticky top-0 z-10 ">
        {/* Left - Social Media Icons */}
        <div className="max-lg:hidden lg:flex items-center space-x-4">
          <FramerMagnet>
            <Link
              href="https://linkedin.com/in/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 hover:bg-[#0A66C2] hover:text-white transition-colors p-2 block rounded-md"
              aria-label="LinkedIn">
              <Linkedin size={18} />
            </Link>
          </FramerMagnet>
          <FramerMagnet>
            <Link
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 hover:bg-[#24292e] hover:text-white transition-colors p-2 block rounded-md"
              aria-label="GitHub">
              <Github size={18} />
            </Link>
          </FramerMagnet>

          <FramerMagnet>
            <Link
              href="https://twitter.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 hover:bg-black hover:text-white transition-colors p-2 block rounded-md"
              aria-label="X (Twitter)">
              <RiTwitterXFill size={18} />
            </Link>
          </FramerMagnet>
        </div>

        {/* Right - Resume Button */}
        <Link
          href="/Resume.pdf" // Update with your actual resume path
          target="_blank"
          rel="noopener noreferrer"
          className="max-lg:hidden lg:flex items-center space-x-2 bg-black hover:bg-gray-700 text-white px-4 py-2 rounded-md transition-colors">
          <span className="text-sm font-medium">My resume</span>
        </Link>

        {/* Mobile menu button */}
        <button
          className="lg:hidden p-2 rounded-lg hover:bg-gray-200 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu">
          <div className="w-6 h-6 flex flex-col justify-center space-y-1.5">
            <div
              className={`w-full h-0.5 bg-gray-800 transition-transform duration-200 ${
                isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}></div>
            <div
              className={`w-full h-0.5 bg-gray-800 transition-opacity duration-200 ${
                isMobileMenuOpen ? "opacity-0" : ""
              }`}></div>
            <div
              className={`w-full h-0.5 bg-gray-800 transition-transform duration-200 ${
                isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}></div>
          </div>
        </button>
      </div>

      {/* Mobile Menu - Now with social links and resume button */}
      {isMobileMenuOpen && (
        <nav className="lg:hidden mt-2 pb-6 border-t border-gray-200 pt-4">
          <div className="flex justify-center space-x-6 mb-4">
            <FramerMagnet>
              <Link
                href="https://github.com/Eragbai2001"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-800 hover:bg-[#0A66C2] hover:text-white transition-colors p-2 block rounded-md"
                aria-label="LinkedIn">
                <Linkedin size={18} />
              </Link>
            </FramerMagnet>
            <FramerMagnet>
              <Link
                href="https://github.com/Eragbai2001"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-800 hover:bg-[#24292e] hover:text-white transition-colors p-2 block rounded-md"
                aria-label="GitHub">
                <Github size={18} />
              </Link>
            </FramerMagnet>

            <FramerMagnet>
              <Link
                href="https://x.com/JAideloje47355"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-800 hover:bg-black hover:text-white transition-colors p-2 block rounded-md"
                aria-label="X (Twitter)">
                <RiTwitterXFill size={18} />
              </Link>
            </FramerMagnet>
          </div>
          <div className="flex justify-center">
            <Link
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md">
              <span className="text-sm font-medium">My resume</span>
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
