import React from 'react';
import { ShoppingBag, Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useLocation } from 'wouter';

export function CartDrawer() {
  const { items, isOpen, closeCart, updateQty, removeItem, total } = useCart();
  const [, setLocation] = useLocation();

  const isEmpty = items.length === 0;

  const goToCheckout = () => {
    closeCart();
    setLocation('/checkout');
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent side="right" className="w-full sm:max-w-md flex flex-col p-0 border-l-border">
        <SheetHeader className="px-6 py-4 border-b border-border flex flex-row items-center justify-between space-y-0">
          <SheetTitle className="flex items-center gap-2 text-lg font-semibold">
            <ShoppingBag className="h-5 w-5 text-primary" />
            Your Cart
            {items.length > 0 && (
              <span className="ml-1 text-sm font-normal text-muted-foreground">
                ({items.reduce((s, i) => s + i.qty, 0)} items)
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        <ScrollArea className="flex-1 px-6 py-4">
          {isEmpty ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <ShoppingBag className="h-12 w-12 text-muted-foreground/30 mb-4" />
              <p className="text-muted-foreground font-medium">Your cart is empty</p>
              <p className="text-sm text-muted-foreground/70 mt-1">Add something beautiful</p>
            </div>
          ) : (
            <div>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.name} className="flex gap-4 py-4 border-b border-border last:border-0">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-xl object-cover flex-shrink-0 bg-muted"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm leading-tight truncate">{item.name}</p>
                      <p className="text-primary font-semibold text-sm mt-1">{item.price} JOD</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <button
                        onClick={() => removeItem(item.name)}
                        className="text-muted-foreground hover:text-destructive transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <div className="flex items-center gap-2 bg-background border border-border rounded-md px-2 py-1">
                        <button
                          onClick={() => updateQty(item.name, item.qty - 1)}
                          className="text-muted-foreground hover:text-foreground disabled:opacity-50"
                          disabled={item.qty <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-xs font-medium w-4 text-center">{item.qty}</span>
                        <button
                          onClick={() => updateQty(item.name, item.qty + 1)}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 space-y-4">
                <div className="flex items-center justify-between text-base font-semibold border-t border-border pt-4">
                  <span>Total</span>
                  <span className="text-primary">{total} JOD</span>
                </div>
                <Button
                  className="w-full text-base py-6 rounded-full shadow-[var(--shadow-glow)]"
                  onClick={goToCheckout}
                  data-testid="button-proceed-checkout"
                >
                  Proceed to Checkout
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  Cash on Delivery — no payment now
                </p>
              </div>
            </div>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
