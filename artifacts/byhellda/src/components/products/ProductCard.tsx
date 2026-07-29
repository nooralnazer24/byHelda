import React from 'react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface ProductCardProps {
  name: string;
  price: number | null;
  currency?: string;
  image: string;
  inStock: boolean;
  comingSoon?: boolean;
  description?: string;
  shade?: string;
}

export function ProductCard({
  name,
  price,
  currency = 'JOD',
  image,
  inStock,
  comingSoon = false,
  description,
  shade,
}: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    if (price !== null && inStock && !comingSoon) {
      addItem({ name, price, qty: 1, image });
    }
  };

  return (
    <div className="group flex flex-col bg-card rounded-2xl overflow-hidden border border-card-border hover:shadow-[var(--shadow-glow)] transition-all duration-300">
      <div className="relative aspect-square sm:aspect-[4/3] overflow-hidden bg-white">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        {comingSoon && (
          <div className="absolute top-4 left-4 bg-primary/90 text-primary-foreground text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full backdrop-blur-sm">
            Coming Soon
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-card-foreground leading-tight mb-1">
            {name}
          </h3>
          {shade && (
            <p className="text-xs font-medium text-primary/80 uppercase tracking-widest mb-1">
              Shade — {shade}
            </p>
          )}
          {description && (
            <p className="text-sm text-muted-foreground leading-snug mb-2">{description}</p>
          )}
          {!comingSoon && price !== null && (
            <p className="text-primary font-semibold text-lg mt-2">
              {price} {currency}
            </p>
          )}
        </div>

        <div className="mt-6">
          {comingSoon ? (
            <Button
              variant="outline"
              className="w-full opacity-60 cursor-not-allowed border-dashed"
              disabled
            >
              Notify me
            </Button>
          ) : (
            <Button
              onClick={handleAddToCart}
              className="w-full gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
              disabled={!inStock}
              data-testid={`button-add-cart-${name.replace(/\s+/g, '-').toLowerCase()}`}
            >
              <Plus className="h-4 w-4" />
              {inStock ? 'Add to Cart' : 'Out of Stock'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
