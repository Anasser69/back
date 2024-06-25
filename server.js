const express = require("express");
const stripe = require("stripe")(
  "sk_test_51PVaGqITNJ9MM2uDJcr7VaYA4wcUjtPIe9ZTTgxRJmQjxZ2UkbuHf4vYGITPbTkFzQvpPRRTesLdlRn8cST7ZJV000fw8W8Bks"
);

const app = express();

app.use(express.json());

app.post("/create-payment-intent", async (req, res) => {
  const { amount, currency } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency,
    payment_method_types: ["card"],
  });
  res.json({ clientSecret: paymentIntent.client_secret });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
