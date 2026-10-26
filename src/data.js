export const TRIP = {
  from: 'Lahore (LHE)',
  to: 'Jeddah (JED)',
  nights: 7,
  makkahNights: 4,
  madinahNights: 3,
  family: '2 adults + 3 saal ka bacha + 1 saal ka bacha (lap)',
};

export const FLIGHT_OPTIONS = [
  {
    id: 'pia-nov',
    title: 'PIA Nonstop — Family Best Value',
    route: 'LHE → JED • 19 Nov, 18:25–22:20',
    duration: '5h 55m • Nonstop',
    priceUsd: 1897,
    note: 'Bachon ke saath sab se simple: seedha Jeddah, wapas bhi Jeddah se.',
    tag: 'RECOMMENDED',
  },
  {
    id: 'gulf-dec',
    title: 'Gulf Air — December Sasta',
    route: 'LHE → JED • 6 Dec, 17:00–12:40+1',
    duration: '13h 10m • 1 stop',
    priceUsd: 1770,
    note: 'Ticket sasta hai, lekin 13 ghante ka safar bachon ke saath mushkil ho sakta hai.',
    tag: 'CHEAPEST JEDDAH',
  },
  {
    id: 'emirates-med',
    title: 'Emirates — Madinah Sasta Ticket',
    route: 'LHE → MED • 16 Nov, 09:40–16:15',
    duration: '8h 35m • 1 stop',
    priceUsd: 1685,
    note: 'Sab se sasta ticket, lekin wapas bhi Madinah se — extra Makkah–Madinah safar.',
    tag: 'CHEAPEST TICKET',
  },
];

export const ITINERARY = [
  { day: 'Day 1', city: 'Makkah', title: 'Lahore → Jeddah → Makkah', detail: 'Jeddah airport se private car Makkah hotel. Rest karein, bachon ko fresh karein.' },
  { day: 'Day 2', city: 'Makkah', title: 'Umrah — Tawaf aur Sai', detail: 'Aaram se Tawaf (7 chakkar), phir Safa–Marwah Sai (7 dafa). Jaldi nahi, breaks lein.' },
  { day: 'Day 3', city: 'Makkah', title: 'Makkah Namazein aur Ziyarat', detail: 'Haram me namazein, rest, aur family ke saath halki ziyarat.' },
  { day: 'Day 4', city: 'Makkah', title: 'Makkah — Aakhri Din', detail: 'Shopping, Zamzam, aur Madinah ke liye packing.' },
  { day: 'Day 5', city: 'Madinah', title: 'Makkah → Madinah', detail: 'Haramain train (2.5 ghante) ya bus. Madinah hotel check-in, Masjid Nabawi.' },
  { day: 'Day 6', city: 'Madinah', title: 'Rawdah aur Ziyarat', detail: 'Nusuk par Rawdah permit pehle se book karein. Quba Masjid, Uhud.' },
  { day: 'Day 7', city: 'Madinah', title: 'Madinah — Aaram aur Dua', detail: 'Masjid Nabawi me waqt, family rest, Jeddah wapas ki tayyari.' },
  { day: 'Day 8', city: 'Wapas', title: 'Madinah → Jeddah → Lahore', detail: 'Sham ki flight rakhein taake Madinah–Jeddah safar ka waqt mil jaye.' },
];

export const MAKKAH_PLACES = [
  { id: 'haram-makkah', name: 'Masjid al-Haram', type: 'Haram', price: '—', distance: '0 m — centre', detail: 'Kaaba, Tawaf aur Sai yahin hote hain. Bachon ke saath ground floor par rush se bachein.', x: 50, y: 42 },
  { id: 'wahat', name: 'Wahat Al Misk Hotel', type: 'Hotel • Budget', price: '80 SAR / night', distance: 'Shuttle se Haram', detail: 'Sasta, simple rooms. Shuttle se Haram jana hota hai.', x: 22, y: 68 },
  { id: 'makarem', name: 'Makarem Mina Hotel', type: 'Hotel • Budget', price: '86 SAR / night', distance: 'Shuttle se Haram', detail: 'Umrah groups me mashhoor, basic clean rooms, shuttle service.', x: 74, y: 66 },
  { id: 'hotel21', name: '21 Hotel Al Aziziya', type: 'Hotel • Budget', price: '131 SAR / night', distance: 'Azizia • Shuttle', detail: 'Family ke liye practical, shuttle access, consistent service.', x: 50, y: 78 },
  { id: 'jeddah-airport', name: 'Jeddah Airport (JED)', type: 'Airport', price: 'Makkah car: 300 SAR sedan', distance: 'Makkah se ~75 min', detail: 'King Abdulaziz Airport. Yahan se Makkah private sedan 300 SAR, SUV 550–600 SAR.', x: 14, y: 24 },
];

export const MADINAH_PLACES = [
  { id: 'nabawi', name: "Masjid an-Nabawi", type: 'Masjid', price: '—', distance: '0 m — centre', detail: 'Rawdah ke liye Nusuk permit zaroori hai, jaldi book karein.', x: 50, y: 42 },
  { id: 'madinah-budget', name: 'Madinah Budget Hotels', type: 'Hotel • Budget', price: '$30–$60 / night', distance: 'Masjid se 1–2 km', detail: 'Budget hotels Masjid se 1–2 km par milte hain, taxi/shuttle se aana easy hai.', x: 26, y: 68 },
  { id: 'madinah-mid', name: 'Madinah Mid-Range Hotels', type: 'Hotel • 4-star', price: '$70–$150 / night', distance: 'Masjid se 300m–1 km', detail: 'Family ke liye behtar: qareeb, comfortable rooms.', x: 74, y: 66 },
  { id: 'madinah-airport', name: 'Madinah Airport (MED)', type: 'Airport', price: 'City taxi: 100–150 SAR', distance: 'Masjid se ~20 min', detail: 'Prince Mohammad Airport. Agar wapas Madinah se hai to ye sab se easy hai.', x: 14, y: 24 },
  { id: 'quba', name: 'Masjid Quba', type: 'Ziyarat', price: '—', distance: 'Masjid se ~5 km', detail: 'Pehli masjid, wuzu karke 2 rakat ka sawab.', x: 50, y: 80 },
];

export const AIRPORT_INFO = [
  { title: 'Jeddah Airport → Makkah', detail: 'Private sedan 300 SAR, SUV 550–600 SAR, 75 min. Family + luggage ke liye private car best hai.' },
  { title: 'Makkah → Madinah', detail: 'Haramain train economy 170–230 SAR, 2.5 ghante. VIP bus 100–150 SAR, 5–6 ghante. Private SUV 900 SAR door-to-door.' },
  { title: 'Madinah → Jeddah (wapas)', detail: 'Train/bus se wapas aayein, phir Jeddah se Lahore. Flight sham ki rakhein.' },
  { title: 'Local Transport', detail: 'Hotel shuttle free ya 50 SAR tak, Uber/Careem Makkah me 15–40 SAR per ride.' },
];

export const LEARNING_STEPS = [
  { title: '1. Ihram', detail: 'Miqat se pehle ihram pehnein, niyyat karein: Labbaik Allahumma Umrah. Bachon ka ihram bhi pehnayein.' },
  { title: '2. Tawaf', detail: 'Kaaba ke gird 7 chakkar, Hajr-e-Aswad se shuru. Bachon ko stroller ya god me lein, rush me aaram se chalein.' },
  { title: '3. Sai', detail: 'Safa aur Marwah ke darmiyan 7 dafa. Ye walking hai, bachon ke liye breaks lein, paani saath rakhein.' },
  { title: '4. Tahallul (Halq/Qasr)', detail: 'Mard sar mundwayein, aurat baal ka chota hissa kaatein. Iske baad Umrah mukammal.' },
  { title: '5. Rawdah — Madinah', detail: 'Rawdah ka permit Nusuk app se book karein. Slots jaldi bhar jate hain, Madinah pohanchte hi book karein.' },
  { title: '6. Nusuk aur Documents', detail: 'Passport 6 mahine valid, photos, CNIC, meningococcal vaccine, bachon ke birth certificates saath rakhein.' },
];

export const CHECKLIST_GROUPS = [
  { title: 'Documents', items: ['Passport — 6 mahine valid', '2 photos — white background', 'CNIC / NICOP copy', 'Nikah nama (wife ke liye)', 'Bachon ke birth certificates', 'Visa print + hotel booking'] },
  { title: 'Health aur Nusuk', items: ['Meningococcal vaccine certificate', 'Nusuk app install + profile', 'Rawdah permit book karein', 'Dawaiyan + kids medicines'] },
  { title: 'Packing — Family + Kids', items: ['Ihram + comfortable kapre', 'Stroller (bachon ke liye)', 'Paani bottle, snacks, diapers', 'Charger, power bank, SIM/eSIM', 'Zamzam bottle / dates bag'] },
];
