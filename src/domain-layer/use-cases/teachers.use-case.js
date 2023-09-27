const TeacherRepository = require("../../data-layer/teachers.repository");
const Teacher = require("../entities/teacher.entity");
const { PropertyRequiredError, error } = require("../../utils/error.util");
const HandlerUseCase = require("./common/handler.use-case");

module.exports = class TeacherUseCase extends HandlerUseCase {
  async getTeachers() {
    const teacherRepository = new TeacherRepository();

    try {
      const teachersDb = await teacherRepository.getTeachers();
      const teachers = teachersDb.map((teacherDb) => new Teacher(teacherDb));
      return teachers;
    } catch (error) {
      throw error;
    }
  }

  async getOneTeacher(id) {
    const teacherRepository = new TeacherRepository();

    try {
      const teacherDb = await teacherRepository.getOneTeacher(id);
      return new Teacher(teacherDb);
    } catch (error) {
      throw error;
    }
  }

  async addTeacher(data) {
    const teacherRepository = new TeacherRepository();

    if (!data.fields || !Array.isArray(data.fields) || !data.fields.length) {
      throw new PropertyRequiredError(error.get("NO_PROPERTY"));
    }

    const fields = data.fields;
    const isStringChecked = this.checkStringFieldsInsert(fields);

    if (!isStringChecked) {
      throw new PropertyRequiredError(error.get("NO_PROPERTY"));
    }

    try {
      const teacher = await teacherRepository.addTeacher(
        this.reduceFields(fields),
      );

      return teacher;
    } catch (error) {
      throw error;
    }
  }

  async removeTeacher(id) {
    try {
      const teacherRepository = new TeacherRepository();
      const result = await teacherRepository.removeTeacher(id);

      return result;
    } catch (error) {
      throw error;
    }
  }

  async updateTeacher(data) {
    const teacherRepository = new TeacherRepository();

    if (!data.fields || !Array.isArray(data.fields) || !data.fields.length) {
      throw new PropertyRequiredError(error.get("NO_PROPERTY"));
    }

    const elWithId = data.fields.find((el) => el.id);

    if (!elWithId) {
      throw new PropertyRequiredError(error.get("NO_PROPERTY"));
    }

    const fields = data.fields;
    const isStringChecked = this.checkStringFields(fields);

    if (!isStringChecked) {
      throw new PropertyRequiredError(error.get("NO_PROPERTY"));
    }

    try {
      const updatedTeacher = await teacherRepository.updateTeacher(
        elWithId.id,
        this.reduceFields(fields),
      );
      const teacher = new Teacher(updatedTeacher);

      return teacher;
    } catch (error) {
      throw error;
    }
  }
};
