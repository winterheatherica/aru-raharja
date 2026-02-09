const home = {
  meta: {
    title: "Beranda – PT Aru Raharja",
    description:
      "PT Aru Raharja menyediakan layanan dan produk digital terintegrasi untuk mendukung efisiensi, produktivitas, dan pengembangan bisnis perusahaan.",
    image: "https://aruraharja.co.id/images/general/logo/aru.png",
    keywords:
      "PT Aru Raharja, solusi digital, layanan IT, transformasi digital",
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
    heading: "Produk Inti <b>ARU</b><i>digital</i>",
    descPrefix:
      "Produk digital terintegrasi dari ARU untuk mendukung efisiensi, produktivitas, dan pertumbuhan bisnis perusahaan.",
    laws: [""],

    cards: [
      {
        title: "Manajemen Klaim",
        subtitle:
          "Pengelolaan proses klaim yang terstruktur, cepat, dan transparan untuk meningkatkan efisiensi layanan.",
        alt: "Layanan manajemen klaim",
      },
      {
        title: "Pusat Kontak",
        subtitle:
          "Layanan pusat kontak yang profesional dan responsif untuk menangani komunikasi pelanggan.",
        alt: "Layanan pusat kontak",
      },
      {
        title: "Help Desk Rumah Sakit",
        subtitle:
          "Layanan bantuan dan pendampingan terkait rumah sakit guna memastikan pelayanan kesehatan yang optimal.",
        alt: "Layanan help desk rumah sakit",
      },
    ],
  },

  funding: {
    leftTitleHtmlDesktop: `<br><b>Keunggulan<br>Solusi Digital<br>Terintegrasi untuk<br>Kebutuhan Bisnis Kami</b>`,
    leftTitleHtmlMobile: `<b>Keunggulan Solusi Digital<br>Terintegrasi untuk Kebutuhan Bisnis Kami</b>`,
    items: [
      { description: "Pengembangan website modern, responsif, dan scalable sesuai kebutuhan bisnis." },
      { description: "Pembuatan aplikasi mobile native maupun cross-platform yang andal dan user-friendly." },
      { description: "Perancangan UI/UX yang intuitif dan berfokus pada kenyamanan serta pengalaman pengguna." },

      { description: "Sistem digital berbasis cloud untuk mendukung efisiensi dan transformasi bisnis." },
      { description: "Solusi teknologi terintegrasi yang dapat disesuaikan dengan kebutuhan perusahaan." },
      { description: "Layanan digital preventif untuk mendukung produktivitas dan kesehatan karyawan." },
      { description: "Layanan pengadaan dan distribusi barang untuk mendukung operasional bisnis." },
      { description: "Jasa konstruksi profesional dengan standar kualitas dan ketepatan waktu." },
      { description: "Layanan transportasi dan sewa kendaraan yang fleksibel dan terpercaya." },
      { description: "Penyediaan tenaga kerja profesional dan kompeten sesuai kebutuhan perusahaan." },
      { description: "Penyediaan working space, virtual office, dan event space di lokasi strategis." },
    ],
  },
  statsCtaMap: {
    metricLabels: {
      regionalOffices: "Proyek Selesai",
      branchOffices: "Pengalaman",
      serviceOffices: "Support",
    },
    ctaLabel: "Hubungi Kami",
    rightHeadlineHtml: "Pangsa <br /> Pasar",
  },
  service: {
    cards: {
      arudigital: {
        title: "<b>ARU</b><i>digital</i>",
        subtitle: "Solusi Digital Terintegrasi",
        alt: "Layanan ARUdigital",
      },
      aruhealthcare: {
        title: "<b>ARU</b><i>healthcare</i>",
        subtitle: "Solusi Kesehatan Korporat",
        alt: "Layanan ARUhealthcare",
      },
      arusolution: {
        title: "<b>ARU</b><i>solution</i>",
        subtitle: "Solusi Teknologi Perusahaan",
        alt: "Layanan ARUsolution",
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
