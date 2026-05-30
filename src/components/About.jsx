import { motion } from 'framer-motion';
import { FaGraduationCap, FaLaptopCode, FaSchool } from 'react-icons/fa';
import { ScrollSection, RevealHeading, Reveal, StaggerGroup } from './ScrollReveal';

const cards = [
  {
    icon: <FaSchool />,
    title: 'University of Karachi',
    subtitle: "I'm doing bachelor's in software engineering from UBIT",
    details: ' 2026 - Present',
  },
  {
    icon: <FaLaptopCode />,
    title: 'Cloud Applied Generative AI Engineer',
    subtitle: 'Generative AI Engineer from PIAIC',
    details: ' 2024 - Present',
  },
  {
    icon: <FaGraduationCap />,
    title: 'Web and App Development',
    subtitle: 'MERN-Stack & Next.js Development from SMIT ',
    details: ' 2024 - 2025',
  },
];

const cardVariants = {
  initial: {
    scale: 1,
    y: 0,
    boxShadow: "0 4px 24px 0 rgba(6,182,212,0.10)",
  },
  hover: {
    scale: 1.04,
    y: -8,
    transition: { duration: 0.33, ease: "easeOut" }
  },
  float: {
    y: [0, -6, 0, 6, 0],
    transition: {
      repeat: Infinity,
      duration: 5,
      ease: "easeInOut"
    }
  }
};

const iconVariants = {
  initial: { scale: 1, filter: 'drop-shadow(0 0 0 #22d3ee)' },
  hover: {
    scale: 1.19,
    filter: 'drop-shadow(0 0 12px #22d3ee)',
    transition: { duration: 0.38, ease: "easeInOut" }
  }
};

export default function About() {
  return (
    <ScrollSection
      id="about"
      className="relative flex flex-col items-center justify-center min-h-screen text-white px-6 sm:px-8 lg:px-12 pt-20 pb-24 scroll-mt-24 bg-gradient-to-br from-black via-gray-900 to-black"
    >
      <RevealHeading className="w-full">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-6">
          About <span className="text-white">Me</span>
        </h2>
      </RevealHeading>

      <Reveal className="w-full">
        <p className="max-w-4xl mx-auto text-center text-gray-300 text-lg sm:text-xl mb-16 font-light tracking-wide leading-relaxed">
          I am Bilal, a passionate MERN-Stack Developer, Next.js developer or AI web developer and SaaS website developer or exploring generative AI. I thrive on building scalable web applications and exploring the latest technologies.
        </p>
      </Reveal>

      <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-4xl">
      {cards.map((card) => (
        <Reveal key={card.title}>
            <motion.div
              className="relative group cursor-pointer overflow-hidden rounded-2xl border-2 border-transparent px-7 py-8 flex flex-col items-center justify-center text-center transition-all duration-300 bg-gradient-to-br from-cyan-900/20 to-blue-900/10 backdrop-blur-xl h-full"
              variants={cardVariants}
              initial="initial"
              whileHover="hover"
              animate="float"
            >
              <span
                className="pointer-events-none absolute inset-0 z-10 rounded-2xl border-2 border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  boxShadow: '0 0 24px 0 #22d3ee88, 0 0 0 4px #22d3ee22',
                  borderImage: 'linear-gradient(100deg, #06b6d4 0%, #3b82f6 100%) 1'
                }}
              />
              <span className="absolute inset-0 pointer-events-none z-0 animate-shimmer opacity-0 group-hover:opacity-60 transition-opacity duration-300" />

              <motion.div
                variants={iconVariants}
                className="relative z-20 flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-gradient-to-br from-cyan-500/30 to-blue-500/20 shadow-lg group-hover:shadow-cyan-400/30 transition-all duration-300"
              >
                <span className="text-cyan-300 text-3xl group-hover:text-cyan-100 transition-all duration-300">
                  {card.icon}
                </span>
              </motion.div>

              <h3 className="text-xl font-bold text-white mb-1 relative z-20 drop-shadow">
                {card.title}
              </h3>
              <p className="text-sm text-gray-300 mb-1.5 relative z-20 font-medium">
                {card.subtitle}
              </p>
              <p className="text-xs font-semibold text-cyan-400 relative z-20">
                {card.details}
              </p>
            </motion.div>
        </Reveal>
      ))}
      </StaggerGroup>
    </ScrollSection>
  );
}
