//users.js

//Modelo de la BBDD para la tabla de usuarios
var mongoose = require('mongoose'),
    conf = require('../config/conf');

//Conexion con el servidor
var db = mongoose.connection;

db.on('error', console.error);
//Modelo de la base de datos
var userSchema = new mongoose.Schema({
    tlf: {type: String, require: true, unique: true},
    email: {type: String, unique: true, require: true},
    nombre: {type: String, require: true},
    apellido: {type: String, require: true},
    info: {type: String, require: true},
    timeStamp: {type: Date, require: true},
    contacto: [{nombre: String, apellidos: String, tlf: String}],
});
var users = mongoose.model('users', userSchema);

mongoose.connect('mongodb://' + conf.ddbb.url + '/raven');
//Funciones de la BBDD
module.exports = {
    //Callback es una funcion que realiza acciones dependiendo del fallo o no de
    //la agregacion a la bbdd
    add: function(newUser_, callback){
        var newUser = new users(newUser_);
        newUser.save(function(err){
            callback(err);
        });
    },
    //Borrar usuario, creada al principio por necesidad de tener para las
    //pruebas
    removeTlf: function(tlf_, callback){
        users.remove({tlf: tlf_}, function(err){
            callback(err);
        });
    }
};