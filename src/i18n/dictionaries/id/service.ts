const service = {
  hero: {
    titleHtml: 'Layanan Prima <br class="hidden lg:block"> Kami',
    description:
      "Aru Raharja berkomitmen untuk selalu mengutamakan kepuasan pelanggan, dengan menyediakan layanan terbaik yang selalu mudah diakses oleh pelanggan.",
    altMask: "Hiasan latar belakang",
    altIllustration: "Ilustrasi Layanan",
  },
  intro: {
    paragraph:
      "Kehadiran PT Aru Raharja memberikan perlindungan dasar kepada masyarakat melalui 2 (dua) program pertanggungan, yaitu Asuransi Kecelakaan Penumpang Alat Angkutan Umum yang dilaksanakan berdasarkan Undang-Undang No. 33 Tahun 1964 tentang Dana Pertanggungan Wajib Kecelakaan Penumpang, serta Asuransi Tanggung Jawab Hukum terhadap Pihak Ketiga yang dilaksanakan berdasarkan Undang-Undang No. 34 Tahun 1964 tentang Dana Kecelakaan Lalu Lintas Jalan.",
  },
  solutions: {
    nav: [
      { id: "arudigital", label: "<strong>ARU</strong><em>digital</em>" },
      { id: "aruhealthcare", label: "<strong>ARU</strong><em>healthcare</em>" },
      { id: "arucontractor", label: "<strong>ARU</strong><em>contractor</em>" },
      { id: "arusource", label: "<strong>ARU</strong><em>source</em>" },
      { id: "arusolution", label: "<strong>ARU</strong><em>solution</em>" },
      { id: "arulog", label: "<strong>ARU</strong><em>log</em>" },
      { id: "arutrans", label: "<strong>ARU</strong><em>trans</em>" },
      { id: "aruspace", label: "<strong>ARU</strong><em>space</em>" },
    ] as const,
  },
} as const;

export default service;
