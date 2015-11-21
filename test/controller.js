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
            nacimiento: "1994",
            contactoNombre: "River",
            contactoApellido: "Song",
            contactoTelefono: "111111111"
        };
        return request(app)
            .post('/createUser')
            .send(user)
            .expect(200, done);
    });
    it('llamada para logear al usuario', function(done) {
      this.timeout(30000);
      return request(app)
      .post('/loginUser')
      .send({"email":"test@test.com" ,"pass":"asjdflakjfla"})
      .expect(200, done);
    })

    it('llamada para logear al usuario con contraseña mal', function(done) {
      this.timeout(30000);
      return request(app)
        .post('/loginUser')
        .send({"email":"test@test.com" ,"pass":"RubenTosesy"})
        .expect(400, done);
    })
    it('busca a un usuario bien', function(done){
        this.timeout(30000);
        return request(app)
            .get('/findUser/test@test.com')
            .expect(200, done);
    });
    it('busca mal un usuairo', function(done){
        this.timeout(30000);
        return request(app)
            .get('/findUser/RubenToViejo@asilo.com')
            .expect(400, done);
    });
    it('llamada para logear sin parámetros', function(done) {
      this.timeout(30000);
      return request(app)
        .get('/loginUser')
        .expect(404, done);
    });
    it('crear evento', function(done) {
      this.timeout(30000);
      return request(app)
        .post('/createEvent')
        .send({
            id_event : "",
            texto : "Es mi cumpleaños",
            day: "12 05 2015",
            hour: "00:00",
            periodicidad : "0",
            email : "rgcmb@hotmail.com"})
        .expect(200, done);
    });
    it('Listar eventos', function(done){
        this.timeout(30000);
        request(app)
            .get('/getEvents/rgcmb@hotmail.com')
            //.expect(200, done)
            .end(function(err, req) {
                if (req.status == 200){
                     if (req.body != null) {
                         event = req.body;
                        done();
                     }
                }
                throw err;
            });
    });
    it('No devuelve un evento', function(done){
        this.timeout(30000);
        request(app)
            .get('/getEvent/12')
            .expect(400, done);
    });
    it('No devuelve un evento', function(done){
        this.timeout(30000);
        request(app)
            .get('/getEvent/' + event[0].id_event)
            .expect(200, done);
    });
    // Tiene que fallar por que no exite un evento con el id y usuario especificados
    it('Borrar evento fallido', function(done){
        this.timeout(30000);
        request(app)
            .delete('/deleteEvent')
            //.expect(200, done)
            .send({
                id_event : "22",
                email : "rgcmb@hotmail"
                })
            .expect(400, done);
    });
});
