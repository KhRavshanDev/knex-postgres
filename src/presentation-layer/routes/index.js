const teachersRoutesinit = require("./teachers.routes");
const lessonsRoutesinit = require("./lessons.routes");
const studentRoutesinit = require("./students.routes");
const paymentRoutesinit = require("./payment.routes");

const routeInit = (app, express) => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept",
    );
    next();
  });

  studentRoutesinit(app);
  teachersRoutesinit(app);
  lessonsRoutesinit(app);
  paymentRoutesinit(app);
};

module.exports = {
  routeInit,
};
