import { motion } from 'framer-motion'
import { FaReact, FaNodeJs, FaGithub, FaExternalLinkAlt, FaHtml5, FaCss3, FaClock } from 'react-icons/fa'
import { SiMongodb, SiTailwindcss, SiJavascript, SiPython, SiStreamlit, SiNextdotjs, SiBootstrap, SiMui, SiReactquery, SiFirebase, SiTypescript } from 'react-icons/si'
import { BsArrowUpRight } from 'react-icons/bs'

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
}

// --- Projects array ---
const projects = [
  {
    title: 'Docs Mini App',
    description: 'A minimal React-based Docs app featuring a custom cursor animation. Users can freely drag the Docs element across the full screen for an interactive experience.',
    technologies: ['ReactJs','JavaScript', 'MUI', 'Tailwind'],
    image: '/docs-app.png',
    live: 'https://docs-mini-app-blue.vercel.app/',
    github: 'https://github.com/Bilal-Waleed/Docs-mini-app.git',
  },
  {
    title: 'Social Media Web with Firebase',
    description: 'A mini social media web app built using Firebase, HTML, CSS, and JavaScript. Users can create posts, send friend requests, chat, comment, and like posts. Fully responsive and many more features',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Firebase'],
    image: '/social-media-web.png',
    live: 'https://bw-web.vercel.app/',
    github: 'https://github.com/Bilal-Waleed/Complete-web-with-firebase.git',
  },
  {
    title: 'Quiz App',
    description: 'A simple quiz app built using HTML, CSS, and JavaScript. Users can answer questions and see their scores. Fully responsive and many more features',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    image: '/quiz-app.png',
    live: 'https://bilal-waleed.github.io/Quiz-App/',
    github: 'https://github.com/Bilal-Waleed/Quiz-App.git',
  },
  {
    title: 'Dummy-APP with React',
    description: 'A SMIT React assignment with a To-Do App (CRUD) and Products App using TanStack Query',
    technologies: ['ReactJs', 'MUI','Tailwind', 'TanStackQuery'],
    image: '/Dummy-app.png',
    live: 'https://dummy-app-with-react.vercel.app/',
    github: 'https://github.com/Bilal-Waleed/Dummy-App-With-React.git',
  },
  {
    title: 'Quantum Vault',
    description: 'A secure data encryption system built using Python and Streamlit. It allows users to encrypt and decrypt sensitive information through a simple and interactive web interface.',
    technologies: ['Python', 'Streamlit'],
    image: '/Quantum.png',
    live: 'https://data-encrypted-system.streamlit.app/',
    github: 'https://github.com/Bilal-Waleed/Data-encrypted-system.git',
  },
  {
    title: 'Salt-n-Pepper-web',
    description: 'Developed a responsive website for Salt n Pepper featuring a dynamic carousel, franchise listings, and social feeds. Crafted using HTML, CSS, and Bootstrap for a modern, user-friendly experience',
    technologies: ['HTML', 'CSS', 'Bootstrap'],
    image: '/saltnpepper.png',
    live: 'https://saltnpepper-bw.netlify.app/',
    github: 'https://github.com/Bilal-Waleed/Assignment-10-Salt-n-Pepper-web.git',
  },
  {
    title: 'Growth Mindset Mastery',
    description: 'An interactive Growth Mindset Mastery app built with Python and Streamlit. It offers motivational content, self-assessment tools, and habit tracking to boost personal development',
    technologies: ['Python', 'Streamlit'],
    image: '/growth-mindset.png',
    live: 'https://growth-mindset-bw.streamlit.app/',
    github: 'https://github.com/Bilal-Waleed/Growth-Mindset-Mastery.git',
  },
  {
    title: 'Cryptex Web Clone',
    description: 'A fully responsive Cryptex website clone built with HTML, CSS, and JavaScript. It replicates the sleek design and layout of the original for a modern crypto platform look.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    image: '/cryptex-web.png',
    live: 'https://bilal-waleed.github.io/Cryptex-Web-Clone/',
    github: 'https://github.com/Bilal-Waleed/Cryptex-Web-Clone.git',
  },
  {
    title: 'Personal Library Manager',
    description: 'A digital Personal Library system developed using Python and Streamlit. Users can add, search, and manage their book collection with a clean and user-friendly interface.',
    technologies: ['Python', 'Streamlit'],
    image: '/library.png',
    live: 'https://personal-library-bw.streamlit.app/',
    github: 'https://github.com/Bilal-Waleed/Personal-Library-Manager.git',
  },
  {
    title: 'Shop.Co',
    description: 'Shop.co is a modern e-commerce web app built using Next.js, Tailwind CSS, and TypeScript. It features a sleek main landing page and a dynamic products page for a smooth shopping experience.',
    technologies: ['NextJs', 'Tailwind', 'TypeScript'],
    image: '/Shop.co.png',
    live: 'https://shop-co-ten-lyart.vercel.app/',
    github: 'https://github.com/Bilal-Waleed/Shop.Co.git',
  },
  {
    title: 'Tomato.',
    description: 'Tomato is a sleek food delivery web app built with React.js and CSS. It offers a user-friendly interface to browse, select, and order food quickly and efficiently',
    technologies: ['ReactJs', 'Tailwind', 'CSS', 'JavaScript'],
    image: '/tomato.png',
    live: 'https://tomato-food-delivery-app-nine.vercel.app/',
    github: 'https://github.com/Bilal-Waleed/Tomato-Food-Delivery-App.git',
  },
  {
    title: 'E-Store',
    description: 'E-Store is a modern e-commerce platform built with React.js, Tailwind CSS, MUI, Firebase, and JavaScript, offering a seamless shopping experience with dynamic product listings and user-friendly navigation.',
    technologies: ['ReactJs', 'Tailwind', 'MUI', 'Firebase', 'JavaScript'],
    image: '/estore.png',
    comingSoon: true,
  },
]

const DURATION = 40

export default function Projects() {
  const allProjects = [...projects, ...projects]

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

      <div className="relative w-full max-w-6xl overflow-hidden py-8">
        <motion.div
          className="flex gap-8"
          style={{ width: 'max-content' }}
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'linear',
            duration: DURATION,
          }}
        >
          {allProjects.map((project, idx) => (
            <div
              key={project.title + idx}
              className="relative w-[280px] flex-shrink-0 bg-[#000000]/90 border-2 border-cyan-500/20 rounded-xl overflow-hidden shadow-[0_0_15px_rgba(6,182,212,0.15)] backdrop-blur-sm group transition-all duration-300 hover:scale-105 hover:border-cyan-400"
            >
              <div className="relative h-35 overflow-hidden">
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
                {project.comingSoon ? (
                  <div className="flex items-center gap-2 text-cyan-400 text-md font-medium">
                    <FaClock className="text-sm" />
                    Coming Soon
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <motion.a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 bg-cyan-500 hover:bg-cyan-600 text-white px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-300"
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaExternalLinkAlt className="text-xs" />
                      Live
                    </motion.a>
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-full text-sm font-medium border border-white/10 transition-colors duration-300"
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaGithub className="text-sm" />
                      Code
                    </motion.a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </motion.div>
        <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-black via-transparent to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-black via-transparent to-transparent z-10" />
      </div>

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
    </motion.section>
  )
}