const information = {
  hero: {
    titleHtml: "Informasi",
    description:
      "Kumpulan berita, press release, pengumuman, dan informasi terkini mengenai Aru Raharja",
    altMask: "Hiasan latar belakang",
    altIllustration: "Ilustrasi Informasi",
  },

  reports: {
    nav: [
      { id: "news", label: "Berita" },
      { id: "pressrelease", label: "Siaran Pers" },
      { id: "secure", label: "Keamanan" },
      { id: "annualreport", label: "Laporan <b>Tahunan</b>" },
      { id: "sustainabilityreport", label: "Laporan <b>Keberlanjutan</b>" },
      { id: "monthlyreport", label: "Laporan <b>Bulanan</b>" },
    ] as const,

    sectionTitle: {
      news: {
        titleHtml: "Berita Terkini",
        description:
          "Kumpulan berita dan informasi terbaru seputar kegiatan dan perkembangan Aru Raharja.",
      },
      pressrelease: {
        titleHtml: "Siaran Pers",
        description:
          "Rangkaian siaran pers resmi Aru Raharja untuk publik dan media.",
      },
      secure: {
        titleHtml: "Informasi Keamanan",
        description:
          "Informasi keamanan data, perlindungan konsumen, dan pembaruan sistem di lingkungan Aru Raharja.",
      },
      annualreport: {
        titleHtml: "Laporan <b>Tahunan</b>",
        description:
          "Kumpulan laporan tahunan Aru Raharja yang mencerminkan kinerja dan transparansi perusahaan setiap tahun.",
      },
      sustainabilityreport: {
        titleHtml: "Laporan <b>Keberlanjutan</b>",
        description:
          "Laporan keberlanjutan yang menyoroti komitmen Aru Raharja terhadap tanggung jawab sosial dan lingkungan.",
      },
      monthlyreport: {
        titleHtml: "Laporan <b>Bulanan</b>",
        description:
          "Kumpulan laporan keuangan bulanan Aru Raharja dari berbagai periode waktu.",
      },
    },
  },
} as const;

export default information;
