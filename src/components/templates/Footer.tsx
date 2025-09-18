'use client';

import React from "react";

import { profile } from "@/shared/constants/data";


export interface FooterProps {
  children: React.ReactNode;
}

export function Footer() {
  return (
    <footer className="border-t py-8">
      <div className="container mx-auto px-4 text-sm text-muted-foreground text-center">
        © {new Date().getFullYear()} | Designed & built by <b>{profile.name}</b>. <br /> All rights reserved.
      </div>
    </footer>
  );
}