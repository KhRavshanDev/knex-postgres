const StudentsUseCase = require("../../domain-layer/use-cases/students.use-case");

exports.getStudents = async (req, res) => {
  try {
    const studentsUseCase = new StudentsUseCase();

    if (req?.query?.id) {
      const id = req.query.id;
      const student = await studentsUseCase.getOneStudent(id);

      return res.status(200).send(student);
    }

    const students = await studentsUseCase.getStudents();
    return res.status(200).send(students);
  } catch (error) {
    return res.status(400).send(error);
  }
};

exports.addStudent = async (req, res) => {
  try {
    const studentsUseCase = new StudentsUseCase();
    const data = req.body;

    if (data) {
      const student = await studentsUseCase.addStudent(data);

      return res.status(200).send(student);
    }
  } catch (error) {
    return res.status(400).send(error);
  }
};
