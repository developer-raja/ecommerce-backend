const stripe = require("stripe")("sk_live_51Hqsk_test_51HqzQpKSGvI76IpfvCd9KuwRV80J6HBdxStPktgdWPePPZ7ob6FVrq7UYSiEL5U9oHeN9bXQfAjCqy92WgzPNYkM00IdO3d2TKzQpKSGvI76IpfguxGASLYP7WJq3EP2G5U7VZyr9Vh9ly78jRNi5mMYWdUAl6mDZBY76W7SCSsWTAG0gERJBMN001vFjtLNT");
const uuid = require("uuid/v4");

exports.makepayment = (req, res) => {
  const { products, token } = req.body;

  let amount = 0;
  products.map((p) => {
    amount = amount + p.price;
  });

  const idempotencyKey = uuid();

  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges
        .create(
          {
            amount: amount * 100,
            currency: "usd",
            customer: customer.id,
            receipt_email: token.email,
            description:"A test account",
            shipping: {
              name: token.card.name,
              address: {
                line1: token.card.address_line1,
                line2: token.card.address_line2,
                city: token.card.address_city,
                country: token.card.address_country,
                postal_code: token.card.address_zip,
              },
            },
          },
          { idempotencyKey }
        )
        .then((result) => res.status(200).json(result))
        .catch((err) => console.log(err));
    });
};
