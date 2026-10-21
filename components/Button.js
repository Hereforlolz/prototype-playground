// components/Button.js
//
// Shared primary/secondary CTA styling — previously copy-pasted as long
// classname strings across index.js, ClosingCTA.js, CaseStudy.js, and
// contact.js. Renders a next/link for internal navigation, a plain <a>
// (with target="_blank" + the sr-only "(opens in new tab)" suffix) for
// external links, or a <button> when no href is given.
import Link from 'next/link';

const BASE =
  'font-display font-semibold px-4 py-2 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 disabled:opacity-60';

const VARIANT_STYLES = {
  primary: 'bg-accent text-surface hover:opacity-90 transition-opacity duration-150',
  secondary: 'border border-border text-text hover:border-accent hover:text-accent transition-colors duration-150',
};

export default function Button({
  href,
  external = false,
  variant = 'primary',
  type = 'button',
  className = '',
  children,
  ...rest
}) {
  const classes = `${BASE} ${VARIANT_STYLES[variant]} ${className}`.trim();

  if (href && external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={classes} {...rest}>
        {children}
        <span className="sr-only"> (opens in new tab)</span>
      </a>
    );
  }

  if (href) {
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}
