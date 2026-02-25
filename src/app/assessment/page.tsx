
"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { INTEREST_CATEGORIES, STRENGTHS_LIST, AVAILABLE_STREAMS } from "@/app/lib/constants";
import { recommendStream, type RecommendStreamOutput } from "@/ai/flows/recommend-stream";
import { Brain, ArrowRight, ArrowLeft, CheckCircle2, Loader2, Sparkles, Share2 } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

export default function AssessmentPage() {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedStrengths, setSelectedStrengths] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<RecommendStreamOutput | null>(null);

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  };

  const toggleStrength = (strength: string) => {
    setSelectedStrengths(prev => 
      prev.includes(strength) ? prev.filter(s => s !== strength) : [...prev, strength]
    );
  };

  const handleShare = () => {
    if (result) {
      const match = Math.round(result.streamCompatibility.find(s => s.streamName === result.mostSuitableStream)?.compatibilityPercentage || 0);
      const text = `Hey! I just used StreamWise AI and it recommended the ${result.mostSuitableStream} stream for me with a ${match}% match! 🚀 Try it out:`;
      const url = window.location.origin;

      if (navigator.share) {
        navigator.share({
          title: 'My StreamWise Recommendation',
          text: text,
          url: url,
        }).catch(console.error);
      } else {
        navigator.clipboard.writeText(`${text} ${url}`);
        toast({
          title: "Copied to Clipboard",
          description: "Your results and link have been copied!",
        });
      }
    }
  };

  const handleSubmit = async () => {
    if (!name || selectedInterests.length === 0 || selectedStrengths.length === 0) {
      toast({
        title: "Incomplete Assessment",
        description: "Please fill in all sections before submitting.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const output = await recommendStream({
        studentName: name,
        interests: selectedInterests,
        strengths: selectedStrengths,
        availableStreams: AVAILABLE_STREAMS,
        assessmentResults: [
          { assessmentName: "Interest Survey", qualitativeResult: "Self-reported interests in academic and creative fields." },
          { assessmentName: "Strengths Profiler", qualitativeResult: "Identification of core personal and cognitive strengths." }
        ]
      });
      setResult(output);
      setStep(5);
    } catch (error) {
      console.error(error);
      toast({
        title: "Recommendation Failed",
        description: "An error occurred while processing your results. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12 max-w-3xl">
        <div className="mb-8 flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Assessment {step <= totalSteps ? `Step ${step}` : 'Complete'}</span>
            <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {step === 1 && (
          <Card className="border-none shadow-xl">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain size={32} />
              </div>
              <CardTitle className="text-2xl">Welcome to StreamWise Assessment</CardTitle>
              <CardDescription>Let's start by getting to know you. What's your name?</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Full Name</Label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="flex h-12 w-full rounded-md border border-input bg-background px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <Button onClick={() => setStep(2)} disabled={!name} className="w-full h-12 text-lg">
                Continue <ArrowRight className="ml-2" />
              </Button>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card className="border-none shadow-xl">
            <CardHeader>
              <CardTitle>Your Interests</CardTitle>
              <CardDescription>Select everything that excites or interests you.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {INTEREST_CATEGORIES.map((item) => (
                  <div key={item} className="flex items-center space-x-3 p-4 rounded-xl border hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => toggleInterest(item)}>
                    <Checkbox id={item} checked={selectedInterests.includes(item)} onCheckedChange={() => toggleInterest(item)} />
                    <Label htmlFor={item} className="cursor-pointer font-medium leading-tight">{item}</Label>
                  </div>
                ))}
              </div>
              <div className="flex gap-4 mt-6">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                  <ArrowLeft className="mr-2" /> Back
                </Button>
                <Button onClick={() => setStep(3)} disabled={selectedInterests.length === 0} className="flex-1">
                  Next <ArrowRight className="ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 3 && (
          <Card className="border-none shadow-xl">
            <CardHeader>
              <CardTitle>Your Strengths</CardTitle>
              <CardDescription>What are you naturally good at? Choose at least 3.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-3">
                {STRENGTHS_LIST.map((item) => (
                  <div key={item} className="flex items-center space-x-3 p-4 rounded-xl border hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => toggleStrength(item)}>
                    <Checkbox id={item} checked={selectedStrengths.includes(item)} onCheckedChange={() => toggleStrength(item)} />
                    <Label htmlFor={item} className="cursor-pointer font-medium">{item}</Label>
                  </div>
                ))}
              </div>
              <div className="flex gap-4 mt-6">
                <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                  <ArrowLeft className="mr-2" /> Back
                </Button>
                <Button onClick={() => setStep(4)} disabled={selectedStrengths.length < 3} className="flex-1">
                  Next <ArrowRight className="ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 4 && (
          <Card className="border-none shadow-xl">
            <CardHeader className="text-center">
              <CardTitle>Ready for Result?</CardTitle>
              <CardDescription>We've gathered enough info to analyze your profile using our AI compatibility engine.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-6 text-center">
              <div className="p-6 bg-muted rounded-2xl">
                <h4 className="font-bold mb-2">Summary for {name}</h4>
                <p className="text-sm text-muted-foreground">{selectedInterests.length} Interests selected</p>
                <p className="text-sm text-muted-foreground">{selectedStrengths.length} Strengths identified</p>
              </div>
              
              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setStep(3)} className="flex-1">
                  <ArrowLeft className="mr-2" /> Back
                </Button>
                <Button onClick={handleSubmit} className="flex-1 bg-secondary hover:bg-secondary/90" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <><Loader2 className="mr-2 animate-spin" /> Analyzing...</>
                  ) : (
                    <><Sparkles className="mr-2" /> Generate Recommendation</>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 5 && result && (
          <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Card className="border-none shadow-2xl bg-gradient-to-br from-primary to-secondary text-primary-foreground overflow-hidden">
              <CardHeader className="text-center pb-2 relative">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-4 top-4 rounded-full bg-white/10 hover:bg-white/20 text-white"
                  onClick={handleShare}
                >
                  <Share2 size={20} />
                </Button>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider mx-auto mb-2">
                  Top Recommendation
                </div>
                <CardTitle className="text-3xl md:text-4xl">{result.mostSuitableStream}</CardTitle>
              </CardHeader>
              <CardContent className="text-center pt-0">
                <div className="text-5xl font-bold mb-6">
                  {Math.round(result.streamCompatibility.find(s => s.streamName === result.mostSuitableStream)?.compatibilityPercentage || 0)}%
                  <span className="text-xl font-normal opacity-80 ml-1">Match</span>
                </div>
                <p className="text-lg leading-relaxed opacity-90 max-w-xl mx-auto italic">
                  "{result.keyInsights}"
                </p>
              </CardContent>
            </Card>

            <div className="grid gap-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <CheckCircle2 className="text-secondary" /> Other Stream Compatibility
              </h3>
              <div className="grid gap-4">
                {result.streamCompatibility
                  .filter(s => s.streamName !== result.mostSuitableStream)
                  .sort((a, b) => b.compatibilityPercentage - a.compatibilityPercentage)
                  .map((stream) => (
                  <div key={stream.streamName} className="bg-background p-4 rounded-xl border shadow-sm flex items-center justify-between">
                    <div>
                      <h4 className="font-bold">{stream.streamName}</h4>
                    </div>
                    <div className="flex items-center gap-4">
                      <Progress value={stream.compatibilityPercentage} className="w-24 h-2" />
                      <span className="font-bold text-muted-foreground">{Math.round(stream.compatibilityPercentage)}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button onClick={handleShare} variant="outline" size="lg" className="flex-1 rounded-full">
                <Share2 className="mr-2" size={18} /> Share Results
              </Button>
              <Button asChild size="lg" className="flex-1 rounded-full">
                <Link href="/dashboard">View Dashboard</Link>
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
