const express = require("express");
const app = express();
const {obtenerLoginAdministrador, obtenerLoginEstudiante, obtenerLoginProfesor} = require("../controladores/loginControlador");

app.get("/login/administrador", obtenerLoginAdministrador);
app.get("/login/estudiante", obtenerLoginEstudiante);
app.get("/login/profesor", obtenerLoginProfesor);


module.exports = app;