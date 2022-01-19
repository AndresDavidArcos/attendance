import { Card, CardContent, Typography, Button, TextField} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom"

export default function Estudiante(){


const navigate = useNavigate();
const params = useParams();
const codigoEstudiante = params.codigoEstudiante;
const sedeEstudiante = params.idSede;
const [misCursos, setMisCursos] = useState([]);
const [asistencia, setAsistencia] = useState({
    sede_idsede: "",
    hora: "",
    dia: "",
    mes: "",
    anio: "",
    estudiante_idestudiante: "",
});

const [fecha, setFecha] = useState({
    dia: "",
    mes: "",
    anio: "",
    hora: "",
});

useEffect(()=>{
obtenerDatos();
}, [asistencia])

const obtenerDatos = async() =>{
    //cursos
    const cursosResponse = await fetch("http://localhost:2000/info/cursos/matriculados/"+codigoEstudiante);
    const cursosData = await cursosResponse.json();
    setMisCursos(cursosData);

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
        sede_idsede: sedeEstudiante,
        hora: fecha.hora,
        dia: fecha.dia,
        mes: fecha.mes,
        anio: fecha.anio,
        estudiante_idestudiante: codigoEstudiante,
    })

}

const confirmarAsistencia = async()=>{

    fetch("http://localhost:2000/crear/asistencia/estudiante", {
        method: "POST",
        body: JSON.stringify(asistencia),
        headers: {"Content-Type": "application/json"},
    })

}


return(
<>
<div id="misCursos">

<h1>Mis cursos</h1>
{ 
misCursos.map((unCurso)=>
( 
<Card style={{marginBottom: ".7rem", 
backgroundColor:"#1e272e"}}
key={unCurso.idcurso}
>
<CardContent style={{display: "flex", justifyContent:"space-between", color: "white"}} >

<Typography>{unCurso.curso_idcurso} </Typography>
<Typography>{unCurso.nombre_materia}</Typography>

</CardContent>
</Card>

))
}
</div>
<Button variant='contained' color='primary' onClick={()=> confirmarAsistencia()}>Confirmar asistencia</Button>



</>




);
}