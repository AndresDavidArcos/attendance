const pool = require("../database");

const crearCurso = async (req, res, next)=>{
    try{
        const {nombre_materia, profesor_idprofesor, sede_idsede} = req.body;
        await pool.query("INSERT INTO CURSO (nombre_materia, PROFESOR_idPROFESOR, SEDE_idSEDE) VALUES ($1, $2, $3)", [nombre_materia, profesor_idprofesor, sede_idsede]);
        res.status(200).json({message: "se ha creado un nuevo curso"});
    }catch(error){
        next(error);
    }
}
//esta funcion permitira a los profesores matricular un estudiante a sus cursos
const matricularEstudiante = async (req, res, next)=>{
    try{
        const {codigoCurso, codigoEstudiante} = req.body;
        await pool.query("INSERT INTO MATRICULA (CURSO_idCURSO, ESTUDIANTE_idESTUDIANTE) VALUES ($1, $2)", [codigoCurso, codigoEstudiante]);
        res.status(200).json({message: "el estudiante ha sido matriculado"});
    }catch(error){
        next(error);
    }
}

const confirmarAsistenciaEstudiante = async (req, res, next)=>{
    try{
        const {sede_idsede, hora, dia, mes, anio, estudiante_idestudiante} = req.body;
        
        await pool.query("INSERT INTO ASISTENCIA_ESTUDIANTES (sede_idsede, hora, dia, mes, anio, estudiante_idestudiante) VALUES ($1, $2, $3, $4, $5, $6)", [sede_idsede, hora, dia, mes, anio, estudiante_idestudiante]);
        res.status(200).json({message: "el estudiante ha confirmado su asistencia"});
    }catch(error){
        next(error);
    }
}

const confirmarAsistenciaProfesor = async (req, res, next)=>{
    try{
        console.log("QUE MIERDA PASAAAAAA")
        const {sede_idsede, hora, dia, mes, anio, personal_idpersonal} = req.body;
        console.log("fock yu", sede_idsede, hora, dia, mes, anio, personal_idpersonal)
        
        await pool.query("INSERT INTO ASISTENCIA_PERSONAL (sede_idsede, hora, dia, mes, anio, personal_idpersonal) VALUES ($1, $2, $3, $4, $5, $6)", [sede_idsede, hora, dia, mes, anio, personal_idpersonal]);
        res.status(200).json({message: "el profesor ha confirmado su asistencia"});
    }catch(error){
        next(error);
    }
}



module.exports = {crearCurso, matricularEstudiante, confirmarAsistenciaEstudiante, confirmarAsistenciaProfesor};