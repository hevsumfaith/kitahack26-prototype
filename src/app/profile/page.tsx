"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, User as FirebaseUser, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { collection, query, where, getDocs, orderBy, limit } from "firebase/firestore";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Loader2, Calendar, Award, LogIn, ChevronRight, Mail, User, ShieldCheck } from "lucide-react";
import Link from "next/link";

interface AssessmentRecord {
  id: string;
  mostSuitableStream: string;
  personalityProfile: string;
  timestamp: any;
  fullOutput: {
    streamCompatibility: Array<{ streamName: string; compatibilityPercentage: number }>;
  };
}

export default function ProfilePage() {
  const { t, language } = useLanguage();
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState<AssessmentRecord[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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
        limit(10)
      );
      const querySnapshot = await getDocs(q);
      const results: AssessmentRecord[] = [];
      querySnapshot.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() } as AssessmentRecord);
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

  const formatDate = (timestamp: any) => {
    if (!mounted || !timestamp?.toDate) return "...";
    return timestamp.toDate().toLocaleDateString(undefined, { dateStyle: 'medium' });
  };

  const formatJoinedDate = (creationTime: string | undefined) => {
    if (!mounted || !creationTime) return "Recently";
    return new Date(creationTime).toLocaleDateString(undefined, { month: 'short', year: 'numeric' });
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex items-center justify-center bg-background">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="animate-spin text-primary" size={48} />
            <p className="text-muted-foreground font-medium">Syncing with Oracle...</p>
          </div>
        </main>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-20 text-center">
          <Card className="max-w-md mx-auto border-none shadow-2xl p-10 bg-card">
            <div className="w-24 h-24 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-8">
              <LogIn size={48} />
            </div>
            <h2 className="text-3xl font-headline font-bold mb-4">{t("profile.noUser")}</h2>
            <p className="text-muted-foreground mb-8">
              Log in to save your career assessment history and unlock personalized dashboard insights.
            </p>
            <Button onClick={handleLogin} className="w-full h-14 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all">
              <LogIn className="mr-2" size={20} /> {t("nav.login")}
            </Button>
          </Card>
        </main>
      </div>
    );
  }

  const completionProgress = history.length > 0 ? 100 : 50;
  const latestAssessment = history[0];

  return (
    <div className="flex flex-col min-h-screen bg-background/50">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12 max-w-5xl">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Profile Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-none shadow-xl overflow-hidden bg-card">
              <div className="h-24 bg-gradient-to-r from-primary to-secondary" />
              <CardContent className="pt-0 -mt-12 text-center relative z-10">
                <Avatar className="w-24 h-24 border-4 border-background mx-auto shadow-lg mb-4">
                  <AvatarImage src={user.photoURL || ""} />
                  <AvatarFallback className="text-2xl bg-secondary text-white font-bold">
                    {user.displayName?.charAt(0) || user.email?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1 mb-6">
                  <h1 className="text-2xl font-bold text-foreground">{user.displayName}</h1>
                  <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                    <Mail size={14} /> {user.email}
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 border-t pt-6">
                  <div className="text-center">
                    <p className="text-2xl font-black text-primary">{history.length}</p>
                    <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Tests Taken</p>
                  </div>
                  <div className="text-center border-l">
                    <p className="text-2xl font-black text-secondary">1</p>
                    <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Active Plan</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-xl bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <ShieldCheck size={18} className="text-accent" /> {t("profile.completion")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-3xl font-black text-primary">{completionProgress}%</span>
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Status: {completionProgress === 100 ? 'Verified' : 'Incomplete'}</span>
                </div>
                <Progress value={completionProgress} className="h-3 rounded-full" />
                <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
                  {completionProgress < 100 
                    ? "Complete at least one assessment to verify your interest profile." 
                    : "Your academic profile is synchronized and verified by the Oracle."}
                </p>
              </CardContent>
            </Card>

            <Button asChild size="lg" className="w-full h-14 rounded-xl text-lg shadow-lg">
              <Link href="/assessment">
                {t("dashboard.newAssessment")}
              </Link>
            </Button>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-headline font-bold text-foreground">{t("profile.recentResults")}</h2>
              <div className="flex gap-2">
                <div className="bg-secondary/10 px-3 py-1 rounded-full text-secondary text-xs font-bold flex items-center gap-1">
                  <Calendar size={12} /> Joined {formatJoinedDate(user.metadata.creationTime)}
                </div>
              </div>
            </div>

            {history.length > 0 ? (
              <div className="grid gap-4">
                {history.map((item) => (
                  <Card key={item.id} className="border-none shadow-md hover:shadow-lg transition-all group bg-card border-l-4 border-l-transparent hover:border-l-primary overflow-hidden">
                    <CardContent className="p-0">
                      <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                            <Award size={24} />
                          </div>
                          <div className="space-y-1">
                            <h4 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                              {item.mostSuitableStream}
                            </h4>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                              <span className="font-medium">"{item.personalityProfile}"</span>
                              <span>•</span>
                              <span>{formatDate(item.timestamp)}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-4 sm:pt-0">
                          <div className="text-right flex-grow sm:flex-grow-0">
                            <span className="text-2xl font-black text-secondary">
                              {item.fullOutput?.streamCompatibility?.find(s => s.streamName === item.mostSuitableStream)?.compatibilityPercentage || 0}%
                            </span>
                            <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-tighter">Match Score</p>
                          </div>
                          <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 text-primary">
                            <ChevronRight />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="border-2 border-dashed border-muted bg-transparent py-20">
                <CardContent className="flex flex-col items-center text-center gap-6">
                  <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center text-muted-foreground">
                    <User size={40} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">{t("dashboard.noHistory")}</h3>
                    <p className="text-muted-foreground max-w-sm">Your assessment history is empty. Take your first test to see your career results here.</p>
                  </div>
                  <Button asChild variant="outline" className="rounded-full px-8">
                    <Link href="/assessment">{t("dashboard.newAssessment")}</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
            
            {/* Quick Stats Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              <Card className="border-none shadow-md bg-gradient-to-br from-indigo-500/5 to-transparent">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-bold uppercase tracking-widest text-indigo-500">Academic Focus</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {latestAssessment 
                      ? `Based on your last test, you show a strong inclination towards ${latestAssessment.mostSuitableStream} subjects.`
                      : "We need more data to determine your core academic strengths. Take an assessment to find out!"
                    }
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-none shadow-md bg-gradient-to-br from-emerald-500/5 to-transparent">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-bold uppercase tracking-widest text-emerald-500">Social Style</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {latestAssessment 
                      ? `Your profile "${latestAssessment.personalityProfile}" suggests a unique approach to teamwork and communication.`
                      : "Unlock your social battery analysis by completing the Interest & Social section of the test."
                    }
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
