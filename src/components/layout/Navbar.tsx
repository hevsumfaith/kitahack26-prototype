
"use client";

import Link from "next/link";
import { GraduationCap, User, BookOpen, LayoutDashboard, Menu, Share2, Languages, Sun, Moon, LogIn, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useTheme } from "@/components/providers/ThemeProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { auth } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User as FirebaseUser } from "firebase/auth";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const { toast } = useToast();
  const { language, setLanguage, t } = useLanguage();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (!auth) return;
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    if (!auth) {
      toast({
        title: language === 'en' ? "Configuration Missing" : "Konfigurasi Hilang",
        description: language === 'en' ? "Firebase is not configured yet. Please add your credentials." : "Firebase belum dikonfigurasi. Sila masukkan kelayakan anda.",
        variant: "destructive",
      });
      return;
    }
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast({
        title: language === 'en' ? "Welcome!" : "Selamat Datang!",
        description: language === 'en' ? "You have successfully logged in." : "Anda telah berjaya log masuk.",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: language === 'en' ? "Login Failed" : "Log Masuk Gagal",
        description: language === 'en' ? "Could not sign in with Google." : "Tidak dapat log masuk dengan Google.",
        variant: "destructive",
      });
    }
  };

  const handleLogout = async () => {
    if (!auth) return;
    try {
      await signOut(auth);
      toast({
        title: language === 'en' ? "Logged Out" : "Log Keluar",
        description: language === 'en' ? "See you again soon!" : "Jumpa lagi nanti!",
      });
    } catch (error) {
      console.error(error);
    }
  };

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
            < GraduationCap size={24} />
          </div>
          <span className="text-xl font-headline font-bold tracking-tight text-primary">HalaTuju</span>
        </Link>

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
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="rounded-full text-muted-foreground hover:text-primary"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </Button>

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
            
            {user ? (
              <Button variant="outline" size="sm" onClick={handleLogout} className="rounded-full">
                <LogOut size={16} className="mr-2" /> {t("nav.logout")}
              </Button>
            ) : (
              <Button variant="default" size="sm" onClick={handleLogin} className="rounded-full px-6 shadow-md hover:shadow-lg transition-all">
                <LogIn size={16} className="mr-2" /> {t("nav.login")}
              </Button>
            )}
          </div>
        </nav>

        <div className="md:hidden flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </Button>

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
                  {user ? (
                    <Button variant="outline" className="w-full" onClick={handleLogout}>
                      <LogOut size={18} className="mr-2" /> {t("nav.logout")}
                    </Button>
                  ) : (
                    <Button className="w-full" onClick={handleLogin}>
                      <LogIn size={18} className="mr-2" /> {t("nav.login")}
                    </Button>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
