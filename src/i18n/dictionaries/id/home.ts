const home = {
  seo: {
    title: "Beranda – PT Aru Raharja",
    description:
      "PT Aru Raharja menyediakan layanan dan produk digital terintegrasi untuk mendukung efisiensi, produktivitas, dan pengembangan bisnis perusahaan.",
    canonical: "https://aruraharja.co.id/",
    robots: "index, follow",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "PT Aru Raharja",
    title: "PT Aru Raharja",
    description:
      "Layanan dan solusi digital terintegrasi dari PT Aru Raharja untuk mendukung pertumbuhan dan efisiensi bisnis.",
    url: "https://aruraharja.co.id/",
    image: {
      url: "https://aruraharja.co.id/images/general/logo/aru.png",
      alt: "PT Aru Raharja",
      type: "image/png",
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "PT Aru Raharja",
    description:
      "Solusi dan layanan digital terintegrasi dari PT Aru Raharja.",
    image: "https://aruraharja.co.id/images/general/logo/aru.png",
  },
  hero: {
    faqTitle: "Pertanyaan yang Sering Diajukan",
    faqCta: "Buka FAQ",
    serviceTitle: "Layanan Santunan",
    serviceCta: "Lihat Layanan",
    complaintTitle: "Layanan Pengaduan",
    complaintCta: "Ajukan Pengaduan",
  },
  dutiesPromo: {
    heading: "Layanan Kami: Produk Digital ARU",
    descPrefix:
      "Produk dan layanan digital ARU dirancang sebagai solusi terintegrasi untuk mendukung efisiensi, produktivitas, dan pengembangan bisnis perusahaan.",
    laws: [],
  },
  funding: {
    leftTitleHtml: `<br><b>Keahlian<br>Kami</b>`,
    items: [
      { description: "Web Dev" },
      { description: "Mobile Apps" },
      { description: "Ai" },
      { description: "CLoud" },
      { description: "Iuran Wajib Kapal Laut" },
    ],
  },
  statsCtaMap: {
    metricLabels: {
      regionalOffices: "Proyek Selesai",
      branchOffices: "Pengalaman",
      serviceOffices: "Support",
    },
    ctaLabel: "Hubungi Kami",
    rightHeadlineHtml: "Market <br /> Share",
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
