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
  // Nanti diisi URL foto asli dari teman kamu
  placeholder: string; // warna sementara sebelum ada foto
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
  {
    id: "1",
    category: "Wedding",
    aspectRatio: "portrait",
    placeholder: "#2C3E50",
  },
  {
    id: "2",
    category: "Pre-Wedding",
    aspectRatio: "landscape",
    placeholder: "#1A1A1A",
  },
  {
    id: "3",
    category: "Wisuda",
    aspectRatio: "portrait",
    placeholder: "#3d3d3d",
  },
  {
    id: "4",
    category: "Event",
    aspectRatio: "landscape",
    placeholder: "#4a3728",
  },
  {
    id: "5",
    category: "Portrait",
    aspectRatio: "square",
    placeholder: "#2C3E50",
  },
  {
    id: "6",
    category: "Produk",
    aspectRatio: "portrait",
    placeholder: "#1A1A1A",
  },
  {
    id: "7",
    category: "Wedding",
    aspectRatio: "landscape",
    placeholder: "#3a2a1a",
  },
  { id: "8", category: "Wisuda", aspectRatio: "square", placeholder: "#333" },
];
