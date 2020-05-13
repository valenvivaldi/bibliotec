'use strict'

//cargar modulos para crear servidor
var express = require("express");
var bodyParser = require("body-parser")
//ejecutar express
var app = express();


//cargar rutas
var book_routes =require('./routes/book');
                        

// cargar middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//CORS




//prefijos / cargar rutas
app.use('/book',book_routes);

//exportar modulo (fichero actual)
module.exports= app;
