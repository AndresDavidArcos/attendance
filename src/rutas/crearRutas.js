const express = require("express");
const app = express();
const { crearCurso, matricularEstudiante, confirmarAsistenciaEstudiante, confirmarAsistenciaProfesor } = require("../controladores/crearControlador");
app.post("/crear/curso", crearCurso);
app.post("/crear/matricula", matricularEstudiante);
app.post("/crear/asistencia/estudiante", confirmarAsistenciaEstudiante);
app.post("/crear/asistencia/profesor", confirmarAsistenciaProfesor);


module.exports = app;