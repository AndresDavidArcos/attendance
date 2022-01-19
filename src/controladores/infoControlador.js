const pool = require("../database");

const obtenerInfoSede = async (req, res, next)=>{
    try{ 

        const {idSede} = req.params;
        const response = await pool.query("SELECT nombre from SEDE WHERE idSede = $1;", [idSede]);
        const data = response.rows;
        console.log(data);
        res.json(data[0]);
    }catch(err){
        next(err);
    }
    
    }


const obtenerInfoProfesores = async (req, res, next)=>{
try{ 
    const response = await pool.query("SELECT idPROFESOR, salario, direccion, nombre_eps, nombre_arl, nombre, apellido_paterno, apellido_materno, SEDE_idSEDE from PERSONAL join PROFESOR  ON PERSONAL.idPERSONAL = PROFESOR.PERSONAL_idPERSONAL join EPS on EPS.idEPS = PERSONAL.EPS_ideps join ARL on ARL.idARL = PERSONAL.ARL_idarl;");
    const data = response.rows;
    console.log(data);
    res.json(data);
}catch(err){
    next(err);
}

}
const obtenerInfoProfesor = async (req, res, next)=>{
    try{ 
        const {cedulaProfesor} = req.params;
        const response = await pool.query("SELECT salario, direccion, nombre_eps, nombre_arl, nombre, apellido_paterno, apellido_materno, sede_idsede, personal_idpersonal from (PERSONAL join PROFESOR  ON PERSONAL.idPERSONAL = PROFESOR.PERSONAL_idPERSONAL join EPS on EPS.idEPS = PERSONAL.EPS_ideps join ARL on ARL.idARL = PERSONAL.ARL_idarl) WHERE PROFESOR.idPROFESOR = $1;", [cedulaProfesor]);
        const data = response.rows;
        console.log(data);
        res.json(data[0]);
    }catch(err){
        next(err);
    }
    
    }
const obtenerInfoCursos = async (req, res, next)=>{
    try{ 
        const response = await pool.query("SELECT * FROM CURSO;");
        const data = response.rows;
        console.log(data);
        res.json(data);
    }catch(err){
        next(err);
    }
    
    }
    const obtenerInfoCurso = async (req, res, next)=>{
        try{ 
            const {codigoCurso} = req.params;
            const response = await pool.query("SELECT * FROM CURSO WHERE idCURSO = $1;", [codigoCurso]);
            const data = response.rows;
            console.log(data);
            res.json(data[0]);
        }catch(err){
            next(err);
        }
        
        }
//este metodo me va responder con los cursos que maneja un profesor
    const cursosQueImparteUnProfesor = async (req, res, next)=>{
        try{ 
            const {cedulaProfesor} = req.params;
            const response = await pool.query("SELECT * FROM CURSO WHERE PROFESOR_idPROFESOR = $1;",[cedulaProfesor]);
            const data = response.rows;
            res.json(data);
        }catch(err){
            next(err);
        }
        
        }

        const asistenciasProfesores = async (req, res, next)=>{
            try{ 
                const response = await pool.query("SELECT SEDE.nombre, hora, dia, mes, anio, PERSONAL.SEDE_idSEDE, PROFESOR.idPROFESOR FROM ASISTENCIA_PERSONAL join PERSONAL ON ASISTENCIA_PERSONAL.PERSONAL_idPERSONAL = PERSONAL.idPERSONAL join PROFESOR on PERSONAL.idPERSONAL = PROFESOR.PERSONAL_idPERSONAL join SEDE on ASISTENCIA_PERSONAL.SEDE_idSEDE = SEDE.idSEDE;");
                const data = response.rows;
                console.log(data);
                res.json(data);
            }catch(err){
                next(err);
            }
            
            }
        //este metodo me va responder con las asistencias que tiene un profesor en una sede
            const asistenciasDeUnProfesor = async (req, res, next)=>{
                try{ 
                    const {cedulaProfesor} = req.params;
                    const response = await pool.query("SELECT SEDE.nombre as sede,hora, dia, mes, anio, PERSONAL.nombre, PERSONAL.apellido_paterno, PERSONAL.apellido_materno FROM (ASISTENCIA_PERSONAL join PERSONAL on PERSONAL_idPERSONAL = idPERSONAL join PROFESOR on idPERSONAL = PROFESOR.PERSONAL_idPERSONAL join SEDE on SEDE.idSEDE = ASISTENCIA_PERSONAL.SEDE_idSEDE) WHERE PROFESOR.idPROFESOR = $1;",[cedulaProfesor]);
                    const data = response.rows;
                    console.log(data);
                    res.json(data);
                }catch(err){
                    next(err);
                }
                
                }


const obtenerInfoEstudiantes = async (req, res, next)=>{
    try{ 
        const response = await pool.query("SELECT idESTUDIANTE, direccion_estudiante, nombre, apellido_paterno, apellido_materno, SEDE_idSEDE FROM ESTUDIANTE;");
        const data = response.rows;
        res.json(data);
    }catch(err){
        next(err);
    }
    
    }

    const obtenerInfoEstudiante = async (req, res, next)=>{
        try{ 
            const {codigoEstudiante} = req.params;
            const response = await pool.query("SELECT direccion_estudiante, nombre, apellido_paterno, apellido_materno, sede_idsede FROM ESTUDIANTE WHERE idESTUDIANTE = $1;", [codigoEstudiante]);
            const data = response.rows;
            console.log(data);
            res.json(data[0]);
        }catch(err){
            next(err);
        }
        
        }

    const obtenerCursosMatriculadosDeUnEstudiante = async (req, res, next)=>{
        try{ 
            const {codigoEstudiante} = req.params;
            const response = await pool.query("SELECT SEDE_idSEDE, CURSO_idCURSO, CURSO.nombre_materia FROM (MATRICULA join CURSO on CURSO_idCURSO = idCURSO) WHERE ESTUDIANTE_idESTUDIANTE = $1;",[codigoEstudiante]);
            const data = response.rows;
            console.log(data);
            res.json(data);
        }catch(err){
            next(err);
        }
        
        }

        const asistenciasEstudiantes = async (req, res, next)=>{
            try{ 
                const response = await pool.query("SELECT SEDE.nombre, SEDE_idSEDE, hora, dia, mes, anio, ESTUDIANTE_idESTUDIANTE FROM ASISTENCIA_ESTUDIANTES join SEDE on SEDE_idSEDE = idSEDE;");
                const data = response.rows;
                console.log(data);
                res.json(data);
            }catch(err){
                next(err);
            }
            
            }
        //este metodo me va responder con las asistencias que tiene un profesor en una sede
            const asistenciasDeUnEstudiante = async (req, res, next)=>{
                try{ 
                    const {codigoEstudiante} = req.params;
                    const response = await pool.query("SELECT SEDE.nombre, hora, dia, mes, anio FROM (ASISTENCIA_ESTUDIANTES join SEDE on SEDE_idSEDE = idSEDE) WHERE ESTUDIANTE_idESTUDIANTE = $1;",[codigoEstudiante]);
                    const data = response.rows;
                    console.log(data);
                    res.json(data);
                }catch(err){
                    next(err);
                }
                
                }
module.exports = {obtenerInfoSede, obtenerInfoProfesores, obtenerInfoProfesor, obtenerInfoEstudiantes,obtenerInfoEstudiante ,obtenerCursosMatriculadosDeUnEstudiante,obtenerInfoCursos,obtenerInfoCurso ,cursosQueImparteUnProfesor, asistenciasProfesores, asistenciasDeUnProfesor, asistenciasEstudiantes, asistenciasDeUnEstudiante};