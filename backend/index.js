'use strict'
var mongoose = require('mongoose');
var app = require("./app")
var port= 3900;

mongoose.set("useFindAndModify",false);
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/database-dev', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("conexion exitosa a la base")
    app.listen(port,()=>{
        console.log("servidor corriendo en localhost:"+port);
    });
});