export const CAREER_TEST_QUESTIONS = [
  {
    id: 1,
    type: "stream",
    question: {
      en: "What kind of projects do you enjoy most?",
      ms: "Apakah jenis projek yang paling anda gemari?"
    },
    options: [
      { id: "A", text: { en: "Solving complex math or science puzzles", ms: "Menyelesaikan teka-teki matematik atau sains yang kompleks" } },
      { id: "B", text: { en: "Writing stories or creating artwork", ms: "Menulis cerita atau mencipta karya seni" } },
      { id: "C", text: { en: "Building models or fixing machines", ms: "Membina model atau membaiki mesin" } },
      { id: "D", text: { en: "Planning a small business or managing funds", ms: "Merancang perniagaan kecil atau mengurus dana" } }
    ]
  },
  {
    id: 2,
    type: "stream",
    question: {
      en: "Which subject attracts you the most?",
      ms: "Subjek manakah yang paling menarik minat anda?"
    },
    options: [
      { id: "A", text: { en: "Biology, Chemistry, or Physics", ms: "Biologi, Kimia, atau Fizik" } },
      { id: "B", text: { en: "Literature, Languages, or History", ms: "Sastera, Bahasa, atau Sejarah" } },
      { id: "C", text: { en: "Design Technology or Computer Science", ms: "Reka Cipta atau Sains Komputer" } },
      { id: "D", text: { en: "Economics or Accounting", ms: "Ekonomi atau Perakaunan" } }
    ]
  },
  {
    id: 3,
    type: "stream",
    question: {
      en: "How do you prefer to spend your free time?",
      ms: "Bagaimanakah anda lebih suka menghabiskan masa lapang anda?"
    },
    options: [
      { id: "A", text: { en: "Reading about new discoveries", ms: "Membaca tentang penemuan baru" } },
      { id: "B", text: { en: "Drawing, playing music, or writing", ms: "Melukis, bermain muzik, atau menulis" } },
      { id: "C", text: { en: "DIY projects or gaming", ms: "Projek DIY atau bermain permainan video" } },
      { id: "D", text: { en: "Following market trends or organizing events", ms: "Mengikuti trend pasaran atau menganjurkan acara" } }
    ]
  },
  {
    id: 4,
    type: "personality",
    question: {
      en: "How do you feel after a long day of socializing?",
      ms: "Bagaimanakah perasaan anda selepas seharian bersosialisasi?"
    },
    options: [
      { id: "E", text: { en: "Energized and excited", ms: "Bertenaga dan teruja" } },
      { id: "I", text: { en: "Tired and needing quiet time", ms: "Penat dan memerlukan masa bersendirian" } }
    ]
  },
  {
    id: 5,
    type: "personality",
    question: {
      en: "In a group project, do you prefer to:",
      ms: "Dalam projek berkumpulan, adakah anda lebih suka untuk:"
    },
    options: [
      { id: "E", text: { en: "Lead the presentation and discussion", ms: "Mengetuai pembentangan dan perbincangan" } },
      { id: "I", text: { en: "Work on the research and details behind the scenes", ms: "Melakukan penyelidikan dan perincian di sebalik tabir" } }
    ]
  }
];

export const AVAILABLE_STREAMS = [
  {
    id: "science",
    streamName: { en: "Science Stream", ms: "Aliran Sains" },
    description: { en: "The Logic Seekers", ms: "Pencari Logik" }
  },
  {
    id: "arts",
    streamName: { en: "Arts & Humanities", ms: "Sastera & Kemanusiaan" },
    description: { en: "The Storytellers", ms: "Pencerita" }
  },
  {
    id: "tvet",
    streamName: { en: "TVET / Vocational", ms: "TVET / Vokasional" },
    description: { en: "The Makers", ms: "Pembuat" }
  },
  {
    id: "business",
    streamName: { en: "Business & Accountancy", ms: "Perniagaan & Perakaunan" },
    description: { en: "The Strategists", ms: "Ahli Strategi" }
  }
];
