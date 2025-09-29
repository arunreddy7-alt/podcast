"use client";

import React, { useEffect } from "react";

const animationClassMap = {
  fade: "animate-fadeIn",
  "slide-up": "animate-slideUp",
  "slide-left": "animate-fadeInFromLeft",
  "slide-right": "animate-fadeInFromRight",
};

export default function ScrollAnimator() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const elements = Array.from(document.querySelectorAll("[data-anim]"));
    // Initialize hidden state
    elements.forEach((el) => {
      if (!el.classList.contains("opacity-0")) {
        el.classList.add("opacity-0");
      }
    });

    if (!("IntersectionObserver" in window)) {
      // Fallback: reveal all immediately
      elements.forEach((el) => el.classList.remove("opacity-0"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const target = entry.target;
          const type = target.getAttribute("data-anim") || "fade";
          const onceAttr = target.getAttribute("data-anim-once");
          const once = onceAttr !== "false"; // default true
          const delay = target.getAttribute("data-anim-delay");
          const cls = animationClassMap[type] || animationClassMap.fade;

          const apply = () => {
            target.classList.add(cls);
            target.classList.remove("opacity-0");
          };

          if (delay) {
            setTimeout(apply, parseInt(delay, 10) || 0);
          } else {
            apply();
          }

          if (once) observer.unobserve(target);
        });
      },
      { threshold: 0.1, root: null, rootMargin: "0px 0px -10% 0px" }
    );

    elements.forEach((el) => observer.observe(el));

    // Safety: ensure nothing stays hidden too long
    const safety = setTimeout(() => {
      elements.forEach((el) => {
        if (el.classList.contains("opacity-0")) el.classList.remove("opacity-0");
      });
    }, 1500);

    return () => {
      clearTimeout(safety);
      observer.disconnect();
    };
  }, []);

  return null;
}



"use client";

import React, { useEffect } from "react";

const animationClassMap = {
  fade: "animate-fadeIn",
  "slide-up": "animate-slideUp",
  "slide-left": "animate-fadeInFromLeft",
  "slide-right": "animate-fadeInFromRight",
};

export default function ScrollAnimator() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const elements = Array.from(document.querySelectorAll("[data-anim]"));
    // Initialize hidden state
    elements.forEach((el) => {
      if (!el.classList.contains("opacity-0")) {
        el.classList.add("opacity-0");
      }
    });

    if (!("IntersectionObserver" in window)) {
      // Fallback: reveal all immediately
      elements.forEach((el) => el.classList.remove("opacity-0"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const target = entry.target;
          const type = target.getAttribute("data-anim") || "fade";
          const onceAttr = target.getAttribute("data-anim-once");
          const once = onceAttr !== "false"; // default true
          const delay = target.getAttribute("data-anim-delay");
          const cls = animationClassMap[type] || animationClassMap.fade;

          const apply = () => {
            target.classList.add(cls);
            target.classList.remove("opacity-0");
          };

          if (delay) {
            setTimeout(apply, parseInt(delay, 10) || 0);
          } else {
            apply();
          }

          if (once) observer.unobserve(target);
        });
      },
      { threshold: 0.1, root: null, rootMargin: "0px 0px -10% 0px" }
    );

    elements.forEach((el) => observer.observe(el));

    // Safety: ensure nothing stays hidden too long
    const safety = setTimeout(() => {
      elements.forEach((el) => {
        if (el.classList.contains("opacity-0")) el.classList.remove("opacity-0");
      });
    }, 1500);

    return () => {
      clearTimeout(safety);
      observer.disconnect();
    };
  }, []);

  return null;
}