import { useState, useEffect, lazy, Suspense } from "react";
import { motion, useReducedMotion } from "framer-motion";
const ParticleBackground = lazy(() => import("./ParticleBackground"));
import { useScrollAnimation } from "../context/ScrollAnimationContext";
import {
  heroContainer,
  heroSlide,
  heroFade,
  heroSlideReduced,
  heroFadeReduced,
} from "../motion/variants";

const buildItems = [
  "Websites & applications",
  "AI & API integrations",
  "n8n automation & SaaS",
];

function AboutCard({ className = "" }) {
  return (
    <aside
      className={`rounded-2xl border border-cyan-500/25 bg-[#0b1220] p-4 shadow-[0_0_40px_rgba(6,182,212,0.12)] ${className}`}
    >
      <div className="flex items-center justify-between gap-4">
        <p className="text-[10px] tracking-[0.2em] uppercase text-cyan-400/90 font-semibold">
          A little about me
        </p>
        <div className="mr-1 h-[4.15rem] w-[3.15rem] shrink-0 overflow-hidden rounded-t-[999px] rounded-b-xl border border-cyan-400/35 bg-gradient-to-b from-cyan-800 to-[#07131a] shadow-[0_8px_18px_rgba(6,182,212,0.22)] sm:mr-1.5 sm:h-[4.4rem] sm:w-[3.35rem]">
          <img
            src="/profile-card.jpg"
            alt=""
            width={64}
            height={80}
            className="h-full w-full object-cover object-[center_10%]"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
      <p className="mt-3 text-[13px] sm:text-sm text-slate-200 leading-relaxed">
        Hi, I&apos;m Bilal - a full stack and AI developer building modern digital experiences.
      </p>
      <a
        href="#about"
        className="mt-3 inline-block text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors underline underline-offset-4 decoration-cyan-500/40"
      >
        More about me
      </a>
    </aside>
  );
}

function BuildCard({ className = "" }) {
  return (
    <aside
      className={`rounded-2xl border border-white/10 bg-black p-4 shadow-[0_0_40px_rgba(0,0,0,0.45)] ${className}`}
    >
      <p className="text-[10px] tracking-[0.2em] uppercase text-cyan-400 font-semibold border-b border-cyan-400/25 pb-2.5">
        What I build
      </p>
      <ul>
        {buildItems.map((item, index) => (
          <li
            key={item}
            className={`flex items-center gap-2.5 py-2.5 text-[13px] sm:text-sm text-slate-200 ${
              index === buildItems.length - 1 ? "" : "border-b border-cyan-400/25"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </aside>
  );
}

function MadeCard({ className = "" }) {
  return (
    <a
      href="#projects"
      className={`block rounded-xl border border-cyan-400/40 bg-gradient-to-br from-cyan-400 to-cyan-500 text-black p-3.5 text-center min-[880px]:text-left shadow-[0_12px_40px_rgba(6,182,212,0.35)] transition-transform duration-300 hover:brightness-105 ${className}`}
    >
      <p className="text-[10px] tracking-[0.18em] uppercase font-bold opacity-80">
        What I&apos;ve made
      </p>
      <p className="mt-1 text-sm font-bold leading-snug">
        Explore selected projects
      </p>
    </a>
  );
}

export default function Hero({ startAnimation = true }) {
  const reduceMotion = useReducedMotion();
  const { heroPhase, resetHeroPhase } = useScrollAnimation();
  const slide = reduceMotion ? heroSlideReduced : heroSlide;
  const fade = reduceMotion ? heroFadeReduced : heroFade;
  const [heroKey, setHeroKey] = useState(0);
  const [ready, setReady] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (startAnimation) {
      setReady(true);
      setShowContent(true);
    }
  }, [startAnimation]);

  useEffect(() => {
    if (heroPhase === "hidden") {
      setShowContent(false);
    }
  }, [heroPhase]);

  useEffect(() => {
    if (heroPhase === "replay") {
      setHeroKey((k) => k + 1);
      setShowContent(true);
      resetHeroPhase();
    }
  }, [heroPhase, resetHeroPhase]);

  return (
    <section
      id="home"
      className="relative min-h-[100svh] min-[880px]:h-[100svh] flex flex-col text-white overflow-x-hidden min-[880px]:overflow-hidden scroll-mt-24 pt-24 sm:pt-[6.25rem] pb-5 sm:pb-6"
    >
      <div className="absolute inset-0 -z-10">
        <Suspense fallback={null}>
          <ParticleBackground />
        </Suspense>
      </div>

      <div className="pointer-events-none absolute inset-0 -z-[5] bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.08)_0%,transparent_55%),linear-gradient(to_bottom,rgba(0,0,0,0.35)_0%,transparent_28%,transparent_72%,rgba(0,0,0,0.8)_100%)]" />

      {ready && showContent && (
        <motion.div
          key={heroKey}
          className="relative z-10 flex flex-1 flex-col min-h-0 w-full max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          variants={heroContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Top status */}
          <motion.div
            variants={fade}
            className="shrink-0 flex items-start justify-between gap-3 mb-2 sm:mb-3 text-[9px] min-[400px]:text-[10px] sm:text-[11px] lg:text-xs tracking-[0.08em] sm:tracking-[0.14em] lg:tracking-[0.18em] uppercase text-cyan-300/80 font-medium"
          >
            <p className="flex items-center gap-1.5 sm:gap-2 shrink-0 whitespace-nowrap">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Independent Developer
            </p>
            <p className="text-right leading-tight max-w-[48%]">
              Available for project inquiries.
            </p>
          </motion.div>

          {/*
            Locked composition frame:
            same visual proportions on laptop + large monitors
            (height capped so ultra-wide/tall screens don't stretch cards apart)
          */}
          <div className="relative flex-1 min-h-0 flex items-center justify-center">
            <div className="hero-stage relative w-full overflow-hidden">
              <motion.h1
                variants={slide}
                aria-label="Developer"
                className="hero-wordmark pointer-events-none absolute inset-x-0 top-[6%] w-full text-center font-[Syne,sans-serif] font-extrabold leading-none text-white/[0.055] select-none uppercase z-0 whitespace-nowrap"
              >
                Developer
              </motion.h1>

              {/* Portrait — centered in frame */}
              <motion.div
                variants={slide}
                className="absolute inset-0 z-10 flex items-end justify-center pointer-events-none pb-2"
              >
                <div className="relative hero-portrait h-[92%] max-h-full">
                  <picture>
                    <source srcSet="/profile.webp" type="image/webp" />
                    <img
                      src="/profile.png"
                      alt="M Bilal Waleed — Full Stack and AI Developer"
                      width={720}
                      height={930}
                      className="h-full w-auto max-w-[min(72vw,300px)] min-[880px]:max-w-[280px] lg:max-w-[340px] xl:max-w-[360px] object-contain object-bottom mx-auto"
                      loading="eager"
                      fetchPriority="high"
                      decoding="async"
                    />
                  </picture>
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black via-black/65 to-transparent" />
                </div>
              </motion.div>

              {/* Desktop side cards */}
              <motion.div
                variants={slide}
                className="hidden min-[880px]:block absolute inset-0 z-20 pointer-events-none"
              >
                <div className="pointer-events-auto absolute left-0 bottom-8 w-[268px] lg:w-[320px] xl:w-[360px]">
                  <AboutCard />
                </div>

                <div className="pointer-events-auto absolute right-0 bottom-8 w-[220px] xl:w-[236px] flex flex-col gap-7">
                  <BuildCard />
                  <MadeCard className="ml-auto w-[92%] -rotate-[4deg] hover:-rotate-[2deg]" />
                </div>
              </motion.div>
            </div>
          </div>

          {/* Mobile / tablet cards — same visual language as desktop */}
          <motion.div
            variants={slide}
            className="min-[880px]:hidden shrink-0 grid grid-cols-1 gap-3 mb-4 mt-3"
          >
            <AboutCard className="h-full" />
            <div className="flex flex-col gap-3 h-full">
              <BuildCard className="flex-1" />
              <MadeCard className="w-full" />
            </div>
          </motion.div>

          {/* Bottom band */}
          <motion.div
            variants={fade}
            className="shrink-0 grid grid-cols-1 min-[880px]:grid-cols-[1fr_auto_1fr] items-center gap-4 pt-2 sm:pt-3"
          >
            <p className="font-[Syne,sans-serif] font-bold text-base sm:text-lg lg:text-xl tracking-tight text-white leading-snug text-center min-[880px]:text-left justify-self-center min-[880px]:justify-self-start">
              <span className="block whitespace-nowrap">Building digital experiences</span>
              <span className="block whitespace-nowrap">that matter.</span>
            </p>

            <div className="flex flex-row flex-wrap items-center justify-center gap-3">
              <a
                href="#contact"
                className="inline-flex items-center justify-center min-w-[9.75rem] px-5 py-2.5 rounded-lg text-sm font-semibold text-black bg-cyan-400 hover:bg-cyan-300 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-black"
              >
                Let&apos;s work together
              </a>
              <a
                href="https://drive.google.com/file/d/1Ul77b5PJqovdTHt_iDGoPooC8fMSz7DS/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center min-w-[9.75rem] px-5 py-2.5 rounded-lg text-sm font-semibold text-white border border-cyan-400/40 bg-transparent hover:bg-cyan-400/10 transition-colors duration-300"
              >
                View resume
              </a>
            </div>

            <a
              href="#about"
              className="hidden min-[880px]:flex items-center justify-self-end gap-2 text-[10px] tracking-[0.2em] uppercase text-cyan-400/70 hover:text-cyan-300 transition-colors"
            >
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Scroll to explore
            </a>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
