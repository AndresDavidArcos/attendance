import { Card, CardContent, Typography, Button} from '@mui/material';
import React, {useEffect, useState, Fragment} from 'react';
import {useNavigate, useParams} from "react-router-dom";


function VerCursos(props){

    const navigate = useNavigate();
    const params = useParams();
    const [cursosEstudiante, setCursosEstudiante] = useState([]);

    useEffect(async()=>{

    const response = await fetch("http://localhost:2000/info/cursos/matriculados/"+params.codigoEstudiante)
    const dataResponse = await response.json();
    setCursosEstudiante(dataResponse); 
    }, []);


    return(

    <>

       <div id="estudiantes">

<h1>Cursos del estudiante</h1>
{
cursosEstudiante.map((unCurso)=>
( 
<Card style={{marginBottom: ".7rem", 
backgroundColor:"#1e272e"}}
key={unCurso.curso_idcurso}
>
<CardContent style={{display: "flex", justifyContent:"space-between", color: "white"}} >

<Typography>{unCurso.nombre_materia} </Typography>
<Typography>{unCurso.curso_idcurso}</Typography>

<Button
style={{color:"black"}} 
variant="contained"
color="primary"
onClick={()=> params.cedulaProfesor ? navigate("/profesor/"+params.cedulaProfesor) : navigate("/sede/"+params.idSede) }
style={{marginLeft:".5rem"}}           
>{params.cedulaProfesor ? "Volver a mi info" : "Volver a la sede"}</Button> 

</CardContent>
</Card>

))



}


</div>


    </>

    );
}

export default VerCursos;


