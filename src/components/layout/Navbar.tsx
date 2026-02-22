
"use client";

import Link from "next/link";
import { GraduationCap, User, BookOpen, LayoutDashboard, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Assessment", href: "/assessment", icon: GraduationCap },
    { label: "Streams", href: "/streams", icon: BookOpen },
    { label: "Profile", href: "/profile", icon: User },
  ];

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
          <Button variant="default" className="rounded-full px-6">Get Started</Button>
        </nav>

        {/* Mobile Nav */}
        <div className="md:hidden">
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
                <Button className="w-full mt-4">Get Started</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
