const knex = require("../../config/knex.config");
const STUDENTS_TABLE = "students";
const { DataBaseError, error } = require("../utils/error.util");

module.exports = class StudentsRepository {
  async getStudents() {
    try {
      const students = await knex(STUDENTS_TABLE);
      return students;
    } catch (error) {
      throw error;
    }
  }

  async getOneStudent(id) {
    try {
      const student = await knex(STUDENTS_TABLE)
        .select("id", "name", "phone_number")
        .from("students")
        .where({ id: id });

      if (!student[0]) throw new DataBaseError(error.get("DATA_BASE_ERROR"));
      return student[0];
    } catch (error) {
      throw error;
    }
  }

  async addStudent(fields) {
    const trx = await knex.transaction({ isolation: "repeatable read" });
    try {
      const students = await knex(STUDENTS_TABLE)
        .transacting(trx)
        .insert(fields)
        .returning("*");
      await trx.commit();
      return students;
    } catch (error) {
      trx.rollback();
      throw "Error: " + error;
    }
  }
};
