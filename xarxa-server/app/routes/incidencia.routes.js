module.exports = (app) => {
  const incidencias = require("../controllers/incidencia.controller.js");
  var router = require("express").Router();
  router.get("/", incidencias.search);
  router.post("/", incidencias.create);
  router.get("/:id", incidencias.findOne);
  router.delete("/:id", incidencias.delete);
  app.use("/api/incidencias", router);
};
