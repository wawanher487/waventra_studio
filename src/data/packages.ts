// Interface dulu — definisikan "kontrak" bentuk datanya
export interface Package {
  id: string;
  name: string;
  price: string;
  priceNote: string;
  description: string;
  features: string[];
  isFeatured?: boolean; // ? artinya optional
}

export interface PortfolioItem {
  id: string;
  category: string;
  aspectRatio: "portrait" | "landscape" | "square";
  url?: string; // jika ada paki gambar
  placeholder?: string; // jika tidak ada url pakai warna
}

// ========================
// DATA PAKET
// ========================
export const packages: Package[] = [
  {
    id: "essential",
    name: "Essential",
    price: "Rp 750rb",
    priceNote: "per sesi",
    description: "Cocok untuk portrait, wisuda, dan acara singkat",
    features: [
      "2 jam sesi pemotretan",
      "50 foto hasil editing",
      "1 fotografer profesional",
      "File digital resolusi tinggi",
      "Revisi editing 1x",
    ],
  },
  {
    id: "signature",
    name: "Signature",
    price: "Rp 1,5jt",
    priceNote: "per acara",
    description: "Pilihan terbaik untuk wedding dan event penting",
    features: [
      "Full day coverage (8 jam)",
      "150 foto hasil editing",
      "1 video highlight 3-5 menit",
      "1 fotografer + 1 videografer",
      "File digital resolusi tinggi",
      "Revisi editing 2x",
    ],
    isFeatured: true,
  },
  {
    id: "couture",
    name: "Couture",
    price: "Rp 3jt",
    priceNote: "mulai dari",
    description: "Paket premium dengan konsep custom sesuai visi kamu",
    features: [
      "Full day coverage (10 jam)",
      "300+ foto hasil editing",
      "Video cinematic 10-15 menit",
      "2 fotografer + 1 videografer",
      "Drone coverage",
      "Konsultasi kreatif pre-shoot",
      "Revisi editing unlimited",
    ],
  },
];

// ========================
// DATA PORTFOLIO
// ========================
export const portfolioItems: PortfolioItem[] = [
  // Wedding
  {
    id: "w1",
    category: "Wedding",
    aspectRatio: "portrait",
    url: "/portfolio/wedding1.jpg",
  },
  {
    id: "w2",
    category: "Wedding",
    aspectRatio: "landscape",
    url: "/portfolio/wedding2.jpg",
  },
  {
    id: "w3",
    category: "Wedding",
    aspectRatio: "square",
    url: "/portfolio/wedding3.jpg",
  },
  {
    id: "w4",
    category: "Wedding",
    aspectRatio: "portrait",
    url: "/portfolio/wedding5.jpg",
  },
  {
    id: "w5",
    category: "Wedding",
    aspectRatio: "landscape",
    url: "/portfolio/wedding2.jpg",
  },
  // Pre-Wedding
  {
    id: "pw1",
    category: "Pre-Wedding",
    aspectRatio: "landscape",
    placeholder: "#3a2a1a",
  },
  {
    id: "pw2",
    category: "Pre-Wedding",
    aspectRatio: "portrait",
    placeholder: "#4a3520",
  },
  {
    id: "pw3",
    category: "Pre-Wedding",
    aspectRatio: "square",
    placeholder: "#3d2b18",
  },
  // Wisuda
  {
    id: "wis1",
    category: "Wisuda",
    aspectRatio: "portrait",
    placeholder: "#1A1A1A",
  },
  {
    id: "wis2",
    category: "Wisuda",
    aspectRatio: "landscape",
    placeholder: "#2a2a2a",
  },
  {
    id: "wis3",
    category: "Wisuda",
    aspectRatio: "square",
    placeholder: "#222",
  },
  // Event
  {
    id: "e1",
    category: "Event",
    aspectRatio: "landscape",
    placeholder: "#4a3728",
  },
  {
    id: "e2",
    category: "Event",
    aspectRatio: "portrait",
    placeholder: "#3d2e22",
  },
  {
    id: "e3",
    category: "Event",
    aspectRatio: "square",
    placeholder: "#45342a",
  },
  // Portrait
  {
    id: "p1",
    category: "Portrait",
    aspectRatio: "portrait",
    placeholder: "#333",
  },
  {
    id: "p2",
    category: "Portrait",
    aspectRatio: "square",
    placeholder: "#3a3a3a",
  },
  {
    id: "p3",
    category: "Portrait",
    aspectRatio: "landscape",
    placeholder: "#2d2d2d",
  },
  // Produk
  {
    id: "pr1",
    category: "Produk",
    aspectRatio: "square",
    placeholder: "#1A1A1A",
  },
  {
    id: "pr2",
    category: "Produk",
    aspectRatio: "landscape",
    placeholder: "#252525",
  },
];

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  speciality: string[];
  sessionCount: string; // "50+ sesi" — string bukan number karena ada "+"
  initials: string; // fallback kalau tidak ada foto
  url?: string; // foto profil opsional
}

export const teamMembers: TeamMember[] = [
  {
    id: "member-1",
    name: "Nama Teman A", // ← ganti dengan nama asli
    role: "Lead Photographer",
    speciality: ["Wedding", "Pre-Wedding", "Portrait"],
    sessionCount: "50+",
    initials: "TA",
    url: "/team/avatar.png",
    // url: "/team/member-a.jpg" // uncomment kalau sudah ada foto
  },
  {
    id: "member-2",
    name: "Nama Teman B",
    role: "Photographer",
    speciality: ["Event", "Wisuda", "Portrait"],
    sessionCount: "10+",
    initials: "TB",
    url: "/team/r.png",
  },
  {
    id: "member-3",
    name: "Nama Teman C",
    role: "Videographer",
    speciality: ["Wedding", "Event", "Konten Produk"],
    sessionCount: "10+",
    initials: "TC",
    url: "/team/elon.jpg",
  },
];
