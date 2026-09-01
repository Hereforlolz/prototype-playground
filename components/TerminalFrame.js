// components/TerminalFrame.js
export default function TerminalFrame({ label, children }) {
  return (
    <div className="bg-surface border border-border rounded-md p-4 hover:shadow-[0_0_15px_rgba(14,138,138,0.15)] transition-shadow duration-300">
      <div className="flex items-center gap-2 border-b border-border pb-2 mb-3 text-muted text-xs font-mono">
        <span className="w-2 h-2 rounded-full bg-accent animate-pulse shrink-0" />
        <span>{label}</span>
      </div>
      {children}
    </div>
  );
}
