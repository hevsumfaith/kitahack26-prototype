"use client";

import Link from "next/link";
import Image from "next/image";
import { GraduationCap, Brain, Compass, Target, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function Home() {
  const { t } = useLanguage();
  const heroImage = PlaceHolderImages.find(img => img.id === "hero-student");

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 overflow-hidden bg-background">
          <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 flex flex-col gap-6 text-center lg:text-left z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-semibold w-fit mx-auto lg:mx-0">
                <Target size={16} />
                {t("hero.badge")}
              </div>
              <h1 className="text-4xl md:text-6xl font-headline font-bold leading-tight">
                {t("hero.title")} <span className="text-primary">{t("hero.subtitle")}</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0">
                {t("hero.desc")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" asChild className="rounded-full px-8 bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Link href="/assessment">
                    {t("hero.cta")} <ArrowRight className="ml-2" size={18} />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="rounded-full px-8 border-secondary text-secondary hover:bg-secondary/10">
                  <Link href="/streams">{t("hero.explore")}</Link>
                </Button>
              </div>
            </div>
            
            <div className="lg:w-1/2 relative">
              <div className="absolute -inset-4 bg-secondary/10 rounded-3xl blur-2xl transform rotate-3"></div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src={heroImage?.imageUrl || "https://picsum.photos/seed/student-future/800/600"}
                  alt={heroImage?.description || "Student thinking about future"}
                  width={800}
                  height={600}
                  className="object-cover"
                  priority
                  data-ai-hint="student education"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-headline font-bold mb-4">{t("features.title")}</h2>
              <p className="text-muted-foreground">{t("features.desc")}</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: t("features.smart.title"),
                  desc: t("features.smart.desc"),
                  icon: Brain,
                  color: "bg-secondary/10 text-secondary"
                },
                {
                  title: t("features.ai.title"),
                  desc: t("features.ai.desc"),
                  icon: Compass,
                  color: "bg-accent/10 text-accent"
                },
                {
                  title: t("features.career.title"),
                  desc: t("features.career.desc"),
                  icon: GraduationCap,
                  color: "bg-primary/10 text-primary"
                }
              ].map((feature, i) => (
                <div key={i} className="bg-background p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center gap-4 border-b-4 border-transparent hover:border-secondary transition-all">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${feature.color}`}>
                    <feature.icon size={32} />
                  </div>
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-background py-10">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center text-primary-foreground">
              < GraduationCap size={16} />
            </div>
            <span className="font-headline font-bold text-primary">HalaTuju</span>
          </div>
          <p className="text-sm text-muted-foreground">{t("footer.rights")}</p>
          <div className="flex gap-6">
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">{t("footer.privacy")}</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">{t("footer.terms")}</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}