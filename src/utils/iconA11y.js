/**
 * react-icons set role="img" which fails axe without a name.
 * Override role and hide decorative icons from the a11y tree.
 */
export const decorativeIconProps = {
  role: 'presentation',
  'aria-hidden': true,
  focusable: false,
};
