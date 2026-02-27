"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { LayoutDashboard, History, Sparkles, TrendingUp, Info, LogIn, Loader2, ChevronRight, BookOpen } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, User as FirebaseUser, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { collection, query, where, getDocs, orderBy, limit } from "firebase/firestore";
import { cn } from "@/lib/utils";

interface AssessmentHistory {
  id: string;
  mostSuitableStream: string;
  compatibilityPercentage: number;
  grades?: Record<string, string>;
  timestamp: any;
}

const TIP_SETS = [
  {
    bgColor: "bg-blue-50/50 dark:bg-blue-900/10",
    accentColor: "text-blue-600 dark:text-blue-400",
    tips: ["dashboard.tip1", "dashboard.tip2", "dashboard.tip3"]
  },
  {
    bgColor: "bg-indigo-50/50 dark:bg-indigo-900/10",
    accentColor: "text-indigo-600 dark:text-indigo-400",
    tips: ["dashboard.tip4", "dashboard.tip5", "dashboard.tip6"]
  },
  {
    bgColor: "bg-sky-50/50 dark:bg-sky-900/10",
    accentColor: "text-sky-600 dark:text-sky-400",
    tips: ["dashboard.tip7", "dashboard.tip8", "dashboard.tip9"]
  },
  {
    bgColor: "bg-cyan-50/50 dark:bg-cyan-900/10",
    accentColor: "text-cyan-600 dark:text-cyan-400",
    tips: ["dashboard.tip10", "dashboard.tip11", "dashboard.tip12"]
  },
  {
    bgColor: "bg-blue-100/30 dark:bg-blue-900/20",
    accentColor: "text-blue-700 dark:text-blue-300",
    tips: ["dashboard.tip13", "dashboard.tip14", "dashboard.tip15"]
  }
];

export default function DashboardPage() {
  const { t, language } = useLanguage();
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState<AssessmentHistory[]>([]);
  const [tipSetIndex, setTipSetIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setTipSetIndex((prev) => (prev + 1) % TIP_SETS.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser && db) {
        await fetchHistory(currentUser.uid);
      } else {
        setHistory([]);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const fetchHistory = async (uid: string) => {
    if (!db) return;
    try {
      const q = query(
        collection(db, "assessments"),
        where("userId", "==", uid),
        orderBy("timestamp", "desc"),
        limit(5)
      );
      const querySnapshot = await getDocs(q);
      const results: AssessmentHistory[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        results.push({ 
          id: doc.id, 
          mostSuitableStream: data.mostSuitableStream,
          compatibilityPercentage: data.fullOutput?.streamCompatibility?.find((s: any) => s.streamName === data.mostSuitableStream)?.compatibilityPercentage || 0,
          grades: data.grades,
          timestamp: data.timestamp 
        } as AssessmentHistory);
      });
      setHistory(results);
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  const handleLogin = async () => {
    if (!auth) return;
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const profileProgress = user ? (history.length > 0 ? 100 : 50) : 0;
  const latestResult = history.length > 0 ? history[0] : null;
  const currentTipSet = TIP_SETS[tipSetIndex];

  const formatDate = (timestamp: any) => {
    if (!mounted || !timestamp?.toDate) return "...";
    return timestamp.toDate().toLocaleDateString(undefined, { dateStyle: 'medium' });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-headline font-bold flex items-center gap-2">
              <LayoutDashboard className="text-primary" /> 
              {user ? `${t("dashboard.welcome")}, ${user.displayName?.split(' ')[0]}!` : t("nav.login")}
            </h1>
            <p className="text-muted-foreground mt-1">{t("dashboard.desc")}</p>
          </div>
          <Button asChild size="lg" className="rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-lg">
            <Link href="/assessment">
              <Sparkles className="mr-2" size={18} /> {t("dashboard.newAssessment")}
            </Link>
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-8">
            <div className="grid sm:grid-cols-2 gap-6">
              <Card className="border-none shadow-md bg-gradient-to-br from-primary/10 to-transparent border-t-4 border-primary overflow-hidden">
                <CardHeader className="pb-2">
                  <CardDescription className="text-primary font-bold uppercase text-xs tracking-widest">{t("dashboard.activeGoals")}</CardDescription>
                  <CardTitle className="text-2xl">
                    {latestResult ? latestResult.mostSuitableStream : (language === 'en' ? 'Target Stream' : 'Aliran Sasaran')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/20 rounded-xl text-primary">
                      <TrendingUp />
                    </div>
                    <p className="text-sm font-medium">
                      {latestResult 
                        ? (language === 'en' ? `Matched with ${latestResult.compatibilityPercentage}% accuracy.` : `Padanan dengan ketepatan ${latestResult.compatibilityPercentage}%.`)
                        : t("dashboard.goalDesc")
                      }
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md bg-gradient-to-br from-secondary/10 to-transparent border-t-4 border-secondary overflow-hidden">
                <CardHeader className="pb-2">
                  <CardDescription className="text-secondary font-bold uppercase text-xs tracking-widest">{language === 'en' ? 'Completion' : 'Kesempurnaan'}</CardDescription>
                  <CardTitle className="text-2xl text-secondary">{t("dashboard.profileProgress")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between text-sm">
                      <span>{language === 'en' ? 'Progress' : 'Kemajuan'}</span>
                      <span className="font-bold">{profileProgress}%</span>
                    </div>
                    <Progress value={profileProgress} className="h-2 bg-secondary/20" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Academic Profile Card */}
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <BookOpen size={20} /> {t("dashboard.academicProfile")}
                </CardTitle>
                <CardDescription>
                  {t("dashboard.latestGrades")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="py-8 flex justify-center">
                    <Loader2 className="animate-spin text-muted-foreground" />
                  </div>
                ) : !user ? (
                  <div className="py-8 text-center space-y-4 bg-muted/30 rounded-2xl border border-dashed">
                    <LogIn className="mx-auto text-muted-foreground mb-2" size={32} />
                    <p className="text-sm font-medium text-muted-foreground">
                      {t("dashboard.loginRequiredGrades")}
                    </p>
                    <Button onClick={handleLogin} variant="outline" size="sm" className="rounded-full">
                      {t("nav.login")}
                    </Button>
                  </div>
                ) : latestResult?.grades ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                    {Object.entries(latestResult.grades).map(([subject, grade]) => (
                      <div key={subject} className="bg-muted/50 p-3 rounded-xl border flex flex-col items-center gap-1 group hover:border-primary/50 transition-colors">
                        <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-tighter text-center line-clamp-1">
                          {t(`subject.${subject.toLowerCase()}`) || subject}
                        </span>
                        <span className="text-xl font-black text-primary group-hover:scale-110 transition-transform">
                          {grade}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center bg-muted/20 rounded-2xl">
                    <p className="text-sm text-muted-foreground italic">{t("dashboard.noGrades")}</p>
                    <Button asChild variant="link" className="mt-2 text-primary">
                      <Link href="/assessment">{t("dashboard.newAssessment")}</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-accent">
                  <History size={20} className="text-accent" /> {t("dashboard.history")}
                </CardTitle>
                <CardDescription>
                  {language === 'en' ? 'Track how your interests and recommendations evolve.' : 'Jejaki bagaimana minat dan syor anda berkembang.'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="py-12 flex justify-center">
                    <Loader2 className="animate-spin text-muted-foreground" />
                  </div>
                ) : !user ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto text-muted-foreground">
                      <LogIn size={32} />
                    </div>
                    <div className="space-y-2">
                      <p className="font-medium text-muted-foreground">
                        {language === 'en' ? "Please log in to view your assessment history." : "Sila log masuk untuk melihat sejarah penilaian anda."}
                      </p>
                      <Button onClick={handleLogin} variant="outline" className="rounded-full">
                        {t("nav.login")}
                      </Button>
                    </div>
                  </div>
                ) : history.length > 0 ? (
                  <div className="divide-y">
                    {history.map((item) => (
                      <div key={item.id} className="py-4 flex items-center justify-between group">
                        <div className="flex flex-col">
                          <span className="font-bold text-foreground group-hover:text-primary transition-colors">{item.mostSuitableStream}</span>
                          <span className="text-xs text-muted-foreground">
                            {formatDate(item.timestamp)}
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right hidden sm:block">
                            <span className="text-sm font-bold block text-primary">{Math.round(item.compatibilityPercentage)}% Match</span>
                            <span className="text-[10px] uppercase text-green-500 font-bold tracking-wider">{t("dashboard.high")}</span>
                          </div>
                          <Button variant="ghost" size="sm" asChild className="text-secondary hover:text-secondary hover:bg-secondary/10 rounded-full">
                            <Link href="/profile">
                              {t("dashboard.viewReport")} <ChevronRight size={14} className="ml-1" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center text-muted-foreground">
                    <p>{t("dashboard.noHistory")}</p>
                    <Button asChild variant="link" className="mt-2">
                      <Link href="/assessment">{t("dashboard.newAssessment")}</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col gap-6">
            <Card className={cn("border-none shadow-md transition-colors duration-1000 overflow-hidden", currentTipSet.bgColor)}>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Info size={18} className={currentTipSet.accentColor} /> 
                    {t("dashboard.quickTips")}
                  </div>
                  <div className="flex gap-1">
                    {TIP_SETS.map((_, i) => (
                      <div key={i} className={cn("w-1.5 h-1.5 rounded-full transition-all duration-300", i === tipSetIndex ? "bg-primary w-4" : "bg-muted-foreground/30")} />
                    ))}
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-4 animate-in fade-in slide-in-from-right-2 duration-700">
                {currentTipSet.tips.map((tipKey, i) => (
                  <div key={tipKey} className="flex gap-3 group">
                    <span className={cn("font-black text-xs mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 border border-current opacity-30 group-hover:opacity-100 transition-opacity", currentTipSet.accentColor)}>
                      {i + 1}
                    </span>
                    <p className="text-foreground/80 leading-snug font-medium">{t(tipKey)}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-none shadow-md overflow-hidden">
              <CardHeader>
                <CardTitle className="text-lg text-primary">{t("dashboard.needHelp")}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <p className="text-muted-foreground mb-4">{t("dashboard.contactCounselor")}</p>
                <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/10 rounded-xl">
                  {t("dashboard.schedule")}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
