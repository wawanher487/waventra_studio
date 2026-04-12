"use client";

import { useState, useMemo, useCallback } from "react";
import { portfolioItems, type PortfolioItem } from "@/data/packages";
import PortfolioCard from "./PortfolioCard";

const ITEMS_PER_PAGE = 10;

// ─── Layout pattern ─────────────────────────────────────────────
type GridSpan = {
  colSpan?: "span-2";
  rowSpan?: "span-2";
  aspectRatio: string;
};

const LAYOUT_PATTERNS: GridSpan[] = [
  // { colSpan: "span-2", aspectRatio: "aspect-[16/7]" },
  { rowSpan: "span-2", aspectRatio: "" },
  { aspectRatio: "aspect-square" },
  { aspectRatio: "aspect-square" },
  // { colSpan: "span-2", aspectRatio: "aspect-video" },
  { aspectRatio: "aspect-[3/4]" },
  { aspectRatio: "aspect-square" },
  { aspectRatio: "aspect-square" },
  { aspectRatio: "aspect-square" },
  // { colSpan: "span-2", aspectRatio: "aspect-video" },
];

// ─── Distribusi stabil (ANTI HYDRATION BUG) ─────────────────────
function distributeEvenly(items: PortfolioItem[]): PortfolioItem[] {
  const grouped: Record<string, PortfolioItem[]> = {};

  items.forEach((item) => {
    if (!grouped[item.category]) grouped[item.category] = [];
    grouped[item.category].push(item);
  });

  // ❗ PENTING: sort biar konsisten SSR vs Client
  const keys = Object.keys(grouped).sort();

  const result: PortfolioItem[] = [];
  let round = 0;

  while (result.length < items.length) {
    let added = false;

    for (const key of keys) {
      if (grouped[key][round]) {
        result.push(grouped[key][round]);
        added = true;
      }
    }

    if (!added) break;
    round++;
  }

  return result;
}

export default function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [currentPage, setCurrentPage] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  //  FIX: pindahin ke dalam component
  const categories = useMemo(() => {
    return ["Semua", ...new Set(portfolioItems.map((i) => i.category))];
  }, []);

  // ─── Filter ──────────────────────────────────────────────────
  const filteredItems = useMemo(() => {
    if (activeCategory === "Semua") {
      return distributeEvenly(portfolioItems);
    }
    return portfolioItems.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  // ─── Pagination ──────────────────────────────────────────────
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredItems.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredItems, currentPage]);

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);

  // ─── Handlers ────────────────────────────────────────────────
  const handleCategoryChange = useCallback(
    (cat: string) => {
      if (cat === activeCategory) return;

      setIsTransitioning(true);

      setTimeout(() => {
        setActiveCategory(cat);
        setCurrentPage(1);
        setIsTransitioning(false);
      }, 150);
    },
    [activeCategory],
  );

  const handlePageChange = useCallback(
    (page: number) => {
      if (page === currentPage) return;

      setIsTransitioning(true);

      document
        .getElementById("portfolio")
        ?.scrollIntoView({ behavior: "smooth" });

      setTimeout(() => {
        setCurrentPage(page);
        setIsTransitioning(false);
      }, 150);
    },
    [currentPage],
  );

  return (
    <section id="portfolio" className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-brand-gold">
              Karya Kami
            </span>
            <h2 className="font-serif text-brand-primary text-4xl lg:text-5xl mt-2">
              Portofolio
            </h2>
          </div>

          {/* Filter */}
          <div className="flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`
                  shrink-0 px-4 py-1.5 text-[10px] font-semibold tracking-widest uppercase
                  border rounded-sm transition-all duration-200
                  ${
                    activeCategory === cat
                      ? "bg-brand-primary text-white border-brand-primary"
                      : "text-brand-primary/50 border-brand-primary/20 hover:border-brand-primary/50"
                  }
                `}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div
          className={`
            grid grid-cols-3 gap-1.5 sm:gap-2
            transition-opacity duration-200
            ${isTransitioning ? "opacity-0" : "opacity-100"}
          `}
        >
          {paginatedItems.map((item, index) => (
            <PortfolioCard
              key={item.id}
              item={item}
              pattern={LAYOUT_PATTERNS[index % LAYOUT_PATTERNS.length]}
              priority={index < 2} // ✅ LCP fix
            />
          ))}
        </div>

        {/* Footer */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-brand-primary/40">
            Menampilkan{" "}
            <strong className="text-brand-primary/60 font-semibold">
              {Math.min(currentPage * ITEMS_PER_PAGE, filteredItems.length)}
            </strong>{" "}
            dari{" "}
            <strong className="text-brand-primary/60 font-semibold">
              {filteredItems.length}
            </strong>{" "}
            karya
          </p>

          {totalPages > 1 && (
            <div className="flex items-center gap-1">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="w-8 h-8 border rounded-sm disabled:opacity-30"
              >
                ←
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`
                      w-8 h-8 border rounded-sm text-xs
                      ${
                        currentPage === page
                          ? "bg-brand-primary text-white"
                          : "text-brand-primary/50"
                      }
                    `}
                  >
                    {page}
                  </button>
                ),
              )}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="w-8 h-8 border rounded-sm disabled:opacity-30"
              >
                →
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
