import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaLinkedin,
  FaGithub,
  FaEnvelope,
  FaBars,
  FaTimes,
  FaWhatsapp,
} from "react-icons/fa";
import { SiUpwork, SiFiverr } from "react-icons/si";
import { useScrollAnimation } from "../context/ScrollAnimationContext";

const navLinks = ["About", "Services", "Projects", "Skills", "Achievements", "Contact"];

const WHATSAPP_URL = "https://wa.me/923292109096";
const UPWORK_URL = "#";
const FIVERR_URL = "https://www.fiverr.com/bilal_waleed";

const desktopSocials = [
  { href: "https://www.linkedin.com/in/bilal-waleed-2411172bb/", icon: FaLinkedin, label: "LinkedIn" },
  { href: "https://github.com/Bilal-Waleed", icon: FaGithub, label: "GitHub" },
  { href: "mailto:bilalwaleed01@gmail.com", icon: FaEnvelope, label: "Email" },
  { href: WHATSAPP_URL, icon: FaWhatsapp, label: "WhatsApp" },
];

const mobileSocials = [
  { href: "https://github.com/Bilal-Waleed", icon: FaGithub, label: "GitHub" },
  { href: "https://www.linkedin.com/in/bilal-waleed-2411172bb/", icon: FaLinkedin, label: "LinkedIn" },
  { href: UPWORK_URL, icon: SiUpwork, label: "Upwork" },
  { href: FIVERR_URL, icon: SiFiverr, label: "Fiverr" },
  { href: WHATSAPP_URL, icon: FaWhatsapp, label: "WhatsApp" },
];

export default function Navbar({ startAnimation = true }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { hideHeroForReplay, playHeroReplay } = useScrollAnimation();

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    setMenuOpen(false);
    const targetElement = document.querySelector(`#${targetId}`);
    if (!targetElement) return;

    if (targetId === "home") {
      hideHeroForReplay();
    }

    const headerOffset = 88;
    const elementPosition = targetElement.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });

    if (targetId === "home") {
      setTimeout(() => playHeroReplay(), 480);
    }
  };

  const linkVariants = {
    initial: { y: 0 },
    hover: { y: -2 },
  };

  const iconVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: { scale: 1.2, rotate: 5 },
  };

  const brandUnderlineVariants = {
    rest: { scaleX: 0 },
    hover: { scaleX: 1 },
  };

  return (
    <motion.header
      className="navbar-fixed pt-3 sm:pt-4"
      initial={{ opacity: 0, y: -8 }}
      animate={startAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      <nav className="max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative flex items-center justify-between h-14 sm:h-16">
        <div className="absolute inset-0 mx-1 sm:mx-2">
          <div className="navbar-glass absolute inset-0 rounded-xl border border-white/10 shadow-lg" />
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl">
            <div className="navbar-shine" />
          </div>
        </div>

        <motion.a
          href="#home"
          onClick={(e) => handleSmoothScroll(e, "home")}
          className="brand-name brand-name-link cursor-pointer select-none whitespace-nowrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          whileHover="hover"
          whileTap="hover"
        >
          M Bilal Waleed
          <motion.span
            className="brand-name-underline"
            initial="rest"
            variants={brandUnderlineVariants}
            transition={{ duration: 0.3 }}
          />
        </motion.a>

        <ul className="hidden min-[880px]:flex items-center gap-1 lg:gap-2 relative z-10">
          {navLinks.map((link) => (
            <li key={link} className="relative group">
              <motion.a
                href={`#${link.toLowerCase()}`}
                onClick={(e) => handleSmoothScroll(e, link.toLowerCase())}
                className="px-2.5 lg:px-3 py-1.5 text-[13px] lg:text-sm font-medium text-gray-300 transition-colors duration-300 hover:text-white relative"
                whileHover="hover"
                whileTap="hover"
                initial="initial"
                variants={linkVariants}
              >
                {link}
                <motion.span
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-400"
                  initial={{ scaleX: 0 }}
                  variants={{ hover: { scaleX: 1 } }}
                  transition={{ duration: 0.3 }}
                  style={{ originX: 0.5 }}
                />
              </motion.a>
            </li>
          ))}
        </ul>

        <div className="hidden min-[880px]:flex items-center gap-3 lg:gap-3.5 relative z-10 pr-1">
          {desktopSocials.map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
              aria-label={social.label}
              variants={iconVariants}
              initial="initial"
              whileHover="hover"
              whileTap={{ scale: 0.9 }}
            >
              <social.icon className="text-lg lg:text-xl" />
            </motion.a>
          ))}
        </div>

        <motion.button
          className="min-[880px]:hidden relative z-10 p-2 text-gray-300 hover:text-white transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          whileTap={{ scale: 0.9 }}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
        </motion.button>

        <motion.div
          className="min-[880px]:hidden fixed inset-0 bg-black/90 backdrop-blur-sm z-40 flex justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: menuOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ pointerEvents: menuOpen ? "auto" : "none" }}
        >
          <motion.div
            className="w-72 max-w-[85vw] bg-gray-900/80 backdrop-blur-lg h-full p-6 shadow-xl border-l border-white/10"
            initial={{ x: "100%" }}
            animate={{ x: menuOpen ? 0 : "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <button
              className="absolute top-6 right-6 text-gray-400 hover:text-white"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <FaTimes size={24} />
            </button>
            <ul className="mt-16 space-y-5">
              {navLinks.map((link) => (
                <li key={link}>
                  <motion.a
                    href={`#${link.toLowerCase()}`}
                    onClick={(e) => handleSmoothScroll(e, link.toLowerCase())}
                    className="block px-4 py-2 text-lg text-gray-300 font-medium rounded-md transition-colors duration-300 hover:text-cyan-400 hover:bg-white/5 active:text-cyan-400"
                    whileTap={{ scale: 0.95 }}
                  >
                    {link}
                  </motion.a>
                </li>
              ))}

              <li className="pt-6 border-t border-white/10">
                <div className="flex flex-col gap-3.5 px-1">
                  {mobileSocials.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 text-[11px] tracking-[0.16em] uppercase text-white/55 transition-colors hover:text-cyan-300 active:text-cyan-300"
                    >
                      <social.icon className="text-base shrink-0" />
                      {social.label}
                    </a>
                  ))}
                </div>
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </nav>
    </motion.header>
  );
}
