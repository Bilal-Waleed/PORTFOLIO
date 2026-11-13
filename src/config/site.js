const env = import.meta.env;

export const WEB3FORMS_ACCESS_KEY = env.VITE_WEB3FORMS_ACCESS_KEY || '';
export const CONTACT_EMAIL = env.VITE_CONTACT_EMAIL || 'bilalwaleed01@gmail.com';
export const CAL_BOOKING_URL =
  env.VITE_CAL_BOOKING_URL || 'https://cal.com/bilal-waleed-vefcxb/intro-call';
export const WHATSAPP_NUMBER = env.VITE_WHATSAPP_NUMBER || '923292109096';
export const WHATSAPP_URL = WHATSAPP_NUMBER ? `https://wa.me/${WHATSAPP_NUMBER}` : '#';
export const FIVERR_URL = env.VITE_FIVERR_URL || 'https://www.fiverr.com/bilal_waleed';
export const UPWORK_URL = env.VITE_UPWORK_URL || '#';
export const GITHUB_URL = env.VITE_GITHUB_URL || 'https://github.com/Bilal-Waleed';
export const LINKEDIN_URL =
  env.VITE_LINKEDIN_URL || 'https://www.linkedin.com/in/bilal-waleed-2411172bb/';
export const SITE_URL =
  env.VITE_SITE_URL || 'https://portfolio-bilal-waleeds-projects.vercel.app';
