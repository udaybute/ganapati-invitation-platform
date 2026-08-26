import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { getRazorpay } from "@/lib/razorpay";

export async function POST(request: Request) {
  const razorpay = getRazorpay();
  const { slug } = await request.json();
  if (!slug) return NextResponse.json({ error: "slug required" }, { status: 400 });

  const { data: mandal, error } = await supabaseAdmin
    .from("mandals")
    .select("id, mandal_name, contact, amount, payment_status")
    .eq("slug", slug)
    .single();

  if (error || !mandal) return NextResponse.json({ error: "Mandal not found" }, { status: 404 });
  if (mandal.payment_status === "paid") return NextResponse.json({ error: "Already paid" }, { status: 400 });

  const amountPaise = (mandal.amount ?? 499) * 100;

  const order = await razorpay.orders.create({
    amount: amountPaise,
    currency: "INR",
    receipt: slug,
    notes: { slug },
  });

  await supabaseAdmin.from("mandals").update({ razorpay_order_id: order.id }).eq("id", mandal.id);

  return NextResponse.json({
    orderId: order.id,
    amount: amountPaise,
    keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    mandalName: mandal.mandal_name,
    contact: mandal.contact,
  });
}