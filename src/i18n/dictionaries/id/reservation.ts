const reservation = {
  meta: {
    title: "Reservasi – PT Aru Raharja",
    description:
      "Layanan reservasi PT Aru Raharja untuk mendukung kebutuhan operasional dan layanan perusahaan secara efisien.",
  },
  hero: {
    titleHtml: "Reservasi",
    description:
      'Aru Raharja menyediakan <strong>ARU</strong><em>space</em> — ruang kerja dan pertemuan modern yang dapat dipesan sesuai kebutuhan Anda.',
    altMask: "Hiasan latar belakang",
    altIllustration: "Ilustrasi Reservasi",
  },
  desc: {
    paragraph:
      "Pilih ruangan yang sesuai dengan kebutuhan Anda dan sesuaikan jadwal reservasi. Klik tombol di bawah untuk melihat detail waktu yang tersedia.",
    ctaLabel: "Lihat Detail Waktu Reservasi",
  },
  roomlist: {
    title: "Daftar Ruangan",
    subtitle: "Pilih ruangan untuk melihat detail dan jadwal pemesanan",
    priceLabel: "Harga per jam",
    capacityLabel: "Kapasitas",
    availableLabel: "Tersedia",
    unavailableLabel: "Penuh / Tidak tersedia",
    ctaLabel: "Lihat & Pesan",
    ctaUnavailable: "Tidak Tersedia",
    amenitiesTitle: "Fasilitas",
    ratingLabel: "Penilaian",

    list: [
        {
        id: "r1",
        title: "Ruang Rapat R1",
        subtitle: "Cocok untuk diskusi tim kecil",
        capacity: 8,
        floor: "Lantai 3",
        pricePerHour: 50,
        img: "/images/general/gedung-2.png",
        rating: 4.8,
        tags: ["#Promo", "#Populer"],
        amenities: ["Proyektor", "Papan Tulis", "HDMI", "AC"],
        available: true,
        },
        {
        id: "r2",
        title: "Ruang Fokus R2",
        subtitle: "Ruang kerja privat — ideal untuk 1:1",
        capacity: 2,
        floor: "Lantai 2",
        pricePerHour: 20,
        img: "/images/general/gedung-2.png",
        rating: 4.5,
        tags: ["#Tenang"],
        amenities: ["Meja", "Stopkontak", "AC"],
        available: true,
        },
        {
        id: "r3",
        title: "Aula Konferensi R3",
        subtitle: "Ruang besar untuk rapat atau pelatihan",
        capacity: 20,
        floor: "Lantai 1",
        pricePerHour: 120,
        img: "/images/general/gedung-2.png",
        rating: 4.9,
        tags: ["#Besar", "#Hybrid-ready"],
        amenities: ["Panggung", "Sistem Suara", "Video Conference"],
        available: false,
        },
        {
        id: "r4",
        title: "Meeting Kecil R4",
        subtitle: "Ruang kecil untuk diskusi singkat",
        capacity: 4,
        floor: "Lantai 4",
        pricePerHour: 30,
        img: "/images/general/gedung-2.png",
        rating: 4.3,
        tags: [],
        amenities: ["Monitor", "Papan Tulis"],
        available: true,
        },
    ],
    },
} as const;

export default reservation;
