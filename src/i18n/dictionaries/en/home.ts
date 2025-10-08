const home = {
  hero: {
    faqTitle: "Frequently Asked Questions",
    faqCta: "Open FAQ",
    serviceTitle: "Compensation Service",
    serviceCta: "See Services",
    complaintTitle: "Complaint Service",
    complaintCta: "Submit a Complaint",
  },
  dutiesPromo: {
    heading: "Main Duties of Aru Raharja for the Public",
    descPrefix:
      "Aru Raharja as the first guarantor of traffic accident victims in accordance with",
    laws: ["Law No. 33 of 1964", "Law No. 34 of 1964"],
  },
  funding: {
    leftTitleHtml: `Funding Sources <br><b>Law No. 33 of 1964</b><br>and<br><b>Law No. 34 of 1964</b>`,
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
