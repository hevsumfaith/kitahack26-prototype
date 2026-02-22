
import { Navbar } from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { LayoutDashboard, History, Sparkles, TrendingUp, Info } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  // Mock data for a "previous session"
  const history = [
    { date: "Oct 24, 2024", stream: "Pure Science", compatibility: 88 },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-headline font-bold flex items-center gap-2">
              <LayoutDashboard className="text-primary" /> Welcome back, Student!
            </h1>
            <p className="text-muted-foreground mt-1">Here's an overview of your academic stream planning.</p>
          </div>
          <Button asChild size="lg" className="rounded-full">
            <Link href="/assessment">
              <Sparkles className="mr-2" size={18} /> Take New Assessment
            </Link>
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Stats */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            <div className="grid sm:grid-cols-2 gap-6">
              <Card className="border-none shadow-md bg-gradient-to-br from-primary/10 to-transparent">
                <CardHeader className="pb-2">
                  <CardDescription className="text-primary font-bold uppercase text-xs tracking-widest">Active Goals</CardDescription>
                  <CardTitle className="text-2xl">Form 4 Stream</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/20 rounded-xl text-primary">
                      <TrendingUp />
                    </div>
                    <p className="text-sm font-medium">You haven't locked in a preference yet. Take the assessment to start!</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md">
                <CardHeader className="pb-2">
                  <CardDescription className="font-bold uppercase text-xs tracking-widest">Completion</CardDescription>
                  <CardTitle className="text-2xl">Profile Setup</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
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
                  <History size={20} className="text-muted-foreground" /> Assessment History
                </CardTitle>
                <CardDescription>Track how your interests and recommendations evolve.</CardDescription>
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
                            <span className="text-sm font-bold block">{item.compatibility}% Match</span>
                            <span className="text-[10px] uppercase text-green-500 font-bold tracking-wider">High</span>
                          </div>
                          <Button variant="ghost" size="sm" asChild>
                            <Link href="/assessment">View Report</Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center text-muted-foreground">
                    <p>No assessment history yet.</p>
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
                  <Info size={18} /> Quick Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-4">
                <p><strong>1. Honesty is key:</strong> Answer assessment questions based on what you love, not what others expect.</p>
                <p><strong>2. Career First:</strong> Think about what you want to be when you grow up. Different streams lead to different professions.</p>
                <p><strong>3. Talk to Experts:</strong> Use your StreamWise report to start a conversation with your parents or school counselors.</p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <p className="text-muted-foreground mb-4">Contact our educational counselors for a personalized 1-on-1 session.</p>
                <Button variant="outline" className="w-full">Schedule a Call</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
