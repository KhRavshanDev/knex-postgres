const knex = require("../../config/knex.config");
const { PropertyRequiredError, error } = require("../utils/error.util");
const PAYMENT_TABLE = "payment";

module.exports = class PaymentRepository {
  async addPayment(fields) {
    const isStringChecked = checkStringFields(fields.lessonId);
    if (!isStringChecked) {
      throw new PropertyRequiredError(error.get("NO_PROPERTY"));
    }

    const trx = await knex.transaction();
    try {
      const payment = await knex(PAYMENT_TABLE)
        .transacting(trx)
        .insert(fields)
        .returning("id");
      await trx.commit();
      return {
        id: payment[0],
      };
    } catch (error) {
      await trx.rollback();
      throw "Error: " + error;
    }
  }
};

function checkStringFields(param) {
  const IS_VALID = true;

  if (typeof param !== "string") {
    return !IS_VALID;
  }

  return IS_VALID;
}
