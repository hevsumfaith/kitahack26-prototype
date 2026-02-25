"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { LayoutDashboard, History, Sparkles, TrendingUp, Info } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function DashboardPage() {
  const { t, language } = useLanguage();
  // Mock data for a "previous session"
  const history = [
    { date: "Oct 24, 2024", stream: language === 'en' ? "Pure Science" : "Sains Tulen", compatibility: 88 },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-headline font-bold flex items-center gap-2">
              <LayoutDashboard className="text-primary" /> {t("dashboard.welcome")}, Student!
            </h1>
            <p className="text-muted-foreground mt-1">{t("dashboard.desc")}</p>
          </div>
          <Button asChild size="lg" className="rounded-full">
            <Link href="/assessment">
              <Sparkles className="mr-2" size={18} /> {t("dashboard.newAssessment")}
            </Link>
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Stats */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            <div className="grid sm:grid-cols-2 gap-6">
              <Card className="border-none shadow-md bg-gradient-to-br from-primary/10 to-transparent">
                <CardHeader className="pb-2">
                  <CardDescription className="text-primary font-bold uppercase text-xs tracking-widest">{t("dashboard.activeGoals")}</CardDescription>
                  <CardTitle className="text-2xl">{language === 'en' ? 'Form 4 Stream' : 'Aliran Tingkatan 4'}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/20 rounded-xl text-primary">
                      <TrendingUp />
                    </div>
                    <p className="text-sm font-medium">{t("dashboard.goalDesc")}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md">
                <CardHeader className="pb-2">
                  <CardDescription className="font-bold uppercase text-xs tracking-widest">{language === 'en' ? 'Completion' : 'Kesempurnaan'}</CardDescription>
                  <CardTitle className="text-2xl">{t("dashboard.profileProgress")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between text-sm">
                      <span>{language === 'en' ? 'Progress' : 'Kemajuan'}</span>
                      <span className="font-bold">60%</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Assessment History */}
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History size={20} className="text-muted-foreground" /> {t("dashboard.history")}
                </CardTitle>
                <CardDescription>
                  {language === 'en' ? 'Track how your interests and recommendations evolve.' : 'Jejaki bagaimana minat dan syor anda berkembang.'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {history.length > 0 ? (
                  <div className="divide-y">
                    {history.map((item, i) => (
                      <div key={i} className="py-4 flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="font-bold">{item.stream}</span>
                          <span className="text-xs text-muted-foreground">{item.date}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <span className="text-sm font-bold block">{item.compatibility}% {t("assessment.match")}</span>
                            <span className="text-[10px] uppercase text-green-500 font-bold tracking-wider">{t("dashboard.high")}</span>
                          </div>
                          <Button variant="ghost" size="sm" asChild>
                            <Link href="/assessment">{t("dashboard.viewReport")}</Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center text-muted-foreground">
                    <p>{t("dashboard.noHistory")}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar / Quick Info */}
          <div className="flex flex-col gap-6">
            <Card className="border-none shadow-md bg-secondary text-secondary-foreground">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Info size={18} /> {t("dashboard.quickTips")}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-4">
                <p><strong>1.</strong> {t("dashboard.tip1")}</p>
                <p><strong>2.</strong> {t("dashboard.tip2")}</p>
                <p><strong>3.</strong> {t("dashboard.tip3")}</p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">{t("dashboard.needHelp")}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <p className="text-muted-foreground mb-4">{t("dashboard.contactCounselor")}</p>
                <Button variant="outline" className="w-full">{t("dashboard.schedule")}</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
