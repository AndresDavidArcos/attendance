const express = require("express");
const app = express();
const {actualizarInfoProfesor, actualizarInfoEstudiante, actualizarCurso} = require("../controladores/actualizarControlador");

app.put("/actualizar/profesor/:cedulaProfesor", actualizarInfoProfesor);
app.put("/actualizar/estudiante/:codigoEstudiante", actualizarInfoEstudiante);
app.put("/actualizar/curso/:codigoCurso", actualizarCurso);

module.exports = app;