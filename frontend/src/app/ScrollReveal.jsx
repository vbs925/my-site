"use client";
import { useEffect } from "react";

/**
 * ScrollReveal — mounts an IntersectionObserver that adds the
 * `visible` class to every element carrying a `data-reveal` attribute
 * once it enters the viewport. Drop this component anywhere on the page;
 * it renders nothing itself.
 */
export default function ScrollReveal() {
  useEffect(() => {
    const targets = document.querySelectorAll("[data-reveal]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Element entered viewport — reveal it
            entry.target.classList.add("visible");
          } else {
            // Element left viewport — reset so it replays next time
            entry.target.classList.remove("visible");
          }
        });
      },
      {
        threshold: 0.15, // trigger when 15% of the element is visible
        rootMargin: "0px 0px -40px 0px", // slight bottom offset for feel
      }
    );

    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null;
}
