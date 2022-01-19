const express = require("express");
const morgan = require("morgan");
const cors = require("cors");


const app = express();
//middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
//configuraciones
app.set("port","2000");

//rutas
app.use(require("./rutas/loginRutas"));
app.use(require("./rutas/infoRutas"));
app.use(require("./rutas/crearRutas"));
app.use(require("./rutas/actualizarRutas"));
app.use(require("./rutas/eliminarRutas"));
//manejador de errores
app.use((err,req,res,next)=>{
    res.json({message: err.message});
})

app.listen(app.get("port"), ()=>{
    console.log("backend escuchando en el puerto "+app.get("port"));
})