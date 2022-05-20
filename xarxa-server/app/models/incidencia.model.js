module.exports = (sequelize, Sequelize) => {
  const Incidencia = sequelize.define("incidencia", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    descripcion: {
      type: Sequelize.STRING,
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
    alumnoId :{
      type: Sequelize.INTEGER,
    },
  });
  return Incidencia;
};
