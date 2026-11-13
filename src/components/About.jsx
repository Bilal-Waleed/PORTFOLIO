import { ScrollSection, RevealHeading, Reveal } from './ScrollReveal';

export default function About() {
  return (
    <ScrollSection
      id="about"
      className="relative text-white pt-20 pb-24 scroll-mt-24 bg-gradient-to-br from-black via-gray-900 to-black"
    >
      <RevealHeading className="w-full">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-16">
          About <span className="text-white">Me</span>
        </h2>
      </RevealHeading>

      <div className="w-full max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-20 items-start">
        <Reveal className="w-full">
          <p className="text-[11px] sm:text-xs tracking-[0.22em] uppercase text-cyan-400/80 font-medium mb-4">
            A developer who thinks beyond the code
          </p>
          <h3 className="mt-6 sm:mt-8 font-[Inter,sans-serif] font-black uppercase leading-[0.92] tracking-[-0.04em] text-white text-[clamp(3rem,5.6vw,4.85rem)]">
            <span className="block whitespace-nowrap">More than</span>
            <span className="mt-4 sm:mt-5 block whitespace-nowrap">
              just{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                code.
              </span>
            </span>
          </h3>
        </Reveal>

        <Reveal className="w-full">
          <div className="max-w-xl lg:ml-auto">
            <p className="text-xl sm:text-2xl font-semibold text-white leading-snug mb-6">
              I&apos;m Bilal, a MERN and Next.js developer who builds SaaS products, web apps, and AI tools that teams can run day to day.
            </p>
            <p className="text-gray-400 text-base sm:text-[17px] leading-relaxed mb-5">
              Most of my work is full-stack: React, Next.js, Node, and MongoDB, plus AI features and n8n workflows. I build products like SaaS platforms, CRMs, ERPs, and POS systems - the tools a business actually operates on.
            </p>
            <p className="text-gray-400 text-base sm:text-[17px] leading-relaxed mb-8">
              I keep the scope clear, build what the project needs, and leave it responsive, fast, and easy to hand over.
            </p>
            <a
              href="#contact"
              className="inline-block text-cyan-400 font-medium underline underline-offset-4 decoration-cyan-400/70 hover:text-cyan-300 transition-colors"
            >
              Let&apos;s build your project
            </a>
          </div>
        </Reveal>
      </div>

      <Reveal className="w-full max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 sm:mt-16">
        <a
          href="#contact"
          className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8 border border-white/10 bg-[#0b1220] px-6 sm:px-8 py-6 sm:py-7 transition-colors duration-300 hover:border-cyan-400/50 hover:bg-cyan-400/[0.06]"
        >
          <p className="font-[Inter,sans-serif] text-4xl sm:text-5xl font-black tracking-tight text-white shrink-0">
            BW<span className="text-cyan-400">.</span>
          </p>
          <div>
            <p className="text-lg sm:text-xl font-semibold text-white">
              Built for businesses that need it to work.
            </p>
            <p className="mt-1 text-base sm:text-lg text-gray-400">
              Clear products. Fast delivery. Something your clients will trust.
            </p>
          </div>
        </a>
      </Reveal>
    </ScrollSection>
  );
}
