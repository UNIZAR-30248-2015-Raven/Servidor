var conf = require('../config/conf'),
    request = require('supertest'),
    express = require('express'),
    app = require('../app');

//Test del servidor
describe('Controller', function(){
    //Comprobamos que el test esta corriendo
    it('existe el servidor', function(done){
        request(app)
            .get('/')
            .expect(200, done);
    });
    //Comprobamos que funciona la llamada a crear usuario
    it('Llamada para crear usuario', function(done){
        //Aumento del timeout por internet
        this.timeout(30000);
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
            contactoNombre: "River",
            contactoApellido: "Song",
            contactoTelefono: "111111111"
        };
        return request(app)
            .post('/createUser')
            .send(user)
            .expect(200, done);
    });
});

