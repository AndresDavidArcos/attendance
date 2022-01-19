import {Typography,  Card, Grid, CardContent, TextField, Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import {useNavigate, useParams} from "react-router-dom";

export default function EditarInfo(){

    const navigate = useNavigate();  
    const params = useParams();
    const [estudiante, setEstudiante] = useState({
        direccion_estudiante: "",
        nombre: "",
        apellido_paterno: "",
        apellido_materno: "",
        sede_idsede: "",
      })

      const [profesor, setProfesor] = useState({
        salario: "",
        direccion: "",
        nombre: "",
        apellido_paterno: "",
        apellido_materno: "",
        sede_idsede: "",

      });
      
      const [curso, setCurso] = useState({
          nombre_materia: "",
          profesor_idprofesor: "",
          sede_idsede: params.idSede?params.idSede:"",

      });

      const [esEstudiante, setEsEstudiante] = useState(false);
      const [esProfesor, setEsProfesor] = useState(false);
      const [esCurso, setEsCurso] = useState(false);
      const [creandoCurso, setCreandoCurso] = useState(false);

      useEffect(()=>{
    
        if(params.cedulaProfesor){
          cargarProfesor(params.cedulaProfesor);
        }else if(params.codigoEstudiante){
          cargarEstudiante(params.codigoEstudiante);
        }else if(params.codigoCurso){
            cargarCurso(params.codigoCurso);
        }else{
          setCreandoCurso(true);
        }
        },[params.id])

const cargarProfesor = async (id) =>{
  const response = await fetch("http://localhost:2000/info/profesores/"+id);
  const dataResponse = await response.json();
  setProfesor({
    salario: dataResponse.salario,
    direccion: dataResponse.direccion,
    nombre: dataResponse.nombre,
    apellido_paterno: dataResponse.apellido_paterno,
    apellido_materno: dataResponse.apellido_materno,
    sede_idsede: dataResponse.sede_idsede,

  })

  setEsProfesor(true);

}

const cargarEstudiante = async (id) =>{
  const response = await fetch("http://localhost:2000/info/estudiantes/"+id);
  const dataResponse = await response.json();
  setEstudiante({
    direccion_estudiante: dataResponse.direccion_estudiante,
    nombre: dataResponse.nombre,
    apellido_paterno: dataResponse.apellido_paterno,
    apellido_materno: dataResponse.apellido_materno,
    sede_idsede: dataResponse.sede_idsede,

  })

  setEsEstudiante(true);


}

const cargarCurso = async (id) =>{
  const response = await fetch("http://localhost:2000/info/cursos/"+id);
  const dataResponse = await response.json();
  setCurso({
   nombre_materia: dataResponse.nombre_materia,
   profesor_idprofesor: dataResponse.profesor_idprofesor,
   sede_idsede: dataResponse.sede_idsede,

  })
 setEsCurso(true);


}

const handleSubmit = async (e) => {
  e.preventDefault();

  if(esProfesor){
      await fetch("http://localhost:2000/actualizar/profesor/"+params.cedulaProfesor, {
      method: "PUT",
      body: JSON.stringify(profesor),
      headers: {"Content-Type": "application/json"},
    });
    navigate("/sede/"+profesor.sede_idsede);
  }else if(esEstudiante){
    await fetch("http://localhost:2000/actualizar/estudiante/"+params.codigoEstudiante, {
      method: "PUT",
      body: JSON.stringify(estudiante),
      headers: {"Content-Type": "application/json"},
    });
    navigate("/sede/"+estudiante.sede_idsede);

  }else if(esCurso){
    await fetch("http://localhost:2000/actualizar/curso/"+params.codigoCurso, {
      method: "PUT",
      body: JSON.stringify(curso),
      headers: {"Content-Type": "application/json"},
    });
    navigate("/sede/"+curso.sede_idsede);

  }else if(creandoCurso){
    await fetch("http://localhost:2000/crear/curso", {
      method: "POST",
      body: JSON.stringify(curso),
      headers: {"Content-Type": "application/json"},
    });
    navigate("/sede/"+params.idSede);
  }

}

const handleChange = (e) => {

  if(esProfesor){
 setProfesor({...profesor, [e.target.name]:e.target.value});
}else if(esEstudiante){
  setEstudiante({...estudiante, [e.target.name]:e.target.value});

}else if(esCurso || creandoCurso){
  setCurso({...curso, [e.target.name]:e.target.value});

}
}
return ( 
  <>
{(()=>{ 
if(esProfesor){
  return(

    <Grid container>
    <Grid item xs={3}>
      <Card sx={{mt: 5}}>
        <Typography>Editando al profesor</Typography>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <TextField  variant="filled"
            label="salario"
            sx={{display:"block", margin:".5rm 0"}}
            name="salario"
            value={profesor.salario}
            onChange={handleChange}
            
            />
            <TextField
            variant="filled"
            label="direccion"
            sx={{display:"block", margin:".5rm 0"}}
            name="direccion"
            value={profesor.direccion}

            onChange={handleChange}
            />
              <TextField  variant="filled"
            label="nombre"
            sx={{display:"block", margin:".5rm 0"}}
            name="nombre"
            value={profesor.nombre}

            onChange={handleChange}
            
            />
            <TextField
            variant="filled"
            label="apellido paterno"
            sx={{display:"block", margin:".5rm 0"}}
            name="apellido_paterno"
            value={profesor.apellido_paterno}

            onChange={handleChange}
            />
              <TextField
            variant="filled"
            label="apellido materno"
            sx={{display:"block", margin:".5rm 0"}}
            name="apellido_materno"
            value={profesor.apellido_materno}

            onChange={handleChange}
            />
            <Button
              type="submit"
             sx={{margin: ".5rm 0"}}
              variant="contained" 
              color="primary" 
              type="submit"
              >
              Guardar
            </Button>
          </form>
        </CardContent>
      </Card>
    </Grid>
  </Grid>
  
  );
}else if(esEstudiante){
  return(

    <Grid container>
    <Grid item xs={3}>
      <Card sx={{mt: 5}}>
        <Typography>Editando al estudiante</Typography>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <TextField  variant="filled"
            label="direccion"
            sx={{display:"block", margin:".5rm 0"}}
            name="direccion_estudiante"
            defaultValue={estudiante.direccion_estudiante}

            onChange={handleChange}
            
            />
            <TextField
            variant="filled"
            label="nombre"
            sx={{display:"block", margin:".5rm 0"}}
            name="nombre"
            defaultValue={estudiante.nombre}
            onChange={handleChange}
            />
             
            <TextField
            variant="filled"
            label="apellido paterno"
            sx={{display:"block", margin:".5rm 0"}}
            name="apellido_paterno"
            defaultValue={estudiante.apellido_paterno}

            onChange={handleChange}
            />
              <TextField
            variant="filled"
            label="apellido materno"
            sx={{display:"block", margin:".5rm 0"}}
            name="apellido_materno"
            defaultValue={estudiante.apellido_materno}

            onChange={handleChange}
            />
            <Button
              type="submit"
             sx={{margin: ".5rm 0"}}
              variant="contained" 
              color="primary" 
              type="submit"
              >
              Guardar
            </Button>
          </form>
        </CardContent>
      </Card>
    </Grid>
  </Grid>
  
  );
}else if(esCurso || creandoCurso){
  return(

    <Grid container>
    <Grid item xs={3}>
      <Card sx={{mt: 5}}>
        <Typography>{creandoCurso ? "Creando curso" : "Editando curso"}</Typography>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <TextField  variant="filled"
            label="nombre de la materia"
            sx={{display:"block", margin:".5rm 0"}}
            name="nombre_materia"
            defaultValue={curso.nombre_materia}
            onChange={handleChange}

            />
            <TextField
            variant="filled"
            label="cedula del profesor a cargo"
            sx={{display:"block", margin:".5rm 0"}}
            name="profesor_idprofesor"
            defaultValue={curso.profesor_idprofesor}
            onChange={handleChange}
            />
             
            <Button
              type="submit"
             sx={{margin: ".5rm 0"}}
              variant="contained" 
              color="primary" 
              type="submit"
              >
              Guardar
            </Button>
          </form>
        </CardContent>
      </Card>
    </Grid>
  </Grid>
  
  );
}
})()}
</>
)
}