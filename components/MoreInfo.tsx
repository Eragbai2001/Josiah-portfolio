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

export default function MoreInfo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const [isContactVisible, setIsContactVisible] = useState(false);
  const { scrollYProgress } = useScroll({
    container: containerRef,
    offset: ["end end", "start start"],
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsContactVisible(entry.isIntersecting);
      },
      { threshold: 0.5 } // Trigger when 50% of contact section is visible
    );

    if (contactRef.current) {
      observer.observe(contactRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Apply scroll snap only when this component is mounted
  useEffect(() => {
    const originalScrollSnapType =
      document.documentElement.style.scrollSnapType;

    if (containerRef.current) {
      containerRef.current.style.scrollSnapType = "y mandatory";
    }

    return () => {
      document.documentElement.style.scrollSnapType = originalScrollSnapType;
      if (containerRef.current) {
        containerRef.current.style.scrollSnapType = "";
      }
    };
  }, []);

  return (
    <div>
      <div
        ref={containerRef}
        className="fixed inset-0 overflow-y-auto bg-gray-900 z-50"
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
          <h1 className="main-title">Featured Works</h1>
        </motion.div>

        {/* Progress bar - Hide when contact is visible */}
        <motion.div
          className="progress mx-10"
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
}: {
  id: number;
  title: string;
  description: string;
  image: string;
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
            className="project-description">
            {description}
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="demo-button"
            style={{ y: useTransform(y, [0, 100], [0, -20]) }}>
            See Demo
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
            object-fit: cover;
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
            color: rgba(255, 255, 255, 0.7);
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
            top: 120px;
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
    title: "AI Chat Platform",
    description:
      "Morning control cloud fairly captain stronger variety feet excitement matter sent lost hurried closely learn wonder planning poetry ten life national there orbit regular. Morning control cloud fairly captain stronger variety feet excitement matter sent.",
    image: "/landing.png",
  },
  {
    id: 2,
    title: "React Commerce",
    description:
      "Morning control cloud fairly captain stronger variety feet excitement matter sent lost hurried closely learn wonder planning poetry ten life national there orbit regular. Morning control cloud fairly captain stronger variety feet excitement matter sent.",
    image: "/photos/cityscape/2.jpg",
  },
  {
    id: 3,
    title: "Data Analytics",
    description:
      "Morning control cloud fairly captain stronger variety feet excitement matter sent lost hurried closely learn wonder planning poetry ten life national there orbit regular. Morning control cloud fairly captain stronger variety feet excitement matter sent.",
    image: "/photos/cityscape/3.jpg",
  },
  {
    id: 4,
    title: "Mobile App Suite",
    description:
      "Morning control cloud fairly captain stronger variety feet excitement matter sent lost hurried closely learn wonder planning poetry ten life national there orbit regular. Morning control cloud fairly captain stronger variety feet excitement matter sent.",
    image: "/photos/cityscape/4.jpg",
  },
  {
    id: 5,
    title: "Cloud Infrastructure",
    description:
      "Morning control cloud fairly captain stronger variety feet excitement matter sent lost hurried closely learn wonder planning poetry ten life national there orbit regular. Morning control cloud fairly captain stronger variety feet excitement matter sent.",
    image: "/photos/cityscape/5.jpg",
  },
];

const Contact = () => {
  const ref = useRef(null);
  const [showForm, setShowForm] = useState(false);
  const [animationKey, setAnimationKey] = useState(0); // Force re-animation

  const variants = {
    initial: {
      y: 500,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

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
    console.log("Form submitted:", formData);
  };

  const isInView = useInView(ref, {
    margin: "-100px",
    once: false, // Allow re-triggering when scrolling back
  });

  // Reset animations when coming back into view
  useEffect(() => {
    if (isInView) {
      setShowForm(false);
      setAnimationKey((prev) => prev + 1); // Force re-render

      // Reset form after delay
      const timer = setTimeout(() => {
        setShowForm(true);
      }, 4000); // Show form after phone animation completes

      return () => clearTimeout(timer);
    }
  }, [isInView]);

  return (
    <div
      className="text-white flex items-center justify-center py-16 px-4 contact-slide min-h-screen"
      ref={ref}>
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left side - Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }} // Allow re-animation
          className="space-y-12">
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
                #3 Graham Douglass Estate, Army Range, Igwuruta, Port Harcourt,
                Nigeria
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Phone</h3>
              <p className="text-gray-300">+2347042135690</p>
            </div>
          </div>
        </motion.div>

        {/* Right side - Phone SVG and Form */}
        <div className="flex flex-col items-center justify-center relative h-full">
          {/* Phone SVG */}
          <motion.div
            key={`phone-${animationKey}`} // Force re-render
            className="phoneSvg absolute flex items-center justify-center z-10"
            initial={{ opacity: 1 }}
            animate={{ opacity: isInView ? 0 : 1 }}
            transition={{ delay: isInView ? 3 : 0, duration: 1 }}
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
                strokeLinecap="butt" // Change from "round" to "butt"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }} // Add opacity to hide initially
                animate={{
                  pathLength: isInView ? 1 : 0,
                  opacity: isInView ? 1 : 0, // Fade in with animation
                }}
                transition={{ duration: 2, delay: 0.5 }}
              />
              <motion.path
                key={`path2-${animationKey}`}
                d="M14.207 5.53564C14.207 5.53564 15.197 5.81849 16.6819 7.30341C18.1668 8.78834 18.4497 9.77829 18.4497 9.77829"
                stroke="#00FF9B"
                strokeWidth="0.2"
                strokeLinecap="butt" // Change from "round" to "butt"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: isInView ? 1 : 0,
                  opacity: isInView ? 1 : 0,
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
            key={`form-${animationKey}`}
            onSubmit={handleSubmit}
            className="w-full space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: showForm ? 1 : 0 }}
            transition={{ duration: 1 }}>
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
              className="w-full py-4 bg-[#00FF9B] text-black font-semibold rounded-lg hover:bg-[#00FF9B] transition-colors cursor-pointer">
              Submit
            </motion.button>
          </motion.form>
        </div>
      </div>
    </div>
  );
};
