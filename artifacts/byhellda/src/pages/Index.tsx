import React from 'react';
import { Hero } from '@/components/home/Hero';
import { BrandStory } from '@/components/home/BrandStory';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { VideoShowcase } from '@/components/home/VideoShowcase';
import { CTASection } from '@/components/home/CTASection';
import { BrandMoments } from '@/components/home/BrandMoments';

export default function Index() {
  return (
    <div className="w-full flex flex-col">
      <Hero />
      <BrandStory />
      <FeaturedProducts />
      <VideoShowcase />
      <BrandMoments />
      <CTASection />
    </div>
  );
}
