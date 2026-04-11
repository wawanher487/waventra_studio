"use client";

import Image from "next/image";
import { PortfolioItem } from "@/data/packages";

type GridSpan = {
  colSpan?: "span-2";
  rowSpan?: "span-2";
  aspectRatio: string;
};

export default function PortfolioCard({
  item,
  pattern,
  priority = false,
}: {
  item: PortfolioItem;
  pattern: GridSpan;
  priority?: boolean;
}) {
  const heightClass = pattern.rowSpan
    ? "h-full min-h-[280px]"
    : pattern.aspectRatio;

  return (
    <div
      className={`
        group relative overflow-hidden cursor-pointer bg-brand-primary
        ${pattern.colSpan === "span-2" ? "col-span-2" : ""}
        ${pattern.rowSpan === "span-2" ? "row-span-2" : ""}
      `}
    >
      <div className={`relative w-full ${heightClass}`}>
        {item.url ? (
          <Image
            src={item.url}
            alt={item.category}
            fill
            priority={priority} // ✅ FIX LCP
            loading={priority ? "eager" : "lazy"}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className="w-full h-full"
            style={{ backgroundColor: item.placeholder ?? "#1A1A1A" }}
          />
        )}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-brand-primary/55 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
        <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-brand-gold">
          {item.category}
        </span>
      </div>
    </div>
  );
}
