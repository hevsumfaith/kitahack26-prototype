
"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, User as FirebaseUser, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Loader2, Calendar, Award, LogIn, ChevronRight } from "lucide-react";
import Link from "next/link";

interface AssessmentHistory {
  id: string;
  mostSuitableStream: string;
  compatibilityPercentage: number;
  timestamp: any;
}

export default function ProfilePage() {
  const { t, language } = useLanguage();
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState<AssessmentHistory[]>([]);

  useEffect(() => {
    if (!auth) {
        setLoading(false);
        return;
    }
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser && db) {
        await fetchHistory(currentUser.uid);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const fetchHistory = async (uid: string) => {
    if (!db) return;
    const q = query(
      collection(db, "assessments"),
      where("userId", "==", uid),
      orderBy("timestamp", "desc")
    );
    const querySnapshot = await getDocs(q);
    const results: AssessmentHistory[] = [];
    querySnapshot.forEach((doc) => {
      results.push({ id: doc.id, ...doc.data() } as AssessmentHistory);
    });
    setHistory(results);
  };

  /**
   * EDIT THIS FUNCTION to change the login popup on the profile page.
   */
  const handleLogin = async () => {
    if (!auth) return;
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <Loader2 className="animate-spin text-primary" size={48} />
        </main>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-20 text-center">
          {/* Custom Popup/Dialog for non-logged in users */}
          <Card className="max-w-md mx-auto border-none shadow-xl p-8">
            <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <LogIn size={40} />
            </div>
            <h2 className="text-2xl font-bold mb-4">{t("profile.noUser")}</h2>
            <Button onClick={handleLogin} className="w-full h-12 text-lg">
              <LogIn className="mr-2" size={20} /> {t("nav.login")}
            </Button>
          </Card>
        </main>
      </div>
    );
  }

  const progressRate = history.length > 0 ? 100 : 50;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12 max-w-4xl">
        <header className="flex flex-col md:flex-row items-center gap-8 mb-12">
          <div className="relative">
            <Avatar className="w-32 h-32 border-4 border-primary/20">
              <AvatarImage src={user.photoURL || ""} />
              <AvatarFallback className="text-3xl bg-secondary text-white">
                {user.displayName?.charAt(0) || user.email?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-2 -right-2 bg-accent text-white p-2 rounded-full shadow-lg">
              <Award size={20} />
            </div>
          </div>
          
          <div className="text-center md:text-left flex-grow">
            <h1 className="text-3xl font-bold mb-1">{user.displayName}</h1>
            <p className="text-muted-foreground mb-4">{user.email}</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <div className="bg-secondary/10 px-4 py-2 rounded-full text-secondary text-sm font-semibold flex items-center gap-2">
                <Calendar size={16} /> Joined {user.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'Recently'}
              </div>
            </div>
          </div>
        </header>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1 space-y-6">
            <Card className="border-none shadow-md overflow-hidden">
              <CardHeader className="bg-primary/5">
                <CardTitle className="text-lg">{t("profile.completion")}</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="text-center mb-6">
                  <span className="text-4xl font-bold text-primary">{progressRate}%</span>
                </div>
                <Progress value={progressRate} className="h-2 mb-4" />
                <p className="text-sm text-muted-foreground text-center">
                  {progressRate < 100 
                    ? (language === 'en' ? 'Complete your assessment to reach 100%!' : 'Lengkapkan penilaian anda untuk mencapai 100%!')
                    : (language === 'en' ? 'Your profile is fully optimized!' : 'Profil anda telah dioptimumkan sepenuhnya!')}
                </p>
              </CardContent>
            </Card>

            <Button asChild variant="outline" className="w-full border-primary text-primary hover:bg-primary/5">
              <Link href="/assessment">{t("dashboard.newAssessment")}</Link>
            </Button>
          </div>

          <div className="md:col-span-2">
            <Card className="border-none shadow-md h-full">
              <CardHeader>
                <CardTitle>{t("profile.recentResults")}</CardTitle>
                <CardDescription>
                  {language === 'en' ? 'Historical overview of your academic pathway analysis.' : 'Gambaran keseluruhan sejarah analisis laluan akademik anda.'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {history.length > 0 ? (
                  <div className="space-y-4">
                    {history.map((item) => (
                      <div key={item.id} className="p-4 rounded-xl border border-border/50 hover:border-primary/30 transition-colors bg-muted/20">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-bold text-primary">{item.mostSuitableStream}</h4>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                              <Calendar size={12} /> {item.timestamp?.toDate ? item.timestamp.toDate().toLocaleDateString() : "Just now"}
                            </p>
                          </div>
                          <div className="text-right">
                            <span className="text-lg font-bold text-secondary">{Math.round(item.compatibilityPercentage)}%</span>
                            <p className="text-[10px] uppercase font-bold text-muted-foreground">{t("assessment.match")}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="w-full mt-2 text-xs text-secondary hover:text-secondary-foreground hover:bg-secondary/10 flex justify-between items-center group">
                          {t("profile.viewDetails")}
                          <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-20 text-center">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4 text-muted-foreground">
                      <ChevronRight size={32} />
                    </div>
                    <p className="text-muted-foreground">{t("dashboard.noHistory")}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
