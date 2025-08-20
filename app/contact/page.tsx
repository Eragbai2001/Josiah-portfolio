"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Get In Touch
            <span className="block text-2xl sm:text-3xl text-green-600 mt-2">
              Let's Discuss Your Project
            </span>
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-gray-600">
            Have a project in mind or want to discuss how I can help your
            business? Fill out the form below, and I'll get back to you as soon
            as possible.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Send Me a Message
            </h2>

            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700 mb-1">
                    First Name*
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-600 focus:border-transparent transition"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name*
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-600 focus:border-transparent transition"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address*
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-600 focus:border-transparent transition"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-600 focus:border-transparent transition"
                />
              </div>

              <div>
                <label
                  htmlFor="projectType"
                  className="block text-sm font-medium text-gray-700 mb-1">
                  Project Type
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-600 focus:border-transparent transition">
                  <option value="">Please select</option>
                  <option value="website">Website Development</option>
                  <option value="ecommerce">E-commerce Website</option>
                  <option value="webapp">Web Application</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1">
                  Project Details*
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-600 focus:border-transparent transition"
                  required></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-all">
                  Send Message
                </button>
                <p className="text-sm text-gray-500 mt-2">*Required fields</p>
              </div>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}>
            <div className="bg-gray-50 rounded-xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Contact Information
              </h2>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-10 h-10 flex items-center justify-center bg-green-100 rounded-full mr-4">
                    <span className="text-green-600">📍</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Location</p>
                    <p className="text-gray-600">Lagos, Nigeria</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-10 h-10 flex items-center justify-center bg-green-100 rounded-full mr-4">
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
                  <div className="w-10 h-10 flex items-center justify-center bg-green-100 rounded-full mr-4">
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
            </div>

            <div className="bg-gray-50 rounded-xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Working Hours
              </h2>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monday - Friday</span>
                  <span className="font-medium text-gray-900">
                    9:00 AM - 6:00 PM WAT
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Saturday</span>
                  <span className="font-medium text-gray-900">
                    10:00 AM - 4:00 PM WAT
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sunday</span>
                  <span className="font-medium text-gray-900">Closed</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Connect With Me
              </h2>

              <div className="flex space-x-4">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center bg-green-100 rounded-full hover:bg-green-200 transition-colors">
                  <span className="text-green-600">in</span>
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center bg-green-100 rounded-full hover:bg-green-200 transition-colors">
                  <span className="text-green-600">𝕏</span>
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center bg-green-100 rounded-full hover:bg-green-200 transition-colors">
                  <span className="text-green-600">GH</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
            Frequently Asked Questions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold text-xl mb-3 text-gray-900">
                  {faq.question}
                </h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

const faqs = [
  {
    question: "What information should I prepare before contacting you?",
    answer:
      "It's helpful to have an idea of your project scope, timeline, budget, and specific requirements. The more details you can provide, the better I can understand your needs and provide an accurate proposal.",
  },
  {
    question: "How soon can you start working on my project?",
    answer:
      "My availability varies depending on current projects. Typically, I can start new projects within 1-2 weeks of agreement. For urgent projects, please mention this in your message, and I'll do my best to accommodate your timeline.",
  },
  {
    question: "What is your payment structure?",
    answer:
      "Most projects require a 50% deposit to begin work, with the remainder due upon completion. For larger projects, I offer milestone-based payment schedules. All payment terms are clearly outlined in the project proposal.",
  },
  {
    question: "Do you sign NDAs?",
    answer:
      "Yes, I'm happy to sign an NDA before discussing sensitive project details. Your business ideas and information will be kept strictly confidential.",
  },
];
