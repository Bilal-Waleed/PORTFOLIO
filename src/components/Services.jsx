import { useEffect, useState } from 'react';
import {
  FiMonitor,
  FiCpu,
  FiLink,
  FiSettings,
  FiBriefcase,
  FiSmartphone,
} from 'react-icons/fi';
import { ScrollSection, RevealHeading, Reveal } from './ScrollReveal';

const services = [
  {
    title: 'Website Development',
    description: 'Modern, responsive websites built to look sharp and work cleanly on every screen.',
    icon: FiMonitor,
  },
  {
    title: 'App Development',
    description: 'Web and mobile-ready apps shaped around how the business actually works.',
    icon: FiSmartphone,
  },
  {
    title: 'CRM, ERP & POS Development',
    description: 'Systems for clients, operations, inventory, and point of sale in one working product.',
    icon: FiBriefcase,
  },
  {
    title: 'AI Integration',
    description: 'AI features built into the product so the business can actually use them.',
    icon: FiCpu,
  },
  {
    title: 'Automation',
    description: 'Workflows that cut repetitive work, including n8n where it fits the job.',
    icon: FiSettings,
  },
  {
    title: 'API Integration',
    description: 'Third-party tools and internal systems connected into one reliable flow.',
    icon: FiLink,
  },
];

const processSteps = [
  {
    number: '01',
    title: 'Discovery',
    detail: 'Understand the business, audience, goals, and what the project actually needs.',
  },
  {
    number: '02',
    title: 'Planning',
    detail: 'Agree on a practical technical approach and a clear roadmap.',
  },
  {
    number: '03',
    title: 'Development',
    detail: 'Build the product with care, keeping its purpose and users in focus.',
  },
  {
    number: '04',
    title: 'Testing',
    detail: 'Check that it works, stays responsive, and the important details hold up.',
  },
  {
    number: '05',
    title: 'Delivery',
    detail: 'Hand over the finished work and the support agreed for the project.',
  },
  {
    number: '06',
    title: 'Support',
    detail: 'Stay available after launch for fixes, small updates, and questions.',
  },
];

export default function Services() {
  const [tapped, setTapped] = useState(null);

  const onCardTap = (event, title) => {
    const touch =
      event.pointerType === 'touch' ||
      window.matchMedia('(max-width: 1023px)').matches;
    if (!touch) return;
    setTapped((current) => (current === title ? null : title));
  };

  useEffect(() => {
    if (!tapped) return undefined;

    const clearIfOutside = (event) => {
      if (!event.target.closest('.service-card')) setTapped(null);
    };

    document.addEventListener('pointerdown', clearIfOutside);
    return () => document.removeEventListener('pointerdown', clearIfOutside);
  }, [tapped]);

  return (
    <ScrollSection
      id="services"
      className="relative text-white py-20 sm:py-24 scroll-mt-24 bg-gradient-to-br from-black via-gray-900 to-black"
    >
      <RevealHeading className="w-full max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* <h2 className="text-center text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
          Our <span className="text-white">Services</span>
        </h2> */}
        <p className="mt-8 sm:mt-10 text-[11px] sm:text-xs tracking-[0.22em] uppercase text-cyan-400/80 font-medium mb-4">
          How can I help you
        </p>
        <h3 className="font-[Inter,sans-serif] font-black uppercase leading-[0.92] tracking-[-0.04em] text-white">
          <span className="block text-[clamp(2.4rem,5.4vw,4.4rem)] whitespace-nowrap">
            Digital work
          </span>
          <span className="mt-3 sm:mt-4 block text-[clamp(2.4rem,5.4vw,4.4rem)] whitespace-nowrap bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            done thoughtfully.
          </span>
        </h3>
      </RevealHeading>

      <Reveal className="w-full max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10">
          {services.map((service, index) => {
            const Icon = service.icon;
            const number = String(index + 1).padStart(2, '0');
            const open = tapped === service.title;
            return (
              <article
                key={service.title}
                onPointerUp={(event) => onCardTap(event, service.title)}
                className={`service-card group relative min-h-[220px] cursor-pointer p-6 sm:p-7 bg-black text-white transition-colors duration-300 hover:bg-cyan-400 hover:text-black max-lg:hover:bg-black max-lg:hover:text-white ${
                  open ? 'is-on' : ''
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="service-icon inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-cyan-300 transition-colors duration-300 group-hover:border-black/30 group-hover:text-black">
                    <Icon className="text-xl" />
                  </span>
                  <span className="service-num text-xs tracking-[0.18em] text-white/40 transition-colors duration-300 group-hover:text-black/50">
                    {number}
                  </span>
                </div>
                <h3 className="mt-8 text-lg sm:text-xl font-semibold">
                  {service.title}
                </h3>
                <p className="service-copy mt-2 text-sm leading-relaxed text-gray-400 transition-colors duration-300 group-hover:text-black/75">
                  {service.description}
                </p>
              </article>
            );
          })}
        </div>
      </Reveal>

      <Reveal className="w-full max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-20">
        <p className="text-[11px] sm:text-xs tracking-[0.22em] uppercase text-cyan-400/80 font-medium mb-4">
          Clear from the start
        </p>
        <h3 className="font-[Inter,sans-serif] font-black uppercase leading-[0.92] tracking-[-0.04em] text-white text-[clamp(2.2rem,5vw,4rem)]">
          <span className="block">A good process</span>
          <span className="mt-3 sm:mt-4 block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            makes good work.
          </span>
        </h3>

        <div className="mt-10 border-t border-white/15">
          {processSteps.map((step) => (
            <div
              key={step.title}
              className="process-row group grid grid-cols-[auto_1fr] sm:grid-cols-[4rem_14rem_1fr] items-center gap-x-4 sm:gap-x-8 gap-y-1 border-b border-white/15 py-5 sm:py-6"
            >
              <span className="text-sm text-white/45">{step.number}</span>
              <h4 className="text-sm sm:text-base font-bold tracking-[0.14em] uppercase text-white">
                {step.title}
              </h4>
              <p className="col-start-2 sm:col-start-3 text-sm sm:text-base text-gray-400 group-hover:text-gray-200">
                {step.detail}
              </p>
            </div>
          ))}
        </div>
      </Reveal>
    </ScrollSection>
  );
}
