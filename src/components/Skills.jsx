import { motion } from 'framer-motion'
import InteractiveLoopSlider from './InteractiveLoopSlider'
import { ScrollSection, RevealHeading, Reveal, StaggerGroup } from './ScrollReveal'
import { FaPython, FaRobot, FaReact, FaNodeJs, FaGitAlt, FaFigma, FaJsSquare } from 'react-icons/fa'
import {
  SiTailwindcss, SiMongodb, SiNextdotjs, SiBootstrap, SiAdobexd,
  SiGooglecolab, SiStreamlit, SiFirebase, SiTypescript,
  SiWordpress, SiWoocommerce, SiShopify, SiN8N
} from 'react-icons/si'

const technologies = [
  { name: 'JavaScript', icon: <FaJsSquare /> },
  { name: 'Python', icon: <FaPython /> },
  { name: 'Artificial Intelligence', icon: <FaRobot /> },
  { name: 'Node.js', icon: <FaNodeJs /> },
  { name: 'MongoDB', icon: <SiMongodb /> },
  { name: 'TypeScript', icon: <SiTypescript /> },
  { name: 'React', icon: <FaReact /> },
  { name: 'Next.js', icon: <SiNextdotjs /> },
  { name: 'Express', icon: <FaNodeJs /> },
  { name: 'Google Colab', icon: <SiGooglecolab /> },
  { name: 'Firebase', icon: <SiFirebase /> },
  { name: 'Streamlit', icon: <SiStreamlit /> },
  { name: 'Bootstrap', icon: <SiBootstrap /> },
  { name: 'Tailwind CSS', icon: <SiTailwindcss /> },
  { name: 'Figma', icon: <FaFigma /> },
  { name: 'Git', icon: <FaGitAlt /> },
  { name: 'Adobe XD', icon: <SiAdobexd /> },
  { name: 'WordPress', icon: <SiWordpress /> },
  { name: 'WooCommerce', icon: <SiWoocommerce /> },
  { name: 'Shopify', icon: <SiShopify /> },
  { name: 'n8n', icon: <SiN8N /> },
]

const SkillCard = ({ name, icon }) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center p-4 rounded-xl bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-xl border-2 border-cyan-500/10 hover:border-cyan-500/30 transition-all duration-300"
      whileHover={{
        scale: 1.02,
        boxShadow: "0 0 25px rgba(6, 182, 212, 0.2)",
      }}
    >
      <motion.div
        className="text-4xl text-cyan-400 mb-2"
        whileHover={{
          rotate: [0, -10, 10, 0],
          transition: { duration: 0.5 }
        }}
      >
        {icon}
      </motion.div>
      <p className="text-sm text-gray-300 font-medium">{name}</p>
    </motion.div>
  )
}

export default function Skills() {
  const row1 = technologies.slice(0, 7)
  const row2 = technologies.slice(7, 14)
  const row3 = technologies.slice(14, 21)

  const rows = [
    { key: 'row1', duration: 25000, reverse: false, items: row1 },
    { key: 'row2', duration: 30000, reverse: true, items: row2 },
    { key: 'row3', duration: 20000, reverse: false, items: row3 },
  ]

  return (
    <ScrollSection
      id="skills"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 sm:px-8 lg:px-12 pt-20 pb-24 scroll-mt-24 bg-gradient-to-br from-black via-gray-900 to-black"
    >
      <RevealHeading className="w-full">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-16">
          Tech <span className="text-white">Stack</span>
        </h2>
      </RevealHeading>

      <StaggerGroup className="w-full max-w-5xl flex flex-col gap-4">
        {rows.map(({ key, duration, reverse, items }) => (
          <Reveal key={key} className="w-full">
            <InteractiveLoopSlider
              duration={duration}
              reverse={reverse}
              innerClassName="flex gap-4 px-4"
            >
              {items.map((tech) => (
                <div key={tech.name} className="flex-shrink-0 w-48">
                  <SkillCard {...tech} />
                </div>
              ))}
            </InteractiveLoopSlider>
          </Reveal>
        ))}
      </StaggerGroup>
    </ScrollSection>
  )
}
