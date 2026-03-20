"use client";

import { useEffect, useRef } from "react";
import Typed from "typed.js";

export function TypedText() {
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [
        "Landing Pages",
        "Sistemas ERP",
        "CRM",
        "Automações"
      ],
      typeSpeed: 80,
      backSpeed: 50,
      backDelay: 1500,
      loop: true,
      showCursor: true,
      cursorChar: "|",
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <span className="text-[#A5A69E] inline-block">
      <span ref={el} />
    </span>
  );
}