var braintree = require("braintree");


var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "bfqnkw6zsrhkhgby",
  publicKey: "ytj6448pvp4msg3f",
  privateKey: "460ee27395f7cdfa30828364b864854a",
});

exports.getToken = (req, res) => {
  gateway.clientToken.generate({}, (err, response) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      res.send(response);
    }
  });
};
exports.processPayment = (req, res) => {
  let nonceFromTheClient = req.body.payment.paymentMethodNonce;
  let amountFromTheClient = req.body.amount;
  gateway.transaction.sale(
    {
      amount: amountFromTheClient,
      paymentMethodNonce: nonceFromTheClient,

      options: {
        submitForSettlement: true,
      },
    },
    (err, result) => {
      if (err) {
        return res.status(500).send(err);
      } else {
        res.send(result);
      }
    }
  );
};
