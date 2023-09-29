const PaymentUseCase = require("../../domain-layer/use-cases/payment.use-case");

exports.pay = async (req, res) => {
  try {
    const paymentUseCase = new PaymentUseCase();
    const data = req.body;

    if (data.lessonsId) {
      const payment = await paymentUseCase.pay(data);
      return res.status(200).send(payment);
    }
  } catch (error) {
    return res.status(400).send(error);
  }
};
