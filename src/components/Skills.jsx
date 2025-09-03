import { motion } from 'framer-motion'
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


const skillVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
}

const skillItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const SkillCard = ({ name, icon }) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center p-4 rounded-xl bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-xl border-2 border-cyan-500/10 hover:border-cyan-500/30 transition-all duration-300"
      whileHover={{ 
        scale: 1.05,
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

const InfiniteLoopSlider = ({ children, duration, reverse = false }) => {
  return (
    <div className="loop-slider" style={{
      '--duration': `${duration}ms`,
      '--direction': reverse ? 'reverse' : 'normal'
    }}>
      <div className="inner">
        {children}
        {children}
      </div>
    </div>
  )
}

export default function Skills() {
  const row1 = technologies.slice(0, 7)
  const row2 = technologies.slice(7, 14)
  const row3 = technologies.slice(14, 21)

  return (
    <motion.section
      id="skills"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 sm:px-8 lg:px-12 pt-20 pb-24 scroll-mt-24 bg-gradient-to-br from-black via-gray-900 to-black"
      variants={skillVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.h2
        className="text-4xl sm:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-16"
        variants={skillItemVariants}
      >
        Tech <span className="text-white">Stack</span>
      </motion.h2>

      <div className="w-full max-w-5xl overflow-hidden">
        <motion.div 
          className="relative w-full flex flex-col gap-4"
          variants={skillItemVariants}
        >
          <div className="flex -mx-4 animate-scroll">
            <InfiniteLoopSlider duration={25000}>
              <div className="flex gap-4 px-4">
                {row1.map((tech) => (
                  <div key={tech.name} className="flex-shrink-0 w-48">
                    <SkillCard {...tech} />
                  </div>
                ))}
              </div>
            </InfiniteLoopSlider>
          </div>

          <div className="flex -mx-4 animate-scroll">
            <InfiniteLoopSlider duration={30000} reverse={true}>
              <div className="flex gap-4 px-4">
                {row2.map((tech) => (
                  <div key={tech.name} className="flex-shrink-0 w-48">
                    <SkillCard {...tech} />
                  </div>
                ))}
              </div>
            </InfiniteLoopSlider>
          </div>

          <div className="flex -mx-4 animate-scroll">
            <InfiniteLoopSlider duration={20000}>
              <div className="flex gap-4 px-4">
                {row3.map((tech) => (
                  <div key={tech.name} className="flex-shrink-0 w-48">
                    <SkillCard {...tech} />
                  </div>
                ))}
              </div>
            </InfiniteLoopSlider>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}