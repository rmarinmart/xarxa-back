const db = require("../models");
const Incidencia = db.incidencias;
const Op = db.Sequelize.Op;

exports.search = (req, res) => {
  var condition = {};
  if (req.body.alumnoId)
    condition = { alumnoId: { [Op.eq]: `${req.body.alumnoId}` } };
  Incidencia.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Hubo algún error obtienendo la lista de incidencias para el alumno con id=${req.body.alumnoId}.`,
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Incidencia.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `No se ha encontrado ninguna incidencia con el id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error obteniendo la incidencia con id=" + id,
      });
    });
};

exports.create = (req, res) => {
  // Validate request
  if (!req.body.alumnoId || !req.body.descripcion || req.body.curso === null) {
    res.status(400).send({
      message:
        "¡Es necesario establecer alumno, curso y descripción de la incidencia!",
    });
    return;
  }

  const incidencia = {
    alumnoId: req.body.alumnoId,
    descripcion: req.body.descripcion,
    curso: req.body.curso,
  };

  Incidencia.create(incidencia)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Hubo un error creando la incidencia en la base de datos.",
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Incidencia.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "La incidencia fue borrada satisfactoriamente.",
        });
      } else {
        res.send({
          message: `No se pudo borrar la incidencia con id=${id}. Puede que la incidencia ya no esté en la base de datos.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "No se pudo borrar la incidencia con id=" + id,
      });
    });
};
