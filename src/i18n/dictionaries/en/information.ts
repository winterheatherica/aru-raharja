const information = {
  hero: {
    titleHtml: "Information",
    description:
      "A collection of the latest news, press releases, announcements, and information about Aru Raharja",
    altMask: "Decorative background",
    altIllustration: "Information Illustration",
  },

  reports: {
    nav: [
      { id: "news", label: "News" },
      { id: "pressrelease", label: "Press Release" },
      { id: "secure", label: "Secure" },
      { id: "annualreport", label: "<b>Annual</b> Report" },
      { id: "sustainabilityreport", label: "<b>Sustainability</b> Report" },
      { id: "monthlyreport", label: "<b>Monthly</b> Report" },
    ] as const,

    sectionTitle: {
      news: {
        titleHtml: "Latest News",
        description:
          "A collection of the latest news and updates about Aru Raharja’s activities and progress.",
      },
      pressrelease: {
        titleHtml: "Press Releases",
        description:
          "A collection of official press statements from Aru Raharja for the public and media.",
      },
      secure: {
        titleHtml: "Security Information",
        description:
          "Information about data security, consumer protection, and system updates within Aru Raharja.",
      },
      annualreport: {
        titleHtml: "<b>Annual</b> Report",
        description:
          "A collection of Aru Raharja’s annual reports reflecting company performance and transparency each year.",
      },
      sustainabilityreport: {
        titleHtml: "<b>Sustainability</b> Report",
        description:
          "Sustainability reports highlighting Aru Raharja’s commitment to social and environmental responsibility.",
      },
      monthlyreport: {
        titleHtml: "<b>Monthly</b> Report",
        description:
          "A collection of Aru Raharja’s monthly financial reports from various time periods.",
      },
    },
  },
} as const;

export default information;
