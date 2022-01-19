import {Typography,  Card, Grid, CardContent, TextField, Button, Select, InputLabel, MenuItem } from '@mui/material';
import React, { useState,  } from 'react';
import {useNavigate, useParams} from "react-router-dom";

function Login(){

const navigate = useNavigate();
const [usuario, setUser] = useState({
    userName: "",
    password: "",
    idSede: "",
    tipoUsuario: ""
  });
    const handleChange = async (e) =>{
        setUser({...usuario, [e.target.name]:e.target.value} )
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        if(usuario.tipoUsuario == 1){
            //administrador
            const res = await fetch("http://localhost:2000/login/administrador");
            const data = await res.json();
            console.log(data);
            console.log("mi contraseña: ", usuario.password)
            console.log("mi nombre: ", usuario.userName)
            console.log("mi sede es: ", usuario.idSede)
            if(data.nombre_admin == usuario.userName && data.contrasena == usuario.password){
                navigate("/sede/"+usuario.idSede);

            }else{
                console.log("usuario no coincide con la base de datos");
            }
        }else if(usuario.tipoUsuario == 2){
            //estudiante
            const res = await fetch("http://localhost:2000/login/estudiante");
            const data = await res.json();
            console.log(data);

            let existeElEstudiante = false;
            let codigoEstudiante = 0;
            let idSede = 0;
            data.map((unEstudiante)=>{

                if(unEstudiante.idestudiante == usuario.userName && unEstudiante.contrasena == usuario.password){
                    existeElEstudiante = true;
                    codigoEstudiante = unEstudiante.idestudiante;
                    idSede = unEstudiante.sede_idsede;
                }
            })
            if(existeElEstudiante){
                navigate("/estudiante/"+codigoEstudiante+"/"+idSede);
            }else{
                console.log("estudiante no coincide con la base de datos");
            }
        }else{
            //profesor
            const res = await fetch("http://localhost:2000/login/profesor");
            const data = await res.json();
            console.log(data);
            let existeElProfesor = false;
            let cedulaProfesor = "";
            data.map((unProfesor)=>{

                if(unProfesor.idprofesor == usuario.userName && unProfesor.contrasena == usuario.password){
                    existeElProfesor = true;
                    cedulaProfesor = unProfesor.idprofesor;
                }
            })
            if(existeElProfesor){
                navigate("/profesor/"+cedulaProfesor);
            }else{
                console.log("profesor no coincide con la base de datos");
            }
        }   




        };
  
    return (
        <Grid container>
          <Grid item xs={3}>
            <Card sx={{mt: 5}}>
              <Typography>Login</Typography>
              <CardContent>
                <form onSubmit={handleSubmit}>
                <InputLabel id="tipoUsuarioLabel">¿Quien eres?</InputLabel>
                <Select
                    labelId="tipoUsuarioLabel"
                    label="Quien eres"
                    name="tipoUsuario"
                    onChange={handleChange}
                >
                    <MenuItem value={1}>Administrador</MenuItem>
                    <MenuItem value={2}>Estudiante</MenuItem>
                    <MenuItem value={3}>Profesor</MenuItem>
                </Select>
                <InputLabel id="sedeLabel">¿Cual es tu sede?</InputLabel>
                <Select
                
                    labelId="sedeLabel"
                    label="Cual es tu sede"
                    name="idSede"
                    onChange={handleChange}
                >
                    <MenuItem value={1}>Melendez</MenuItem>
                    <MenuItem value={2}>San Fernando</MenuItem>
                </Select>
                  <TextField  variant="filled"
                  label="Username"
                  sx={{display:"block", margin:".5rm 0"}}
                  name="userName"
                  onChange={handleChange}
                  
                  />
                  <TextField
                  variant="filled"
                  label="Password"
                  sx={{display:"block", margin:".5rm 0"}}
                  name="password"
                  onChange={handleChange}
                  />
  
                  <Button
                   sx={{margin: ".5rm 0"}}
                    variant="contained" 
                    color="primary" 
                    type="submit"
                    >
                    Entrar
                  </Button>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      );
}

export default Login;