const home = {
  hero: {
    faqTitle: "Pertanyaan yang Sering Diajukan",
    faqCta: "Buka FAQ",
    serviceTitle: "Layanan Santunan",
    serviceCta: "Lihat Layanan",
    complaintTitle: "Layanan Pengaduan",
    complaintCta: "Ajukan Pengaduan",
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
      { description: "Sumbangan Wajib Dana Kecelakaan Lalu Lintas Jalan" },
      { description: "Iuran Wajib Kendaraan Bermotor Umum" },
      { description: "Iuran Wajib Pesawat Udara" },
      { description: "Iuran Wajib Kereta Api" },
      { description: "Iuran Wajib Kapal Laut" },
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
  partners: {
    heading: "Keanggotaan",
    description:
      "Layanan ARU Raharja telah dipercayai oleh berbagai perusahaan kelas dunia dari berbagai industri untuk membantu mereka berkembang.",
  },
} as const;

export default home;
