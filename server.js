require("dotenv").config();
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();
app.use(cors());
app.use(express.json());

app.post("/create-checkout-session", async (req, res) => {
  const { productId, price } = req.body;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [{
      price_data: {
        currency: "usd",
        unit_amount: Math.round(price * 100),
        product_data: { name: productId }
      },
      quantity: 1
    }],
    mode: "payment",
    success_url: "http://localhost:5500/success.html",
    cancel_url: "http://localhost:5500/cancel.html"
  });

  res.json({ id: session.id });
});

app.listen(4242, () => console.log("Server running at http://localhost:4242"));

STRIPE_SECRET_KEY=sk_test_your_secret_key_here
