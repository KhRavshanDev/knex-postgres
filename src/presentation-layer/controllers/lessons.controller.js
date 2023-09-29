const LessonsUseCase = require("../../domain-layer/use-cases/lessons.use-case");

exports.getLessons = async (req, res) => {
  try {
    const lessonsUseCase = new LessonsUseCase();

    if (req?.query?.id) {
      const id = req.query.id;

      const lesson = await lessonsUseCase.getOneLesson(id);
      return res.status(200).send(lesson);
    }
  } catch (error) {
    return res.status(400).send(error);
  }

  try {
    const lessonsUseCase = new LessonsUseCase();
    const lessons = await lessonsUseCase.getLessons();
    return res.status(200).send(lessons);
  } catch (error) {
    throw error;
  }
};
