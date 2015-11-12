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
	timeStamp: {type: Date, require: true},
	periodicidad: {type: Number, require: true},
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
	deleteEvent: function(id_, callback){
        events.remove({id_event: id_}, function(err){
            callback(err);
        });
    },
}