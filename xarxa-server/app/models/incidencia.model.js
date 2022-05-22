module.exports = (sequelize, Sequelize) => {
  const Incidencia = sequelize.define(
    "incidencia",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      descripcion: {
        type: Sequelize.STRING,
      },
      curso: {
        type: Sequelize.INTEGER,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
      alumnoId: {
        type: Sequelize.INTEGER,
      },
    },
    {
      tableName: "Incidencias",
    }
  );
  return Incidencia;
};
