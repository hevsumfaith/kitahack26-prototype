"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  GraduationCap, 
  LayoutDashboard, 
  BookOpen, 
  User, 
  Sun, 
  Moon, 
  Languages, 
  LogOut, 
  LogIn,
  Menu,
  Mail,
  Lock,
  ArrowLeft,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useTheme } from "@/components/providers/ThemeProvider";

// Firebase Imports
import { auth } from "@/lib/firebase";
import { 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged, 
  User as FirebaseUser,
  signInWithEmailAndPassword
} from "firebase/auth";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authView, setAuthView] = useState<'options' | 'email'>('options');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthLoading, setIsAuthLoading] = useState(false);
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

  const handleGoogleLogin = async () => {
    if (!auth) {
      toast({
        title: language === 'en' ? "Setup Required" : "Persediaan Diperlukan",
        description: language === 'en' 
          ? "Please add your Firebase API keys to the .env file." 
          : "Sila tambah kunci API Firebase anda ke fail .env.",
        variant: "destructive",
      });
      return;
    }

    setIsAuthLoading(true);
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    try {
      await signInWithPopup(auth, provider);
      setIsAuthModalOpen(false);
      toast({
        title: language === 'en' ? "Welcome!" : "Selamat Datang!",
        description: language === 'en' ? "Successfully logged in with Google." : "Berjaya log masuk dengan Google.",
      });
    } catch (error: any) {
      console.error(error);
      toast({
        title: language === 'en' ? "Login Failed" : "Log Masuk Gagal",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth) return;

    setIsAuthLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsAuthModalOpen(false);
      setAuthView('options');
      setEmail('');
      setPassword('');
      toast({
        title: language === 'en' ? "Welcome back!" : "Selamat kembali!",
        description: language === 'en' ? "Successfully logged in." : "Berjaya log masuk.",
      });
    } catch (error: any) {
      toast({
        title: language === 'en' ? "Auth Error" : "Ralat Autentikasi",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleCreateAccount = () => {
    toast({
      title: language === 'en' ? "Testing Mode" : "Mod Ujian",
      description: t("auth.testingMode"),
      variant: "destructive",
    });
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

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
            <GraduationCap size={24} />
          </div>
          <span className="text-xl font-headline font-bold tracking-tight text-primary">HalaTuju</span>
        </Link>

        {/* Desktop Navigation */}
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
            
            {user ? (
              <Button variant="outline" size="sm" onClick={handleLogout} className="rounded-full">
                <LogOut size={16} className="mr-2" /> {t("nav.logout")}
              </Button>
            ) : (
              <Dialog open={isAuthModalOpen} onOpenChange={setIsAuthModalOpen}>
                <DialogTrigger asChild>
                  <Button variant="default" size="sm" className="rounded-full px-6 shadow-md hover:shadow-lg transition-all">
                    <LogIn size={16} className="mr-2" /> {t("nav.login")}
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[400px] rounded-3xl">
                  <DialogHeader className="text-center pt-4">
                    <DialogTitle className="text-2xl font-bold">{t("auth.title")}</DialogTitle>
                    <DialogDescription>{t("auth.subtitle")}</DialogDescription>
                  </DialogHeader>

                  {authView === 'options' ? (
                    <div className="flex flex-col gap-4 py-6">
                      <Button 
                        onClick={handleGoogleLogin} 
                        variant="outline" 
                        className="h-12 rounded-xl text-md font-medium flex items-center justify-center gap-3 hover:bg-muted"
                        disabled={isAuthLoading}
                      >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                          <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                          <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                          <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                          <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        {t("auth.google")}
                      </Button>
                      <Button 
                        onClick={() => setAuthView('email')} 
                        variant="outline" 
                        className="h-12 rounded-xl text-md font-medium gap-3"
                      >
                        <Mail size={20} /> {t("auth.email")}
                      </Button>
                      <Button 
                        onClick={handleCreateAccount} 
                        variant="ghost" 
                        className="h-12 rounded-xl text-md font-medium text-muted-foreground hover:text-primary"
                      >
                        {t("auth.createAccount")}
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleEmailLogin} className="flex flex-col gap-4 py-6">
                      <div className="space-y-2">
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input 
                            type="email" 
                            placeholder={t("auth.emailPlaceholder")} 
                            className="pl-10 rounded-xl h-11"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input 
                            type="password" 
                            placeholder={t("auth.passwordPlaceholder")} 
                            className="pl-10 rounded-xl h-11"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <Button type="submit" className="h-11 rounded-xl w-full shadow-lg" disabled={isAuthLoading}>
                        {isAuthLoading ? <Loader2 className="animate-spin mr-2" /> : <LogIn className="mr-2" size={18} />}
                        {t("auth.signIn")}
                      </Button>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        onClick={() => setAuthView('options')}
                        className="h-11 rounded-xl text-muted-foreground"
                      >
                        <ArrowLeft className="mr-2" size={18} /> {t("auth.back")}
                      </Button>
                    </form>
                  )}
                </DialogContent>
              </Dialog>
            )}
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
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
                  {user ? (
                    <Button variant="outline" className="w-full" onClick={handleLogout}>
                      <LogOut size={18} className="mr-2" /> {t("nav.logout")}
                    </Button>
                  ) : (
                    <Button className="w-full" onClick={() => setIsAuthModalOpen(true)}>
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
