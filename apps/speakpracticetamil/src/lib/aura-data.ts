import heroMadrid from "@/assets/hero-madrid.jpg";
import sceneCafe from "@/assets/scene-cafe.jpg";
import sceneAirport from "@/assets/scene-airport.jpg";
import sceneRestaurant from "@/assets/scene-restaurant.jpg";
import sceneMarket from "@/assets/scene-market.jpg";
import sceneHotel from "@/assets/scene-hotel.jpg";
import sceneFamily from "@/assets/scene-family.jpg";
import shortTokyo from "@/assets/short-tokyo.jpg";
import shortParis from "@/assets/short-paris.jpg";
import shortIndia from "@/assets/short-india.jpg";
import aiAvatar from "@/assets/ai-avatar.jpg";
import echoChamber from "@/assets/echo-chamber.jpg";

export const images = {
  heroMadrid,
  sceneCafe,
  sceneAirport,
  sceneRestaurant,
  sceneMarket,
  sceneHotel,
  sceneFamily,
  shortTokyo,
  shortParis,
  shortIndia,
  aiAvatar,
  echoChamber,
};

export type SpeakCard = {
  id: string;
  phrase: string;
  translation: string;
  language: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  reps: number;
};

export const speakCards: SpeakCard[] = [
  { id: "es-cafe", phrase: "¿Dónde puedo encontrar un buen café?", translation: "Where can I find good coffee?", language: "Spanish", category: "Streets of Madrid", level: "Beginner", reps: 8 },
  { id: "es-mesa", phrase: "Me gustaría reservar una mesa, por favor.", translation: "I'd like to reserve a table, please.", language: "Spanish", category: "Dining Out", level: "Intermediate", reps: 3 },
  { id: "fr-cafe", phrase: "Je voudrais un café noir.", translation: "I'd like a black coffee.", language: "French", category: "Café Paris", level: "Beginner", reps: 10 },
  { id: "fr-aide", phrase: "Pouvez-vous m'aider?", translation: "Can you help me?", language: "French", category: "Common", level: "Beginner", reps: 5 },
  { id: "ja-eki", phrase: "駅はどこですか?", translation: "Where is the station?", language: "Japanese", category: "Tokyo Transit", level: "Beginner", reps: 2 },
  { id: "hi-namaste", phrase: "आप कैसे हैं?", translation: "How are you?", language: "Hindi", category: "Greetings", level: "Beginner", reps: 6 },
];

export type Scene = {
  slug: string;
  name: string;
  city: string;
  tagline: string;
  image: string;
  duration: string;
  intensity: "Calm" | "Rich" | "Vivid";
};

export const scenes: Scene[] = [
  { slug: "cafe", name: "Midnight Café", city: "Paris", tagline: "The ritual of slow conversation", image: sceneCafe, duration: "14 min", intensity: "Calm" },
  { slug: "airport", name: "Last Departure", city: "Madrid", tagline: "Boarding announcements & farewells", image: sceneAirport, duration: "9 min", intensity: "Rich" },
  { slug: "restaurant", name: "The Toast", city: "Buenos Aires", tagline: "Wine, jazz, and second courses", image: sceneRestaurant, duration: "18 min", intensity: "Vivid" },
  { slug: "market", name: "Mercado de la Mañana", city: "Sevilla", tagline: "Vendors, prices, citrus & bread", image: sceneMarket, duration: "11 min", intensity: "Rich" },
  { slug: "hotel", name: "Lobby Concierge", city: "Mexico City", tagline: "Check-in and quiet luxury", image: sceneHotel, duration: "7 min", intensity: "Calm" },
  { slug: "family", name: "Sunday Dinner", city: "Bogotá", tagline: "Family gathering, layered voices", image: sceneFamily, duration: "22 min", intensity: "Vivid" },
];

export type Short = {
  id: string;
  image: string;
  language: string;
  city: string;
  duration: string;
  caption: string;
  translation: string;
};

export const shorts: Short[] = [
  { id: "tokyo-1", image: shortTokyo, language: "Japanese", city: "Tokyo", duration: "0:24", caption: "ちょっと聞いてもいい?", translation: "Can I ask you something?" },
  { id: "paris-1", image: shortParis, language: "French", city: "Paris", duration: "0:18", caption: "Tu rigoles ou quoi?", translation: "Are you kidding me?" },
  { id: "india-1", image: shortIndia, language: "Hindi", city: "Jaipur", duration: "0:21", caption: "क्या आप मेरी मदद करेंगे?", translation: "Will you help me?" },
];

export const languages = [
  "Spanish", "Japanese", "French", "Hindi", "Tamil", "English",
];