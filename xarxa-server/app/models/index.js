const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.alumnos = require("./alumno.model.js")(sequelize, Sequelize);
db.incidencias = require("./incidencia.model.js")(sequelize, Sequelize);
db.alumnos.hasMany(db.incidencias);
db.incidencias.belongsTo(db.alumnos);
module.exports = db;
