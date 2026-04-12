"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { TeamMember } from "@/data/packages";

export default function TeamCard({ member }: { member: TeamMember }) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleTap = useCallback(() => {
    if (!member.url) return;
    setIsRevealed((prev) => !prev);
  }, [member.url]);

  return (
    <div className="group" onClick={handleTap}>
      <div className="relative aspect-3/4 overflow-hidden mb-5 cursor-pointer">

        {/* LAYER 1: Foto asli */}
        {member.url && (
          <div
            className={cn(
              "absolute inset-0 transition-opacity duration-700 group-hover:opacity-100",
              isMounted && isRevealed ? "opacity-100" : "opacity-0"
            )}
          >
            <Image
              src={member.url}
              alt={`Foto ${member.name}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              quality={90}
              className="object-cover object-top"
            />
          </div>
        )}

        {/* LAYER 2: Placeholder */}
        <div
          className={cn(
            "absolute inset-0 bg-brand-primary transition-opacity duration-700",
            "flex flex-col items-center justify-center gap-3",
            member.url && "group-hover:opacity-0",
            // Saat belum mount (server): selalu opacity-100
            // Setelah mount: ikut state
            !isMounted || !member.url || !isRevealed ? "opacity-100" : "opacity-0"
          )}
        >
          <span className="font-serif text-5xl text-brand-gold/40 select-none">
            {member.initials}
          </span>
          <div className="w-8 h-px bg-brand-gold/20" />

          {isMounted && member.url && !isRevealed && (
            <span className="absolute bottom-4 left-0 right-0 text-center text-[10px] text-white/30 tracking-widest uppercase md:hidden">
              Tap untuk lihat
            </span>
          )}
        </div>

        {/* Badge sesi */}
        <div
          className={cn(
            "absolute top-4 right-4 z-10",
            "bg-brand-gold text-brand-primary",
            "text-[10px] font-semibold tracking-wider px-2.5 py-1 rounded-sm",
            "transition-opacity duration-500 group-hover:opacity-100",
            isMounted && isRevealed ? "opacity-100" : "opacity-0"
          )}
        >
          {member.sessionCount} sesi
        </div>
      </div>

      {/* Info */}
      <div>
        <h3 className="font-serif text-brand-primary text-xl mb-1">
          {member.name}
        </h3>
        <p className="text-brand-gold text-[10px] font-semibold tracking-widest uppercase mb-3">
          {member.role}
        </p>

        {/* FIX UTAMA: class string satu baris, tidak multiline */}
        <div className="flex flex-wrap gap-1.5">
          {member.speciality.map((spec) => (
            <span
              key={spec}
              className="text-[10px] font-semibold tracking-wider uppercase border border-brand-primary/15 text-brand-primary/50 px-2.5 py-1 rounded-sm"
            >
              {spec}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}