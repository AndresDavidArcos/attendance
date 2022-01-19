const express = require("express");
const app = express();
const { eliminarProfesor, eliminarCurso, eliminarEstudiante } = require("../controladores/eliminarControlador");


app.delete("/eliminar/profesor/:cedulaProfesor", eliminarProfesor);
app.delete("/eliminar/curso/:codigoCurso", eliminarCurso);
app.delete("/eliminar/estudiante/:codigoEstudiante", eliminarEstudiante);

module.exports = app;