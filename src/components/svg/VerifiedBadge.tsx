import React from "react";

const VerifiedBadge = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="60" cy="60" r="55" fill="#6542EE" />

      <path
        d="M60 25L40 35V50C40 70 60 85 60 85C60 85 80 70 80 50V35L60 25Z"
        fill="white"
      />

      <path d="M50 55L45 50L40 55L50 65L75 40L70 35L50 55Z" fill="#6542EE" />

      <circle
        cx="60"
        cy="60"
        r="55"
        fill="none"
        stroke="white"
        strokeWidth="2"
      />
    </svg>

    // <svg
    //   width="20"
    //   height="20"
    //   viewBox="0 0 160 160"
    //   xmlns="http://www.w3.org/2000/svg"
    // >
    //   <defs>
    //     <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
    //       <stop offset="0%" stop-color="#6542EE" />
    //       <stop offset="100%" stop-color="#7A5AFF" />
    //     </linearGradient>
    //     <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
    //       <feDropShadow
    //         dx="0"
    //         dy="4"
    //         stdDeviation="8"
    //         flood-color="rgba(101, 66, 238, 0.3)"
    //       />
    //     </filter>
    //   </defs>

    //   <circle cx="80" cy="80" r="72" fill="url(#grad)" filter="url(#shadow)" />

    //   <path
    //     d="M80 40L50 55V75C50 95 80 115 80 115C80 115 110 95 110 75V55L80 40Z"
    //     fill="white"
    //     fill-opacity="0.9"
    //     stroke="#F5F5F5"
    //     stroke-width="1.5"
    //   />

    //   <path
    //     d="M65 75L58 68L52 74L65 87L105 47L99 41L65 75Z"
    //     fill="url(#grad)"
    //     stroke="url(#grad)"
    //     stroke-width="1"
    //   />

    //   <circle
    //     cx="80"
    //     cy="80"
    //     r="72"
    //     fill="none"
    //     stroke="white"
    //     stroke-width="1.5"
    //     stroke-opacity="0.2"
    //   />
    // </svg>

    // <svg
    //   xmlns="http://www.w3.org/2000/svg"
    //   width="20"
    //   height="20"
    //   viewBox="0 0 48 48"
    //   fill="none"
    // >
    //   <defs>
    //     <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
    //       <stop offset="0%" style={{ stopColor: "#7A5FFF", stopOpacity: 1 }} />
    //       <stop
    //         offset="100%"
    //         style={{ stopColor: "#6542EE", stopOpacity: 1 }}
    //       />
    //     </linearGradient>
    //   </defs>
    //   <circle cx="24" cy="24" r="22" fill="url(#grad)" />
    //   <path
    //     d="M20.5 25.75L17.75 23L16.5 24.25L20.5 28.25L31.5 17.25L30.25 16L20.5 25.75Z"
    //     fill="white"
    //   />
    // </svg>
  );
};

export default VerifiedBadge;
