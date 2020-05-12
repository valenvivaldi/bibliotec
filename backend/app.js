'use strict'

//cargar modulos para crear servidor
var express = require("express");
var bodyParser = require("body-parser")
//ejecutar express
var app = express();


// cargar middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//CORS


//prefijos

//exportar modulo (fichero actual)
module.exports= app;
