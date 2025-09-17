import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const modules = import.meta.glob(
  "/src/assets/images/DinerMedia/*/*.{png,jpg,jpeg,webp,gif}",
  { eager: true }
);

{/* URL build */}
const IMAGES_BY_FOLDER = Object.entries(modules).reduce((acc, [path, mod]) => {
  const url = mod.default || mod;
  const match = path.match(/DinerMedia\/([^/]+)\//);
  const folder = match?.[1] ?? "misc";
  acc[folder] ||= [];
  acc[folder].push(url);
  return acc;
}, /** @type{Record<string,string[]>} */ ({}));
console.log("[glob keys]", Object.keys(modules));

{/* Randomizer */}
const shuffle = (arr) => {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = (Math.random() * (i + 1)) | 0;
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

{/* TOD */}
const getSlot = (d = new Date()) => {
  const h = d.getHours(); 
  if (h >= 6 && h < 11) return "breakfast";
  if (h >= 11 && h < 15) return "lunch";
  if (h >= 15 && h < 21) return "dinner";
  return "off"; 
};

{/* Meal match */}
const slotFolders = (slot) => {
  switch (slot) {
    case "breakfast":
      return ["breakfast"];
    case "lunch":
      return ["salad", "entree"];
    case "dinner":
      return ["dessert", "entree", "salad"];
    default:
      return ["dessert"]; 
  }
};

export default function TimeAwareCarousel({
  intervalMs = 6500,
  fadeSeconds = 0.8,
  maxImages = 12,
  className = "",
}) {
  const [index, setIndex] = useState(0);
  const [slot, setSlot] = useState(getSlot());
  const hoverRef = useRef(false);

  {/* Meal Match swap */}
  useEffect(() => {
    const t = setInterval(() => {
      const s = getSlot();
      if (s !== slot) setSlot(s);
    }, 60_000);
    return () => clearInterval(t);
  }, [slot]);

  const images = useMemo(() => {
    const poolFolders = ["building", ...slotFolders(slot)];
    const pool = poolFolders.flatMap((f) => IMAGES_BY_FOLDER[f] || []);
    const unique = Array.from(new Set(pool)); 
    const shuffled = shuffle(unique).slice(0, maxImages);
    return shuffled.length ? shuffled : IMAGES_BY_FOLDER["building"] || [];
  }, [slot, maxImages]);
  useEffect(() => {
    setIndex(0);
  }, [images]);

  {/* Autoplay */}
  useEffect(() => {
    const id = setInterval(() => {
      if (!hoverRef.current && images.length > 0) {
        setIndex((i) => (i + 1) % images.length);
      }
    }, intervalMs);
    return () => clearInterval(id);
  }, [images, intervalMs]);

  {/* Next match preload */}
  useEffect(() => {
    const next = images[(index + 1) % images.length];
    if (!next) return;
    const img = new Image();
    img.src = next;
  }, [index, images]);

  return (
    <div
      className={`relative w-full h-full overflow-hidden ${className}`}
      onMouseEnter={() => (hoverRef.current = true)}
      onMouseLeave={() => (hoverRef.current = false)}
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.img
          key={images[index] || "placeholder"}
          src={images[index]}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: fadeSeconds, ease: "easeInOut" }}
          draggable={false}
        />
      </AnimatePresence>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
    </div>
  );
}
