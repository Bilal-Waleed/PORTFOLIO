import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  fadeUp,
  fadeUpFeatured,
  fadeUpReduced,
  headingReveal,
  headingInView,
  itemInView,
  featuredInView,
} from "../motion/variants";

/** Layout-only wrapper — no section-wide animation. */
export function ScrollSection({ children, className = "", id, ...rest }) {
  return (
    <section id={id} className={className} {...rest}>
      {children}
    </section>
  );
}

/** Layout group (grid / list) — children animate on their own when scrolled to. */
export function StaggerGroup({ children, className = "", ...rest }) {
  return (
    <div className={className} {...rest}>
      {children}
    </div>
  );
}

export function RevealHeading({ children, className = "", ...rest }) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const isInView = useInView(ref, headingInView);
  const variants = reduceMotion ? fadeUpReduced : headingReveal;

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants}
      initial="hidden"
      animate={isInView || reduceMotion ? "visible" : "hidden"}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/**
 * Reveals when this block scrolls into view (not when the whole section enters).
 * @param {boolean} featured — stricter viewport + slightly longer delay (featured projects)
 */
export function Reveal({
  children,
  className = "",
  variants: customVariants,
  featured = false,
  ...rest
}) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const viewport = featured ? featuredInView : itemInView;
  const isInView = useInView(ref, viewport);
  const variants =
    customVariants ??
    (reduceMotion ? fadeUpReduced : featured ? fadeUpFeatured : fadeUp);

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants}
      initial="hidden"
      animate={isInView || reduceMotion ? "visible" : "hidden"}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
