import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Play } from 'lucide-react';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

const BASE = import.meta.env.BASE_URL;

const GALLERY_ITEMS = [
  {
    type: 'image' as const,
    src: 'https://cdn.enter.pro/resources/uid_100390812/4967a7d3-866f-45.jpeg',
    alt: 'Brand photo 1',
  },
  {
    type: 'video' as const,
    src: 'https://cdn.enter.pro/resources/uid_100390812/25bdfbcb-1628-45.mp4',
    alt: 'Brand video 1',
  },
  {
    type: 'image' as const,
    src: 'https://cdn.enter.pro/resources/uid_100390812/a6f4d2f6-10e3-4b.jpeg',
    alt: 'Brand photo 2',
  },
  {
    type: 'video' as const,
    src: 'https://cdn.enter.pro/resources/uid_100390812/dacb5282-bb7e-45.mp4',
    alt: 'Brand video 2',
  },
  {
    type: 'image' as const,
    src: 'https://cdn.enter.pro/resources/uid_100390812/15949b8c-4fe9-41.jpeg',
    alt: 'Brand photo 3',
  },
  {
    type: 'video' as const,
    src: 'https://cdn.enter.pro/resources/uid_100390812/cec6694a-f026-40.mp4',
    alt: 'Brand video 3',
  },
  {
    type: 'image' as const,
    src: `${BASE}event-group1.jpeg`,
    alt: 'byHellda launch event — group photo',
  },
  {
    type: 'image' as const,
    src: `${BASE}event-kiss.jpeg`,
    alt: 'byHellda launch event — friends',
  },
  {
    type: 'image' as const,
    src: `${BASE}event-group2.jpeg`,
    alt: 'byHellda launch event — crowd',
  },
];

type GalleryItem = typeof GALLERY_ITEMS[0];

export default function Gallery() {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  return (
    <div className="flex-1 w-full bg-background pt-12 pb-24">
      <div className="container mx-auto px-4">

        <div className="text-center mb-16">
          <h1 className="font-serif text-5xl font-bold text-foreground mb-4">
            Our Gallery
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A glimpse into the world of byHellda.
          </p>
        </div>

        <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6 max-w-7xl mx-auto">
          {GALLERY_ITEMS.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.07, duration: 0.5 }}
              className="break-inside-avoid"
            >
              <div
                className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-[var(--shadow-glow)] transition-all duration-300"
                onClick={() => setSelectedItem(item)}
              >
                {item.type === 'image' ? (
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <div className="relative">
                    <video
                      src={item.src}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/0 transition-colors">
                      <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-white drop-shadow-md">
                        <Play className="w-5 h-5 ml-1" />
                      </div>
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-overlay" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      <Dialog open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
        <DialogContent className="max-w-3xl w-full p-2 bg-black/90 border-none">
          <VisuallyHidden>
            <DialogTitle>Gallery item</DialogTitle>
          </VisuallyHidden>
          {selectedItem && (
            selectedItem.type === 'image' ? (
              <img
                src={selectedItem.src}
                alt={selectedItem.alt}
                className="w-full h-auto max-h-[80vh] object-contain rounded-xl"
              />
            ) : (
              <video
                src={selectedItem.src}
                autoPlay
                loop
                muted={false}
                controls
                playsInline
                className="w-full h-auto max-h-[80vh] object-contain rounded-xl"
              />
            )
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
