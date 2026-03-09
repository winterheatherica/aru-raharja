const reservation = {
  meta: {
    title: "Reservation – PT Aru Raharja",
    description:
      "PT Aru Raharja reservation services designed to support operational and service needs efficiently.",
    image: "https://aruraharja.co.id/images/general/logo/aru.png",
    keywords: "room reservation, meeting room booking, aru space",
  },
  hero: {
    titleHtml: "Reservation",
    description:
      'Aru Raharja provides <strong>ARU</strong><em>space</em> — modern work and meeting spaces that can be booked to suit your needs.',
    altMask: "Background decoration",
    altIllustration: "Reservation illustration",
  },
  desc: {
    paragraph:
      "Choose the room that best fits your needs and adjust your booking schedule. Click the button below to view detailed time availability.",
    ctaLabel: "View Booking Schedule",
  },
  roomlist: {
    title: "Available Rooms",
    subtitle: "Select a room to view details and booking schedule",
    priceLabel: "Price per hour",
    capacityLabel: "Capacity",
    availableLabel: "Available",
    unavailableLabel: "Fully booked",
    ctaLabel: "View",
    ctaUnavailable: "Unavailable",
    amenitiesTitle: "Facilities",
    ratingLabel: "Rating",
  },
} as const;

export default reservation;
