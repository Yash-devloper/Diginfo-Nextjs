"use client";

import { useEffect } from "react";

export default function Reveal() {
  useEffect(() => {
    const initReveal = () => {
      const elements = document.querySelectorAll(".reveal");

      if (!elements.length) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("active");
            }
          });
        },
        {
          threshold: 0.15,
        }
      );

      elements.forEach((el) => observer.observe(el));
    };

    // 🔥 Delay to ensure DOM is ready
    const timeout = setTimeout(initReveal, 300);

    return () => clearTimeout(timeout);
  }, []);

  return null;
}