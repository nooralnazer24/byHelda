import React from 'react';
import { ProductCard } from '../products/ProductCard';

export const FEATURED_PRODUCTS = [
  {
    name: "byHellda Signature Lipgloss",
    price: 11,
    currency: "JOD",
    image: `${import.meta.env.BASE_URL}lipgloss.jpeg`,
    inStock: true,
    comingSoon: false,
    description: "A sheer, glass-finish gloss that melts into your lips and leaves them looking kissed by the sun. Soft, juicy, and impossibly glossy.",
    shade: "Pink Tears",
  },
  {
    name: "Mystery Product",
    price: null,
    currency: "JOD",
    image: "https://cdn.enter.pro/resources/uid_100390812/a6f4d2f6-10e3-4b.jpeg",
    inStock: false,
    comingSoon: true,
    description: "Something new is coming — stay tuned.",
  }
];

export function FeaturedProducts() {
  return (
    <section className="py-24" style={{ background: 'linear-gradient(160deg, hsl(340 80% 96%) 0%, hsl(330 70% 92%) 40%, hsl(315 65% 93%) 100%)' }}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Products
          </h2>
          <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
            Discover the signature glow that started it all — and get ready for what's next.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {FEATURED_PRODUCTS.map((product, idx) => (
            <ProductCard key={idx} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}
