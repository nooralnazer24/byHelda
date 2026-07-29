import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause } from 'lucide-react';

const BASE = import.meta.env.BASE_URL;

const photos = [
  { src: `${BASE}event-mirror.jpeg`,  alt: 'byHellda launch event — mirror moment' },
  { src: `${BASE}event-bags.jpeg`,    alt: 'Shoppers with byHellda branded bags' },
  { src: `${BASE}event-apply.jpeg`,   alt: 'Applying byHellda lip gloss' },
  { src: `${BASE}event-unbox.jpeg`,   alt: 'Unboxing a byHellda package' },
];

export function BrandMoments() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setPlaying(true);
    } else {
      videoRef.current.pause();
      setPlaying(false);
    }
  };

  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm tracking-[0.25em] uppercase font-medium mb-3">Behind the Glow</p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">
            The Launch Moment
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            A day we'll never forget — the very first time the world met byHellda.
          </p>
        </motion.div>

        {/* Video + photo strip layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 max-w-6xl mx-auto items-start">

          {/* Big video — spans 3 cols */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-3 relative rounded-3xl overflow-hidden shadow-[var(--shadow-glow)] cursor-pointer group aspect-[9/16] sm:aspect-video lg:aspect-auto lg:h-[580px]"
            onClick={togglePlay}
          >
            <video
              ref={videoRef}
              src={`${BASE}brand-video.mp4`}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            {/* Play/Pause button */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white">
                {playing ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
              </div>
            </div>
            {/* Label */}
            <div className="absolute bottom-5 left-5 text-white pointer-events-none">
              <p className="font-serif italic text-2xl drop-shadow">by Hellda</p>
              <p className="text-xs tracking-widest uppercase opacity-75 mt-0.5">Launch Day</p>
            </div>
          </motion.div>

          {/* Photo column — spans 2 cols, 2x2 grid */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-4">
            {photos.map((photo, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-[var(--shadow-glow)] transition-shadow duration-300 aspect-[3/4]"
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-primary/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-overlay" />
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
