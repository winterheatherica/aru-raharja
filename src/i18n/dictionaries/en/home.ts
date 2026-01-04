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
    heading: "ARUdigital Core Products",
    descPrefix:
      "Integrated digital products from ARU to support efficiency, productivity, and the growth of your business.",
    laws: [""],
  },
  funding: {
    leftTitleHtml: `<br><b>Keahlian<br>Kami</b>`,
    items: [
      { description: "Mandatory Contribution for Road Traffic Accident Funds" },
      { description: "Mandatory Contribution for Public Motor Vehicles" },
      { description: "Mandatory Contribution for Aircraft" },
      { description: "Mandatory Contribution for Railway" },
      { description: "Mandatory Contribution for Marine" },
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
