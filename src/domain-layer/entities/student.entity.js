module.exports = class Student {
  student;

  constructor(student) {
    this.student = {
      id: student.id,
      studentName: student.name,
      phoneNumber: student.phone_number,
    };
    return this.student;
  }

  get student() {
    return this.student;
  }
};
