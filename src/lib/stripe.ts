import Stripe from "stripe"

if (process.env.STRIPE_SECRET_KEY == undefined) {
  throw new Error("API Key not found")
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
  appInfo: {
    name: "Ignite Shop",
  }
})
