"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ms';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  en: {
    "nav.dashboard": "Dashboard",
    "nav.assessment": "Assessment",
    "nav.streams": "Streams",
    "nav.profile": "Profile",
    "nav.getStarted": "Get Started",
    "nav.login": "Log In",
    "nav.logout": "Log Out",
    "hero.title": "Unlock Your Potential with",
    "hero.subtitle": "The Right Path",
    "hero.desc": "HalaTuju uses AI to help you choose your Form 4 academic stream based on your unique interests and strengths, not just your exam results.",
    "hero.cta": "Take Assessment",
    "hero.explore": "Explore Streams",
    "hero.badge": "Empowering Malaysian Students",
    "features.title": "How HalaTuju Helps You",
    "features.desc": "We focus on holistic education and guidance, ensuring you're placed where you'll thrive most.",
    "features.smart.title": "Smart Assessments",
    "features.smart.desc": "Engaging quizzes that evaluate your true interests, personality, and natural aptitudes.",
    "features.ai.title": "AI Recommendations",
    "features.ai.desc": "Advanced AI analyzes your profile to suggest the best stream with detailed compatibility scores.",
    "features.career.title": "Career Guidance",
    "features.career.desc": "Understand where each stream leads with our comprehensive career path directory.",
    "footer.rights": "© 2026 HalaTuju Malaysia. Supporting SDG 4: Quality Education.",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service",
    "subject.bm": "Bahasa Melayu",
    "subject.bi": "English",
    "subject.math": "Mathematics",
    "subject.science": "Science",
    "subject.history": "History",
    "subject.geography": "Geography",
    "subject.rbt": "RBT",
    "subject.ask": "ASK",
    "subject.islam": "Pendidikan Islam",
    "subject.moral": "Pendidikan Moral",
    "streams.title": "Form 4 Academic Streams",
    "streams.desc": "Understand the subjects, requirements, and future opportunities associated with each stream available in Malaysian secondary schools.",
    "streams.subjects": "Core Subjects",
    "streams.careers": "Career Paths",
    "streams.noteTitle": "Important Note on Requirements",
    "streams.noteDesc": "While HalaTuju helps match your interest and potential, schools still look at your PBD (Pentaksiran Bilik Darjah) results and teacher recommendations for final placement.",
    "dashboard.welcome": "Welcome back",
    "dashboard.desc": "Here's an overview of your academic stream planning.",
    "dashboard.newAssessment": "Take New Assessment",
    "dashboard.activeGoals": "Active Goals",
    "dashboard.goalDesc": "You haven't locked in a preference yet. Take the assessment to start!",
    "dashboard.profileProgress": "Profile Setup",
    "dashboard.history": "Assessment History",
    "dashboard.noHistory": "No assessment history yet.",
    "dashboard.high": "High",
    "dashboard.viewReport": "View Report",
    "dashboard.quickTips": "Quick Tips",
    "dashboard.tip1": "Honesty is key: Answer based on what you love, not expectations.",
    "dashboard.tip2": "Career First: Think about your future profession.",
    "dashboard.tip3": "Talk to Experts: Discuss your report with counselors.",
    "dashboard.tip4": "Grades Matter: Keep your core subjects strong for science streams.",
    "dashboard.tip5": "Passion Projects: Explore hobbies related to your top stream.",
    "dashboard.tip6": "Goal Setting: Break down your career path into small steps.",
    "dashboard.tip7": "Social Battery: Notice if you prefer deep talks or big groups.",
    "dashboard.tip8": "Technical Skills: Start learning basic coding or design early.",
    "dashboard.tip9": "Stay Curious: Read beyond your school textbooks.",
    "dashboard.tip10": "Mentorship: Find someone working in your dream job.",
    "dashboard.tip11": "Balanced Life: Education is important, so is your mental health.",
    "dashboard.tip12": "Time Management: Use a planner to organize your studies.",
    "dashboard.tip13": "Communication: Soft skills are just as vital as grades.",
    "dashboard.tip14": "Research: Look up university requirements for your stream.",
    "dashboard.tip15": "Self-Reflection: Re-take the assessment in 6 months.",
    "dashboard.needHelp": "Need Help?",
    "dashboard.contactCounselor": "Contact our educational counselors for a personalized 1-on-1 session.",
    "dashboard.schedule": "Schedule a Call",
    "dashboard.academicProfile": "Academic Profile",
    "dashboard.latestGrades": "Latest Form 3 Results",
    "dashboard.noGrades": "No grade data available. Complete an assessment to see your results here.",
    "dashboard.loginRequiredGrades": "Please log in to view your academic grades and profile.",
    "profile.title": "My Profile",
    "profile.subtitle": "Manage your data and view your academic journey.",
    "profile.noUser": "Please log in to view your profile.",
    "profile.completion": "Profile Completion",
    "profile.recentResults": "Recent Assessment Results",
    "profile.date": "Date",
    "profile.recommendation": "Recommended Stream",
    "profile.matchScore": "Match Score",
    "profile.viewDetails": "View Details",
    "auth.title": "Sign In",
    "auth.subtitle": "Choose your preferred method to access HalaTuju",
    "auth.google": "Continue with Google",
    "auth.email": "Login with Email",
    "auth.createAccount": "Create New Account",
    "auth.testingMode": "Testing Mode: Registration is currently disabled.",
    "auth.emailPlaceholder": "Email address",
    "auth.passwordPlaceholder": "Password",
    "auth.signIn": "Sign In",
    "auth.back": "Back"
  },
  ms: {
    "nav.dashboard": "Papan Pemuka",
    "nav.assessment": "Penilaian",
    "nav.streams": "Aliran",
    "nav.profile": "Profil",
    "nav.getStarted": "Bermula",
    "nav.login": "Log Masuk",
    "nav.logout": "Log Keluar",
    "hero.title": "Buka Potensi Anda dengan",
    "hero.subtitle": "Hala Tuju yang Tepat",
    "hero.desc": "HalaTuju menggunakan AI to help you choose your Form 4 academic stream based on your unique interests and strengths, not just your exam results.",
    "hero.cta": "Ambil Penilaian",
    "hero.explore": "Teroka Aliran",
    "hero.badge": "Memperkasa Pelajar Malaysia",
    "features.title": "Bagaimana HalaTuju Membantu Anda",
    "features.desc": "Kami fokus pada pendidikan dan bimbingan holistik, memastikan anda berada di tempat yang paling sesuai untuk berkembang.",
    "features.smart.title": "Penilaian Pintar",
    "features.smart.desc": "Kuiz menarik yang menilai minat sebenar, personaliti, dan bakat semulajadi anda.",
    "features.ai.title": "Syor AI",
    "features.ai.desc": "AI canggih menganalisis profil anda untuk mencadangkan aliran terbaik dengan skor keserasian terperinci.",
    "features.career.title": "Bimbingan Kerjaya",
    "features.career.desc": "Fahami hala tuju setiap aliran dengan direktori laluan kerjaya komprehensif kami.",
    "footer.rights": "© 2026 HalaTuju Malaysia. Menyokong SDG 4: Pendidikan Berkualiti.",
    "footer.privacy": "Dasar Privasi",
    "footer.terms": "Syarat Perkhidmatan",
    "subject.bm": "Bahasa Melayu",
    "subject.bi": "Bahasa Inggeris",
    "subject.math": "Matematik",
    "subject.science": "Sains",
    "subject.history": "Sejarah",
    "subject.geography": "Geografi",
    "subject.rbt": "RBT",
    "subject.ask": "ASK",
    "subject.islam": "Pendidikan Islam",
    "subject.moral": "Pendidikan Moral",
    "streams.title": "Aliran Akademik Tingkatan 4",
    "streams.desc": "Fahami subjek, syarat, dan peluang masa depan yang berkaitan dengan setiap aliran yang terdapat di sekolah menengah Malaysia.",
    "streams.subjects": "Subjek Teras",
    "streams.careers": "Laluan Kerjaya",
    "streams.noteTitle": "Nota Penting Mengenai Syarat",
    "streams.noteDesc": "Walaupun HalaTuju membantu memadankan minat dan potensi anda, pihak sekolah masih melihat keputusan PBD (Pentaksiran Bilik Darjah) dan syor guru untuk penempatan akhir.",
    "dashboard.welcome": "Selamat kembali",
    "dashboard.desc": "Berikut adalah gambaran keseluruhan perancangan aliran akademik anda.",
    "dashboard.newAssessment": "Ambil Penilaian Baru",
    "dashboard.activeGoals": "Matlamat Aktif",
    "dashboard.goalDesc": "Anda belum menetapkan pilihan lagi. Ambil penilaian untuk bermula!",
    "dashboard.profileProgress": "Kesempurnaan Profil",
    "dashboard.history": "Sejarah Penilaian",
    "dashboard.noHistory": "Tiada sejarah penilaian lagi.",
    "dashboard.high": "Tinggi",
    "dashboard.viewReport": "Lihat Laporan",
    "dashboard.quickTips": "Tip Pantas",
    "dashboard.tip1": "Kejujuran adalah kunci: Jawab berdasarkan apa yang anda suka, bukan jangkaan orang lain.",
    "dashboard.tip2": "Utamakan Kerjaya: Fikirkan tentang profesion masa depan anda.",
    "dashboard.tip3": "Bincang dengan Pakar: Bincangkan laporan anda dengan kaunselor.",
    "dashboard.tip4": "Gred Penting: Pastikan subjek teras anda kuat untuk aliran sains.",
    "dashboard.tip5": "Projek Minat: Teroka hobi yang berkaitan dengan aliran utama anda.",
    "dashboard.tip6": "Penetapan Matlamat: Pecahkan laluan kerjaya anda kepada langkah kecil.",
    "dashboard.tip7": "Bateri Sosial: Perhatikan jika anda suka perbincangan mendalam atau kumpulan besar.",
    "dashboard.tip8": "Kemahiran Teknikal: Mula belajar asas pengekodan atau reka bentuk awal.",
    "dashboard.tip9": "Sentiasa Ingin Tahu: Baca lebih daripada sekadar buku teks sekolah.",
    "dashboard.tip10": "Mentorship: Cari seseorang yang bekerja dalam pekerjaan impian anda.",
    "dashboard.tip11": "Hidup Seimbang: Pendidikan penting, kesihatan mental juga penting.",
    "dashboard.tip12": "Pengurusan Masa: Gunakan perancang untuk menyusun pembelajaran anda.",
    "dashboard.tip13": "Komunikasi: Kemahiran insaniah sama pentingnya dengan gred.",
    "dashboard.tip14": "Penyelidikan: Cari syarat universiti untuk aliran pilihan anda.",
    "dashboard.tip15": "Refleksi Diri: Ambil semula penilaian dalam masa 6 bulan.",
    "dashboard.needHelp": "Perlukan Bantuan?",
    "dashboard.contactCounselor": "Hubungi kaunselor pendidikan kami untuk sesi peribadi 1-ke-1.",
    "dashboard.schedule": "Jadualkan Panggilan",
    "dashboard.academicProfile": "Profil Akademik",
    "dashboard.latestGrades": "Keputusan Terkini Tingkatan 3",
    "dashboard.noGrades": "Tiada data gred tersedia. Lengkapkan penilaian untuk melihat keputusan anda di sini.",
    "dashboard.loginRequiredGrades": "Sila log masuk untuk melihat gred akademik dan profil anda.",
    "profile.title": "Profil Saya",
    "profile.subtitle": "Urus data anda dan lihat perjalanan akademik anda.",
    "profile.noUser": "Sila log masuk untuk melihat profil anda.",
    "profile.completion": "Kesempurnaan Profil",
    "profile.recentResults": "Keputusan Penilaian Terkini",
    "profile.date": "Tarikh",
    "profile.recommendation": "Aliran Disyorkan",
    "profile.matchScore": "Skor Padanan",
    "profile.viewDetails": "Lihat Butiran",
    "auth.title": "Log Masuk",
    "auth.subtitle": "Pilih kaedah pilihan anda untuk mengakses HalaTuju",
    "auth.google": "Teruskan dengan Google",
    "auth.email": "Log masuk dengan E-mel",
    "auth.createAccount": "Cipta Akaun Baru",
    "auth.testingMode": "Mod Ujian: Pendaftaran sedang dilumpuhkan.",
    "auth.emailPlaceholder": "Alamat e-mel",
    "auth.passwordPlaceholder": "Kata laluan",
    "auth.signIn": "Log Masuk",
    "auth.back": "Kembali"
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang && (savedLang === 'en' || savedLang === 'ms')) {
      setLanguageState(savedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
