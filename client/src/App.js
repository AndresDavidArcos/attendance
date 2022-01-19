import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./componentes/Login";
import Estudiante from "./componentes/Estudiante";
import Profesor from "./componentes/Profesor";
import InfoSede from "./componentes/InfoSede";
import EditarInfo from "./componentes/EditarInfo";
import VerCursos from "./componentes/VerCursos";
export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/sede/:idSede" element={<InfoSede/>}/>
      <Route path="/profesor/:cedulaProfesor" element={<Profesor/>}/>
      <Route path="/estudiante/:codigoEstudiante/:idSede" element={<Estudiante/>}/>
      <Route path="/editarInfoProfesor/:cedulaProfesor" element={<EditarInfo/>}/>
      <Route path="/editarInfoEstudiante/:codigoEstudiante" element={<EditarInfo/>}/>
      <Route path="/editarInfoCurso/:codigoCurso" element = {<EditarInfo/>}/>
      <Route path="/crearCurso/:idSede" element={<EditarInfo/>}/>            
      <Route path="/editarInfoEstudiante/:codigoEstudiante" element={<EditarInfo/>}/>
      <Route path="/verCursos/:codigoEstudiante" element={<VerCursos/>}/>
      <Route path="/verCursos/:codigoEstudiante/:cedulaProfesor" element={<VerCursos/>}/>

    </Routes>
    </BrowserRouter>
  );
}


