const knex = require("../../config/knex.config");
const TEACHERS_TABLE = "teachers";

module.exports = class TeachersRepository {
  async getTeachers() {
    try {
      const teachers = await knex(TEACHERS_TABLE)
        .leftOuterJoin("subjects", "teachers.subject_id", "=", "subjects.id")
        .select(
          "teachers.name as teacher_name",
          "teachers.id",
          "teachers.is_union_member",
          "teachers.work_experience",
          "subjects.name as subject_name",
        );

      if (!teachers.length) throw "No data found";
      return teachers;
    } catch (error) {
      throw error;
    }
  }

  async getOneTeacher(id) {
    try {
      const teacher = await knex(TEACHERS_TABLE)
        .innerJoin("subjects", "teachers.subject_id", "subjects.id")
        .select(
          "teachers.name as teacher_name",
          "teachers.id",
          "teachers.is_union_member",
          "teachers.work_experience",
          "subjects.name as subject_name",
        )
        .where({ "teachers.id": id });

      if (!teacher[0]) throw "No data found";
      return teacher[0];
    } catch (error) {
      throw error;
    }
  }

  async addTeacher(fields) {
    const trx = await knex.transaction({ isolation: "repeatable read" });
    try {
      const result = await knex(TEACHERS_TABLE)
        .transacting(trx)
        .returning("id")
        .insert(fields);

      await trx.commit();
      return result;
    } catch (error) {
      await trx.rollback();
      throw "Error: " + error;
    }
  }

  async removeTeacher(id) {
    try {
      const result = await knex(TEACHERS_TABLE)
        .del()
        .where({
          id,
        })
        .returning("id");

      if (!result[0]) throw `No data found with parameter: ${id}`;

      return {
        id: result[0],
      };
    } catch (error) {
      throw error;
    }
  }

  async updateTeacher(id, fields) {
    try {
      const result = await knex(TEACHERS_TABLE)
        .where({ id })
        .update({ ...fields, ...{ updated_at: new Date() } })
        .returning("*");

      if (!result[0].id) {
        throw "No id found to update";
      }

      const updatedTeacher = await knex(TEACHERS_TABLE)
        .innerJoin("subjects", "teachers.subject_id", "subjects.id")
        .select(
          "teachers.name as teacher_name",
          "teachers.id",
          "teachers.is_union_member",
          "teachers.work_experience",
          "subjects.name as subject_name",
        )
        .where({ "teachers.id": result[0].id });

      if (!updatedTeacher[0]) {
        throw "No data found";
      }

      return updatedTeacher[0];
    } catch (error) {
      throw error;
    }
  }
};
