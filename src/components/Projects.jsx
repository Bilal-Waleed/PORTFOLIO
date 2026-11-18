import { motion, AnimatePresence } from 'framer-motion'
import { ScrollSection, RevealHeading, Reveal } from './ScrollReveal'
import { FaReact, FaNodeJs, FaExternalLinkAlt, FaHtml5, FaCss3, FaRobot, FaDownload } from 'react-icons/fa'
import {
  SiMongodb, SiTailwindcss, SiJavascript, SiPython, SiStreamlit,
  SiNextdotjs, SiBootstrap, SiMui, SiReactquery, SiFirebase,
  SiTypescript, SiExpress, SiWordpress, SiShopify, SiN8N, SiWoocommerce, SiNeovim,
  SiFlutter, SiDart, SiVercel,
} from 'react-icons/si'
import { BsArrowUpRight } from 'react-icons/bs'
import { useState } from 'react'
import {
  projects,
  featuredProjects,
  PROJECT_CATEGORIES,
  PROJECTS_INITIAL,
  resolveProjectLink,
} from './ProjectsData.jsx'
import FeaturedProject from './FeaturedProject'

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
  'NextJs': { icon: <SiNextdotjs className="text-white" />, name: 'Next.js' },
  'Bootstrap': { icon: <SiBootstrap className="text-[#7952B3]" />, name: 'Bootstrap' },
  'MUI': { icon: <SiMui className="text-[#007FFF]" />, name: 'MUI' },
  'TanStackQuery': { icon: <SiReactquery className="text-[#FF4154]" />, name: 'TanStack Query' },
  'Firebase': { icon: <SiFirebase className="text-[#FFCA28]" />, name: 'Firebase' },
  'TypeScript': { icon: <SiTypescript className="text-[#007ACC]" />, name: 'TypeScript' },
  'Express': { icon: <SiExpress className="text-[#F7DF1E]" />, name: 'Express' },
  'WordPress': { icon: <SiWordpress className="text-[#21759B]" />, name: 'WordPress' },
  'WooCommerce': { icon: <SiWoocommerce className="text-[#96588A]" />, name: 'WooCommerce' },
  'Shopify': { icon: <SiShopify className="text-[#96BF48]" />, name: 'Shopify' },
  'NeonDB': { icon: <SiNeovim className="text-[#00E599]" />, name: 'NeonDB' },
  'n8n': { icon: <SiN8N className="text-[#E87C60]" />, name: 'n8n' },
  'Flutter': { icon: <SiFlutter className="text-[#02569B]" />, name: 'Flutter' },
  'Dart': { icon: <SiDart className="text-[#0175C2]" />, name: 'Dart' },
  'Vercel': { icon: <SiVercel className="text-white" />, name: 'Vercel' },
  'AI': { icon: <FaRobot className="text-[#22d3ee]" />, name: 'AI Integration' },
}

function ProjectActionButton({ project }) {
  // Other Projects: APK gets an explicit Download button (not on Featured).
  if (project.apk && !project.live && !project.playStore && !project.appStore) {
    return (
      <motion.a
        href={project.apk}
        download
        className="flex items-center gap-1.5 bg-cyan-500 hover:bg-cyan-600 text-white px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-300"
        whileTap={{ scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
      >
        <FaDownload className="text-xs" />
        Download APK
      </motion.a>
    )
  }

  const link = resolveProjectLink(project)
  if (!link) return null

  return (
    <motion.a
      href={link.href}
      {...(link.download
        ? { download: true }
        : { target: '_blank', rel: 'noopener noreferrer' })}
      className="flex items-center gap-1.5 bg-cyan-500 hover:bg-cyan-600 text-white px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-300"
      whileTap={{ scale: 0.95 }}
      onClick={(e) => e.stopPropagation()}
    >
      {link.download ? <FaDownload className="text-xs" /> : <FaExternalLinkAlt className="text-xs" />}
      {link.label}
    </motion.a>
  )
}

const PROJECTS_SECTION_TITLE =
  'text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-200'

const HEADING_ACCENT_GRADIENT =
  'bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent'

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('web')
  const [showAllProjects, setShowAllProjects] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const [fullScreenMedia, setFullScreenMedia] = useState(null)

  const filteredProjects = projects.filter(
    (project) => project.category === selectedCategory
  )

  const visibleProjects = showAllProjects
    ? filteredProjects
    : filteredProjects.slice(0, PROJECTS_INITIAL)
  const hasMoreProjects = filteredProjects.length > PROJECTS_INITIAL

  const handleCategoryChange = (value) => {
    setSelectedCategory(value)
    setShowAllProjects(false)
  }

  return (
    <ScrollSection
      id="projects"
      className="relative min-h-screen flex flex-col py-20 scroll-mt-24 bg-gradient-to-br from-black via-gray-900 to-black"
    >
      <RevealHeading className="w-full max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
        <h2 className={`${PROJECTS_SECTION_TITLE} text-left`}>
          <span className={HEADING_ACCENT_GRADIENT}>Projects</span>
          {" I've Worked On"}
        </h2>
      </RevealHeading>

      <div className="w-full max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {featuredProjects.map((project, index) => (
          <Reveal key={project.title} featured>
            <FeaturedProject
              project={project}
              imageOnRight={index % 2 === 1}
              technologies={technologies}
              priority={index === 0}
            />
          </Reveal>
        ))}
      </div>

      <RevealHeading className="w-full max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16 mb-8 sm:mb-10 text-center">
        <h2 className={`${PROJECTS_SECTION_TITLE} text-center`}>
          <span className={HEADING_ACCENT_GRADIENT}>Other</span>
          {' Projects'}
        </h2>
      </RevealHeading>

      <Reveal className="w-full max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-10 flex justify-center">
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 max-w-3xl mx-auto">
          {PROJECT_CATEGORIES.map((cat) => (
            <motion.button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 border ${
                selectedCategory === cat.id
                  ? 'bg-cyan-500 text-white border-cyan-500'
                  : 'bg-white/10 text-cyan-400 border-cyan-500/20 hover:bg-cyan-500/20'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              {cat.label}
            </motion.button>
          ))}
        </div>
      </Reveal>

      <Reveal className="w-full max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredProjects.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {visibleProjects.map((project) => (
                <motion.div
                  key={project.title}
                  className="relative z-0 w-full h-full bg-[#112240]/95 border-2 border-cyan-500/20 rounded-xl overflow-hidden shadow-[0_0_15px_rgba(6,182,212,0.15)] group transition-all duration-300 hover:z-10 hover:border-cyan-400"
                >
                  <div className="project-image-surface relative h-44 sm:h-52 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                      {project.title}
                      <span className="text-cyan-400 inline-block transition-transform duration-300 group-hover:rotate-45">
                        <BsArrowUpRight className="inline-block text-sm" />
                      </span>
                    </h3>
                    <p className="text-gray-300 text-sm mb-3 leading-6">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.technologies.map((tech) => (
                        <div
                          key={tech}
                          className="flex items-center gap-1 bg-cyan-950/30 px-2 py-0.5 rounded-full border border-cyan-500/20"
                        >
                          <span className="text-base">
                            {technologies[tech]?.icon}
                          </span>
                          <span className="text-xs text-gray-300">
                            {technologies[tech]?.name ?? tech}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      <ProjectActionButton project={project} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {hasMoreProjects && (
              <div className="mt-8 sm:mt-10 flex justify-center">
                <motion.button
                  type="button"
                  onClick={() => setShowAllProjects((prev) => !prev)}
                  className="text-cyan-400 hover:text-cyan-300 text-sm sm:text-base font-medium tracking-wide underline underline-offset-4 decoration-cyan-500/40 transition-colors"
                  whileTap={{ scale: 0.97 }}
                >
                  {showAllProjects ? 'See less' : 'See more'}
                </motion.button>
              </div>
            )}
          </>
        ) : (
          <p className="text-center text-gray-400 text-sm sm:text-base py-10">
            Projects for this section will be added soon.
          </p>
        )}
      </Reveal>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="hidden md:flex fixed inset-0 z-50 items-center justify-center bg-black/70 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="relative bg-[#112240] border-2 border-cyan-500/30 rounded-xl overflow-hidden shadow-[0_0_20px_rgba(6,182,212,0.2)] max-w-5xl w-[min(100%,920px)] mx-4 flex flex-col md:flex-row max-h-[min(90vh,720px)]"
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

              <div className="project-image-surface relative w-full md:w-[52%] shrink-0 h-[240px] sm:h-[280px] md:h-auto md:min-h-[360px] overflow-hidden group">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="absolute inset-0 h-full w-full object-contain object-center p-2"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  {selectedProject.category === 'cms' && selectedProject.fullImage && (
                    <motion.button
                      className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-full"
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setFullScreenMedia({ type: 'image', url: selectedProject.fullImage })}
                    >
                      View Full Page
                    </motion.button>
                  )}
                </div>
              </div>

              <div className="p-6 w-full md:w-[48%] flex flex-col justify-between overflow-y-auto">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4 pr-10">{selectedProject.title}</h3>
                  <p className="text-gray-300 mb-4">{selectedProject.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedProject.technologies.map((tech) => (
                      <div
                        key={tech}
                        className="flex items-center gap-1 bg-cyan-950/30 px-3 py-1 rounded-full border border-cyan-500/20"
                      >
                        <span className="text-lg">{technologies[tech]?.icon}</span>
                        <span className="text-sm text-gray-300">{technologies[tech]?.name ?? tech}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <ProjectActionButton project={selectedProject} />
                </div>
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
                  className="max-w-[min(100%,1200px)] max-h-[min(100%,90vh)] w-auto h-auto object-contain object-center p-4 cursor-zoom-in"
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
    </ScrollSection>
  )
}
