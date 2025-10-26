const service = {
  hero: {
    titleHtml: 'Our Excellent <br class="hidden lg:block"> Service',
    description:
      "Aru Raharja is committed to always prioritizing customer satisfaction, by providing the best services that are always accessible to customers.",
    altMask: "Decorative background",
    altIllustration: "Service Illustration",
  },
  intro: {
    paragraph:
      "The presence of PT Aru Raharja provides basic protection to the community through 2 (two) coverage programs, namely Public Transport Equipment Passenger Accident Insurance implemented under Law No. 33 of 1964 concerning Mandatory Passenger Accident Insurance Fund and Legal Liability Insurance for Third Parties implemented under Law No. 34 of 1964 concerning Road Traffic Accident Fund.",
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
  },
} as const;

export default service;
