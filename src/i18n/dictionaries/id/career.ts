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
      vacancies: [
        {
            id: "1",
            title: "Backend Developer",
            type: "Magang",
            location: "Jakarta",
            description: "Mengembangkan dan memelihara layanan backend.",
        },
        {
            id: "2",
            title: "Frontend Developer",
            type: "Magang",
            location: "Jakarta",
            description: "Membangun dan mengoptimalkan antarmuka pengguna.",
        },
        {
            id: "3",
            title: "Staf IT Support",
            type: "Penuh Waktu",
            location: "Jakarta",
            description: "Membantu operasional TI dan mendukung pengguna internal.",
        },
      ],
    },
  },
} as const;

export default career;
