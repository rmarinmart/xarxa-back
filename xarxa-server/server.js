const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const path = __dirname + "/app/views/";
app.use(express.static(path));

const db = require("./app/models");
db.sequelize.sync();

app.get("/", function (req, res) {
  res.sendFile(path + "index.html");
});

app.get("/", (req, res) => {
  res.json({ message: "Bienvenido a Xarxa Back" });
});
// set port, listen for requests
require("./app/routes/alumno.routes")(app);
require("./app/routes/incidencia.routes")(app);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
