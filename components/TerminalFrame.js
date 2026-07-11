// components/TerminalFrame.js
export default function TerminalFrame({ label, children }) {
  return (
    <div className="bg-[#050508] border border-purple-900/30 rounded-md p-4 hover:shadow-[0_0_15px_rgba(236,72,153,0.1)] transition-shadow duration-300">
      <div className="flex items-center gap-2 border-b border-purple-950/50 pb-2 mb-3 text-slate-500 text-xs">
        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
        <span>{label}</span>
      </div>
      {children}
    </div>
  );
}
