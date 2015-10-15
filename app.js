//app.js

//Modulos a cargar en el servidor
var express = require('express'),
    bodyParser = require('body-parser'),
    config = require('./config/conf');

//Iniciamos la aplicacion de express
var app = express();

//Configuramos express
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

//Configuramos las rutas
require('./controller/controller')(app);

//Iniciamos el servidor
app.listen(config.port, function(){
//    console.log("Magic happens on port: " + config.port);
});

//Exportamos el servidor para los test
module.exports = app;
