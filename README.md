# Bilal Waleed — Portfolio

Personal portfolio website for **Bilal Waleed**, a full-stack / cross-platform developer. Showcases web apps, mobile apps, CRM & ERP work, and CMS websites, with contact and booking flows for clients.

**Live:** [portfolio-bilal-waleeds-projects.vercel.app](https://portfolio-bilal-waleeds-projects.vercel.app)

## Features

- Responsive dark UI with Framer Motion scroll reveals
- Hero, About, Services, Skills, Projects, Achievements, Contact
- Featured projects with live / store / APK links
- Project filters: **Web Apps**, **Mobile Apps**, **CRM & ERP**, **CMS Website**
- See more after 6 projects per category
- Platform-aware store links (Android → Play Store, iOS → App Store)
- Contact form via **Web3Forms**
- Book a Call via **Cal.com**
- WhatsApp, Fiverr, GitHub, LinkedIn from site config
- SEO meta tags, favicon, and Open Graph image

## Tech stack

| Layer | Tools |
| --- | --- |
| UI | React 19, Vite 6, Tailwind CSS 4 |
| Motion | Framer Motion |
| Icons | React Icons |
| Forms | React Hook Form, Yup, Web3Forms |
| Deploy | Vercel |

## Project structure

```text
src/
  components/     # Navbar, Hero, Projects, Contact, etc.
  config/site.js  # URLs, email, WhatsApp, Cal.com, Web3Forms key
  context/        # Scroll animation provider
  motion/         # Shared Framer Motion variants
public/           # Images, APK, favicons, OG image
```

## Getting started

```bash
npm install
npm run dev
```

Build and preview:

```bash
npm run build
npm run preview
```

## Environment variables

Create a `.env` file in the project root (Vite requires the `VITE_` prefix):

```env
VITE_WEB3FORMS_ACCESS_KEY=your_web3forms_access_key
VITE_CONTACT_EMAIL=bilalwaleed01@gmail.com
VITE_CAL_BOOKING_URL=https://cal.com/bilal-waleed-vefcxb/intro-call
VITE_WHATSAPP_NUMBER=923292109096
VITE_FIVERR_URL=https://www.fiverr.com/bilal_waleed
VITE_UPWORK_URL=
VITE_GITHUB_URL=https://github.com/Bilal-Waleed
VITE_LINKEDIN_URL=https://www.linkedin.com/in/bilal-waleed-2411172bb/
VITE_SITE_URL=https://portfolio-bilal-waleeds-projects.vercel.app
```

On Vercel, add the same keys under **Project → Settings → Environment Variables**, then redeploy.

Defaults also live in `src/config/site.js` if an env value is missing.

## Adding / editing projects

All project data is in `src/components/ProjectsData.jsx`.

### Categories

| `category` | Tab label |
| --- | --- |
| `web` | Web Apps |
| `mobile` | Mobile Apps |
| `business` | CRM & ERP |
| `cms` | CMS Website |

### Useful fields

```js
{
  title: 'Project name',
  description: 'Short card description',
  tagline: 'Featured summary',
  achievements: 'What you built / delivered',
  technologies: ['NextJs', 'MongoDB', 'Tailwind'], // keys must match Projects.jsx icon map
  category: 'web', // web | mobile | business | cms
  image: '/project-image.png',
  live: 'https://example.com',           // optional
  playStore: 'https://play.google.com/...', // optional
  appStore: 'https://apps.apple.com/...',   // optional
  apk: '/app-name.apk',                  // optional — file in /public
  github: 'https://github.com/...',      // optional
  featured: true,                        // shows in Featured section
}
```

Link priority: `live` → store (by device) → `apk`.

### Featured images

Featured image frame is landscape (~**16:9**). Recommended export size:

- **1200 × 675** (or **1920 × 1080** for sharper assets)

Put images in `public/` and reference them as `/filename.png`.

### APK downloads

Place the file in `public/`, for example:

```text
public/azan-masjid-finder.apk
```

Then set `apk: '/azan-masjid-finder.apk'` on the project. Featured image click downloads the APK; the Other Projects grid shows a **Download APK** button.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Local development server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

## Contact

- Email: bilalwaleed01@gmail.com
- GitHub: [Bilal-Waleed](https://github.com/Bilal-Waleed)
- LinkedIn: [bilal-waleed](https://www.linkedin.com/in/bilal-waleed-2411172bb/)
- Fiverr: [bilal_waleed](https://www.fiverr.com/bilal_waleed)
