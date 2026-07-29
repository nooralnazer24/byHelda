import React from 'react';
import { SiteHeader } from './SiteHeader';
import { SiteFooter } from './SiteFooter';
import { CartDrawer } from '../cart/CartDrawer';

export function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background font-sans">
      <SiteHeader />
      <main className="flex-1 flex flex-col">
        {children}
      </main>
      <SiteFooter />
      <CartDrawer />
    </div>
  );
}
