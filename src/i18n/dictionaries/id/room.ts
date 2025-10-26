// src/i18n/dictionaries/id/room.ts
const room = {
  /** Meta data untuk halaman */
  meta: {
    id: "r1",
    title: "Ruang Rapat R1",
    subtitle: "Ruang rapat modern untuk 8 orang dengan fasilitas lengkap",
    floor: "Lantai 3",
    rating: 4.8,
    available: true,
    pricePerHour: 50,
    heroImage: "/images/rooms/room-1.jpg",
  },

  /** Deskripsi */
  description: {
    heading: "Ruang yang mendukung kolaborasi produktif",
    paragraph: `
      <p>
        <strong>Ruang Rapat R1</strong> dirancang untuk memfasilitasi kolaborasi dan sesi brainstorming yang efektif.
        Dengan kapasitas hingga <strong>8 orang</strong>, ruangan ini menawarkan lingkungan ber-AC yang nyaman dan
        estetika bersih — cocok untuk rapat tim kecil atau pertemuan dengan klien.
      </p>
      <p>
        Ruangan dilengkapi <em>proyektor HD</em>, <em>papan tulis</em> dinding, koneksi <em>Wi-Fi cepat</em>, dan
        perangkat <em>video conference</em> siap pakai. Pencahayaan LED lembut dan panel peredam suara membuat suasana
        lebih fokus dan nyaman sepanjang sesi.
      </p>
      <p>
        Pemesanan tersedia per jam atau per hari — cek ketersediaan real-time di bagian bawah.
      </p>
    `,
  },

  /** Galeri gambar */
  gallery: {
    title: "Galeri",
    images: [
      {
        src: "/images/general/gedung-2.png",
        alt: "Ruang Rapat R1 — Tampak utama",
      },
      {
        src: "/images/general/gedung-1.png",
        alt: "Ruang Rapat R1 — Proyektor dan papan tulis",
      },
      {
        src: "/images/general/gedung-2.png",
        alt: "Ruang Rapat R1 — Setting diskusi",
      },
      {
        src: "/images/general/gedung-1.png",
        alt: "Ruang Rapat R1 — Area pintu masuk",
      },
      {
        src: "/images/general/gedung-2.png",
        alt: "Ruang Rapat R1 — Area tempat duduk samping",
      },
    ],
  },

  /** Fasilitas */
  facilities: {
    title: "Fasilitas & Peralatan",
    list: [
      { label: "Kapasitas tempat duduk", value: "8 orang" },
      { label: "Ukuran ruangan", value: "24 m²" },
      { label: "Proyektor", value: "Proyektor HD 1080p dengan input HDMI" },
      { label: "Audio", value: "Sistem speaker stereo built-in" },
      { label: "Konektivitas", value: "Wi-Fi kecepatan tinggi (hingga 100 Mbps)" },
      { label: "Papan tulis", value: "Papan tulis dinding dengan spidol" },
      { label: "Video conference", value: "Kamera Logitech + mikrofon wide" },
      { label: "AC", value: "Kontrol iklim individu" },
      { label: "Stopkontak", value: "8 stopkontak meja + 2 stopkontak dinding" },
      { label: "Penyegaran", value: "Dispenser air & area kopi terdekat" },
    ],
  },

  /** Informasi pemesanan */
  booking: {
    title: "Informasi Pemesanan",
    details: [
      {
        label: "Ketersediaan",
        value: "Senin – Jumat, 08:00–18:00",
      },
      {
        label: "Durasi minimal",
        value: "1 jam",
      },
      {
        label: "Metode pembayaran",
        value: "Cashless (QRIS, debit, atau transfer)",
      },
      {
        label: "Perubahan jadwal",
        value: "Gratis hingga 2 jam sebelum waktu pemesanan",
      },
    ],
    ctaLabel: "Pesan Ruangan Ini",
  },

  /** Lokasi / Peta */
  location: {
    title: "Lokasi",
    address: "Lantai 3, Gedung Aru Raharja, Jl. Teknologi No. 5, Jakarta",
    coordinates: {
      lat: -6.2005,
      lng: 106.8227,
    },
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.5416367567214!2d106.8227!3d-6.2005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e3eec!2sJakarta!5e0!3m2!1sen!2sid!4v1683729912345",
  },

  /** Ruang terkait */
  related: {
    title: "Ruangan Lain",
    rooms: [
      {
        id: "r2",
        title: "Ruang Fokus R2",
        subtitle: "Ruang privat untuk kerja individu atau duo",
        img: "/images/rooms/room-2.jpg",
        href: "/id/ruangan/r2",
      },
      {
        id: "r3",
        title: "Aula Konferensi R3",
        subtitle: "Ruang luas untuk acara atau pelatihan",
        img: "/images/rooms/room-3.jpg",
        href: "/id/ruangan/r3",
      },
    ],
  },
} as const;

export default room;
