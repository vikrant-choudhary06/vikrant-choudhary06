"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertCircle, VideoOff, Globe, ExternalLink } from "lucide-react";
import { GithubIcon } from "./icons";

export interface ModalData {
  type: "demo" | "live";
  projectTitle: string;
  githubUrl?: string;
}

interface ProjectActionModalProps {
  data: ModalData | null;
  onClose: () => void;
}

export function ProjectActionModal({ data, onClose }: ProjectActionModalProps) {
  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (data) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [data, onClose]);

  if (!data) return null;

  const isDemo = data.type === "demo";

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/40 backdrop-blur-md"
        onClick={onClose}
        aria-modal="true"
        role="dialog"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-md bg-white rounded-2xl border-2 border-zinc-200/90 shadow-2xl p-6 sm:p-7 overflow-hidden text-zinc-900"
        >
          {/* Top Specular Sheen */}
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header & Icon */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div 
                className={`w-11 h-11 rounded-xl flex items-center justify-center border ${
                  isDemo 
                    ? "bg-amber-50 border-amber-200 text-amber-600" 
                    : "bg-rose-50 border-rose-200 text-rose-600"
                }`}
              >
                {isDemo ? (
                  <VideoOff className="w-5 h-5 stroke-[2.2]" />
                ) : (
                  <Globe className="w-5 h-5 stroke-[2.2]" />
                )}
              </div>
              
              <div>
                <span 
                  className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                    isDemo 
                      ? "bg-amber-50 border-amber-200 text-amber-800" 
                      : "bg-rose-50 border-rose-200 text-rose-800"
                  }`}
                >
                  {isDemo ? "DEMO STATUS" : "DEPLOYMENT STATUS"}
                </span>
                <h3 className="text-lg font-bold text-zinc-950 mt-0.5">
                  {isDemo ? "Demo Preview Not Available" : "Live Deployment Unavailable"}
                </h3>
              </div>
            </div>

            {/* Project Context Pill */}
            <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200/80 text-xs space-y-1">
              <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider font-semibold">
                Project:
              </div>
              <div className="font-semibold text-zinc-900 line-clamp-2">
                {data.projectTitle}
              </div>
            </div>

            {/* Explanation Message */}
            <p className="text-sm text-zinc-600 leading-relaxed font-sans">
              {isDemo ? (
                <>
                  Sorry, an interactive video walkthrough for this project is currently not available. 
                  A full-feature screen recording is in progress and will be uploaded here soon!
                </>
              ) : (
                <>
                  Sorry, a live public URL is currently not available for this project. 
                  This application is either hosted on a private client intranet, protected under NDA, or undergoing scheduled server maintenance.
                </>
              )}
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-2.5 font-mono text-xs">
              <a
                href={data.githubUrl || "https://github.com/vikrant-choudhary06"}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:flex-1 px-4 py-2.5 rounded-xl bg-white hover:bg-zinc-50 border-2 border-zinc-200 text-zinc-800 font-semibold shadow-[0_3px_0_0_#e4e4e7] active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-2"
              >
                <GithubIcon className="w-4 h-4" />
                <span>View Source Code</span>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
              </a>

              <button
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold shadow-[0_3px_0_0_#18181b] active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center"
              >
                Got it
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
