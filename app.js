'use strict'

//cargar modulos para crear servidor
var express = require("express");
var bodyParser = require("body-parser")

//modulo de autentificacion
var passport = require('passport');


//ejecutar express
var app = express();


//cargar rutas
var book_routes =require('./routes/book');
var user_routes = require('./routes/user')

// cargar middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(passport.initialize());
require("./config/passport")(passport);

//CORS // Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});




//prefijos / cargar rutas
app.use('/book',book_routes);
app.use("/user", user_routes);

//exportar modulo (fichero actual)
module.exports= app;
