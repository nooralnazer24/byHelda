import { Router } from "express";
import { db, ordersTable } from "@workspace/db";
import { PlaceOrderBody } from "@workspace/api-zod";
import { getSupabaseClient } from "../supabaseClient";

const router = Router();

router.post("/orders", async (req, res) => {
  const parsed = PlaceOrderBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid order data" });
    return;
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
        created_at: order.createdAt.toISOString(),
      });
    } catch (supabaseErr) {
      // Log but don't fail the request — local DB write already succeeded
      req.log.warn({ supabaseErr }, "Supabase mirror failed");
    }

    res.status(201).json({
      id: order.id,
      customerName: order.customerName,
      phone: order.phone,
      address: order.address,
      paymentMethod: order.paymentMethod,
      notes: order.notes,
      items: order.items,
      total: Number(order.total),
      status: order.status,
      createdAt: order.createdAt.toISOString(),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to create order");
    res.status(500).json({ error: "Failed to place order" });
  }
});

export default router;
