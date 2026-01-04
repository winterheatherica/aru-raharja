const home = {
  seo: {
    title: "Home – PT Aru Raharja",
    description:
      "PT Aru Raharja provides integrated digital products and services to support efficiency, productivity, and business growth.",
    canonical: "https://aruraharja.co.id/en",
    robots: "index, follow",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "PT Aru Raharja",
    title: "PT Aru Raharja",
    description:
      "Integrated digital services and solutions from PT Aru Raharja to support business growth and efficiency.",
    url: "https://aruraharja.co.id/en",
    image: {
      url: "https://aruraharja.co.id/images/general/logo/aru.png",
      alt: "PT Aru Raharja – Integrated Digital Services",
      type: "image/png",
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "PT Aru Raharja",
    description:
      "Integrated digital services and solutions from PT Aru Raharja.",
    image: "https://aruraharja.co.id/images/general/logo/aru.png",
  },
  hero: {
    faqTitle: "Frequently Asked Questions",
    faqCta: "Open FAQ",
    serviceTitle: "Compensation Service",
    serviceCta: "See Services",
    complaintTitle: "Complaint Service",
    complaintCta: "Submit a Complaint",
  },
  dutiesPromo: {
    heading: "<b>ARU</b><i>digital</i> Core Products",
    descPrefix:
      "Integrated digital products from ARU to support efficiency, productivity, and business growth.",
    laws: [""],

    cards: [
      {
        title: "Claim Management",
        subtitle:
          "Structured, fast, and transparent claim management to improve service efficiency.",
        alt: "Claim management service",
      },
      {
        title: "Contact Centre",
        subtitle:
          "Professional and responsive contact center services for customer communication.",
        alt: "Contact centre service",
      },
      {
        title: "Help Desk Hospital",
        subtitle:
          "Hospital assistance and support services to ensure optimal healthcare delivery.",
        alt: "Hospital help desk service",
      },
    ],

    slides: [
      {
        title: "Twibbon #HUTAruRaharja",
        alt: "Twibbon celebration of ARU Raharja anniversary",
      },
      {
        title: "Our Announcement",
        alt: "Official announcement from ARU Raharja",
      },
    ],
  },
  funding: {
    leftTitleHtml: `<br><b>Our<br>Expertise</b>`,
    items: [
      { description: "Development of modern, responsive, and scalable websites tailored to business needs." },
      { description: "Development of reliable and user-friendly native and cross-platform mobile applications." },
      { description: "Design of intuitive UI/UX focused on usability and user experience." },
      { description: "Cloud-based digital systems to support business efficiency and digital transformation." },
      { description: "Integrated technology solutions that can be customized to meet company requirements." },
      { description: "Preventive digital services to support employee productivity and well-being." },
      { description: "Procurement and distribution services to support business operations." },
      { description: "Professional construction services with a strong commitment to quality and timeliness." },
      { description: "Flexible and reliable transportation and vehicle rental services." },
      { description: "Provision of professional and qualified workforce to support company operations." },
      { description: "Provision of working space, virtual office, and event space in strategic locations." },
    ],
  },
  statsCtaMap: {
    metricLabels: {
      regionalOffices: "Regional Offices",
      branchOffices: "Branch Offices",
      serviceOffices: "Service Offices",
    },
    ctaLabel: "Contact Us",
    rightHeadlineHtml: "Serving to the <br /> Farthest Corners",
  },
  service: {
    cards: {
      services: {
        title: "Services",
        subtitle: "Compensation",
        alt: "compensation",
      },
      complaint: {
        title: "Services",
        subtitle: "Complaint",
        alt: "complaint",
      },
      appeal: {
        title: "Appeal",
        subtitle: "Aru Raharja",
        alt: "appeal",
      },
    },
  },
  news: {
    heading: "Aru Raharja News",
    readMoreLabel: "Read More",
    loadMoreLabel: "Load More",
  },
  videos: {
    heading: "Videos",
    readMoreLabel: "Watch",
    loadMoreLabel: "Load More",
  },
  quicklink: {
    x: {
      title: "Follow us on X",
      button: "Join on X",
    },
    tiktok: {
      title: "Follow us on TikTok",
      button: "Join on TikTok",
    },
    instagram: {
      title: "Follow us on Instagram",
      button: "Join on Instagram",
    },
    facebook: {
      title: "Follow us on Facebook",
      button: "Join on Facebook",
    },
  },
  partners: {
    heading: "Partnerships",
    description:
      "Aru Raharja’s services have been trusted by world-class companies across industries to help them grow.",
  },
} as const;

export default home;
