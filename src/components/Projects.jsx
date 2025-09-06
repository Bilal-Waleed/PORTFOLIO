import { motion, AnimatePresence } from 'framer-motion'
import { FaReact, FaNodeJs, FaGithub, FaExternalLinkAlt, FaHtml5, FaCss3 } from 'react-icons/fa'
import {
  SiMongodb, SiTailwindcss, SiJavascript, SiPython, SiStreamlit,
  SiNextdotjs, SiBootstrap, SiMui, SiReactquery, SiFirebase,
  SiTypescript, SiExpress, SiWordpress, SiShopify, SiN8N, SiWoocommerce
} from 'react-icons/si'
import { BsArrowUpRight } from 'react-icons/bs'
import { useState } from 'react'
import { projects } from './ProjectsData.jsx'

// --- Tech icons map ---
const technologies = {
  'ReactJs': { icon: <FaReact className="text-[#61DAFB]" />, name: 'React' },
  'NodeJS': { icon: <FaNodeJs className="text-[#339933]" />, name: 'Node.js' },
  'MongoDB': { icon: <SiMongodb className="text-[#47A248]" />, name: 'MongoDB' },
  'Python': { icon: <SiPython className="text-[#3776AB]" />, name: 'Python' },
  'Tailwind': { icon: <SiTailwindcss className="text-[#06B6D4]" />, name: 'Tailwind' },
  'HTML': { icon: <FaHtml5 className="text-[#E34F26]" />, name: 'HTML' },
  'CSS': { icon: <FaCss3 className="text-[#1572B6]" />, name: 'CSS' },
  'JavaScript': { icon: <SiJavascript className="text-[#F7DF1E]" />, name: 'JavaScript' },
  'Streamlit': { icon: <SiStreamlit className="text-[#FF4B4B]" />, name: 'Streamlit' },
  'NextJs': { icon: <SiNextdotjs className="text-[#000000]" />, name: 'Next.js' },
  'Bootstrap': { icon: <SiBootstrap className="text-[#7952B3]" />, name: 'Bootstrap' },
  'MUI': { icon: <SiMui className="text-[#007FFF]" />, name: 'MUI' },
  'TanStackQuery': { icon: <SiReactquery className="text-[#FF4154]" />, name: 'TanStack Query' },
  'Firebase': { icon: <SiFirebase className="text-[#FFCA28]" />, name: 'Firebase' },
  'TypeScript': { icon: <SiTypescript className="text-[#007ACC]" />, name: 'TypeScript' },
  'Express': { icon: <SiExpress className="text-[#F7DF1E]" />, name: 'Express' },
  'WordPress': { icon: <SiWordpress className="text-[#21759B]" />, name: 'WordPress' },
  'WooCommerce': { icon: <SiWoocommerce className="text-[#96588A]" />, name: 'WooCommerce' },
  'Shopify': { icon: <SiShopify className="text-[#96BF48]" />, name: 'Shopify' },
  'n8n': { icon: <SiN8N className="text-[#E87C60]" />, name: 'n8n' },
}

const DURATION = 40

const categories = [
  { label: 'All', value: 'all' },
  { label: 'Python', value: 'python' },
  { label: 'MERN/Next.js', value: 'mern' },
  { label: 'WordPress', value: 'wordpress' },
  { label: 'n8n', value: 'n8n' },
]

const getProjectType = (project) => {
  if (project.technologies.includes('n8n')) return 'n8n'
  if (project.technologies.includes('WordPress')) return 'wordpress'
  if (project.technologies.some(tech => ['ReactJs', 'NextJs', 'NodeJS', 'MongoDB', 'Express'].includes(tech))) return 'mern'
  if (project.technologies.includes('Python')) return 'python'
  return 'other'
}

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedProject, setSelectedProject] = useState(null)
  const [fullScreenMedia, setFullScreenMedia] = useState(null)

  const filteredProjects = projects.filter((project) => {
    if (selectedCategory === 'all') return true
    if (selectedCategory === 'python') return project.technologies.includes('Python')
    if (selectedCategory === 'mern') {
      return project.technologies.some(tech => ['ReactJs', 'NextJs', 'NodeJS', 'MongoDB', 'Express'].includes(tech))
    }
    if (selectedCategory === 'wordpress') return project.technologies.includes('WordPress')
    if (selectedCategory === 'n8n') return project.technologies.includes('n8n')
    return false
  })

  const displayProjects = filteredProjects.length > 0 ? [...filteredProjects, ...filteredProjects] : []

  return (
    <motion.section
      id="projects"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 sm:px-8 lg:px-12 py-16 bg-gradient-to-br from-black via-gray-900 to-black"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <h2 className="text-4xl sm:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-8">
        My <span className="text-white">Projects</span>
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:flex lg:flex-row flex-wrap justify-center gap-4 mb-8 max-w-4xl mx-auto">
        {categories.map((cat) => (
          <motion.button
            key={cat.value}
            onClick={() => setSelectedCategory(cat.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 border ${
              selectedCategory === cat.value
                ? 'bg-cyan-500 text-white border-cyan-500'
                : 'bg-white/10 text-cyan-400 border-cyan-500/20 hover:bg-cyan-500/20'
            }`}
            whileTap={{ scale: 0.95 }}
          >
            {cat.label}
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <div className="relative w-full max-w-6xl overflow-hidden py-8">
          <motion.div
            key={selectedCategory}
            className="flex gap-8"
            style={{ width: 'max-content' }}
            initial={{ x: '0%' }}
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'linear',
              duration: DURATION * (displayProjects.length / (projects.length * 2)),
            }}
          >
            {displayProjects.map((project, idx) => (
              <motion.div
                key={project.title + idx}
                className="relative w-[280px] sm:w-[300px] flex-shrink-0 bg-[#000000]/90 border-2 border-cyan-500/20 rounded-xl overflow-hidden shadow-[0_0_15px_rgba(6,182,212,0.15)] backdrop-blur-sm group transition-all duration-300 hover:scale-105 hover:border-cyan-400 cursor-pointer"
                onClick={() => setSelectedProject(project)}
                whileTap={{ scale: 0.95 }}
              >
                <div className="relative h-40 sm:h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="object-cover transition-transform duration-500 group-hover:scale-110 w-full h-full"
                    quality={90}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                    {project.title}
                    <motion.span
                      className="text-cyan-400"
                      animate={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
                    >
                      <BsArrowUpRight className="inline-block text-sm" />
                    </motion.span>
                  </h3>
                  <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.technologies.map((tech) => (
                      <div
                        key={tech}
                        className="flex items-center gap-1 bg-cyan-950/30 px-2 py-0.5 rounded-full border border-cyan-500/20"
                      >
                        <span className="text-base">
                          {technologies[tech].icon}
                        </span>
                        <span className="text-xs text-gray-300">
                          {technologies[tech].name}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    {project.live && (
                      <motion.a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 bg-cyan-500 hover:bg-cyan-600 text-white px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-300"
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaExternalLinkAlt className="text-xs" />
                        Live
                      </motion.a>
                    )}
                    {project.github && (
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-full text-sm font-medium border border-white/10 transition-colors duration-300"
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaGithub className="text-sm" />
                        Code
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatePresence>

      <div className="mt-6 flex gap-2 items-center text-cyan-400/60 text-sm font-medium">
        <motion.span
          animate={{ x: [-5, 0, -5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >←</motion.span>
        Auto-scrolling carousel
        <motion.span
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >→</motion.span>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="relative bg-[#000000]/90 border-2 border-cyan-500/30 rounded-xl overflow-hidden shadow-[0_0_20px_rgba(6,182,212,0.2)] max-w-4xl w-full mx-4 md:mx-0 flex flex-col md:flex-row"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                className="absolute top-4 right-4 bg-cyan-500 hover:bg-cyan-600 text-white rounded-full w-8 h-8 flex items-center justify-center z-20"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedProject(null)}
              >
                ✕
              </motion.button>

              <div className="relative w-full md:w-1/2 h-64 md:h-auto overflow-hidden group">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="object-cover w-full h-full"
                  quality={90}
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  {getProjectType(selectedProject) === 'wordpress' && selectedProject.fullImage && (
                    <motion.button
                      className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-full"
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setFullScreenMedia({ type: 'image', url: selectedProject.fullImage })}
                    >
                      View Full Page
                    </motion.button>
                  )}
                  {getProjectType(selectedProject) === 'n8n' && selectedProject.video && (
                    <motion.button
                      className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-full"
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setFullScreenMedia({ type: 'video', url: selectedProject.video })}
                    >
                      View Video
                    </motion.button>
                  )}
                </div>
              </div>

              <div className="p-6 w-full md:w-1/2 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">{selectedProject.title}</h3>
                  <p className="text-gray-300 mb-4">{selectedProject.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedProject.technologies.map((tech) => (
                      <div
                        key={tech}
                        className="flex items-center gap-1 bg-cyan-950/30 px-3 py-1 rounded-full border border-cyan-500/20"
                      >
                        <span className="text-lg">{technologies[tech].icon}</span>
                        <span className="text-sm text-gray-300">{technologies[tech].name}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {['python', 'mern'].includes(getProjectType(selectedProject)) && (
                  <div className="flex items-center gap-4">
                    {selectedProject.live && (
                      <motion.a
                        href={selectedProject.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-full font-medium transition-colors duration-300"
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaExternalLinkAlt />
                        Live
                      </motion.a>
                    )}
                    {selectedProject.github && (
                      <motion.a
                        href={selectedProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full font-medium border border-white/10 transition-colors duration-300"
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaGithub />
                        Code
                      </motion.a>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {fullScreenMedia && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setFullScreenMedia(null)}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              {fullScreenMedia.type === 'image' && (
                <img
                  src={fullScreenMedia.url}
                  alt="Full View"
                  className="max-w-full max-h-full object-contain cursor-zoom-in"
                  onClick={(e) => e.stopPropagation()}
                />
              )}
              {fullScreenMedia.type === 'video' && (
                <video
                  src={fullScreenMedia.url}
                  controls
                  className="max-w-full max-h-full"
                  onClick={(e) => e.stopPropagation()}
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  )
}