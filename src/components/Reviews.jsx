import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

function Stars({ rating }) {
  const full = Math.max(0, Math.min(5, Math.floor(rating)));
  const empty = 5 - full;
  return (
    <div className="text-yellow-500 text-lg leading-none tracking-widest" aria-label={`${rating} out of 5 stars`}>
      {"★".repeat(full)}
      <span className="text-black/20">{"★".repeat(empty)}</span>
    </div>
  );
}
export default function Reviews({
  reviews = [],
  interval = 5000,
  className = "",
}) {
  const items = useMemo(() => reviews.filter(r => (r?.rating ?? 0) >= 4), [reviews]);
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (idx >= items.length) setIdx(0);
  }, [items.length, idx]);
  useEffect(() => {
    if (items.length <= 1) return;
    const t = setInterval(() => setIdx(i => (i + 1) % items.length), interval);
    return () => clearInterval(t);
  }, [items.length, interval]);

  if (items.length === 0) {
    return (
      <div className={`w-full grid place-items-center ${className}`}>
        <div className="text-sm text-black/50">No reviews to display yet.</div>
      </div>
    );
  }

  const review = items[idx];

  return (
    <div className={`w-full h-full grid place-items-center ${className}`}>
      <div className="w-full h-full">
        <div className="absolute right-8 top-50 2xl:top-60 w-[30%] h-[30%] overflow-hidden rounded-2xl bg-gray-200 unbounded-font ring-1 ring-black/10 shadow-lg p-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={review.id ?? `${review.name}-${idx}`}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.25, ease: "easeOut" } }}
              exit={{ opacity: 0, y: -10, scale: 0.98, transition: { duration: 0.2 } }}
              className="flex flex-col gap-3"
            >
              <div className="flex flex-col gap-2 justify-between">
                <div className="font-semibold text-black">{review.name}</div>
                <Stars rating={review.rating} />
              </div>

              <p className="text-black/80 leading-relaxed flex">
                {review.text}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
