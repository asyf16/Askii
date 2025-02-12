"use client";

import { useEffect, useState } from "react";

export function CursorGlow() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
      style={{
        background: `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, 
          rgba(255, 208, 0,0.13), 
          rgba(235, 149, 68,0.08) 40%,
          transparent 90%
        )`,
      }}
    />
  );
} 