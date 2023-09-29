const StudentRepository = require("../../data-layer/students.repository");
const Student = require("../entities/student.entity");
const { PropertyRequiredError, error } = require("../../utils/error.util");
const HandlerUseCase = require("./common/handler.use-case");

module.exports = class StudentUseCase extends HandlerUseCase {
  mapFields = {
    id: "id",
    name: "name",
    phone_number: "phone_number",
    password: "password",
  };
  async getStudents() {
    try {
      const studentRepository = new StudentRepository();
      const studentsDb = await studentRepository.getStudents();
      return studentsDb;
    } catch (error) {
      throw error;
    }
  }

  async getOneStudent(id) {
    try {
      const studentRepository = new StudentRepository();
      const studentDb = await studentRepository.getOneStudent(id);
      return new Student(studentDb);
    } catch (error) {
      throw error;
    }
  }

  async addStudent(data) {
    const studentRepository = new StudentRepository();

    if (!data.fields || !Array.isArray(data.fields) || !data.fields.length) {
      throw new PropertyRequiredError(error.get("NO_PROPERTY"));
    }

    const fields = data.fields;
    const isStringChecked = this.checkStringFieldsInsert(fields);

    if (!isStringChecked) {
      throw new PropertyRequiredError(error.get("NO_PROPERTY"));
    }

    try {
      const student = await studentRepository.addStudent(
        this.reduceFields(fields),
      );

      return student;
    } catch (error) {
      throw error;
    }
  }
};
