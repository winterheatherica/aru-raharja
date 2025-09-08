export default {
  navbar: {
    about: "About Aru Raharja",
    services: "Service",
    complaint: "Complaint",
    governance: "Governance",
    information: "Information",
    appeal: "Appeal",
    career: "Career",
  },
  hero: {
    faqTitle: "Frequently Asked Questions",
    faqCta: "Open FAQ",
    serviceTitle: "Compensation Service",
    serviceCta: "See Services",
    complaintTitle: "Complaint Service",
    complaintCta: "Submit a Complaint",
  },
  footer: {
    about: {
      description:
        "PT Aru Raharja was established on December 14, 1988. The company operates in various fields including Digital IT, Outsourcing, Rent a Car, Building Management, Office Space Provider, Contracting Services, and Supplier.",
    },
    contact: {
      headOffice: "Head Office",
      address:
        "Wisma Raharja, Jl. TB Simatupang No.Kav. 1\nSouth Jakarta City, Special Capital Region of Jakarta 12430",
    },
    quickLinks: {
      faq: "FAQ",
      contactUs: "Contact Us",
      eProcurement: "E-Procurement",
      wbs: "Whistle Blowing System (WBS)",
    },
    bottom: {
      legalTerms: "Legal Terms",
      privacyPolicy: "Privacy Policy",
      accessibility: "Accessibility",
      rights: "All Rights Reserved.",
    },
  },
  dutiesPromo: {
    heading: "Main Duties of Aru Raharja for the Public",
    descPrefix:
      "Aru Raharja as the first guarantor of traffic accident victims in accordance with",
    laws: ["Law No. 33 of 1964", "Law No. 34 of 1964"],
  },
  funding: {
    leftTitleHtml: `Funding Sources <br><b>Law No. 33 of 1964</b><br>and<br><b>Law No. 34 of 1964</b>`,
    maskSrc: "/masking/masking-variant-1.3.png",
    items: [
      { code: "SWDKLJJ", description: "Mandatory Contribution for Road Traffic Accident Funds", iconSrc: "/funding/swdkljj-icon-2.png" },
      { code: "IWKBU", description: "Mandatory Contribution for Public Motor Vehicles", iconSrc: "/funding/iwkbu-icon-2.png" },
      { code: "IWPU",  description: "Mandatory Contribution for Aircraft", iconSrc: "/funding/iwpu-icon-2.png" },
      { code: "IWKA",  description: "Mandatory Contribution for Railway", iconSrc: "/funding/iwka-icon-2.png" },
      { code: "IWKL",  description: "Mandatory Contribution for Marine", iconSrc: "/funding/iwkl-icon-2.png" },
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
} as const;
