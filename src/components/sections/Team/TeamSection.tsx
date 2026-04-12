// Tidak ada "use client" — TeamSection tetap Server Component
import { teamMembers } from "@/data/packages";
import TeamCard from "./TeamCard";

export default function TeamSection() {
  return (
    <section id="team" className="py-20 lg:py-32 bg-brand-neutral">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-brand-gold">
              Tim Kami
            </span>
            <h2 className="font-serif text-brand-primary text-4xl lg:text-5xl mt-2">
              Kenalan dengan Kami
            </h2>
          </div>
          <p className="text-brand-primary/50 text-sm leading-relaxed max-w-xs">
            Setiap fotografer memiliki gaya dan keahlian unik untuk mengabadikan
            momen terbaik Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {teamMembers.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>

        {/* CTA strip */}
        <div className="mt-20 pt-12 border-t border-brand-primary/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-serif text-brand-primary text-2xl">
              Siap abadikan momen Anda?
            </p>
            <p className="text-brand-primary/40 text-sm mt-1">
              Konsultasi gratis, tanpa komitmen.
            </p>
          </div>
          <a
            href="/"
            className="
              shrink-0 px-8 py-3.5
              bg-brand-primary text-white
              text-xs font-semibold tracking-[0.15em] uppercase
              hover:bg-brand-gold hover:text-brand-primary
              transition-all duration-200 rounded-sm
            "
          >
            Book Sekarang →
          </a>
        </div>
      </div>
    </section>
  );
}
