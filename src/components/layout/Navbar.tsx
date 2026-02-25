"use client";

import Link from "next/link";
import { GraduationCap, User, BookOpen, LayoutDashboard, Menu, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Assessment", href: "/assessment", icon: GraduationCap },
    { label: "Streams", href: "/streams", icon: BookOpen },
    { label: "Profile", href: "/profile", icon: User },
  ];

  const handleSharePrototype = () => {
    const shareData = {
      title: 'StreamWise Prototype',
      text: 'Check out this AI-powered academic stream guidance prototype! It helps Form 3 students find their future Form 4 stream.',
      url: typeof window !== 'undefined' ? window.location.origin : '',
    };

    if (navigator.share) {
      navigator.share(shareData).catch((err) => console.log('Error sharing', err));
    } else {
      navigator.clipboard.writeText(shareData.url);
      toast({
        title: "Link Copied",
        description: "The prototype URL has been copied to your clipboard. Share it with your friends!",
      });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
            <GraduationCap size={24} />
          </div>
          <span className="text-xl font-headline font-bold tracking-tight text-primary">StreamWise</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
            >
              <item.icon size={16} />
              {item.label}
            </Link>
          ))}
          <div className="flex items-center gap-2 ml-4">
            <Button variant="ghost" size="sm" onClick={handleSharePrototype} className="rounded-full text-muted-foreground hover:text-primary">
              <Share2 size={16} className="mr-2" /> Share Prototype
            </Button>
            <Button variant="default" className="rounded-full px-6 shadow-md hover:shadow-lg transition-all" asChild>
              <Link href="/assessment">Get Started</Link>
            </Button>
          </div>
        </nav>

        {/* Mobile Nav */}
        <div className="md:hidden flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={handleSharePrototype}>
            <Share2 size={20} />
          </Button>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 mt-10">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium flex items-center gap-3 text-muted-foreground hover:text-primary"
                  >
                    <item.icon size={20} />
                    {item.label}
                  </Link>
                ))}
                <div className="pt-6 border-t flex flex-col gap-4">
                  <Button variant="outline" className="w-full" onClick={handleSharePrototype}>
                    <Share2 size={18} className="mr-2" /> Share Prototype
                  </Button>
                  <Button className="w-full" asChild onClick={() => setIsOpen(false)}>
                    <Link href="/assessment">Get Started</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
