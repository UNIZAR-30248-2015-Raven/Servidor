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
    email: {type: String, require: true, unique: true},
    pass: {type: String, require: true},
    nombre: {type: String, require: true},
    apellido: {type: String, require: true},
    info: {type: String, require: true},
    residencia: {type: String},
    timeStamp: {type: Date, require: true},
    nacimiento: {type: String},
    contactoNombre: {type: String},
    contactoApellido: {type: String},
    contactoTelefono: {type: String}
});
var users = mongoose.model('users', userSchema);

mongoose.connect('mongodb://' + conf.ddbb.url + ':' + conf.ddbb.port + '/raven');
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
    },
    //Comprobar que hacemos el login correctamente sobre un usuario que exista
    //previamente
    login: function(datosLogin_, callback) {
      // funcion de busqueda que el usuario y la contraseña coincidan
      // devolveremos el error , y los datos del usuario
      users.findOne({"email": datosLogin_.email , "pass":datosLogin_.pass}, function(err, user){
        callback(err,  user);
      });
    },
    //Devuelve la informacion del usuario
    find: function(email_, callback){
        users.findOne({"email":email_}, function(err, user){
            callback(err, user);
        });
    }
};
