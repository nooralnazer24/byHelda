import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { ShoppingBag, Menu, LogIn, LogOut, UserCircle2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Show, useUser, useClerk } from '@clerk/react';

const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');

export function SiteHeader() {
  const [location] = useLocation();
  const { itemCount, openCart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useUser();
  const { signOut } = useClerk();

  const links = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/gallery', label: 'Gallery' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">

        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-2">
          <img
            src="https://cdn.enter.pro/resources/uid_100390812/eeb98da0-4f7f-44.jpeg"
            alt="byHellda Logo"
            className="h-10 w-auto object-contain rounded-full border border-pink-100"
            data-testid="logo-header"
          />
          <span className="font-serif font-semibold text-lg text-foreground hidden sm:inline-block">
            byHellda
          </span>
        </Link>

        {/* Center: Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location === link.href ? 'text-primary' : 'text-foreground/80'
              }`}
              data-testid={`nav-link-${link.label.toLowerCase()}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right: Auth + Cart + Mobile Menu */}
        <div className="flex items-center gap-3">

          {/* Signed-out: Sign In button */}
          <Show when="signed-out">
            <Link href="/sign-in">
              <Button variant="ghost" size="sm" className="hidden md:inline-flex items-center gap-1.5 text-foreground/80 hover:text-primary">
                <LogIn className="h-4 w-4" />
                Sign In
              </Button>
            </Link>
          </Show>

          {/* Signed-in: greeting + sign-out */}
          <Show when="signed-in">
            <div className="hidden md:flex items-center gap-2">
              <span className="flex items-center gap-1.5 text-sm text-foreground/70">
                <UserCircle2 className="h-4 w-4 text-primary" />
                {user?.firstName ?? user?.emailAddresses?.[0]?.emailAddress?.split('@')[0]}
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="text-foreground/60 hover:text-primary"
                onClick={() => signOut({ redirectUrl: basePath || '/' })}
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </Show>

          {/* Cart */}
          <button
            onClick={openCart}
            className="relative p-2 text-foreground/80 hover:text-primary transition-colors"
            data-testid="button-cart"
            aria-label="Open cart"
          >
            <ShoppingBag className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {itemCount}
              </span>
            )}
          </button>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-foreground/80 hover:text-primary">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-background border-border">
                <nav className="flex flex-col gap-6 mt-12">
                  {links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-lg font-medium transition-colors hover:text-primary ${
                        location === link.href ? 'text-primary' : 'text-foreground/80'
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="border-t border-border pt-4">
                    <Show when="signed-out">
                      <Link href="/sign-in" onClick={() => setMobileMenuOpen(false)}>
                        <Button className="w-full rounded-full" size="sm">
                          <LogIn className="h-4 w-4 mr-2" />
                          Sign In
                        </Button>
                      </Link>
                    </Show>
                    <Show when="signed-in">
                      <div className="flex flex-col gap-3">
                        <span className="flex items-center gap-2 text-sm text-foreground/70">
                          <UserCircle2 className="h-4 w-4 text-primary" />
                          {user?.firstName ?? user?.emailAddresses?.[0]?.emailAddress?.split('@')[0]}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full rounded-full"
                          onClick={() => {
                            setMobileMenuOpen(false);
                            signOut({ redirectUrl: basePath || '/' });
                          }}
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Sign Out
                        </Button>
                      </div>
                    </Show>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
