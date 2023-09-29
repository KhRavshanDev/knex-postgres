const LessonsRepository = require("../../data-layer/lessons.repository");
const Lesson = require("../entities/lesson.entity");

module.exports = class LessonsUseCase {
  async getLessons() {
    try {
      const lessonsRepository = new LessonsRepository();
      const lessons = await lessonsRepository.getLessons();
      const lessonsNormalized = lessons.map((el) => {
        return new Lesson(el);
      });

      return lessonsNormalized;
    } catch (error) {
      throw error;
    }
  }

  async getOneLesson(subjects_students_id) {
    try {
      const lessonsRepository = new LessonsRepository();
      const lessonsData =
        await lessonsRepository.getOneLesson(subjects_students_id);
      const lesson = new Lesson(lessonsData[0]);

      return lesson;
    } catch (error) {
      throw error;
    }
  }
};
