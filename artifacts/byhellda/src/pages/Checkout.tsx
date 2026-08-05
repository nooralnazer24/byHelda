import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useLocation } from 'wouter';
import { supabase } from '../lib/supabase';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle2, Loader2, ShoppingBag, ArrowLeft, Banknote } from 'lucide-react';
import { motion } from 'framer-motion';

const checkoutSchema = z.object({
  customerName: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(7, 'Please enter a valid phone number'),
  address: z.string().min(10, 'Please enter your full delivery address'),
  notes: z.string().optional(),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema) as any,
    defaultValues: { customerName: '', phone: '', address: '', notes: '' },
  });

  const onSubmit = async (values: CheckoutFormValues) => {
    if (items.length === 0) return;

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('orders').insert([
        {
          customer_name: values.customerName,
          phone: values.phone,
          address: values.address,
          notes: values.notes || null,
          items: items.map((i) => ({ name: i.name, qty: i.qty, price: i.price })),
          total_amount: total,
          status: 'pending',
        },
      ]);

      if (error) {
        throw new Error(error.message || 'Failed to submit order to Supabase');
      }

      clearCart();
      setOrderPlaced(true);
      toast({
        title: 'Order placed',
        description: 'Thank you — we received your order and will contact you soon.',
      });
    } catch (err: any) {
      console.error('Supabase submission error:', err);
      
      const errorMessage = typeof err === 'string' 
        ? err 
        : err?.message || 'Please try again or contact us on Instagram.';

      toast({
        title: 'Something went wrong',
        description: String(errorMessage),
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="flex-1 w-full bg-background flex items-center justify-center py-24 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-primary" />
          </div>
          <h1 className="font-serif text-4xl font-bold text-foreground mb-4">Order Placed!</h1>
          <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
            Thank you for your order. We'll be in touch soon to confirm your delivery.
          </p>
          <Button
            onClick={() => setLocation('/')}
            className="rounded-full px-8 py-6 text-base"
          >
            Back to Home
          </Button>
        </motion.div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex-1 w-full bg-background flex items-center justify-center py-24 px-4">
        <div className="text-center max-w-md">
          <ShoppingBag className="h-16 w-16 text-muted-foreground/30 mx-auto mb-6" />
          <h1 className="font-serif text-3xl font-bold text-foreground mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8">Add some products before checking out.</p>
          <Link href="/products">
            <Button className="rounded-full px-8 py-6 text-base">Shop Now</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 w-full bg-background pt-12 pb-24">
      <div className="container mx-auto px-4 max-w-5xl">

        <Link href="/products" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Products
        </Link>

        <h1 className="font-serif text-4xl font-bold text-foreground mb-12">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="order-1 lg:order-1"
          >
            <h2 className="font-serif text-xl font-semibold mb-6">Order Summary</h2>
            <div className="bg-card border border-card-border rounded-2xl p-6 space-y-4">
              {items.map((item, index) => (
                <div key={item.name || index} className="flex items-center gap-4">
                  {item.image && (
                    <img src={item.image} alt={item.name} className="w-14 h-14 rounded-xl object-cover bg-muted flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{item.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Qty: {item.qty}</p>
                  </div>
                  <p className="font-semibold text-sm text-primary whitespace-nowrap">{(item.price * item.qty).toFixed(2)} JOD</p>
                </div>
              ))}
              <div className="border-t border-border pt-4 flex items-center justify-between font-semibold text-base">
                <span>Total</span>
                <span className="text-primary">{total.toFixed(2)} JOD</span>
              </div>
            </div>

            {/* Payment method */}
            <h2 className="font-serif text-xl font-semibold mt-8 mb-4">Payment Method</h2>
            <div className="flex items-center gap-3 w-full rounded-2xl border-2 border-primary bg-primary/5 shadow-[var(--shadow-glow)] px-5 py-4">
              <Banknote className="h-6 w-6 text-green-600 shrink-0" />
              <div>
                <p className="font-medium text-sm">Cash on Delivery</p>
                <p className="text-xs text-muted-foreground">Pay when your order arrives</p>
              </div>
            </div>
          </motion.div>

          {/* Delivery Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="order-2 lg:order-2"
          >
            <h2 className="font-serif text-xl font-semibold mb-6">Delivery Details</h2>
            <div className="bg-card border border-card-border rounded-2xl p-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <FormField control={form.control} name="customerName" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your full name" {...field} data-testid="input-customer-name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="phone" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="+962 7x xxx xxxx" {...field} data-testid="input-phone" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="address" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Delivery Address</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Street, area, city (e.g. Amman, Sweifieh, near…)" className="resize-none" rows={3} {...field} data-testid="input-address" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="notes" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Order Notes <span className="text-muted-foreground font-normal">(optional)</span></FormLabel>
                      <FormControl><Input placeholder="Any special instructions?" {...field} data-testid="input-notes" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <div className="pt-2">
                    <Button
                      type="submit"
                      className="w-full h-14 text-base rounded-full shadow-[var(--shadow-glow)] hover:scale-[1.02] transition-transform"
                      disabled={isSubmitting}
                      data-testid="button-place-order"
                    >
                      {isSubmitting ? (
                        <><Loader2 className="mr-2 h-5 w-5 animate-spin" />Placing your order…</>
                      ) : (
                        `Place Order — ${total.toFixed(2)} JOD`
                      )}
                    </Button>
                    <p className="text-xs text-muted-foreground text-center mt-3">
                      No payment now — pay when your order arrives.
                    </p>
                  </div>
                </form>
              </Form>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}