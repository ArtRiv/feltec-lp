"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

export function ParticlesBackground() {
  const isLoaded = useRef(false);

  const initParticles = () => {
    if (
      typeof window === "undefined" ||
      !window.particlesJS ||
      isLoaded.current
    )
      return;

    // Add a small timeout to ensure the DOM element is fully rendered and styled
    setTimeout(() => {
      window.particlesJS("particles-js", {
        particles: {
          number: { value: 60, density: { enable: true, value_area: 800 } },
          color: { value: "#F05B43" },
          shape: {
            type: "circle",
          },
          opacity: {
            value: 0.5,
            random: true,
          },
          size: {
            value: 3,
            random: true,
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#F05B43",
            opacity: 0.4,
            width: 1,
          },
          move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
          },
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: { enable: true, mode: "grab" },
            onclick: { enable: true, mode: "push" },
            resize: true,
          },
          modes: {
            grab: { distance: 140, line_linked: { opacity: 1 } },
            push: { particles_nb: 4 },
          },
        },
        retina_detect: true,
      });
      isLoaded.current = true;
    }, 100);
  };

  useEffect(() => {
    // Attempt init in case it was already loaded (e.g. fast refresh)
    if (window.particlesJS) {
      initParticles();
    }

    return () => {
      const canvas = document.querySelector("#particles-js canvas");
      if (canvas) canvas.remove();
      isLoaded.current = false;
      if (window.pJSDom && window.pJSDom.length > 0) {
        window.pJSDom[0].pJS.fn.vendors.destroypJS();
        window.pJSDom = [];
      }
    };
  }, []);

  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"
        strategy="afterInteractive"
        onLoad={initParticles}
      />
      <div
        id="particles-js"
        className="absolute inset-0 w-full h-full z-0 opacity-60 pointer-events-auto"
      />
    </>
  );
}

// Add TypeScript declaration for window.particlesJS
declare global {
  interface Window {
    particlesJS: any;
    pJSDom: any[];
  }
}
