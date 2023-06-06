module.exports = (sequelize, Sequelize) => {
  const Alumno = sequelize.define("alumno", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: Sequelize.STRING,
    },
    apellidos: {
      type: Sequelize.STRING,
    },
    esopres1: {
      type: Sequelize.BOOLEAN,
    },
    esopresobs1: {
      type: Sequelize.STRING,
    },
    esodev1: {
      type: Sequelize.BOOLEAN,
    },
    esodevobs1: {
      type: Sequelize.STRING,
    },
    esopres2: {
      type: Sequelize.BOOLEAN,
    },
    esopresobs2: {
      type: Sequelize.STRING,
    },
    esodev2: {
      type: Sequelize.BOOLEAN,
    },
    esodevobs2: {
      type: Sequelize.STRING,
    },
    esopres3: {
      type: Sequelize.BOOLEAN,
    },
    esopresobs3: {
      type: Sequelize.STRING,
    },
    esodev3: {
      type: Sequelize.BOOLEAN,
    },
    esodevobs3: {
      type: Sequelize.STRING,
    },
    esopres4: {
      type: Sequelize.BOOLEAN,
    },
    esopresobs4: {
      type: Sequelize.STRING,
    },
    esodev4: {
      type: Sequelize.BOOLEAN,
    },
    esodevobs4: {
      type: Sequelize.STRING,
    },
    fpbpres1: {
      type: Sequelize.BOOLEAN,
    },
    fpbpresobs1: {
      type: Sequelize.STRING,
    },
    fpbdev1: {
      type: Sequelize.BOOLEAN,
    },
    fpbdevobs1: {
      type: Sequelize.STRING,
    },
    fpbpres2: {
      type: Sequelize.BOOLEAN,
    },
    fpbpresobs2: {
      type: Sequelize.STRING,
    },
    fpbdev2: {
      type: Sequelize.BOOLEAN,
    },
    fpbdevobs2: {
      type: Sequelize.STRING,
    },
    batchpres1: {
      type: Sequelize.BOOLEAN,
    },
    batchpresobs1: {
      type: Sequelize.STRING,
    },
    batchdev1: {
      type: Sequelize.BOOLEAN,
    },
    batchdevobs1: {
      type: Sequelize.STRING,
    },
    batchpres2: {
      type: Sequelize.BOOLEAN,
    },
    batchpresobs2: {
      type: Sequelize.STRING,
    },
    batchdev2: {
      type: Sequelize.BOOLEAN,
    },
    batchdevobs2: {
      type: Sequelize.STRING,
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  });
  return Alumno;
};
