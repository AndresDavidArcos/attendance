import { Card, CardContent, Typography, Button, TextField} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom"

export default function Profesor(){
const params = useParams();
const cedulaProfesor = params.cedulaProfesor;
const navigate = useNavigate();
const [cursos, setCursos] = useState([]);
const [estudiantes, setEstudiantes] = useState([]);
const [sede, setSede] = useState(0);
const [personalId, setPersonalId] = useState(0);
const [asistencia, setAsistencia] = useState({
    sede_idsede: "",
    hora: "",
    dia: "",
    mes: "",
    anio: "",
    personal_idpersonal: "",
});
const [fecha, setFecha] = useState({
    dia: "",
    mes: "",
    anio: "",
    hora: "",
});
const [nuevaMatricula, setNuevaMatricula] = useState({
    codigoCurso: "",
    codigoEstudiante: "",
});
useEffect(()=>{
obtenerDatos(cedulaProfesor);
}, []);

const obtenerDatos = async(id)=>{
    //cargando sede y id profesor
    const infoProfesorResponse = await fetch("http://localhost:2000/info/profesores/"+cedulaProfesor);
    const infoProfesorData = await infoProfesorResponse.json();
    setSede(infoProfesorData.sede_idsede);
    setPersonalId(infoProfesorData.personal_idpersonal);
    //cargando mis cursos
    const cursosResponse = await fetch("http://localhost:2000/info/cursos/impartidos/"+cedulaProfesor);
    const cursosData = await cursosResponse.json();
    setCursos(cursosData);
    //cargando estudiantes
    const estudiantesResponse = await fetch("http://localhost:2000/info/estudiantes");
    const estudiantesData = await estudiantesResponse.json();
   
    setEstudiantes(estudiantesData.filter(estudiante => estudiante.sede_idsede === infoProfesorData.sede_idsede));
//fecha
const date = new Date();
console.log("fecha: ", date.getDate(), date.getMonth()+1, date.getFullYear(), date.getHours(), date.getMinutes());

setFecha({
    dia: date.getDate(),
mes: date.getMonth()+1,
anio: date.getFullYear(),
hora: `${date.getHours()}:${date.getMinutes()}`,
});
setearAsistencia();
}

const setearAsistencia = () => {
    setAsistencia({
        sede_idsede: sede,
        hora: fecha.hora,
        dia: fecha.dia,
        mes: fecha.mes,
        anio: fecha.anio,
        personal_idpersonal: personalId,
    })

}

const handleChange = (e) => {

setNuevaMatricula({...nuevaMatricula, [e.target.name]:e.target.value});

}

const handleSubmit = async(e) => {
    e.preventDefault();

    await fetch("http://localhost:2000/crear/matricula", {
        method: "POST",
        body: JSON.stringify(nuevaMatricula),
        headers: {"Content-Type": "application/json"},
      });
    
    }
const setearIdEstudianteMatricular = (id) => {
    
    setNuevaMatricula({...nuevaMatricula, codigoEstudiante:id});
}

const confirmarAsistencia = async()=>{

    fetch("http://localhost:2000/crear/asistencia/profesor", {
        method: "POST",
        body: JSON.stringify(asistencia),
        headers: {"Content-Type": "application/json"},
    })

}
return(
<>
<Button 
variant='contained' 
color='primary' 
onClick={()=> confirmarAsistencia()}>Confirmar asistencia</Button>

<div id="misCursos">

<h1>Mis cursos</h1>
{ 
cursos.map((unCurso)=>
( 
<Card style={{marginBottom: ".7rem", 
backgroundColor:"#1e272e"}}
key={unCurso.idcurso}
>
<CardContent style={{display: "flex", justifyContent:"space-between", color: "white"}} >

<Typography>{unCurso.idcurso} </Typography>
<Typography>{unCurso.nombre_materia}</Typography>

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
<Button
style={{color:"black"}} 
variant="contained"
color="primary"
onClick={()=> navigate("/verCursos/"+unEstudiante.idestudiante+"/"+cedulaProfesor) }
style={{marginLeft:".5rem"}}           
>Ver cursos</Button> 

<form onSubmit={handleSubmit}>
<TextField  
variant="filled"
style={{backgroundColor:"white"}}
label="codigo curso"
sx={{display:"block", margin:".5rm 0"}}
name="codigoCurso"
defaultValue=""
onChange={handleChange}
/>
<Button
type="submit"
style={{color:"black"}} 
variant="contained"
color="primary"
style={{marginLeft:".5rem"}}
onClick={()=> setearIdEstudianteMatricular(unEstudiante.idestudiante)}           
>Matricular</Button> 
</form>


</CardContent>
</Card>

))



}



</div>




</>




);
}