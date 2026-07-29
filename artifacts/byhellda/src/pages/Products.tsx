import React from 'react';
import { ProductCard } from '@/components/products/ProductCard';
import { FEATURED_PRODUCTS } from '@/components/home/FeaturedProducts';
import { SiInstagram } from 'react-icons/si';

export default function Products() {
  return (
    <div className="flex-1 w-full bg-background pt-12 pb-24">
      <div className="container mx-auto px-4">

        <div className="text-center mb-16">
          <h1 className="font-serif text-5xl font-bold text-foreground mb-4">
            Our Products
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Every product is made with intention — to make you feel beautiful, inside and out.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {FEATURED_PRODUCTS.map((product, idx) => (
            <ProductCard key={idx} {...product} />
          ))}
        </div>

        <div className="max-w-2xl mx-auto bg-secondary/50 rounded-2xl p-8 text-center border border-border">
          <h3 className="font-serif text-2xl font-semibold mb-4">How to Order</h3>
          <p className="text-foreground/80 mb-6 leading-relaxed">
            We accept <strong>Cash on Delivery</strong>, <strong>Apple Pay</strong>, and <strong>Mastercard</strong>.
            Add items to your cart, choose your payment method at checkout, and we'll contact you via Instagram to confirm.
          </p>
          <a
            href="https://www.instagram.com/byhellda"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary font-medium hover:text-accent transition-colors bg-white px-6 py-3 rounded-full shadow-sm"
          >
            <SiInstagram className="w-5 h-5" />
            Contact us on Instagram
          </a>
        </div>

      </div>
    </div>
  );
}
