// Server Component — tidak ada interaktivitas
import Link from "next/link";

// Data footer dipisah dari markup — kalau ada perubahan link, edit di sini
const footerLinks = {
  layanan: [
    { label: "Wedding", href: "#portfolio" },
    { label: "Pre-Wedding", href: "#portfolio" },
    { label: "Wisuda", href: "#portfolio" },
    { label: "Event", href: "#portfolio" },
    { label: "Konten Produk", href: "#portfolio" },
  ],
  info: [
    { label: "Paket & Harga", href: "#packages" },
    { label: "Tim Kami", href: "#team" },
    { label: "Kebijakan Privasi", href: "/privacy" },
  ],
};

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "TikTok", href: "https://tiktok.com" },
  { label: "WhatsApp", href: "https://wa.me/6281928897858" },
];

export default function Footer() {
  return (
    <footer className="bg-brand-primary text-white">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <p className="font-serif text-brand-gold text-2xl tracking-widest uppercase mb-4">
              Waventra Studio
            </p>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs mb-8">
              Mengabadikan momen terbaik hidup Anda dengan sentuhan artistik dan
              kualitas yang tahan waktu.
            </p>
            {/* Social links */}
            <div className="flex gap-4">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    text-[10px] font-semibold tracking-widest uppercase
                    text-white/40 hover:text-brand-gold
                    transition-colors duration-200
                  "
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Layanan */}
          <div>
            <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-brand-gold mb-6">
              Layanan
            </p>
            <ul className="space-y-3">
              {footerLinks.layanan.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/40 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-brand-gold mb-6">
              Informasi
            </p>
            <ul className="space-y-3">
              {footerLinks.info.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/40 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Kontak langsung */}
            <div className="mt-8 pt-8 border-t border-white/10">
              <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-brand-gold mb-3">
                Kontak
              </p>
              <a
                href="https://wa.me/6281928897858"
                target="_blank"
                className="text-sm text-white/40 hover:text-white transition-colors duration-200 block"
              >
                +62 819-2889-7858
              </a>
              <a
                href="mailto:hello@WaventraStudio.id"
                className="text-sm text-white/40 hover:text-white transition-colors duration-200 block mt-1"
              >
                hello@WaventraStudio.id
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-white/25">
            © {new Date().getFullYear()} Waventra Studio. All rights reserved.
          </p>
          <p className="text-xs text-white/25">
            Built by{" "}
            <a
              href="https://www.wawanhermawan.dev/"
              target="_blank"
              className="hover:text-brand-gold"
            >
              {" "}
              Wawan Hermawan.
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
