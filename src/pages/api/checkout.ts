import { stripe } from "@/lib/stripe";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405);
  }
  const { priceIds}: {priceIds: string[]} = req.body;
  if (priceIds.length <= 0) {
    return res.status(400).json({ error: "Price Id not found" });
  }
  const sucessUrl = `${process.env.NEXT_URL}/sucess?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${process.env.NEXT_URL}`;
  const lineItems = priceIds.map((price) => {
    return {
      price,
      quantity: 1,
    }
  })
  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: sucessUrl,
    cancel_url: cancelUrl,
    mode: "payment",
    line_items: lineItems,
  });
  return res.status(201).json({
    checkoutUrl: checkoutSession.url,
  });
}
