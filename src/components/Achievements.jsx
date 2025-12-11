import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMedal } from 'react-icons/fa';

const achievements = [
  {
    title: "Saylani Mass IT Training Hackathon 2025",
    description: "Participated in the Saylani Mass IT Training Hackathon 2025, collaborating on innovative Full-Stack development challenges to showcase coding skills and problem-solving abilities.",
    images: ['/achieve5 (3).png', '/healthmate.png', '/achieve5 (1).png'],
  },
  {
    title: "CodSoft Web Development Internship",
    description: "Completed a Web development internship at CodSoft, working on real-world projects using React, JavaScript, and modern UI/UX practices to build responsive web applications.",
    images: ['/codesoft.png'],
  },
  {
    title: "Saylani Mass IT Training Hackathon 2024",
    description: "Participated in the Saylani Mass IT Training Hackathon 2024, collaborating on innovative Front-End development challenges to showcase coding skills and problem-solving abilities.",
    images: ['/achieve1.png', '/achieve2.png', '/achieve3.png'],
  }
];

const cardVariants = {
  initial: { opacity: 0, y: 40, scale: 0.96 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: "easeOut" } },
  exit: { opacity: 0, y: -40, scale: 0.96, transition: { duration: 0.5, ease: "easeIn" } },
};

function AchievementCard({ achievement, index }) {
  const [imgIndex, setImgIndex] = useState(0);
  const hasMultipleImages = achievement.images.length > 1;

  useEffect(() => {
    if (!hasMultipleImages) return;
    
    const timer = setTimeout(() => {
      setImgIndex((prev) => (prev + 1) % achievement.images.length);
    }, 2600);
    return () => clearTimeout(timer);
  }, [imgIndex, hasMultipleImages, achievement.images.length]);

  return (
    <motion.div
      className="relative w-full max-w-sm mx-auto"
      variants={cardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      custom={index}
      transition={{ delay: index * 0.1 }} // Stagger effect
    >
      <div
        className="relative rounded-2xl overflow-hidden shadow-xl border-2 border-transparent group h-full flex flex-col"
        style={{
          background: 'linear-gradient(120deg, rgba(6,182,212,0.14) 0%, rgba(255,255,255,0.06) 100%)',
          backdropFilter: 'blur(18px)',
        }}
      >
        {/* Animated border overlay */}
        <span
          className="pointer-events-none absolute inset-0 z-10 rounded-2xl border-2 border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
          style={{
            boxShadow: '0 0 24px 0 #22d3ee88, 0 0 0 4px #22d3ee22',
            borderImage: 'linear-gradient(100deg, #06b6d4 0%, #fff 100%) 1',
          }}
        />

        {/* Image Section */}
        <div className="relative h-56 w-full bg-black/40 flex items-center justify-center overflow-hidden">
          {!hasMultipleImages ? (
            <div className="absolute inset-0">
              <img
                src={achievement.images[0]}
                alt={achievement.title}
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
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                >
                  <img
                    src={achievement.images[imgIndex]}
                    alt={achievement.title}
                    className="object-cover object-center w-full h-full"
                    style={{ borderRadius: '1rem' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                </motion.div>
              </AnimatePresence>
              
              {/* Carousel dots */}
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

        {/* Content */}
        <div className="relative z-20 p-6 flex flex-col items-center text-center flex-grow bg-gradient-to-t from-black/60 via-black/30 to-transparent">
          <motion.div
            whileHover={{ scale: 1.15, rotate: [0, -10, 10, 0] }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="mb-3"
          >
            <FaMedal className="text-4xl text-yellow-400 drop-shadow-glow" />
          </motion.div>
          <h3 className="text-cyan-100 text-lg mb-2 line-clamp-2 font-bold leading-tight">
            {achievement.title}
          </h3>
          <p className="text-gray-300 text-sm line-clamp-4">{achievement.description}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Achievements() {
  return (
    <motion.section
      id="achievements"
      className="relative flex flex-col items-center justify-center px-4 sm:px-8 lg:px-12 py-20 scroll-mt-24 bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.1 }}
    >
      <motion.h2
        className="text-4xl sm:text-5xl font-extrabold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-white"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.7 } }}
      >
        <span className="bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-6">Achievements</span>
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto w-full">
        {achievements.map((achievement, index) => (
          <AchievementCard key={index} achievement={achievement} index={index} />
        ))}
      </div>

      {/* Custom drop-shadow for medal */}
      <style jsx global>{`
        .drop-shadow-glow {
          filter: drop-shadow(0 0 8px #22d3ee) drop-shadow(0 0 2px #06b6d4);
        }
      `}</style>
    </motion.section>
  );
}