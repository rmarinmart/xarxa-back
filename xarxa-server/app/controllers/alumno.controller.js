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

  const normalizeString = (text) => {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
  }

  const calculateWeight = (candidate, terms) => {
    let weight = 0;
    terms.forEach((term)=> {
      if(normalizeString(candidate.dataValues.nombre).includes(normalizeString(term))) weight++;
      if(normalizeString(candidate.dataValues.apellidos).includes(normalizeString(term))) weight++;
    })
    return weight;
  }

  Alumno.findAll({ where: condition })
    .then((data) => {
      if(terms.length > 0) {
        data.sort((a,b)=> {
          const aWeight = calculateWeight(a, terms);
          const bWeight = calculateWeight(b, terms);
          if(aWeight > bWeight) return -1;
          if(aWeight < bWeight) return 1;
          return 0;
        });
      }
      res.send(data);
    })
  
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Hubo algún error obtienendo la lista de alumnos.",
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
            err.message || "Hubo algún error obteniendo la lista de alumnos",
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
          message: `No se ha encontrado ningún alumno con el id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error obteniendo el alumno con id=" + id,
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
          message: "El alumno se ha actualizado correctamente.",
        });
      } else {
        res.send({
          message: `No se puede actualizar el alumno con id=${id}. Puede que no se haya encontrado el alumno o que el cuerpo de la petición estuviera vacío`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error actualizando alumno con id=" + id,
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
        message: err.message || "Hubo un error creando el alumno en la base de datos.",
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
          message: "El alumno fue borrado satisfactoriamente.",
        });
      } else {
        res.send({
          message: `No se pudo borrar el alumno con id=${id}. Puede que el alumno ya no esté en la base de datos.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "No se pudo borrar el alumno con id=" + id,
      });
    });
};
