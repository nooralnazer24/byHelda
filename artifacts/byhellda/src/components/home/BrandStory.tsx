import React from 'react';
import { motion } from 'framer-motion';

export function BrandStory() {
  return (
    <section className="py-24" style={{ background: 'linear-gradient(180deg, hsl(0 0% 100%) 0%, hsl(340 70% 95%) 100%)' }}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">

          <div className="w-full md:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl"
            >
              <img
                src={`${import.meta.env.BASE_URL}brand-story.jpeg`}
                alt="Hellda seated in her director's chair"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-primary/10 mix-blend-overlay pointer-events-none" />
            </motion.div>
          </div>

          <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-serif text-4xl md:text-5xl font-bold text-foreground"
            >
              About byHellda
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-16 h-1 bg-primary rounded-full mx-auto md:mx-0"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg text-foreground/80 leading-relaxed max-w-xl mx-auto md:mx-0"
            >
              byHellda was born from a passion for beauty that goes beyond the surface. Our signature lipgloss is enriched with vitamins and formulated to pharmaceutical-grade GMP standards — so every swipe nourishes your lips as much as it makes them glow. We believe beauty should celebrate who you are, not just cover it.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <a
                href="https://www.instagram.com/byhellda"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-primary font-semibold hover:text-accent transition-colors"
              >
                Follow the journey on Instagram @byhellda &rarr;
              </a>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
