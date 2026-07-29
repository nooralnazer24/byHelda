import React from 'react';
import { Link } from 'wouter';
import { SiInstagram } from 'react-icons/si';

export function CTASection() {
  return (
    <section className="w-full bg-primary py-20 px-4 text-center">
      <div className="container mx-auto max-w-2xl">
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
          Ready to Glow?
        </h2>
        <p className="text-primary-foreground/90 text-lg md:text-xl mb-10 font-medium">
          Your lips deserve the best — shop the collection now.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/products" className="w-full sm:w-auto inline-flex items-center justify-center whitespace-nowrap h-14 bg-white text-primary hover:bg-white/90 rounded-full px-8 py-6 text-lg font-semibold shadow-lg focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring transition-colors">
            Shop Now
          </Link>

          <a
            href="https://www.instagram.com/byhellda"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center whitespace-nowrap h-14 border border-white text-white hover:bg-white/10 rounded-full px-8 py-6 text-lg font-semibold gap-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring transition-colors"
          >
            <SiInstagram className="w-5 h-5" />
            Follow Us
          </a>
        </div>
      </div>
    </section>
  );
}
