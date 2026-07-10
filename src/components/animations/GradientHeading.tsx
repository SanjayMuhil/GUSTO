"use client";

import { ReactNode } from "react";

interface GradientHeadingProps {
  children: ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
}

export default function GradientHeading({
  children,
  as: Component = "h2",
  className = "",
}: GradientHeadingProps) {
  return (
    <Component
      className={`hero-heading ${className}`}
      style={{
        background: "linear-gradient(180deg, #646973 0%, #BBCCD7 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      {children}
    </Component>
  );
}
