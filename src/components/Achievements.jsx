import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { FaMedal } from 'react-icons/fa';
import { ScrollSection, RevealHeading, Reveal } from './ScrollReveal';

const achievements = [
  // {
  //   title: "Saylani Mass IT Training Hackathon 2024",
  //   description: "Participated in the Saylani Mass IT Training Hackathon 2024, collaborating on innovative Front-End development challenges to showcase coding skills and problem-solving abilities.",
  //   images: ['/achieve1.png', '/achieve2.png', '/achieve3.png'],
  // },
  {
    title: "Agentic AI level 1 Developer Certificate",
    description: "Completed the Agentic AI Level 1 certificate by building projects with RAG, LangChain, CrewAI, and OpenAI.",
    images: ['/agentic.png'],
  },
  {
    title: "Revotic AI ML Internship Completion Certificate",
    description: "Finished an AI/ML internship at Revotic, building apps with Python, FastAPI, React, Next.js, and Hugging Face.",
    images: ['/revoticai certificate.png'],
  },
  {
    title: "Saylani Mass IT Training Hackathon 2025",
    description: "Joined the Saylani Mass IT Training Hackathon 2025 and built full-stack features with a team.",
    images: ['/achieve5 (3).png'],
  },
  {
    title: "CodSoft Web Development Internship",
    description: "Completed a CodSoft web internship, shipping responsive apps with React, JavaScript, and modern UI.",
    images: ['/codesoft.png'],
  },
  {
    title: "Saylani Mass IT Training Completion Certificate",
    description: "Completed Saylani Mass IT Training and built apps with React, Node.js, Next.js, MongoDB, and Tailwind.",
    images: ['/achieve6.png'],
  }
];

function AchievementCard({ achievement }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { amount: 0.2 });
  const [imgIndex, setImgIndex] = useState(0);
  const hasMultipleImages = achievement.images.length > 1;

  useEffect(() => {
    if (!hasMultipleImages || !isInView) return;

    const timer = setTimeout(() => {
      setImgIndex((prev) => (prev + 1) % achievement.images.length);
    }, 3200);
    return () => clearTimeout(timer);
  }, [imgIndex, hasMultipleImages, isInView, achievement.images.length]);

  return (
    <div ref={cardRef} className="relative w-full h-full">
      <div
        className="relative z-0 rounded-2xl overflow-hidden shadow-[0_0_15px_rgba(6,182,212,0.15)] border-2 border-cyan-500/20 group h-full flex flex-col transition-all duration-300 hover:z-10 hover:border-cyan-400"
        style={{
          background: 'linear-gradient(120deg, rgba(6,182,212,0.14) 0%, rgba(255,255,255,0.06) 100%)',
          backdropFilter: 'blur(18px)',
        }}
      >

        <div className="relative h-56 w-full bg-black/40 flex items-center justify-center overflow-hidden">
          {!hasMultipleImages ? (
            <div className="absolute inset-0">
              <img
                src={encodeURI(achievement.images[0])}
                alt={achievement.title}
                loading="lazy"
                decoding="async"
                className="object-cover object-center w-full h-full"
                style={{ borderRadius: '1rem' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            </div>
          ) : (
            <>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${achievement.title}-${imgIndex}`}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  <img
                    src={encodeURI(achievement.images[imgIndex])}
                    alt={achievement.title}
                    loading="lazy"
                    decoding="async"
                    className="object-cover object-center w-full h-full"
                    style={{ borderRadius: '1rem' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                </motion.div>
              </AnimatePresence>
              
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {achievement.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setImgIndex(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 border border-cyan-400/60 ${
                      i === imgIndex ? 'bg-cyan-400' : 'bg-white/20'
                    }`}
                    aria-label={`Go to image ${i + 1} for ${achievement.title}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="relative z-20 p-6 flex flex-col items-center text-center flex-grow bg-gradient-to-t from-black/60 via-black/30 to-transparent">
          <div className="mb-3">
            <FaMedal className="text-4xl text-yellow-400 drop-shadow-glow" />
          </div>
          <h3 className="text-cyan-100 text-lg mb-2 line-clamp-2 font-bold leading-tight">
            {achievement.title}
          </h3>
          <p className="text-gray-300 text-sm leading-6">{achievement.description}</p>
        </div>
      </div>
    </div>
  );
}

const ACHIEVEMENTS_INITIAL = 3

export default function Achievements() {
  const [showAll, setShowAll] = useState(false)
  const visibleAchievements = showAll
    ? achievements
    : achievements.slice(0, ACHIEVEMENTS_INITIAL)
  const hasMore = achievements.length > ACHIEVEMENTS_INITIAL

  return (
    <ScrollSection
      id="achievements"
      className="relative flex flex-col items-center justify-center py-20 scroll-mt-24 bg-gradient-to-br from-black via-gray-900 to-black"
    >
      <RevealHeading className="w-full max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-16">
          Achievements
        </h2>
      </RevealHeading>

      <Reveal className="w-full max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {visibleAchievements.map((achievement) => (
            <AchievementCard key={achievement.title} achievement={achievement} />
          ))}
        </div>

        {hasMore && (
          <div className="mt-8 sm:mt-10 flex justify-center">
            <motion.button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              className="text-cyan-400 hover:text-cyan-300 text-sm sm:text-base font-medium tracking-wide underline underline-offset-4 decoration-cyan-500/40 transition-colors"
              whileTap={{ scale: 0.97 }}
            >
              {showAll ? 'See less' : 'See more'}
            </motion.button>
          </div>
        )}
      </Reveal>
    </ScrollSection>
  );
}
