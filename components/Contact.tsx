"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
  };

  return (
    <section
      className=" text-white flex items-center justify-center py-16 px-4 fixed overflow-y-auto bg-gray-900"
      style={{
        height: "100vh",
        overflowY: "auto",
        scrollSnapType: "y mandatory",
      }}>
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left side - Contact Info */}
        <div className="space-y-12">
          <div>
            <h1 className="text-6xl lg:text-7xl font-bold leading-tight mb-4">
              Let's work
              <br />
              together
            </h1>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-2">Mail</h3>
              <p className="text-gray-300">hello@react.dev</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Address</h3>
              <p className="text-gray-300">123 Avenue Street New York</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Phone</h3>
              <p className="text-gray-300">+1 234 5678</p>
            </div>
          </div>
        </div>

        {/* Right side - Contact Form */}
        <div className="flex items-center">
          <form onSubmit={handleSubmit} className="w-full space-y-6">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-4 bg-transparent border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#00FF9B] transition-colors"
                required
              />
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-4 bg-transparent border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#00FF9B] transition-colors"
                required
              />
            </div>

            <div>
              <textarea
                name="message"
                placeholder="Message"
                rows={6}
                value={formData.message}
                onChange={handleInputChange}
                className="w-full px-4 py-4 bg-transparent border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#00FF9B] transition-colors resize-none"
                required
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-[#FF9500] text-black font-semibold rounded-lg hover:bg-[#e6850d] transition-colors">
              Submit
            </motion.button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
