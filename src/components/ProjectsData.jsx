/**
 * Project categories — edit labels / tech hints here.
 * Assign each project a `category` id from this list.
 *
 * web      → Web Apps (normal website / app stack)
 * mobile   → Mobile Apps (Flutter, Dart)
 * business → CRM & ERP  (tell me which projects go here)
 * cms      → CMS Website (WordPress, WooCommerce)
 */
export const PROJECT_CATEGORIES = [
  {
    id: 'web',
    label: 'Web Apps',
    techs: ['ReactJs', 'NextJs', 'NodeJS', 'MongoDB', 'Express', 'HTML', 'CSS', 'JavaScript', 'Tailwind', 'Bootstrap', 'Firebase', 'Python', 'Streamlit', 'MUI', 'NeonDB', 'TypeScript', 'Vercel'],
  },
  {
    id: 'mobile',
    label: 'Mobile Apps',
    techs: ['Flutter', 'Dart'],
  },
  {
    id: 'business',
    label: 'CRM & ERP',
    techs: ['NextJs', 'MongoDB', 'Tailwind'],
  },
  {
    id: 'cms',
    label: 'CMS Website',
    techs: ['WordPress', 'WooCommerce', 'Shopify'],
  },
];

/** How many projects show before "See more" (2 rows × 3 cols). */
export const PROJECTS_INITIAL = 6;

/**
 * Pick the best outbound link for a project.
 * Android → Play Store, iOS → App Store, desktop → Play Store (then App Store / live / APK).
 */
export function resolveProjectLink(project) {
  if (!project) return null;

  if (project.live) {
    return { href: project.live, download: false, label: 'Live' };
  }

  const ua = typeof navigator !== 'undefined' ? navigator.userAgent : '';
  const isIOS = /iPhone|iPad|iPod/i.test(ua);
  const isAndroid = /Android/i.test(ua);

  if (isIOS && project.appStore) {
    return { href: project.appStore, download: false, label: 'App Store' };
  }
  if (isAndroid && project.playStore) {
    return { href: project.playStore, download: false, label: 'Play Store' };
  }
  if (project.playStore) {
    return { href: project.playStore, download: false, label: 'Play Store' };
  }
  if (project.appStore) {
    return { href: project.appStore, download: false, label: 'App Store' };
  }
  if (project.apk) {
    return { href: project.apk, download: true, label: 'Download APK' };
  }

  return null;
}

export const projects = [
  // {
    //   title: 'Growth Mindset Mastery',
    //   description: 'A Python and Streamlit app with mindset lessons, self-checks, and habit tracking so people can practice better habits every day.',
    //   technologies: ['Python', 'Streamlit'],
  //   category: 'web',
  //   image: '/growth-mindset.png',
  //   live: 'https://growth-mindset-bw.streamlit.app/',
  //   github: 'https://github.com/Bilal-Waleed/Growth-Mindset-Mastery.git',
  // },
  // {
    //   title: 'Personal Library Manager',
  //   description: 'A Streamlit library app to add books, search the shelf, and manage a personal collection from one clean and simple screen.',
  //   technologies: ['Python', 'Streamlit'],
  //   category: 'web',
  //   image: '/library.png',
  //   live: 'https://personal-library-bw.streamlit.app/',
  //   github: 'https://github.com/Bilal-Waleed/Personal-Library-Manager.git',
  // },
  {
    title: 'Tomato.',
    description: 'A React food delivery app to browse dishes, choose a meal, and place an order quickly from a phone or desktop.',
    technologies: ['ReactJs', 'Tailwind', 'CSS', 'JavaScript'],
    category: 'web',
    image: '/tomato.webp',
    live: 'https://tomato-food-delivery-app-nine.vercel.app/',
    github: 'https://github.com/Bilal-Waleed/Tomato-Food-Delivery-App.git',
  },
  {
    title: 'Agency Website',
    description: 'A MERN agency website with an admin panel, service pages, and secure payments so clients can manage the site.',
    tagline: 'A full-stack agency platform with admin panel, secure payments, and a modern responsive UI.',
    achievements:
      'Built the complete MERN stack application with an admin dashboard to manage services and content, integrated payment flows, and delivered a polished, mobile-first experience for clients.',
    technologies: ['ReactJs', 'NodeJS', 'MUI', 'MongoDB', 'Express', 'JavaScript', 'Tailwind'],
    category: 'web',
    image: '/agency-web.png',
    live: 'https://agency-web-client.vercel.app/',
    github: 'https://github.com/Bilal-Waleed/Agency-web-client.git',
  },
  {
    title: 'HealthMate',
    description: 'A bilingual health app to upload medical reports, read AI summaries, and track daily vitals in one place.',
    tagline: 'A bilingual health companion to upload reports, view AI summaries, and track vitals in one place.',
    achievements:
      'Developed the React and MongoDB application with Roman Urdu + English UX, report uploads, AI summary views, and vitals tracking for a hackathon-ready health product.',
    technologies: ['ReactJs', 'JavaScript', 'Tailwind', 'MongoDB', 'Vercel'],
    category: 'web',
    image: '/healthmate.png',
    live: 'https://hackathon-client-one.vercel.app/',
    github: 'https://github.com/Bilal-Waleed/Hackathon-Client.git',
  },
  {
    title: 'ZCRUM',
    description: 'A Jira-style SaaS where teams manage projects, tasks, and sprints, with updates that stay in sync in real time.',
    tagline: 'A Jira-style project management SaaS for teams, tasks, and sprint planning with real-time updates.',
    achievements:
      'Built the Next.js SaaS with team and project workflows, task boards, sprint planning, and database-backed real-time collaboration features.',
    technologies: ['NextJs', 'JavaScript', 'NeonDB', 'Vercel'],
    category: 'web',
    image: '/zcrum.png',
    live: 'https://zcrum-self.vercel.app/',
    github: 'https://github.com/Bilal-Waleed/ZCRUM.git',
  },
  {
    title: 'Realand Real Estate Website',
    description: 'A responsive real estate site for property listings, photos, and details, so buyers can inquire about a home on any device.',
    technologies: ['WordPress'],
    category: 'cms',
    image: '/wp-real-estate.webp',
    fullImage: '/wp-real-estate-full.jpg',
  },
  {
    title: 'Stradale Cafe Website',
    description: 'A café website with digital menus, a photo gallery, and location details so guests can plan a visit before they arrive.',
    technologies: ['WordPress'],
    category: 'cms',
    image: '/wp-cafe.webp',
    fullImage: '/wp-cafe-full.jpg',
  },
  {
    title: 'Salt-n-Pepper-web',
    description: 'A responsive Salt n Pepper site with a homepage carousel, franchise listings, and social feeds for a modern brand feel.',
    technologies: ['HTML', 'CSS', 'Bootstrap'],
    category: 'web',
    image: '/saltnpepper.webp',
    live: 'https://saltnpepper-bw.netlify.app/',
    github: 'https://github.com/Bilal-Waleed/Assignment-10-Salt-n-Pepper-web.git',
  },
  {
    title: 'Modern Restaurant Website',
    description: 'A fast restaurant website so guests can browse the menu, check offers, and contact the business without extra steps.',
    technologies: ['WordPress'],
    category: 'cms',
    image: '/wp-rest-1.webp',
    fullImage: '/wp-rest-1-full.jpg',
  },
  {
    title: 'Cryptex Web Clone',
    description: 'A responsive crypto website clone that follows the original layout, spacing, and visual style across devices.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    category: 'web',
    image: '/cryptex-web.webp',
    live: 'https://bilal-waleed.github.io/Cryptex-Web-Clone/',
    github: 'https://github.com/Bilal-Waleed/Cryptex-Web-Clone.git',
  },
  {
    title: 'Social Media Web with Firebase',
    description: 'A Firebase social app where people can post, send friend requests, chat, comment, and like updates on any screen.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Firebase'],
    category: 'web',
    image: '/social-media-web.webp',
    live: 'https://bw-web.vercel.app/',
    github: 'https://github.com/Bilal-Waleed/Complete-web-with-firebase.git',
  },
  // {
    //   title: 'Quiz App',
  //   description: 'A responsive quiz app where users answer each question and see their final score as soon as the quiz ends.',
  //   technologies: ['HTML', 'CSS', 'JavaScript'],
  //   category: 'web',
  //   image: '/quiz-app.webp',
  //   live: 'https://bilal-waleed.github.io/Quiz-App/',
  //   github: 'https://github.com/Bilal-Waleed/Quiz-App.git',
  // },
  {
    title: 'Dentlab Dental Website',
    description: 'A clinic website with services, doctor profiles, appointment booking, and patient reviews for new visitors.',
    technologies: ['WordPress'],
    category: 'cms',
    image: '/wp-dentist-1-dentlab.webp',
    fullImage: '/wp-dentlab-full.jpg',
  },
  // {
    //   title: 'Quantum Vault',
    //   description: 'A Streamlit tool that lets you encrypt and decrypt sensitive data through a simple form in the browser.',
    //   technologies: ['Python', 'Streamlit'],
    //   category: 'web',
    //   image: '/Quantum.png',
    //   live: 'https://data-encrypted-system.streamlit.app/',
    //   github: 'https://github.com/Bilal-Waleed/Data-encrypted-system.git',
    // },
    {
    title: 'Finovate Financial Website',
    description: 'A finance website for services, client stories, and a contact form that firms can use to hear from new clients.',
    technologies: ['WordPress'],
    category: 'cms',
    image: '/wp-finovate.webp',
    fullImage: '/wp-finovate-full.jpg',
  },
  {
    title: 'Student Cheat Sheet - AI Presentation Builder',
    description: 'An AI tool that turns a written prompt into editable slides, then lets you export the finished deck as PPTX or PDF.',
    tagline: 'An AI-powered presentation builder that turns prompts into editable slides with export to PPTX and PDF.',
    achievements:
      'Planned and built the MERN platform with prompt-to-slide generation, real-time canvas editing, file export pipelines, and backend processing for fast presentation creation.',
    technologies: ['ReactJs', 'NodeJS', 'MongoDB', 'Express', 'JavaScript', 'Tailwind'],
    category: 'web',
    image: '/slides-agent.webp',
    live: 'https://slides.studentcheatsheet.com/',
    featured: true,
  },
  {
    title: 'Spark Visa Consultant ERP',
    description:
      'A custom ERP platform for managing visa consultancy operations, from Meta lead generation and client engagement to eligibility checks, appointments, reviews, and contract closure.',
    tagline: 'A centralized ERP solution for visa consultancy lead and client management.',
    achievements:
      'Developed a complete client management workflow with Meta Instant Forms lead integration, engagement emails, meeting scheduling, CV collection, eligibility assessment, appointment booking, management reviews, and contract and payment tracking.',
    technologies: ['NextJs', 'MongoDB', 'Tailwind'],
    category: 'business',
    image: '/spark-visa-erp.webp',
    imageFit: 'contain',
    live: 'https://erp.sparkvisaconsulting.com/login?continue=/',
    featured: true,
  },
  {
    title: 'Pupify',
    description:
      'An all-in-one pet marketplace connecting dog owners with sellers, service providers, and pet product listings through a convenient mobile application.',
    tagline: 'A mobile marketplace for dog listings, pet services, and pet essentials.',
    achievements:
      'Developed a cross-platform pet marketplace where users can explore dog listings, discover pet-related services, and browse pet product listings in one convenient platform.',
    technologies: ['Flutter', 'Dart', 'MongoDB'],
    category: 'mobile',
    image: '/pupify.webp',
    imageFit: 'contain',
    playStore: 'https://play.google.com/store/apps/details?id=com.pupify.app',
    featured: true,
  },
  {
    title: 'SnapID',
    description:
      'An AI-powered professional photo generation platform that transforms uploaded images into customized professional photos based on user-selected dimensions, generating four variations.',
    tagline: 'Create professional photos with AI in just a few steps.',
    achievements:
      'Developed an AI-powered web platform that allows users to upload images, select their desired photo size, and generate four customized AI photo variations. Also part of a cross-platform product available on Android and iOS.',
    technologies: ['NextJs', 'ReactJs', 'MongoDB', 'AI', 'Flutter', 'Dart'],
    category: 'web',
    image: '/snapid.webp',
    imageFit: 'contain',
    live: 'https://snapid.app/',
    featured: true,
  },
  {
    title: 'The Tarbiyah',
    description:
      'A gamified Islamic learning platform for children combining Quranic education, Islamic values, character development, and academics through interactive lessons.',
    tagline: 'Making Islamic homeschooling interactive, structured, and fun for kids.',
    achievements:
      'Developed a cross-platform educational application featuring video lessons, progressive learning levels, interactive quizzes, and a dedicated Parent Panel for accessing children\'s details and monitoring learning progress.',
    technologies: ['Flutter', 'Dart', 'MongoDB'],
    category: 'mobile',
    image: '/the-tarbiyah.webp',
    imageFit: 'contain',
    playStore: 'https://play.google.com/store/apps/details?id=com.tarbiyah.app',
    appStore: 'https://apps.apple.com/pk/app/the-tarbiyah/id6758273198',
    featured: true,
  },
  {
    title: 'Azan & Masjid Finder',
    description:
      'An Islamic mobile application providing automatic prayer times, Azan notifications, Qibla direction, nearby mosque discovery, Quran reading, and daily Duas.',
    tagline: 'An all-in-one Islamic prayer companion for everyday religious needs.',
    achievements:
      'Developed a cross-platform Islamic application featuring location-based prayer schedules, automatic Azan notifications, Qibla direction, nearby mosque finder, Para-wise Quran navigation, and daily Duas.',
    technologies: ['Flutter', 'Dart'],
    category: 'mobile',
    image: '/azan-masjid-finder.webp',
    imageFit: 'contain',
    apk: '/azan-masjid-finder.apk',
    featured: true,
  },
  {
    title: 'Tutora Academy',
    description: 'An online Quran academy with learning programs, tutor profiles, and a clear path for new students to enroll.',
    tagline: 'Online Quranic tutor academy - learn, connect, and grow with qualified teachers.',
    achievements:
      'Designed and shipped a responsive academy platform with course showcases, tutor profiles, and enrollment flows for Tutora Online.',
    technologies: ['JavaScript', 'HTML', 'Bootstrap', 'Vercel'],
    category: 'web',
    image: '/tutoracademy1.webp',
    imageFit: 'contain',
    live: 'https://www.tutoraonline.com/',
    featured: true,
  },
  {
    title: 'Islambol - Umrah & Hajj Tour Listing Platform',
    description: 'A tour platform for Umrah and Hajj packages, with package listings, admin tools, and secure payments for bookings.',
    tagline: 'A tour listing platform for Umrah & Hajj packages with listings, search, and booking-ready flows.',
    achievements:
      'Developed the full-stack Next.js and MERN application with tour management, responsive UI, and production deployment for real users exploring pilgrimage packages.',
    technologies: ['NextJs', 'NodeJS', 'MongoDB', 'Express', 'JavaScript', 'Tailwind'],
    category: 'web',
    image: '/islambol.webp',
    live: 'https://islambol.com/',
    featured: true,
  },
];

export const featuredProjects = projects.filter(
  (p) => p.featured && (p.live || p.playStore || p.appStore || p.apk)
);
