"use client";

import { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Image from "next/image";
import galleryData from "../../content/gallery.json";

const gallerySections = galleryData.sections;

const SECTIONS_PER_PAGE = 2;

export default function GalleryPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [columns, setColumns] = useState(3);

  const totalPages = Math.ceil(gallerySections.length / SECTIONS_PER_PAGE);
  const startIndex = (currentPage - 1) * SECTIONS_PER_PAGE;
  const visibleSections = gallerySections.slice(startIndex, startIndex + SECTIONS_PER_PAGE);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setColumns(2);
      } else {
        setColumns(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-red-600 selection:text-white overflow-x-hidden flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-7xl relative z-10">
          <div className="space-y-10 sm:space-y-12 md:space-y-16">
            {visibleSections.map((section: any) => (
              <section key={section.title} className="space-y-4 sm:space-y-6">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white uppercase tracking-tight">
                  {section.title}
                </h2>
                <div
                  className="grid gap-3 sm:gap-4"
                  style={{
                    gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`
                  }}
                >
                  {section.images.map((img: any, idx: number) => (
                    <div
                      key={idx}
                      className="group relative aspect-square overflow-hidden rounded-xl bg-zinc-950 border border-zinc-900 shadow-lg shadow-black/20 transition-all duration-300 hover:border-red-600/30 hover:shadow-red-600/10"
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 sm:gap-3 py-8 sm:py-12">
              <button
                type="button"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 sm:px-4 py-2 rounded-xl border border-zinc-900 bg-zinc-950 text-zinc-500 font-black text-[10px] sm:text-xs uppercase tracking-widest hover:border-red-600/30 hover:text-white transition duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {galleryData.pagination.previous}
              </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => goToPage(page)}
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center transition duration-300 ${
                  page === currentPage
                    ? "bg-red-600 text-white shadow-lg shadow-red-600/20"
                    : "border border-zinc-900 bg-zinc-950 text-zinc-400 hover:border-red-600/30 hover:text-white"
                }`}
              >
                {page}
              </button>
            ))}

              <button
                type="button"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 sm:px-4 py-2 rounded-xl border border-zinc-900 bg-zinc-950 text-zinc-500 font-black text-[10px] sm:text-xs uppercase tracking-widest hover:border-red-600/30 hover:text-white transition duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {galleryData.pagination.next}
              </button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
