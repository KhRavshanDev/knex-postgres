const knex = require("../../config/knex.config");
const LESSONS_TABLE = "lessons";

module.exports = class LessonsRepository {
  async getOneLesson(subjects_students_id) {
    try {
      const lesson = await knex(LESSONS_TABLE)
        .innerJoin(
          "subjectsstudents",
          "lessons.subjects_students_id",
          "subjectsstudents.id",
        )
        .innerJoin("students", "subjectsstudents.students_id", "students.id")
        .innerJoin("subjects", "subjectsstudents.subjects_id", "subjects.id")
        .select(
          "students.name as students_name",
          "subjects.name as subjects_name",
          "lessons.id as lesson_id",
          "lessons.lessons_start_time",
          "lessons.lessons_end_time",
          "lessons.subjects_students_id",
        )
        .where({ "lessons.subjects_students_id": subjects_students_id });

      if (!lesson[0]) throw "No id";
      return lesson[0];
    } catch (error) {
      throw error;
    }
  }

  async getLessons() {
    try {
      const lessons = await knex(LESSONS_TABLE)
        .innerJoin(
          "subjectsstudents",
          "lessons.subjects_students_id",
          "subjectsstudents.id",
        )
        .innerJoin("students", "subjectsstudents.students_id", "students.id")
        .innerJoin("subjects", "subjectsstudents.subjects_id", "subjects.id")
        .select(
          "students.name as students_name",
          "subjects.name as subjects_name",
          "lessons.id as lesson_id",
          "lessons.lessons_start_time",
          "lessons.lessons_end_time",
          "lessons.subjects_students_id",
        );
      return lessons;
    } catch (error) {
      throw error;
    }
  }

  async addLesson(data) {
    const trx = await knex.transaction({ isolation: "repeatable read" });
    try {
      const lesson = await knex(LESSONS_TABLE)
        .transacting(trx)
        .returning("*")
        .insert(data);

      await trx.commit();
      return lesson;
    } catch (error) {
      throw "Error: " + error;
    }
  }
};
