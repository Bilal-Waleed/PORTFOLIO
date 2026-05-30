import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import ParticleBackground from "./ParticleBackground";
import { useScrollAnimation } from "../context/ScrollAnimationContext";
import {
  heroContainer,
  heroTextGroup,
  heroSlide,
  heroFade,
  heroSlideReduced,
  heroFadeReduced,
} from "../motion/variants";

const roles = [
  "MERN Stack Developer",
  "Next.js Developer",
  "AI Web Application Developer",
  "AI Workflow Automation Developer (n8n)",
  "WordPress & Shopify Developer"
];

const Typewriter = ({ roles, active }) => {
  const [currentRole, setCurrentRole] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!active) {
      setText("");
      setCurrentRole(0);
      setIsDeleting(false);
      return;
    }
    const role = roles[currentRole];
    let timeout;

    if (isDeleting) {
      timeout = setTimeout(() => {
        setText(role.substring(0, text.length - 1));
      }, 40);
    } else {
      timeout = setTimeout(() => {
        setText(role.substring(0, text.length + 1));
      }, 80);
    }

    if (!isDeleting && text === role) {
      timeout = setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && text === "") {
      setIsDeleting(false);
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, currentRole, roles, active]);

  return (
    <span className="text-cyan-400 font-medium whitespace-nowrap">
      {text}
      <motion.span
        className="inline-block w-0.5 h-6 sm:h-7 bg-cyan-400 ml-1"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
      />
    </span>
  );
};

export default function Hero({ startAnimation = true }) {
  const reduceMotion = useReducedMotion();
  const { heroPhase, resetHeroPhase } = useScrollAnimation();
  const slide = reduceMotion ? heroSlideReduced : heroSlide;
  const fade = reduceMotion ? heroFadeReduced : heroFade;
  const [heroKey, setHeroKey] = useState(0);
  const [ready, setReady] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [typewriterActive, setTypewriterActive] = useState(false);

  useEffect(() => {
    if (startAnimation) {
      setReady(true);
      setShowContent(true);
    }
  }, [startAnimation]);

  useEffect(() => {
    if (heroPhase === "hidden") {
      setShowContent(false);
      setTypewriterActive(false);
    }
  }, [heroPhase]);

  useEffect(() => {
    if (heroPhase === "replay") {
      setHeroKey((k) => k + 1);
      setShowContent(true);
      resetHeroPhase();
    }
  }, [heroPhase, resetHeroPhase]);

  useEffect(() => {
    if (!showContent) {
      setTypewriterActive(false);
      return;
    }
    setTypewriterActive(false);
    const delay = reduceMotion ? 200 : 750;
    const t = setTimeout(() => setTypewriterActive(true), delay);
    return () => clearTimeout(t);
  }, [showContent, heroKey, reduceMotion]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center text-white px-4 sm:px-6 lg:px-8 overflow-hidden scroll-mt-24"
    >
      <div className="absolute inset-0 -z-10">
        <ParticleBackground />
      </div>

      {ready && showContent && (
        <motion.div
          key={heroKey}
          className="relative flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-16 max-w-6xl w-full z-10"
          variants={heroContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={slide} className="flex-shrink-0">
            <Tilt
              tiltMaxAngleX={10}
              tiltMaxAngleY={10}
              perspective={1000}
              scale={1.03}
              transitionSpeed={2000}
              gyroscope={true}
              className="w-48 h-48 sm:w-64 sm:h-64 lg:w-72 lg:h-72"
            >
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-cyan-500/50 shadow-xl shadow-cyan-500/20 relative group">
                <img
                  src="/pic.jpg"
                  alt="bilal"
                  className="w-full h-full object-cover"
                  loading="eager"
                  fetchPriority="high"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
              </div>
            </Tilt>
          </motion.div>

          <motion.div
            className="flex flex-col items-center md:items-start text-center md:text-left max-w-lg -mt-6 md:-mt-10 w-full"
            variants={heroTextGroup}
          >
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-2 leading-tight"
              variants={slide}
            >
              Hi, I&apos;m{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Bilal
              </span>
            </motion.h1>

            <motion.div
              className="mb-5 min-h-9 sm:min-h-10 lg:min-h-12 flex items-center text-xl sm:text-2xl lg:text-3xl text-gray-300 overflow-hidden w-full"
              variants={slide}
            >
              <Typewriter roles={roles} active={typewriterActive} />
            </motion.div>

            <motion.div
              className="min-h-[52px] flex items-center justify-center md:justify-start w-full"
              variants={fade}
            >
              <a
                href="https://drive.google.com/file/d/1Z9sAS7H4bcQVoYvUugcw09zj_GgMaRfi/view?usp=sharing"
                download="Bilal Waleed Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center justify-center px-7 py-3 rounded-lg font-semibold text-white bg-transparent border-2 border-cyan-400 overflow-hidden group transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-black hover:scale-[1.03] active:scale-[0.98]"
              >
                <span className="absolute inset-0 bg-cyan-400/20 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out z-0" />
                <span className="relative z-10">View My Resume</span>
              </a>
            </motion.div>

            <motion.div className="mt-4 min-h-[20px] w-full" variants={fade}>
              <p
                style={{
                  fontFamily: '"Roboto Mono", monospace',
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "20px",
                  color: "rgb(56, 189, 248)",
                }}
              >
                Currently available for{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  freelance
                </span>
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
