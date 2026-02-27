"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CAREER_TEST_QUESTIONS } from "@/app/lib/constants";
import { recommendStream, type RecommendStreamOutput } from "@/ai/flows/recommend-stream";
import { Brain, ArrowRight, ArrowLeft, CheckCircle2, Loader2, Star, Zap, Users, Puzzle, Briefcase, GraduationCap, BookOpen } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { cn } from "@/lib/utils";

const GRADE_OPTIONS = ["A", "B", "C", "D", "E", "G"];

export default function AssessmentPage() {
  const { toast } = useToast();
  const { language, t } = useLanguage();
  const [step, setStep] = useState(0); // 0: Welcome, 1: Grades, 2: Questions, 3: Analyzing, 4: Results
  const [name, setName] = useState("");
  const [grades, setGrades] = useState<Record<string, string>>({
    BM: "", BI: "", Math: "", Science: "", History: "", Geography: "",
    RBT: "", ASK: "", Islam: "", Moral: ""
  });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<RecommendStreamOutput | null>(null);
  const [user, setUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    if (!auth) return;
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser?.displayName) {
        setName((prev) => prev || currentUser.displayName || "");
      }
    });
    return () => unsubscribe();
  }, []);

  const questions = CAREER_TEST_QUESTIONS;
  const totalQuestions = questions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
  const currentQuestion = questions[currentQuestionIndex];

  const handleGradeChange = (subject: string, grade: string) => {
    setGrades(prev => {
      const newGrades = { ...prev, [subject]: grade };
      // Mutual exclusion logic
      if (subject === "RBT" && grade) newGrades.ASK = "";
      if (subject === "ASK" && grade) newGrades.RBT = "";
      if (subject === "Islam" && grade) newGrades.Moral = "";
      if (subject === "Moral" && grade) newGrades.Islam = "";
      return newGrades;
    });
  };

  const isGradesStepValid = () => {
    const required = ["BM", "BI", "Math", "Science", "History", "Geography"];
    const hasRequired = required.every(s => grades[s]);
    const hasTechnical = grades.RBT || grades.ASK;
    const hasEthics = grades.Islam || grades.Moral;
    return hasRequired && hasTechnical && hasEthics;
  };

  const handleAnswerSelect = (optionId: string) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: optionId }));
    
    if (currentQuestionIndex < totalQuestions - 1) {
      setTimeout(() => setCurrentQuestionIndex(prev => prev + 1), 200);
    } else {
      setStep(3);
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const streamAnswers = questions.filter(q => q.id <= 30).map(q => answers[q.id]);
      const personalityAnswers = questions.filter(q => q.id >= 31 && q.id <= 60).map(q => answers[q.id]);
      const problemSolvingAnswers = questions.filter(q => q.id >= 61).map(q => answers[q.id]);

      // Filter out empty grades for the AI
      const cleanedGrades = Object.fromEntries(Object.entries(grades).filter(([_, v]) => v));

      const output = await recommendStream({
        studentName: name,
        language: language,
        grades: cleanedGrades,
        streamAnswers: streamAnswers.filter(Boolean),
        personalityAnswers: personalityAnswers.filter(Boolean),
        problemSolvingAnswers: problemSolvingAnswers.filter(Boolean)
      });

      setResult(output);
      setStep(4);

      if (user && db) {
        addDoc(collection(db, "assessments"), {
          userId: user.uid,
          studentName: name,
          grades: cleanedGrades,
          mostSuitableStream: output.mostSuitableStream,
          personalityProfile: output.personalityProfile,
          timestamp: serverTimestamp(),
          language: language,
          fullOutput: output
        }).catch(err => console.error("Firestore Error:", err));
      }
    } catch (error) {
      console.error(error);
      toast({
        title: language === 'en' ? "Oracle Connection Lost" : "Sambungan Oracle Terputus",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
      setStep(0);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-2xl">
        {step === 0 && (
          <Card className="border shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-500 bg-card">
            <div className="h-2 bg-primary" />
            <CardHeader className="text-center pt-10">
              <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Brain size={40} className="animate-pulse" />
              </div>
              <CardTitle className="text-3xl font-bold mb-2">HalaTuju Oracle</CardTitle>
              <CardDescription className="text-lg">
                The high-accuracy assessment factoring in your academic grades and interests.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-6 px-10 pb-12">
              <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl flex items-start gap-3">
                <Star className="text-amber-500 shrink-0 mt-1" size={18} />
                <p className="text-sm text-amber-600 dark:text-amber-400 font-medium">
                  We'll start with your academic results, followed by the 90-question profile test.
                </p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-muted-foreground">What should we call you?</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-4 rounded-xl border bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-lg"
                />
              </div>
              <Button onClick={() => setStep(1)} disabled={!name} className="w-full h-14 text-lg rounded-xl shadow-lg">
                Begin Assessment <ArrowRight className="ml-2" />
              </Button>
            </CardContent>
          </Card>
        )}

        {step === 1 && (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">Academic Grades</h2>
              <p className="text-muted-foreground">Please enter your Form 3 trial or predicted results.</p>
            </div>

            <Card className="border shadow-xl bg-card overflow-hidden">
              <div className="h-2 bg-indigo-500" />
              <CardContent className="p-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { key: "BM", label: t("subject.bm") },
                    { key: "BI", label: t("subject.bi") },
                    { key: "Math", label: t("subject.math") },
                    { key: "Science", label: t("subject.science") },
                    { key: "History", label: t("subject.history") },
                    { key: "Geography", label: t("subject.geography") },
                  ].map((sub) => (
                    <div key={sub.key} className="space-y-2">
                      <label className="text-sm font-bold">{sub.label}</label>
                      <Select value={grades[sub.key]} onValueChange={(v) => handleGradeChange(sub.key, v)}>
                        <SelectTrigger className="w-full rounded-xl">
                          <SelectValue placeholder="Grade" />
                        </SelectTrigger>
                        <SelectContent>
                          {GRADE_OPTIONS.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-dashed">
                  <div className="space-y-3">
                    <p className="text-xs font-black uppercase text-indigo-500 tracking-widest">Technical Elective</p>
                    <div className="space-y-2">
                      <label className="text-sm font-bold">{t("subject.rbt")}</label>
                      <Select value={grades.RBT} onValueChange={(v) => handleGradeChange("RBT", v)} disabled={!!grades.ASK}>
                        <SelectTrigger className="w-full rounded-xl">
                          <SelectValue placeholder="Grade" />
                        </SelectTrigger>
                        <SelectContent>
                          {GRADE_OPTIONS.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold">{t("subject.ask")}</label>
                      <Select value={grades.ASK} onValueChange={(v) => handleGradeChange("ASK", v)} disabled={!!grades.RBT}>
                        <SelectTrigger className="w-full rounded-xl">
                          <SelectValue placeholder="Grade" />
                        </SelectTrigger>
                        <SelectContent>
                          {GRADE_OPTIONS.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-xs font-black uppercase text-emerald-500 tracking-widest">Core Values</p>
                    <div className="space-y-2">
                      <label className="text-sm font-bold">{t("subject.islam")}</label>
                      <Select value={grades.Islam} onValueChange={(v) => handleGradeChange("Islam", v)} disabled={!!grades.Moral}>
                        <SelectTrigger className="w-full rounded-xl">
                          <SelectValue placeholder="Grade" />
                        </SelectTrigger>
                        <SelectContent>
                          {GRADE_OPTIONS.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold">{t("subject.moral")}</label>
                      <Select value={grades.Moral} onValueChange={(v) => handleGradeChange("Moral", v)} disabled={!!grades.Islam}>
                        <SelectTrigger className="w-full rounded-xl">
                          <SelectValue placeholder="Grade" />
                        </SelectTrigger>
                        <SelectContent>
                          {GRADE_OPTIONS.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <Button variant="outline" onClick={() => setStep(0)} className="rounded-xl h-14 px-8">
                <ArrowLeft className="mr-2" size={18} /> Back
              </Button>
              <Button 
                onClick={() => setStep(2)} 
                disabled={!isGradesStepValid()} 
                className="flex-grow h-14 text-lg rounded-xl shadow-lg"
              >
                Continue to Questions <ArrowRight className="ml-2" />
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <div>
                  <span className="text-xs font-bold text-primary uppercase tracking-widest flex items-center gap-2">
                    {currentQuestion.id <= 30 && <Zap size={14} className="text-indigo-500" />}
                    {currentQuestion.id > 30 && currentQuestion.id <= 60 && <Users size={14} className="text-emerald-500" />}
                    {currentQuestion.id > 60 && <Puzzle size={14} className="text-amber-500" />}
                    {currentQuestion.section}
                  </span>
                  <h3 className="text-sm font-bold text-muted-foreground">Question {currentQuestionIndex + 1} of {totalQuestions}</h3>
                </div>
                <span className="text-sm font-black text-foreground">{Math.round(progress)}%</span>
              </div>
              <Progress 
                value={progress} 
                className="h-3 bg-muted" 
                indicatorClassName="bg-gradient-to-r from-orange-500 via-indigo-500 to-emerald-500"
              />
            </div>

            <Card className="border shadow-xl bg-card">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl md:text-2xl font-bold leading-tight">
                  {currentQuestion.question[language]}
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3">
                {currentQuestion.options.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleAnswerSelect(opt.id)}
                    className={cn(
                      "w-full text-left p-5 rounded-2xl border transition-all group flex items-center justify-between",
                      answers[currentQuestion.id] === opt.id
                        ? "border-primary bg-primary/10 shadow-md"
                        : "border-border hover:border-primary/50 hover:bg-muted"
                    )}
                  >
                    <span className="text-base md:text-lg font-medium group-hover:translate-x-1 transition-transform">
                      {opt.text[language]}
                    </span>
                    {answers[currentQuestion.id] === opt.id && <CheckCircle2 className="text-primary shrink-0 ml-4" />}
                  </button>
                ))}
              </CardContent>
            </Card>

            <div className="flex justify-between items-center text-muted-foreground">
              <button 
                onClick={() => currentQuestionIndex > 0 ? setCurrentQuestionIndex(prev => prev - 1) : setStep(1)}
                className="flex items-center gap-2 hover:text-foreground transition-colors text-sm font-bold"
              >
                <ArrowLeft size={16} /> Previous
              </button>
              <span className="text-xs font-medium italic">Your progress is automatically saved.</span>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="h-[60vh] flex flex-col items-center justify-center text-center gap-6">
            <Loader2 className="animate-spin text-primary" size={64} />
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">Oracle is Processing...</h2>
              <p className="text-muted-foreground">Analyzing your grades and 90 points of interaction.</p>
            </div>
          </div>
        )}

        {step === 4 && result && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <Card className="border-none shadow-2xl bg-gradient-to-br from-indigo-700 to-blue-600 text-white overflow-hidden">
              <CardHeader className="text-center relative pt-12 pb-6">
                <div className="inline-block px-4 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                  Oracle Recommendation
                </div>
                <CardTitle className="text-4xl md:text-5xl font-black mb-2">{result.mostSuitableStream}</CardTitle>
                <CardDescription className="text-white/80 text-xl font-medium italic">
                  "{result.personalityProfile}"
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center pb-12">
                <div className="bg-black/20 p-8 rounded-3xl backdrop-blur-sm max-w-lg mx-auto">
                  <p className="text-lg leading-relaxed mb-8">
                    {result.keyInsights}
                  </p>
                  <div className="flex items-center justify-center gap-4">
                    <div className="h-[1px] bg-white/30 flex-grow" />
                    <span className="text-sm font-bold uppercase tracking-widest text-white/60">Top Career Matches</span>
                    <div className="h-[1px] bg-white/30 flex-grow" />
                  </div>
                  <div className="flex flex-wrap justify-center gap-3 mt-6">
                    {result.suggestedCareers.map(career => (
                      <div key={career} className="bg-white text-indigo-700 px-5 py-2 rounded-full font-bold flex items-center gap-2 shadow-lg">
                        <Briefcase size={16} /> {career}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6">
              <h3 className="text-xl font-bold flex items-center gap-2 text-foreground">
                <CheckCircle2 className="text-green-500" /> Compatibility Breakdown
              </h3>
              <div className="grid gap-4">
                {result.streamCompatibility.map((stream) => (
                  <div key={stream.streamName} className="bg-card p-6 rounded-2xl border border-border shadow-sm flex items-center justify-between">
                    <div className="space-y-2 flex-grow mr-8">
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="font-bold text-foreground">{stream.streamName}</h4>
                        <span className="text-sm font-black text-primary">{Math.round(stream.compatibilityPercentage)}%</span>
                      </div>
                      <Progress value={stream.compatibilityPercentage} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Button asChild size="lg" className="w-full h-16 rounded-2xl text-lg shadow-xl">
              <Link href="/dashboard">Continue to Dashboard</Link>
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
