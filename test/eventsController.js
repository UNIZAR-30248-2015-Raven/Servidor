var conf = require('../config/conf'),
    request = require('supertest'),
    express = require('express'),
    app = require('../app');

var event = {};
//Test del servidor
describe('eventsController', function(){
    it('crear evento', function(done) {
      this.timeout(30000);
      return request(app)
        .post('/createEvent')
        .send({
            id_event : "",
            texto : "Es mi cumpleaños",
            day: "2015 05 12",
            hour: "00:00",
            periodicidad : "0",
            email : "rgcmb@hotmail.com"})
        .expect(200, done);
    }),
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
    }),
    it('No devuelve un evento', function(done){
        this.timeout(30000);
        request(app)
            .get('/getEvent/12')
            .expect(400, done);
    }),
    it('No devuelve un evento', function(done){
        this.timeout(30000);
        request(app)
            .get('/getEvent/' + event[0].id_event)
            .expect(200, done);
    }),
    it('Modifica un evento', function(done){
        this.timeout(30000);
        return request(app)
          .post('/modifyEvent/' + event[0].id_event)
          .send({
              id_event : "",
              texto : "qwertyuio",
              day: "jjjj",
              hour: "11:11",
              periodicidad : "0"})
          .expect(200, done);
    }),
    it('Borra un evento', function(done){
        this.timeout(30000);
        request(app)
            .post('/deleteEvent')
            .send({id_event: event[0].id_event})
            .expect(200, done);
    })
    // Tiene que fallar por que no exite un evento con el id y usuario especificados
    // it('Borrar evento fallido', function(done){
    //     this.timeout(30000);
    //     request(app)
    //         .delete('/deleteEvent')
    //         //.expect(200, done)
    //         .send({
    //             id_event : "22",
    //             email : "rgcmb@hotmail"
    //             })
    //         .expect(400, done);
    // })
});
