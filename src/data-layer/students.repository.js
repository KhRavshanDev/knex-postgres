const knex = require("../../config/knex.config");
const STUDENTS_TABLE = "students";

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

      if (!student[0]) throw "No id";
      return student[0];
    } catch (error) {
      throw error;
    }
  }
};
