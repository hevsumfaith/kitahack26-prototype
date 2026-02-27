
"use client";

import Navbar from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AVAILABLE_STREAMS } from "@/app/lib/constants";
import { BookOpen, Briefcase, GraduationCap } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function StreamsPage() {
  const { t, language } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-headline font-bold mb-4">{t("streams.title")}</h1>
          <p className="text-muted-foreground text-lg">
            {t("streams.desc")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {AVAILABLE_STREAMS.map((stream) => {
            // Find the image by stream ID, or fallback to hero if not found
            const streamImg = PlaceHolderImages.find(img => img.id === stream.id) || PlaceHolderImages[0];
            
            return (
              <Card key={stream.id} className="flex flex-col h-full overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="h-56 relative overflow-hidden">
                  <Image 
                    src={streamImg.imageUrl} 
                    alt={stream.streamName[language]}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    data-ai-hint={streamImg.imageHint}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-6 left-6">
                    <CardTitle className="text-white text-2xl font-bold">{stream.streamName[language]}</CardTitle>
                  </div>
                </div>
                
                <CardContent className="p-8 flex flex-col gap-6 flex-grow bg-card">
                  <p className="text-muted-foreground leading-relaxed">
                    {stream.description[language]}
                  </p>

                  <div className="space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                      <BookOpen size={16} /> {t("streams.subjects")}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {stream.subjects[language].map(subject => (
                        <Badge key={subject} variant="secondary" className="bg-primary/10 hover:bg-primary/20 text-primary border-none px-3 py-1">
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4 mt-auto pt-6 border-t border-dashed">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-secondary flex items-center gap-2">
                      <Briefcase size={16} /> {t("streams.careers")}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {stream.careerPaths[language].map(career => (
                        <Badge key={career} variant="outline" className="border-secondary/30 text-secondary font-medium px-3 py-1">
                          {career}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
        
        <div className="mt-20 bg-primary/5 p-10 rounded-3xl flex flex-col md:flex-row items-center gap-10 border border-primary/10">
          <div className="w-20 h-20 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
            <GraduationCap size={40} />
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-2 text-primary">{t("streams.noteTitle")}</h3>
            <p className="text-muted-foreground leading-relaxed">
              {t("streams.noteDesc")}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
