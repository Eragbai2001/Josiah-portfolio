"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-7xl mx-auto">
        {/* SEO-Optimized H1 - includes location */}
        <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-gray-900">
          Web Development Services in Nigeria
        </h1>

        <p className="text-lg text-gray-600 mb-12 max-w-3xl">
          I build fast, accessible, and visually appealing web applications for
          businesses across Nigeria and beyond. Specializing in React, Next.js,
          and Node.js solutions that drive results.
        </p>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service) => (
            <motion.div
              key={service.title}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}>
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl text-green-600">{service.icon}</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-center text-sm text-gray-500">
                    <span className="mr-2">✓</span> {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Industries Served */}
        <h2 className="text-3xl font-bold mb-6 text-gray-900">
          Industries I Serve
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {industries.map((industry) => (
            <div
              key={industry}
              className="bg-gray-50 rounded-lg px-4 py-3 text-center">
              <span className="text-gray-800 font-medium">{industry}</span>
            </div>
          ))}
        </div>

        {/* Tech Stack */}
        <h2 className="text-3xl font-bold mb-6 text-gray-900">My Tech Stack</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-16">
          {techStack.map((tech) => (
            <div key={tech.name} className="flex flex-col items-center">
              <div className="w-16 h-16 flex items-center justify-center mb-2">
                <span className="text-3xl">{tech.icon}</span>
              </div>
              <span className="text-sm text-gray-600">{tech.name}</span>
            </div>
          ))}
        </div>

        {/* Pricing Section */}
        <h2 className="text-3xl font-bold mb-6 text-gray-900">Pricing Guide</h2>
        <div className="bg-gray-50 rounded-xl p-6 mb-16">
          <p className="text-gray-700 mb-4">
            Every project is unique, with pricing based on scope, complexity,
            and timeline. Here's a general guide to help you budget:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <h3 className="font-bold text-lg mb-2">Basic Website</h3>
              <p className="text-gray-500 mb-3 text-sm">
                Small business sites, landing pages
              </p>
              <p className="font-semibold">Starting from ₦300,000</p>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <h3 className="font-bold text-lg mb-2">Web Application</h3>
              <p className="text-gray-500 mb-3 text-sm">
                Custom functionality, user accounts
              </p>
              <p className="font-semibold">Starting from ₦800,000</p>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <h3 className="font-bold text-lg mb-2">E-commerce Solution</h3>
              <p className="text-gray-500 mb-3 text-sm">
                Online stores, payment integration
              </p>
              <p className="font-semibold">Starting from ₦1,200,000</p>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <h2 className="text-3xl font-bold mb-6 text-gray-900">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6 mb-16">
          {faqs.map((faq) => (
            <div key={faq.question} className="border-b border-gray-200 pb-4">
              <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-green-400 to-teal-500 rounded-xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to start your project?
          </h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Let's discuss how I can help bring your digital vision to life with
            a web solution tailored to your specific needs.
          </p>
          <Link
            href="/contact"
            className="bg-white text-green-600 px-8 py-3 rounded-full font-medium inline-block hover:shadow-lg transition-all">
            Contact Me
          </Link>
        </div>
      </div>
    </div>
  );
}

const services = [
  {
    icon: "🖥️",
    title: "Custom Web Application Development",
    description:
      "Tailored web solutions designed to solve your specific business challenges.",
    features: [
      "Full-stack development with Next.js/React",
      "Responsive & mobile-first design",
      "API integrations with existing systems",
      "Performance optimization",
    ],
  },
  {
    icon: "🛒",
    title: "E-commerce Development",
    description:
      "Online stores that drive sales with seamless user experiences.",
    features: [
      "Custom online store development",
      "Payment gateway integration",
      "Inventory management",
      "Mobile shopping experiences",
    ],
  },
  {
    icon: "🔄",
    title: "Web Application Maintenance",
    description:
      "Keep your web applications running smoothly with regular updates and support.",
    features: [
      "Bug fixing and performance tuning",
      "Security updates & audits",
      "Feature additions & improvements",
      "Technical support",
    ],
  },
  {
    icon: "📱",
    title: "Progressive Web Apps (PWAs)",
    description:
      "App-like experiences that work on any device with or without internet.",
    features: [
      "Offline functionality",
      "Fast loading speeds",
      "App-like experience",
      "Cross-platform compatibility",
    ],
  },
  {
    icon: "🚀",
    title: "Performance Optimization",
    description:
      "Speed up your existing web applications for better user experience and SEO.",
    features: [
      "Core Web Vitals optimization",
      "Code splitting & lazy loading",
      "Image optimization",
      "Server-side rendering",
    ],
  },
  {
    icon: "🔐",
    title: "Authentication & User Management",
    description: "Secure login systems and user account management features.",
    features: [
      "Custom auth flows",
      "Social login integration",
      "Role-based permissions",
      "User profile management",
    ],
  },
];

const industries = [
  "E-commerce & Retail",
  "Finance & Banking",
  "Education",
  "Healthcare",
  "Startups",
  "Small & Medium Businesses",
  "Real Estate",
  "Entertainment",
];

const techStack = [
  { name: "React", icon: "⚛️" },
  { name: "Next.js", icon: "▲" },
  { name: "TypeScript", icon: "TS" },
  { name: "Node.js", icon: "🟢" },
  { name: "MongoDB", icon: "🍃" },
  { name: "PostgreSQL", icon: "🐘" },
  { name: "Tailwind CSS", icon: "🌊" },
  { name: "Framer Motion", icon: "🎭" },
  { name: "Redux", icon: "🔄" },
  { name: "REST APIs", icon: "🌐" },
  { name: "GraphQL", icon: "◯" },
  { name: "AWS", icon: "☁️" },
];

const faqs = [
  {
    question: "How long does a typical web development project take?",
    answer:
      "Project timelines vary based on complexity. A simple website might take 2-4 weeks, while complex web applications can take 2-6 months. I'll provide a clear timeline during our initial consultation.",
  },
  {
    question: "Do you work remotely with clients outside Lagos, Nigeria?",
    answer:
      "Yes, I work with clients across Nigeria and internationally. All meetings can be conducted via video calls, and I maintain regular communication throughout the project.",
  },
  {
    question: "What payment options do you accept in Nigeria?",
    answer:
      "I accept bank transfers, cryptocurrency, and international wire transfers. Projects typically require a 50% deposit to begin, with the remainder due upon completion or in milestone-based payments for larger projects.",
  },
  {
    question: "Do you provide website maintenance after launch?",
    answer:
      "Yes, I offer ongoing maintenance packages to keep your website secure, updated, and performing optimally. These can be tailored to your specific needs and budget.",
  },
  {
    question: "Will my website work well on mobile devices?",
    answer:
      "Absolutely. All websites and applications I develop are fully responsive and tested across devices of various sizes. Mobile optimization is a standard part of my development process.",
  },
];
