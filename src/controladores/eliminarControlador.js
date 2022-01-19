const pool = require("../database");

const eliminarProfesor = async (req, res, next)=>{
    try{
        const {cedulaProfesor} = req.params;
        const actualizandoCurso = await pool.query("UPDATE CURSO SET PROFESOR_idPROFESOR = null WHERE PROFESOR_idPROFESOR = $1",[cedulaProfesor]);
        const response = await pool.query("DELETE FROM PERSONAL WHERE idPERSONAL in (SELECT PERSONAL_idPERSONAL FROM PROFESOR join PERSONAL on PERSONAL_idPERSONAL = idPERSONAL WHERE idPROFESOR = $1);",[cedulaProfesor]);
        if(actualizandoCurso.rowCount === 0 || response.rowCount === 0){
            res.status(404).json({message: "Profesor no encontrado, de una cedula valida"});
        }
        res.sendStatus(200).json({message: "se ha eliminado al profesor"});
    }catch(err){
        next(err);
    }
   

}

const eliminarCurso = async (req, res, next) =>{
    
    try{
        const {codigoCurso} = req.params;
    const response = await pool.query("DELETE FROM CURSO WHERE idCurso = $1;", [codigoCurso]);
        if(response.rowCount === 0){
            res.status(404).json({message: "Curso no encontrado, de un codigo valido"});
        }
        res.sendStatus(200).json({message: "se ha eliminado un curso"});
    }catch(err){
        next(err);
    }
};

const eliminarEstudiante = async (req, res, next) =>{
    try {
        const {codigoEstudiante} = req.params;
        const response = await pool.query("DELETE FROM ESTUDIANTE WHERE idESTUDIANTE = $1", [codigoEstudiante]);
        if(response.rowCount === 0){
            res.status(404).json({message:"no se encontro al estudiante, inserte un codigo valido"});
        }
        res.sendStatus(200).json({message: "Un estudiante ha sido eliminado"});
    } catch (error) {
        next(error);
    }
};

module.exports = {eliminarProfesor, eliminarCurso, eliminarEstudiante};