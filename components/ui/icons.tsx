import type { SVGProps } from "react";

/**
 * Minimal stroke-icon set (24 viewBox, currentColor) matching the line style
 * of the Figma file's icons. Used on the sub-pages where the design calls for
 * simple outline pictograms.
 */

type P = SVGProps<SVGSVGElement>;

function base(props: P): P {
  return {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
    ...props,
  };
}

export const IconStar = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.5 9.7l5.9-.9L12 3.5z" />
  </svg>
);

export const IconAward = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="9" r="5.5" />
    <path d="M8.5 13.5L7 21l5-2.6L17 21l-1.5-7.5" />
    <path d="M12 6.5l.9 1.8 2 .3-1.4 1.4.3 2-1.8-1-1.8 1 .3-2-1.4-1.4 2-.3.9-1.8z" />
  </svg>
);

export const IconHeart = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 20.5s-8-4.9-8-10.5C4 6.9 6.4 5 8.7 5c1.4 0 2.6.7 3.3 1.7C12.7 5.7 13.9 5 15.3 5 17.6 5 20 6.9 20 10c0 5.6-8 10.5-8 10.5z" />
  </svg>
);

export const IconHandshake = (p: P) => (
  <svg {...base(p)}>
    <path d="M8 12l-4.5-1L2 6.5 6.5 5 11 8.5" />
    <path d="M16 12l4.5-1L22 6.5 17.5 5 13 8.5" />
    <path d="M8 12l3.2 3.2a1.6 1.6 0 0 0 2.3 0l.7-.7a1.6 1.6 0 0 0 0-2.3L11 9" />
    <path d="M13.5 15.5l1.2 1.2a1.6 1.6 0 0 0 2.3 0l.5-.5" />
    <path d="M8 12l8-3.5" />
  </svg>
);

export const IconCursorClick = (p: P) => (
  <svg {...base(p)}>
    <path d="M9 9.5l10 3.2-4.3 1.5-2 4.1L9 9.5z" />
    <path d="M8.5 2.5v3M3 8.5h3M4.6 4.6l2.1 2.1M12.4 4.6l-2.1 2.1" />
  </svg>
);

export const IconShieldCheck = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 3l7 2.8v5.4c0 4.6-3 7.7-7 9.8-4-2.1-7-5.2-7-9.8V5.8L12 3z" />
    <path d="M9 11.8l2.2 2.2 4-4.2" />
  </svg>
);

export const IconSettings = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="3.2" />
    <path d="M12 2.8v2.7M12 18.5v2.7M2.8 12h2.7M18.5 12h2.7M5.5 5.5l1.9 1.9M16.6 16.6l1.9 1.9M18.5 5.5l-1.9 1.9M7.4 16.6l-1.9 1.9" />
  </svg>
);

export const IconTrendingUp = (p: P) => (
  <svg {...base(p)}>
    <path d="M3 17l6-6 4 4 8-8" />
    <path d="M15 7h6v6" />
  </svg>
);

export const IconCircleCheck = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M8.5 12.2l2.4 2.4 4.6-4.8" />
  </svg>
);

export const IconShareNodes = (p: P) => (
  <svg {...base(p)}>
    <circle cx="6" cy="12" r="2.5" />
    <circle cx="17" cy="5.5" r="2.5" />
    <circle cx="17" cy="18.5" r="2.5" />
    <path d="M8.2 10.8l6.5-4M8.2 13.2l6.5 4" />
  </svg>
);

export const IconLock = (p: P) => (
  <svg {...base(p)}>
    <rect x="5" y="10.5" width="14" height="9.5" rx="2" />
    <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
    <circle cx="12" cy="15.2" r="1.3" />
  </svg>
);

export const IconUsers = (p: P) => (
  <svg {...base(p)}>
    <circle cx="9" cy="8.5" r="3.5" />
    <path d="M3 20c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5" />
    <path d="M16 5.4a3.5 3.5 0 0 1 0 6.2M17.8 14.9c2 .8 3.2 2.5 3.2 5.1" />
  </svg>
);

export const IconSearch = (p: P) => (
  <svg {...base(p)}>
    <circle cx="11" cy="11" r="7" />
    <path d="M16.3 16.3L21 21" />
  </svg>
);

export const IconGrid = (p: P) => (
  <svg {...base(p)}>
    <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
    <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
    <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
    <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
  </svg>
);

export const IconBrain = (p: P) => (
  <svg {...base(p)}>
    <path d="M9.5 4.5A2.8 2.8 0 0 0 5 7.2c-1.6.5-2.5 1.7-2.5 3.3 0 1.3.7 2.3 1.7 2.9A3.3 3.3 0 0 0 7 19.6c.9.9 2.4 1.2 3.5.4V6.9c0-1.4-.4-2.4-1-2.4z" />
    <path d="M14.5 4.5A2.8 2.8 0 0 1 19 7.2c1.6.5 2.5 1.7 2.5 3.3 0 1.3-.7 2.3-1.7 2.9a3.3 3.3 0 0 1-2.8 6.2c-.9.9-2.4 1.2-3.5.4V6.9c0-1.4.4-2.4 1-2.4z" />
  </svg>
);

export const IconDatabase = (p: P) => (
  <svg {...base(p)}>
    <ellipse cx="12" cy="5.5" rx="7.5" ry="2.8" />
    <path d="M4.5 5.5v13c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8v-13" />
    <path d="M4.5 12c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8" />
  </svg>
);

export const IconCloudUpload = (p: P) => (
  <svg {...base(p)}>
    <path d="M7 18.5a4.3 4.3 0 0 1-.6-8.5 5.5 5.5 0 0 1 10.8 1.2 3.8 3.8 0 0 1-.7 7.3" />
    <path d="M12 12.5v7M9.2 15l2.8-2.8 2.8 2.8" />
  </svg>
);

export const IconHeadset = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 13a8 8 0 0 1 16 0" />
    <rect x="3" y="13" width="4" height="6" rx="1.8" />
    <rect x="17" y="13" width="4" height="6" rx="1.8" />
    <path d="M20 19a3 3 0 0 1-3 3h-3" />
  </svg>
);

export const IconNetwork = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="5" r="2.2" />
    <circle cx="5" cy="18" r="2.2" />
    <circle cx="19" cy="18" r="2.2" />
    <path d="M12 7.2v3.6M12 10.8L6.3 16.4M12 10.8l5.7 5.6" />
  </svg>
);

export const IconRadar = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5.5" />
    <circle cx="12" cy="12" r="2" />
    <path d="M12 3v18M3 12h18" />
    <path d="M12 12l6-6" />
    <circle cx="18" cy="6" r="1.1" fill="currentColor" stroke="none" />
  </svg>
);

export const IconEye = (p: P) => (
  <svg {...base(p)}>
    <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" />
    <circle cx="12" cy="12" r="3.2" />
  </svg>
);
