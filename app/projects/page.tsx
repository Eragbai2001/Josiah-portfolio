"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

// Define types for our project data
interface Project {
  id: number;
  title: string;
  image: string;
  description: string;
  technologies: string[];
  link: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Web Application",
    image: "/Ecommerce web app.png",
    description:
      "A full-featured e-commerce platform built with Next.js, featuring product listings, cart functionality, user authentication, and payment processing.",
    technologies: [
      "Next.js",
      "React",
      "Node.js",
      "MongoDB",
      "Stripe",
      "Tailwind CSS",
    ],
    link: "#",
  },
  {
    id: 2,
    title: "Portfolio Website",
    image: "/porfolio pic.png",
    description:
      "A modern portfolio website with smooth animations and interactive elements, showcasing projects and skills in an engaging way.",
    technologies: ["Next.js", "React", "Framer Motion", "Tailwind CSS"],
    link: "#",
  },
  {
    id: 3,
    title: "CBT Application",
    image: "/cbt pic.png",
    description:
      "A computer-based testing application with features for creating tests, managing questions, conducting exams, and generating reports.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Socket.io"],
    link: "#",
  },
];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Web Development Projects
            <span className="block text-2xl sm:text-3xl text-green-600 mt-2">
              Full-Stack Solutions for Nigerian Businesses
            </span>
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-gray-600">
            Explore my portfolio of web development projects created for clients
            across Nigeria and beyond. Each project represents my commitment to
            quality, performance, and solving real business problems.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gray-50 rounded-2xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Project Development Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4 text-xl font-bold">
                  {index + 1}
                </div>
                <h3 className="font-bold text-xl mb-2 text-gray-900">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Technologies I Work With
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {technologies.map((tech, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full font-medium">
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-green-600 text-white rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Have a Project in Mind?</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Let's discuss how I can help bring your ideas to life with custom
            web development solutions tailored to your specific requirements.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center bg-white text-green-600 px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-all">
            Start a Conversation
            <svg
              className="ml-2 w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7-7 7"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

// Define types for our project data
interface Project {
  id: number;
  title: string;
  image: string;
  description: string;
  technologies: string[];
  link: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 * index }}
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <div className="relative w-full h-52">
        <Image
          src={project.image}
          alt={project.title}
          fill
          style={{ objectFit: "cover" }}
          className="transition-transform hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h3 className="font-bold text-xl mb-2 text-gray-900">
          {project.title}
        </h3>
        <p className="text-gray-600 mb-4">{project.description}</p>
        <div className="mb-4 flex flex-wrap gap-2">
          {project.technologies.map((tech: string, i: number) => (
            <span
              key={i}
              className="bg-gray-100 text-xs text-gray-800 px-2 py-1 rounded">
              {tech}
            </span>
          ))}
        </div>
        <a
          href={project.link}
          className="text-green-600 font-medium flex items-center hover:text-green-700">
          View Project Details
          <svg
            className="ml-1 w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7-7 7"
            />
          </svg>
        </a>
      </div>
    </motion.div>
  );
}

interface ProcessStep {
  title: string;
  description: string;
}

const processSteps: ProcessStep[] = [
  {
    title: "Discovery",
    description:
      "Understanding your requirements, goals, and the challenges you're facing.",
  },
  {
    title: "Planning",
    description:
      "Creating a strategic roadmap with timelines, milestones, and technical specifications.",
  },
  {
    title: "Development",
    description:
      "Building your solution with clean code, regular updates, and iterative improvements.",
  },
  {
    title: "Launch & Support",
    description:
      "Deploying your project and providing ongoing maintenance and support.",
  },
];

const technologies: string[] = [
  "Next.js",
  "React",
  "Node.js",
  "TypeScript",
  "Express.js",
  "MongoDB",
  "PostgreSQL",
  "Tailwind CSS",
  "Framer Motion",
  "Redux",
  "Stripe",
  "Firebase",
  "Socket.io",
  "GraphQL",
  "REST API",
];
