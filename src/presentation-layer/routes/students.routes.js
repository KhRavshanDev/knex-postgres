const studentsController = require("../controllers/students.controller");

module.exports = function (app) {
  app.get("/api/students/", studentsController.getStudents);
  app.post("/api/student", studentsController.addStudent);
  // app.patch("/api/students/", studentsController.updateStudent);
};
