"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function SiteMotion() {
  const pathname = usePathname();
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches || !("IntersectionObserver" in window)) return;

    const targets = document.querySelectorAll<HTMLElement>(
      "[data-reveal], .content-section, .service-group, .form-band-heading, .benefit-grid > div",
    );
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    // Any visible pixel counts: a ratio threshold can never be met by sections taller than the
    // screen (such as the job application on a phone), which would leave them invisible.
    }, { threshold: 0, rootMargin: "0px 0px -35px 0px" });

    for (const target of targets) {
      if (target.getBoundingClientRect().top < window.innerHeight * 0.9) continue;
      target.classList.add("will-reveal");
      observer.observe(target);
    }

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
