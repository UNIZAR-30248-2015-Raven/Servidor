var conf = require('../config/conf'),
    request = require('supertest'),
    express = require('express'),
    app = require('../app');

var event = {};
//Test del servidor
describe('Controller', function(){
    //Comprobamos que el test esta corriendo
    it('existe el servidor', function(done){
        request(app)
            .get('/')
            .expect(200, done);
    }),
    //Comprobamos que funciona la llamada a crear usuario
    it('Llamada para crear usuario', function(done){
        //Aumento del timeout por internet
        this.timeout(30000);
        var user = {
            tlf: "000010000",
            email: "a@a.com",
            pass: "asjdflakjfla",
            nombre: "Doctor",
            apellido: "Who",
            info: "The Doctor is a Time Lord from the planet of"
                + "Gallifrey who travels through time and space",
            residencia: "Gallifrey",
            nacimiento: "1994",
            contactoNombre: "River",
            contactoApellido: "Song",
            contactoTelefono: "111111111"
        };
        return request(app)
            .post('/createUser')
            .send(user)
            .expect(200, done);
    }),
    it('llamada para logear al usuario', function(done) {
      this.timeout(30000);
      return request(app)
          .post('/loginUser')
          .send({"email":"a@a.com" ,"pass":"asjdflakjfla"})
          .expect(200, done);
    }),
    it('llamada para logear al usuario con contraseña mal', function(done) {
      this.timeout(30000);
      return request(app)
        .post('/loginUser')
        .send({"email":"a@a.com" ,"pass":"RubenTosesy"})
        .expect(400, done);
    }),
    it('busca a un usuario bien', function(done){
        this.timeout(30000);
        return request(app)
            .get('/findUser/a@a.com')
            .expect(200, done);
    }),
    it('busca mal un usuario', function(done){
        this.timeout(30000);
        return request(app)
            .get('/findUser/RubenToViejo@asilo.com')
            .expect(400, done);
    }),
    it('llamada para logear sin parámetros', function(done) {
      this.timeout(30000);
      return request(app)
        .get('/loginUser')
        .expect(404, done);
    }),
    it('modifica un usuario', function(done){
        this.timeout(30000);
        var user = {
            tlf: "000010000",
            email: "a@a.com",
            pass: "asjdflakjfla",
            nombre: "Dummy",
            apellido: "Dummy",
            info: "Dummy",
            residencia: "Dummy",
            nacimiento: "1994",
            contactoNombre: "Dummy",
            contactoApellido: "Dummy",
            contactoTelefono: "111111111"
        };
        return request(app)
            .post('/modifyUser/a@a.com')
            .send(user)
            .expect(200, done);
    }),
    it('borrar un usuario', function(done){
        this.timeout(30000);
        var user = {
            email: "a@a.com",
            pass: "asjdflakjfla",
        };
        return request(app)
            .post('/deleteUser')
            .send(user)
            .expect(200, done);
    })
});
