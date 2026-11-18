import InteractiveLoopSlider from './InteractiveLoopSlider'
import { ScrollSection, RevealHeading, Reveal, StaggerGroup } from './ScrollReveal'
import { FaPython, FaRobot, FaReact, FaNodeJs, FaGitAlt, FaFigma, FaJsSquare } from 'react-icons/fa'
import {
  SiTailwindcss, SiMongodb, SiNextdotjs, SiBootstrap, SiAdobexd,
  SiGooglecolab, SiStreamlit, SiFirebase, SiTypescript,
  SiWordpress, SiWoocommerce, SiShopify, SiN8N
} from 'react-icons/si'
import { decorativeIconProps } from '../utils/iconA11y'

const technologies = [
  { name: 'JavaScript', icon: <FaJsSquare {...decorativeIconProps} /> },
  { name: 'Python', icon: <FaPython {...decorativeIconProps} /> },
  { name: 'Artificial Intelligence', icon: <FaRobot {...decorativeIconProps} /> },
  { name: 'Node.js', icon: <FaNodeJs {...decorativeIconProps} /> },
  { name: 'MongoDB', icon: <SiMongodb {...decorativeIconProps} /> },
  { name: 'TypeScript', icon: <SiTypescript {...decorativeIconProps} /> },
  { name: 'React', icon: <FaReact {...decorativeIconProps} /> },
  { name: 'Next.js', icon: <SiNextdotjs {...decorativeIconProps} /> },
  { name: 'Express', icon: <FaNodeJs {...decorativeIconProps} /> },
  { name: 'Google Colab', icon: <SiGooglecolab {...decorativeIconProps} /> },
  { name: 'Firebase', icon: <SiFirebase {...decorativeIconProps} /> },
  { name: 'Streamlit', icon: <SiStreamlit {...decorativeIconProps} /> },
  { name: 'Bootstrap', icon: <SiBootstrap {...decorativeIconProps} /> },
  { name: 'Tailwind CSS', icon: <SiTailwindcss {...decorativeIconProps} /> },
  { name: 'Figma', icon: <FaFigma {...decorativeIconProps} /> },
  { name: 'Git', icon: <FaGitAlt {...decorativeIconProps} /> },
  { name: 'Adobe XD', icon: <SiAdobexd {...decorativeIconProps} /> },
  { name: 'WordPress', icon: <SiWordpress {...decorativeIconProps} /> },
  { name: 'WooCommerce', icon: <SiWoocommerce {...decorativeIconProps} /> },
  { name: 'Shopify', icon: <SiShopify {...decorativeIconProps} /> },
  { name: 'n8n', icon: <SiN8N {...decorativeIconProps} /> },
]

const SkillCard = ({ name, icon }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-gradient-to-br from-black to-[#0a0a0a] border-2 border-cyan-500/10 hover:border-cyan-500/30 transition-colors duration-300">
      <div className="text-4xl text-cyan-400 mb-2" aria-hidden="true">
        {icon}
      </div>
      <p className="text-sm text-gray-300 font-medium">{name}</p>
    </div>
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
      className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-24 scroll-mt-24 bg-gradient-to-br from-black via-gray-900 to-black"
    >
      <RevealHeading className="w-full max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-16">
          Tech <span className="text-white">Stack</span>
        </h2>
      </RevealHeading>

      <StaggerGroup className="w-full max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-4">
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
