export const PACKAGES = [
  { id: 'eco', name: 'Economy Umrah', price: 'PKR 285,000', duration: '14 days', hotel: '3-star • Shuttle', rating: '4.6', tag: 'CHEAPEST', detail: 'Visa, flights, hotel, transport and Ziyarat with a group guide. Shuttle hotels in Azizia.' },
  { id: 'std', name: 'Standard Umrah', price: 'PKR 345,000', duration: '14 days', hotel: '4-star • 500m', rating: '4.8', tag: 'POPULAR', detail: 'Hotel 500m from Haram, private transport option, family rooms, Nusuk help.' },
  { id: 'fam', name: 'Family Umrah', price: 'PKR 395,000', duration: '15 days', hotel: '4-star • Family Room', rating: '4.9', tag: 'BEST FOR FAMILIES', detail: 'Family rooms, stroller help, slow-paced Ziyarat and child-friendly meals.' },
  { id: 'prem', name: 'Premium Umrah', price: 'PKR 525,000', duration: '10 days', hotel: '5-star • Haram View', rating: '5.0', tag: 'PREMIUM', detail: 'Haram-view hotel, private car, personal guide and VIP transport.' },
];

export const SERVICES = [
  { id: 'visa', name: 'Visa Assistance', detail: 'Umrah visa processing, document checks and biometric guidance.', price: 'PKR 48,000–65,000 / person' },
  { id: 'flight', name: 'Flight Booking', detail: 'Flights from Lahore, Karachi and Islamabad to Jeddah / Madinah, group fares.', price: 'Airline rates apply' },
  { id: 'hotel', name: 'Hotel Booking', detail: 'Hotels near Haram in Makkah and Madinah, budget to premium.', price: '80–600 SAR / night' },
  { id: 'transport', name: 'Transport', detail: 'Jeddah Airport to Makkah car, Haramain train, Makkah to Madinah bus / SUV.', price: '300–900 SAR' },
  { id: 'guide', name: 'Personal Guide', detail: 'English / Urdu speaking guide with live Umrah step guidance.', price: 'Per day / group' },
  { id: 'ziyarat', name: 'Ziyarat Tours', detail: 'Makkah: Jabal al-Noor, Mina, Arafat. Madinah: Quba, Uhud, Qiblatain.', price: 'Group tour rates' },
];

export const DUAS = [
  { id: 'travel', cat: 'Travel', title: 'Dua for Travel', arabic: 'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ', translit: 'Subhanallazi sakhkhara lana haza wa ma kunna lahu muqrineen', meaning: 'Glory to Him who has subjected this to us, and we could never have it by our own efforts.' },
  { id: 'ihram', cat: 'Ihram', title: 'Intention for Ihram', arabic: 'لَبَّيْكَ اللَّهُمَّ عُمْرَةً', translit: 'Labbaik Allahumma Umrah', meaning: 'Here I am, O Allah, for Umrah.' },
  { id: 'talbiyah', cat: 'Talbiyah', title: 'Talbiyah', arabic: 'لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ', translit: 'Labbaik Allahumma Labbaik, Labbaik la shareeka laka Labbaik', meaning: 'Here I am, O Allah, here I am. You have no partner, here I am.' },
  { id: 'tawaf', cat: 'Tawaf', title: 'During Tawaf', arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ', translit: 'Rabbana atina fid-dunya hasanah, wa fil-akhirati hasanah, wa qina azab-an-nar', meaning: 'Our Lord, give us good in this world and good in the Hereafter, and protect us from the punishment of the Fire.' },
  { id: 'sai', cat: "Sa'i", title: 'At Safa and Marwah', arabic: 'إِنَّ الصَّفَا وَالْمَرْوَةَ مِنْ شَعَائِرِ اللَّهِ', translit: 'Innas-Safa wal-Marwata min shaa irillah', meaning: 'Indeed, Safa and Marwah are among the symbols of Allah.' },
  { id: 'rawdah', cat: 'Rawdah', title: 'Greeting at Rawdah', arabic: 'السَّلَامُ عَلَيْكَ يَا رَسُولَ اللَّهِ', translit: 'Assalamu alaika Ya Rasool Allah', meaning: 'Peace be upon you, O Messenger of Allah.' },
];

export const GUIDE_STEPS = [
  { id: 'ihram', title: '1. Ihram', location: 'Before Miqat', detail: 'Take a bath, wear Ihram, make intention and start Talbiyah.', checks: ['Bath / wudu done', 'Ihram worn', 'Intention made', 'Talbiyah started'] },
  { id: 'tawaf', title: '2. Tawaf', location: 'Masjid al-Haram', detail: 'Seven circuits around the Kaaba, starting at Hajr al-Aswad, with duas.', checks: ['7 circuits complete', '2 rakahs at Maqam Ibrahim', 'Drank Zamzam'] },
  { id: 'sai', title: "3. Sa'i", location: 'Safa – Marwah', detail: 'Walk between Safa and Marwah seven times, starting at Safa.', checks: ['Started at Safa', '7 rounds complete', 'Duas recited'] },
  { id: 'halq', title: '4. Halq / Taqsir', location: 'Makkah', detail: 'Men shave or trim hair, women trim a small portion. Umrah is complete.', checks: ['Hair cut done', 'Ihram removed'] },
  { id: 'madinah', title: '5. Madinah', location: "Masjid an-Nabawi", detail: 'Rawdah permit via Nusuk, send Salam, visit Quba and Uhud.', checks: ['Nusuk permit booked', 'Rawdah visit', 'Quba Masjid'] },
];

export const SATHI_GROUPS = [
  { id: 'g1', from: 'Lahore', date: '19 Nov 2026', size: '4 / 8 members', lang: 'Urdu', type: 'Family Group', organizer: 'Ahmed R.', note: 'Family group, slow pace, suitable for children.' },
  { id: 'g2', from: 'Karachi', date: '6 Dec 2026', size: '6 / 10 members', lang: 'Urdu / English', type: 'Budget Group', organizer: 'Fatima S.', note: 'Budget package, Azizia hotel, group transport.' },
  { id: 'g3', from: 'Islamabad', date: '12 Dec 2026', size: '3 / 6 members', lang: 'Urdu', type: 'First-Time Group', organizer: 'Bilal K.', note: 'First-time pilgrims, with a guide.' },
  { id: 'g4', from: 'Lahore', date: '28 Nov 2026', size: '5 / 12 members', lang: 'English', type: 'Youth Group', organizer: 'Usman T.', note: 'Young travellers, Haramain train journey.' },
];

export const PLACES_V2 = [
  { id: 'kaaba', name: 'Kaaba — Masjid al-Haram', city: 'Makkah', type: 'Masjid', price: '—', distance: 'Centre', detail: 'The centre of Tawaf and Umrah. Crowds are lower after Fajr.', x: 50, y: 38, h: 90 },
  { id: 'safa', name: 'Safa – Marwah', city: 'Makkah', type: 'Ziyarat', price: '—', distance: 'Inside Haram', detail: "Sa'i is performed here, seven times between Safa and Marwah.", x: 68, y: 52, h: 40 },
  { id: 'wahat', name: 'Wahat Al Misk', city: 'Makkah', type: 'Hotel', price: '80 SAR / night', distance: 'Shuttle to Haram', detail: 'Budget hotel with shuttle service and clean simple rooms.', x: 22, y: 62, h: 55 },
  { id: 'makarem', name: 'Makarem Mina', city: 'Makkah', type: 'Hotel', price: '86 SAR / night', distance: 'Shuttle to Haram', detail: 'Popular with groups, basic rooms.', x: 78, y: 68, h: 60 },
  { id: 'jeddah', name: 'Jeddah Airport (JED)', city: 'Makkah', type: 'Airport', price: 'Makkah car 300 SAR', distance: 'Makkah ~75 min', detail: 'King Abdulaziz Airport, the main airport for Makkah.', x: 12, y: 22, h: 35 },
  { id: 'nabawi', name: "Masjid an-Nabawi", city: 'Madinah', type: 'Masjid', price: '—', distance: 'Centre', detail: 'Rawdah requires a Nusuk permit — book early.', x: 50, y: 38, h: 95 },
  { id: 'quba', name: 'Masjid Quba', city: 'Madinah', type: 'Ziyarat', price: '—', distance: '~5 km from Masjid', detail: 'The first mosque in Islam. Praying two rakahs here has great reward.', x: 70, y: 60, h: 45 },
  { id: 'uhud', name: 'Mount Uhud', city: 'Madinah', type: 'Ziyarat', price: '—', distance: '~5 km from Masjid', detail: 'Site of the Battle of Uhud and the martyrs.', x: 26, y: 58, h: 30 },
  { id: 'madhotel', name: 'Madinah Budget Hotels', city: 'Madinah', type: 'Hotel', price: '$30–$60 / night', distance: '1–2 km from Masjid', detail: 'Budget hotels, easy by taxi or shuttle.', x: 76, y: 70, h: 58 },
  { id: 'medair', name: 'Madinah Airport (MED)', city: 'Madinah', type: 'Airport', price: 'City taxi 100–150 SAR', distance: '~20 min from Masjid', detail: 'Prince Mohammad Airport, Madinah airport.', x: 12, y: 22, h: 35 },
];

export const PRAYER_TIMES = {
  Makkah: { Fajr: '05:12', Sunrise: '06:35', Dhuhr: '12:18', Asr: '15:38', Maghrib: '17:52', Isha: '19:22' },
  Madinah: { Fajr: '05:15', Sunrise: '06:38', Dhuhr: '12:20', Asr: '15:40', Maghrib: '17:54', Isha: '19:24' },
  Jeddah: { Fajr: '05:14', Sunrise: '06:37', Dhuhr: '12:19', Asr: '15:39', Maghrib: '17:53', Isha: '19:23' },
};

export const ZIYARAT = [
  { name: 'Jabal al-Noor (Hira Cave)', city: 'Makkah', detail: 'Mountain where the first revelation was received. Steep climb, go early morning.', best: 'Early morning' },
  { name: 'Mina, Arafat & Muzdalifah', city: 'Makkah', detail: 'Hajj sites, also visited for learning and reflection during Umrah trips.', best: 'Day tour' },
  { name: 'Masjid Quba', city: 'Madinah', detail: 'First mosque in Islam. Pray two rakahs after wudu.', best: 'Morning' },
  { name: 'Mount Uhud', city: 'Madinah', detail: 'Battle site and martyrs. Respectful visit, follow guide instructions.', best: 'Morning' },
  { name: 'Masjid Qiblatain', city: 'Madinah', detail: 'Mosque of the Two Qiblas, where the Qibla direction changed.', best: 'Afternoon' },
  { name: 'Jannat al-Baqi', city: 'Madinah', detail: 'Historic cemetery near Masjid an-Nabawi. Visit with respect and follow local rules.', best: 'After Fajr' },
];

export const GROUP_MEMBERS_DEMO = [
  { id: 'm1', name: 'Ahmed R. (You)', status: 'Sharing', distance: 'You', lastSeen: 'Now', x: 50, y: 42, color: '#0B3D2E' },
  { id: 'm2', name: 'Fatima S.', status: 'Sharing', distance: '180 m away', lastSeen: '2 min ago', x: 62, y: 55, color: '#C9A227' },
  { id: 'm3', name: 'Bilal K.', status: 'Sharing', distance: '420 m away', lastSeen: '5 min ago', x: 32, y: 60, color: '#146B4D' },
  { id: 'm4', name: 'Ayesha M.', status: 'Paused', distance: 'Last seen 1 h ago', lastSeen: '1 h ago', x: 74, y: 38, color: '#6B7A72' },
];
