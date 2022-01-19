const pool = require("../database");

const obtenerLoginAdministrador = async (req, res, next)=>{
try{ 
    const response = await pool.query("SELECT nombre_admin, contrasena FROM ADMINISTRADOR");
    const data = response.rows;
    console.log(data);
    res.json(data[0]);
}catch(err){
    next(err);
}

}

const obtenerLoginEstudiante = async (req, res, next)=>{
    try{ 
        const response = await pool.query("SELECT idESTUDIANTE, contrasena, SEDE_idSEDE FROM ESTUDIANTE");
        const data = response.rows;
        console.log(data);
        res.json(data);
    }catch(err){
        next(err);
    }
    
    }

    const obtenerLoginProfesor = async (req, res, next)=>{
        try{ 
            const response = await pool.query("SELECT idprofesor, contrasena, SEDE_idSEDE FROM (SELECT * FROM PERSONAL INNER JOIN PROFESOR ON PERSONAL.idPERSONAL = PROFESOR.PERSONAL_idPERSONAL) AS combinacion_profesor_personal;");
            const data = response.rows;
            console.log(data);
            res.json(data);
        }catch(err){
            next(err);
        }
        
        }

module.exports = {obtenerLoginAdministrador, obtenerLoginEstudiante, obtenerLoginProfesor};