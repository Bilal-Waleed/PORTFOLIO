const formatTech = (tech, technologies) =>
  technologies[tech]?.name ?? tech.replace(/([A-Z])/g, " $1").trim();

export default function FeaturedProject({ project, imageOnRight, technologies }) {
  const tagline = project.tagline ?? project.description;
  const achievements = project.achievements ?? project.description;

  return (
    <article className="relative mb-32 sm:mb-40 lg:mb-44 last:mb-12 w-full">
      <div
        className={`flex flex-col gap-12 lg:gap-8 lg:items-center ${
          imageOnRight ? "lg:flex-row-reverse" : "lg:flex-row"
        }`}
      >
        <div className="relative w-full lg:w-[55%] shrink-0">
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="group block h-full rounded-lg overflow-hidden shadow-2xl shadow-black/50 ring-1 ring-white/10 transition-transform duration-300 hover:scale-[1.01] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            aria-label={`Open ${project.title} live site`}
          >
            <div className="project-image-surface relative w-full h-[240px] sm:h-[300px] lg:h-[360px] rounded-lg overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-300 group-hover:opacity-95"
              />
            </div>
          </a>
        </div>

        <div
          className={`relative z-10 w-full lg:w-[50%] flex flex-col ${
            imageOnRight
              ? "lg:items-start lg:text-left lg:pr-4"
              : "lg:items-end lg:text-right lg:pl-4"
          }`}
        >
          <p
            className="text-cyan-400 text-sm font-medium mb-2"
            style={{ fontFamily: '"Roboto Mono", monospace' }}
          >
            Featured Project
          </p>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-200 mb-6 leading-tight max-w-xl">
            {project.title}
          </h3>

          <div
            className={`bg-[#112240]/95 backdrop-blur-sm rounded-md p-6 sm:p-7 shadow-xl border border-white/5 text-left w-full max-w-xl ${
              imageOnRight ? "lg:-mr-10 xl:-mr-16" : "lg:-ml-10 xl:-ml-16"
            }`}
          >
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {tagline}
            </p>
            <p
              className="text-cyan-400/90 text-xs sm:text-sm mt-5 mb-2"
              style={{ fontFamily: '"Roboto Mono", monospace' }}
            >
              Tasks / Achievements
            </p>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              {achievements}
            </p>
          </div>

          <ul
            className={`flex flex-wrap gap-x-4 gap-y-2 mt-8 w-full max-w-xl text-cyan-400/80 text-xs sm:text-sm ${
              imageOnRight ? "justify-start" : "justify-end"
            }`}
            style={{ fontFamily: '"Roboto Mono", monospace' }}
          >
            {project.technologies.map((tech) => (
              <li key={tech}>{formatTech(tech, technologies)}</li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
