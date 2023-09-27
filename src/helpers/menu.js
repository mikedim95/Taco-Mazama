import chicken from "../assets/chicken.jpg";
import pull from "../assets/pulled.jpeg";
import beef from "../assets/beef.jpeg";
import vegie from "../assets/vegie.jpeg";
import mushroom from "../assets/mushroom.jpeg";
import vegan from "../assets/vegan.jpeg";
import cheese from "../assets/cheese.jpg";
import lettuce from "../assets/lettuce.jpg";
import jalapenos from "../assets/jalapenos.jpeg";
import onions from "../assets/onions.jpg";
import cream from "../assets/cream.jpg";
import pico from "../assets/pico.jpeg";
import mango from "../assets/mango.jpeg";
import tomato from "../assets/tomato.jpeg";
import nacho from "../assets/nachos.svg";
import loadNacho from "../assets/loadedNachos.svg";
import tortilla from "../assets/tortilla.svg";
import loadTortilla from "../assets/loadedtortilla.svg";

export const stuffing = [
  {
    title: "Κοτόπουλο",
    subtitle: "Παρθένο κοτόπουλο μεγαλωμένο με αγάπη 500γρ.",
    extraPrice: 0,
    spicy: "",
    img: chicken,
  },
  {
    title: "Pull Pork",
    subtitle: "Παρθένο κοτόπουλο μεγαλωμένο με αγάπη 500γρ.",
    extraPrice: 0,
    spicy: "",
    img: pull,
  },
  {
    title: "Μοσχαρίσιο Chilli",
    subtitle: "Μοσχαράκι γάλακτος 500γρ.",
    extraPrice: 1,
    spicy: "",
    img: beef,
  },
  {
    title: "Vegie Chilli",
    subtitle: "Γλυκοπατάτα Καλαμπόκι & Πιπεριά",
    extraPrice: 0,
    spicy: "",
    img: vegie,
  },
  {
    title: "Mushroom & Sweetcorn Chilli",
    subtitle: "Πιπεριά",
    extraPrice: 0,
    spicy: "",
    img: mushroom,
  },
  {
    title: "Vegan Special",
    subtitle: "Παρθένο κοτόπουλο μεγαλωμένο με αγάπη 500γρ.",
    extraPrice: 1,
    spicy: "",
    img: vegan,
  },
];
export const ingredients = [
  {
    title: "Τυρί",
    subtitle: "Φέτα βαλμά, σκληρό Τυρί",
    extraPrice: 0,
    spicy: "",
    img: cheese,
  },
  {
    title: "Μαρούλι",
    subtitle: "Αγνό μαρουλάκι απο τον κήπο μας",
    extraPrice: 0,
    spicy: "",
    img: lettuce,
  },
  {
    title: "Jalapenos",
    subtitle: "Μικρές λαχταριστές Μεξικάνικες pickles",
    extraPrice: 0,
    spicy: "",
    img: jalapenos,
  },
  {
    title: "Pickled Onions",
    subtitle: "Κρεμιδάκι τουρσί, παραγωγής μας",
    extraPrice: 0,
    spicy: "",
    img: onions,
  },
  {
    title: "Sour Cream",
    subtitle: "Γλυκόξινη κρέμα - σως",
    extraPrice: 0,
    spicy: "",
    img: cream,
  },
];
export const salsa = [
  {
    title: "Pico de Gallo",
    subtitle:
      "Ντομάτες, κρεμμύδια, φρέσκο κινέζικο, πιπεριές, κόλιαντρο και λάιμ ",
    extraPrice: 0,
    spicy: "",
    img: pico,
  },
  {
    title: "Mango & Passionfruit",
    subtitle: "Γλυκό μάνγκο, έντονο παθητικό φρούτο, αρμονική σύνθεση γεύσεων",
    extraPrice: 0,
    spicy: "🌶️",
    img: mango,
  },
  {
    title: "Roast Tomato & Chipotle",
    subtitle: "Ψητές ντομάτες, πικάντικο chipotle, αρωματική εναλλαγή γεύσεων.",
    extraPrice: 1,
    spicy: "🌶️🌶️",
    img: tomato,
  },
  {
    title: "Ανανάς με Ghost Chilli",
    subtitle: "Γλυκός ανανάς με εκρηκτική πικάντικη επίγευση.",
    extraPrice: 0,
    spicy: "🌶️🌶️🌶️",
  },
  {
    title: "Pico Diablo",
    subtitle:
      "Καυτερή πιπεριά, τονωτική λάιμ, φρέσκα ντοματίνια, κρεμώδη αβοκάντο.",
    extraPrice: 0,
    spicy: "🌶️🌶️🌶️🌶️",
  },
];
export const extra = [
  {
    title: "Guacamole",
    subtitle: "Βελούδινη αβοκάντο, φρέσκα ντοματίνια, κρεμώδη κρεμμύδια, λάιμ.",
    extraPrice: 1,
    spicy: "",
  },
  {
    title: "Chorizo",
    subtitle: "Πικάντικο λουκάνικο από αλεσμένο χοιρινό κρέας και μπαχαρικά.",
    extraPrice: 1,
    spicy: "",
  },
  {
    title: "Fajita Mix",
    subtitle:
      "Χοιρινό ή κοτόπουλο, πολύχρωμες πιπεριές, κρεμμύδια και μπαχαρικά.",
    extraPrice: 0.5,
    spicy: "",
  },
  {
    title: "Καλαμπόκι",
    subtitle:
      "Χοιρινό ή κοτόπουλο, πολύχρωμες πιπεριές, κρεμμύδια και μπαχαρικά.",
    extraPrice: 0.5,
    spicy: "",
  },
  {
    title: "Κάνε upgrade το meal σου",
    subtitle: "Χ2 Tortillas + extra λιωμένη Μοτσαρέλα",
    extraPrice: 2,
    spicy: "",
  },
];
export const sides = [
  {
    title: "Nachos",
    subtitle:
      "Δημοφιλές μεξικάνικο σνακ από καλαμπόκι που ψήνονται μέχρι να γίνει τραγανό και χρυσαφί. Συχνά συνοδεύονται από λιωμένο τυρί, συνήθως τσένταρ και γκουακαμόλε, ή μπορεί να συνοδεύονται από σάλτσες, όπως σάλτσα σαλσίτα, πικάντικη σάλτσα ή σάλτσα με βάση το λάδι.",
    price: 6,
    img: nacho,
  },
  {
    title: "Loaded Nachos",
    subtitle: "subtitle",
    price: 7.5,
    img: loadNacho,
  },
  {
    title: "Tortilla Salsas",
    subtitle: "",
    price: 3,
    img: tortilla,
  },
  {
    title: "Tortilla Salsas & Guacamole",
    subtitle: "",
    price: 3,
    img: loadTortilla,
  },
  {
    title: "Tortilla Chips",
    subtitle: "",
    price: 3,
    img: loadTortilla,
  },
];

export const beverages = [
  {
    title: "Coca Cola",
    subtitle: "Κουτάκι Coca Cola 250ml",
    price: 1.5,
    img: nacho,
    category: "soft drinks",
  },
  {
    title: "Πορτοκαλάδα",
    subtitle: "Κουτάκι Πορτοκαλάδα 250ml",
    price: 1.5,
    img: nacho,
    category: "soft drinks",
  },
  {
    title: "Λεμονάδα",
    subtitle: "Κουτάκι Λεμονάδα 250ml",
    price: 1.5,
    img: nacho,
    category: "soft drinks",
  },
  {
    title: "Γκαζόζα",
    subtitle: "Κουτάκι Γκαζόζα 250ml",
    price: 1.5,
    img: nacho,
    category: "soft drinks",
  },
  {
    title: "Σουρωτή",
    subtitle: "Κουτάκι Σουρωτή 250ml",
    price: 1.5,
    img: nacho,
    category: "soft drinks",
  },
  {
    title: "Νύμφη",
    subtitle: "Μπύρα σε μπουκάλι 330ml",
    price: 3,
    img: nacho,
    category: "beers",
  },
  {
    title: "Μάμος",
    subtitle: "Μπύρα σε μπουκάλι 330ml",
    price: 3,
    img: nacho,
    category: "beers",
  },
  {
    title: "Sol",
    subtitle: "Μπύρα σε μπουκάλι 330ml",
    price: 3,
    img: nacho,
    category: "beers",
  },
  {
    title: "Desperados",
    subtitle: "Μπύρα σε μπουκάλι 330ml",
    price: 5,
    img: nacho,
    category: "beers",
  },
  {
    title: "Erdinger Weiss",
    subtitle: "Μπύρα σε μπουκάλι 330ml",
    price: 5,
    img: nacho,
    category: "beers",
  },
  {
    title: "Lagunitas IPA",
    subtitle: "Μπύρα σε μπουκάλι 330ml",
    price: 5,
    img: nacho,
    category: "beers",
  },
  {
    title: "Frozen Margarita Strawberry",
    subtitle: "Παγωμένη γρανίτα",
    price: 6,
    img: nacho,
    category: "drinks",
  },
  {
    title: "Frozen Margarita Lime",
    subtitle: "Παγωμένη γρανίτα",
    price: 6,
    img: nacho,
    category: "drinks",
  },
];
