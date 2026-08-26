import { NextResponse } from "next/server";
import crypto from "crypto";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(request: Request) {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await request.json();

  const expected = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (expected !== razorpay_signature) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const { data: mandal } = await supabaseAdmin
    .from("mandals")
    .select("id, slug")
    .eq("razorpay_order_id", razorpay_order_id)
    .single();

  if (!mandal) return NextResponse.json({ error: "Order not found" }, { status: 404 });

  await supabaseAdmin
    .from("mandals")
    .update({ payment_status: "paid", status: "approved", razorpay_payment_id })
    .eq("id", mandal.id);

  return NextResponse.json({ success: true, slug: mandal.slug });
}