"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Portofolio", href: "#portofolio" },
  { label: "Packages", href: "#packages" },
  { label: "Tim", href: "#tim" },
  { label: "Kontak", href: "#kontak" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  //deteksi scroll - tambah background blur saat user scroll kebawah
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    //hapus event listener saat unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-brand-navy/95 backdrop-blur-sm shadow-lg" : "bg-brand-primary"}`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* logo */}
          <Link
            href="/"
            className="font-serif text-brand-gold text-xl tracking-widest uppercase"
          >
            Waventra Studio
          </Link>

          {/* dekstop navigation - hidden di mobile */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-white/70 hover:text-brand-gold transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA button - hidden di mobile */}
          <div className="hidden md:block">
            <Link
              href="#booking"
              className="px-4 py-2.5 text-sm font-semibold bg-white text-brand-primary hover:bg-brand-gold hover:text-brand-primary transition-all duration-200 rounded-sm tracking-wide"
            >
              Booking Sekarang
            </Link>
          </div>

          {/* Hamburger button - hanya muncul di mobile */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            {/* Animasi Hamburger ->  X menggunakan tailwind transform */}
            <span
              className={`block w-5 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block w-5 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-5 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* mobile menu - slide down saat ismenuope = true */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="px-6 py-4 flex flex-col gap-4 border-t border-white/10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="text-white/70 hover:text-brand-gold transition-colors py-1"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#booking"
            onClick={() => setIsMenuOpen(false)}
            className="mt-2 px-6 py-3 text-sm font-semibold text-center bg-brand-gold text-brand-primary rounded-sm tracking-wide"
          >
            Booking Sekarang
          </Link>
        </div>
      </div>
    </nav>
  );
}
