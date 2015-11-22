//app.js

//Modulos a cargar en el servidor
var express = require('express'),
    bodyParser = require('body-parser'),
    config = require('./config/conf');

//Iniciamos la aplicacion de express
var app = express();

//Para desplegar en openshift
var server_port = process.env.OPENSHIFT_NODEJS_PORT || config.port
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || config.url
//var server_port = conf.port
//var server_ip_address = conf.url



//Configuramos express
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Configuramos las rutas
require('./controller/eventsController')(app);
require('./controller/usersController')(app);

//Iniciamos el servidor
app.listen(server_port, server_ip_address, function(){
//    console.log("Magic happens on port: " + config.port);
});

//Exportamos el servidor para los test
module.exports = app;
