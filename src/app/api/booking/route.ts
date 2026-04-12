import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// ── Schema validasi — definisikan bentuk data yang valid ──────────────────
// Zod akan reject request yang tidak sesuai schema ini
const bookingSchema = z.object({
  name: z
    .string()
    .min(2, "Nama minimal 2 karakter")
    .max(100, "Nama terlalu panjang"),

  phone: z
    .string()
    .min(10, "Nomor WhatsApp tidak valid")
    .regex(/^(\+62|62|0)[0-9]{8,13}$/, "Format nomor tidak valid"),

  eventType: z.string().min(1, "Jenis acara wajib dipilih"),

  date: z
    .string()
    .min(1, "Tanggal acara wajib diisi")
    .refine((val) => {
      // Pastikan tanggalnya di masa depan
      const selected = new Date(val);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selected >= today;
    }, "Tanggal tidak boleh di masa lalu"),

  location: z.string().min(2, "Lokasi wajib diisi"),

  packageId: z.enum(["essential", "signature", "couture"]),
});

// TypeScript type otomatis dari schema — tidak perlu definisikan dua kali
type BookingData = z.infer<typeof bookingSchema>;

// ── Format pesan WhatsApp ─────────────────────────────────────────────────
function formatWhatsAppMessage(data: BookingData): string {
  const packageNames = {
    essential: "Essential (Rp 750rb)",
    signature: "Signature (Rp 1,5jt)",
    couture: "Couture (Rp 3jt+)",
  };

  // Template literal yang rapi dan mudah dibaca di WhatsApp
  return `
🎯 *BOOKING BARU — LensStudio*

👤 *Nama:* ${data.name}
📱 *WhatsApp:* ${data.phone}
🎪 *Acara:* ${data.eventType}
📅 *Tanggal:* ${new Date(data.date).toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })}
📍 *Lokasi:* ${data.location}
📦 *Paket:* ${packageNames[data.packageId]}

_Segera hubungi client untuk konfirmasi._
  `.trim();
}

// ── Handler POST ──────────────────────────────────────────────────────────
// Next.js App Router menggunakan named export HTTP method
export async function POST(request: NextRequest) {
  try {
    // 1. Parse body dari request
    const body = await request.json();

    // 2. Validasi dengan Zod
    // .safeParse() tidak throw error — return { success, data, error }
    const validation = bookingSchema.safeParse(body);

    if (!validation.success) {
      // Kembalikan error validasi yang spesifik ke frontend
      return NextResponse.json(
        {
          success: false,
          message: "Data tidak valid",
          // Zod format() mengubah error jadi object yang mudah dibaca
          errors: validation.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const data = validation.data;

    // 3. Cek environment variable ada
    const token = process.env.FONNTE_TOKEN;
    const target = process.env.WHATSAPP_TARGET;

    if (!token || !target) {
      // Ini error konfigurasi server — jangan expose detail ke client
      console.error("Missing FONNTE_TOKEN or WHATSAPP_TARGET");
      return NextResponse.json(
        { success: false, message: "Konfigurasi server bermasalah" },
        { status: 500 },
      );
    }

    // 4. Kirim ke Fonnte API
    const message = formatWhatsAppMessage(data);

    const fonnte = await fetch("https://api.fonnte.com/send", {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        target,
        message,
        countryCode: "62",
      }),
    });

    const fontteResponse = await fonnte.json();

    // Fonnte return { status: true } kalau berhasil
    if (!fontteResponse.status) {
      console.error("Fonnte error:", fontteResponse);
      return NextResponse.json(
        { success: false, message: "Gagal mengirim notifikasi" },
        { status: 502 },
      );
    }

    // 5. Berhasil
    return NextResponse.json(
      {
        success: true,
        message: "Booking berhasil dikirim! Kami akan menghubungi Anda segera.",
      },
      { status: 200 },
    );
  } catch (error) {
    // Tangkap error yang tidak terduga
    console.error("Booking API error:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan, coba lagi." },
      { status: 500 },
    );
  }
}

// Tolak method selain POST
export async function GET() {
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}
