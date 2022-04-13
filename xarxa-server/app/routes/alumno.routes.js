module.exports = (app) => {
  const alumnos = require("../controllers/alumno.controller.js");
  var router = require("express").Router();
  // Retrieve all pupils
  router.get("/", alumnos.findAll);
  router.post("/", alumnos.create);
  router.get("/:id", alumnos.findOne);
  router.put("/:id", alumnos.update);
  router.delete("/:id", alumnos.delete);
  app.use("/api/alumnos", router);
};
