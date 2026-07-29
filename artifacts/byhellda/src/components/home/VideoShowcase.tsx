import React from 'react';
import { motion } from 'framer-motion';

export function VideoShowcase() {
  return (
    <section className="py-24" style={{ background: 'linear-gradient(135deg, hsl(320 70% 94%) 0%, hsl(340 80% 90%) 50%, hsl(330 75% 93%) 100%)' }}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif italic text-4xl md:text-5xl text-foreground">
            See the Glow
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl overflow-hidden shadow-[var(--shadow-glow)] aspect-[4/5] md:aspect-auto md:h-[500px]"
          >
            <video
              src="https://cdn.enter.pro/resources/uid_100390812/25bdfbcb-1628-45.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-2xl overflow-hidden shadow-[var(--shadow-glow)] aspect-[4/5] md:aspect-auto md:h-[500px]"
          >
            <video
              src="https://cdn.enter.pro/resources/uid_100390812/dacb5282-bb7e-45.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
