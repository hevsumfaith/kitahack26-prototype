export const CAREER_TEST_QUESTIONS = [
  // SECTION 1: STREAM PREFERENCES (40 Questions) - A: Science, B: Arts, C: TVET, D: Business
  {
    id: 1,
    type: "stream",
    section: "Interests",
    question: { en: "What kind of projects do you enjoy most?", ms: "Apakah jenis projek yang paling anda gemari?" },
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
    section: "Interests",
    question: { en: "Which subject attracts you the most?", ms: "Subjek manakah yang paling menarik minat anda?" },
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
    section: "Interests",
    question: { en: "How do you prefer to spend your free time?", ms: "Bagaimanakah anda lebih suka menghabiskan masa lapang anda?" },
    options: [
      { id: "A", text: { en: "Reading about new scientific discoveries", ms: "Membaca tentang penemuan saintifik baru" } },
      { id: "B", text: { en: "Drawing, playing music, or writing", ms: "Melukis, bermain muzik, atau menulis" } },
      { id: "C", text: { en: "DIY projects or gaming", ms: "Projek DIY atau bermain permainan video" } },
      { id: "D", text: { en: "Following market trends or organizing events", ms: "Mengikuti trend pasaran atau menganjurkan acara" } }
    ]
  },
  {
    id: 4,
    type: "stream",
    section: "Interests",
    question: { en: "In a museum, which section would you visit first?", ms: "Di muzium, bahagian manakah yang akan anda lawati dahulu?" },
    options: [
      { id: "A", text: { en: "Natural History and Evolution", ms: "Sejarah Alam Semulajadi dan Evolusi" } },
      { id: "B", text: { en: "Fine Arts and Literature", ms: "Seni Halus dan Sastera" } },
      { id: "C", text: { en: "Technological Innovations", ms: "Inovasi Teknologi" } },
      { id: "D", text: { en: "Economic History and Trade", ms: "Sejarah Ekonomi dan Perdagangan" } }
    ]
  },
  {
    id: 5,
    type: "stream",
    section: "Interests",
    question: { en: "Which of these documentaries sounds most interesting?", ms: "Dokumentari manakah yang kedengaran paling menarik?" },
    options: [
      { id: "A", text: { en: "The Secrets of the Universe", ms: "Rahsia Alam Semesta" } },
      { id: "B", text: { en: "The Life of Great Poets", ms: "Kehidupan Penyair Agung" } },
      { id: "C", text: { en: "How Engines Work", ms: "Bagaimana Enjin Berfungsi" } },
      { id: "D", text: { en: "The Rise of Global Markets", ms: "Kebangkitan Pasaran Global" } }
    ]
  },
  {
    id: 6,
    type: "stream",
    section: "Skills",
    question: { en: "What is your strongest natural skill?", ms: "Apakah kemahiran semulajadi terkuat anda?" },
    options: [
      { id: "A", text: { en: "Logical reasoning and data analysis", ms: "Penaakulan logik dan analisis data" } },
      { id: "B", text: { en: "Creative expression and storytelling", ms: "Ekspresi kreatif dan penceritaan" } },
      { id: "C", text: { en: "Hands-on assembly and repair", ms: "Pemasangan dan pembaikan praktikal" } },
      { id: "D", text: { en: "Financial planning and networking", ms: "Perancangan kewangan dan rangkaian" } }
    ]
  },
  {
    id: 7,
    type: "stream",
    section: "Skills",
    question: { en: "When solving a problem, do you usually:", ms: "Apabila menyelesaikan masalah, adakah anda biasanya:" },
    options: [
      { id: "A", text: { en: "Use a systematic, scientific method", ms: "Menggunakan kaedah saintifik yang sistematik" } },
      { id: "B", text: { en: "Think outside the box creatively", ms: "Berfikir di luar kotak secara kreatif" } },
      { id: "C", text: { en: "Try to fix it physically with tools", ms: "Cuba membaikinya secara fizikal dengan alatan" } },
      { id: "D", text: { en: "Look for a cost-effective strategy", ms: "Mencari strategi yang kos efektif" } }
    ]
  },
  {
    id: 8,
    type: "stream",
    section: "Skills",
    question: { en: "Which of these apps would you rather build?", ms: "Antara aplikasi ini, yang manakah anda lebih suka bina?" },
    options: [
      { id: "A", text: { en: "A medical diagnosis tool", ms: "Alat diagnosis perubatan" } },
      { id: "B", text: { en: "A digital art gallery", ms: "Galeri seni digital" } },
      { id: "C", text: { en: "An automated home controller", ms: "Pengawal rumah automatik" } },
      { id: "D", text: { en: "A stock market tracker", ms: "Penjejak pasaran saham" } }
    ]
  },
  {
    id: 9,
    type: "stream",
    section: "Skills",
    question: { en: "You find a broken electronic toy. You:", ms: "Anda menjumpai mainan elektronik yang rosak. Anda:" },
    options: [
      { id: "A", text: { en: "Analyze why the circuit failed", ms: "Menganalisis mengapa litar itu gagal" } },
      { id: "B", text: { en: "Reimagine it as a piece of art", ms: "Membayangkannya semula sebagai sebuah karya seni" } },
      { id: "C", text: { en: "Open it up to fix the wiring", ms: "Membukanya untuk membaiki pendawaian" } },
      { id: "D", text: { en: "Think about how to sell the parts", ms: "Berfikir tentang bagaimana untuk menjual alat gantinya" } }
    ]
  },
  {
    id: 10,
    type: "stream",
    section: "Skills",
    question: { en: "In school, you were best at:", ms: "Di sekolah, anda paling mahir dalam:" },
    options: [
      { id: "A", text: { en: "Lab experiments", ms: "Eksperimen makmal" } },
      { id: "B", text: { en: "Essay writing", ms: "Penulisan esei" } },
      { id: "C", text: { en: "Workshop tasks", ms: "Tugasan bengkel" } },
      { id: "D", text: { en: "Class treasury/maths", ms: "Bendahari kelas/matematik" } }
    ]
  },
  {
    id: 11,
    type: "stream",
    section: "Work Style",
    question: { en: "What is your ideal work environment?", ms: "Apakah persekitaran kerja ideal anda?" },
    options: [
      { id: "A", text: { en: "A quiet laboratory or research center", ms: "Makmal atau pusat penyelidikan yang tenang" } },
      { id: "B", text: { en: "A creative studio or theater", ms: "Studio kreatif atau teater" } },
      { id: "C", text: { en: "A busy workshop or flight deck", ms: "Bengkel yang sibuk atau dek penerbangan" } },
      { id: "D", text: { en: "A corporate office or stock exchange", ms: "Pejabat korporat atau bursa saham" } }
    ]
  },
  {
    id: 12,
    type: "stream",
    section: "Work Style",
    question: { en: "Which of these tasks feels most satisfying?", ms: "Tugasan manakah yang terasa paling memuaskan?" },
    options: [
      { id: "A", text: { en: "Proving a mathematical theorem", ms: "Membuktikan teorem matematik" } },
      { id: "B", text: { en: "Finishing a poem or painting", ms: "Menyiapkan puisi atau lukisan" } },
      { id: "C", text: { en: "Restoring a vintage motorcycle", ms: "Memulihkan motosikal vintaj" } },
      { id: "D", text: { en: "Closing a profitable sales deal", ms: "Menutup perjanjian jualan yang menguntungkan" } }
    ]
  },
  {
    id: 13,
    type: "stream",
    section: "Work Style",
    question: { en: "How do you organize your tasks?", ms: "Bagaimanakah anda menyusun tugasan anda?" },
    options: [
      { id: "A", text: { en: "Flowcharts and data sets", ms: "Carta aliran dan set data" } },
      { id: "B", text: { en: "Mood boards and sketches", ms: "Papan mood dan lakaran" } },
      { id: "C", text: { en: "Practical checklists and tools", ms: "Senarai semak praktikal dan alatan" } },
      { id: "D", text: { en: "Budget sheets and calendars", ms: "Helaian bajet dan kalendar" } }
    ]
  },
  {
    id: 14,
    type: "stream",
    section: "Social Context",
    question: { en: "In a team, what role do you naturally take?", ms: "Dalam kumpulan, peranan apakah yang anda ambil secara semulajadi?" },
    options: [
      { id: "A", text: { en: "The logical analyst", ms: "Penganalisis logik" } },
      { id: "B", text: { en: "The creative visionary", ms: "Wawasan kreatif" } },
      { id: "C", text: { en: "The practical builder", ms: "Pembina praktikal" } },
      { id: "D", text: { en: "The strategic negotiator", ms: "Perunding strategik" } }
    ]
  },
  {
    id: 15,
    type: "stream",
    section: "Social Context",
    question: { en: "If you won the lottery, you would:", ms: "Jika anda memenangi loteri, anda akan:" },
    options: [
      { id: "A", text: { en: "Fund a research project", ms: "Membiayai projek penyelidikan" } },
      { id: "B", text: { en: "Travel for cultural inspiration", ms: "Melancong untuk inspirasi budaya" } },
      { id: "C", text: { en: "Build your own custom lab/garage", ms: "Membina makmal/garaj tersuai anda sendiri" } },
      { id: "D", text: { en: "Invest in a startup business", ms: "Melabur dalam perniagaan permulaan" } }
    ]
  },
  {
    id: 16,
    type: "stream",
    section: "Technology",
    question: { en: "Which tech advancement excites you most?", ms: "Kemajuan teknologi manakah yang paling mengujakan anda?" },
    options: [
      { id: "A", text: { en: "Gene editing (CRISPR)", ms: "Penyuntingan gen (CRISPR)" } },
      { id: "B", text: { en: "Virtual Reality storytelling", ms: "Penceritaan Realiti Maya" } },
      { id: "C", text: { en: "Electric vehicle engineering", ms: "Kejuruteraan kenderaan elektrik" } },
      { id: "D", text: { en: "Cryptocurrency and Fintech", ms: "Mata wang kripto dan Fintech" } }
    ]
  },
  {
    id: 17,
    type: "stream",
    section: "Technology",
    question: { en: "If you were a YouTuber, what content would you make?", ms: "Jika anda seorang YouTuber, kandungan apakah yang akan anda buat?" },
    options: [
      { id: "A", text: { en: "Science experiments and explainers", ms: "Eksperimen sains dan penjelasan" } },
      { id: "B", text: { en: "Short films and animation", ms: "Filem pendek dan animasi" } },
      { id: "C", text: { en: "Hardware tearing and tech repair", ms: "Pembaikan perkakasan dan teknologi" } },
      { id: "D", text: { en: "Business tips and financial news", ms: "Tip perniagaan dan berita kewangan" } }
    ]
  },
  {
    id: 18,
    type: "stream",
    section: "Ambition",
    question: { en: "Your dream legacy is to be known as:", ms: "Warisan impian anda adalah untuk dikenali sebagai:" },
    options: [
      { id: "A", text: { en: "A discoverer of truth", ms: "Seorang penemu kebenaran" } },
      { id: "B", text: { en: "An influential artist/writer", ms: "Artis/penulis yang berpengaruh" } },
      { id: "C", text: { en: "A master of a craft", ms: "Seorang pakar pertukangan" } },
      { id: "D", text: { en: "A successful business leader", ms: "Seorang pemimpin perniagaan yang berjaya" } }
    ]
  },
  {
    id: 19,
    type: "stream",
    section: "Ambition",
    question: { en: "Which magazine cover would you rather be on?", ms: "Kulit majalah manakah yang anda lebih suka sertai?" },
    options: [
      { id: "A", text: { en: "Scientific American", ms: "Scientific American" } },
      { id: "B", text: { en: "Vogue or National Geographic", ms: "Vogue atau National Geographic" } },
      { id: "C", text: { en: "Popular Mechanics", ms: "Popular Mechanics" } },
      { id: "D", text: { en: "Forbes or Fortune", ms: "Forbes atau Fortune" } }
    ]
  },
  {
    id: 20,
    type: "stream",
    section: "Values",
    question: { en: "What do you value most in a project?", ms: "Apakah yang paling anda hargai dalam sebuah projek?" },
    options: [
      { id: "A", text: { en: "Accuracy and validity", ms: "Ketepatan dan kesahihan" } },
      { id: "B", text: { en: "Meaning and impact", ms: "Makna dan impak" } },
      { id: "C", text: { en: "Efficiency and functionality", ms: "Kecekapan dan kefungsian" } },
      { id: "D", text: { en: "Profitability and scale", ms: "Keuntungan dan skala" } }
    ]
  },
  // Adding questions 21-40 with similar logic
  {
    id: 21,
    type: "stream",
    section: "Problem Solving",
    question: { en: "When a gadget stops working, you:", ms: "Apabila gajet berhenti berfungsi, anda:" },
    options: [
      { id: "A", text: { en: "Check the manual for the theory", ms: "Semak manual untuk teorinya" } },
      { id: "B", text: { en: "Imagine how it should ideally work", ms: "Bayangkan bagaimana ia sepatutnya berfungsi" } },
      { id: "C", text: { en: "Start taking it apart immediately", ms: "Mula membukanya dengan segera" } },
      { id: "D", text: { en: "Check if it's still under warranty", ms: "Semak jika ia masih dalam jaminan" } }
    ]
  },
  {
    id: 22,
    type: "stream",
    section: "Problem Solving",
    question: { en: "Which game sounds most fun?", ms: "Permainan manakah yang kedengaran paling menyeronokkan?" },
    options: [
      { id: "A", text: { en: "Sudoku or Chess", ms: "Sudoku atau Catur" } },
      { id: "B", text: { en: "Pictionary or Storytelling", ms: "Pictionary atau Penceritaan" } },
      { id: "C", text: { en: "Minecraft or LEGO building", ms: "Minecraft atau binaan LEGO" } },
      { id: "D", text: { en: "Monopoly or SimCity", ms: "Monopoly atau SimCity" } }
    ]
  },
  {
    id: 23,
    type: "stream",
    section: "Environment",
    question: { en: "You enjoy working with:", ms: "Anda suka bekerja dengan:" },
    options: [
      { id: "A", text: { en: "Microscopes and test tubes", ms: "Mikroskop dan tabung uji" } },
      { id: "B", text: { en: "Paintbrushes and manuscripts", ms: "Berus cat dan manuskrip" } },
      { id: "C", text: { en: "Soldering irons and wrenches", ms: "Besi pematerian dan sepana" } },
      { id: "D", text: { en: "Spreadsheets and contracts", ms: "Hamparan data dan kontrak" } }
    ]
  },
  {
    id: 24,
    type: "stream",
    section: "Environment",
    question: { en: "A perfect day at school includes:", ms: "Hari yang sempurna di sekolah termasuk:" },
    options: [
      { id: "A", text: { en: "A successful lab result", ms: "Keputusan makmal yang berjaya" } },
      { id: "B", text: { en: "Performing on stage", ms: "Membuat persembahan di pentas" } },
      { id: "C", text: { en: "Finishing a woodwork project", ms: "Menyiapkan projek pertukangan kayu" } },
      { id: "D", text: { en: "Winning a debate about economics", ms: "Memenangi debat tentang ekonomi" } }
    ]
  },
  {
    id: 25,
    type: "stream",
    section: "Scenarios",
    question: { en: "You are tasked to improve a park. You:", ms: "Anda ditugaskan untuk menambah baik taman. Anda:" },
    options: [
      { id: "A", text: { en: "Study the soil and plant species", ms: "Kaji spesies tanah dan tumbuhan" } },
      { id: "B", text: { en: "Design beautiful sculptures", ms: "Reka bentuk arca yang indah" } },
      { id: "C", text: { en: "Build better benches and paths", ms: "Bina bangku dan laluan yang lebih baik" } },
      { id: "D", text: { en: "Plan a cafe to generate income", ms: "Rancang kafe untuk menjana pendapatan" } }
    ]
  },
  {
    id: 26,
    type: "stream",
    section: "Scenarios",
    question: { en: "Which extra class would you join?", ms: "Kelas tambahan manakah yang akan anda sertai?" },
    options: [
      { id: "A", text: { en: "Advanced Calculus", ms: "Kalkulus Lanjutan" } },
      { id: "B", text: { en: "Modern Dance or Theater", ms: "Tarian Moden atau Teater" } },
      { id: "C", text: { en: "Robotics and Arduino", ms: "Robotik dan Arduino" } },
      { id: "D", text: { en: "Digital Marketing", ms: "Pemasaran Digital" } }
    ]
  },
  {
    id: 27,
    type: "stream",
    section: "Interests",
    question: { en: "Which book title appeals to you most?", ms: "Tajuk buku manakah yang paling menarik bagi anda?" },
    options: [
      { id: "A", text: { en: "The Logic of Everything", ms: "Logik Segala-galanya" } },
      { id: "B", text: { en: "The Art of Storytelling", ms: "Seni Penceritaan" } },
      { id: "C", text: { en: "Mastering the Engine", ms: "Menguasai Enjin" } },
      { id: "D", text: { en: "The Wealth of Nations", ms: "The Wealth of Nations" } }
    ]
  },
  {
    id: 28,
    type: "stream",
    section: "Interests",
    question: { en: "Which career path sounds most prestigious?", ms: "Laluan kerjaya manakah yang kedengaran paling berprestij?" },
    options: [
      { id: "A", text: { en: "Neurosurgeon", ms: "Pakar Bedah Saraf" } },
      { id: "B", text: { en: "International Human Rights Lawyer", ms: "Peguam Hak Asasi Manusia Antarabangsa" } },
      { id: "C", text: { en: "Aerospace Engineer", ms: "Jurutera Aeroangkasa" } },
      { id: "D", text: { en: "CEO of a Tech Giant", ms: "CEO Gergasi Teknologi" } }
    ]
  },
  {
    id: 29,
    type: "stream",
    section: "Skills",
    question: { en: "Your natural way of explaining things is through:", ms: "Cara semulajadi anda menerangkan sesuatu adalah melalui:" },
    options: [
      { id: "A", text: { en: "Equations and formulas", ms: "Persamaan dan formula" } },
      { id: "B", text: { en: "Metaphors and analogies", ms: "Metafora dan analogi" } },
      { id: "C", text: { en: "Showing how to do it", ms: "Menunjukkan cara melakukannya" } },
      { id: "D", text: { en: "Cost-benefit charts", ms: "Carta kos-faedah" } }
    ]
  },
  {
    id: 30,
    type: "stream",
    section: "Skills",
    question: { en: "You find a complex map. You:", ms: "Anda menjumpai peta yang kompleks. Anda:" },
    options: [
      { id: "A", text: { en: "Calculate the most efficient route", ms: "Kira laluan paling cekap" } },
      { id: "B", text: { en: "Imagine the stories of the places", ms: "Bayangkan cerita tentang tempat-tempat itu" } },
      { id: "C", text: { en: "Notice the technical symbols", ms: "Perhatikan simbol teknikal" } },
      { id: "D", text: { en: "Think about the land value", ms: "Berfikir tentang nilai tanah" } }
    ]
  },
  {
    id: 31,
    type: "stream",
    section: "Daily Habits",
    question: { en: "How do you prefer to learn something new?", ms: "Bagaimanakah anda lebih suka belajar sesuatu yang baru?" },
    options: [
      { id: "A", text: { en: "Reading a dense textbook", ms: "Membaca buku teks yang padat" } },
      { id: "B", text: { en: "Watching a film or performance", ms: "Menonton filem atau persembahan" } },
      { id: "C", text: { en: "Trying it out hands-on", ms: "Mencubanya secara praktikal" } },
      { id: "D", text: { en: "Attending a workshop/seminar", ms: "Menghadiri bengkel/seminar" } }
    ]
  },
  {
    id: 32,
    type: "stream",
    section: "Daily Habits",
    question: { en: "Your room is most likely filled with:", ms: "Bilik anda kemungkinan besar dipenuhi dengan:" },
    options: [
      { id: "A", text: { en: "Science gear or star charts", ms: "Alatan sains atau carta bintang" } },
      { id: "B", text: { en: "Books, posters, and instruments", ms: "Buku, poster, dan alat muzik" } },
      { id: "C", text: { en: "Gadgets and disassembled parts", ms: "Gajet dan bahagian yang dibuka" } },
      { id: "D", text: { en: "Business books and neat planners", ms: "Buku perniagaan dan perancang yang kemas" } }
    ]
  },
  {
    id: 33,
    type: "stream",
    section: "Future Goal",
    question: { en: "What's your ultimate goal for a job?", ms: "Apakah matlamat utama anda untuk sesuatu pekerjaan?" },
    options: [
      { id: "A", text: { en: "Advancing human knowledge", ms: "Memajukan pengetahuan manusia" } },
      { id: "B", text: { en: "Influencing culture and society", ms: "Mempengaruhi budaya dan masyarakat" } },
      { id: "C", text: { en: "Creating physical or digital products", ms: "Mencipta produk fizikal atau digital" } },
      { id: "D", text: { en: "Building a financial empire", ms: "Membina empayar kewangan" } }
    ]
  },
  {
    id: 34,
    type: "stream",
    section: "Future Goal",
    question: { en: "Which historical figure do you admire most?", ms: "Tokoh sejarah manakah yang paling anda kagumi?" },
    options: [
      { id: "A", text: { en: "Albert Einstein", ms: "Albert Einstein" } },
      { id: "B", text: { en: "William Shakespeare", ms: "William Shakespeare" } },
      { id: "C", text: { en: "Nikola Tesla", ms: "Nikola Tesla" } },
      { id: "D", text: { en: "Steve Jobs or Warren Buffett", ms: "Steve Jobs atau Warren Buffett" } }
    ]
  },
  {
    id: 35,
    type: "stream",
    section: "Communication",
    question: { en: "How do you win an argument?", ms: "Bagaimanakah anda memenangi hujah?" },
    options: [
      { id: "A", text: { en: "With undeniable facts and data", ms: "Dengan fakta dan data yang tidak dapat dinafikan" } },
      { id: "B", text: { en: "With emotional appeal and stories", ms: "Dengan rayuan emosi dan cerita" } },
      { id: "C", text: { en: "By demonstrating how it works", ms: "Dengan menunjukkan cara ia berfungsi" } },
      { id: "D", text: { en: "By finding a compromise that profits both", ms: "Dengan mencari kompromi yang menguntungkan kedua-duanya" } }
    ]
  },
  {
    id: 36,
    type: "stream",
    section: "Work Preferences",
    question: { en: "Do you prefer a job that is:", ms: "Adakah anda lebih suka pekerjaan yang:" },
    options: [
      { id: "A", text: { en: "Intellectually challenging", ms: "Mencabar secara intelektual" } },
      { id: "B", text: { en: "Creatively fulfilling", ms: "Memuaskan secara kreatif" } },
      { id: "C", text: { en: "Technically demanding", ms: "Menuntut secara teknikal" } },
      { id: "D", text: { en: "Commercially competitive", ms: "Kompetitif secara komersial" } }
    ]
  },
  {
    id: 37,
    type: "stream",
    section: "Work Preferences",
    question: { en: "If you had to write a blog, it would be about:", ms: "Jika anda terpaksa menulis blog, ia adalah tentang:" },
    options: [
      { id: "A", text: { en: "Space and Physics discoveries", ms: "Penemuan Ruang Angkasa dan Fizik" } },
      { id: "B", text: { en: "Travel, art, and food reviews", ms: "Ulasan pelancongan, seni, dan makanan" } },
      { id: "C", text: { en: "Coding and DIY hardware", ms: "Pengekodan dan perkakasan DIY" } },
      { id: "D", text: { en: "Investment and passive income", ms: "Pelaburan dan pendapatan pasif" } }
    ]
  },
  {
    id: 38,
    type: "stream",
    section: "Values",
    question: { en: "Which value is most important in society?", ms: "Nilai manakah yang paling penting dalam masyarakat?" },
    options: [
      { id: "A", text: { en: "Science and Enlightenment", ms: "Sains dan Pencerahan" } },
      { id: "B", text: { en: "Freedom and Art", ms: "Kebebasan dan Seni" } },
      { id: "C", text: { en: "Skill and Innovation", ms: "Kemahiran dan Inovasi" } },
      { id: "D", text: { en: "Commerce and Stability", ms: "Perdagangan dan Kestabilan" } }
    ]
  },
  {
    id: 39,
    type: "stream",
    section: "Interest Check",
    question: { en: "Which place sounds best for an internship?", ms: "Tempat manakah yang kedengaran terbaik untuk latihan industri?" },
    options: [
      { id: "A", text: { en: "A pharmaceutical lab", ms: "Makmal farmaseutikal" } },
      { id: "B", text: { en: "A marketing and design agency", ms: "Agensi pemasaran dan reka bentuk" } },
      { id: "C", text: { en: "A car manufacturing plant", ms: "Kilang pembuatan kereta" } },
      { id: "D", text: { en: "A bank or stock exchange", ms: "Bank atau bursa saham" } }
    ]
  },
  {
    id: 40,
    type: "stream",
    section: "Final Interest",
    question: { en: "If you could change the world, you would:", ms: "Jika anda boleh mengubah dunia, anda akan:" },
    options: [
      { id: "A", text: { en: "Cure a disease", ms: "Mengubati penyakit" } },
      { id: "B", text: { en: "Write a world-changing book", ms: "Menulis buku yang mengubah dunia" } },
      { id: "C", text: { en: "Invent a sustainable energy source", ms: "Mencipta sumber tenaga lestari" } },
      { id: "D", text: { en: "Create a global business that helps millions", ms: "Mencipta perniagaan global yang membantu berjuta-juta orang" } }
    ]
  },

  // SECTION 2: PERSONALITY (20 Questions) - E: Extrovert, I: Introvert
  {
    id: 41,
    type: "personality",
    section: "Social Preference",
    question: { en: "How do you feel after a long day of socializing?", ms: "Bagaimanakah perasaan anda selepas seharian bersosialisasi?" },
    options: [
      { id: "E", text: { en: "Energized and excited", ms: "Bertenaga dan teruja" } },
      { id: "I", text: { en: "Tired and needing quiet time", ms: "Penat dan memerlukan masa bersendirian" } }
    ]
  },
  {
    id: 42,
    type: "personality",
    section: "Social Preference",
    question: { en: "In a group project, do you prefer to:", ms: "Dalam projek berkumpulan, adakah anda lebih suka untuk:" },
    options: [
      { id: "E", text: { en: "Lead the presentation and discussion", ms: "Mengetuai pembentangan dan perbincangan" } },
      { id: "I", text: { en: "Work on the research behind the scenes", ms: "Melakukan penyelidikan di sebalik tabir" } }
    ]
  },
  {
    id: 43,
    type: "personality",
    section: "Decision Making",
    question: { en: "When meeting new people, you:", ms: "Apabila bertemu orang baru, anda:" },
    options: [
      { id: "E", text: { en: "Start the conversation easily", ms: "Mulakan perbualan dengan mudah" } },
      { id: "I", text: { en: "Wait for them to approach you", ms: "Tunggu mereka mendekati anda" } }
    ]
  },
  {
    id: 44,
    type: "personality",
    section: "Work Style",
    question: { en: "Do you prefer to work in:", ms: "Adakah anda lebih suka bekerja di:" },
    options: [
      { id: "E", text: { en: "A busy office with many people", ms: "Pejabat yang sibuk dengan ramai orang" } },
      { id: "I", text: { en: "A private office or at home", ms: "Pejabat peribadi atau di rumah" } }
    ]
  },
  {
    id: 45,
    type: "personality",
    section: "Public Speaking",
    question: { en: "Giving a speech to 100 people sounds:", ms: "Memberi ucapan kepada 100 orang kedengaran:" },
    options: [
      { id: "E", text: { en: "Exciting and fun", ms: "Mengujakan dan menyeronokkan" } },
      { id: "I", text: { en: "Nerve-wracking and scary", ms: "Menakutkan dan meresahkan" } }
    ]
  },
  {
    id: 46,
    type: "personality",
    section: "Thought Process",
    question: { en: "Do you usually think out loud?", ms: "Adakah anda biasanya berfikir secara lantang?" },
    options: [
      { id: "E", text: { en: "Yes, I process thoughts by talking", ms: "Ya, saya memproses pemikiran dengan bercakap" } },
      { id: "I", text: { en: "No, I reflect internally first", ms: "Tidak, saya berfikir secara mendalam dahulu" } }
    ]
  },
  {
    id: 47,
    type: "personality",
    section: "Attention",
    question: { en: "Being the center of attention makes you:", ms: "Menjadi pusat perhatian membuatkan anda:" },
    options: [
      { id: "E", text: { en: "Feel comfortable and noticed", ms: "Berasa selesa dan diperhatikan" } },
      { id: "I", text: { en: "Feel awkward and shy", ms: "Berasa kekok dan malu" } }
    ]
  },
  {
    id: 48,
    type: "personality",
    section: "Friendship",
    question: { en: "Do you have:", ms: "Adakah anda mempunyai:" },
    options: [
      { id: "E", text: { en: "A large circle of many friends", ms: "Lingkaran rakan yang luas" } },
      { id: "I", text: { en: "A small circle of close friends", ms: "Beberapa orang rakan rapat sahaja" } }
    ]
  },
  {
    id: 49,
    type: "personality",
    section: "Social Interaction",
    question: { en: "On a Friday night, you'd rather:", ms: "Pada malam Jumaat, anda lebih suka:" },
    options: [
      { id: "E", text: { en: "Go to a party or gathering", ms: "Pergi ke parti atau perjumpaan" } },
      { id: "I", text: { en: "Stay in with a book or movie", ms: "Duduk di rumah dengan buku atau filem" } }
    ]
  },
  {
    id: 50,
    type: "personality",
    section: "Meetings",
    question: { en: "In school assemblies, you usually:", ms: "Dalam perhimpunan sekolah, anda biasanya:" },
    options: [
      { id: "E", text: { en: "Sit with a big group and chat", ms: "Duduk dengan kumpulan besar dan bersembang" } },
      { id: "I", text: { en: "Sit quietly and observe", ms: "Duduk diam dan memerhati" } }
    ]
  },
  {
    id: 51,
    type: "personality",
    section: "Feedback",
    question: { en: "You prefer feedback delivered:", ms: "Anda lebih suka maklum balas disampaikan:" },
    options: [
      { id: "E", text: { en: "In an open team discussion", ms: "Dalam perbincangan pasukan terbuka" } },
      { id: "I", text: { en: "In a private 1-on-1 meeting", ms: "Dalam mesyuarat peribadi 1-ke-1" } }
    ]
  },
  {
    id: 52,
    type: "personality",
    section: "Conflict",
    question: { en: "When there is a conflict, you:", ms: "Apabila ada konflik, anda:" },
    options: [
      { id: "E", text: { en: "Talk it out immediately", ms: "Bincangkannya dengan segera" } },
      { id: "I", text: { en: "Withdraw and process it alone", ms: "Berundur dan memprosesnya sendiri" } }
    ]
  },
  {
    id: 53,
    type: "personality",
    section: "Energy",
    question: { en: "Your energy levels are highest when:", ms: "Tahap tenaga anda paling tinggi apabila:" },
    options: [
      { id: "E", text: { en: "Collaborating with others", ms: "Bekerjasama dengan orang lain" } },
      { id: "I", text: { en: "Focusing on a task alone", ms: "Fokus pada tugasan seorang diri" } }
    ]
  },
  {
    id: 54,
    type: "personality",
    section: "Idea Generation",
    question: { en: "When brainstorming, you:", ms: "Apabila menjana idea, anda:" },
    options: [
      { id: "E", text: { en: "Shout out ideas as they come", ms: "Menyuarakan idea sebaik sahaja ia muncul" } },
      { id: "I", text: { en: "Write down ideas before sharing", ms: "Tulis idea sebelum berkongsi" } }
    ]
  },
  {
    id: 55,
    type: "personality",
    section: "Style",
    question: { en: "People describe you as:", ms: "Orang menggambarkan anda sebagai:" },
    options: [
      { id: "E", text: { en: "Outgoing and friendly", ms: "Peramah dan mesra" } },
      { id: "I", text: { en: "Quiet and thoughtful", ms: "Diam dan penuh pemikiran" } }
    ]
  },
  {
    id: 56,
    type: "personality",
    section: "Weekends",
    question: { en: "A perfect weekend involves:", ms: "Hujung minggu yang sempurna melibatkan:" },
    options: [
      { id: "E", text: { en: "Meeting new people at an event", ms: "Bertemu orang baru di sebuah majlis" } },
      { id: "I", text: { en: "Recharging alone in nature", ms: "Berehat seorang diri di alam semulajadi" } }
    ]
  },
  {
    id: 57,
    type: "personality",
    section: "Phone Habits",
    question: { en: "You prefer to:", ms: "Anda lebih suka untuk:" },
    options: [
      { id: "E", text: { en: "Call someone for a quick chat", ms: "Menelefon seseorang untuk sembang ringkas" } },
      { id: "I", text: { en: "Send a text message instead", ms: "Menghantar mesej teks sahaja" } }
    ]
  },
  {
    id: 58,
    type: "personality",
    section: "New Environments",
    question: { en: "In a new class, you:", ms: "Dalam kelas baru, anda:" },
    options: [
      { id: "E", text: { en: "Introduce yourself to neighbors", ms: "Perkenalkan diri kepada rakan sebelah" } },
      { id: "I", text: { en: "Find a seat and wait for the lesson", ms: "Cari tempat duduk dan tunggu pelajaran bermula" } }
    ]
  },
  {
    id: 59,
    type: "personality",
    section: "Networking",
    question: { en: "The word 'Networking' sounds:", ms: "Perkataan 'Networking' kedengaran:" },
    options: [
      { id: "E", text: { en: "Like a great opportunity", ms: "Seperti peluang yang hebat" } },
      { id: "I", text: { en: "Exhausting but necessary", ms: "Meletihkan tetapi perlu" } }
    ]
  },
  {
    id: 60,
    type: "personality",
    section: "Final Thought",
    question: { en: "Do you prefer to be the lead actor or director?", ms: "Adakah anda lebih suka menjadi pelakon utama atau pengarah?" },
    options: [
      { id: "E", text: { en: "Lead Actor (in the spotlight)", ms: "Pelakon Utama (menjadi tumpuan)" } },
      { id: "I", text: { en: "Director (behind the scenes)", ms: "Pengarah (di sebalik tabir)" } }
    ]
  }
];

export const AVAILABLE_STREAMS = [
  {
    id: "science",
    streamName: { en: "Science Stream", ms: "Aliran Sains" },
    description: { en: "The Logic Seekers focusing on STEM subjects.", ms: "Pencari Logik yang fokus pada subjek STEM." },
    subjects: { en: ["Biology", "Chemistry", "Physics", "Additional Maths"], ms: ["Biologi", "Kimia", "Fizik", "Matematik Tambahan"] },
    careerPaths: { en: ["Doctor", "Engineer", "Scientist"], ms: ["Doktor", "Jurutera", "Saintis"] }
  },
  {
    id: "arts",
    streamName: { en: "Arts & Humanities", ms: "Sastera & Kemanusiaan" },
    description: { en: "The Storytellers exploring society and creativity.", ms: "Pencerita yang meneroka masyarakat dan kreativiti." },
    subjects: { en: ["Literature", "History", "Fine Arts", "Languages"], ms: ["Kesusasteraan", "Sejarah", "Seni Halus", "Bahasa"] },
    careerPaths: { en: ["Writer", "Artist", "Lawyer"], ms: ["Penulis", "Artis", "Peguam"] }
  },
  {
    id: "tvet",
    streamName: { en: "TVET / Vocational", ms: "TVET / Vokasional" },
    description: { en: "The Makers focused on practical and technical skills.", ms: "Pembuat yang fokus pada kemahiran praktikal dan teknikal." },
    subjects: { en: ["Technical Drawing", "Computer Science", "Engineering", "Automotive"], ms: ["Lukisan Kejuruteraan", "Sains Komputer", "Kejuruteraan", "Automotif"] },
    careerPaths: { en: ["Technician", "Chef", "Programmer"], ms: ["Juruteknik", "Chef", "Pengaturcara"] }
  },
  {
    id: "business",
    streamName: { en: "Business & Accountancy", ms: "Perniagaan & Perakaunan" },
    description: { en: "The Strategists focused on commerce and finance.", ms: "Ahli Strategi yang fokus pada perdagangan dan kewangan." },
    subjects: { en: ["Accounting", "Business", "Economics", "Commerce"], ms: ["Prinsip Perakaunan", "Perniagaan", "Ekonomi", "Perdagangan"] },
    careerPaths: { en: ["Accountant", "Entrepreneur", "Marketer"], ms: ["Akuntan", "Usahawan", "Pemasar"] }
  }
];
