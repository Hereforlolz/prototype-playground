// components/TerminalFrame.js
//
// Three variants give the same card component a visual hierarchy instead of
// rendering every section — flagship highlights, a reference repo list, a
// bugs log — with identical weight:
// - featured: flagship highlights. Accent-tinted border and a shadow that's
//   visible at rest, not just on hover, so it reads as elevated immediately.
// - default: ordinary content (case studies, stack info, log entries).
// - quiet: dense reference lists (all other repos, the bugs log) that are
//   useful but shouldn't compete with the highlights for attention.
const VARIANT_STYLES = {
  default: 'bg-surface border-border hover:border-accent/50 hover:shadow-[0_4px_20px_rgba(14,138,138,0.12)]',
  featured: 'bg-surface border-accent/40 shadow-[0_4px_20px_rgba(14,138,138,0.12)] hover:border-accent',
  quiet: 'bg-surface-alt border-border/60 hover:border-border',
};

const DOT_STYLES = {
  default: 'bg-accent',
  featured: 'bg-accent',
  quiet: 'bg-muted',
};

export default function TerminalFrame({ label, children, variant = 'default' }) {
  return (
    <div className={`border rounded-lg p-4 transition-all duration-300 ${VARIANT_STYLES[variant]}`}>
      <div className="flex items-center gap-2 border-b border-border pb-2 mb-3 text-muted text-[0.7rem] font-mono uppercase tracking-wide">
        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${DOT_STYLES[variant]}`} />
        <span>{label}</span>
      </div>
      {children}
    </div>
  );
}
