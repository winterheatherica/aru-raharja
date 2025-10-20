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
        { id: "arudigital", label: "<b>ARU</b><i>digital</i>" },
        { id: "aruhealthcare", label: "<b>ARU</b><i>healthcare</i>" },
        { id: "arucontractor", label: "<b>ARU</b><i>contractor</i>" },
        { id: "arusource", label: "<b>ARU</b><i>source</i>" },
        { id: "arusolution", label: "<b>ARU</b><i>solution</i>" },
        { id: "arulog", label: "<b>ARU</b><i>log</i>" },
        { id: "arutrans", label: "<b>ARU</b><i>trans</i>" },
        { id: "aruspace", label: "<b>ARU</b><i>space</i>" },
    ] as const,
  },
} as const;

export default service;
