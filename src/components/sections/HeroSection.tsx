"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

// Tipe untuk error per field dari Zod
type FieldErrors = Partial<Record<string, string[]>>;

type FormStatus = "idle" | "loading" | "success" | "error";

const packages = [
  { id: "essential", name: "Essential", desc: "2 Jam Sesi" },
  { id: "signature", name: "Signature", desc: "Full Day + Video" },
  { id: "couture", name: "Couture", desc: "Custom Konsep" },
];

const eventTypes = [
  "Wedding",
  "Pre-Wedding",
  "Wisuda",
  "Event",
  "Ulang Tahun",
  "Portrait",
  "Konten Produk",
  "Lainnya",
];

export default function HeroSection() {
  const [selectedPackage, setSelectedPackage] = useState("essential");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    eventType: "",
    date: "",
    location: "",
  });

  // State untuk feedback ke user
  const [status, setStatus] = useState<FormStatus>("idle");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    // Reset state sebelumnya
    setFieldErrors({});
    setMessage("");
    setStatus("loading");

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          packageId: selectedPackage,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        // Ada error validasi dari server
        if (result.errors) {
          setFieldErrors(result.errors);
        }
        setMessage(result.message ?? "Terjadi kesalahan.");
        setStatus("error");
        return;
      }

      // Berhasil
      setStatus("success");
      setMessage(result.message);
      // Reset form
      setFormData({
        name: "",
        phone: "",
        eventType: "",
        date: "",
        location: "",
      });
      setSelectedPackage("essential");
    } catch {
      setStatus("error");
      setMessage("Tidak dapat terhubung ke server. Coba lagi.");
    }
  };

  // Helper: tampilkan error satu field
  const getFieldError = (field: string) => fieldErrors[field]?.[0];

  return (
    <section className="min-h-screen pt-16 lg:pt-20 flex flex-col lg:flex-row">
      {/* LEFT — sama seperti sebelumnya */}
      <div className="lg:w-1/2 bg-brand-primary px-8 lg:px-16 py-16 lg:py-24 flex flex-col justify-center relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 50%, #C5A059 0%, transparent 70%)",
          }}
        />
        <div className="relative">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase border border-brand-gold/50 text-brand-gold px-3 py-1.5 rounded-sm mb-8">
            Photography & Videography
          </span>
          <h1 className="font-serif text-white leading-[1.1] mb-10">
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
            <span className="block text-5xl lg:text-6xl xl:text-7xl italic text-brand-gold">
              Artistik.
            </span>
          </h1>
          <div className="space-y-6">
            {[
              {
                title: "Visi Kurasi",
                desc: "Setiap frame adalah cerita yang dipilih dengan teliti.",
              },
              {
                title: "Kualitas Terjamin",
                desc: "Editing profesional, hasil yang tahan waktu.",
              },
              {
                title: "Personal & Intim",
                desc: "Kami memahami karakter unik setiap client.",
              },
            ].map((item) => (
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

      {/* RIGHT — Form */}
      <div className="lg:w-1/2 bg-brand-neutral px-8 lg:px-16 py-16 lg:py-24 flex flex-col justify-center">
        {/* Tampilkan success state */}
        {status === "success" ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-brand-gold/10 flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-brand-gold"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="font-serif text-brand-primary text-3xl mb-3">
              Terima Kasih!
            </h2>
            <p className="text-brand-primary/50 text-sm leading-relaxed mb-8">
              {message}
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="text-xs font-semibold tracking-widest uppercase text-brand-gold underline underline-offset-4"
            >
              Buat booking lain
            </button>
          </div>
        ) : (
          <>
            <h2 className="font-serif text-brand-primary text-3xl lg:text-4xl mb-3">
              Formulir Pemesanan
            </h2>
            <p className="text-brand-primary/50 text-sm mb-10 leading-relaxed">
              Tim kami akan menghubungi Anda via WhatsApp dalam 24 jam.
            </p>

            <div className="space-y-5">
              {/* Nama + WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold tracking-widest uppercase text-brand-primary/60 mb-2">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className={cn(
                      "w-full px-4 py-3 text-sm border bg-white text-brand-primary",
                      "placeholder:text-brand-primary/30 focus:outline-none transition-colors duration-200 rounded-sm",
                      getFieldError("name")
                        ? "border-red-400 focus:border-red-400"
                        : "border-brand-primary/20 focus:border-brand-gold",
                    )}
                  />
                  {getFieldError("name") && (
                    <p className="text-red-500 text-[11px] mt-1">
                      {getFieldError("name")}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-semibold tracking-widest uppercase text-brand-primary/60 mb-2">
                    Nomor WhatsApp
                  </label>
                  <input
                    type="tel"
                    placeholder="+62 812 3456 7890"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className={cn(
                      "w-full px-4 py-3 text-sm border bg-white text-brand-primary",
                      "placeholder:text-brand-primary/30 focus:outline-none transition-colors duration-200 rounded-sm",
                      getFieldError("phone")
                        ? "border-red-400 focus:border-red-400"
                        : "border-brand-primary/20 focus:border-brand-gold",
                    )}
                  />
                  {getFieldError("phone") && (
                    <p className="text-red-500 text-[11px] mt-1">
                      {getFieldError("phone")}
                    </p>
                  )}
                </div>
              </div>

              {/* Jenis Acara + Tanggal */}
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
                    className={cn(
                      "w-full px-4 py-3 text-sm border bg-white text-brand-primary",
                      "focus:outline-none transition-colors duration-200 rounded-sm appearance-none cursor-pointer",
                      getFieldError("eventType")
                        ? "border-red-400"
                        : "border-brand-primary/20 focus:border-brand-gold",
                    )}
                  >
                    <option value="">Pilih Jenis Acara</option>
                    {eventTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {getFieldError("eventType") && (
                    <p className="text-red-500 text-[11px] mt-1">
                      {getFieldError("eventType")}
                    </p>
                  )}
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
                    className={cn(
                      "w-full px-4 py-3 text-sm border bg-white text-brand-primary",
                      "focus:outline-none transition-colors duration-200 rounded-sm cursor-pointer",
                      getFieldError("date")
                        ? "border-red-400"
                        : "border-brand-primary/20 focus:border-brand-gold",
                    )}
                  />
                  {getFieldError("date") && (
                    <p className="text-red-500 text-[11px] mt-1">
                      {getFieldError("date")}
                    </p>
                  )}
                </div>
              </div>

              {/* Lokasi */}
              <div>
                <label className="block text-xs font-semibold tracking-widest uppercase text-brand-primary/60 mb-2">
                  Lokasi Acara
                </label>
                <input
                  type="text"
                  placeholder="e.g. Bandung, Jakarta, atau luar kota"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className={cn(
                    "w-full px-4 py-3 text-sm border bg-white text-brand-primary",
                    "placeholder:text-brand-primary/30 focus:outline-none transition-colors duration-200 rounded-sm",
                    getFieldError("location")
                      ? "border-red-400"
                      : "border-brand-primary/20 focus:border-brand-gold",
                  )}
                />
                {getFieldError("location") && (
                  <p className="text-red-500 text-[11px] mt-1">
                    {getFieldError("location")}
                  </p>
                )}
              </div>

              {/* Paket */}
              <div>
                <label className="block text-xs font-semibold tracking-widest uppercase text-brand-primary/60 mb-3">
                  Pilihan Paket
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {packages.map((pkg) => (
                    <button
                      key={pkg.id}
                      onClick={() => setSelectedPackage(pkg.id)}
                      className={cn(
                        "p-3 text-left border rounded-sm transition-all duration-200",
                        selectedPackage === pkg.id
                          ? "border-brand-gold bg-brand-gold/5"
                          : "border-brand-primary/20 hover:border-brand-primary/40",
                      )}
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

              {/* Error message global */}
              {status === "error" && message && (
                <div className="bg-red-50 border border-red-200 rounded-sm px-4 py-3">
                  <p className="text-red-600 text-xs">{message}</p>
                </div>
              )}

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={status === "loading"}
                className={cn(
                  "w-full py-4 mt-2 text-sm font-semibold tracking-[0.15em] uppercase rounded-sm",
                  "transition-all duration-300",
                  status === "loading"
                    ? "bg-brand-primary/50 text-white cursor-not-allowed"
                    : "bg-brand-primary text-white hover:bg-brand-gold hover:text-brand-primary",
                )}
              >
                {status === "loading" ? "Mengirim..." : "Konfirmasi Pesanan →"}
              </button>

              <p className="text-xs text-brand-primary/40 text-center">
                Dengan mengirim formulir ini, Anda menyetujui{" "}
                <span className="underline cursor-pointer">
                  Kebijakan Privasi
                </span>{" "}
                kami.
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

// Tambahkan import cn di atas file
// import { cn } from "@/lib/utils";
