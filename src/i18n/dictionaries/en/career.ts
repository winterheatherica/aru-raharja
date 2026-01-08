const career = {
  meta: {
    title: "Career – PT Aru Raharja",
    description:
      "Join PT Aru Raharja and grow your career in a professional and innovative environment.",
  },
  hero: {
    titleHtml: "Career",
    description:
      "Join us and become an important part of Aru Raharja's progress",
    altMask: "Decorative background",
    altIllustration: "Career Illustration",
  },
  registration: {
    filters: {
      searchPlaceholder: "Search Position",
      positionLabel: "All Positions",
      typeLabel: "All Types",
      locationLabel: "All Locations",
      positions: [] as string[],
      types: [] as string[],
      locations: [] as string[],
    },
    results: {
      emptyText: "No vacancies available",
      applyButton: "Apply Now",
    },
  },
} as const;

export default career;
