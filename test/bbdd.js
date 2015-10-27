//bbdd.js
//Test para la base de datos
var conf = require('../config/conf'),
    expect = require('chai').expect,
    users = require('../model/users.js');

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
                timeStamp: Date.now(),
                nacimiento: Date.now(),
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
        it('Borra un usuario por tlf', function(done){
            this.timeout(30000);
            return users.removeTlf("000000000", function(err){
                expect(err).to.equal(null)
                done();
            });
        });
    });
});
