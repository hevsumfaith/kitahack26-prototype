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
    "nav.share": "Share Prototype",
    "nav.getStarted": "Get Started",
    "hero.title": "Unlock Your Potential with",
    "hero.subtitle": "The Right Path",
    "hero.desc": "HalaTuju uses AI to help you choose your Form 4 academic stream based on your unique interests and strengths, not just your exam results.",
    "hero.cta": "Take Assessment",
    "hero.explore": "Explore Streams",
    "hero.badge": "Empowering Form 3 Students",
    "features.title": "How HalaTuju Helps You",
    "features.desc": "We focus on holistic education and guidance, ensuring you're placed where you'll thrive most.",
    "features.smart.title": "Smart Assessments",
    "features.smart.desc": "Engaging quizzes that evaluate your true interests, personality, and natural aptitudes.",
    "features.ai.title": "AI Recommendations",
    "features.ai.desc": "Advanced AI analyzes your profile to suggest the best stream with detailed compatibility scores.",
    "features.career.title": "Career Guidance",
    "features.career.desc": "Understand where each stream leads with our comprehensive career path directory.",
    "footer.rights": "© 2024 HalaTuju Malaysia. Supporting SDG 4: Quality Education.",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service",
    "assessment.step": "Assessment Step",
    "assessment.complete": "Assessment Complete",
    "assessment.welcome": "Welcome to HalaTuju Assessment",
    "assessment.welcomeDesc": "Let's start by getting to know you. What's your name?",
    "assessment.nameLabel": "Full Name",
    "assessment.namePlaceholder": "Enter your name",
    "assessment.continue": "Continue",
    "assessment.interestsTitle": "Your Interests",
    "assessment.interestsDesc": "Select everything that excites or interests you.",
    "assessment.strengthsTitle": "Your Strengths",
    "assessment.strengthsDesc": "What are you naturally good at? Choose at least 3.",
    "assessment.readyTitle": "Ready for Result?",
    "assessment.readyDesc": "We've gathered enough info to analyze your profile using our AI compatibility engine.",
    "assessment.summary": "Summary for",
    "assessment.interestsSelected": "Interests selected",
    "assessment.strengthsIdentified": "Strengths identified",
    "assessment.generate": "Generate Recommendation",
    "assessment.analyzing": "Analyzing...",
    "assessment.topRecommendation": "Top Recommendation",
    "assessment.match": "Match",
    "assessment.otherStreams": "Other Stream Compatibility",
    "assessment.viewDashboard": "View Dashboard",
    "assessment.back": "Back",
    "assessment.next": "Next",
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
    "dashboard.needHelp": "Need Help?",
    "dashboard.contactCounselor": "Contact our educational counselors for a personalized 1-on-1 session.",
    "dashboard.schedule": "Schedule a Call"
  },
  ms: {
    "nav.dashboard": "Papan Pemuka",
    "nav.assessment": "Penilaian",
    "nav.streams": "Aliran",
    "nav.profile": "Profil",
    "nav.share": "Kongsi Prototaip",
    "nav.getStarted": "Bermula",
    "hero.title": "Buka Potensi Anda dengan",
    "hero.subtitle": "Hala Tuju yang Tepat",
    "hero.desc": "HalaTuju menggunakan AI untuk membantu anda memilih aliran akademik Tingkatan 4 berdasarkan minat dan kekuatan unik anda, bukan sekadar keputusan peperiksaan.",
    "hero.cta": "Ambil Penilaian",
    "hero.explore": "Teroka Aliran",
    "hero.badge": "Memperkasa Pelajar Tingkatan 3",
    "features.title": "Bagaimana HalaTuju Membantu Anda",
    "features.desc": "Kami fokus pada pendidikan dan bimbingan holistik, memastikan anda berada di tempat yang paling sesuai untuk berkembang.",
    "features.smart.title": "Penilaian Pintar",
    "features.smart.desc": "Kuiz menarik yang menilai minat sebenar, personaliti, dan bakat semulajadi anda.",
    "features.ai.title": "Syor AI",
    "features.ai.desc": "AI canggih menganalisis profil anda untuk mencadangkan aliran terbaik dengan skor keserasian terperinci.",
    "features.career.title": "Bimbingan Kerjaya",
    "features.career.desc": "Fahami hala tuju setiap aliran dengan direktori laluan kerjaya komprehensif kami.",
    "footer.rights": "© 2024 HalaTuju Malaysia. Menyokong SDG 4: Pendidikan Berkualiti.",
    "footer.privacy": "Dasar Privasi",
    "footer.terms": "Syarat Perkhidmatan",
    "assessment.step": "Langkah Penilaian",
    "assessment.complete": "Penilaian Selesai",
    "assessment.welcome": "Selamat Datang ke Penilaian HalaTuju",
    "assessment.welcomeDesc": "Mari mulakan dengan mengenali anda. Siapakah nama anda?",
    "assessment.nameLabel": "Nama Penuh",
    "assessment.namePlaceholder": "Masukkan nama anda",
    "assessment.continue": "Teruskan",
    "assessment.interestsTitle": "Minat Anda",
    "assessment.interestsDesc": "Pilih semua yang membuatkan anda teruja atau berminat.",
    "assessment.strengthsTitle": "Kekuatan Anda",
    "assessment.strengthsDesc": "Apakah perkara yang anda mahir secara semula jadi? Pilih sekurang-kurangnya 3.",
    "assessment.readyTitle": "Sedia untuk Keputusan?",
    "assessment.readyDesc": "Kami telah mengumpul maklumat yang mencukupi untuk menganalisis profil anda menggunakan enjin keserasian AI kami.",
    "assessment.summary": "Ringkasan untuk",
    "assessment.interestsSelected": "Minat dipilih",
    "assessment.strengthsIdentified": "Kekuatan dikenal pasti",
    "assessment.generate": "Jana Syor",
    "assessment.analyzing": "Menganalisis...",
    "assessment.topRecommendation": "Syor Teratas",
    "assessment.match": "Padanan",
    "assessment.otherStreams": "Keserasian Aliran Lain",
    "assessment.viewDashboard": "Lihat Papan Pemuka",
    "assessment.back": "Kembali",
    "assessment.next": "Seterusnya",
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
    "dashboard.profileProgress": "Tetapan Profil",
    "dashboard.history": "Sejarah Penilaian",
    "dashboard.noHistory": "Tiada sejarah penilaian lagi.",
    "dashboard.high": "Tinggi",
    "dashboard.viewReport": "Lihat Laporan",
    "dashboard.quickTips": "Tip Pantas",
    "dashboard.tip1": "Kejujuran adalah kunci: Jawab berdasarkan apa yang anda suka, bukan jangkaan orang lain.",
    "dashboard.tip2": "Utamakan Kerjaya: Fikirkan tentang profesion masa depan anda.",
    "dashboard.tip3": "Bincang dengan Pakar: Bincangkan laporan anda dengan kaunselor.",
    "dashboard.needHelp": "Perlukan Bantuan?",
    "dashboard.contactCounselor": "Hubungi kaunselor pendidikan kami untuk sesi peribadi 1-ke-1.",
    "dashboard.schedule": "Jadualkan Panggilan"
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
