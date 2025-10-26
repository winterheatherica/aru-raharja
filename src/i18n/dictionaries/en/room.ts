const room = {
  /** Meta data for the page */
  meta: {
    id: "r1",
    title: "Meeting Room R1",
    subtitle: "Modern 8-person meeting room with full amenities",
    floor: "3rd Floor",
    rating: 4.8,
    available: true,
    pricePerHour: 50,
    heroImage: "/images/rooms/room-1.jpg",
  },

  /** Description section */
  description: {
    heading: "A productive space for collaboration",
    paragraph: `
      <p>
        <strong>Meeting Room R1</strong> is designed for productive collaboration and brainstorming sessions. 
        With a capacity of up to <strong>8 people</strong>, it offers a modern, air-conditioned environment 
        with a clean aesthetic, perfect for small team meetings or client discussions.
      </p>
      <p>
        The room is equipped with an <em>HD projector</em>, wall-mounted <em>whiteboard</em>, 
        high-speed <em>Wi-Fi</em>, and a dedicated <em>video conferencing setup</em>. 
        Soft LED lighting and sound-absorbing panels ensure comfort and focus throughout your session.
      </p>
      <p>
        Reservations are available by the hour or day, and you can check real-time availability below.
      </p>
    `,
  },

  /** Image gallery section */
  gallery: {
    title: "Gallery",
    images: [
      {
        src: "/images/general/gedung-2.png",
        alt: "Meeting Room R1 — Main view",
      },
      {
        src: "/images/general/gedung-1.png",
        alt: "Meeting Room R1 — Projector and whiteboard",
      },
      {
        src: "/images/general/gedung-2.png",
        alt: "Meeting Room R1 — Discussion setup",
      },
      {
        src: "/images/general/gedung-1.png",
        alt: "Meeting Room R1 — Entrance area",
      },
      {
        src: "/images/general/gedung-2.png",
        alt: "Meeting Room R1 — Side seating area",
      },
    ],
  },

  /** Facilities section */
  facilities: {
    title: "Facilities & Equipment",
    list: [
      { label: "Seating capacity", value: "8 people" },
      { label: "Room size", value: "24 m²" },
      { label: "Projector", value: "1080p HD projector with HDMI input" },
      { label: "Audio", value: "Built-in stereo speaker system" },
      { label: "Connectivity", value: "High-speed Wi-Fi (up to 100 Mbps)" },
      { label: "Whiteboard", value: "Wall-mounted with dry-erase markers" },
      { label: "Video conference", value: "Logitech webcam + wide microphone" },
      { label: "Air conditioning", value: "Individual climate control" },
      { label: "Power outlets", value: "8 table outlets + 2 wall sockets" },
      { label: "Refreshments", value: "Water dispenser & coffee station nearby" },
    ],
  },

  /** Booking information */
  booking: {
    title: "Booking Information",
    details: [
      {
        label: "Availability",
        value: "Monday – Friday, 08:00–18:00",
      },
      {
        label: "Minimum duration",
        value: "1 hour",
      },
      {
        label: "Payment method",
        value: "Cashless (QRIS, debit, or transfer)",
      },
      {
        label: "Rescheduling",
        value: "Free up to 2 hours before booking time",
      },
    ],
    ctaLabel: "Book This Room",
  },

  /** Map / Location section */
  location: {
    title: "Location",
    address: "3rd Floor, Aru Raharja Building, Jl. Teknologi No. 5, Jakarta",
    coordinates: {
      lat: -6.2005,
      lng: 106.8227,
    },
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.5416367567214!2d106.8227!3d-6.2005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e3eec!2sJakarta!5e0!3m2!1sen!2sid!4v1683729912345",
  },

  /** Related rooms */
  related: {
    title: "Other Rooms",
    rooms: [
      {
        id: "r2",
        title: "Focus Room R2",
        subtitle: "Private room for individual or duo work",
        img: "/images/rooms/room-2.jpg",
        href: "/en/room/r2",
      },
      {
        id: "r3",
        title: "Conference Hall R3",
        subtitle: "Spacious hall for larger events",
        img: "/images/rooms/room-3.jpg",
        href: "/en/room/r3",
      },
    ],
  },
} as const;

export default room;
