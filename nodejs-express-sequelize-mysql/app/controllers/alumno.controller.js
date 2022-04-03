const db = require("../models");
const Alumno = db.alumnos;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
  Alumno.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving pupils.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Alumno.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find pupil with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving pupil with id=" + id,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  Alumno.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Pupil was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update pupil with id=${id}. Maybe Pupil was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Pupil with id=" + id,
      });
    });
};
