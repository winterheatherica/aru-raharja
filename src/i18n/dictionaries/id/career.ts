const career = {
  meta: {
    title: "Karier – PT Aru Raharja",
    description:
      "Bergabunglah bersama PT Aru Raharja dan kembangkan karier Anda di lingkungan profesional dan inovatif.",
    image: "https://aruraharja.co.id/images/general/logo/aru.png",
    keywords: "lowongan kerja, karier PT Aru Raharja, rekrutmen aru",
  },
  hero: {
    titleHtml: "Karier",
    description:
      "Marilah Bergabung bersama kami dan menjadi bagian penting dalam kemajuan Aru Raharja",
    altMask: "Hiasan latar belakang",
    altIllustration: "Ilustrasi Karier",
  },
  registration: {
    employment: {
      FULL_TIME: "Penuh Waktu",
      PART_TIME: "Paruh Waktu",
      INTERNSHIP: "Magang",
      CONTRACT: "Kontrak",
    },
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
