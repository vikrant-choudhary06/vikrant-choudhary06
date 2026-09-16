import React from "react";

interface TactileCardProps {
  title?: string;
  category?: string;
  badge?: string;
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "featured" | "accent";
}

export function TactileCard({
  title,
  category,
  badge,
  children,
  className = "",
  variant = "default",
}: TactileCardProps) {
  const getBorderColor = () => {
    switch (variant) {
      case "featured":
        return "border-emerald-500/40 hover:border-emerald-500 shadow-[0_8px_30px_rgba(16,185,129,0.08),_inset_0_1.5px_0_rgba(255,255,255,1)]";
      case "accent":
        return "border-cyan-500/40 hover:border-cyan-500 shadow-[0_8px_30px_rgba(6,182,212,0.08),_inset_0_1.5px_0_rgba(255,255,255,1)]";
      default:
        return "border-zinc-200/90 hover:border-zinc-300 shadow-[0_8px_24px_rgba(0,0,0,0.04),_0_1px_2px_rgba(0,0,0,0.02),_inset_0_1.5px_0_rgba(255,255,255,1)]";
    }
  };

  return (
    <div
      className={`group relative rounded-2xl border-2 bg-white/95 backdrop-blur-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 ${getBorderColor()} ${className}`}
    >
      {/* Top Specular Light Sheen */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-200/70 to-transparent pointer-events-none group-hover:via-emerald-400/40 transition-all duration-500" />

      {/* Header (Only if title/category/badge provided) */}
      {(title || category || badge) && (
        <div className="flex items-center justify-between border-b border-zinc-200/80 bg-zinc-50/90 px-5 py-3 select-none">
          <div className="flex items-center gap-2.5 truncate">
            {category && (
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-600 px-2 py-0.5 rounded bg-white border border-zinc-200 shadow-xs">
                {category}
              </span>
            )}
            {title && (
              <span className="text-xs font-mono text-zinc-700 font-semibold truncate group-hover:text-zinc-950 transition-colors">
                {title}
              </span>
            )}
          </div>

          {badge && (
            <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-xs shrink-0">
              {badge}
            </span>
          )}
        </div>
      )}

      {/* Card Body */}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}
