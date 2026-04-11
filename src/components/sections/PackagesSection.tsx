import { packages } from "@/data/packages";

// Komponen kecil untuk satu baris fitur
// Kenapa dipisah? Karena dipakai berulang di setiap card
function FeatureItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-2.5 text-sm">
      {/* Gold checkmark */}
      <svg
        className="w-4 h-4 text-brand-gold mt-0.5 shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
      {text}
    </li>
  );
}

export default function PackagesSection() {
  return (
    <section id="packages" className="py-20 lg:py-32 bg-brand-neutral">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header — centered */}
        <div className="text-center mb-16">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-brand-gold">
            Harga Transparan
          </span>
          <h2 className="font-serif text-brand-primary text-4xl lg:text-5xl mt-2 mb-4">
            Pilih Paket Anda
          </h2>
          <p className="text-brand-primary/50 max-w-md mx-auto text-sm leading-relaxed">
            Semua paket sudah termasuk editing profesional dan file digital
            resolusi tinggi.
          </p>
        </div>

        {/* Package cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`
                relative flex flex-col p-8 rounded-sm
                transition-transform duration-300 hover:-translate-y-1
                ${
                  pkg.isFeatured
                    ? "bg-brand-primary text-white" // featured: dark
                    : "bg-white border border-brand-primary/10" // regular: light
                }
              `}
            >
              {/* Featured badge */}
              {pkg.isFeatured && (
                <div
                  className="
                  absolute -top-3 left-1/2 -translate-x-1/2
                  bg-brand-gold text-brand-primary
                  text-xs font-semibold tracking-widest uppercase
                  px-4 py-1 rounded-sm
                "
                >
                  Terpopuler
                </div>
              )}

              {/* Package name & price */}
              <div className="mb-6">
                <h3
                  className={`
                  font-serif text-2xl mb-1
                  ${pkg.isFeatured ? "text-brand-gold" : "text-brand-primary"}
                `}
                >
                  {pkg.name}
                </h3>
                <p
                  className={`text-xs mb-4 ${pkg.isFeatured ? "text-white/50" : "text-brand-primary/50"}`}
                >
                  {pkg.description}
                </p>
                <div className="flex items-baseline gap-1">
                  <span
                    className={`font-semibold text-3xl ${pkg.isFeatured ? "text-white" : "text-brand-primary"}`}
                  >
                    {pkg.price}
                  </span>
                  <span
                    className={`text-xs ${pkg.isFeatured ? "text-white/40" : "text-brand-primary/40"}`}
                  >
                    / {pkg.priceNote}
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div
                className={`h-px mb-6 ${pkg.isFeatured ? "bg-white/10" : "bg-brand-primary/10"}`}
              />

              {/* Features list — grow agar semua card tingginya sama */}
              <ul className="space-y-3 grow">
                {pkg.features.map((feature) => (
                  <FeatureItem key={feature} text={feature} />
                ))}
              </ul>

              {/* CTA Button */}
              <a
                href="#booking"
                className={`
                  mt-8 block text-center py-3.5 text-sm font-semibold
                  tracking-[0.12em] uppercase rounded-sm
                  transition-all duration-200
                  ${
                    pkg.isFeatured
                      ? "bg-brand-gold text-brand-primary hover:bg-white"
                      : "bg-brand-primary text-white hover:bg-brand-gold hover:text-brand-primary"
                  }
                `}
              >
                Pilih Paket Ini
              </a>
            </div>
          ))}
        </div>

        {/* Catatan bawah */}
        <p className="text-center text-xs text-brand-primary/40 mt-10">
          Butuh paket custom?{" "}
          <a
            href="#booking"
            className="text-brand-gold underline underline-offset-2"
          >
            Hubungi kami
          </a>{" "}
          untuk diskusi lebih lanjut.
        </p>
      </div>
    </section>
  );
}
