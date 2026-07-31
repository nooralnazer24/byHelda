import type { VercelRequest, VercelResponse } from "@vercel/node";
import { db, ordersTable } from "@workspace/db";
import { PlaceOrderBody } from "@workspace/api-zod";
import { getSupabaseClient } from "../artifacts/api-server/src/supabaseClient";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const parsed = PlaceOrderBody.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid order data" });
  }

  const { customerName, phone, address, paymentMethod, notes, items, total } = parsed.data;

  try {
    // Save to local Postgres
    const [order] = await db
      .insert(ordersTable)
      .values({
        customerName,
        phone,
        address,
        paymentMethod,
        notes: notes ?? null,
        items,
        total: String(total),
      })
      .returning();

    // Safely parse or fallback the creation date string
    const fallbackIsoString = order?.createdAt instanceof Date 
      ? order.createdAt.toISOString() 
      : new Date().toISOString();

    // Mirror to Supabase so the owner can see orders in their dashboard
    try {
      const supabase = getSupabaseClient();
      await supabase.from("orders").insert({
        id: order.id,
        customer_name: order.customerName,
        phone: order.phone,
        address: order.address,
        payment_method: order.paymentMethod,
        notes: order.notes,
        items: order.items,
        total: Number(order.total),
        status: order.status,
        created_at: fallbackIsoString,
      });
    } catch (supabaseErr) {
      // Log but don't fail the request — local DB write already succeeded
      console.warn("Supabase mirror failed:", supabaseErr);
    }

    return res.status(201).json({
      id: order.id,
      customerName: order.customerName,
      phone: order.phone,
      address: order.address,
      paymentMethod: order.paymentMethod,
      notes: order.notes,
      items: order.items,
      total: Number(order.total),
      status: order.status,
      createdAt: fallbackIsoString,
    });
  } catch (err) {
    console.error("Failed to create order:", err);
    return res.status(500).json({ error: "Failed to place order" });
  }
}