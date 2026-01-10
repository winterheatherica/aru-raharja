const service = {
  hero: {
    titleHtml: 'Our Excellent <br class="hidden lg:block"> Service',
    description:
      "Aru Raharja is committed to always prioritizing customer satisfaction, by providing the best services that are always accessible to customers.",
    altMask: "Decorative background",
    altIllustration: "Service Illustration",
  },
  solutions: {
    nav: [
      { id: "arudigital", label: "<strong>ARU</strong><em>digital</em>" },
      { id: "aruhealthcare", label: "<strong>ARU</strong><em>healthcare</em>" },
      { id: "arucontractor", label: "<strong>ARU</strong><em>contractor</em>" },
      { id: "arusource", label: "<strong>ARU</strong><em>source</em>" },
      { id: "arusolution", label: "<strong>ARU</strong><em>solution</em>" },
      { id: "arulog", label: "<strong>ARU</strong><em>log</em>" },
      { id: "arutrans", label: "<strong>ARU</strong><em>trans</em>" },
      { id: "aruspace", label: "<strong>ARU</strong><em>space</em>" },
    ] as const,
    descriptions: {
      arudigital: {
        title: "ARUdigital — Cloud business platform",
        description:
          "Scalable digital solutions to streamline operations, boost efficiency, and deliver better customer experiences.",
      },
      aruhealthcare: {
        title: "ARUhealthcare — Preventive & productive",
        description:
          "Employee preventive care programs designed to improve productivity while reducing long-term healthcare costs.",
      },
      arucontractor: {
        title: "ARUcontractor — Professional & on-time construction",
        description:
          "Reliable construction services with strong project management, strict safety standards, and transparent documentation.",
      },
      arusource: {
        title: "ARUsource — Ready-to-work talent",
        description:
          "Professional workforce supply with clear SLAs, fast onboarding, and flexible working models (on-site, hybrid, or remote).",
      },
      arusolution: {
        title: "ARUsolution — Fast & best-fit implementation",
        description:
          "Ready-to-use solutions delivered with a 1–3 week implementation playbook, tailored to your business needs and culture.",
      },
      arulog: {
        title: "ARUlog — Catalog & procurement supplier",
        description:
          "Curated catalogs with competitive pricing, clear lead times, and reliable delivery SLAs you can count on.",
      },
      arutrans: {
        title: "ARUtrans — Flexible vehicle rental, drivers & insurance included",
        description:
          "Cars and minibuses for daily operations or project needs, with driver options, insurance coverage, and 24/7 support.",
      },
      aruspace: {
        title: "ARUspace — Flexible & strategic workspaces",
        description:
          "Virtual Offices, Dedicated Desks, Meeting Rooms, and Event Spaces with complete facilities in strategic locations.",
      },
    },
  },
} as const;

export default service;
