"use client";
import {
  animate,
  motion,
  MotionValue,
  useScroll,
  useSpring,
  useTransform,
  useInView,
} from "framer-motion";
import { useRef, useEffect, useState } from "react";
import emailjs from "@emailjs/browser";

export default function MoreInfo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const [isContactVisible, setIsContactVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const { scrollYProgress } = useScroll({
    container: containerRef,
    offset: ["end end", "start start"],
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640); // Same breakpoint as isSmallScreen
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsContactVisible(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (contactRef.current) {
      observer.observe(contactRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Apply scroll snap only when this component is mounted and not on mobile
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current && !isMobile) {
        if (window.innerWidth <= 1024) {
          containerRef.current.style.scrollSnapType = "none";
        } else {
          containerRef.current.style.scrollSnapType = "y mandatory";
        }
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);

  // If mobile, render as a normal scrollable section
  if (isMobile) {
    return (
      <div className="bg-black min-h-screen">
        {/* Featured Works Header */}
        <div className="py-16 text-center">
          <h1 className="text-4xl font-bold text-[#00FF9B]">Featured Works</h1>
        </div>

        {/* Project slides - stacked vertically on mobile */}
        <div className="space-y-16 px-4">
          {projects.map((project) => (
            <div key={project.id} className="space-y-6">
              <div className="w-full max-w-sm mx-auto">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 object-contain rounded-xl shadow-lg border border-gray-700"
                />
              </div>

              <div className="text-center space-y-4 max-w-md mx-auto">
                <h2 className="text-2xl font-bold text-white">
                  {project.title}
                </h2>

                <p className="text-gray-400 text-sm leading-relaxed">
                  {project.description}
                </p>

                <button
                  onClick={() => window.open(project.demoUrl, "_blank")}
                  className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors cursor-pointer disabled:opacity-50"
                  disabled={project.demoUrl === "#"}>
                  {project.demoUrl === "#" ? "Live Site" : "See Demo"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-16">
          <Contact />
        </div>
      </div>
    );
  }

  // Desktop version (original code)
  return (
    <div>
      <div
        ref={containerRef}
        className="fixed inset-0 overflow-y-auto bg-gray-900 z-50 hide-scrollbar"
        style={{
          height: "100vh",
        }}>
        {/* Featured Works Header - Hide when contact is visible */}
        <motion.div
          className="header-section"
          animate={{
            opacity: isContactVisible ? 0 : 1,
            y: isContactVisible ? -50 : 0,
          }}
          transition={{ duration: 0.3 }}>
          <h1 className="main-title max-lg:hidden">Featured Works</h1>
        </motion.div>

        {/* Progress bar - Hide when contact is visible */}
        <motion.div
          className="progress mx-10 max-lg:hidden"
          style={{ scaleX }}
          animate={{
            opacity: isContactVisible ? 0 : 1,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Project slides */}
        {projects.map((project) => (
          <ProjectSlide
            key={project.id}
            id={project.id}
            title={project.title}
            description={project.description}
            image={project.image}
            demoUrl={project.demoUrl}
          />
        ))}

        {/* Contact Section with ref */}
        <div ref={contactRef}>
          <Contact />
        </div>

        <StyleSheet />
      </div>
    </div>
  );
}

function ProjectSlide({
  id,
  title,
  description,
  image,
  demoUrl,
}: {
  id: number;
  title: string;
  description: string;
  image: string;
  demoUrl?: string;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useParallax(scrollYProgress, 100);

  return (
    <section className="project-slide">
      <div ref={ref} className="project-content">
        <div className="project-image">
          <img src={image} alt={title} />
        </div>

        {/* Right side - Content */}
        <div className="project-info">
          <motion.h2
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}>
            {title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="project-description text-gray-500">
            {description}
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            onClick={() => window.open(demoUrl || "#", "_blank")} // ✅ Fixed: use demoUrl prop instead of image.demoUrl
            className="demo-button"
            style={{ y: useTransform(y, [0, 100], [0, -20]) }}
            disabled={!demoUrl || demoUrl === "#"} // ✅ Fixed: use demoUrl prop instead of image.demoUrl
          >
            {!demoUrl || demoUrl === "#" ? "Live Site" : "See Demo"}
          </motion.button>
        </div>
      </div>
    </section>
  );
}

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

function StyleSheet() {
  return (
    <style>{`
              .header-section {
            height: 20vh;
            display: flex;
            align-items: center;
            justify-content: center;
           
            scroll-snap-align: start;
            position: fixed;
            inset: 0 0 auto 0; /* top right bottom left */

        }

           .hide-scrollbar {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
      
      .hide-scrollbar::-webkit-scrollbar {
        display: none;
      }
      

        .main-title {
            font-size: 4rem;
            font-weight: 800;
            background: #00FF9B;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-align: center;
            letter-spacing: -2px;
        }

        .project-slide {
            height: 100vh;
            scroll-snap-align: start;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 5%;
            background: black;
        }

        .contact-slide {
          height: 100vh;
            scroll-snap-align: start;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 5%;
            background: black;
        
        }
        .project-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            max-width: 1200px;
            width: 100%;
            gap: 4rem;
        }

        .project-image {
            flex: 0 0 45%;
            max-width: 500px;
        }

        .project-image img {
            width: 100%;
            height: 400px;
            object-fit: contain;
            border-radius: 20px;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
            border: 3px solid rgba(255, 255, 255, 0.1);
        }

        .project-info {
            flex: 1;
            color: white;
            padding-left: 2rem;
        }

        .project-info h2 {
            font-size: 3.5rem;
            font-weight: 700;
            margin: 0 0 1.5rem 0;
            color: white;
            line-height: 1.1;
            letter-spacing: -1px;
        }

        .project-description {
            font-size: 1.1rem;
            line-height: 1.7;
           
            margin-bottom: 2.5rem;
           
        }

        .demo-button {
            background: white;
            color:#000000;
            border: none;
            padding: 1rem 2.5rem;
            font-size: 1.1rem;
            font-weight: 600;
            border-radius: 50px;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 10px 30px rgba(255, 107, 107, 0.3);
        }

        .demo-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 15px 40px rgba(255, 107, 107, 0.4);
        }

           .progress {
            position: fixed;
            left: 0;
            right: 0;
            height: 8px;
            background: white;
            top: 140px;
            transform: scaleX(0);
        }

        @media (max-width: 768px) {
            .project-content {
                flex-direction: column;
                text-align: center;
                gap: 2rem;
            }

            .project-image {
                flex: none;
                max-width: 350px;
            }

            .project-image img {
                height: 300px;
            }

            .project-info {
                padding-left: 0;
            }

            .project-info h2 {
                font-size: 2.5rem;
            }

            .main-title {
                font-size: 2.5rem;
            }

            .project-slide {
                padding: 0 2%;
            }
        }
    `}</style>
  );
}

const projects = [
  {
    id: 1,
    title: " E-Commerce Platform",
    description:
      "Full-stack ecommerce web application built with Next.js 14, TypeScript, and Prisma ORM featuring comprehensive admin dashboard, storefront interface, and modern authentication system. This open-source project includes dual-app architecture with separate admin panel and customer-facing storefront, complete with product management, order processing, payment integration, and email verification capabilities. Customized and enhanced to meet specific client requirements including advanced product categorization, automated inventory management, custom checkout flow, and integrated blog system.",
    image: "/Ecommerce web app.png",
    demoUrl: "https://prisma-ecommerce-website.vercel.app/login", // ✅ Add your actual demo URL
    githubUrl: "https://github.com/yourusername/ecommerce-platform", // ✅ Optional: GitHub link
  },
  {
    id: 2,
    title: "Mock CBT Software ",
    description:
      " A mock-based Computer Based Test CBT prep tool that trains students using recent past questions and provides a realistic exam simulation experience. It helps students build confidence, reduce anxiety, and get familiar with the actual computer-based test format used in their schools, this software was built for Landmark University, Omu-Aran, Kwara State, Nigeria. It features a user-friendly interface, real-time performance tracking, and detailed analytics to help students identify their strengths and weaknesses.",
    image: "/cbt pic.png",
    demoUrl: "https://x.com/JAideloje47355/status/1929314900846756165", // ✅ Add your actual demo URL
    githubUrl: "https://github.com/yourusername/cbt-software", // ✅ Optional: GitHub link
  },
  {
    id: 3,
    title: "My Portfolio ",
    description:
      "A modern, interactive portfolio website built with Next.js 15 and Framer Motion, featuring smooth scroll animations, dynamic project showcases, and responsive design. Inspired by Vercel's clean aesthetic and Apple's attention to detail, this portfolio combines minimalist design principles with engaging micro-interactions. The site includes an innovative horizontal project slider, animated contact form with SVG illustrations, and seamless mobile optimization. Built with TypeScript for type safety and EmailJS integration for direct contact functionality, showcasing modern web development practices and user experience design.",
    image: "/porfolio pic.png",
    demoUrl: "#", // ✅ Current site (or your portfolio URL)
    githubUrl: "https://github.com/yourusername/portfolio", // ✅ Optional: GitHub link
  },
];

const Contact = () => {
  const ref = useRef(null);
  const [showForm, setShowForm] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const form = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
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
    setIsSubmitting(true);
    setSubmitStatus("idle");

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        form.current!,
        {
          publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
        }
      )
      .then(
        () => {
          setSubmitStatus("success");
          setFormData({ user_name: "", user_email: "", message: "" });
        },
        (error) => {
          setSubmitStatus("error");
        }
      )
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const isInView = useInView(ref, {
    margin: "-100px",
    once: false,
  });

  useEffect(() => {
    if (isInView) {
      setShowForm(false);
      setAnimationKey((prev) => prev + 1);

      const timer = setTimeout(() => {
        setShowForm(true);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [isInView]);

  // Add this useEffect after your existing useEffects
  useEffect(() => {
    if (submitStatus === "success") {
      const timer = setTimeout(() => {
        setSubmitStatus("idle");
      }, 3000); // Hide after 3 seconds

      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  return (
    <div
      className="text-white flex items-center justify-center py-8 sm:py-12 lg:py-16 px-4 contact-slide min-h-screen bg-black"
      ref={ref}>
      <div className="w-full max-w-6xl mx-auto">
        <div className=" grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left side - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false }}
            className="space-y-12 max-lg:item-center lg:flex lg:flex-col ">
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
                <p className="text-gray-300">josiahaideloje2@gmail.com</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">Address</h3>
                <p className="text-gray-300">
                  #3 Graham Blessing Estate, Army Range, Okoja, Lagos, Nigeria
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">Phone</h3>
                <p className="text-gray-300">+2347042135699</p>
              </div>
            </div>
          </motion.div>

          {/* Right side - Phone SVG and Form */}
          <div
            className="flex flex-col items-center justify-center relative min-h-[400px] lg:min-h-[500px]
        ">
            {/* ✅ Complete Phone SVG Animation */}
            <motion.div
              key={`phone-${animationKey}`}
              className="phoneSvg absolute flex items-center justify-center z-10"
              initial={{ opacity: 1, zIndex: 10 }}
              animate={{
                opacity: showForm ? 0 : 1,
                zIndex: showForm ? -1 : 10,
              }}
              transition={{ delay: 3, duration: 1 }}
              onAnimationComplete={(definition) => {
                if (
                  typeof definition === "object" &&
                  definition &&
                  "opacity" in definition &&
                  definition.opacity === 0
                ) {
                  setShowForm(true);
                }
              }}>
              <svg
                width="450px"
                height="450px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <motion.path
                  key={`path1-${animationKey}`}
                  d="M13.5 2C13.5 2 15.8335 2.21213 18.8033 5.18198C21.7731 8.15183 21.9853 10.4853 21.9853 10.4853"
                  stroke="#00FF9B"
                  strokeWidth="0.2"
                  strokeLinecap="butt"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{
                    pathLength: 1,
                    opacity: 1,
                  }}
                  transition={{ duration: 2, delay: 0.5 }}
                />
                <motion.path
                  key={`path2-${animationKey}`}
                  d="M14.207 5.53564C14.207 5.53564 15.197 5.81849 16.6819 7.30341C18.1668 8.78834 18.4497 9.77829 18.4497 9.77829"
                  stroke="#00FF9B"
                  strokeWidth="0.2"
                  strokeLinecap="butt"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{
                    pathLength: 1,
                    opacity: 1,
                  }}
                  transition={{ duration: 2, delay: 1 }}
                />
                <motion.path
                  key={`path3-${animationKey}`}
                  d="M15.1007 15.0272L14.5569 14.5107L15.1007 15.0272ZM15.5562 14.5477L16.1 15.0642H16.1L15.5562 14.5477ZM17.9728 14.2123L17.5987 14.8623H17.5987L17.9728 14.2123ZM19.8833 15.312L19.5092 15.962L19.8833 15.312ZM20.4217 18.7584L20.9655 19.2749L20.4217 18.7584ZM19.0011 20.254L18.4573 19.7375L19.0011 20.254ZM17.6763 20.9631L17.7499 21.7095L17.6763 20.9631ZM7.81536 16.4752L8.35915 15.9587L7.81536 16.4752ZM3.00289 6.96594L2.25397 7.00613L2.25397 7.00613L3.00289 6.96594ZM9.47752 8.50311L10.0213 9.01963H10.0213L9.47752 8.50311ZM9.63424 5.6931L10.2466 5.26012L9.63424 5.6931ZM8.37326 3.90961L7.76086 4.3426V4.3426L8.37326 3.90961ZM5.26145 3.60864L5.80524 4.12516L5.26145 3.60864ZM3.69185 5.26114L3.14806 4.74462L3.14806 4.74462L3.69185 5.26114ZM11.0631 13.0559L11.6069 12.5394L11.0631 13.0559ZM15.6445 15.5437L16.1 15.0642L15.0124 14.0312L14.5569 14.5107L15.6445 15.5437ZM17.5987 14.8623L19.5092 15.962L20.2575 14.662L18.347 13.5623L17.5987 14.8623ZM19.8779 18.2419L18.4573 19.7375L19.5449 20.7705L20.9655 19.2749L19.8779 18.2419ZM17.6026 20.2167C16.1676 20.3584 12.4233 20.2375 8.35915 15.9587L7.27157 16.9917C11.7009 21.655 15.9261 21.8895 17.7499 21.7095L17.6026 20.2167ZM8.35915 15.9587C4.48303 11.8778 3.83285 8.43556 3.75181 6.92574L2.25397 7.00613C2.35322 8.85536 3.1384 12.6403 7.27157 16.9917L8.35915 15.9587ZM9.7345 9.32159L10.0213 9.01963L8.93372 7.9866L8.64691 8.28856L9.7345 9.32159ZM10.2466 5.26012L8.98565 3.47663L7.76086 4.3426L9.02185 6.12608L10.2466 5.26012ZM4.71766 3.09213L3.14806 4.74462L4.23564 5.77765L5.80524 4.12516L4.71766 3.09213ZM9.1907 8.80507C8.64691 8.28856 8.64622 8.28929 8.64552 8.29002C8.64528 8.29028 8.64458 8.29102 8.64411 8.29152C8.64316 8.29254 8.64219 8.29357 8.64121 8.29463C8.63924 8.29675 8.6372 8.29896 8.6351 8.30127C8.63091 8.30588 8.62646 8.31087 8.62178 8.31625C8.61243 8.32701 8.60215 8.33931 8.59116 8.3532C8.56918 8.38098 8.54431 8.41512 8.51822 8.45588C8.46591 8.53764 8.40917 8.64531 8.36112 8.78033C8.26342 9.0549 8.21018 9.4185 8.27671 9.87257C8.40742 10.7647 8.99198 11.9644 10.5193 13.5724L11.6069 12.5394C10.1793 11.0363 9.82761 10.1106 9.76086 9.65511C9.72866 9.43536 9.76138 9.31957 9.77432 9.28321C9.78159 9.26277 9.78635 9.25709 9.78169 9.26437C9.77944 9.26789 9.77494 9.27451 9.76738 9.28407C9.76359 9.28885 9.75904 9.29437 9.7536 9.30063C9.75088 9.30375 9.74793 9.30706 9.74476 9.31056C9.74317 9.31231 9.74152 9.3141 9.73981 9.31594C9.73896 9.31686 9.73809 9.31779 9.7372 9.31873C9.73676 9.3192 9.73608 9.31992 9.73586 9.32015C9.73518 9.32087 9.7345 9.32159 9.1907 8.80507ZM10.5193 13.5724C12.0422 15.1757 13.1923 15.806 14.0698 15.9485C14.5201 16.0216 14.8846 15.9632 15.1606 15.8544C15.2955 15.8012 15.4022 15.7387 15.4823 15.6819C15.5223 15.6535 15.5556 15.6266 15.5824 15.6031C15.5959 15.5913 15.6077 15.5803 15.618 15.5703C15.6232 15.5654 15.628 15.5606 15.6324 15.5562C15.6346 15.554 15.6367 15.5518 15.6387 15.5497C15.6397 15.5487 15.6407 15.5477 15.6417 15.5467C15.6422 15.5462 15.6429 15.5454 15.6431 15.5452C15.6438 15.5444 15.6445 15.5437 15.1007 15.0272C14.5569 14.5107 14.5576 14.51 14.5583 14.5093C14.5585 14.509 14.5592 14.5083 14.5596 14.5078C14.5605 14.5069 14.5614 14.506 14.5623 14.5051C14.5641 14.5033 14.5658 14.5015 14.5674 14.4998C14.5708 14.4965 14.574 14.4933 14.577 14.4904C14.583 14.4846 14.5885 14.4796 14.5933 14.4754C14.6028 14.467 14.6099 14.4616 14.6145 14.4584C14.6239 14.4517 14.6229 14.454 14.6102 14.459C14.5909 14.4666 14.5 14.4987 14.3103 14.4679C13.9077 14.4025 13.0391 14.0472 11.6069 12.5394L10.5193 13.5724ZM8.98565 3.47663C7.97206 2.04305 5.94384 1.80119 4.71766 3.09213L5.80524 4.12516C6.32808 3.57471 7.24851 3.61795 7.76086 4.3426L8.98565 3.47663ZM3.75181 6.92574C3.73038 6.52644 3.90425 6.12654 4.23564 5.77765L3.14806 4.74462C2.61221 5.30877 2.20493 6.09246 2.25397 7.00613L3.75181 6.92574ZM18.4573 19.7375C18.1783 20.0313 17.8864 20.1887 17.6026 20.2167L17.7499 21.7095C18.497 21.6357 19.1016 21.2373 19.5449 20.7705L18.4573 19.7375ZM10.0213 9.01963C10.9889 8.00095 11.0574 6.40678 10.2466 5.26012L9.02185 6.12608C9.44399 6.72315 9.37926 7.51753 8.93372 7.9866L10.0213 9.01963ZM19.5092 15.962C20.33 16.4345 20.4907 17.5968 19.8779 18.2419L20.9655 19.2749C22.2704 17.901 21.8904 15.6019 20.2575 14.662L19.5092 15.962ZM16.1 15.0642C16.4854 14.6584 17.086 14.5672 17.5987 14.8623L18.347 13.5623C17.2485 12.93 15.8861 13.1113 15.0124 14.0312L16.1 15.0642Z"
                  stroke="#00FF9B"
                  strokeWidth="0.2"
                  fill="#00FF9B"
                />
              </svg>
            </motion.div>

            {/* Form */}
            <motion.form
              ref={form}
              key={`form-${animationKey}`}
              onSubmit={handleSubmit}
              className="w-full space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: showForm ? 1 : 0 }}
              transition={{ duration: 1 }}>
              <div>
                <input
                  type="text"
                  name="user_name"
                  placeholder="Name"
                  value={formData.user_name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 bg-transparent border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#00FF9B] transition-colors"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <input
                  type="email"
                  name="user_email"
                  placeholder="Email"
                  value={formData.user_email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 bg-transparent border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#00FF9B] transition-colors"
                  required
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
                />
              </div>

              {submitStatus === "success" && (
                <div className="text-[#00FF9B] text-center font-semibold">
                  Message sent successfully! 🎉
                </div>
              )}

              {submitStatus === "error" && (
                <div className="text-red-400 text-center font-semibold">
                  Failed to send message. Please try again.
                </div>
              )}

              <motion.button
                type="submit"
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                disabled={isSubmitting}
                className={`w-full py-4 font-semibold rounded-lg transition-colors cursor-pointer ${
                  isSubmitting
                    ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                    : "bg-[#00FF9B] text-black hover:bg-[#00FF9B]"
                }`}>
                {isSubmitting ? "Sending..." : "Submit"}
              </motion.button>
            </motion.form>
          </div>
        </div>
      </div>
    </div>
  );
};
