const service = {
  hero: {
    titleHtml: 'Layanan Prima <br class="hidden lg:block"> Kami',
    description:
      "Aru Raharja berkomitmen untuk selalu mengutamakan kepuasan pelanggan, dengan menyediakan layanan terbaik yang selalu mudah diakses oleh pelanggan.",
    altMask: "Hiasan latar belakang",
    altIllustration: "Ilustrasi Layanan",
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
    descriptions: {
      arudigital: {
        title: "ARUdigital — Platform bisnis berbasis cloud",
        description:
          "Solusi digital yang scalable untuk menyederhanakan operasional, meningkatkan efisiensi, dan menghadirkan pengalaman pelanggan yang lebih baik.",
      },
      aruhealthcare: {
        title: "ARUhealthcare — Preventif & produktif",
        description:
          "Program perawatan preventif karyawan yang dirancang untuk meningkatkan produktivitas sekaligus menekan biaya kesehatan jangka panjang.",
      },
      arucontractor: {
        title: "ARUcontractor — Konstruksi profesional & tepat waktu",
        description:
          "Layanan konstruksi andal dengan manajemen proyek yang solid, standar keselamatan ketat, serta dokumentasi yang transparan.",
      },
      arusource: {
        title: "ARUsource — Tenaga kerja siap pakai",
        description:
          "Penyediaan tenaga kerja profesional dengan SLA yang jelas, proses onboarding cepat, dan model kerja fleksibel (on-site, hybrid, maupun remote).",
      },
      arusolution: {
        title: "ARUsolution — Implementasi cepat & paling sesuai",
        description:
          "Solusi siap pakai dengan panduan implementasi 1–3 minggu, disesuaikan dengan kebutuhan bisnis dan budaya kerja perusahaan Anda.",
      },
      arulog: {
        title: "ARUlog — Supplier katalog & pengadaan",
        description:
          "Katalog terkurasi dengan harga kompetitif, lead time yang jelas, serta SLA pengiriman yang dapat diandalkan.",
      },
      arutrans: {
        title: "ARUtrans — Sewa kendaraan fleksibel, driver & asuransi siap",
        description:
          "Penyediaan mobil dan minibus untuk kebutuhan operasional harian maupun proyek, lengkap dengan opsi driver, asuransi, dan dukungan 24/7.",
      },
      aruspace: {
        title: "ARUspace — Ruang kerja fleksibel & strategis",
        description:
          "Penyedia Virtual Office, Dedicated Desk, Meeting Room, dan Event Space dengan fasilitas lengkap di lokasi yang strategis.",
      },
    },
  },
} as const;

export default service;
