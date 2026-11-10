// PREVIEW PLACEHOLDERS: verify contact details, links, distances, travel times,
// room facts, reviews, and FAQ answers with the property before publishing.
export const site = {
  name: "Hotel Trinetar",
  sub: "Resorts",
  phone: "+91 99999 00000", // Demo contact number
  email: "hello@example.com", // Demo email address
  address: "Padoura Enclave, Patnitop, Jammu & Kashmir",
  whatsapp: "910000000000", // Demo number
  mapUrl: "https://www.google.com/maps/search/?api=1&query=Hotel+Trinetar+Resorts+Patnitop", // Replace with verified pin
  tripadvisorUrl: "https://www.tripadvisor.com/Search?q=Hotel%20Trinetar%20Patnitop", // Replace with property page
  highwayDistance: "1.5 km",
  nagTempleDistance: "About 3 km (demo)",
  roomCount: "12 rooms (demo)",
  altitude: "About 2,024 m (demo)",
  travelTimes: [
    { place: "Jammu", time: "About 3 hr (demo)" },
    { place: "Udhampur", time: "About 1 hr (demo)" },
    { place: "Katra", time: "About 2 hr (demo)" },
  ],
  reviews: [
    { quote: "Sample review for preview only: A peaceful break in the mountains.", name: "Demo guest 01" },
    { quote: "Sample review for preview only: We enjoyed the fresh air and quiet surroundings.", name: "Demo guest 02" },
    { quote: "Sample review for preview only: A lovely base for exploring Patnitop.", name: "Demo guest 03" },
  ],
  faqAnswers: {
    checkIn: "Demo information: check-in from 12:00 pm and check-out by 11:00 am. Confirm timings with the hotel.",
    parking: "Demo information: on-site parking may be available. Confirm availability with the hotel.",
    restaurant: "Demo information: ask the hotel about current restaurant service and timings.",
    paragliding: "Demo information: ask the hotel about local operators, availability, and weather conditions.",
    season: "Patnitop changes with the seasons. Check current weather and road conditions before travelling.",
    pets: "Demo information: contact the hotel to confirm its current pet policy.",
  },
};

export const stays = [
  { title: "A room above the clouds", subtitle: "A quiet place to pause and take in the mountain air.", image: "/images/demo-room.jpg", type: "Rooms" },
  { title: "Into the deodar forest", subtitle: "Wake to the stillness of Patnitop's forest canopy.", image: "/images/hero-mobile.png", type: "Views" },
  { title: "A slower kind of stay", subtitle: "Make space for unhurried days in the mountains.", image: "/images/demo-room.jpg", type: "Rooms" },
];

// Sample tariff page data. Confirm room categories and rates with the property.
export const rooms = [
  { name: "Deluxe room (demo)", price: "Ask for current rates", img: "/images/demo-room.jpg", note: "Sample room listing; confirm the room features with the hotel." },
  { name: "Mountain view room (demo)", price: "Ask for current rates", img: "/images/demo-hotel.jpg", note: "Sample room listing; confirm the view and room features with the hotel." },
  { name: "Family room (demo)", price: "Ask for current rates", img: "/images/demo-room.jpg", note: "Sample room listing; confirm occupancy and configuration with the hotel." },
];

export const faq = [
  { q: "What are the check-in and check-out times?", a: site.faqAnswers.checkIn },
  { q: "Is parking available at the hotel?", a: site.faqAnswers.parking },
  { q: "Is there a restaurant?", a: site.faqAnswers.restaurant },
  { q: "Can the hotel help arrange paragliding?", a: site.faqAnswers.paragliding },
  { q: "When is the best season to visit Patnitop?", a: site.faqAnswers.season },
  { q: "Are pets allowed?", a: site.faqAnswers.pets },
  { q: "How can I book a stay?", a: "Send us your preferred dates and number of guests on WhatsApp, or call the hotel directly." },
];
