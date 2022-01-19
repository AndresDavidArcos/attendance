const pool = require("../database");

const actualizarInfoProfesor = async(req, res, next) =>{
    try{
     const {cedulaProfesor} = req.params;
     const {nombre, apellido_paterno, apellido_materno, direccion, salario} = req.body;
     const response = await pool.query("UPDATE PERSONAL SET nombre = $1, apellido_paterno = $2, apellido_materno = $3, direccion = $4, salario = $5 WHERE idPERSONAL IN (SELECT PERSONAL_idPERSONAL FROM PROFESOR WHERE idPROFESOR = $6);", [nombre, apellido_paterno, apellido_materno, direccion, salario, cedulaProfesor]);
     if(response.rowCount === 0){
        res.status(404).json({message: "profesor no encontrado, porfavor de una cedula valida"});
    }
    res.status(200).end();

    }catch(err){
        next(err);
    }
}

const actualizarInfoEstudiante = async(req, res, next) =>{
    try{
     const {codigoEstudiante} = req.params;
     const {direccion_estudiante, nombre, apellido_paterno, apellido_materno} = req.body;
     const response = await pool.query("UPDATE ESTUDIANTE SET direccion_estudiante = $1, nombre = $2, apellido_paterno = $3, apellido_materno = $4 WHERE idEstudiante = $5;",[direccion_estudiante, nombre, apellido_paterno, apellido_materno, codigoEstudiante]);
     if(response.rowCount === 0){
        res.status(404).json({message: "Estudiante no encontrado, porfavor de un codigo valido"});
    }
    res.status(200).end();
    }catch(err){
        next(err);
    }
}

const actualizarCurso = async(req, res, next) => {
    try{
        const {codigoCurso} = req.params;
        const {nombre_materia, profesor_idprofesor} = req.body;
        const response = await pool.query("UPDATE CURSO SET nombre_materia = $1, PROFESOR_idPROFESOR = $2 WHERE idCURSO = $3", [nombre_materia, profesor_idprofesor, codigoCurso]);
        if(response.rowCount === 0){
            res.status(404).json({message: "curso no encontrado, porfavor de un codigo valido"});
        }
        res.status(200).end();

    }catch(err){
        next(err);
    }
}



module.exports = {actualizarInfoProfesor, actualizarInfoEstudiante, actualizarCurso};