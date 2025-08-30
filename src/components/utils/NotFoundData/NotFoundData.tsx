/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import "./NotFoundData.css";

interface GlitchTextProps {
  children: React.ReactNode;
  speed?: number;
  enableShadows?: boolean;
  className?: string;
}

const NotFoundData: React.FC<GlitchTextProps> = ({
  children,
  speed = 1,
  enableShadows = true,
  className = "",
}) => {
  const inlineStyles: React.CSSProperties = {
    ["--after-duration" as any]: `${speed * 3}s`,
    ["--before-duration" as any]: `${speed * 2}s`,
    ["--after-shadow" as any]: enableShadows ? "-5px 0 red" : "none",
    ["--before-shadow" as any]: enableShadows ? "5px 0 cyan" : "none",
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-[#060010]">
      <div
        className={`glitch always-glitch ${className}`}
        style={inlineStyles}
        data-text={children?.toString()}
      >
        {children}
      </div>
    </div>
  );
};

export default NotFoundData;
