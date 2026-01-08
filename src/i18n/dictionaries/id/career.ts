const career = {
  meta: {
    title: "Karier – PT Aru Raharja",
    description:
      "Bergabunglah bersama PT Aru Raharja dan kembangkan karier Anda di lingkungan profesional dan inovatif.",
  },
  hero: {
    titleHtml: "Karier",
    description:
      "Marilah Bergabung bersama kami dan menjadi bagian penting dalam kemajuan Aru Raharja",
    altMask: "Hiasan latar belakang",
    altIllustration: "Ilustrasi Karier",
  },
  registration: {
    filters: {
      searchPlaceholder: "Cari Posisi",
      positionLabel: "Semua Posisi",
      typeLabel: "Semua Jenis",
      locationLabel: "Semua Lokasi",
      positions: [] as string[],
      types: [] as string[],
      locations: [] as string[],
    },
    results: {
      emptyText: "Belum ada lowongan tersedia",
      applyButton: "Kirim Lamaran",
    },
  },
} as const;

export default career;
