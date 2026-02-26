"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CAREER_TEST_QUESTIONS } from "@/app/lib/constants";
import { recommendStream, type RecommendStreamOutput } from "@/ai/flows/recommend-stream";
import { Brain, ArrowRight, ArrowLeft, CheckCircle2, Loader2, Sparkles, Briefcase, UserCircle, Star, Puzzle, Zap, Users } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { cn } from "@/lib/utils";

export default function AssessmentPage() {
  const { toast } = useToast();
  const { language, t } = useLanguage();
  const [step, setStep] = useState(0); // 0: Welcome, 1: Questions, 2: Analyzing, 3: Results
  const [name, setName] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<RecommendStreamOutput | null>(null);
  const [user, setUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    if (!auth) return;
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser?.displayName && !name) {
        setName(currentUser.displayName);
      }
    });
    return () => unsubscribe();
  }, [name]);

  const questions = CAREER_TEST_QUESTIONS;
  const totalQuestions = questions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = (optionId: string) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: optionId }));
    
    if (currentQuestionIndex < totalQuestions - 1) {
      setTimeout(() => setCurrentQuestionIndex(prev => prev + 1), 200);
    } else {
      setStep(2);
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Map IDs to original arrays for Genkit (30/30/30 split)
      const streamAnswers = questions.filter(q => q.id <= 30).map(q => answers[q.id]);
      const personalityAnswers = questions.filter(q => q.id >= 31 && q.id <= 60).map(q => answers[q.id]);
      const problemSolvingAnswers = questions.filter(q => q.id >= 61).map(q => answers[q.id]);

      const output = await recommendStream({
        studentName: name,
        language: language,
        streamAnswers: streamAnswers.filter(Boolean),
        personalityAnswers: personalityAnswers.filter(Boolean),
        problemSolvingAnswers: problemSolvingAnswers.filter(Boolean)
      });

      setResult(output);
      setStep(3);

      if (user && db) {
        await addDoc(collection(db, "assessments"), {
          userId: user.uid,
          studentName: name,
          mostSuitableStream: output.mostSuitableStream,
          personalityProfile: output.personalityProfile,
          timestamp: serverTimestamp(),
          language: language,
          fullOutput: output
        });
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
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-2xl">
        {step === 0 && (
          <Card className="border-none shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-500">
            <div className="h-2 bg-primary" />
            <CardHeader className="text-center pt-10">
              <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Brain size={40} className="animate-pulse" />
              </div>
              <CardTitle className="text-3xl font-bold mb-2">HalaTuju Oracle</CardTitle>
              <CardDescription className="text-lg">
                The 90-question high-accuracy assessment to align your passion with People, Data, or Things.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-6 px-10 pb-12">
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex items-start gap-3">
                <Star className="text-amber-500 shrink-0 mt-1" size={18} />
                <p className="text-sm text-amber-800 font-medium">
                  This test has 3 sections: Interest & Social, Personality, and Problem Solving.
                </p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">What should we call you?</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-4 rounded-xl border-2 border-slate-100 focus:border-primary outline-none transition-all text-lg"
                />
              </div>
              <Button onClick={() => setStep(1)} disabled={!name} className="w-full h-14 text-lg rounded-xl shadow-lg">
                Begin High-Accuracy Test <ArrowRight className="ml-2" />
              </Button>
            </CardContent>
          </Card>
        )}

        {step === 1 && (
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
                  <h3 className="text-sm font-bold text-slate-500">Question {currentQuestionIndex + 1} of {totalQuestions}</h3>
                </div>
                <span className="text-sm font-black text-slate-900">{Math.round(progress)}%</span>
              </div>
              <Progress 
                value={progress} 
                className="h-3 bg-slate-200" 
                indicatorClassName="bg-gradient-to-r from-indigo-500 via-emerald-500 to-orange-500"
              />
            </div>

            {/* Section Introductions */}
            {currentQuestionIndex === 0 && (
              <div className="bg-gradient-to-r from-indigo-600 to-blue-700 p-6 rounded-2xl text-white shadow-lg animate-in fade-in slide-in-from-bottom-4">
                <div className="flex items-center gap-3 mb-2">
                  <Zap className="bg-white/20 p-1.5 rounded-lg" size={32} />
                  <h4 className="text-xl font-bold">Section 1: Interest & Social</h4>
                </div>
                <p className="text-white/80 text-sm">Let's discover if your primary driver is People, Data, or Things.</p>
              </div>
            )}
            {currentQuestionIndex === 30 && (
              <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-6 rounded-2xl text-white shadow-lg animate-in fade-in slide-in-from-bottom-4">
                <div className="flex items-center gap-3 mb-2">
                  <Users className="bg-white/20 p-1.5 rounded-lg" size={32} />
                  <h4 className="text-xl font-bold">Section 2: Personality & Work Style</h4>
                </div>
                <p className="text-white/80 text-sm">Understanding how you recharge and how you prefer to handle tasks.</p>
              </div>
            )}
            {currentQuestionIndex === 60 && (
              <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-6 rounded-2xl text-white shadow-lg animate-in fade-in slide-in-from-bottom-4">
                <div className="flex items-center gap-3 mb-2">
                  <Puzzle className="bg-white/20 p-1.5 rounded-lg" size={32} />
                  <h4 className="text-xl font-bold">Section 3: Problem Solving</h4>
                </div>
                <p className="text-white/80 text-sm">Testing your natural aptitude across key academic and professional domains.</p>
              </div>
            )}

            <Card className="border-none shadow-xl">
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
                      "w-full text-left p-5 rounded-2xl border-2 transition-all group flex items-center justify-between",
                      answers[currentQuestion.id] === opt.id
                        ? "border-primary bg-primary/5 shadow-md"
                        : "border-slate-100 hover:border-slate-200 hover:bg-slate-50"
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

            <div className="flex justify-between items-center text-slate-400">
              <button 
                onClick={() => currentQuestionIndex > 0 ? setCurrentQuestionIndex(prev => prev - 1) : setStep(0)}
                className="flex items-center gap-2 hover:text-slate-600 transition-colors text-sm font-bold"
              >
                <ArrowLeft size={16} /> Previous
              </button>
              <span className="text-xs font-medium italic">Your progress is automatically saved.</span>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="h-[60vh] flex flex-col items-center justify-center text-center gap-6">
            <Loader2 className="animate-spin text-primary" size={64} />
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">Oracle is Processing...</h2>
              <p className="text-slate-500">Analyzing 90 points of interaction, personality, and aptitude.</p>
            </div>
          </div>
        )}

        {step === 3 && result && (
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
              <h3 className="text-xl font-bold flex items-center gap-2 text-slate-800">
                <CheckCircle2 className="text-green-500" /> Compatibility Breakdown
              </h3>
              <div className="grid gap-4">
                {result.streamCompatibility.map((stream) => (
                  <div key={stream.streamName} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
                    <div className="space-y-2 flex-grow mr-8">
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="font-bold text-slate-800">{stream.streamName}</h4>
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
