export default {
  navbar: {
    about: "Tentang Aru Raharja",
    services: "Layanan",
    complaint: "Pengaduan",
    governance: "Tata Kelola",
    information: "Informasi",
    appeal: "Himbauan",
    career: "Karier",
  },
  hero: {
    faqTitle: "Pertanyaan yang Sering Diajukan",
    faqCta: "Buka FAQ",
    serviceTitle: "Layanan Santunan",
    serviceCta: "Lihat Layanan",
    complaintTitle: "Layanan Pengaduan",
    complaintCta: "Ajukan Pengaduan",
  },
  footer: {
    about: {
      description:
        "PT Aru Raharja didirikan pada tanggal 14 Desember 1988. Perusahaan ini bergerak di berbagai bidang seperti Digital IT, Outsourcing, Rent a Car, Building Management, Office Space Provider, Jasa Contractor, dan Supplier.",
    },
    contact: {
      headOffice: "Kantor Pusat",
      address:
        "Wisma Raharja, Jl. TB Simatupang No.Kav. 1\nKota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12430",
    },
    quickLinks: {
      faq: "FAQ",
      contactUs: "Hubungi Kami",
      eProcurement: "E-Procurement",
      wbs: "Sistem Pelaporan Pelanggaran (WBS)",
    },
    bottom: {
      legalTerms: "Syarat Hukum",
      privacyPolicy: "Kebijakan Privasi",
      accessibility: "Aksesibilitas",
      rights: "Hak Cipta Dilindungi.",
    },
  },
  dutiesPromo: {
    heading: "Tugas Pokok Aru Raharja untuk masyarakat",
    descPrefix:
      "Aru Raharja sebagai penjamin pertama Korban kecelakaan Lalu Lintas sesuai",
    laws: ["UU No. 33 Tahun 1964", "UU No. 34 Tahun 1964"],
  },
  funding: {
    leftTitleHtml: `Sumber Dana <br><b>UU No.33 Tahun 1964</b><br>dan<br><b>UU No.34 Tahun 1964</b>`,
    items: [
      { code: "SWDKLJJ", description: "Sumbangan Wajib Dana Kecelakaan Lalu Lintas Jalan", iconSrc: "/funding/swdkljj-icon-2.png" },
      { code: "IWKBU", description: "Iuran Wajib Kendaraan Bermotor Umum", iconSrc: "/funding/iwkbu-icon-2.png" },
      { code: "IWPU",  description: "Iuran Wajib Pesawat Udara", iconSrc: "/funding/iwpu-icon-2.png" },
      { code: "IWKA",  description: "Iuran Wajib Kereta Api", iconSrc: "/funding/iwka-icon-2.png" },
      { code: "IWKL",  description: "Iuran Wajib Kapal Laut", iconSrc: "/funding/iwkl-icon-2.png" },
    ],
  },
  statsCtaMap: {
    metricLabels: {
      regionalOffices: "Kantor Wilayah",
      branchOffices: "Kantor Cabang",
      serviceOffices: "Kantor Pelayanan",
    },
    ctaLabel: "Hubungi Kami",
    rightHeadlineHtml: "Melayani Hingga <br /> Pelosok Negeri",
  },
  service: {
    cards: {
      services: {
        title: "Layanan",
        subtitle: "Santunan",
        alt: "santunan",
      },
      complaint: {
        title: "Layanan",
        subtitle: "Pengaduan",
        alt: "pengaduan",
      },
      appeal: {
        title: "Himbauan",
        subtitle: "Aru Raharja",
        alt: "himbauan",
      },
    },
  },
  news: {
    heading: "Berita Aru Raharja",
    readMoreLabel: "Baca Selengkapnya",
    loadMoreLabel: "Muat Lainnya",
  },
  videos: {
    heading: "Video",
    readMoreLabel: "Tonton",
    loadMoreLabel: "Muat Lainnya",
  },
  quicklink: {
    x: {
      title: "Ikuti Kami di X",
      button: "Gabung di X",
    },
    tiktok: {
      title: "Ikuti Kami di TikTok",
      button: "Gabung di TikTok",
    },
    instagram: {
      title: "Ikuti Kami di Instagram",
      button: "Gabung di Instagram",
    },
    facebook: {
      title: "Ikuti Kami di Facebook",
      button: "Gabung di Facebook",
    },
  },
} as const;
