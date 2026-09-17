"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ArrowUpRight, Zap, MapPin, Rocket } from "lucide-react";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const chipTLRef = useRef<HTMLDivElement>(null);
  const chipTRRef = useRef<HTMLDivElement>(null);
  const chipBLRef = useRef<HTMLDivElement>(null);
  const chipBRRef = useRef<HTMLDivElement>(null);
  const arrow1Ref = useRef<SVGSVGElement>(null);
  const arrow2Ref = useRef<SVGSVGElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const statementRef = useRef<HTMLHeadingElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  const [displayText, setDisplayText] = useState("VIKRANT");
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      const chips = [
        chipTLRef.current,
        chipTRRef.current,
        chipBLRef.current,
        chipBRRef.current,
      ].filter(Boolean);

      const arrows = [arrow1Ref.current, arrow2Ref.current].filter(Boolean);

      // Set Initial States before animation triggers
      gsap.set(boxRef.current, {
        opacity: 0,
        scale: 0,
        rotationX: 540,
        rotationY: 360,
        rotationZ: 180,
        y: -60,
        transformPerspective: 1000,
      });

      gsap.set(chips, {
        opacity: 0,
        scale: 0,
        x: (i) => (i % 2 === 0 ? -40 : 40),
        y: (i) => (i < 2 ? -30 : 30),
      });

      gsap.set(arrows, {
        opacity: 0,
        scale: 0,
      });

      gsap.set([tagRef.current, statementRef.current, buttonsRef.current], {
        opacity: 0,
        y: 30,
      });

      // STAGE 1: THE BOX FOLD (origami entrance, 1.2s, elastic.out)
      tl.to(boxRef.current, {
        opacity: 1,
        scale: 1,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        y: 0,
        duration: 1.2,
        ease: "elastic.out(1, 0.6)",
        boxShadow: "0 0 30px rgba(255, 122, 41, 0.35)",
      });

      // STAGE 2: THE NAME SCRAMBLE (starts at t = 1.0s, duration 1.6s)
      tl.add(() => {
        runGlitchScramble();
      }, 1.0);

      // STAGE 3: CHIP DISPERSION (at t = 2.6s, duration 0.8s, bounce.out)
      tl.to(
        chips,
        {
          opacity: 1,
          scale: 1,
          x: 0,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "bounce.out",
        },
        2.6
      );

      tl.to(
        arrows,
        {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          stagger: 0.08,
          ease: "back.out(2)",
        },
        2.8
      );

      // STAGE 4: STATEMENT DEPLOY (at t = 3.3s, duration 0.5s, y: 30 -> 0)
      tl.to(
        [tagRef.current, statementRef.current, buttonsRef.current],
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.12,
          ease: "power2.out",
        },
        3.3
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const runGlitchScramble = () => {
    const targetText = "VIKRANT";
    const noiseChars = "░▒▓█!@#$%^&*<>?/~01";
    const startTime = Date.now();
    const totalDuration = 1600;

    setIsGlitching(true);

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(1, elapsed / totalDuration);
      const lockedCount = Math.floor(progress * targetText.length);

      let displayStr = "";
      for (let i = 0; i < targetText.length; i++) {
        if (i < lockedCount) {
          displayStr += targetText[i];
        } else {
          displayStr += noiseChars[Math.floor(Math.random() * noiseChars.length)];
        }
      }

      setDisplayText(displayStr);

      if (progress >= 1) {
        setDisplayText(targetText);
        setIsGlitching(false);
        clearInterval(interval);
      }
    }, 40);
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="w-full relative overflow-hidden flex flex-col justify-center items-center text-center pt-20 pb-12"
    >
      {/* Centerpiece Content Stack */}
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-center justify-center my-auto">
        
        {/* 1. CENTERPIECE NAME BOX (The Orange Framed Card) */}
        <div className="relative my-4 flex flex-col items-center max-w-full">
          
          {/* Top Label: "my name is ~" with hand-drawn squiggle underline */}
          <div className="flex flex-col items-center mb-1.5 z-10">
            <span className="font-handwriting text-lg sm:text-xl text-neutral-700 font-bold">
              my name is ~
            </span>
            <svg className="w-16 h-2 text-neutral-600 mt-0.5" viewBox="0 0 60 8" fill="none">
              <path d="M2 5 Q 30 1, 58 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>

          {/* Pure White Index Card Container */}
          <div className="relative max-w-full">
            
            {/* THE 4 CORNER STICKER TABS */}

            {/* Top-Left Tab: CODE CONCURRENCY ● */}
            <div ref={chipTLRef} className="absolute -top-3.5 left-0 sm:-left-16 z-20">
              <div className="bg-[#D2F4E3] text-[#136C47] text-[9px] sm:text-[11px] font-mono font-bold px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-[2px_3px_0px_rgba(0,0,0,0.08)] flex items-center gap-1.5 border border-[#B3E8CE]">
                <span>CODE CONCURRENCY</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#136C47] animate-pulse" />
              </div>
            </div>

            {/* Top-Right Tab: SUB-50MS APIs */}
            <div ref={chipTRRef} className="absolute -top-3.5 right-0 sm:-right-16 z-20">
              <div className="bg-[#FFF3C4] text-[#8C6D07] text-[9px] sm:text-[11px] font-mono font-bold px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-[2px_3px_0px_rgba(0,0,0,0.08)] flex items-center gap-1.5 border border-[#FDE699]">
                <span>SUB-50MS APIs</span>
                <Zap className="w-3 h-3 text-amber-600 fill-amber-500" />
              </div>
            </div>

            {/* Orange Framed Card Box (#FF7A29) - ORIGAMI FOLD TARGET */}
            <div
              ref={boxRef}
              className="relative bg-white px-6 sm:px-14 py-3 sm:py-4 border-2 border-[#FF7A29] rounded-sm shadow-[3px_3px_0px_rgba(255,122,41,0.25)] mx-auto w-fit flex items-center justify-center select-none max-w-full"
            >
              {/* Tiny orange plus marker crosses (+) at 4 inner corners */}
              <span className="absolute top-1 left-1.5 text-[9px] font-mono text-[#FF7A29] font-bold">+</span>
              <span className="absolute top-1 right-1.5 text-[9px] font-mono text-[#FF7A29] font-bold">+</span>
              <span className="absolute bottom-1 left-1.5 text-[9px] font-mono text-[#FF7A29] font-bold">+</span>
              <span className="absolute bottom-1 right-1.5 text-[9px] font-mono text-[#FF7A29] font-bold">+</span>

              {/* Center Typography: Pixelated Font "VIKRANT" with Glitch Scramble */}
              <h1
                className="font-pixel text-4xl sm:text-8xl tracking-wider sm:tracking-widest text-black font-black leading-none py-1 transition-all"
                style={{
                  textShadow: isGlitching
                    ? "-2px 0 0 #ff0055, 2px 0 0 #00ffff"
                    : "none",
                }}
              >
                {displayText}
              </h1>
            </div>

            {/* Bottom-Left Tab: Full-Stack & Python Eng */}
            <div ref={chipBLRef} className="absolute -bottom-4 left-0 sm:-left-20 z-20 flex items-center gap-1">
              <div className="bg-[#FFE2B0] text-[#9A5B0A] text-[9px] sm:text-[11px] font-sans font-bold px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-md shadow-[2px_3px_0px_rgba(0,0,0,0.08)] border border-[#FCD289]">
                Full-Stack &amp; Python Eng
              </div>
              <svg
                ref={arrow1Ref}
                className="w-4 h-4 text-neutral-700 hidden sm:block transform -rotate-45"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>

            {/* Bottom-Right Tab: Mathura, India */}
            <div ref={chipBRRef} className="absolute -bottom-4 right-0 sm:-right-20 z-20 flex items-center gap-1">
              <svg
                ref={arrow2Ref}
                className="w-4 h-4 text-neutral-700 hidden sm:block transform rotate-180 -rotate-45"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
              <div className="bg-[#D2EFE6] text-[#1C6B56] text-[9px] sm:text-[11px] font-sans font-bold px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-md shadow-[2px_3px_0px_rgba(0,0,0,0.08)] border border-[#AADECE] flex items-center gap-1">
                <span>Mathura, India</span>
                <MapPin className="w-3 h-3 text-emerald-700 inline" />
              </div>
            </div>

          </div>

        </div>

        {/* 2. Micro Availability Tag */}
        <div
          ref={tagRef}
          className="mt-6 text-[10px] sm:text-[11px] font-mono tracking-wider text-neutral-700 flex flex-wrap items-center justify-center gap-2 bg-white border border-neutral-300 px-3 sm:px-4 py-1.5 rounded-full shadow-xs font-bold max-w-full"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
          <span>● OPEN TO INTERNSHIPS &amp; FREELANCE // MANIPAL JAIPUR (BCA)</span>
        </div>

        {/* 3. Large Statement */}
        <h2
          ref={statementRef}
          className="font-sans text-2xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 text-center mt-6 leading-tight max-w-2xl"
        >
          I build fast web apps <Zap className="w-6 h-6 sm:w-9 sm:h-9 text-amber-500 fill-amber-400 inline-block align-middle -mt-1" /> <br />
          break APIs &amp; ship real code. <Rocket className="w-6 h-6 sm:w-9 sm:h-9 text-blue-600 inline-block align-middle -mt-1" />
        </h2>

        {/* 4. Action Buttons */}
        <div
          ref={buttonsRef}
          className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          <a
            href="https://github.com/vikrant-choudhary06"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#194BFD] text-white text-xs font-mono font-bold uppercase tracking-wider px-5 sm:px-6 py-2.5 sm:py-3 border-2 border-black shadow-[3px_3px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#000] transition-all inline-flex items-center gap-2 cursor-pointer rounded-sm"
          >
            <span>[ VIEW GITHUB ↗ ]</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>

          <a
            href="#contact"
            className="bg-white text-black text-xs font-mono font-bold uppercase tracking-wider px-5 sm:px-6 py-2.5 sm:py-3 border-2 border-black shadow-[3px_3px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#000] transition-all inline-flex items-center gap-2 cursor-pointer rounded-sm"
          >
            <span>[ CONTACT ME ]</span>
          </a>
        </div>

      </div>

    </section>
  );
}

