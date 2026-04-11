"use client";

import { useState } from "react";

const packages = [
  { id: "essential", name: "Essential", desc: "2 jam sesi" },
  { id: "signature", name: "Signature", desc: "Full Day + Video" },
  { id: "couture", name: "Couture", desc: "Custom Konsep" },
];

const eventTypes = [
  "Wedding",
  "Pre-Wedding",
  "Wisuda",
  "Event",
  "Ulang Tahun",
  "Konten Produk",
  "Lainnya",
];

const values = [
  {
    title: "Curated Visual Experience",
    desc: "Setiap frame dikurasi dengan teliti, diproses secara profesional, dan dirancang secara personal untuk menciptakan karya visual yang autentik, berkualitas, dan merepresentasikan karakter Anda secara utuh.",
  },
];

export default function HeroSectioin() {
  const [selectedPackage, setSelectedPackage] = useState("essential");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    eventType: "",
    date: "",
    location: "",
  });

  const handleSubmit = async () => {
    //Fase 1. validasi sederhana
    if (
      !formData.name ||
      !formData.phone ||
      !formData.eventType ||
      !formData.date
    )
      alert("Mohon lengkapi semua field yang wajib diisi");
    return;
  };
  //nanti di step berikutnya kita sambungkan ke API Whatsapp
  console.log({ ...formData, package: selectedPackage });

  return (
    //min-h-screen agar hero selalu full viewport
    //pt-16 lg:pt20 = offset tinggi navbar yang fixed
    <section className="min-h-screen pt-12 flex flex-col lg:flex-row">
      {/* kiri - Brand story, dark background */}
      <div className="lg:w-1/2 bg-brand-primary px-8 lg:px-16 py-16 lg:py-24 flex flex-col justify-center relative overflow-hidden">
        {/* Bacground subtle texture */}
        <div
          className="absolute inset-0 opacity-20 blur-3xl"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 50%, #C5A059 0%, transparent 70%)",
          }}
        />

        {/* Eyebrow badge  */}
        <div className="relative">
          <span className="inline-block text-xs font-semibold tracking-tight uppercase border border-brand-gold/50 text-brand-gold px-3 py-1.5 rounded-sm mb-8">
            Photography & Videography
          </span>

          {/* Heading besar dengan italic gold accent diakhir */}
          <h1 className="font-serif text-white leading-5 mb-8">
            <span className="block text-5xl lg:text-6xl xl:text-7xl">
              Abadikan
            </span>
            <span className="block text-5xl lg:text-6xl xl:text-7xl">
              Momen
            </span>
            <span className="block text-5xl lg:text-6xl xl:text-7xl">
              Dengan
            </span>
            <span className="block text-5xl lg:text-6xl xl:text-7xl">
              Presisi
            </span>
            {/* Gold italic — focal point */}
            <span className="block text-5xl lg:text-6xl xl:text-7xl italic text-brand-gold">
              Artistik.
            </span>
          </h1>

          {/* value propositions */}
          <div className="space-y-6">
            {values.map((item) => (
              <div key={item.title}>
                <h3 className="text-white font-semibold text-sm mb-1">
                  {item.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* right - booking form, light Bacground */}
      <div className="lg:w-1/2 bg-brand-neutral px-8 lg:px-16 py-16 lg:py-24 flex flex-col justify-center">
        <h2 className="font-serif text-brand-primary text-3xl lg:text-4xl mb-3">
          Formulir Pemesanan
        </h2>
        <p className="text-brand-primary/60 text-sm mb-10 leading-relaxed">
          Tim kami akan menghubungi Anda via WhatsApp dalam 24 jam untuk
          konfirmasi.
        </p>
        <div className="space-y-5">
          {/* row 1: Nama + WhatsApp */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold tracking-widest uppercase text-brand-primary/60 mb-2">
                {" "}
                Nama Lengkap
              </label>
              <input
                type="text"
                placeholder="John Doe"
                maxLength={40}
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-3 text-sm border border-brand-primary/20 bg-white text-brand-primary placeholder:text-brand-primary/20 focus:outline-none focus:border-brand-gold transition-colors duration-200 rounded-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold tracking-widest uppercase text-brand-primary/60 mb-2">
                {" "}
                Nomor WhatsApp
              </label>
              <input
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="081924207898"
                maxLength={15}
                value={formData.phone}
                onChange={(e) => {
                  const onlyNumbers = e.target.value.replace(/\D/g, "");
                  setFormData({ ...formData, phone: onlyNumbers });
                }}
                className="w-full px-4 py-3 text-sm border border-brand-primary/20 bg-white text-brand-primary placeholder:text-brand-primary/20 focus:outline-none focus:border-brand-gold transition-colors duration-200 rounded-sm"
              />
            </div>
          </div>

          {/* Row 2: Jenis Acara + Tanggal */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold tracking-widest uppercase text-brand-primary/60 mb-2">
                Jenis Acara
              </label>
              <select
                value={formData.eventType}
                onChange={(e) =>
                  setFormData({ ...formData, eventType: e.target.value })
                }
                className="w-full px-4 py-3 text-sm border border-brand-primary/20 bg-white text-brand-primary placeholder:text-brand-primary/20 focus:outline-none focus:border-brand-gold transition-colors duration-200 rounded-sm"
              >
                <option value="">Pilih Jenis Acara</option>
                {eventTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold tracking-widest uppercase text-brand-primary/60 mb-2">
                Tanggal Acara
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                className="w-full px-4 py-3 text-sm border border-brand-primary/20 bg-white text-brand-primary placeholder:text-brand-primary/20 focus:outline-none focus:border-brand-gold transition-colors duration-200 rounded-sm"
              />
            </div>
          </div>

          {/* Row 3: Lokasi + packages */}
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-xs font-semibold tracking-widest uppercase text-brand-primary/60 mb-2">
                Lokasi Acara
              </label>
              <input
                type="text"
                placeholder="Jl. Melati No. 15, RT 01/RW 02 Kopo Bandung Jawa Barat"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                className="w-full px-4 py-3 text-sm border border-brand-primary/20 bg-white text-brand-primary placeholder:text-brand-primary/20 focus:outline-none focus:border-brand-gold transition-colors duration-200 rounded-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold tracking-widest uppercase text-brand-primary/60 mb-2">
                Pilihan Paket
              </label>
              <div className="grid grid-cols-3 gap-3">
                {packages.map((pkg) => (
                  <button
                    key={pkg.id}
                    onClick={() => setSelectedPackage(pkg.id)}
                    className={`p-3 text-left border rounded-sm transition-all duration-200 ${selectedPackage === pkg.id ? "border-brand-gold bg-brand-gold/10" : "border-brand-primary/20 hover:border-brand-primary/40"}`}
                  >
                    <div className="text-sm font-semibold text-brand-primary">
                      {pkg.name}
                    </div>
                    <div className="text-xs text-brand-primary/50 mt-0.5">
                      {pkg.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* submit button */}
          <button
            onClick={handleSubmit}
            className="w-full py-4 mt-2 bg-brand-primary text-white text-sm font-semibold tracking-tight uppercase hover:bg-brand-gold hover:text-brand-primary transition-all duration-300 rounded-sm"
          >
            Konfirmasi Pesananan →
          </button>
          <p>
            Dengan mengirim formulir ini, Anda menyetujui{" "}
            <span className="underline cursor-pointer">kebijakan Privasi</span>
          </p>
        </div>
      </div>
    </section>
  );
}
