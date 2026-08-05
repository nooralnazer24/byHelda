import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Loader2, Package, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface OrderItem {
  name: string;
  qty: number;
  price: number;
}

interface Order {
  id: string;
  created_at: string;
  customer_name: string;
  phone: string;
  address: string;
  notes?: string;
  items: OrderItem[];
  total_amount: number;
  status: string;
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  async function fetchOrders() {
    setLoading(true);
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching orders:', error);
    } else {
      setOrders(data || []);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-3xl font-bold flex items-center gap-3">
          <Package className="h-8 w-8 text-primary" />
          Incoming Orders
        </h1>
        <Button onClick={fetchOrders} variant="outline" size="sm" className="gap-2">
          <RefreshCw className="h-4 w-4" /> Refresh
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : orders.length === 0 ? (
        <p className="text-muted-foreground text-center py-12">No orders received yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <div className="flex flex-wrap justify-between items-start mb-4 gap-2">
                <div>
                  <h2 className="font-bold text-lg">{order.customer_name}</h2>
                  <p className="text-sm text-muted-foreground">Phone: {order.phone}</p>
                  <p className="text-sm text-muted-foreground">Address: {order.address}</p>
                  {order.notes && (
                    <p className="text-xs text-amber-600 bg-amber-50 p-2 rounded mt-2">
                      Note: {order.notes}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium uppercase">
                    {order.status}
                  </span>
                  <p className="text-xs text-muted-foreground mt-2">
                    {new Date(order.created_at).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="border-t border-border pt-3 mt-3">
                <p className="text-sm font-semibold mb-2">Items Ordered:</p>
                <ul className="space-y-1">
                  {order.items?.map((item, idx) => (
                    <li key={idx} className="text-sm flex justify-between">
                      <span>{item.qty}x {item.name}</span>
                      <span>{(item.price * item.qty).toFixed(2)} JOD</span>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-border mt-3 pt-2 flex justify-between font-bold text-base">
                  <span>Total Amount:</span>
                  <span className="text-primary">{order.total_amount?.toFixed(2)} JOD</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}