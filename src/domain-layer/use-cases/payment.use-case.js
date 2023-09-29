const PaymentRepository = require("../../data-layer/payment.repository");
const Payment = require("../entities/payment.entity");

module.exports = class PaymentUseCase {
  async pay(data) {
    const payment = new Payment(data);
    const dataBuilder = payment.$payment;

    try {
      const id = await new PaymentRepository().addPayment(dataBuilder);
      return id;
    } catch (error) {
      throw error;
    }
  }
};
