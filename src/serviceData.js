export const PACKAGES = [
  { id: 'eco', name: 'Economy Umrah', price: 'PKR 2,85,000', duration: '14 din', hotel: '3-star • Shuttle', rating: '4.6', tag: 'SAB SE SASTA', detail: 'Visa + flight + hotel + transport + ziyarat. Azizia shuttle hotels, group guide ke saath.' },
  { id: 'std', name: 'Standard Umrah', price: 'PKR 3,45,000', duration: '14 din', hotel: '4-star • 500m', rating: '4.8', tag: 'POPULAR', detail: 'Haram se 500m hotel, private transport option, family rooms, Nusuk help.' },
  { id: 'fam', name: 'Family Umrah', price: 'PKR 3,95,000', duration: '15 din', hotel: '4-star • Family Room', rating: '4.9', tag: 'FAMILY BEST', detail: 'Bachon ke saath family: family room, stroller help, slow-paced ziyarat, kids meals.' },
  { id: 'prem', name: 'Premium Umrah', price: 'PKR 5,25,000', duration: '10 din', hotel: '5-star • Haram View', rating: '5.0', tag: 'PREMIUM', detail: 'Haram view hotel, private car, personal guide, VIP transport.' },
];

export const SERVICES = [
  { id: 'visa', name: 'Visa Assistance', detail: 'Umrah visa processing, documents check, biometric guidance.', price: 'PKR 48,000–65,000 / person' },
  { id: 'flight', name: 'Flights Booking', detail: 'Lahore, Karachi, Islamabad se Jeddah / Madinah flights, group fares.', price: 'Airline rate par' },
  { id: 'hotel', name: 'Hotel Booking', detail: 'Makkah aur Madinah me Haram ke qareeb aur budget hotels.', price: '80–600 SAR / night' },
  { id: 'transport', name: 'Transport', detail: 'Jeddah airport → Makkah car, Haramain train, Makkah → Madinah bus/SUV.', price: '300–900 SAR' },
  { id: 'guide', name: 'Personal Guide', detail: 'Urdu / Roman Urdu speaking guide, Umrah steps live guidance.', price: 'Per day / group' },
  { id: 'ziyarat', name: 'Ziyarat Tours', detail: 'Makkah: Jabal-e-Noor, Mina, Arafat. Madinah: Quba, Uhud, Qiblatain.', price: 'Group tour rate' },
];

export const DUAS = [
  { id: 'travel', cat: 'Safar', title: 'Safar ki Dua', arabic: 'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ', translit: 'Subhanallazi sakhkhara lana haza wa ma kunna lahu muqrineen', meaning: 'Paak hai wo zaat jisne is sawari ko hamare liye musakhkhar kiya, hum is par qaadir na the.' },
  { id: 'ihram', cat: 'Ihram', title: 'Ihram ki Niyyat', arabic: 'لَبَّيْكَ اللَّهُمَّ عُمْرَةً', translit: 'Labbaik Allahumma Umrah', meaning: 'Main hazir hun, Ya Allah, Umrah ke liye.' },
  { id: 'talbiyah', cat: 'Talbiyah', title: 'Talbiyah', arabic: 'لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ', translit: 'Labbaik Allahumma Labbaik, Labbaik la shareeka laka Labbaik', meaning: 'Main hazir hun, Ya Allah, main hazir hun, tera koi shareek nahi, main hazir hun.' },
  { id: 'tawaf', cat: 'Tawaf', title: 'Tawaf ke doran', arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ', translit: 'Rabbana atina fid-dunya hasanah, wa fil-akhirati hasanah, wa qina azab-an-nar', meaning: 'Ae hamare Rab, hamein duniya me bhi bhalai de, aakhirat me bhi bhalai de, aur hamein aag ke azab se bacha.' },
  { id: 'sai', cat: "Sai", title: "Safa–Marwah par", arabic: 'إِنَّ الصَّفَا وَالْمَرْوَةَ مِنْ شَعَائِرِ اللَّهِ', translit: 'Innas-Safa wal-Marwata min shaa irillah', meaning: 'Beshak Safa aur Marwah Allah ki nishaniyon me se hain.' },
  { id: 'rawdah', cat: 'Rawdah', title: 'Rawdah me Salam', arabic: 'السَّلَامُ عَلَيْكَ يَا رَسُولَ اللَّهِ', translit: 'Assalamu alaika Ya Rasool Allah', meaning: 'Aap par salam ho, Ae Allah ke Rasool.' },
];

export const GUIDE_STEPS = [
  { id: 'ihram', title: '1. Ihram', location: 'Miqat se pehle', detail: 'Ghusl, ihram pehnein, niyyat aur Talbiyah shuru karein.', checks: ['Ghusl / wuzu', 'Ihram pehna', 'Niyyat ki', 'Talbiyah shuru'] },
  { id: 'tawaf', title: '2. Tawaf', location: 'Masjid al-Haram', detail: 'Kaaba ke gird 7 chakkar, Hajr-e-Aswad se shuru, duaen parhte hue.', checks: ['7 chakkar poore', '2 rakat Maqam-e-Ibrahim par', 'Zamzam piya'] },
  { id: 'sai', title: "3. Sai", location: 'Safa – Marwah', detail: 'Safa se shuru, Marwah par khatam, kul 7 dafa.', checks: ['Safa se shuru', '7 dafa poore', 'Duaen parhi'] },
  { id: 'halq', title: '4. Halq / Qasr', location: 'Makkah', detail: 'Mard sar mundwayein, aurat baal ka hissa kaatein. Umrah mukammal.', checks: ['Halq / Qasr hua', 'Ihram khola'] },
  { id: 'madinah', title: '5. Madinah', location: 'Masjid an-Nabawi', detail: 'Rawdah permit (Nusuk), Salam, Quba aur Uhud ziyarat.', checks: ['Nusuk permit', 'Rawdah ziyarat', 'Quba Masjid'] },
];

export const SATHI_GROUPS = [
  { id: 'g1', from: 'Lahore', date: '19 Nov 2026', size: '4 / 8 members', lang: 'Urdu', type: 'Family Group', organizer: 'Ahmed R.', note: 'Family ke saath, slow pace, bachon ke liye suitable.' },
  { id: 'g2', from: 'Karachi', date: '6 Dec 2026', size: '6 / 10 members', lang: 'Urdu / English', type: 'Budget Group', organizer: 'Fatima S.', note: 'Budget package, Azizia hotel, group transport.' },
  { id: 'g3', from: 'Islamabad', date: '12 Dec 2026', size: '3 / 6 members', lang: 'Urdu', type: 'First-Time Group', organizer: 'Bilal K.', note: 'Pehli dafa Umrah ja rahe log, guide ke saath.' },
  { id: 'g4', from: 'Lahore', date: '28 Nov 2026', size: '5 / 12 members', lang: 'English', type: 'Youth Group', organizer: 'Usman T.', note: 'Young travellers, Haramain train se safar.' },
];

export const PLACES_V2 = [
  { id: 'kaaba', name: 'Kaaba — Masjid al-Haram', city: 'Makkah', type: 'Masjid', price: '—', distance: 'Centre', detail: 'Tawaf aur Umrah ka markaz. Subah Fajr ke baad rush kam hota hai.', x: 50, y: 38, h: 90 },
  { id: 'safa', name: 'Safa – Marwah', city: 'Makkah', type: 'Ziyarat', price: '—', distance: 'Haram ke andar', detail: 'Sai yahin hoti hai, 7 dafa Safa se Marwah tak.', x: 68, y: 52, h: 40 },
  { id: 'wahat', name: 'Wahat Al Misk', city: 'Makkah', type: 'Hotel', price: '80 SAR / night', distance: 'Shuttle se Haram', detail: 'Budget hotel, shuttle service, simple clean rooms.', x: 22, y: 62, h: 55 },
  { id: 'makarem', name: 'Makarem Mina', city: 'Makkah', type: 'Hotel', price: '86 SAR / night', distance: 'Shuttle se Haram', detail: 'Group travellers me mashhoor, basic rooms.', x: 78, y: 68, h: 60 },
  { id: 'jeddah', name: 'Jeddah Airport (JED)', city: 'Makkah', type: 'Airport', price: 'Makkah car 300 SAR', distance: 'Makkah se ~75 min', detail: 'King Abdulaziz Airport, Makkah ka main airport.', x: 12, y: 22, h: 35 },
  { id: 'nabawi', name: 'Masjid an-Nabawi', city: 'Madinah', type: 'Masjid', price: '—', distance: 'Centre', detail: 'Rawdah ke liye Nusuk permit zaroori, jaldi book karein.', x: 50, y: 38, h: 95 },
  { id: 'quba', name: 'Masjid Quba', city: 'Madinah', type: 'Ziyarat', price: '—', distance: 'Masjid se ~5 km', detail: 'Islam ki pehli masjid, wuzu karke 2 rakat ka sawab.', x: 70, y: 60, h: 45 },
  { id: 'uhud', name: 'Uhud', city: 'Madinah', type: 'Ziyarat', price: '—', distance: 'Masjid se ~5 km', detail: 'Uhud ki jang ka maidan, shuhada ki qabr.', x: 26, y: 58, h: 30 },
  { id: 'madhotel', name: 'Madinah Budget Hotels', city: 'Madinah', type: 'Hotel', price: '$30–$60 / night', distance: 'Masjid se 1–2 km', detail: 'Budget hotels, taxi/shuttle se Masjid easy.', x: 76, y: 70, h: 58 },
  { id: 'medair', name: 'Madinah Airport (MED)', city: 'Madinah', type: 'Airport', price: 'City taxi 100–150 SAR', distance: 'Masjid se ~20 min', detail: 'Prince Mohammad Airport, Madinah ka airport.', x: 12, y: 22, h: 35 },
];
