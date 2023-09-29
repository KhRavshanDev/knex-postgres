module.exports = class Payment {
  payment;

  constructor(payment) {
    this.payment = {
      lesson_id: payment.lessonId,
      payment_amount: payment.paymentAmount,
      payment_time: payment.paymentTime,
    };
    return this.payment;
  }

  get $payment() {
    return this.payment;
  }
};
