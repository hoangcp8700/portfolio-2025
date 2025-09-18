'use client';

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import React from "react";

import { profile, SOCIALS } from "@/shared/constants/data";


export interface FooterProps {
  children: React.ReactNode;
}

export function Footer() {
  const [hovered, setHovered] = React.useState<string | null>(null);

  return (
    <footer className="border-t py-8">
      <div className="container mx-auto px-4 text-sm text-muted-foreground flex justify-between gap-4">
        <p>
          © {new Date().getFullYear()} | Designed & built by <b>{profile.name}</b>. <br /> All rights reserved.
        </p>
        <nav
          className="relative flex items-center justify-center gap-1"
          aria-label="Social links"
          onMouseLeave={() => setHovered(null)}
        >
          {SOCIALS.map(({ href, label, Icon }) => (
            <div
              key={href}
              className="relative"
              onMouseEnter={() => setHovered(href)}
            >
              <Link
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative block rounded-lg px-1 py-2 text-sm text-muted-foreground hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label={label}
              >
                {/* Animated hover pill with backdrop blur (shared layoutId) */}
                <AnimatePresence>
                  {hovered === href && (
                    <motion.span
                      layoutId="footer-hover"
                      className="absolute inset-0 rounded-lg bg-white/60 dark:bg-white/10"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400, damping: 30, mass: 0.6 }}
                    />
                  )}
                </AnimatePresence>

                <span className="relative z-10 flex items-center backdrop-blur-sm border p-1 rounded-full" title={label}>
                  <Icon
                    className="h-4 w-4 transition-colors group-hover:text-primary"
                    fill="currentColor"
                    strokeWidth={0}
                    aria-hidden />
                </span>
              </Link>
            </div>
          ))}
        </nav>
      </div>

    </footer>
  );
}