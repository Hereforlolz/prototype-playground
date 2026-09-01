// components/TerminalFrame.js
export default function TerminalFrame({ label, children }) {
  return (
    <div className="bg-surface border border-border rounded-lg p-4 hover:border-accent/50 hover:shadow-[0_4px_20px_rgba(14,138,138,0.12)] transition-all duration-300">
      <div className="flex items-center gap-2 border-b border-border pb-2 mb-3 text-muted text-[0.7rem] font-mono uppercase tracking-wide">
        <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
        <span>{label}</span>
      </div>
      {children}
    </div>
  );
}
