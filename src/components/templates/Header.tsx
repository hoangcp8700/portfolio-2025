"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NAV } from "@/shared/constants/data";
import { cn } from "@/shared/lib/utils";

import { ThemeToggle } from "../atoms/ThemeToggle";



export function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);



  return (
    <header className={cn(
      "sticky top-0 z-40 w-full bg-background/70 backdrop-blur",
      scrolled && "supports-[backdrop-filter]:bg-background/20 border-b"
    )}>
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <div className="hidden md:block"><NavBar items={NAV} /></div>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon"><Menu className="h-5 w-5" /></Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="mt-10 space-y-4">
                <NavBar items={NAV} />
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}

function NavBar({ items }: { items: { href: string; label: string }[] }) {
  const pathname = usePathname() || "/";
  const [hovered, setHovered] = React.useState<string | null>(null);

  return (
    <nav
      className="relative hidden gap-1 md:flex font-syne"
      onMouseLeave={() => setHovered(null)}
      aria-label="Primary"
    >
      {items.map((it) => {
        const active = pathname === it.href || (it.href.startsWith("/#") && typeof window !== "undefined" && window.location.hash === it.href.replace("/", ""));
        return (
          <div
            key={it.href}
            className="relative"
            onMouseEnter={() => setHovered(it.href)}
          >
            <Link
              href={it.href}
              className={cn(
                "relative block rounded-lg px-3 py-2 transition-colors",
                active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {/* Animated hover backdrop “pill” */}
              <AnimatePresence>
                {hovered === it.href && (
                  <motion.span
                    layoutId="nav-hover"
                    className="absolute inset-0 rounded-lg"
                    style={{
                      // keeps it subtle across themes
                      backgroundColor: "oklch(0.97 0 0 / 0.6)",
                      // if you prefer tokens, swap with bg-card/70 via className
                    }}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </AnimatePresence>

              {/* Blur effect isolated inside the pill */}
              <span className="relative z-10 backdrop-blur-sm">{it.label}</span>

              {/* Animated ACTIVE dot (shared layout) */}
              <AnimatePresence>
                {active && (
                  <motion.span
                    layoutId="nav-active-dot"
                    className="absolute top-2 right-0 z-10 h-1.5 w-1.5 -translate-x-1/2 rounded-full"
                    style={{ backgroundColor: "oklch(0.78 0.18 145)" }}
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30, mass: 0.6 }}
                  />
                )}
              </AnimatePresence>
            </Link>
          </div>
        );
      })}
    </nav>
  );
}