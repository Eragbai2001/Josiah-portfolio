"use client";
import {
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

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsContactVisible(entry.isIntersecting),
      { threshold: 0.3 },
    );
    if (contactRef.current) observer.observe(contactRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current && !isMobile) {
        containerRef.current.style.scrollSnapType =
          window.innerWidth <= 1024 ? "none" : "y mandatory";
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile]);

  if (isMobile) {
    return (
      <div className="bg-[#080808] min-h-screen">
        <div className="py-16 text-center px-4">
          <p className="text-[#00FF9B] text-xs font-mono tracking-[0.3em] uppercase mb-3">
            Selected Work
          </p>
          <h1 className="text-5xl font-black text-white tracking-tight">
            Projects
          </h1>
        </div>
        <div className="space-y-24 px-4 pb-24">
          {projects.map((project, i) => (
            <div key={project.id} className="space-y-6">
              <div className="relative w-full rounded-2xl overflow-hidden bg-[#111]">
                {project.video ? (
                  <video
                    src={project.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full aspect-video object-cover"
                  />
                ) : (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full aspect-video object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 text-[10px] text-[#00FF9B] font-mono bg-black/60 px-2 py-1 rounded-full backdrop-blur-sm">
                  0{i + 1}
                </span>
              </div>
              <div className="space-y-3 px-1">
                <h2 className="text-2xl font-black text-white tracking-tight">
                  {project.title}
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {project.description}
                </p>
                <button
                  onClick={() => window.open(project.demoUrl, "_blank")}
                  className="mt-2 bg-[#00FF9B] text-black px-6 py-3 rounded-full font-bold text-sm hover:bg-white transition-colors"
                  disabled={project.demoUrl === "#"}>
                  {project.demoUrl === "#" ? "Coming Soon" : "View Live →"}
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <Contact />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div
        ref={containerRef}
        className="fixed inset-0 overflow-y-auto bg-[#080808] z-50 hide-scrollbar"
        style={{ height: "100vh", scrollSnapType: "y mandatory" }}>
        {/* Fixed header bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-10 py-5"
          style={{
            background:
              "linear-gradient(to bottom, rgba(8,8,8,0.95) 0%, transparent 100%)",
          }}
          animate={{ opacity: isContactVisible ? 0 : 1 }}
          transition={{ duration: 0.4 }}>
          <p className="text-[#00FF9B] text-[11px] font-mono tracking-[0.3em] uppercase">
            Selected Work
          </p>
          <p className="text-gray-600 text-[11px] font-mono tracking-widest">
            {projects.length} Projects
          </p>
        </motion.div>

        {projects.map((project, index) => (
          <ProjectSlide
            key={project.id}
            id={project.id}
            index={index}
            total={projects.length}
            title={project.title}
            description={project.description}
            image={project.image}
            video={project.video}
            demoUrl={project.demoUrl}
          />
        ))}

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
  index,
  total,
  title,
  description,
  image,
  video,
  demoUrl,
}: {
  id: number;
  index: number;
  total: number;
  title: string;
  description: string;
  image: string;
  video?: string;
  demoUrl?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-20% 0px -20% 0px" });

  return (
    <section
      ref={ref}
      className="project-slide"
      style={{ scrollSnapAlign: "start" }}>
      {/* Full-width media on top, info below — big cinematic layout */}
      <div className="project-inner">
        {/* Media block — LARGE */}
        <motion.div
          className="media-block"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={
            isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }
          }
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
          <div className="media-frame">
            {video ? (
              <video
                src={video}
                autoPlay
                loop
                muted
                playsInline
                className="media-asset"
              />
            ) : (
              <img src={image} alt={title} className="media-asset" />
            )}

            {/* Subtle bottom gradient overlay */}
            <div className="media-overlay" />

            {/* Index tag */}
            <div className="index-tag">
              <span className="index-num">0{index + 1}</span>
              <span className="index-sep">/</span>
              <span className="index-total">0{total}</span>
            </div>
          </div>
        </motion.div>

        {/* Info block */}
        <motion.div
          className="info-block"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}>
          <div className="info-left">
            <h2 className="project-title">{title}</h2>
            <p className="project-desc">{description}</p>
          </div>

          <div className="info-right">
            <motion.button
              onClick={() => window.open(demoUrl || "#", "_blank")}
              className="cta-button"
              whileHover={{ scale: 1.04, backgroundColor: "#fff" }}
              whileTap={{ scale: 0.97 }}
              disabled={!demoUrl || demoUrl === "#"}>
              {!demoUrl || demoUrl === "#" ? "Coming Soon" : "View Live →"}
            </motion.button>
          </div>
        </motion.div>
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
      .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      .hide-scrollbar::-webkit-scrollbar { display: none; }

      /* ── Slide Layout ── */
      .project-slide {
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 70px 5% 3% 5%;
        background: #080808;
      }

      .project-inner {
        display: flex;
        flex-direction: column;
        width: 100%;
        max-width: 1400px;
        height: 100%;
        gap: 0;
      }

      /* ── Media ── */
      .media-block {
        flex: 1 1 0;
        min-height: 0;
      }

      .media-frame {
        position: relative;
        width: 100%;
        height: 100%;
        min-height: 420px;
        border-radius: 20px;
        overflow: hidden;
        background: #111;
      }

      .media-asset {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        border-radius: 20px;
      }

      .media-overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(
          to bottom,
          transparent 55%,
          rgba(8,8,8,0.55) 100%
        );
        border-radius: 20px;
        pointer-events: none;
      }

      .index-tag {
        position: absolute;
        top: 18px;
        right: 18px;
        display: flex;
        align-items: center;
        gap: 5px;
        background: rgba(0,0,0,0.55);
        backdrop-filter: blur(12px);
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 100px;
        padding: 5px 12px;
      }

      .index-num {
        font-size: 11px;
        font-weight: 700;
        color: #00FF9B;
        font-family: monospace;
        letter-spacing: 0.1em;
      }

      .index-sep {
        font-size: 11px;
        color: rgba(255,255,255,0.2);
        font-family: monospace;
      }

      .index-total {
        font-size: 11px;
        color: rgba(255,255,255,0.35);
        font-family: monospace;
        letter-spacing: 0.1em;
      }

      /* ── Info Bar ── */
      .info-block {
        flex: 0 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px 4px 0 4px;
        gap: 2rem;
      }

      .info-left {
        display: flex;
        align-items: baseline;
        gap: 2rem;
        flex: 1;
        min-width: 0;
      }

      .project-title {
        font-size: clamp(1.6rem, 2.5vw, 2.4rem);
        font-weight: 900;
        color: #fff;
        letter-spacing: -0.04em;
        line-height: 1;
        white-space: nowrap;
        flex-shrink: 0;
      }

      .project-desc {
        font-size: 0.85rem;
        color: #555;
        line-height: 1.6;
        max-width: 55ch;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      .info-right {
        flex-shrink: 0;
      }

      .cta-button {
        background: #00FF9B;
        color: #000;
        border: none;
        padding: 0.75rem 2rem;
        font-size: 0.85rem;
        font-weight: 800;
        border-radius: 100px;
        cursor: pointer;
        transition: background 0.25s ease, transform 0.2s ease;
        white-space: nowrap;
        letter-spacing: 0.02em;
      }

      .cta-button:disabled {
        background: #222;
        color: #444;
        cursor: not-allowed;
      }

      /* ── Contact slide ── */
      .contact-slide {
        height: 100vh;
        scroll-snap-align: start;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 5%;
        background: #080808;
      }

      /* ── Responsive ── */
      @media (max-width: 1024px) {
        .project-slide { padding: 70px 4% 3% 4%; }
        .media-frame { min-height: 320px; }
        .info-left { flex-direction: column; gap: 0.5rem; align-items: flex-start; }
        .project-title { white-space: normal; font-size: 1.6rem; }
      }

      @media (max-width: 768px) {
        .media-frame { min-height: 240px; }
        .project-title { font-size: 1.4rem; }
      }
    `}</style>
  );
}

const projects = [
  {
    id: 1,
    title: "Coursify",
    description:
      "A platform for university students to share past questions, resources, and study materials. Built for Landmark University, now serving 400+ active users.",
    image: "/cbt pic.png",
    video: "/video/coursify.mp4",
    demoUrl: "https://coursify.dev/",
  },
  {
    id: 2,
    title: "KDR — Manga Artist Portfolio",
    description:
      "A dark, editorial portfolio built for a manga artist and visual storyteller. Features smooth animations and a gallery-focused layout.",
    image: "/porfolio pic.png",
    video: "/video/kdr.mp4",
    demoUrl: "https://kdr.vercel.app/",
  },
  {
    id: 3,
    title: "Vera Skin",
    description:
      "A premium skincare landing page with immersive product visuals, ingredient showcases, and a luxury brand feel.",
    image: "/landing.png",
    video: "/video/vera.mp4",
    demoUrl: "https://vera-gilt.vercel.app/",
  },
  {
    id: 4,
    title: "X-Space",
    description:
      "An interactive space exploration website with immersive visuals, parallax effects, and educational content about the cosmos.",
    image: "/og-image.jpg",
    video: "/video/xspace.mp4",
    demoUrl: "https://x-space-pied.vercel.app/",
  },
  {
    id: 5,
    title: "E-Commerce Platform",
    description:
      "A full-featured e-commerce web application with product listings, cart functionality, user authentication, and Stripe payment processing.",
    image: "/Ecommerce web app.png",
    video: undefined,
    demoUrl: "https://prisma-ecommerce-website.vercel.app/login",
  },
  {
    id: 6,
    title: "Mock CBT Software",
    description:
      "A mock-based CBT prep tool that trains students using recent past questions and provides a realistic exam simulation. Built for Landmark University, Nigeria.",
    image: "/cbt pic.png",
    video: undefined,
    demoUrl: "https://x.com/JAideloje47355/status/1929314900846756165",
  },
  {
    id: 7,
    title: "My Portfolio",
    description:
      "A modern, interactive portfolio website built with Next.js 15 and Framer Motion, featuring smooth scroll animations and dynamic project showcases.",
    image: "/porfolio pic.png",
    video: undefined,
    demoUrl: "https://josiah-portfolio1.vercel.app/",
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
        { publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY! },
      )
      .then(
        () => {
          setSubmitStatus("success");
          setFormData({ user_name: "", user_email: "", message: "" });
        },
        () => {
          setSubmitStatus("error");
        },
      )
      .finally(() => setIsSubmitting(false));
  };

  const isInView = useInView(ref, { margin: "-100px", once: false });

  useEffect(() => {
    if (isInView) {
      setShowForm(false);
      setAnimationKey((prev) => prev + 1);
      const timer = setTimeout(() => setShowForm(true), 4000);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  useEffect(() => {
    if (submitStatus === "success") {
      const timer = setTimeout(() => setSubmitStatus("idle"), 3000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  return (
    <div
      className="text-white flex items-center justify-center py-8 sm:py-12 lg:py-16 px-4 contact-slide min-h-screen"
      ref={ref}>
      <div className="w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: false }}
            className="space-y-12 lg:flex lg:flex-col justify-center">
            <div>
              <p className="text-[#00FF9B] text-[11px] font-mono tracking-[0.3em] uppercase mb-5">
                Get in touch
              </p>
              <h1 className="text-6xl lg:text-7xl font-black leading-[0.95] tracking-tight mb-4">
                Let&apos;s work
                <br />
                <span className="text-[#00FF9B]">together.</span>
              </h1>
            </div>
            <div className="space-y-7">
              {[
                { label: "Mail", value: "josiahaideloje2@gmail.com" },
                { label: "Location", value: "Lagos, Nigeria" },
                { label: "Phone", value: "+2347042135699" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-[10px] font-mono text-gray-600 tracking-[0.25em] uppercase mb-1">
                    {label}
                  </p>
                  <p className="text-white font-medium text-sm">{value}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — phone anim → form */}
          <div className="flex flex-col items-center justify-center relative min-h-[420px]">
            <motion.div
              key={`phone-${animationKey}`}
              className="absolute flex items-center justify-center z-10"
              initial={{ opacity: 1, zIndex: 10 }}
              animate={{
                opacity: showForm ? 0 : 1,
                zIndex: showForm ? -1 : 10,
              }}
              transition={{ delay: 3, duration: 1 }}>
              <svg
                width="420px"
                height="420px"
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
                  animate={{ pathLength: 1, opacity: 1 }}
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
                  animate={{ pathLength: 1, opacity: 1 }}
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

            <motion.form
              ref={form}
              key={`form-${animationKey}`}
              onSubmit={handleSubmit}
              className="w-full space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: showForm ? 1 : 0 }}
              transition={{ duration: 1 }}>
              {[
                { type: "text", name: "user_name", placeholder: "Your name" },
                {
                  type: "email",
                  name: "user_email",
                  placeholder: "Your email",
                },
              ].map((field) => (
                <input
                  key={field.name}
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name as keyof typeof formData]}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-5 py-4 bg-white/[0.03] border border-white/[0.07] rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-[#00FF9B]/50 transition-colors text-sm"
                />
              ))}
              <textarea
                name="message"
                placeholder="Tell me about your project..."
                rows={5}
                value={formData.message}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
                className="w-full px-5 py-4 bg-white/[0.03] border border-white/[0.07] rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-[#00FF9B]/50 transition-colors resize-none text-sm"
              />
              {submitStatus === "success" && (
                <p className="text-[#00FF9B] text-center font-semibold text-sm">
                  Message sent! I&apos;ll get back to you soon 🎉
                </p>
              )}
              {submitStatus === "error" && (
                <p className="text-red-400 text-center font-semibold text-sm">
                  Failed to send. Please try again.
                </p>
              )}
              <motion.button
                type="submit"
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.97 }}
                disabled={isSubmitting}
                className={`w-full py-4 font-bold rounded-xl text-sm transition-colors ${
                  isSubmitting
                    ? "bg-white/5 text-gray-600 cursor-not-allowed"
                    : "bg-[#00FF9B] text-black hover:bg-white cursor-pointer"
                }`}>
                {isSubmitting ? "Sending..." : "Send Message →"}
              </motion.button>
            </motion.form>
          </div>
        </div>
      </div>
    </div>
  );
};
