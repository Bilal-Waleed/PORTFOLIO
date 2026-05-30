/** Shared motion variants */

export const EASE_SMOOTH = [0.22, 1, 0.36, 1];

/** Per-item: triggers when element is well into viewport (not at section top). */
export const itemInView = {
  once: true,
  amount: 0.42,
  margin: "0px 0px -8% 0px",
};

export const headingInView = {
  once: true,
  amount: 0.35,
  margin: "0px 0px -10% 0px",
};

export const featuredInView = {
  once: true,
  amount: 0.5,
  margin: "0px 0px -5% 0px",
};

const makeFadeUp = (delay = 0.22) => ({
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.05, ease: EASE_SMOOTH, delay },
  },
});

export const fadeUp = makeFadeUp(0.22);
export const fadeUpFeatured = makeFadeUp(0.28);

export const fadeUpReduced = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.35 } },
};

export const headingReveal = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, ease: EASE_SMOOTH, delay: 0.18 },
  },
};

export const heroContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.25,
    },
  },
};

export const heroTextGroup = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.05,
    },
  },
};

export const heroSlide = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: EASE_SMOOTH },
  },
};

export const heroFade = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.95, ease: EASE_SMOOTH },
  },
};

export const heroSlideReduced = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.35 } },
};

export const heroFadeReduced = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.35 } },
};
