"use client";

import Link from "next/link";
import { GraduationCap, User, BookOpen, LayoutDashboard, Menu, Share2, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/components/providers/LanguageProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const { language, setLanguage, t } = useLanguage();

  const navItems = [
    { label: t("nav.dashboard"), href: "/dashboard", icon: LayoutDashboard },
    { label: t("nav.assessment"), href: "/assessment", icon: GraduationCap },
    { label: t("nav.streams"), href: "/streams", icon: BookOpen },
    { label: t("nav.profile"), href: "/profile", icon: User },
  ];

  const handleSharePrototype = () => {
    const shareData = {
      title: 'HalaTuju Prototype',
      text: t("nav.share") + ': Check out this AI-powered academic stream guidance prototype!',
      url: typeof window !== 'undefined' ? window.location.origin : '',
    };

    if (navigator.share) {
      navigator.share(shareData).catch((err) => console.log('Error sharing', err));
    } else {
      navigator.clipboard.writeText(shareData.url);
      toast({
        title: language === 'en' ? "Link Copied" : "Pautan Disalin",
        description: language === 'en' ? "The prototype URL has been copied to your clipboard." : "URL prototaip telah disalin ke papan klip anda.",
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
          <span className="text-xl font-headline font-bold tracking-tight text-primary">HalaTuju</span>
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="rounded-full">
                  <Languages size={16} className="mr-2" />
                  {language === 'en' ? 'EN' : 'MS'}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage('en')}>English</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('ms')}>Bahasa Melayu</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="ghost" size="sm" onClick={handleSharePrototype} className="rounded-full text-muted-foreground hover:text-primary">
              <Share2 size={16} className="mr-2" /> {t("nav.share")}
            </Button>
            <Button variant="default" className="rounded-full px-6 shadow-md hover:shadow-lg transition-all" asChild>
              <Link href="/assessment">{t("nav.getStarted")}</Link>
            </Button>
          </div>
        </nav>

        {/* Mobile Nav */}
        <div className="md:hidden flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Languages size={20} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLanguage('en')}>English</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('ms')}>Bahasa Melayu</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

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
                    <Share2 size={18} className="mr-2" /> {t("nav.share")}
                  </Button>
                  <Button className="w-full" asChild onClick={() => setIsOpen(false)}>
                    <Link href="/assessment">{t("nav.getStarted")}</Link>
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
