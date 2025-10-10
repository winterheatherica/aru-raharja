const career = {
  hero: {
    titleHtml: "Career",
    description:
      "Join us and become an important part of Jasa Raharja's progress",
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
      vacancies: [
        {
          id: "1",
          title: "Backend Developer",
          type: "Internship",
          location: "Jakarta",
          description: "Develop and maintain backend services.",
        },
        {
          id: "2",
          title: "Frontend Developer",
          type: "Internship",
          location: "Jakarta",
          description: "Build and optimize user interfaces.",
        },
        {
          id: "3",
          title: "IT Support Staff",
          type: "Full-time",
          location: "Jakarta",
          description: "Assist IT operations and support internal users.",
        },
      ],
    },
  },
} as const;

export default career;
