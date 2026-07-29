import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';

export function Hero() {
  return (
    <section className="relative min-h-[85vh] w-full flex items-center justify-center overflow-hidden">

      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <video
          src="https://cdn.enter.pro/resources/uid_100390812/25bdfbcb-1628-45.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-1/2 left-1/2 w-full h-full object-cover -translate-x-1/2 -translate-y-1/2"
        />
        {/* Pink-tinted scrim */}
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(330_80%_20%_/_0.35)] via-[hsl(330_60%_30%_/_0.25)] to-[hsl(330_80%_10%_/_0.55)]" />
      </div>

      {/* Decorative Blobs */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-pink-400/25 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-rose-400/20 rounded-full blur-3xl animate-pulse pointer-events-none" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-fuchsia-300/15 rounded-full blur-2xl animate-pulse pointer-events-none" style={{ animationDelay: '1s' }} />

      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <img
            src="https://cdn.enter.pro/resources/uid_100390812/eeb98da0-4f7f-44.jpeg"
            alt="byhellda logo"
            className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white/70 shadow-2xl drop-shadow-xl"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="font-serif text-5xl md:text-7xl font-bold text-white tracking-tight mb-6 drop-shadow-lg"
        >
          Glow Like Hellda
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-lg md:text-xl text-white/90 max-w-lg mb-10 font-medium drop-shadow"
        >
          The glow you deserve, crafted with vitamins and care.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <Link href="/products" className="inline-flex items-center justify-center whitespace-nowrap h-14 rounded-full px-8 py-6 text-lg font-medium shadow-[var(--shadow-glow)] hover:scale-105 transition-transform bg-primary hover:bg-primary/90 text-primary-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
            Shop the Collection
          </Link>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/sign-in" className="inline-flex items-center justify-center whitespace-nowrap h-14 rounded-full border border-white/70 bg-white/15 px-7 py-6 text-lg font-medium text-white backdrop-blur-sm transition-transform hover:scale-105 hover:bg-white/25 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/70">
              Sign In
            </Link>
            <Link href="/sign-up" className="inline-flex items-center justify-center whitespace-nowrap h-14 rounded-full border border-white/70 bg-white/15 px-7 py-6 text-lg font-medium text-white backdrop-blur-sm transition-transform hover:scale-105 hover:bg-white/25 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/70">
              Create Account
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
