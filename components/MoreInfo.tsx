"use client";
import {
  motion,
  MotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, useEffect } from "react";

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

function ProjectSlide({
  id,
  title,
  description,
}: {
  id: number;
  title: string;
  description: string;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useParallax(scrollYProgress, 100);

  return (
    <section className="project-slide">
      <div ref={ref} className="project-content">
        {/* Left side - Image */}
        <div className="project-image">
          <img src={`/photos/cityscape/${id}.jpg`} alt={title} />
        </div>

        {/* Right side - Content */}
        <div className="project-info">
          <motion.h2
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            style={{ y }}>
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

export default function MoreInfo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container: containerRef,
    offset: ["end end", "start start"],
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

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

  const projects = [
    {
      id: 1,
      title: "AI Chat Platform",
      description:
        "Morning control cloud fairly captain stronger variety feet excitement matter sent lost hurried closely learn wonder planning poetry ten life national there orbit regular. Morning control cloud fairly captain stronger variety feet excitement matter sent.",
    },
    {
      id: 2,
      title: "React Commerce",
      description:
        "Morning control cloud fairly captain stronger variety feet excitement matter sent lost hurried closely learn wonder planning poetry ten life national there orbit regular. Morning control cloud fairly captain stronger variety feet excitement matter sent.",
    },
    {
      id: 3,
      title: "Data Analytics ",
      description:
        "Morning control cloud fairly captain stronger variety feet excitement matter sent lost hurried closely learn wonder planning poetry ten life national there orbit regular. Morning control cloud fairly captain stronger variety feet excitement matter sent.",
    },
    {
      id: 4,
      title: "Mobile App Suite",
      description:
        "Morning control cloud fairly captain stronger variety feet excitement matter sent lost hurried closely learn wonder planning poetry ten life national there orbit regular. Morning control cloud fairly captain stronger variety feet excitement matter sent.",
    },
    {
      id: 5,
      title: "Cloud Infrastructure",
      description:
        "Morning control cloud fairly captain stronger variety feet excitement matter sent lost hurried closely learn wonder planning poetry ten life national there orbit regular. Morning control cloud fairly captain stronger variety feet excitement matter sent.",
    },
  ];

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-y-auto bg-gray-900 z-50"
      style={{
        height: "100vh",
        overflowY: "auto",
        scrollSnapType: "y mandatory",
      }}>
      {/* Featured Works Header */}
      <div className="header-section">
        <h1 className="main-title">Featured Works</h1>
      </div>

      {/* Progress bar at top */}
      <motion.div className="progress mx-10" style={{ scaleX }} />

      {/* Project slides */}
      {projects.map((project) => (
        <ProjectSlide
          key={project.id}
          id={project.id}
          title={project.title}
          description={project.description}
        />
      ))}

      <StyleSheet />
    </div>
  );
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
            margin-bottom: 1.5rem;
            color: white;
            line-height: 1.1;
            letter-spacing: -1px;
        }

        .project-description {
            font-size: 1.1rem;
            line-height: 1.7;
            color: rgba(255, 255, 255, 0.7);
            margin-bottom: 2.5rem;
            max-width: 500px;
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
