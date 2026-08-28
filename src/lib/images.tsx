import { useState } from "react";

/* ------------------------------------------------------------------ */
/*  Photo manifest — REAL ELBI Modular project images.                 */
/*  Facebook photo CDN links expire, so durable real photos are pulled */
/*  from the official elbimodular.vercel.app media library.            */
/*  To use your own files: drop them in /public/images and swap the    */
/*  `real` paths below — the fallback keeps the layout safe.           */
/* ------------------------------------------------------------------ */

/* Curated from ELBI Modular's real project archive
   (public/images/portfolio, served via the official Vercel site).
   One strong shot per project batch — camera-timestamp filenames.
   To swap a photo, just change its filename below, or to remove one,
   delete its entry.                                                  */

const pBase = "https://elbimodular.vercel.app/images/portfolio";

export const WORKS: { src: string; kind: string; date: string }[] = [
  { src: `${pBase}/IMG20210309144150.jpg`, kind: "Custom cabinetry", date: "Mar 2021" },
  { src: `${pBase}/IMG20210412071728.jpg`, kind: "Custom cabinetry", date: "Apr 2021" },
  { src: `${pBase}/IMG20210422174507.jpg`, kind: "Custom cabinetry", date: "Apr 2021" },
  { src: `${pBase}/IMG20210422174557.jpg`, kind: "Custom cabinetry", date: "Apr 2021" },
  { src: `${pBase}/IMG20210605163354.jpg`, kind: "Custom cabinetry", date: "Jun 2021" },
  { src: `${pBase}/IMG20210612173823.jpg`, kind: "Custom cabinetry", date: "Jun 2021" },
];

export const REAL_PHOTOS = {
  hero: {
    real: "https://elbimodular.vercel.app/images/project-installation.jpg",
    fallback: "/images/hero-kitchen.jpg",
    alt: "Real ELBI Modular kitchen installation",
  },
  approach: {
    real: "https://elbimodular.vercel.app/images/project-wardrobe.webp",
    fallback: "/images/craft-detail.jpg",
    alt: "Real ELBI Modular cabinetry and workshop projects",
  },
  band: {
    real: "/images/project-island.jpg",
    fallback: "/images/project-island.jpg",
    alt: "Finished modular kitchen by ELBI Modular",
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
