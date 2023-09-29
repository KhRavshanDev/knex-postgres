const StudentRepository = require("../../data-layer/students.repository");
const Student = require("../entities/student.entity");

module.exports = class StudentUseCase {
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
};
