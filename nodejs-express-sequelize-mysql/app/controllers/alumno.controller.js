const db = require("../models");
const Alumno = db.alumnos;
const Op = db.Sequelize.Op;

search = (req, res) => {
  const searchTerm = req.query.searchTerm;
  const terms = searchTerm.trim().split(" ");
  var condition = null;
  if (terms.length == 1 && !isNaN(terms[0]))
    condition = { id: { [Op.like]: `%${terms[0]}%` } };
  else {
    const clauses = [];
    console.log(terms);
    terms.forEach((term) => {
      clauses.push({ nombre: { [Op.like]: `%${term}%` } });
      clauses.push({ apellidos: { [Op.like]: `%${term}%` } });
    });
    condition = { [Op.or]: clauses };
  }

  Alumno.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving pupils.",
      });
    });
};

exports.findAll = (req, res) => {
  if (req.query.searchTerm && req.query.searchTerm !== "") search(req, res);
  else {
    Alumno.findAll()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving pupils.",
        });
      });
  }
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

exports.create = (req, res) => {
  // Validate request
  if (!req.body.nombre || !req.body.apellidos) {
    res.status(400).send({
      message: "¡Es necesario establecer nombre y apellidos!",
    });
    return;
  }

  const alumno = {
    nombre: req.body.nombre,
    apellidos: req.body.apellidos,
  };

  Alumno.create(alumno)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the pupil.",
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Alumno.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Pupil was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Pupil with id=${id}. Maybe Pupil was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Pupil with id=" + id,
      });
    });
};
