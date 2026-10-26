"use client";

import { useEffect } from "react";

export function SectionPolish() {
  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;
    const elements = Array.from(document.querySelectorAll<HTMLElement>("#about h2, #projects header, #stack h2, #contact header"));
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.setAttribute("data-section-visible", "true");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .12 });
    elements.forEach(element => {
      // Content already on screen must stay visible on refresh or direct section links.
      const bounds = element.getBoundingClientRect();
      element.dataset.sectionReveal = "true";
      element.dataset.sectionVisible = String(bounds.top < innerHeight && bounds.bottom > 0);
      observer.observe(element);
    });
    return () => {
      observer.disconnect();
      elements.forEach(element => { delete element.dataset.sectionReveal; delete element.dataset.sectionVisible; });
    };
  }, []);
  return null;
}
