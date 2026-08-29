import { useState } from "react";

/* ------------------------------------------------------------------ */
/*  Photo manifest — REAL ELBI Modular project images.                 */
/*  Facebook photo CDN links expire, so durable real photos are pulled */
/*  from the official elbimodular.vercel.app media library.            */
/*  To use your own files: drop them in /public/images and swap the    */
/*  `real` paths below — the fallback keeps the layout safe.           */
/* ------------------------------------------------------------------ */

/* Curated from ELBI Modular's real project archive
   (elbimodular/public/images/portfolio).
   6 premium, finished modular cabinet builds — NO people in frame,
   selected to attract residential & commercial clients:
   wardrobes, vanity, island/counter and smart hardware.
   Files are copied locally to /public/images/portfolio so builds are
   durable and don't depend on external CDN expiry. */

export const WORKS: { src: string; kind: string; date: string }[] = [
  { src: "/images/portfolio/IMG20230525123356.jpg", kind: "Built-in Wardrobe — Light Oak", date: "May 2023" },
  { src: "/images/portfolio/IMG20231025170751.jpg", kind: "Luxury Vanity — Gold Vessels", date: "Oct 2023" },
  { src: "/images/portfolio/IMG20231005110051.jpg", kind: "Modern Island & Counter", date: "Oct 2023" },
  { src: "/images/portfolio/IMG20230525123408.jpg", kind: "Wardrobe Interior — Hanging & Drawers", date: "May 2023" },
  { src: "/images/portfolio/IMG20230608171545.jpg", kind: "Corner Cabinet — Lazy Susan", date: "Jun 2023" },
  { src: "/images/portfolio/IMG20230525123546.jpg", kind: "Modular Shelving — 8-Cube", date: "May 2023" },
];

export const REAL_PHOTOS = {
  hero: {
    real: "https://elbimodular.vercel.app/images/project-installation.jpg",
    fallback: "/images/hero-kitchen.jpg",
    alt: "Modular kitchen cabinets Philippines — ELBI Modular L-shaped installation, based in Laguna serving Luzon Visayas Mindanao",
  },
  approach: {
    real: "https://elbimodular.vercel.app/images/project-wardrobe.webp",
    fallback: "/images/craft-detail.jpg",
    alt: "Built-in wardrobe and cabinetry by ELBI Modular — made to measure since 2010, Manila & nationwide service",
  },
  band: {
    real: "/images/project-island.jpg",
    fallback: "/images/project-island.jpg",
    alt: "Finished modular kitchen island by ELBI Modular — custom built in Laguna for homes across Luzon, Visayas & Mindanao",
  },
};

/* graceful image: tries the real hosted photo, falls back to local art */

export function Photo({
  src,
  fallback,
  alt,
  className = "",
  eager = false,
}: {
  src: string;
  fallback: string;
  alt: string;
  className?: string;
  eager?: boolean;
}) {
  const [current, setCurrent] = useState(src);
  return (
    <img
      src={current}
      alt={alt}
      className={className}
      loading={eager ? "eager" : "lazy"}
      onError={() => current !== fallback && setCurrent(fallback)}
    />
  );
}
