//bbdd.js
//Test para la base de datos
var conf = require('../config/conf'),
    expect = require('chai').expect,
    users = require('../model/users.js');
    events = require('../model/events.js');
var now = Date.now();
//Test del servidor
describe('Base de datos', function(){
    describe('#Usuarios', function(){
        //Creacion de un nuevo usuario
        it('Debe crear un nuevo usuario', function(done){
            //Aumento el time-out
            users.removeTlf("000000000", function(){});
            this.timeout(30000);
            var user = {
                tlf: "000000000",
                email: "test@test.com",
                pass: "asdfadfadsfa",
                nombre: "Doctor",
                apellido: "Who",
                timeStamp: now,
                nacimiento: "1994",
                info: "The Doctor is a Time Lord from the planet of"
                    + "Gallifrey who travels through time and space",
                residencia: "Gallifrey",
                contactoNombre: "River",
                contactoApellido: "Song",
                contactoTelefono: "111111111"
            };
            return users.add(user, function(err){
                expect(err).to.equal(null);
                done();
            });
        });
        it('Busca un usuario', function(done){
            this.timeout(30000);
            return users.find("test@test.com", function(err, user){
                expect(user.tlf).to.equal("000000000");
                done();
            });
        });
        it('Borra un usuario por tlf', function(done){
            this.timeout(30000);
            return users.removeTlf("000000000", function(err){
                expect(err).to.equal(null)
                done();
            });
        });
        // Lista los eventos y borra el de la primera posición
        // Ya que se borra por el id_event y es autogenerado
        // No lo sabemos de antemano
        it('Borra un evento por id', function(done){
            this.timeout(30000);
            var id_event = "";
            events.fetchEvents("rgcmb@hotmail.com", function(err, evento){
                id_event = evento[0].id_event;
                //console.log(id_event);
                return events.deleteEvent(id_event, function(err){
                    expect(err).to.equal(null)
                    done();
                });
            });
            
        });
    });
});
