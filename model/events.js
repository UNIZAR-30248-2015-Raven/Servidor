//events.js

//Modelo de la BBDD para la tabla eventos
var mongoose = require('mongoose'),
	conf = require('../config/conf');

var db =  mongoose.connection;

db.on('error', console.error);
//Modelo de la base de datos
var eventSchema = new mongoose.Schema({
	id_event: {type: String, require: true, unique: true},
	texto: {type: String, require: true},
	// saber como utilizar el tipo date para día y hora
	day: {type: String, require: false},
	hour: {type: String, require: true},
	periodicidad: {type: String, require: true},
	email: {type: String, require: true}
});

var events = mongoose.model('events', eventSchema);
mongoose.connect('mongodb://' + conf.ddbb.url + ':' + conf.ddbb.port + '/raven');

// Funciones de la BBDD
module.exports = {
	createEvent: function(newEvent_, callback){
		var newEvent = new events(newEvent_);
		newEvent.save(function(err){
			callback(err);
		});
	},
	fetchEvents: function(email_, callback){
        events.find({email: email_}, function(err, eventsList){
            callback(err,eventsList);
        });
    },
    // borra un evento si pasando la id y si tu email es el del creador del evento
	deleteEvent: function(id_, email_, callback){
        events.remove({id_event: id_, email: email_}, function(err, op){
        	//console.log(op.result);
            callback(err, op.result);
        });
    },
}