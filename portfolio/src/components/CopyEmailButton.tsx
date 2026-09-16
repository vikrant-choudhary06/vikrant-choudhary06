"use client";

import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import { motion } from "framer-motion";

interface CopyEmailButtonProps {
  email: string;
  className?: string;
  variant?: "primary" | "secondary";
}

export function CopyEmailButton({
  email,
  className = "",
  variant = "secondary",
}: CopyEmailButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  };

  if (variant === "primary") {
    return (
      <button
        onClick={handleCopy}
        className={`px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold tracking-wide transition-all duration-200 hover:-translate-y-0.5 active:translate-y-1 shadow-[0_4px_0_0_#047857,_0_8px_20px_rgba(5,150,105,0.25)] active:shadow-none flex items-center gap-2 select-none ${className}`}
        title="Click to copy email address"
      >
        <motion.div
          key={copied ? "check" : "copy"}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {copied ? (
            <Check className="w-4 h-4 text-white stroke-[2.5]" />
          ) : (
            <Copy className="w-4 h-4 text-white" />
          )}
        </motion.div>
        <span>{copied ? "Copied to Clipboard!" : email}</span>
      </button>
    );
  }

  return (
    <button
      onClick={handleCopy}
      className={`px-4 py-2.5 rounded-xl bg-white hover:bg-zinc-50 border-2 border-zinc-200 text-zinc-700 hover:text-emerald-600 font-mono text-xs font-semibold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-1 shadow-[0_4px_0_0_#e4e4e7] active:shadow-none flex items-center gap-2 select-none ${className}`}
      title="Click to copy email address"
    >
      <motion.div
        key={copied ? "check" : "copy"}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {copied ? (
          <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
        ) : (
          <Copy className="w-3.5 h-3.5 text-zinc-500" />
        )}
      </motion.div>
      <span>{copied ? "Copied!" : "Copy Email"}</span>
    </button>
  );
}
