var conf = require('../config/conf'),
    request = require('supertest'),
    express = require('express'),
    app = require('../app');

//Test del servidor
describe('Controller', function(){
    //Comprobamos que el test esta corriendo
    it('existe el servidor', function(done){
        request(app)
            .get('/up')
            .expect(200, done);
    });
    //Comprobamos que funciona la llamada a crear usuario
    it('llamada para crear usuario', function(done){
        var user = {
            tlf: "000000000",
            email: "test@test.com",
            pass: "asjdflakjfla",
            nombre: "Doctor",
            apellido: "Who",
            info: "The Doctor is a Time Lord from the planet of"
                + "Gallifrey who travels through time and space",
            residencia: "Gallifrey",
            nacimiento: Date.now(),
            contacto: {
                nombre: "River",
                apellidos: "Song",
                tlf: "111111111"
            }
        };
        return request(app)
            .post('/createUser')
            .send(user)
            .expect(200, done);
    });
});

