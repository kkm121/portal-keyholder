import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const planId: string | undefined = body?.planId;
    if (!planId) throw new Error("Missing planId");

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "https://kumhenkknyprvbzagpdp.supabase.co";
    const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY") ?? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt1bWhlbmtrbnlwcnZiemFncGRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYzOTY5MDksImV4cCI6MjA3MTk3MjkwOX0.c9dBs_CN2VAl9qnByFKNQwov25YSW2JHsDkA-C-cnYI";

    const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) return new Response(JSON.stringify({ error: "Not authenticated" }), { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 401 });

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError || !userData.user?.email) {
      return new Response(JSON.stringify({ error: "User not authenticated" }), { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 401 });
    }

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      return new Response(JSON.stringify({ error: "Missing STRIPE_SECRET_KEY" }), { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 });
    }

    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });

    // Map plan IDs to amounts in cents
    const planMap: Record<string, number> = {
      "quantum-basic": 9900,
      "quantum-pro": 29900,
      "quantum-enterprise": 99900,
    };

    const amount = planMap[planId];
    if (!amount) throw new Error("Invalid planId");

    // Ensure a customer exists or use email
    const email = userData.user.email as string;
    const customers = await stripe.customers.list({ email, limit: 1 });
    const customerId = customers.data[0]?.id;

    const origin = req.headers.get("origin") || "http://localhost:5173";

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: `QuantumCloud ${planId.replace("quantum-", "").toUpperCase()} Plan` },
            unit_amount: amount,
            recurring: { interval: "month" },
          },
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${origin}/?checkout=success`,
      cancel_url: `${origin}/?checkout=cancel`,
    });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return new Response(JSON.stringify({ error: message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});