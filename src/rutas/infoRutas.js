const express = require("express");
const app = express();
const { obtenerInfoSede, obtenerInfoProfesores, obtenerInfoEstudiantes, obtenerInfoCursos, cursosQueImparteUnProfesor, asistenciasProfesores, asistenciasDeUnProfesor, obtenerCursosMatriculadosDeUnEstudiante, asistenciasEstudiantes, asistenciasDeUnEstudiante, obtenerInfoProfesor, obtenerInfoEstudiante, obtenerInfoCurso } = require("../controladores/infoControlador");

app.get("/info/profesores", obtenerInfoProfesores);
app.get("/info/sede/:idSede", obtenerInfoSede);
app.get("/info/profesores/:cedulaProfesor", obtenerInfoProfesor);
app.get("/info/estudiantes", obtenerInfoEstudiantes);
app.get("/info/estudiantes/:codigoEstudiante", obtenerInfoEstudiante);
app.get("/info/cursos", obtenerInfoCursos);
app.get("/info/cursos/:codigoCurso", obtenerInfoCurso);

app.get("/info/cursos/matriculados/:codigoEstudiante", obtenerCursosMatriculadosDeUnEstudiante);
app.get("/info/cursos/impartidos/:cedulaProfesor", cursosQueImparteUnProfesor);
app.get("/info/asistencias/profesores", asistenciasProfesores);
app.get("/info/asistencias/profesores/:cedulaProfesor", asistenciasDeUnProfesor);

app.get("/info/asistencias/estudiantes", asistenciasEstudiantes);
app.get("/info/asistencias/estudiantes/:codigoEstudiante", asistenciasDeUnEstudiante);
module.exports = app;