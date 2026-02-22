
import { Navbar } from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AVAILABLE_STREAMS } from "@/app/lib/constants";
import { BookOpen, Briefcase, GraduationCap } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function StreamsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-headline font-bold mb-4">Form 4 Academic Streams</h1>
          <p className="text-muted-foreground text-lg">
            Understand the subjects, requirements, and future opportunities associated with each stream available in Malaysian secondary schools.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {AVAILABLE_STREAMS.map((stream, idx) => {
            const streamImg = PlaceHolderImages.find(img => img.id.includes(stream.streamName.toLowerCase().split(' ')[0])) || PlaceHolderImages[idx % 3 + 1];
            
            return (
              <Card key={stream.streamName} className="flex flex-col h-full overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow">
                <div className="h-48 relative">
                  <Image 
                    src={streamImg.imageUrl} 
                    alt={stream.streamName}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <CardTitle className="text-white">{stream.streamName}</CardTitle>
                  </div>
                </div>
                
                <CardContent className="p-6 flex flex-col gap-6 flex-grow">
                  <p className="text-muted-foreground text-sm line-clamp-3">
                    {stream.description}
                  </p>

                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-2">
                      <BookOpen size={14} /> Core Subjects
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {stream.subjects.map(subject => (
                        <Badge key={subject} variant="secondary" className="bg-primary/5 hover:bg-primary/10 text-primary border-none">
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3 mt-auto pt-4 border-t border-dashed">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-secondary flex items-center gap-2">
                      <Briefcase size={14} /> Career Paths
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {stream.careerPaths?.map(career => (
                        <Badge key={career} variant="outline" className="border-secondary text-secondary font-medium">
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
        
        <div className="mt-20 bg-primary/5 p-10 rounded-3xl flex flex-col md:flex-row items-center gap-10">
          <div className="w-20 h-20 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center shrink-0">
            <GraduationCap size={40} />
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-2">Important Note on Requirements</h3>
            <p className="text-muted-foreground">
              While StreamWise helps match your interest and potential, schools still look at your PBD (Pentaksiran Bilik Darjah) results and teacher recommendations for final placement. Always discuss your results with your school counselor.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
