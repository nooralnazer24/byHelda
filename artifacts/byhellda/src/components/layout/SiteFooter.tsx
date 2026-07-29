import React from 'react';
import { SiInstagram } from 'react-icons/si';

export function SiteFooter() {
  return (
    <footer className="w-full bg-secondary text-secondary-foreground py-12 border-t border-border mt-auto">
      <div className="container mx-auto px-4 flex flex-col items-center justify-center text-center gap-6">
        <img
          src="https://cdn.enter.pro/resources/uid_100390812/eeb98da0-4f7f-44.jpeg"
          alt="byHellda Logo"
          className="h-12 w-auto object-contain rounded-full shadow-sm"
        />
        <div className="max-w-md">
          <p className="font-serif text-lg font-medium italic mb-2">
            Beauty made with love by Hellda
          </p>
          <p className="text-sm opacity-80 mb-6">
            Handcrafted lipgloss designed to enhance your natural beauty.
          </p>
        </div>

        <a
          href="https://www.instagram.com/byhellda"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-primary hover:text-accent transition-colors"
          data-testid="link-instagram-footer"
        >
          <SiInstagram className="h-5 w-5" />
          <span className="font-medium">@byhellda</span>
        </a>

        <div className="mt-8 pt-8 border-t border-border/50 w-full max-w-sm text-xs opacity-70">
          <p>&copy; {new Date().getFullYear()} byHellda. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
