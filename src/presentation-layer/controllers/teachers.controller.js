const TeachersUseCase = require("../../domain-layer/use-cases/teachers.use-case");

exports.getTeachers = async (req, res) => {
  const teachersUseCase = new TeachersUseCase();
  try {
    if (req?.query?.id) {
      const id = req.query.id;
      const teacher = await teachersUseCase.getOneTeacher(id);

      return res.status(200).send(teacher);
    }
  } catch (error) {
    return res.status(400).send(error);
  }

  try {
    const teachers = await TeachersUseCase.getTeachers();

    return res.status(200).send(teachers);
  } catch (error) {
    return res.status(400).send(error);
  }
};
