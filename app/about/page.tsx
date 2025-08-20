"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column - Photo and Personal Info */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative w-full h-[500px] rounded-2xl overflow-hidden mb-8">
              <Image
                src="/Matric pic.jpg"
                alt="Josiah Aideloje - Web Developer from Lagos, Nigeria"
                fill
                style={{ objectFit: "cover" }}
                priority
                className="rounded-2xl"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gray-50 p-6 rounded-xl">
              <h2 className="font-bold text-xl mb-4 text-gray-900">
                Contact Information
              </h2>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-8 h-8 flex items-center justify-center bg-green-100 rounded-full mr-3">
                    <span className="text-green-600">📍</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Location</p>
                    <p className="text-gray-600">Lagos, Nigeria</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 flex items-center justify-center bg-green-100 rounded-full mr-3">
                    <span className="text-green-600">📧</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Email</p>
                    <a
                      href="mailto:josiahaideloje2@gmail.com"
                      className="text-green-600 hover:underline">
                      josiahaideloje2@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 flex items-center justify-center bg-green-100 rounded-full mr-3">
                    <span className="text-green-600">📱</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Phone</p>
                    <a
                      href="tel:+2347042135699"
                      className="text-green-600 hover:underline">
                      +234 704 213 5699
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - About Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}>
            {/* SEO-Optimized H1 - includes name and location */}
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-gray-900">
              About Josiah Aideloje
              <span className="block text-2xl sm:text-3xl text-green-600 mt-2">
                Full-Stack Developer from Nigeria
              </span>
            </h1>

            <div className="prose prose-lg max-w-none text-gray-600 space-y-6">
              <p>
                Hello! I'm Josiah, a passionate full-stack web developer based
                in Lagos, Nigeria. With expertise in Next.js, React, and
                Node.js, I craft digital experiences that combine clean code,
                stunning design, and optimal performance.
              </p>

              <p>
                My journey in web development started at Landmark University,
                where I pursued my interest in computer science and developed my
                first web applications. Since then, I've been committed to
                continuous learning, staying up-to-date with the latest
                technologies and best practices in this fast-evolving industry.
              </p>

              <p>
                I specialize in building full-stack applications that solve real
                problems. Whether it's an e-commerce platform, a CBT system, or
                an interactive portfolio, I approach each project with attention
                to detail and a focus on delivering exceptional value.
              </p>

              <div className="py-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Why Work With Me?
                </h2>
                <ul className="list-none space-y-4 pl-0">
                  {benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-green-600 mr-3">✓</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="py-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  My Story
                </h2>
                <p>
                  Growing up in Nigeria, I was always fascinated by technology
                  and how it could bridge gaps and create opportunities. This
                  curiosity led me to explore web development, where I
                  discovered my passion for creating digital solutions that make
                  a difference.
                </p>
                <p className="mt-4">
                  Today, I work with clients across Nigeria and internationally,
                  helping businesses establish their online presence and develop
                  custom web applications. Each project is an opportunity to
                  learn, grow, and deliver results that exceed expectations.
                </p>
              </div>

              <div className="py-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Education & Experience
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Computer Science, Landmark University
                    </h3>
                    <p className="text-gray-600">BSc • 2018 - 2022</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Full Stack Web Developer
                    </h3>
                    <p className="text-gray-600">Freelance • 2020 - Present</p>
                    <p className="text-gray-600 mt-1">
                      Developing custom web applications for clients across
                      various industries, with a focus on modern JavaScript
                      frameworks and responsive design.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex space-x-4">
              <Link
                href="/services"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-medium inline-flex items-center transition-all">
                View My Services
                <svg
                  className="ml-2 w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-full font-medium inline-flex items-center transition-all">
                Contact Me
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

const benefits = [
  "Local expertise with international standards - understand the Nigerian tech landscape",
  "End-to-end development capabilities - from concept to deployment and maintenance",
  "Responsive communication - clear updates and quick response times",
  "Performance-focused approach - optimized for speed and SEO",
  "Collaborative process - your vision paired with my technical expertise",
];
