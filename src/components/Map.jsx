import React from "react";

export default function Map({
  address = "338 Lake Ave, Metuchen, NJ 08840",
  zoom = 16,
  className = "",
}) {
  const src = `https://www.google.com/maps?q=${encodeURIComponent(
    address
  )}&z=${zoom}&output=embed`;

  return (
    <div className={`relative w-full overflow-hidden rounded-xl shadow ${className}`}>
      {/* 16:9 responsive map; change aspect if you like */}
      <iframe
        title={`Map of ${address}`}
        src={src}
        className="w-[300px] h-[350px] aspect-[16/9] border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
