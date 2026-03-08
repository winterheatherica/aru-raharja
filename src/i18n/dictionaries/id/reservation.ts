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
    ctaLabel: "Lihat",
    ctaUnavailable: "Tidak Tersedia",
    amenitiesTitle: "Fasilitas",
    ratingLabel: "Penilaian",
    },
} as const;

export default reservation;
