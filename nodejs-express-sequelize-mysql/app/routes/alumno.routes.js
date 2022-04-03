module.exports = (app) => {
  const alumnos = require("../controllers/alumno.controller.js");
  var router = require("express").Router();
  // Retrieve all pupils
  router.get("/", alumnos.findAll);
  router.get("/:id", alumnos.findOne);
  router.put("/:id", alumnos.update);
  app.use("/api/alumnos", router);
};
