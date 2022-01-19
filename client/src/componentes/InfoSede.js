import { Card, CardContent, Typography, Button} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom"

function InfoSede(){
    
    const navigate = useNavigate();
    const params = useParams();
    const [estudiantes, setEstudiantes] = useState([]);
    const [profesores, setProfesores] = useState([]);
    const [cursos, setCursos] = useState([]);
    const [asistenciaEstudiantes, setAsistenciaEstudiantes] = useState([]);
    const [asistenciaProfesores, setAsistenciaProfesores] = useState([]);
    useEffect(()=>{
        obtenerInfoSede(params.idSede);
    }, []);

    const obtenerInfoSede = async (id) =>{
        //estudiantes
        const students = await fetch("http://localhost:2000/info/estudiantes");
        const dataStudents = await students.json()
        setEstudiantes(dataStudents.filter(unEtudiante => unEtudiante.sede_idsede == id));
        //profesores
        const teachers = await fetch("http://localhost:2000/info/profesores");
        const dataTeachers = await teachers.json()
        setProfesores(dataTeachers.filter(unProfesor => unProfesor.sede_idsede == id));
        //cursos
        const courses = await fetch("http://localhost:2000/info/cursos");
        const dataCourses = await courses.json()
        setCursos(dataCourses.filter(unCurso => unCurso.sede_idsede == id));
        //asistencia estudiantes
        const studentsAsists = await fetch("http://localhost:2000/info/asistencias/estudiantes");
        const dataStudentsAsists = await studentsAsists.json()
        setAsistenciaEstudiantes(dataStudentsAsists.filter(asist => asist.sede_idsede == id));      
        //asistencia profesores 
        const teacherssAsists = await fetch("http://localhost:2000/info/asistencias/profesores");
        const dataTeachersAsists = await teacherssAsists.json()
        setAsistenciaProfesores(dataTeachersAsists.filter(asist => asist.sede_idsede == id));
        
    }

    const eliminarProfesor = async (id) =>{
        const response = await fetch(`http://localhost:2000/eliminar/profesor/${id}`,
        {method:"DELETE",
        })
      
        setProfesores(profesores.filter(unProfesor => unProfesor.idprofesor !== id))

    }
    const eliminarEstudiante = async (id) =>{
      const response = await fetch(`http://localhost:2000/eliminar/estudiante/${id}`,
      {method:"DELETE",
      })
    
      setEstudiantes(estudiantes.filter(unEstudiante => unEstudiante.idestudiante !== id))

  }

  const eliminarCurso = async (id) =>{
    const response = await fetch(`http://localhost:2000/eliminar/curso/${id}`,
    {method:"DELETE",
    })
  
    setCursos(cursos.filter(unCurso => unCurso.idcurso !== id));

}




    return (
        <>
        <div id="profesores">
        <h1>Listado de profesores</h1>
        {
          profesores.map((unProfesor)=>
            ( 
          <Card style={{marginBottom: ".7rem", 
          backgroundColor:"#1e272e"}}
          key={unProfesor.idprofesor}
          >
          <CardContent style={{display: "flex", justifyContent:"space-between", color: "white"}} >
            <Typography>{unProfesor.idprofesor} </Typography>
            <Typography>{unProfesor.nombre}</Typography>
            <Typography>{unProfesor.apellido_paterno} </Typography>
            <Typography>{unProfesor.apellido_materno} </Typography>
            <Typography>{unProfesor.nombre_eps} </Typography>
            <Typography>{unProfesor.nombre_arl} </Typography>
            <Typography>{unProfesor.salario} </Typography>
            <Typography>{unProfesor.direccion} </Typography>
            <Typography>{unProfesor.salario} </Typography>

    <div>     
      <Button
        style={{color:"black"}} 
        variant="contained"
        color="inherit"
        onClick={()=> navigate("/editarInfoProfesor/"+unProfesor.idprofesor) }
        
        >Edit</Button>
        <Button
              variant="contained"
              color="warning"
              onClick={()=> eliminarProfesor(unProfesor.idprofesor) }
              style={{marginLeft:".5rem"}}           
        >Delete</Button> </div>
  
          </CardContent>
        </Card>
       
          ))
        }
        </div>
        <div id="estudiantes">

        <h1>Listado de Estudiantes</h1>
{
  estudiantes.map((unEstudiante)=>
    ( 
  <Card style={{marginBottom: ".7rem", 
  backgroundColor:"#1e272e"}}
  key={unEstudiante.idestudiante}
  >
  <CardContent style={{display: "flex", justifyContent:"space-between", color: "white"}} >

    <Typography>{unEstudiante.idestudiante} </Typography>
    <Typography>{unEstudiante.direccion_estudiante}</Typography>
    <Typography>{unEstudiante.nombre} </Typography>
    <Typography>{unEstudiante.apellido_paterno} </Typography>
    <Typography>{unEstudiante.apellido_materno} </Typography>

<div>     
<Button
style={{color:"black"}} 
variant="contained"
color="inherit"
onClick={()=> navigate("/editarInfoEstudiante/"+unEstudiante.idestudiante) }

>Edit</Button>
<Button
      variant="contained"
      color="warning"
      onClick={()=> eliminarEstudiante(unEstudiante.idestudiante) }
      style={{marginLeft:".5rem"}}           
>Delete</Button> 
<Button
      style={{color:"black"}} 
      variant="contained"
      color="primary"
      onClick={()=> navigate("/verCursos/"+unEstudiante.idestudiante) }
      style={{marginLeft:".5rem"}}           
>Ver cursos</Button> 
</div>

  </CardContent>
</Card>

  ))

  

}



        </div>

        <div id="cursos">

<h1>Listado de cursos</h1>
<Button color="success" variant="contained" onClick={()=> navigate("/crearCurso/"+params.idSede)}>Crear curso</Button>
{
cursos.map((unCurso)=>
( 
<Card style={{marginBottom: ".7rem", 
backgroundColor:"#1e272e"}}
key={unCurso.idprofesor}
>
<CardContent style={{display: "flex", justifyContent:"space-between", color: "white"}} >
<Typography>{unCurso.idcurso} </Typography>
<Typography>{unCurso.nombre_materia}</Typography>
<Typography>{unCurso.profesor_idprofesor} </Typography>

<div>     
<Button
style={{color:"black"}} 
variant="contained"
color="inherit"
onClick={()=> navigate("/editarInfoCurso/"+unCurso.idcurso) }

>Edit</Button>
<Button
variant="contained"
color="warning"
onClick={()=> eliminarCurso(unCurso.idestudiante) }
style={{marginLeft:".5rem"}}           
>Delete</Button> </div>

</CardContent>
</Card>

))
}

</div>

<div id="asistencia_profesores">

<h1>Asistencias de los profesores</h1>
{
asistenciaProfesores.map((asistenciaProfesor)=>
( 
<Card style={{marginBottom: ".7rem", 
backgroundColor:"#1e272e"}}
key={asistenciaProfesor.idprofesor}
>
<CardContent style={{display: "flex", justifyContent:"space-between", color: "white"}} >
<Typography>{asistenciaProfesor.nombre} </Typography>
<Typography>{asistenciaProfesor.hora} </Typography>
<Typography>{asistenciaProfesor.dia}</Typography>
<Typography>{asistenciaProfesor.mes} </Typography>
<Typography>{asistenciaProfesor.anio} </Typography>
<Typography>{asistenciaProfesor.idprofesor} </Typography>


</CardContent>
</Card>

))
}

</div>

<div id="asistencia_estudiantes">

<h1>Asistencias de los estudiantes</h1>
{
asistenciaEstudiantes.map((asistenciaEstudiante)=>
( 
<Card style={{marginBottom: ".7rem", 
backgroundColor:"#1e272e"}}
key={asistenciaEstudiante.estudiante_idestudiante}
>
<CardContent style={{display: "flex", justifyContent:"space-between", color: "white"}} >
<Typography>{asistenciaEstudiante.nombre} </Typography>
<Typography>{asistenciaEstudiante.hora} </Typography>
<Typography>{asistenciaEstudiante.dia}</Typography>
<Typography>{asistenciaEstudiante.mes} </Typography>
<Typography>{asistenciaEstudiante.anio} </Typography>
<Typography>{asistenciaEstudiante.estudiante_idestudiante} </Typography>

</CardContent>
</Card>

))
}

</div>
        </>

      );
}

export default InfoSede;

