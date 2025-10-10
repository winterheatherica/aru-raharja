const service = {
  hero: {
    titleHtml: 'Layanan Prima <br class="hidden lg:block"> Kami',
    description:
      "Jasa Raharja berkomitmen untuk selalu mengutamakan kepuasan pelanggan, dengan menyediakan layanan terbaik yang selalu mudah diakses oleh pelanggan.",
    altMask: "Hiasan latar belakang",
    altIllustration: "Ilustrasi Layanan",
  },
  intro: {
    paragraph:
      "Kehadiran PT Jasa Raharja memberikan perlindungan dasar kepada masyarakat melalui 2 (dua) program pertanggungan, yaitu Asuransi Kecelakaan Penumpang Alat Angkutan Umum yang dilaksanakan berdasarkan Undang-Undang No. 33 Tahun 1964 tentang Dana Pertanggungan Wajib Kecelakaan Penumpang, serta Asuransi Tanggung Jawab Hukum terhadap Pihak Ketiga yang dilaksanakan berdasarkan Undang-Undang No. 34 Tahun 1964 tentang Dana Kecelakaan Lalu Lintas Jalan.",
  },
  solutions: {
    nav: [
        { id: "arudigital", label: "<b>ARU</b><i>digital</i>" },
        { id: "aruhealthcare", label: "<b>ARU</b><i>healthcare</i>" },
        { id: "arucontractor", label: "<b>ARU</b><i>contractor</i>" },
        { id: "arusource", label: "<b>ARU</b><i>source</i>" },
        { id: "arusolution", label: "<b>ARU</b><i>solution</i>" },
        { id: "arulog", label: "<b>ARU</b><i>log</i>" },
        { id: "arutrans", label: "<b>ARU</b><i>trans</i>" },
        { id: "aruspace", label: "<b>ARU</b><i>space</i>" },
    ] as const,
  },
} as const;

export default service;
